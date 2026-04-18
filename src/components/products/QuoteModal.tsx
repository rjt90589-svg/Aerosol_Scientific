'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { Product } from '@/types'

const schema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function QuoteModal({ product, isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, product_id: product.id, product_name: product.name }),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
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
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1565C0] to-[#00838F] p-5 text-white">
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <X size={16} />
              </button>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Request a Quote</div>
              <h2 className="font-bold text-lg leading-tight">{product.name}</h2>
            </div>

            {/* Body */}
            <div className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Quote Requested!</h3>
                  <p className="text-gray-500 text-sm">We'll send you a detailed quote within 24 hours.</p>
                  <Button onClick={onClose} className="mt-6">Close</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Full Name *</Label>
                      <Input {...register('full_name')} placeholder="Your name" className="mt-1" />
                      {errors.full_name && <p className="text-red-500 text-xs mt-1">Required</p>}
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input {...register('email')} type="email" placeholder="email@domain.com" className="mt-1" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Phone *</Label>
                      <Input {...register('phone')} placeholder="+91..." className="mt-1" />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input {...register('company')} placeholder="Optional" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Quantity / Requirement</Label>
                    <Input {...register('quantity')} placeholder="e.g. 1000 vials, bulk order..." className="mt-1" />
                  </div>
                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea {...register('message')} rows={3} placeholder="Any specific requirements..." className="mt-1 resize-none" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#1565C0] to-[#00838F]">
                    {loading ? 'Sending...' : <span className="flex items-center gap-2"><Send size={14} />Send Quote Request</span>}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}