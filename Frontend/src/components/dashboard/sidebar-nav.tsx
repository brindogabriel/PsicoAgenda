'use client'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Plug,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import ApplicationLogo from '@/components/ApplicationLogo'

const navItems = [
  { title: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Calendario', href: '/dashboard/calendario', icon: CalendarDays },
  { title: 'Pacientes', href: '/dashboard/pacientes', icon: Users },
  { title: 'Integraciones', href: '/dashboard/integraciones', icon: Plug },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Abrir menu">
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-foreground">
          PsicoAgenda
        </span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onKeyDown={() => {}}
            role="presentation"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-card border-r border-border shadow-xl">
            <SidebarContent
              pathname={pathname}
              onLinkClick={() => setOpen(false)}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:text-foreground"
              aria-label="Cerrar menu">
              <X className="h-5 w-5" />
            </button>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  )
}

function SidebarContent({
  pathname,
  onLinkClick,
}: {
  pathname: string
  onLinkClick?: () => void
}) {
  const { user } = useAuth({ middleware: 'auth' })
  const { logout } = useAuth({})
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-foreground">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
            <path d="M12 2c-2.76 0-5 4.48-5 10s2.24 10 5 10" />
            <path d="M2 12h10" />
          </svg>
        </div>
        <span className="text-lg font-bold tracking-tight text-card-foreground">
          PsicoAgenda
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Navegacion
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map(item => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-card-foreground'
                  }`}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <button
            onClick={logout}
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-card-foreground">
            <LogOut className="h-4 w-4" />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </div>
  )
}
