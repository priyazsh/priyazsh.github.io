"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API;

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorText, setErrorText] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setErrorText("")

    if (!CONTACT_API) {
      setStatus("error")
      setErrorText("Contact form is not configured.")
      return
    }

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      setStatus("error")
      setErrorText(err instanceof Error ? err.message : "Failed to send message")
    }
  }

  return (
    <section className="mt-2">
      <Link href="/" className="btn-ghost">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <div className="mt-16 sm:mt-20">
        <h1 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-primary">
          Say hello
        </h1>
        <p className="mt-3 text-base sm:text-lg text-secondary max-w-md leading-relaxed">
          Whether it&apos;s a question, an idea, or just to say hi — I&apos;d love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 sm:mt-12 max-w-lg">
        <div className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest text-tertiary mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="block w-full pb-2 text-lg outline-none transition-all duration-250"
              style={{
                background: "transparent",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-tertiary mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full pb-2 text-lg outline-none transition-all duration-250"
              style={{
                background: "transparent",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium uppercase tracking-widest text-tertiary mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={1900}
              enterKeyHint="send"
              className="block w-full pb-2 text-lg outline-none transition-all duration-250 resize-none"
              style={{
                background: "transparent",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
            />
            <p className="text-xs text-right mt-1" style={{ color: message.length > 1800 ? "#ef4444" : "var(--text-tertiary)" }}>
              {message.length}/1900
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center gap-2 text-base font-medium transition-all duration-250 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: "var(--text)" }}
          >
            <span className="underline underline-offset-4 decoration-1 group-hover:decoration-2 transition-all" style={{ textDecorationColor: "var(--border)" }}>
              {status === "sending" ? "Sending" : "Send"}
            </span>
            <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </button>

          <span className="text-sm text-tertiary">
            or <a href="mailto:priyanshprajapat@proton.me" className="underline underline-offset-2 decoration-1" style={{ color: "var(--text-secondary)", textDecorationColor: "var(--border)" }}>priyanshprajapat@proton.me</a>
          </span>
        </div>

        {status === "success" && (
          <p className="mt-6 text-base" style={{ color: "var(--green-muted)" }}>
            &#10003; I&apos;ll get back to you soon.
          </p>
        )}

        {status === "error" && (
          <p className="mt-6 text-base" style={{ color: "var(--text-tertiary)" }}>
            &#8855; {errorText}
          </p>
        )}
      </form>
    </section>
  )
}
