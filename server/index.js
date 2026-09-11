// server/index.js
// Minimal Express backend with a single endpoint that emails the
// contact form submission to you via Nodemailer.

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

// Trust only the first proxy hop (e.g. your reverse proxy / load balancer).
// Without this, req.ip falls back to the raw socket address and ignores
// X-Forwarded-For, which is what we want unless you know you're behind
// exactly one trusted proxy — adjust if your deployment differs.
app.set("trust proxy", 1);

// Restrict CORS to known origins instead of allowing any website to call
// this endpoint from a visitor's browser (which lets third parties spend
// your SMTP quota / rate-limit budget). Set ALLOWED_ORIGINS as a
// comma-separated list in your env, e.g. "https://aerofcrit.com".
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/non-browser requests (no Origin header) and
      // requests from the configured allowlist.
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "20kb" }));

// Basic in-memory rate limiter: max 5 submissions per IP per 10 minutes.
// Not production-grade (resets on restart, per-process only) but stops
// naive spam/abuse without adding another dependency.
const submissions = new Map(); // ip -> [timestamps]
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

// Periodically drop IPs with no recent activity so the map can't grow
// unbounded for the life of the process.
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of submissions) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) submissions.delete(ip);
    else submissions.set(ip, recent);
  }
}, WINDOW_MS).unref();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587/25
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strips CR/LF and other control characters so user input can never
// inject extra headers (e.g. "Bcc:") into the outgoing email. Apply this
// to anything that ends up in a mail header (subject, name, from/reply-to
// display parts) — not to the message body, which doesn't need it.
function sanitizeHeaderValue(str = "") {
  return String(str)
    .replace(/[\r\n]+/g, " ")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .trim();
}

app.post("/api/contact", async (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress;
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many submissions. Please try again later." });
    }

    let { name, email, subject, message, company } = req.body || {};

    // Honeypot field: real users never fill this in (it's hidden via
    // CSS on the form). If it has a value, silently pretend success.
    if (company) {
      return res.json({ ok: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    if (name.length > 200 || (subject && subject.length > 200)) {
      return res.status(400).json({ error: "Input is too long." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: "Message is too long." });
    }

    // Sanitize anything that lands in a header. `email` is already
    // constrained by emailPattern (no whitespace allowed), but name/subject
    // are free text and must not be allowed to inject header lines.
    name = sanitizeHeaderValue(name);
    subject = subject ? sanitizeHeaderValue(subject) : subject;

    await transporter.sendMail({
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

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Something went wrong sending your message. Please try again later." });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Contact form API listening on http://localhost:${PORT}`);
});
