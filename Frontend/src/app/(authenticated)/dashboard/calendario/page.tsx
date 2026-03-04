'use client'

import { useState, useCallback } from 'react'
import { CalendarView } from '@/components/dashboard/calendar-view'
import {
  NewEventDialog,
  type NewEventValues,
} from '@/components/dashboard/new-event-dialog'
import { mockAppointments, type Appointment } from '@/lib/types'
import { usePatients } from '@/hooks/use-patients'
import { Patient } from '@/lib/types'
import { Plus } from 'lucide-react'

export default function CalendarioPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [defaultDate, setDefaultDate] = useState<string | undefined>()
  const [defaultTime, setDefaultTime] = useState<string | undefined>()
  const { patients, isLoading, error, mutate } = usePatients(() => [])

  const handleDateSelect = useCallback((date: string, time?: string) => {
    setDefaultDate(date)
    setDefaultTime(time)
    setDialogOpen(true)
  }, [])

  function handleSaveEvent(values: NewEventValues) {
    const patient = patients.find(p => p.id === values.pacienteId)
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      pacienteId: values.pacienteId,
      pacienteNombre: patient
        ? `${patient.nombre} ${patient.apellido}`
        : 'Paciente',
      tipo: values.tipo,
      fecha: values.fecha,
      horaInicio: values.horaInicio,
      horaFin: values.horaFin,
      estado: 'pendiente',
      notas: values.notas,
    }
    setAppointments(prev => [...prev, newAppointment])
  }

  function handleNewClick() {
    const today = new Date()
    setDefaultDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
    )
    setDefaultTime('09:00')
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Calendario
          </h1>
          <p className="text-sm text-muted-foreground">
            Visualiza y gestiona tus citas. Selecciona un horario para agendar.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNewClick}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors">
          <Plus className="h-4 w-4" />
          Nueva cita
        </button>
      </div>

      <CalendarView
        appointments={appointments}
        onDateSelect={handleDateSelect}
      />

      <NewEventDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        patients={patients}
        defaultDate={defaultDate}
        defaultTime={defaultTime}
        onSave={handleSaveEvent}
      />
    </div>
  )
}
