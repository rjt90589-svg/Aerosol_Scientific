'use client'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed', description: 'Successful lab setups delivered' },
  { value: 200, suffix: '+', label: 'Happy Clients', description: 'Across UAE and India' },
  { value: 10, suffix: '+', label: 'Years Experience', description: 'In scientific instruments' },
  { value: 15, suffix: '+', label: 'Global Partners', description: 'World-class OEM brands' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0D2240] via-[#1565C0] to-[#00838F] relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 sci-grid-bg opacity-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 bg-white/10 border border-white/20"
            >
              <div className="text-4xl md:text-5xl font-bold mb-1 text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-blue-100 mb-1">{stat.label}</div>
              <div className="text-xs text-blue-200 opacity-80">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}