'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FlaskConical, LayoutDashboard, Package, MessageSquare, Star, Mail, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/quotes', label: 'Quote Requests', icon: MessageSquare },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center">
            <FlaskConical size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900">Aerosol Admin</div>
            <div className="text-[10px] text-gray-400">Management Panel</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active ? 'bg-gradient-to-r from-[#1565C0] to-[#0D47A1] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full">
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center"
      >
        <Menu size={18} />
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 bg-white border-r border-gray-100 shadow-sm min-h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  )
}