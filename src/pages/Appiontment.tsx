"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

type ChatMsg = { role: "user" | "agent"; content: string }

const WEBHOOK_URL = "https://000beea875c7.ngrok-free.app/webhook/pco" // ← fixed webhook URL

// Extract the most readable text from any JSON your agent returns
function extractText(payload: unknown): string {
  if (payload == null) return ""
  if (typeof payload === "string") return payload

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const t = extractText(item)
      if (t) return t
    }
    return JSON.stringify(payload, null, 2)
  }

  if (typeof payload === "object") {
    const obj = payload as Record<string, unknown>

    // Common keys your agent/workflow may use
    const PREFERRED_KEYS = ["output", "reply", "message", "text", "content", "result"]
    for (const k of PREFERRED_KEYS) {
      const v = obj[k]
      if (typeof v === "string" && v.trim()) return v
    }

    // Fallback: first string value anywhere
    for (const v of Object.values(obj)) {
      const t = extractText(v)
      if (t) return t
    }
    return JSON.stringify(payload, null, 2)
  }

  return String(payload)
}

export default function BookAppointment() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ChatMsg[]>([])
  const outRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight, behavior: "smooth" })
  }, [history, loading])

  const canSend = useMemo(() => !loading && input.trim().length > 0, [loading, input])

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault()
    if (!canSend) return

    const text = input.trim()
    setHistory((h) => [...h, { role: "user", content: text }])
    setInput("")
    setLoading(true)

    try {
      const r = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const ctype = r.headers.get("content-type") || ""
      let agentText = ""

      if (ctype.includes("application/json")) {
        const data = await r.json()
        agentText = extractText(data) || "(empty response)"
      } else {
        const raw = await r.text()
        try {
          agentText = extractText(JSON.parse(raw))
        } catch {
          agentText = raw || "(empty response)"
        }
      }

      setHistory((h) => [...h, { role: "agent", content: agentText }])
    } catch (err: any) {
      setHistory((h) => [
        ...h,
        { role: "agent", content: "Error contacting webhook: " + (err?.message || String(err)) },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-400 to-blue-500 py-12 px-4">
        <section className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Appointment Request
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
            </p>
          </header>

          {/* Transcript */}
          <div ref={outRef} className="h-80 overflow-y-auto rounded-xl border border-gray-200 p-4 bg-white/70">
            {history.length === 0 && (
              <div className="text-gray-500 text-sm">No messages yet. Send something to your booking agent…</div>
            )}
            <div className="space-y-4">
              {history.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap break-words px-4 py-3 rounded-2xl shadow-sm ${m.role === "user"
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                      }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600">Thinking…</div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="mt-6 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='e.g., "Book Sarah on 2025-08-24 14:00, email…, phone…"'
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
            >
              Send
            </button>
          </form>

          <div className="text-xs text-gray-500 mt-3">
            {/* <code>{`{ "output": "..." }`}</code>. */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}