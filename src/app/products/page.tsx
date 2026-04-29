import { Suspense } from 'react'
import ProductsContent from './ProductsContent'
import PageHero from '@/components/ui/PageHero'

function ProductsLoading() {
  return (
    <>
      <PageHero
        eyebrow="Our Range"
        title="Products & Consumables"
        subtitle="Genuine chromatography consumables, vials, septa and lab supplies from certified sources."
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
          ))}
        </div>
      </div>
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  )
}