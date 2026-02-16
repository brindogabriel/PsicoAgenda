import {
  CalendarDays,
  ClipboardList,
  FileText,
  Bell,
  BarChart3,
  Lock,
} from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    title: "Agenda inteligente",
    description:
      "Vista diaria, semanal y mensual para organizar las citas de cada profesional de forma clara y eficiente.",
  },
  {
    icon: ClipboardList,
    title: "Expedientes clinicos",
    description:
      "Historial completo por paciente con diagnosticos, tratamientos y antecedentes, todo estructurado y accesible.",
  },
  {
    icon: FileText,
    title: "Notas de sesion",
    description:
      "Registro detallado de cada sesion con plantillas adaptables al tipo de consulta y especialidad.",
  },
  {
    icon: Bell,
    title: "Recordatorios",
    description:
      "Sistema de notificaciones para reducir ausencias y mantener a los pacientes informados sobre sus proximas citas.",
  },
  {
    icon: BarChart3,
    title: "Reportes",
    description:
      "Visualizacion de datos sobre sesiones realizadas, asistencia y evolucion de la actividad del consultorio.",
  },
  {
    icon: Lock,
    title: "Seguridad y privacidad",
    description:
      "Proteccion de datos sensibles con encriptacion y cumplimiento de normativas de proteccion de datos de salud.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Funcionalidades
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-5xl text-balance">
            Que ofrece PsicoAgenda
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Un conjunto de herramientas pensadas para que los profesionales de
            salud mental se enfoquen en lo importante: sus pacientes.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
