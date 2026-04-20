import HeroSlider from '@/components/home/HeroSlider'
import WhyUs from '@/components/home/WhyUs'
import ServicesSection from '@/components/home/ServicesSection'
import StatsSection from '@/components/home/StatsSection'
import PartnersSection from '@/components/home/PartnersSection'
import ContactSection from '@/components/home/ContactSection'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/products/ProductCard'
import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'
import NewHeroSlider from '@/components/home/NewHeroSlider'
import WhatWeProvide from '@/components/home/WhatWeProvide'
import AnalabHeroSlider from '@/components/home/Analabheroslider'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4)

  return (
    <>
      {/* <HeroSlider /> */}
      {/* <NewHeroSlider/> */}
      <AnalabHeroSlider />
      <WhyUs />
<WhatWeProvide />
      {/* Featured Products */}
      {products && products.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionHeading
                eyebrow="Featured Products"
                title="Popular |Products"
                subtitle="High-quality chromatography consumables and laboratory supplies."
              />
              <Link href="/products" className="text-[#1565C0] font-semibold text-sm hover:underline shrink-0">
                View All Products →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <StatsSection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
    </>
  )
}