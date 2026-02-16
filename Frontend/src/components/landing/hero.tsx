import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Code } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Proyecto en desarrollo
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
            Gestion de citas y pacientes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            PsicoAgenda es un sistema pensado para psicologos y psiquiatras que
            necesitan organizar su consultorio: citas, expedientes clinicos y
            notas de sesion, todo en un solo lugar.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8 text-base"
            asChild>
            <a href="/login">
              Acceder al sistema
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-8 text-base border-border text-foreground hover:bg-secondary bg-transparent"
            asChild>
            <a href="#features">Conocer funcionalidades</a>
          </Button>
        </div>

        {/* Info badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground md:gap-10">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            <span>Datos protegidos</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-accent" />
            <span>En desarrollo activo</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span>Enfoque en privacidad</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="rounded-xl border border-border bg-card p-2 shadow-2xl shadow-foreground/5">
            <div className="rounded-lg bg-secondary/50 p-6 md:p-8">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-accent/60" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-24 rounded bg-muted" />
                  <div className="h-5 w-5 rounded bg-accent/20" />
                </div>
              </div>

              {/* Mock summary cards */}
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <DashboardCard
                  label="Citas hoy"
                  value="8"
                  detail="3 confirmadas"
                />
                <DashboardCard
                  label="Pacientes activos"
                  value="47"
                  detail="12 esta semana"
                />
                <DashboardCard
                  label="Proxima cita"
                  value="10:30"
                  detail="Maria Garcia"
                />
              </div>

              {/* Mock appointment list */}
              <div className="mt-6 space-y-3">
                {[
                  {
                    time: '09:00',
                    name: 'Carlos Mendez',
                    type: 'Terapia individual',
                    status: 'confirmed',
                  },
                  {
                    time: '10:30',
                    name: 'Maria Garcia',
                    type: 'Evaluacion inicial',
                    status: 'confirmed',
                  },
                  {
                    time: '12:00',
                    name: 'Ana Lopez',
                    type: 'Seguimiento',
                    status: 'pending',
                  },
                ].map(apt => (
                  <div
                    key={apt.time}
                    className="flex items-center justify-between rounded-lg bg-card px-4 py-3">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-accent">
                        {apt.time}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {apt.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {apt.type}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${
                        apt.status === 'confirmed'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                      {apt.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="rounded-lg bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-accent">{detail}</p>
    </div>
  )
}
