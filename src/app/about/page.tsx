'use client'
import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { Target, Eye, Heart, Award, Lightbulb, Users } from 'lucide-react'
import Link from 'next/link'

const values = [
  { icon: Users, title: 'Partnership', description: 'Being an onsite service provider, we collaborate with our customers in all engagements, work as a team, and take ownership to create long-lasting partnerships.' },
  { icon: Heart, title: 'Integrity', description: 'Our services are aimed at our customer\'s interests. We adopt transparent processes and adhere to the highest ethical standards.' },
  { icon: Award, title: 'Passion', description: 'We are passionate about our customer\'s success. Working with utmost dedication and commitment, we focus on complete solution delivery.' },
  { icon: Lightbulb, title: 'Excellence', description: 'By continually focusing on quality and deploying best practices, we bring excellence in our work and add value for our customers.' },
]

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

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="About Us" title="Your Trusted Partner in |Scientific Innovation" />
            <div className="space-y-4 text-gray-600 mt-6 text-sm leading-relaxed">
              <p>Aerosol Scientific provides complete solutions including instrument sales, service, and application support to laboratories in Pharma, Life Sciences, Analytical, and Diagnostic fields.</p>
              <p>We supply a comprehensive range of laboratory, research & testing instruments, consumables, and support to Analytical and Pharma Labs, food testing labs, Energy, Environmental, Diagnostics, Forensic, research and measurement organizations.</p>
              <p>Services through our highly qualified and experienced team cover Liquid & Gas Chromatography and Spectroscopy instruments. We are a trusted partner for innovative and reliable laboratory solutions, offering high-end equipment, consumables, and laboratory furniture as a one-stop solution.</p>
              <p>We aim to contribute to building modern laboratories, supporting access to the latest scientific technologies through a multi-level holistic approach — from supplying consumables to turnkey laboratory projects.</p>
            </div>
            <blockquote className="mt-6 border-l-4 border-[#1565C0] pl-4 italic text-gray-500 text-sm">
              "Aerosol Scientific continues to grow every day. Thanks to our customers, clients, and partners for their full support and confidence in us."
            </blockquote>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            {whyItems.map((item, i) => (
              <div key={item.title} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
                <div className="font-bold text-sm text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-blue-100 leading-relaxed">
                To provide complete, innovative laboratory solutions with uncompromising quality, on-time service, and expert support — empowering researchers, pharma labs, and testing organizations to achieve excellence.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#00838F] to-[#006064] rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-teal-100 leading-relaxed">
                To be the most trusted and comprehensive laboratory solutions provider in the Middle East and South Asia — building modern labs and supporting access to the latest scientific technologies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Our DNA" title="Core |Values" centered />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0D2240] to-[#006064] text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Your Partner for Quick & Cost-Effective Lab Maintenance</h2>
          <p className="text-blue-200 mb-6">Contact us today to discuss your laboratory requirements.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1565C0] font-bold px-8 py-3 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5">
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  )
}