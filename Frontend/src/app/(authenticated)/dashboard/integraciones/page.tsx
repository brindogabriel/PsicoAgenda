"use client"

import { GoogleCalendarConnect } from "@/components/dashboard/google-calendar-connect"

export default function IntegracionesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Integraciones</h1>
        <p className="text-sm text-muted-foreground">
          Conecta servicios externos para ampliar las funcionalidades de PsicoAgenda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GoogleCalendarConnect />

        <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Mas integraciones pronto</p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Estamos trabajando en nuevas conexiones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
