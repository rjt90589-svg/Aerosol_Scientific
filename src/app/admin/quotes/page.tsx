'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import type { QuoteRequest } from '@/types'
import { Eye, Check } from 'lucide-react'

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [selected, setSelected] = useState<QuoteRequest | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('quote_requests').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setQuotes(data || [])
    })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase.from('quote_requests').update({ status }).eq('id', id)
    setQuotes(q => q.map(item => item.id === id ? { ...item, status: status as QuoteRequest['status'] } : item))
  }

  const statusColors: Record<string, string> = {
    new: 'bg-red-100 text-red-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    responded: 'bg-blue-100 text-blue-700',
    closed: 'bg-green-100 text-green-700',
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        <p className="text-gray-500 text-sm">{quotes.filter(q => q.status === 'new').length} new, {quotes.length} total</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {quotes.map((quote) => (
                  <tr key={quote.id} className={`hover:bg-gray-50 cursor-pointer ${selected?.id === quote.id ? 'bg-blue-50' : ''}`} onClick={() => { setSelected(quote); updateStatus(quote.id, 'viewed') }}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm text-gray-900">{quote.full_name}</div>
                      <div className="text-xs text-gray-400">{quote.email}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-[120px] truncate">{quote.product_name || 'General'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[quote.status]}`}>{quote.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{formatDate(quote.created_at)}</td>
                    <td className="px-4 py-3">
                      <button onClick={(e) => { e.stopPropagation(); updateStatus(quote.id, 'closed') }}
                        className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"><Check size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Quote Detail</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Name:</span> <span className="font-medium ml-2">{selected.full_name}</span></div>
                <div><span className="text-gray-400">Email:</span> <a href={`mailto:${selected.email}`} className="font-medium ml-2 text-blue-600">{selected.email}</a></div>
                <div><span className="text-gray-400">Phone:</span> <span className="font-medium ml-2">{selected.phone}</span></div>
                <div><span className="text-gray-400">Company:</span> <span className="font-medium ml-2">{selected.company || '—'}</span></div>
                <div><span className="text-gray-400">Product:</span> <span className="font-medium ml-2">{selected.product_name || '—'}</span></div>
                <div><span className="text-gray-400">Quantity:</span> <span className="font-medium ml-2">{selected.quantity || '—'}</span></div>
                {selected.message && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-gray-400 mb-1">Message:</div>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">{selected.message}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <a href={`mailto:${selected.email}?subject=Quote for ${selected.product_name}`}
                  className="flex-1 text-center bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold py-2 rounded-xl">
                  Reply by Email
                </a>
                <button onClick={() => updateStatus(selected.id, 'closed')}
                  className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold py-2 rounded-xl hover:bg-gray-200">
                  Mark Closed
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 flex items-center justify-center text-gray-300 text-sm">
              <div className="text-center">
                <Eye size={28} className="mx-auto mb-2 opacity-40" />
                Select a quote to view details
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}