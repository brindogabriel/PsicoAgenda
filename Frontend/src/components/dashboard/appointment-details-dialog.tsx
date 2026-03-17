'use client'

import { X } from 'lucide-react'
import type { Appointment } from '@/lib/types'
import { formatFechaDMY } from '@/lib/date'
import Swal from 'sweetalert2'

interface AppointmentDetailsDialogProps {
  open: boolean
  appointment: Appointment | null
  onClose: () => void
  onDelete: (id: string) => void
  onEdit: (appointment: Appointment) => void
}

export function AppointmentDetailsDialog({
  open,
  appointment,
  onClose,
  onDelete,
  onEdit,
}: AppointmentDetailsDialogProps) {
  if (!open || !appointment) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-dark dark:text-white">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl border bg-card p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Detalle de la cita</h2>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            <strong>Paciente:</strong> {appointment.pacienteNombre}
          </p>
          <p>
            <strong>Tipo:</strong> {appointment.tipo}
          </p>
          <p>
            <strong>Fecha:</strong> {formatFechaDMY(appointment.fecha)}
          </p>
          <p>
            <strong>Horario:</strong> {appointment.horaInicio} -{' '}
            {appointment.horaFin}
          </p>
          <p>
            <strong>Estado:</strong> {appointment.estado}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={async () => {
              const result = await Swal.fire({
                title: '¿Eliminar turno?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#ef4444',
                theme: 'auto',
              })

              if (result.isConfirmed) {
                onDelete(String(appointment.id))
              }
            }}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 cursor-pointer transition-colors">
            Eliminar turno
          </button>

          <button
            onClick={() => onEdit(appointment)}
            className="rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/20 transition-colors cursor-pointer">
            Editar turno
          </button>

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors cursor-pointer">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
