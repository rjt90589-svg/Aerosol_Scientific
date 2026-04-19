'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MapPin, Phone, Mail, Send, CheckCircle, MessageSquare,
  ArrowRight, Sparkles, Clock, Globe
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { toast } from 'sonner'

const schema = z.object({
  full_name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  reason: z.string(),
  area_of_interest: z.string(),
  message: z.string().min(10, 'Message is too short'),
})

type FormData = z.infer<typeof schema>

const REASONS = ['Product Enquiry', 'Service Request', 'General Query', 'Training', 'Partnership']
const AREAS = ['Chromatography Consumables', 'Lab Instruments', 'Turnkey Lab Setup', 'Service Contracts', 'Multi-Vendor Support', 'Training', 'Others']

const OFFICES = [
  {
    flag: '🇦🇪', title: 'Dubai, UAE',
    address: '108-AL MAZROUA, AN-2',
    city: 'Dubai, United Arab Emirates',
    phone: '+971-547598109',
    email: 'sales@aerosolscientific.com',
    hours: 'Sun–Thu, 9AM–6PM GST',
    gradient: 'from-[#1251A3] to-[#0891B2]',
  },
  {
    flag: '🇮🇳', title: 'New Delhi, India',
    address: 'F-4, 1st Floor, Karka Duma',
    city: 'New Delhi - 110092',
    phone: '+91 98919 38724',
    email: 'support@aerosolscientific.com',
    hours: 'Mon–Sat, 9AM–6PM IST',
    gradient: 'from-[#0891B2] to-[#6366F1]',
  },
]

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: 'Product Enquiry', area_of_interest: 'Chromatography Consumables' },
  })

  const selectedReason = watch('reason')
  const selectedArea = watch('area_of_interest')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Message sent!', { description: "We'll respond within 24 hours." })
      } else {
        toast.error('Failed to send', { description: 'Please email us directly.' })
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-28 relative overflow-hidden bg-[#F8FAFF]">
      {/* Background */}
      <div className="absolute inset-0 sci-grid opacity-60" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1251A3] rounded-full blur-[200px] opacity-[0.04]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0891B2] rounded-full blur-[150px] opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-center mb-16">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's Build Your |Perfect Lab"
            subtitle="From a single consumable order to a complete turnkey laboratory — our experts are ready to help within 24 hours."
            centered
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left panel — offices + quick contact */}
          <div className="lg:col-span-2 space-y-5">

            {/* Office cards */}
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.title}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-xl hover:shadow-[rgba(18,81,163,0.08)] transition-all duration-350"
              >
                {/* Top gradient accent */}
                <div className={`h-1 w-full bg-gradient-to-r ${office.gradient}`} />
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-2xl">{office.flag}</span>
                    <div>
                      <div className="font-display font-bold text-[#0A1628] text-sm">{office.title}</div>
                      <div className="flex items-center gap-1 text-[11px] text-[#7B90B2]">
                        <Clock size={10} /> {office.hours}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex gap-2.5 text-[#3D5276]">
                      <MapPin size={13} className="shrink-0 mt-0.5 text-[#1251A3]" />
                      <div>
                        <div>{office.address}</div>
                        <div className="text-[#7B90B2]">{office.city}</div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Phone size={13} className="text-[#1251A3] shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-[#3D5276] hover:text-[#1251A3] transition-colors font-medium">{office.phone}</a>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Mail size={13} className="text-[#0891B2] shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-[#3D5276] hover:text-[#0891B2] transition-colors text-[12px]">{office.email}</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/971547598109"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-4 bg-gradient-to-br from-[#064E3B] to-[#065F46] p-5 rounded-2xl text-white hover:shadow-xl hover:shadow-green-900/20 transition-all group"
            >
              <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-600/30 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">Chat on WhatsApp</div>
                <div className="text-green-200 text-xs">Instant response · UAE & India</div>
              </div>
              <ArrowRight size={16} className="text-green-300 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right panel — form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-[rgba(18,81,163,0.08)] shadow-[0_4px_40px_rgba(18,81,163,0.07)] overflow-hidden">

              {/* Form header */}
              <div className="relative bg-gradient-to-br from-[#050E1D] via-[#0D2240] to-[#063040] px-7 py-6 overflow-hidden">
                <div className="absolute inset-0 sci-grid-dark opacity-40" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0891B2] rounded-full blur-[80px] opacity-10" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-[#22D3EE]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22D3EE]">Send Us a Message</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl">We respond within 24 hours</h3>
                  <p className="text-white/40 text-sm mt-0.5">Your trusted laboratory partner — UAE & India</p>
                </div>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center py-20 px-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1251A3] to-[#0891B2] rounded-full flex items-center justify-center mb-5 shadow-xl shadow-blue-500/25 mx-auto">
                      <CheckCircle size={36} className="text-white" />
                    </div>
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl text-[#0A1628] mb-2">Message Sent!</h3>
                  <p className="text-[#7B90B2] text-sm max-w-xs leading-relaxed">
                    Thank you for reaching out. Our team will respond with a detailed reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'full_name', label: 'Full Name', placeholder: 'Dr. Raj Kumar', type: 'text' },
                      { name: 'email', label: 'Email Address', placeholder: 'raj@lab.com', type: 'email' },
                    ].map(({ name, label, placeholder, type }) => (
                      <div key={name}>
                        <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7B90B2] mb-2 block">{label} *</label>
                        <input
                          {...register(name as keyof FormData)}
                          type={type}
                          placeholder={placeholder}
                          className="input-sci"
                        />
                        {errors[name as keyof FormData] && (
                          <p className="text-red-500 text-[11px] mt-1">{errors[name as keyof FormData]?.message}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7B90B2] mb-2 block">Phone Number *</label>
                    <input {...register('phone')} placeholder="+971 54 xxx xxxx or +91 98xxx xxxxx" className="input-sci" />
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Reason pills */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7B90B2] mb-2.5 block">Reason for Contact</label>
                    <div className="flex flex-wrap gap-2">
                      {REASONS.map(r => (
                        <button key={r} type="button" onClick={() => setValue('reason', r)}
                          className={`px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 ${
                            selectedReason === r
                              ? 'bg-[#1251A3] text-white border-[#1251A3] shadow-md shadow-blue-500/20'
                              : 'bg-white text-[#3D5276] border-[rgba(18,81,163,0.15)] hover:border-[#1251A3] hover:text-[#1251A3]'
                          }`}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area pills */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7B90B2] mb-2.5 block">Area of Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {AREAS.map(a => (
                        <button key={a} type="button" onClick={() => setValue('area_of_interest', a)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200 ${
                            selectedArea === a
                              ? 'bg-[#0891B2] text-white border-[#0891B2] shadow-md shadow-teal-500/20'
                              : 'bg-white text-[#3D5276] border-[rgba(8,145,178,0.2)] hover:border-[#0891B2] hover:text-[#0891B2]'
                          }`}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7B90B2] mb-2 block">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your lab requirement — product quantity, instrument type, service needed, or project scope…"
                      className="input-sci resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1251A3] to-[#0891B2] text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-[14px]"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                    ) : (
                      <><Send size={16} />Send Message<span className="text-white/60 font-normal text-[12px] ml-1">· We reply in 24hrs</span></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}