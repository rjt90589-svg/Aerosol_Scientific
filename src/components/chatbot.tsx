'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, X, Send, User, Loader2,
  Phone, Mail, FlaskConical, ArrowRight, Sparkles
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  links?: { label: string; href: string; type: 'product' | 'service' }[]
}

const QUICK_REPLIES = [
  '🔬 What products do you offer?',
  '⚗️ HPLC vials availability',
  '🛠️ Service contracts info',
  '📦 How to get a quote?',
]

const SYSTEM_PROMPT = `You are "Aero", a friendly and knowledgeable assistant for Aerosol Scientific — a scientific instruments and laboratory solutions company with offices in UAE (Dubai) and India (New Delhi).

COMPANY OVERVIEW:
- Name: Aerosol Scientific
- Offices: UAE (108-AL MAZROUA, AN-2, Dubai) and India (F-4, 1st Floor, Karka Duma, New Delhi-110092)
- Phone UAE: +971-547598109
- Phone India: +91 98919 38724  
- Email: sales@aerosolscientific.com | support@aerosolscientific.com
- WhatsApp: +971547598109
- Website: aerosolscientific.com

WHAT WE DO:
1. Chromatography Consumables — GC & HPLC vials (amber/clear, 1.5mL, 2mL, 4mL), septa (PTFE/Silicone), crimp caps, screw caps, manual crimpers & decappers in ND9, ND11, ND18, ND20 formats
2. Analytical Instruments — HPLC, UHPLC, GC, GCMS, LCMS, ICPMS, Spectroscopy from Agilent, Waters, Shimadzu, Sciex and 15+ global OEM brands
3. Laboratory Services:
   - Turnkey Lab Projects (full setup: instruments + furniture + fume hoods + gas systems + SS furniture)
   - After-Sales Service & Maintenance (24hr response, preventive maintenance, repairs)
   - Multi-Vendor Support (Agilent, Sciex, Waters, Shimadzu — up to 40% cheaper than OEM)
   - Service Contracts (Comprehensive / Labor / Trade plans)
   - Training & Education (Chromatography basics, method development, troubleshooting workshops)
4. Laboratory Furniture — SS furniture, fume hoods, chemical storage, anti-vibration tables
5. Lab Supplies — Plasticware, glassware (Witeg Germany), general consumables

CUSTOMERS SERVED:
Pharmaceutical, Life Sciences, Food & Beverage testing, Environmental, Diagnostics, Forensic, Research institutions

PRICING:
- No fixed prices online — customers request quotes for their specific requirements
- Competitive pricing, especially for multi-vendor service contracts

RESPONSE GUIDELINES:
1. TONE: Friendly, professional, concise — like a knowledgeable colleague
2. Keep responses short (2-4 sentences for simple queries, brief bullets for lists)
3. Always direct to quote request for pricing/availability
4. Mention UAE and India offices when location-relevant
5. For product queries, describe what we have and direct to /products page
6. For service queries, mention 24hr response and direct to /services page  
7. Always end with a helpful next step or offer to connect with the team
8. Do NOT make up specific prices, stock levels, or technical specs
9. If asked something unrelated to lab/science, politely redirect

IMPORTANT: Be warm, genuine, and helpful. You represent a trusted scientific partner, not just a seller.`

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Aero, your Aerosol Scientific assistant.\n\nAsk me about our chromatography consumables, lab instruments, service contracts, or how to get a quote — I'm here to help!",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const extractLinks = (content: string) => {
    const links: Message['links'] = []
    const lower = content.toLowerCase()

    if (lower.includes('vial') || lower.includes('septa') || lower.includes('consumable') || lower.includes('product')) {
      links.push({ label: 'Browse Products', href: '/products', type: 'product' })
    }
    if (lower.includes('hplc') || lower.includes('chromatography') || lower.includes('gc ')) {
      links.push({ label: 'HPLC/GC Products', href: '/products?category=Vials', type: 'product' })
    }
    if (lower.includes('service') || lower.includes('maintenance') || lower.includes('contract')) {
      links.push({ label: 'View Services', href: '/services', type: 'service' })
    }
    if (lower.includes('quote') || lower.includes('price') || lower.includes('cost')) {
      links.push({ label: 'Request a Quote', href: '/contact', type: 'service' })
    }

    return links.slice(0, 2)
  }

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('•') || line.startsWith('-')) {
        return (
          <div key={i} className="flex gap-2 text-sm leading-relaxed">
            <span className="text-[#0891B2] mt-0.5 shrink-0">•</span>
            <span>{line.replace(/^[•\-]\s*/, '')}</span>
          </div>
        )
      }
      if (line.trim() === '') return <div key={i} className="h-1.5" />
      return <p key={i} className="text-sm leading-relaxed">{line}</p>
    })
  }

  const send = useCallback(async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || loading) return

    const userMsg: Message = { role: 'user', content: msg, timestamp: new Date() }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: SYSTEM_PROMPT,
          messages: history.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      const reply = data.reply || "I'm sorry, I couldn't process that. Please try again or contact us directly."
      const links = extractLinks(reply)

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
        links,
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having connectivity issues. Please reach us directly:\n📧 sales@aerosolscientific.com\n📞 +971-547598109",
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }, [input, messages, loading])

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#1251A3] to-[#0891B2] text-white shadow-[0_8px_32px_rgba(18,81,163,0.45)] flex items-center justify-center"
        aria-label="Chat with Aero"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <MessageCircle size={20} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1251A3] to-[#0891B2]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed bottom-44 right-6 z-50 w-[360px] sm:w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(18,81,163,0.25)] border border-[rgba(18,81,163,0.12)] bg-white"
            style={{ maxHeight: 'calc(100vh - 220px)', height: '580px' }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#050E1D] via-[#0D2240] to-[#063040] p-4 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 sci-grid-dark opacity-50" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0891B2] rounded-full blur-[60px] opacity-10" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1251A3] to-[#0891B2] flex items-center justify-center shadow-lg">
                      <FlaskConical size={19} className="text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#050E1D]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-white text-[15px]">Aero</h3>
                      <Sparkles size={11} className="text-[#22D3EE]" />
                    </div>
                    <p className="text-[11px] text-white/50">Aerosol Scientific Assistant</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <span className="text-[10px] text-emerald-400 font-medium">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href="tel:+971547598109"
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Call">
                    <Phone size={13} className="text-white" />
                  </a>
                  <a href="mailto:sales@aerosolscientific.com"
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Email">
                    <Mail size={13} className="text-white" />
                  </a>
                  <button onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X size={13} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages"
              style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)' }}>

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#3D5276] to-[#0A1628]'
                      : 'bg-gradient-to-br from-[#1251A3] to-[#0891B2] shadow-md'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <FlaskConical size={14} />}
                  </div>

                  <div className="flex-1 max-w-[84%]">
                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-[#1251A3] to-[#0891B2] text-white rounded-tr-sm'
                        : 'bg-white text-[#0A1628] border border-[rgba(18,81,163,0.07)] rounded-tl-sm'
                    }`}>
                      <div className={msg.role === 'user' ? 'text-white' : 'text-[#0A1628]'}>
                        {formatContent(msg.content)}
                      </div>
                    </div>

                    {/* Quick links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.links.map((link, li) => (
                          <a key={li} href={link.href}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all hover:-translate-y-0.5 ${
                              link.type === 'product'
                                ? 'bg-blue-50 text-[#1251A3] border border-blue-100 hover:bg-blue-100'
                                : 'bg-teal-50 text-[#0891B2] border border-teal-100 hover:bg-teal-100'
                            }`}>
                            <ArrowRight size={10} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    <div className={`text-[10px] text-[#7B90B2] mt-1 px-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Quick replies (first message only) */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {QUICK_REPLIES.map(q => (
                    <button key={q} onClick={() => send(q)}
                      className="px-3 py-1.5 rounded-full text-[12px] bg-white border border-[rgba(18,81,163,0.12)] text-[#3D5276] hover:border-[#1251A3] hover:text-[#1251A3] transition-all font-medium shadow-sm hover:shadow-md">
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1251A3] to-[#0891B2] flex items-center justify-center shrink-0">
                    <FlaskConical size={14} className="text-white" />
                  </div>
                  <div className="bg-white border border-[rgba(18,81,163,0.07)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span key={i} className="w-2 h-2 rounded-full bg-[#1251A3] opacity-60"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[rgba(18,81,163,0.07)] bg-white flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  placeholder="Ask about products, services…"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[rgba(18,81,163,0.04)] border border-[rgba(18,81,163,0.1)] text-sm text-[#0A1628] placeholder-[#7B90B2] outline-none focus:border-[#1251A3] focus:ring-2 focus:ring-[rgba(18,81,163,0.08)] transition-all disabled:opacity-50 font-medium"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#1251A3] to-[#0891B2] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="text-[10px] text-[#7B90B2] text-center mt-2">
                Powered by Aerosol Scientific AI · <span className="font-semibold">UAE & India</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}