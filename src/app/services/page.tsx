'use client'
import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'
import { FlaskConical, Wrench, GraduationCap, Microscope, Settings, FileCheck, Check } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Turnkey Laboratory Projects',
    color: 'from-[#1565C0] to-[#0D47A1]',
    description: 'Aerosol Scientific provides complete lab setup as a one-stop solution — from concept and design to full execution.',
    features: [
      'Complete Lab Instruments & Equipment',
      'Laboratory Furniture & Seating',
      'Safety Equipment & Fume Hoods',
      'Fume Extraction Systems',
      'Anti-Vibration Tables',
      'Chemical Storage Solutions',
      'Laboratory Gas Systems',
      'SS Furniture & Emergency Equipment',
      'Full Compliance Environment',
    ],
  },
  {
    icon: Settings,
    title: 'After-Sales Service',
    color: 'from-[#00838F] to-[#006064]',
    description: 'Our goal is to meet customer expectations and ensure on-time service support after sales with multiple contract options.',
    features: [
      'Preventive Maintenance',
      'Repair Services',
      'Application Support',
      'Minimize Downtime',
      'Economical Service Contracts',
      'Multiple Contract Options',
      'Reduced Administrative Costs',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Educational Support',
    color: 'from-[#6A1B9A] to-[#4A148C]',
    description: 'Collaboration with academic institutions to train and support laboratory and research organizations.',
    features: [
      'Basics of Chromatography',
      'Method Development',
      'Trouble Shooting',
      'Basic Repair Training',
      'Basic Maintenance',
      'Hands-on Workshops',
      'Certification Programs',
    ],
  },
  {
    icon: Microscope,
    title: 'Laboratory Instrument Sales',
    color: 'from-[#2E7D32] to-[#1B5E20]',
    description: 'Strong partnerships with leading global manufacturers deliver a full range of instruments with warranty and extended support.',
    features: [
      'Liquid Chromatography (HPLC/UHPLC)',
      'Gas Chromatography (GC/GCMS)',
      'Mass Spectrometry (LCMS)',
      'Spectroscopy Instruments',
      'Gas Generators',
      'Analytical Balances',
      'General Lab Equipment',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Multi Vendor Support',
    color: 'from-[#E65100] to-[#BF360C]',
    description: 'Experienced professionals providing multivendor support for analytical instruments at low cost while maintaining quality.',
    features: [
      'Agilent — LCMS/HPLC/GC/GCMS/ICPMS',
      'Sciex — LCMS',
      'Waters — HPLC/LCMS',
      'Shimadzu — LCMS/HPLC/GC/GCMS',
      'Cost Reduction',
      'Fast Services',
      'Quality Assurance',
    ],
  },
  {
    icon: FileCheck,
    title: 'Service Contracts',
    color: 'from-[#AD1457] to-[#880E4F]',
    description: 'Get the best, fastest service for your lab instruments with comprehensive, labor, or trade maintenance contracts.',
    features: [
      'Comprehensive Contracts',
      'Labor Contracts',
      'Trade Maintenance Contracts',
      'Schedule Services',
      'Breakdown Service & Repairs',
      'Lab & Instruments Relocation',
      'Compliance Services & Trainings',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="What We Offer" title="Our Services" subtitle="Complete laboratory solutions from instrument sales to turnkey lab projects and multi-vendor support." />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-10">
        {services.map((service, i) => {
          const Icon = service.icon
          const isEven = i % 2 === 1
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={isEven ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${service.color} text-white px-4 py-2 rounded-xl mb-4`}>
                  <Icon size={20} />
                  <span className="font-bold text-sm">{service.title}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check size={14} className="text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${isEven ? 'lg:order-1' : ''} bg-gradient-to-br ${service.color} rounded-2xl p-10 flex items-center justify-center min-h-[200px]`}>
                <Icon size={80} className="text-white opacity-80" />
              </div>
            </motion.div>
          )
        })}
      </div>

      <section className="py-16 bg-gradient-to-r from-[#0D2240] to-[#006064] text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Need a Custom Service Plan?</h2>
          <p className="text-blue-200 mb-6">Contact us to discuss your specific laboratory service requirements.</p>
          <Link href="/contact" className="inline-block bg-white text-[#1565C0] font-bold px-8 py-3 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5">
            Talk to Our Experts
          </Link>
        </div>
      </section>
    </>
  )
}