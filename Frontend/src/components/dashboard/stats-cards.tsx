'use client'

import { useState, useEffect } from 'react'
import { CalendarDays, Users, Clock } from 'lucide-react'
import type { Appointment, Patient } from '@/lib/types'

interface StatsCardsProps {
  appointments: Appointment[]
  patients: Patient[]
}

export function StatsCards({ appointments, patients }: StatsCardsProps) {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setMounted(true)
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const todayAppointments = mounted
    ? (() => {
        const today = new Date()
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
        return appointments.filter(a => a.fecha === todayStr)
      })()
    : []

  const confirmed = todayAppointments.filter(
    a => a.estado === 'confirmada',
  ).length
  const activePatients = patients.filter(p => p.estado === 'activo').length

  const nextAppointment =
    mounted && now
      ? (() => {
          const current = todayAppointments.find(a => {
            const [startHour, startMinute] = a.horaInicio.split(':').map(Number)
            const [endHour, endMinute] = a.horaFin.split(':').map(Number)

            const startDateTime = new Date(now)
            startDateTime.setHours(startHour, startMinute, 0, 0)

            const endDateTime = new Date(now)
            endDateTime.setHours(endHour, endMinute, 0, 0)

            return (
              a.estado !== 'cancelada' &&
              now >= startDateTime &&
              now <= endDateTime
            )
          })

          if (current) return current

          const nowStr = `${String(now.getHours()).padStart(2, '0')}:${String(
            now.getMinutes(),
          ).padStart(2, '0')}`

          return todayAppointments
            .filter(a => a.horaInicio >= nowStr && a.estado !== 'cancelada')
            .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))[0]
        })()
      : undefined

  const isCurrentAppointmentOngoing =
    mounted && nextAppointment && now
      ? (() => {
          const [startHour, startMinute] = nextAppointment.horaInicio
            .split(':')
            .map(Number)
          const [endHour, endMinute] = nextAppointment.horaFin
            .split(':')
            .map(Number)

          const startDateTime = new Date(now)
          startDateTime.setHours(startHour, startMinute, 0, 0)

          const endDateTime = new Date(now)
          endDateTime.setHours(endHour, endMinute, 0, 0)

          return now >= startDateTime && now <= endDateTime
        })()
      : false

  const nextAppointmentCountdown =
    mounted && nextAppointment && now
      ? (() => {
          if (isCurrentAppointmentOngoing) {
            return 'Ahora'
          }

          const [h, m] = nextAppointment.horaInicio.split(':').map(Number)
          const target = new Date(now)
          target.setHours(h, m, 0, 0)

          const diffMs = target.getTime() - now.getTime()
          const diffSeconds = Math.floor(diffMs / 1000)

          if (diffSeconds <= 0) {
            return 'Ahora'
          }

          if (diffSeconds < 60) {
            return `En ${diffSeconds} segundos`
          }

          const diffMinutes = Math.floor(diffSeconds / 60)

          if (diffMinutes < 60) {
            return `En ${diffMinutes} minutos`
          }

          const hours = Math.floor(diffMinutes / 60)
          const minutes = diffMinutes % 60

          if (minutes === 0) {
            return `En ${hours} horas`
          }

          return `En ${hours}h ${minutes}min`
        })()
      : undefined

  const stats = [
    {
      label: 'Citas hoy',
      value: mounted ? todayAppointments.length : '-',
      sub: mounted ? `${confirmed} confirmadas` : '-',
      icon: CalendarDays,
      color: 'text-accent',
    },
    {
      label: 'Pacientes activos',
      value: activePatients,
      sub: `${patients.length} registrados`,
      icon: Users,
      color: 'text-accent',
    },
    {
      label: 'Proxima cita',
      value: mounted
        ? nextAppointment
          ? isCurrentAppointmentOngoing
            ? 'Ahora'
            : nextAppointment.horaInicio
          : '--:--'
        : '-',
      sub: mounted
        ? nextAppointment
          ? nextAppointmentCountdown
            ? `${nextAppointment.pacienteNombre} · ${nextAppointmentCountdown}`
            : nextAppointment.pacienteNombre
          : 'Sin citas pendientes'
        : '-',
      icon: Clock,
      color: 'text-accent',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-card-foreground">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-accent">{stat.sub}</p>
        </div>
      ))}
    </div>
  )
}
