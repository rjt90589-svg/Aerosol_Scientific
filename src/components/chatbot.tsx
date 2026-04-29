'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, X, Send, User, Loader2,
  Phone, Mail, FlaskConical, ArrowRight, Sparkles
} from 'lucide-react'
import { useProductStore } from '@/lib/store/productStore'
import type { Product } from '@/types'

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
  '🤝 Who are your partners?',
]

const STATIC_SYSTEM_PROMPT = `You are "Aero", a friendly and knowledgeable assistant for Aerosol Scientific — a scientific instruments and laboratory solutions company with offices in UAE (Dubai) and India (New Delhi).

COMPANY OVERVIEW:
- Name: Aerosol Scientific
- Offices: UAE (108-AL MAZROUA, AN-2, Dubai) | India (F-4, 1st Floor, Karka Duma, New Delhi-110092)
- Phone UAE: +971-547598109 | Phone India: +91 98919 38724
- Email: sales@aerosolscientific.com | support@aerosolscientific.com
- WhatsApp: +971547598109

SERVICES:
1. Multi-vendor support (Agilent, Sciex, Waters, Shimadzu) — up to 40% cheaper than OEM
2. Service contracts: Comprehensive, Labor Only, Trade Maintenance
3. Lab supplies & consumables (GC/HPLC columns, PM kits, vials)
4. Trainings & workshops (HPLC, GC, Method Development, 21 CFR Part 11)
5. Turnkey laboratory projects (GLP/GMP compliant)

PARTNER BRANDS: Thermolab Scientific, Witeg Germany, FDGSi France, PCi Analytics India, Sartorius, Eppendorf

RESPONSE GUIDELINES:
1. Friendly, professional, concise — 2-4 sentences for simple questions
2. For pricing, always direct to /contact or WhatsApp
3. When a user asks about a specific product, reference it by name and provide its detail page link
4. For service inquiries mention 24hr response SLA and direct to /services
5. Always end with a clear action (visit page, contact, WhatsApp)
6. Never make up prices, stock levels, or specs not listed
7. Be warm, genuine, and helpful`

// Build dynamic system prompt suffix from live product catalog
function buildProductCatalogPrompt(products: Product[]): string {
  if (!products.length) return ''

  const byCategory = products.reduce<Record<string, Product[]>>((acc, p) => {
    ;(acc[p.category] = acc[p.category] || []).push(p)
    return acc
  }, {})

  const lines: string[] = [
    '',
    '═══════════════════════════════════════',
    'LIVE PRODUCT CATALOG (from database)',
    '═══════════════════════════════════════',
  ]

  for (const [category, items] of Object.entries(byCategory)) {
    lines.push(`\n${category.toUpperCase()}:`)
    for (const p of items) {
      const desc = p.short_description || p.description || ''
      lines.push(`  • ${p.name}${desc ? ` — ${desc.slice(0, 120)}` : ''} [slug: ${p.slug}]`)
    }
  }

  lines.push(
    '',
    'IMPORTANT: When any product is mentioned, tell the user they can view it at /products/{slug} and request a quote there.',
    'Always use the exact slug from the catalog above to build product URLs.',
  )

  return lines.join('\n')
}

