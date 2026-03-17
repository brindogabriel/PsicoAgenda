'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        {children}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </main>
    </div>
  )
}

export default AppLayout
