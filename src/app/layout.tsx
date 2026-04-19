import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Chatbot from '@/components/chatbot'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Aerosol Scientific | Scientific Instruments & Lab Solutions',
    template: '%s | Aerosol Scientific',
  },
  description:
    'Delivering Excellence in Scientific Instruments & Services. Chromatography consumables, Lab Equipment, Turnkey Lab Projects across UAE & India.',
  keywords:
    'scientific instruments, HPLC, GC, chromatography, lab equipment, Dubai, India, laboratory solutions, aerosol scientific',
  openGraph: {
    title: 'Aerosol Scientific',
    description: 'Delivering Excellence in Scientific Instruments & Services',
    url: 'https://aerosolscientific.com',
    siteName: 'Aerosol Scientific',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <TopBar />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Chatbot/>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{ style: { fontFamily: 'Satoshi, sans-serif' } }}
        />
      </body>
    </html>
  )
}