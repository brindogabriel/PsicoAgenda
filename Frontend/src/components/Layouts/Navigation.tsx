import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import NavLink from '@/components/NavLink'
import Dropdown from '@/components/Dropdown'
import ResponsiveNavLink, {
  ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import ApplicationLogo from '@/components/ApplicationLogo'

import { UserType } from '@/types/User'
import { useAuth } from '@/hooks/auth'

type NavProps = {
  user: UserType
  theme?: 'light' | 'dark'
  toggleTheme?: () => void
}

const Navigation = ({ user, theme, toggleTheme }: NavProps) => {
  const pathname = usePathname()

  const { logout } = useAuth({})
  const [open, setOpen] = useState<boolean>(false)

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/dashboard">
                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <NavLink href="/dashboard" active={pathname === '/dashboard'}>
                Dashboard
              </NavLink>
            </div>
          </div>

          {/* Right controls */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
            <Link href="/pacientes/nuevo">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors">
                Agregar Paciente
              </button>
            </Link>

            <button
              onClick={() => toggleTheme && toggleTheme()}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cambiar tema">
              {theme === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zM4.22 4.22a.75.75 0 011.06 0l.88.88a.75.75 0 11-1.06 1.06l-.88-.88a.75.75 0 010-1.06zM14.84 14.84a.75.75 0 011.06 0l.88.88a.75.75 0 11-1.06 1.06l-.88-.88a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75H4a.75.75 0 010 1.5H2.75A.75.75 0 012 10zM16 10a.75.75 0 01.75-.75H18a.75.75 0 010 1.5h-1.25A.75.75 0 0116 10zM4.22 15.78a.75.75 0 010-1.06l.88-.88a.75.75 0 111.06 1.06l-.88.88a.75.75 0 01-1.06 0zM14.84 5.16a.75.75 0 010-1.06l.88-.88a.75.75 0 111.06 1.06l-.88.88a.75.75 0 01-1.06 0zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <Dropdown
              align="right"
              width={48}
              trigger={
                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-hidden transition duration-150 ease-in-out">
                  <div className="hidden sm:block mr-2">{user?.name}</div>

                  <div className="ml-1">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              }>
              {/* Authentication */}
              <DropdownButton onClick={logout}>Logout</DropdownButton>
            </Dropdown>
          </div>

          {/* Hamburger */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(open => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                {open ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Menu */}
      {open && (
        <div className="block sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href="/dashboard"
              active={pathname === '/dashboard'}>
              Dashboard
            </ResponsiveNavLink>
          </div>

          {/* Responsive Settings Options */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="shrink-0">
                <svg
                  className="h-10 w-10 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="ml-3">
                <div className="font-medium text-base text-gray-800">
                  {user?.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {/* Authentication */}
              <ResponsiveNavButton onClick={logout}>Logout</ResponsiveNavButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
