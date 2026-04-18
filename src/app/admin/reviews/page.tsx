'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, X, Star } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Review } from '@/types'

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [tab, setTab] = useState<'pending' | 'approved'>('pending')

  const fetch = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('reviews').select('*').eq('approved', tab === 'approved').order('created_at', { ascending: false })
    setReviews(data || [])
  }

  useEffect(() => { fetch() }, [tab])

  const approve = async (id: string) => {
    const supabase = createClient()
    await supabase.from('reviews').update({ approved: true }).eq('id', id)
    fetch()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this review?')) return
    const supabase = createClient()
    await supabase.from('reviews').delete().eq('id', id)
    fetch()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
      </div>
      <div className="flex gap-2 mb-4">
        {(['pending', 'approved'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${tab === t ? 'bg-[#1565C0] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{review.reviewer_name}</span>
                  <span className="text-xs text-gray-400">{review.reviewer_email}</span>
                  <div className="flex ml-auto">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} className={i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
                <p className="text-gray-400 text-xs mt-1">{formatDate(review.created_at)}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                {tab === 'pending' && (
                  <button onClick={() => approve(review.id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100">
                    <Check size={14} />
                  </button>
                )}
                <button onClick={() => remove(review.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <div className="py-10 text-center text-gray-400 text-sm">No {tab} reviews.</div>}
        </div>
      </div>
    </div>
  )
}