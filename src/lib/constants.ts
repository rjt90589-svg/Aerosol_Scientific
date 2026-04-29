export const SITE_NAME = 'Aerosol Scientific'
export const SITE_TAGLINE = 'Delivering Excellence in Scientific Instruments & Services'
export const SITE_EMAIL_SUPPORT = 'support@aerosolscientific.com'
export const SITE_EMAIL_SALES = 'sales@aerosolscientific.com'
export const SITE_PHONE_UAE = '+971-547598109'
export const SITE_PHONE_INDIA = '+91 98919 38724'
export const SITE_ADDRESS_UAE = '108-AL MAZROUA, AN-2, Dubai, UAE'
export const SITE_ADDRESS_INDIA = 'F-4, 1st Floor, Karka Duma, New Delhi-110092'
export const WHATSAPP_NUMBER = '+971547598109'
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', children: [
    { label: 'Mission & Vision', href: '/about#mission' }
  ]},
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact Us', href: '/contact' },
]

export const PRODUCT_CATEGORIES = [
  'All',
  'Vials',
  'Septa',
  'Manual Vial Crimpers & Decappers',
  'Photometry',
  'Titration',
  'Thermal Analysis',
  'Gas Handling',
  'Lab Infrastructure',
  'Gas Generators',
  'Tablet Testing',
  'Gas Safety',
  'pH & Electrochemistry',
  'Ultrasonic Equipment',
  
]

export const PARTNERS = [
  { name: 'Thermolab Scientific', logo: '/partners/Thermolab-scientific.jpg', href: '/partners#thermolab' },
  { name: 'Witeg Germany', logo: '/partners/Witeg-Germany-logo.jpg', href: '/partners#witeg' },
  { name: 'PCi Analytics', logo: '/partners/Pci-Analytics-logo.jpg', href: '/partners#pci' },
  { name: 'FDGSi', logo: '/partners/FDGS-logo.jpg', href: '/partners#fdgsi' },
  { name: 'Sartorius', logo: '/partners/sartorius-logo.jpg', href: '#' },
  { name: 'Eppendorf', logo: '/partners/eppendorf-logo.jpg', href: '#' },
  { name: 'Torontech', logo: '/partners/torontech-logo.jpg', href: '#' },
  { name: 'Luminultra', logo: '/partners/luminultra-logo.jpg', href: '#' },
  { name: 'Silverson', logo: '/partners/silverson-logo.jpg', href: '#' },
  { name: 'IKA', logo: '/partners/ika-logo.jpg', href: '#' },
]

export const SUPABASE_STORAGE_BUCKET = 'product-images'