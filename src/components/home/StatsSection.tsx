'use client'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 10, suffix: '+', label: 'Projects Completed', description: 'Successful Lab setup and Instrument Delivery' },
  { value: 200, suffix: '+', label: 'Happy Clients',       description: 'Globally' },
  { value: 20,  suffix: '+', label: 'Years Experience',    description: 'In scientific instruments' },
  { value: 15,  suffix: '+', label: 'Global Partners',     description: 'World-class OEM brands' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-grad-hero relative overflow-hidden">

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 sci-grid-dark opacity-60" />

      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl animate-orb"
           style={{ background: 'radial-gradient(circle, rgba(29,95,212,0.25), transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl animate-orb"
           style={{ background: 'radial-gradient(circle, rgba(123,47,190,0.20), transparent 70%)' }} />

      {/* Spectrum top bar */}
      <div className="absolute top-0 left-0 right-0 spectrum-bar" />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2">
            By the numbers
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white text-glow">
            Trusted by labs across{' '}
            <span className="gradient-text-spectrum">two continents</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Spectrum top accent line — appears on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-grad-spectrum opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="text-4xl md:text-5xl font-display font-bold mb-1 gradient-text-spectrum">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>

              <div className="font-semibold text-white/90 text-sm mb-1">
                {stat.label}
              </div>

              <div className="text-xs text-white/50">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Spectrum bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 spectrum-bar" />
    </section>
  )
}