'use client'
import { useEffect, useState } from 'react'
import { MessageSquare, Eye, CheckCircle2, XCircle, Clock, RefreshCw, Search, Filter } from 'lucide-react'

interface QuoteRequest {
  id: string
  full_name: string
  email: string
  phone: string
  company: string | null
  product_name: string | null
  quantity: string | null
  message: string | null
  status: 'new' | 'viewed' | 'responded' | 'closed'
  created_at: string
}

const STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Clock },
  viewed: { label: 'Viewed', color: 'bg-yellow-100 text-yellow-700', icon: Eye },
  responded: { label: 'Responded', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-500', icon: XCircle },
}

const STATUS_OPTIONS = ['new', 'viewed', 'responded', 'closed'] as const

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchQuotes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/quotes')
      const data = await res.json()
      setQuotes(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchQuotes() }, [])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      await fetch('/api/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: status as QuoteRequest['status'] } : q))
      if (selectedQuote?.id === id) setSelectedQuote(prev => prev ? { ...prev, status: status as QuoteRequest['status'] } : null)
    } finally {
      setUpdating(null)
    }
  }

  const filtered = quotes.filter(q => {
    const matchSearch = !search ||
      q.full_name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      q.company?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || q.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = {
    all: quotes.length,
    new: quotes.filter(q => q.status === 'new').length,
    viewed: quotes.filter(q => q.status === 'viewed').length,
    responded: quotes.filter(q => q.status === 'responded').length,
    closed: quotes.filter(q => q.status === 'closed').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
          <p className="text-sm text-gray-500 mt-1">{quotes.length} total requests</p>
        </div>
        <button onClick={fetchQuotes} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['all', ...STATUS_OPTIONS] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              statusFilter === s
                ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${statusFilter === s ? 'bg-white/25' : 'bg-gray-100'}`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, product..."
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Loading quotes...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">No quote requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(quote => {
                  const cfg = STATUS_CONFIG[quote.status]
                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-blue-50/30 cursor-pointer transition-colors"
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{quote.full_name}</div>
                        <div className="text-gray-400 text-xs">{quote.email}</div>
                        {quote.company && <div className="text-gray-400 text-xs">{quote.company}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-gray-700">{quote.product_name ?? '—'}</div>
                        {quote.quantity && <div className="text-gray-400 text-xs">Qty: {quote.quantity}</div>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(quote.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        <br />
                        {new Date(quote.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                          <cfg.icon size={10} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <select
                          value={quote.status}
                          disabled={updating === quote.id}
                          onChange={e => updateStatus(quote.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-blue-400 disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedQuote(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg text-gray-900">Quote Details</h2>
              <button onClick={() => setSelectedQuote(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Name" value={selectedQuote.full_name} />
              <Row label="Email" value={selectedQuote.email} />
              <Row label="Phone" value={selectedQuote.phone} />
              {selectedQuote.company && <Row label="Company" value={selectedQuote.company} />}
              {selectedQuote.product_name && <Row label="Product" value={selectedQuote.product_name} />}
              {selectedQuote.quantity && <Row label="Quantity" value={selectedQuote.quantity} />}
              {selectedQuote.message && (
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Message</span>
                  <p className="mt-1 text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">{selectedQuote.message}</p>
                </div>
              )}
              <Row label="Submitted" value={new Date(selectedQuote.created_at).toLocaleString()} />
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {STATUS_OPTIONS.map(s => {
                  const cfg = STATUS_CONFIG[s]
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedQuote.id, s)}
                      disabled={selectedQuote.status === s || updating === selectedQuote.id}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-40 ${
                        selectedQuote.status === s
                          ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a href={`mailto:${selectedQuote.email}?subject=Re: Quote Request for ${selectedQuote.product_name ?? 'your product'}`}
                className="flex-1 text-center bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-md transition-all">
                Reply via Email
              </a>
              <a href={`tel:${selectedQuote.phone}`}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-all">
                Call
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-400 font-medium shrink-0">{label}</span>
      <span className="text-gray-800 text-right">{value}</span>
    </div>
  )
}