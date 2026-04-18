'use client'
import { useEffect, useState } from 'react'
import { Package, MessageSquare, Star, Mail, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, quotes: 0, reviews: 0, messages: 0, newQuotes: 0 })

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('quote_requests').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('approved', false),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase.from('quote_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ]).then(([p, q, r, m, nq]) => {
      setStats({ products: p.count || 0, quotes: q.count || 0, reviews: r.count || 0, messages: m.count || 0, newQuotes: nq.count || 0 })
    })
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'from-blue-500 to-blue-700', href: '/admin/products' },
    { label: 'Quote Requests', value: stats.quotes, icon: MessageSquare, color: 'from-teal-500 to-teal-700', badge: stats.newQuotes, href: '/admin/quotes' },
    { label: 'Pending Reviews', value: stats.reviews, icon: Star, color: 'from-yellow-500 to-orange-600', href: '/admin/reviews' },
    { label: 'Contact Messages', value: stats.messages, icon: Mail, color: 'from-purple-500 to-purple-700', href: '/admin/messages' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back to Aerosol Scientific Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.label} href={card.href} className="group bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                {card.badge ? (
                  <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{card.badge} new</span>
                ) : null}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-md transition-all">
            + Add New Product
          </Link>
          <Link href="/admin/quotes" className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition-all">
            View Quote Requests
          </Link>
          <Link href="/" target="_blank" className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition-all">
            View Website ↗
          </Link>
        </div>
      </div>
    </div>
  )
}