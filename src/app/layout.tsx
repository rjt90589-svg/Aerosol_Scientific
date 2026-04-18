import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Aerosol Scientific | Scientific Instruments & Lab Solutions',
  description: 'Delivering Excellence in Scientific Instruments & Services. Chromatography, Lab Equipment, Turnkey Lab Projects, After-Sales Service across UAE & India.',
  keywords: 'scientific instruments, HPLC, GC, chromatography, lab equipment, Dubai, India, laboratory solutions',
  openGraph: {
    title: 'Aerosol Scientific',
    description: 'Delivering Excellence in Scientific Instruments & Services',
    url: 'https://aerosolscientific.com',
    siteName: 'Aerosol Scientific',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}