'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import {CalendarView} from '@/components/dashboard/calendar-view'
import {
  NewEventDialog,
  type NewEventValues,
} from '@/components/dashboard/new-event-dialog'
import { usePatients } from '@/hooks/use-patients'
import { type Appointment } from '@/lib/types'
import { Plus } from 'lucide-react'
import { useAppointments } from '@/hooks/use-appointments'
import axios from '@/lib/axios'
import { AppointmentDetailsDialog } from '@/components/dashboard/appointment-details-dialog'
import { toast } from 'react-toastify'

export default function CalendarioPage() {
  const { appointments, isLoading, mutate, error } = useAppointments()
  const { patients } = usePatients()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const [selectedSlot, setSelectedSlot] = useState<{
    fecha: string
    hora: string
  } | null>(null)

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
        >(null)
    
    const [editingAppointment, setEditingAppointment] =
      useState<Appointment | null>(null)

  const selectedAppointment = useMemo(() => {
    if (!selectedAppointmentId) return null
    return (
      appointments.find(
        (a: { id: any }) => String(a.id) === String(selectedAppointmentId),
      ) || null
    )
  }, [selectedAppointmentId, appointments])

  function closeDialog() {
    setDialogOpen(false)
    setSelectedSlot(null)
    setEditingAppointment(null)
  }

  // Click en un evento del calendario → abre detalles
  function handleEventClick(id: string) {
    setSelectedAppointmentId(id)
    setDetailsOpen(true)
  }

  // Selección de slot vacío en el calendario → abre nueva cita
  const handleDateSelect = useCallback((date: string, time?: string) => {
    setSelectedSlot({ fecha: date, hora: time || '09:00' })
    setDialogOpen(true)
  }, [])

  // Botón "Nueva cita" en el header
  function handleNewClick() {
    const today = new Date()
    const fecha = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    setSelectedSlot({ fecha, hora: '09:00' })
    setDialogOpen(true)
  }

  // Editar desde AppointmentDetailsDialog
  const handleEditEvent = useCallback((appointment: Appointment) => {
    setEditingAppointment(appointment)
    setSelectedSlot({ fecha: appointment.fecha, hora: appointment.horaInicio })
    setDialogOpen(true)
  }, [])

  async function handleSaveEvent(values: NewEventValues) {
    try {
      const start = new Date(`${values.fecha}T${values.horaInicio}`)
      const end = new Date(start.getTime() + values.duracion * 60000)
      const pad = (n: number) => String(n).padStart(2, '0')

      const payload = {
        paciente_id: Number(values.pacienteId),
        fecha_inicio: `${values.fecha} ${values.horaInicio}`,
        fecha_fin: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())} ${pad(end.getHours())}:${pad(end.getMinutes())}`,
        modalidad: 'online',
        tipo: values.tipo,
        notas: values.notas,
      }

      if (editingAppointment) {
        await axios.put(`/api/turnos/${editingAppointment.id}`, payload)
        toast.success('Turno actualizado')
      } else {
        await axios.post('/api/turnos', payload)
        toast.success('Turno creado')
      }

      await mutate()
      closeDialog()
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Error al guardar turno')
    }
  }

  async function handleDeleteAppointment(id: string) {
    try {
      await axios.delete(`/api/turnos/${id}`)
      await mutate()
      setDetailsOpen(false)
      toast.success('Turno eliminado correctamente')
    } catch (err) {
      toast.error('Error al eliminar el turno')
    }
  }

  const handleEventDrop = async (info: any) => {
    const event = info.event

    const formatDate = (date: Date) =>
      date.toLocaleString('sv-SE').replace('T', ' ')

    try {
      await axios.put(`/api/turnos/${event.id}`, {
        fecha_inicio: formatDate(event.start),
        fecha_fin: formatDate(event.end),
      })
      toast.success('Turno movido')
    } catch (error: any) {
      info.revert()
      toast.error('Ese horario ya está ocupado')
    }
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
        onEventClick={handleEventClick}
  onEventDrop={handleEventDrop}
      />

      <NewEventDialog
        open={dialogOpen}
        onClose={closeDialog}
        patients={patients}
        onSave={handleSaveEvent}
        initialData={selectedSlot}
        editingAppointment={editingAppointment}
      />

      <AppointmentDetailsDialog
        open={detailsOpen}
        appointment={selectedAppointment}
        onDelete={handleDeleteAppointment}
        onClose={() => setDetailsOpen(false)}
        onEdit={appointment => {
          setDetailsOpen(false)
          handleEditEvent(appointment)
        }}
      />
    </div>
  )
}
