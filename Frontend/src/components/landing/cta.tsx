import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-16 text-center md:px-16 md:py-20">
          {/* Background accents */}
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-1.5 text-sm font-medium text-background/70">
              <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Proyecto en desarrollo activo
            </div>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl tracking-tight text-background md:text-5xl text-balance">
              PsicoAgenda se esta construyendo pensando en vos
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-background/70 md:text-lg">
              Este sistema nace de la necesidad real de organizar la practica
              clinica en salud mental. Si sos psicologo o psiquiatra, ya podes
              explorar las funcionalidades disponibles.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8 text-base"
                asChild
              >
                <a href="/login">
                  Acceder al sistema
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-background/20 bg-transparent text-background hover:bg-background/10 px-8 text-base"
                asChild
              >
                <a href="#features">Ver funcionalidades</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
