'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import type { ContactMessage } from '@/types'

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setMessages(data || [])
    })
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-500 text-sm">{messages.length} total messages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} onClick={() => setSelected(msg)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${selected?.id === msg.id ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{msg.full_name}</div>
                    <div className="text-xs text-gray-400">{msg.email} · {msg.phone}</div>
                  </div>
                  <div className="text-xs text-gray-400 shrink-0">{formatDate(msg.created_at)}</div>
                </div>
                {msg.reason && <div className="mt-1 text-xs text-blue-600">{msg.reason}</div>}
                {msg.message && <p className="text-gray-500 text-xs mt-1 line-clamp-1">{msg.message}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-gray-900">Message Detail</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Name', value: selected.full_name },
                  { label: 'Email', value: selected.email },
                  { label: 'Phone', value: selected.phone },
                  { label: 'Reason', value: selected.reason || '—' },
                  { label: 'Area', value: selected.area_of_interest || '—' },
                ].map(({ label, value }) => (
                  <div key={label}><span className="text-gray-400">{label}:</span> <span className="font-medium ml-1">{value}</span></div>
                ))}
                {selected.message && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-gray-400 mb-1">Message:</div>
                    <p className="bg-gray-50 rounded-lg p-3 text-gray-700">{selected.message}</p>
                  </div>
                )}
              </div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.reason || 'Your Enquiry'}`}
                className="block text-center bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold py-2.5 rounded-xl mt-2">
                Reply by Email
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 flex items-center justify-center text-gray-300 text-sm text-center">
              Click a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}