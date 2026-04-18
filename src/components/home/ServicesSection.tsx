'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FlaskConical, Wrench, GraduationCap, Microscope, Settings, FileCheck, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const services = [
  {
    icon: Wrench,
    title: 'Turnkey Laboratory Projects',
    description: 'Complete lab setup including instruments, furniture, safety equipment, fume hoods, gas systems, and SS furniture. Full compliance environment.',
    color: 'from-[#1565C0] to-[#0D47A1]',
    tag: 'End-to-End',
  },
  {
    icon: Settings,
    title: 'After-Sales Service',
    description: 'Economical service with multiple contract options. Preventive maintenance, repair services, and application support to minimize downtime.',
    color: 'from-[#00838F] to-[#006064]',
    tag: '24hr Response',
  },
  {
    icon: GraduationCap,
    title: 'Educational Support',
    description: 'Training in Basics of Chromatography, Method Development, Trouble Shooting, Basic Repair & Maintenance for academic and research labs.',
    color: 'from-[#6A1B9A] to-[#4A148C]',
    tag: 'Workshops',
  },
  {
    icon: Microscope,
    title: 'Laboratory Instrument Sales',
    description: 'Full range of instruments from leading global manufacturers with warranty service support and extended options.',
    color: 'from-[#2E7D32] to-[#1B5E20]',
    tag: 'Global OEM',
  },
  {
    icon: FlaskConical,
    title: 'Multi Vendor Support',
    description: 'Expert support for Agilent, Sciex, Waters, Shimadzu instruments. LCMS, HPLC, GC, GCMS, ICPMS at reduced cost.',
    color: 'from-[#E65100] to-[#BF360C]',
    tag: 'Cost Saving',
  },
  {
    icon: FileCheck,
    title: 'Service Contracts',
    description: 'Comprehensive, labor, or trade maintenance contracts. Scheduled services, breakdown service, repairs, training, and compliance services.',
    color: 'from-[#AD1457] to-[#880E4F]',
    tag: 'Flexible Plans',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="What We Do"
            title="Our |Services"
            subtitle="Tailored solutions for all your laboratory needs — from instruments to turnkey lab setup."
          />
          <Link href="/services" className="flex items-center gap-2 text-[#1565C0] font-semibold text-sm hover:gap-3 transition-all shrink-0">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-400"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-bold bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full">{service.tag}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#1565C0] transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}