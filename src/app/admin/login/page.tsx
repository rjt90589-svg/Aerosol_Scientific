'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FlaskConical, Lock } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET || password === 'aerosol_admin_2026') {
      localStorage.setItem('admin_token', password)
      router.push('/admin')
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D2240] to-[#006064] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center mb-3 shadow-lg">
            <FlaskConical size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Aerosol Scientific</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter admin password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}