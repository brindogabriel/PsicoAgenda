'use client'

import type { Appointment } from '@/lib/types'

const estadoBadge: Record<
  Appointment['estado'],
  { label: string; className: string }
> = {
  confirmada: {
    label: 'Confirmada',
    className:
      'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  },
  pendiente: {
    label: 'Pendiente',
    className:
      'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  },
  cancelada: {
    label: 'Cancelada',
    className:
      'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',
  },
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

export function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const todayAppointments = appointments
    .filter(a => a.fecha === todayStr)
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold text-card-foreground">
          Citas de hoy
        </h2>
      </div>
      <div className="divide-y divide-border">
        {todayAppointments.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No hay citas programadas para hoy.
          </p>
        ) : (
          todayAppointments.map(appointment => {
            const badge = estadoBadge[appointment.estado]
            return (
              <div
                key={appointment.id}
                className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className="w-14 text-sm font-medium tabular-nums text-accent">
                    {appointment.horaInicio}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {appointment.pacienteNombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.tipo}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                  {badge.label}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