// Extract smart links — both static service links and dynamic product page links
function extractLinks(
  content: string,
  products: Product[],
): Message['links'] {
  const links: { label: string; href: string; type: 'product' | 'service' }[] = []
  const lower = content.toLowerCase()

  // Match live products by name or slug mentioned in the response
  for (const p of products) {
    const nameMatch = lower.includes(p.name.toLowerCase())
    const slugMatch = lower.includes(p.slug.toLowerCase())
    if (nameMatch || slugMatch) {
      links.push({
        label: p.name.length > 28 ? p.name.slice(0, 26) + '…' : p.name,
        href: `/products/${p.slug}`,
        type: 'product',
      })
      if (links.filter(l => l.type === 'product').length >= 2) break
    }
  }

  // Static service/category links
  if (!links.length) {
    if (lower.includes('vial') || lower.includes('septa') || lower.includes('consumable') || lower.includes('crimp')) {
      links.push({ label: 'Browse Products', href: '/products', type: 'product' })
    }
    if (lower.includes('witeg') || lower.includes('stirrer') || lower.includes('glassware')) {
      links.push({ label: 'Witeg Products', href: '/partners#witeg', type: 'product' })
    }
    if (lower.includes('fdgsi') || lower.includes('nitrogen generator') || lower.includes('hydrogen generator') || lower.includes('gas generator')) {
      links.push({ label: 'FDGSi Gas Generators', href: '/partners#fdgsi', type: 'product' })
    }
    if (lower.includes('pci') || lower.includes('pcigen')) {
      links.push({ label: 'PCi Analytics', href: '/partners#pci', type: 'product' })
    }
    if (lower.includes('thermolab') || lower.includes('stability chamber') || lower.includes('autoclave')) {
      links.push({ label: 'Thermolab Products', href: '/partners#thermolab', type: 'product' })
    }
    if (lower.includes('service') || lower.includes('maintenance') || lower.includes('contract') || lower.includes('repair')) {
      links.push({ label: 'View Services', href: '/services', type: 'service' })
    }
    if (lower.includes('training') || lower.includes('workshop')) {
      links.push({ label: 'Trainings', href: '/services#training', type: 'service' })
    }
    if (lower.includes('quote') || lower.includes('price') || lower.includes('cost') || lower.includes('order')) {
      links.push({ label: 'Request a Quote', href: '/contact', type: 'service' })
    }
    if (lower.includes('partner') || lower.includes('brand')) {
      links.push({ label: 'Our Partners', href: '/partners', type: 'product' })
    }
  }

  return links.slice(0, 2)
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Aero, your Aerosol Scientific assistant.\n\nAsk me about our chromatography consumables, gas generators, lab instruments, stability chambers, service contracts, or how to get a quote — I'm here to help!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Pull live product catalog from the shared Zustand store
  const { products, fetchProducts } = useProductStore()

  // Warm the product cache as soon as the chatbot mounts
  useEffect(() => {
    fetchProducts();
    
    
  }, [fetchProducts])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const formatContent = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        return (
          <div key={i} className="flex gap-2 text-sm leading-relaxed">
            <span className="text-[#0891B2] mt-0.5 shrink-0">•</span>
            <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
          </div>
        )
      }
      if (line.trim() === '') return <div key={i} className="h-1.5" />
      return <p key={i} className="text-sm leading-relaxed">{line}</p>
    })

  const send = useCallback(
    async (text?: string) => {
      const msg = (text || input).trim()
      if (!msg || loading) return

      const userMsg: Message = { role: 'user', content: msg, timestamp: new Date() }
      const history = [...messages, userMsg]
      setMessages(history)
      setInput('')
      setLoading(true)

      // Compose system prompt: static base + live product catalog
      const systemPrompt = STATIC_SYSTEM_PROMPT + buildProductCatalogPrompt(products)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt,
            messages: history.map(m => ({ role: m.role, content: m.content })),
          }),
        })
        const data = await res.json()
        const reply =
          data.reply || "I'm sorry, I couldn't process that. Please try again or contact us directly."

        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: reply,
            timestamp: new Date(),
            links: extractLinks(reply, products),
          },
        ])
      } catch {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I'm having connectivity issues. Please reach us directly:\n📧 sales@aerosolscientific.com\n📞 +971-547598109",
            timestamp: new Date(),
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [input, messages, loading, products],
  )

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
        suppressHydrationWarning
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
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1251A3] to-[#0891B2]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
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
                      <h3 className="font-bold text-white text-[15px]">Aero</h3>
                      <Sparkles size={11} className="text-[#22D3EE]" />
                    </div>
                    <p className="text-[11px] text-white/50">Aerosol Scientific Assistant</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Online · {products.length > 0 ? `${products.length} products` : 'Loading catalog…'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href="tel:+971547598109" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Call UAE">
                    <Phone size={13} className="text-white" />
                  </a>
                  <a href="mailto:sales@aerosolscientific.com" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Email">
                    <Mail size={13} className="text-white" />
                  </a>
                   <a href="mailto: support@aerosolscientific.com" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Email">
                    <Mail size={13} className="text-white" />
                  </a>

                  
                  <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X size={13} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages"
              style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)' }}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
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

                    {/* Dynamic product / service links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.links.map((link, li) => (
                          <a
                            key={li}
                            href={link.href}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all hover:-translate-y-0.5 ${
                              link.type === 'product'
                                ? 'bg-blue-50 text-[#1251A3] border border-blue-100 hover:bg-blue-100'
                                : 'bg-teal-50 text-[#0891B2] border border-teal-100 hover:bg-teal-100'
                            }`}
                          >
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

              {/* Quick replies */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {QUICK_REPLIES.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="px-3 py-1.5 rounded-full text-[12px] bg-white border border-[rgba(18,81,163,0.12)] text-[#3D5276] hover:border-[#1251A3] hover:text-[#1251A3] transition-all font-medium shadow-sm hover:shadow-md"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1251A3] to-[#0891B2] flex items-center justify-center shrink-0">
                    <FlaskConical size={14} className="text-white" />
                  </div>
                  <div className="bg-white border border-[rgba(18,81,163,0.07)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#1251A3] opacity-60"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                        />
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
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send()
                    }
                  }}
                  placeholder="Ask about products, services, partners…"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[rgba(18,81,163,0.04)] border border-[rgba(18,81,163,0.1)] text-sm text-[#0A1628] placeholder-[#7B90B2] outline-none focus:border-[#1251A3] focus:ring-2 focus:ring-[rgba(18,81,163,0.08)] transition-all disabled:opacity-50 font-medium"
                  suppressHydrationWarning
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#1251A3] to-[#0891B2] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  suppressHydrationWarning
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