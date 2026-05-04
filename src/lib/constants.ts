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
  
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Partners', href: '/partners' },
  { label: 'About Us', href: '/about', children: [
    { label: 'Mission & Vision', href: '/about#mission' }
  ]},
  { label: 'Contact Us', href: '/contact' },
]

// ── Product Categories ────────────────────────────────────────────────────────
// Each entry has a top-level `name` and an optional list of `subcategories`.
// Used for filter UI in /products and for admin product forms.

export const PRODUCT_CATEGORIES = [
  {
    name: "Pricision Lab Equipments-Thermolab Scientific",
    subcategories: [
      "Stability / Photostability chambers",
      "Biological/BOD Incubators",
      "Oven/Vacuum Ovens",
      "Dual Chambers",
      "Walk-in Chambers",
      "Clean Room",
      "Cold Chain (Freezers)",
      "Sterilizers (Vertical/Horizontal)",
    ],
  },
  {
    name: "General Laboratory Equipment",
    subcategories: [
      "Water Bath",
      "Shaking Water Bath",
      "Hot Plate",
      "Magnetic Stirrer",
      "Overhead Stirrers",
      "Shakers and Mixers",
      "Heating Mantle",
      "Incubators",
      "CO2/Shaking Incubators",
      "Furnaces/Ovens",
      "Distillation",
      "Rotary Evaporator",
      "Centrifuge Tubes",
      "Benchtop/Mini Centrifuges",
      "Filtration",
      "Microscopes",
      "Refractometers",
      "Spectrophotometers",
      "Microplate Reader",
      "Ultrasonic Cleaner",
    ],
  },
  {
    name: "Chromatography Consumables",
    subcategories: [
      "Vials, Caps and Septa",
      "HPLC Columns",
    ],
  },
  {
    name: "Liquid Handling (Purifiers/Pipettes/Tips)",
    subcategories: [
      "Purification Systems",
      "Pipettes and Tips",
      "Dispensing",
      "Titration",
      "Pumps",
    ],
  },
  {
    name: "General Laboratory Consumables",
    subcategories: [
      "Glassware",
      "Plasticware",
      "Occupational Safety Protection",
    ],
  },
  {
    name: "Analytical Instruments",
    subcategories: [
      "Liquid Chromatography (HPLC/LCMS)",
      "Gas Chromatography (GC/GCMS)",
    ],
  },
  {
    name: "Gas and Vacuum Technology",
    subcategories: [
      "N2 Generators",
      "H2 Generators",
      "Vacuum Pumps",
    ],
  },
  {
    name: "Measurement and Testing Equipment",
    subcategories: [
      "Balances",
      "pH / Conductivity / Oxygen / Multiparameter Meters",
      "Data Loggers (Temp/Humidity)",
      "Laboratory Thermometers",
      "Density Meters",
      "Viscometers",
      "Material Testing",
    ],
  },
  {
    name: "Medical and Pharma Consumables",
    subcategories: [
      "Surgical Masks",
      "Gloves/Covers",
      "Gowns",
      "Biology Models",
      "Medical Kits",
    ],
  },
  {
    name: "Refurbished Analytical Instruments",
    subcategories: [
      "HPLC/LCMS",
      "GC/GCMS",
    ],
  },
  { name: "Turn key projects",
     subcategories: [
        "Laboratory civil work",
     "Furnitures",
     "Safety equipment",
     "Fume hood"
     ] },
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
  "Pricision Lab Equipments-Thermolab Scientific": "🏭", // heavy systems / infrastructure

  "General Laboratory Equipment": "🧪", // generic lab tools

  "Chromatography Consumables": "🧬", // precision / separation science

  "Liquid Handling (Purifiers/Pipettes/Tips)": "💧", // fluid handling

  "General Laboratory Consumables": "📦", // bulk / everyday items

  "Analytical Instruments": "📊", // analysis / data

  "Gas and Vacuum Technology": "💨", // gas systems

  "Measurement and Testing Equipment": "📏", // measurement

  "Medical and Pharma Consumables": "🏥", // healthcare

  "Refurbished Analytical Instruments": "♻️", // reused / refurbished

  "Turn key projects": "🔧", // services / projects
}

// Derived flat list of all category names — useful for validation / select inputs
export const CATEGORY_NAMES = PRODUCT_CATEGORIES.map(c => c.name)

// Derived flat list of all subcategory names — useful for validation
export const ALL_SUBCATEGORY_NAMES = PRODUCT_CATEGORIES.flatMap(c => c.subcategories)

// Helper: get subcategories for a given category name
export function getSubcategories(categoryName: string): readonly string[] {
  return PRODUCT_CATEGORIES.find(c => c.name === categoryName)?.subcategories ?? []
}

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