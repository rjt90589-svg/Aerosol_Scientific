'use client'
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { SITE_PHONE_UAE, SITE_PHONE_INDIA, SITE_EMAIL_SALES, SITE_ADDRESS_UAE, SITE_ADDRESS_INDIA } from '@/lib/constants'

export default function TopBar() {
  const [office, setOffice] = useState<'uae' | 'india'>('uae')

  const data = {
    uae: { phone: SITE_PHONE_UAE, address: SITE_ADDRESS_UAE },
    india: { phone: SITE_PHONE_INDIA, address: SITE_ADDRESS_INDIA }
  }

  return (
    <div className="bg-gradient-to-r from-[#0D47A1] to-[#00838F] text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="opacity-80" />
            <span className="opacity-90">{data[office].address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={12} className="opacity-80" />
            <a href={`tel:${data[office].phone}`} className="opacity-90 hover:opacity-100 hover:underline">
              {data[office].phone}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={12} className="opacity-80" />
            <a href={`mailto:${SITE_EMAIL_SALES}`} className="opacity-90 hover:opacity-100 hover:underline">
              {SITE_EMAIL_SALES}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setOffice('uae')}
            className={`px-3 py-0.5 rounded text-xs font-medium transition-all ${office === 'uae' ? 'bg-white text-[#0D47A1]' : 'opacity-70 hover:opacity-100'}`}
          >
            🇦🇪 UAE Office
          </button>
          <button
            onClick={() => setOffice('india')}
            className={`px-3 py-0.5 rounded text-xs font-medium transition-all ${office === 'india' ? 'bg-white text-[#0D47A1]' : 'opacity-70 hover:opacity-100'}`}
          >
            🇮🇳 India Office
          </button>
        </div>
      </div>
    </div>
  )
}