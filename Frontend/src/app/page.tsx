'use client'

import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'
import { useAuth } from '@/hooks/auth'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}

