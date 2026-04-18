'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/constants'

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <SectionHeading
            eyebrow="Our Network"
            title="Trusted |Partners & Brands"
            subtitle="We collaborate with world-class manufacturers to bring you the finest instruments and consumables."
            centered
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {PARTNERS.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.href}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-white"
            >
              <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-gray-50">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain p-1 filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-[#1565C0] font-medium text-center leading-tight transition-colors">
                {partner.name}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/partners" className="text-[#1565C0] text-sm font-semibold hover:underline">
            View All Partners →
          </Link>
        </div>
      </div>
    </section>
  )
}