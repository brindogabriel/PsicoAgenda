'use client'
import { useFeriados } from '@/hooks/use-feriados'
import { useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import type {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core'
import type { Appointment } from '@/lib/types'

interface CalendarViewProps {
  appointments: Appointment[]
  onEventClick: (id: string) => void
  onDateSelect: (date: string, time?: string) => void
  onEventDrop: (info: EventDropArg) => void | Promise<void>
}

const estadoColors: Record<
  Appointment['estado'],
  { bg: string; border: string; text: string }
> = {
  confirmada: {
    bg: 'hsl(168 40% 40% / 0.2)',
    border: 'hsl(168 40% 40%)',
    text: 'hsl(168 40% 30%)',
  },
  pendiente: {
    bg: 'hsl(43 74% 66% / 0.25)',
    border: 'hsl(43 74% 50%)',
    text: 'hsl(43 74% 30%)',
  },
  cancelada: {
    bg: 'hsl(0 84% 60% / 0.15)',
    border: 'hsl(0 84% 60%)',
    text: 'hsl(0 84% 40%)',
  },
}

export function CalendarView({
  appointments,
  onDateSelect,
  onEventClick,
  onEventDrop,
}: CalendarViewProps) {
  const { feriadosData } = useFeriados()

  const events = useMemo(
    () =>
      appointments.map(a => {
        const colors = estadoColors[a.estado]
        return {
          id: a.id,
          title: `${a.pacienteNombre} - ${a.tipo}`,
          start: `${a.fecha}T${a.horaInicio}`,
          end: `${a.fecha}T${a.horaFin}`,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          textColor: colors.text,
          extendedProps: { estado: a.estado },
        }
      }),
    [appointments],
  )

  function handleDateSelect(selectInfo: DateSelectArg) {
    const dateStr = selectInfo.startStr.split('T')[0]
    const timeStr = selectInfo.startStr.includes('T')
      ? selectInfo.startStr.split('T')[1]?.substring(0, 5)
      : undefined
    onDateSelect(dateStr, timeStr)
  }

  function handleEventClick(clickInfo: EventClickArg) {
    onEventClick(clickInfo.event.id)
  }

  const feriadosSet = useMemo(
    () => new Set(feriadosData?.map((f: any) => f.fecha)),
    [feriadosData],
  )

  const feriadosEvents =
    feriadosData?.map((f: any) => ({
      id: `feriado-${f.fecha}`,
      title: `Feriado: ${f.nombre}`,
      start: f.fecha,
      allDay: true,
      color: '#ef4444',
      textColor: '#fff',
      editable: false,
      overlap: false,
    })) || []

  return (
    <div className="fc-psicoagenda">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        locale="es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Dia',
          list: 'Lista',
        }}
        eventDidMount={info => {
          if (info.event.id.startsWith('feriado')) {
            info.el.title = info.event.title
          }
        }}
        eventAllow={dropInfo => {
          const date = dropInfo.startStr.split('T')[0]
          const esFeriado = feriadosSet.has(date)
          return dropInfo.start >= new Date() && !esFeriado
        }}
        events={[...events, ...feriadosEvents]}
        selectable
        selectMirror
        select={handleDateSelect}
        editable={true}
        selectAllow={selectInfo => {
          const date = selectInfo.startStr.split('T')[0]
          const esFeriado = feriadosSet.has(date)
          return selectInfo.start >= new Date() && !esFeriado
        }}
        eventClick={info => {
          if (info.event.id.startsWith('feriado')) return
          handleEventClick(info)
        }}
        eventDrop={onEventDrop}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        height="auto"
        nowIndicator
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
      />
    </div>
  )
}





