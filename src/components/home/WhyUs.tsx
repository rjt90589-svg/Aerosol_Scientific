'use client'
import { motion } from 'framer-motion'
import { Shield, Users, Zap, DollarSign, Star, Headphones } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const features = [
  {
    icon: Users,
    title: 'Partnership',
    description: 'We collaborate as a team and take ownership to create long-lasting partnerships.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Products sourced from reputed global manufacturers with warranty and quality guarantees.',
    color: 'from-teal-500 to-teal-700',
  },
  {
    icon: Star,
    title: 'Comprehensive Range',
    description: 'Equipment, consumables, lab furniture — everything for your laboratory needs.',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Making advanced research accessible with cost-effective solutions without compromise.',
    color: 'from-green-500 to-green-700',
  },
  {
    icon: Zap,
    title: 'On-Time Service',
    description: 'Services within 24 hours. Guaranteed on-time support to minimize downtime.',
    color: 'from-orange-500 to-orange-700',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Highly qualified professionals with rich experience in analytical instruments.',
    color: 'from-rose-500 to-rose-700',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-white sci-grid-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-14">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why |Aerosol Scientific?"
            subtitle="Our experienced team understands the industry and its challenges. We ensure quick, reliable, and cost-effective services."
            centered
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-5 rounded-2xl`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}