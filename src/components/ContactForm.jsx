// ContactForm.jsx
// Reconstructed from the bundle's `D2` component — the richer two-column
// "Reach us" contact layout (email / workshop location / socials next to
// the form), instead of a bare form. The bundle's own version here was
// a UI-only placeholder ("isn't wired to a backend yet"); this keeps
// that layout but wires the form up for real to the Express/Nodemailer
// backend at /api/contact (see server/index.js and api/contact.js).
//
// In dev, Vite proxies /api -> http://localhost:4000 (see vite.config.js).
// In prod (Vercel), /api/contact is served by the api/contact.js
// serverless function automatically — no extra config needed there.

import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";

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
    <>
      <SectionHeader
        eyebrow="Get in touch"
        title="Fly with us"
        description="Sponsors, mentors, and new members welcome.."
      />

      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-7 grid md:grid-cols-2 gap-14">
          <div>
            <h3 className="font-display font-extrabold uppercase text-2xl mb-6">Reach us</h3>
            <ul className="space-y-4 text-inkdim">
              <li>
                <span className="block font-mono text-[0.7rem] text-brass uppercase tracking-wide mb-1">
                  Email
                </span>
                <a href="mailto:aerofcrit0@gmail.com" className="hover:text-ink transition-colors">
                  aerofcrit0@gmail.com
                </a>
              </li>
              <li>
                <span className="block font-mono text-[0.7rem] text-brass uppercase tracking-wide mb-1">
                  Address
                </span>
                AX-316B, FCRIT Vashi
              </li>
              <li>
                <span className="block font-mono text-[0.7rem] text-brass uppercase tracking-wide mb-1">
                  Social
                </span>
                <div className="flex gap-4 mt-1">
                  <a href="https://www.instagram.com/aero_fcrit/" className="hover:text-ink transition-colors">
                    Instagram
                  </a>
                  <a href="https://www.linkedin.com/company/aero-fcrit" className="hover:text-ink transition-colors">
                    LinkedIn
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-extrabold uppercase text-2xl mb-6">Send a message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <input
                required
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass"
              />
              <textarea
                required
                name="message"
                rows="4"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass resize-y"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-5 py-3 rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors disabled:opacity-60 disabled:hover:bg-signal"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>

              {status === "success" && (
                <p className="text-linecyan font-mono text-sm">
                  Thanks — your message has been sent. We'll get back to you soon.
                </p>
              )}
              {status === "error" && <p className="text-signal font-mono text-sm">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
