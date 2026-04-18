'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const schema = z.object({
  full_name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  reason: z.string(),
  area_of_interest: z.string(),
  message: z.string().min(10, 'Message too short'),
})

type FormData = z.infer<typeof schema>

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: 'Product Enquiry', area_of_interest: 'Chromatography Consumables' }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/40 sci-grid-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-14">
          <SectionHeading eyebrow="Get In Touch" title="Submit Your |Query" subtitle="Our team will respond within 24 hours." centered />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: MapPin, title: '🇦🇪 UAE Office', lines: ['108-AL MAZROUA, AN-2', 'Dubai, UAE', '+971-547598109'] },
              { icon: MapPin, title: '🇮🇳 India Office', lines: ['F-4, 1st Floor, Karka Duma', 'New Delhi-110092', '+91 98919 38724'] },
              { icon: Mail, title: 'Email Us', lines: ['support@aerosolscientific.com', 'sales@aerosolscientific.com'] },
            ].map((info) => (
              <motion.div key={info.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="font-bold text-gray-900 mb-2 text-sm">{info.title}</div>
                {info.lines.map((line) => (
                  <div key={line} className="text-gray-500 text-sm">{line}</div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input {...register('full_name')} placeholder="Your name" className="mt-1" />
                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input {...register('email')} type="email" placeholder="your@email.com" className="mt-1" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <Input {...register('phone')} placeholder="+91 or +971..." className="mt-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Reason for Contact</Label>
                    <Select onValueChange={(v:any) => setValue('reason', v)} defaultValue="Product Enquiry">
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product Enquiry">Product Enquiry</SelectItem>
                        <SelectItem value="General Query">General Query</SelectItem>
                        <SelectItem value="Service Request">Service Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Area of Interest</Label>
                    <Select onValueChange={(v:any) => setValue('area_of_interest', v)} defaultValue="Chromatography Consumables">
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Lab Supplies', 'Chromatography Consumables', 'Trainings', 'Service Contracts', 'Others'].map(v => (
                          <SelectItem key={v} value={v}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea {...register('message')} rows={4} placeholder="Describe your requirement..." className="mt-1 resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#1565C0] to-[#00838F] hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  {loading ? 'Sending...' : (
                    <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}