'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (pathname === '/admin/login') { setChecked(true); return }
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setChecked(true)
    }
  }, [pathname, router])

  if (!checked) return null
  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen overflow-auto">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </div>
    </div>
  )
}