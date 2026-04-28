'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Quote, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { Product } from '@/types'

interface Props {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function QuoteModal({ product, isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', company: '', quantity: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          product_id: product.id,
          product_name: product.name,
        }),
      })
      if (!res.ok) throw new Error('Failed to submit quote request')
      setSubmitted(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSubmitted(false); setError(null); setForm({ full_name: '', email: '', phone: '', company: '', quantity: '', message: '' }) }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1565C0] to-[#00838F] p-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Quote size={18} />
                    <h2 className="text-lg font-bold">Request a Quote</h2>
                  </div>
                  <p className="text-white/80 text-sm">{product.name}</p>
                </div>
                <button onClick={handleClose} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="p-10 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Quote Requested!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours at <strong>{form.email}</strong>.</p>
                <Button onClick={handleClose} className="mt-2 bg-gradient-to-r from-[#1565C0] to-[#00838F]">Close</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Full Name <span className="text-red-500">*</span></Label>
                    <Input value={form.full_name} onChange={set('full_name')} placeholder="John Smith" className="mt-1" required />
                  </div>
                  <div>
                    <Label>Email <span className="text-red-500">*</span></Label>
                    <Input type="email" value={form.email} onChange={set('email')} placeholder="john@company.com" className="mt-1" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Phone <span className="text-red-500">*</span></Label>
                    <Input value={form.phone} onChange={set('phone')} placeholder="+971 5X XXX XXXX" className="mt-1" required />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input value={form.company} onChange={set('company')} placeholder="Company name" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label>Quantity / Volume</Label>
                  <Input value={form.quantity} onChange={set('quantity')} placeholder="e.g. 100 units, bulk order..." className="mt-1" />
                </div>
                <div>
                  <Label>Additional Message</Label>
                  <Textarea value={form.message} onChange={set('message')} rows={3} className="mt-1 resize-none" placeholder="Specifications, delivery requirements, etc." />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#1565C0] to-[#00838F] py-5">
                  {loading ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Submitting...</span> : 'Submit Quote Request'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}