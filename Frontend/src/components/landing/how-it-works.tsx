import { UserPlus, Settings, CalendarCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Registra tu cuenta",
    description:
      "Crea tu perfil como profesional de salud mental. Define tu especialidad y configura tus horarios de atencion.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configura tu consultorio",
    description:
      "Carga tus pacientes, define los tipos de sesion que ofreces y personaliza las plantillas de notas clinicas.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Gestiona tu practica",
    description:
      "Organiza citas, registra notas de sesion y accede al historial clinico de tus pacientes desde cualquier dispositivo.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Como funciona
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-5xl text-balance">
            Simple y directo
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            PsicoAgenda esta pensado para ser intuitivo desde el primer uso,
            sin curva de aprendizaje.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute top-14 hidden h-px bg-border lg:block"
                  style={{
                    width: "calc(100% - 3rem)",
                    left: "calc(50% + 1.5rem)",
                  }}
                />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
