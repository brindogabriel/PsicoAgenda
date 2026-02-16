import { Nunito } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

import type { Metadata } from 'next'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PsicoAgenda',
  description:
    'PsicoAgenda es una aplicación de gestión de citas para psicólogos, diseñada para facilitar la organización y administración de sus consultas. Con PsicoAgenda, los profesionales de la salud mental pueden programar, gestionar y recordar sus citas de manera eficiente, mejorando la experiencia tanto para ellos como para sus pacientes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${nunito.className} text-gray-900 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
