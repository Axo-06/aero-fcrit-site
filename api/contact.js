// api/contact.js
// Vercel serverless function — same logic as server/index.js, adapted
// to Vercel's (req, res) function signature instead of Express routes.
// Deployed automatically at POST /api/contact.

import nodemailer from "nodemailer";

// Reused across warm invocations of the same function instance.
let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

// Simple in-memory rate limit. Note: on Vercel this resets whenever a
// fresh function instance is spun up (cold start), so it's a light
// speed bump against spam, not a hard guarantee. For strict rate
// limiting use Vercel KV/Upstash Redis instead.
const submissions = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many submissions. Please try again later." });
    }

    const { name, email, subject, message, company } = req.body || {};

    // Honeypot — hidden field real users never fill in.
    if (company) {
      return res.status(200).json({ ok: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: "Message is too long." });
    }

    await getTransporter().sendMail({
      from: `"Aero FCRIT Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Contact Form] ${subject?.slice(0, 120) || "New message from " + name}`,
      text:
        `New contact form submission\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject || "(none)"}\n\n` +
        `Message:\n${message}`,
      html:
        `<h2>New contact form submission</h2>` +
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>` +
        `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Something went wrong sending your message. Please try again later." });
  }
}
