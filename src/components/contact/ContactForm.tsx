"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      if (res.status === 429) {
        setStatus("error");
        setErrorMsg("Too many requests. Please try again in a minute.");
        return;
      }
      if (res.status === 403) {
        setStatus("error");
        setErrorMsg("Request blocked. Please open the site from its public URL.");
        return;
      }

      if (data.error === "server" || res.status >= 500) {
        fallbackMailto();
        return;
      }

      setStatus("error");
      setErrorMsg("Please check the fields and try again.");
    } catch {
      fallbackMailto();
    }
  }

  function fallbackMailto() {
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=FORMA%20inquiry&body=${body}`;
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <p className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 text-[var(--fg)]">
        Thank you. We will reply within two business days.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-2 text-[var(--fg)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-2 text-[var(--fg)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-y border border-[var(--line)] bg-[var(--surface)] p-3 text-[var(--fg)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>
      {errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-w-[200px] items-center justify-center border border-[var(--fg)] bg-[var(--fg)] px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--bg)] transition hover:bg-transparent hover:text-[var(--fg)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-[var(--muted)]">
        If email delivery is not configured on this deployment, your mail app
        will open with a draft instead.
      </p>
    </form>
  );
}
