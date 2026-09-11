// ContactForm.jsx
// Contact page: posts to the Express/Nodemailer backend at /api/contact.
// In dev, Vite proxies /api -> http://localhost:4000 (see vite.config.js).
// In prod, deploy the backend and point VITE_API_BASE at it (see .env.example).

import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <div className="max-w-[640px] mx-auto px-5 sm:px-7 py-32">
      <h1 className="font-display font-extrabold uppercase text-4xl">Contact</h1>
      <p className="text-inkdim mt-3 mb-10">
        Questions, sponsorships, or want to join the team? Send us a message.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Honeypot field — hidden from real users, bots tend to fill every field */}
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="bg-panel border border-ink/10 rounded px-3.5 py-2.5 text-ink outline-none focus:border-brass transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="bg-panel border border-ink/10 rounded px-3.5 py-2.5 text-ink outline-none focus:border-brass transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="bg-panel border border-ink/10 rounded px-3.5 py-2.5 text-ink outline-none focus:border-brass transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={handleChange}
            className="bg-panel border border-ink/10 rounded px-3.5 py-2.5 text-ink outline-none focus:border-brass transition-colors resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 bg-brass text-hangardeep font-mono text-sm uppercase tracking-wider rounded px-5 py-3 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-linecyan text-sm">Thanks — your message has been sent. We'll get back to you soon.</p>
        )}
        {status === "error" && <p className="text-signal text-sm">{errorMsg}</p>}
      </form>
    </div>
  );
}
