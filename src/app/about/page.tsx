"use client"

import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { Target, Eye, Heart, Award, Lightbulb, Users } from 'lucide-react'
import Link from 'next/link'

// ── Core Values (UPDATED) ────────────────────────────
const values = [
  {
    icon: Users,
    title: 'Partnership',
    description:
      'We collaborate closely with our customers, working as one team with shared ownership and accountability to build long-term, meaningful partnerships.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      'We uphold transparency, ethical practices, and confidentiality in every engagement, ensuring trust, credibility, and professional excellence.',
  },
  {
    icon: Award,
    title: 'Passion',
    description:
      'We are deeply committed to our customers’ success, driven by dedication, continuous improvement, and a focus on delivering complete solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Excellence',
    description:
      'We strive for excellence by maintaining the highest quality standards, adopting best practices, and consistently delivering value beyond expectations.',
  },
]

// ── Why Choose Us ────────────────────────────────────
const whyItems = [
  { title: 'Comprehensive Product Range', desc: 'Equipment, consumables, and lab furniture' },
  { title: 'Quality Assurance', desc: 'Products from reputed global manufacturers' },
  { title: 'Innovation & Technology', desc: 'Cutting-edge solutions for research needs' },
  { title: 'Customer-Centric Approach', desc: 'Technical support and prompt delivery' },
  { title: 'Competitive Pricing', desc: 'Making advanced research more accessible' },
  { title: 'Experienced Professionals', desc: 'Rich experience and proven records in the field' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Company Overview"
        subtitle="A trusted partner for complete laboratory solutions — from instruments to turnkey lab projects."
      />

      {/* ── Overview ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="About Us" title="Your Trusted Partner in Scientific Innovation" />

            <div className="space-y-4 text-gray-600 mt-6 text-sm leading-relaxed">
              <p>
                <strong>AEROSOL SCIENTIFIC</strong> is a leading laboratory solutions provider established in the UAE and India. 
                We deliver comprehensive services including instrument sales, consumables, and technical support across life sciences, 
                analytical, diagnostic, medical, and pharmaceutical industries.
              </p>
            </div>

            <blockquote className="mt-6 border-l-4 border-[#1565C0] pl-4 italic text-gray-500 text-sm">
              Supporting laboratories in food testing, energy, environmental, diagnostics, forensic, and research domains — 
              powered by a highly experienced team specializing in chromatography, spectroscopy, and analytical instrumentation.
            </blockquote>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            {whyItems.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
                <div className="font-bold text-sm text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ───────────────────────── */}
    <section className="py-4 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* ── Mission ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5 }}
        className="group relative rounded-3xl p-8 text-white overflow-hidden border border-white/10 shadow-xl backdrop-blur-xl"
      >
        {/* 🔥 Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1565C0] via-[#1E88E5] to-[#0D47A1]" />

        {/* 🔥 Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400/30 blur-3xl opacity-40 group-hover:opacity-70 transition" />

        {/* 🔥 Glass overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-40" />
            <div className="relative w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Target size={26} className="text-white drop-shadow-lg" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 tracking-tight">
            Our Mission
          </h2>

          <p className="text-blue-100 leading-relaxed text-sm">
            To deliver innovative, reliable, and end-to-end laboratory solutions by combining advanced technology, expert support,
            and uncompromising quality — enabling laboratories to achieve precision, efficiency, and excellence in every operation.
          </p>
           <p className="mt-5 font-semibold text-white">
            🚀 Shaping the Future of Science with Innovation & Excellence
          </p>
        </div>
      </motion.div>

      {/* ── Vision ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative rounded-3xl p-8 text-white overflow-hidden border border-white/10 shadow-xl backdrop-blur-xl"
      >
        {/* 🔥 Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00838F] via-[#00ACC1] to-[#006064]" />

        {/* 🔥 Glow */}
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-400/30 blur-3xl opacity-40 group-hover:opacity-70 transition" />

        {/* 🔥 Glass overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-40" />
            <div className="relative w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Eye size={26} className="text-white drop-shadow-lg" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 tracking-tight">
            Our Vision
          </h2>

          <ul className="text-teal-100 space-y-2 text-sm leading-relaxed">
            <li>• A leading provider of innovative and reliable laboratory solutions</li>
            <li>• Empower scientific discovery with cutting-edge technology</li>
            <li>• Contribute to global research and development advancements</li>
            <li>• Ensure precision, quality, and sustainability in every solution</li>
            <li>• Build long-term partnerships through exceptional value and service</li>
          </ul>

         
        </div>
      </motion.div>

    </div>
  </div>
</section>

      {/* ── Core Values ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Our DNA" title="Core Values" centered />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white drop-shadow-md" />
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="py-16 bg-[#0586D3] text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">
            Your Partner for Quick & Cost-Effective Lab Solutions
          </h2>

          <p className="text-blue-200 mb-6">
            Contact us today to discuss your laboratory requirements.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] font-bold px-8 py-3 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  )
}