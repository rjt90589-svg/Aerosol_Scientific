'use client'
import ReactCountryFlag from "react-country-flag"
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {
  SITE_PHONE_UAE,
  SITE_PHONE_INDIA,
  SITE_EMAIL_SALES,
  SITE_EMAIL_SUPPORT,
  SITE_ADDRESS_UAE,
  SITE_ADDRESS_INDIA
} from '@/lib/constants'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function TopBar() {
  const [office, setOffice] = useState<'uae' | 'india'>('uae')
  const [open, setOpen] = useState(false)

  const data = {
    uae: { phone: SITE_PHONE_UAE, address: SITE_ADDRESS_UAE },
    india: { phone: SITE_PHONE_INDIA, address: SITE_ADDRESS_INDIA }
  }

  return (
    <div className="bg-sci-blue text-white text-xs">
      <div className="max-w-7xl mx-auto px-2 py-2.5">

        {/* ───────── DESKTOP ───────── */}
        <div className="hidden md:flex items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-center gap-4 flex-wrap">

            {/* Address (hide on small screens) */}
            <div className="hidden lg:flex items-center gap-1.5  ">
              <MapPin size={12} className="opacity-80 shrink-0" />
              <span className="opacity-90 truncate">
                {data[office].address}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="opacity-80" />
              <a href={`tel:${data[office].phone}`} className="hover:underline">
                {data[office].phone}
              </a>
            </div>

            {/* Emails (merged cleaner) */}
            <div className="flex items-center gap-1.5">
              <Mail size={12} className="opacity-80" />
             
              <a href={`mailto:${SITE_EMAIL_SUPPORT}`} className="hover:underline">
                {SITE_EMAIL_SUPPORT}
              </a>
              <span className="opacity-50">|</span>
               <a href={`mailto:${SITE_EMAIL_SALES}`} className="hover:underline">
                {SITE_EMAIL_SALES}
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Socials */}
           <div className="flex items-center gap-3 mr-10">

  <a
    href="#"
    className="hover:opacity-80 transition"
  >
    <FaFacebookF size={16} />
  </a>

  <a
    href="#"
    className="hover:opacity-80 transition"
  >
    <FaInstagram size={16} />
  </a>

  <a
    href="https://in.linkedin.com/company/aerosol-scientific"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition"
  >
    <FaLinkedinIn size={16} />
  </a>

</div>

            {/* Office switch */}
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => setOffice('uae')}
                className={`px-2.5 py-1 rounded ${
                  office === 'uae'
                    ? 'bg-white text-sci-blue'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 leading-none">

                 <ReactCountryFlag  countryCode="AE" svg style={{ width: '16px', height: '12px' }} />
                  UAE Office
                </div>
              </button>
              <button
                onClick={() => setOffice('india')}
                className={`px-2.5 py-1 rounded ${
                  office === 'india'
                    ? 'bg-white text-sci-blue'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                             <div className="flex items-center gap-2 leading-none">

                <ReactCountryFlag className="flex items-center gap-1.5 leading-none" countryCode="IN" svg style={{ width: '16px', height: '12px' }} />
                India Office
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ───────── MOBILE ───────── */}
        <div className="flex md:hidden items-center justify-between">

          {/* Left: Phone */}
          <a
            href={`tel:${data[office].phone}`}
            className="flex items-center gap-1.5"
          >
            <Phone size={13} />
            <span>{data[office].phone}</span>
          </a>

          {/* Right: Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-xs"
          >
            More
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* ───────── MOBILE DROPDOWN ───────── */}
        {open && (
          <div className="mt-2 pt-2 border-t border-white/20 space-y-2 md:hidden">

            {/* Address */}
            <div className="flex items-start gap-1.5">
              <MapPin size={12} className="mt-0.5 shrink-0" />
              <span>{data[office].address}</span>
            </div>

            {/* Emails */}
            <div className="flex items-center gap-2">
              <Mail size={12} />
              <a href={`mailto:${SITE_EMAIL_SALES}`} className="underline">
                Sales
              </a>
              <span>/</span>
              <a href={`mailto:${SITE_EMAIL_SUPPORT}`} className="underline">
                Support
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              <FaFacebookF />
              <FaInstagram />
              
             <a
    href="https://in.linkedin.com/company/aerosol-scientific"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition"
  >
    <FaLinkedinIn  />
  </a>
            </div>

            {/* Office switch */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setOffice('uae')}
                className={`px-2 py-0.5 rounded ${
                  office === 'uae'
                    ? 'bg-white text-sci-blue'
                    : 'bg-white/10'
                }`}
              >
                🇦🇪 UAE
              </button>
              <button
                onClick={() => setOffice('india')}
                className={`px-2 py-0.5 rounded ${
                  office === 'india'
                    ? 'bg-white text-sci-blue'
                    : 'bg-white/10'
                }`}
              >
                🇮🇳 India
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}