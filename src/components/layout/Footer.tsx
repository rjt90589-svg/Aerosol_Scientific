import Link from 'next/link'
import { FlaskConical, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'
import { SITE_ADDRESS_UAE, SITE_ADDRESS_INDIA, SITE_EMAIL_SALES, SITE_EMAIL_SUPPORT, SITE_PHONE_UAE, SITE_PHONE_INDIA } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0A1628] via-[#0D2240] to-[#0A2535] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center">
                <FlaskConical size={18} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-lg leading-tight block">Aerosol Scientific</span>
                <span className="text-[10px] text-[#00ACC1] uppercase tracking-widest">Lab Excellence</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Delivering excellence in scientific instruments, consumables, and complete laboratory solutions across UAE and India.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#1565C0] flex items-center justify-center transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#00ACC1] mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Services', href: '/services' },
                { label: 'Partners', href: '/partners' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transition-transform">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* UAE Office */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#00ACC1] mb-4">🇦🇪 UAE Office</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-gray-400 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5 text-[#00ACC1]" />
                <span>{SITE_ADDRESS_UAE}</span>
              </li>
              <li className="flex gap-2.5 text-gray-400 text-sm">
                <Phone size={14} className="shrink-0 mt-0.5 text-[#00ACC1]" />
                <a href={`tel:${SITE_PHONE_UAE}`} className="hover:text-white">{SITE_PHONE_UAE}</a>
              </li>
            </ul>
          </div>

          {/* India Office */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#00ACC1] mb-4">🇮🇳 India Office</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-gray-400 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5 text-[#00ACC1]" />
                <span>{SITE_ADDRESS_INDIA}</span>
              </li>
              <li className="flex gap-2.5 text-gray-400 text-sm">
                <Phone size={14} className="shrink-0 mt-0.5 text-[#00ACC1]" />
                <a href={`tel:${SITE_PHONE_INDIA}`} className="hover:text-white">{SITE_PHONE_INDIA}</a>
              </li>
              <li className="flex gap-2.5 text-gray-400 text-sm">
                <Mail size={14} className="shrink-0 mt-0.5 text-[#00ACC1]" />
                <a href={`mailto:${SITE_EMAIL_SALES}`} className="hover:text-white">{SITE_EMAIL_SALES}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 Aerosol Scientific. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-gray-300">Admin</Link>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}