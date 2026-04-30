import ContactSection from '@/components/home/ContactSection'
import PageHero from '@/components/ui/PageHero'

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Reach Out" title="Contact Us" subtitle="Have a question or need a quote? Our team is ready to help within 24 hours." />
      <ContactSection />
    </>
  )
}