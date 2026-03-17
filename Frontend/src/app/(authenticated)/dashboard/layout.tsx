'use client'

import type { ReactNode } from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar-nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background" suppressHydrationWarning>
      <DashboardSidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}

