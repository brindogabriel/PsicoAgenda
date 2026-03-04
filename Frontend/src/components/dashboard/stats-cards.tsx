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

  useEffect(() => {
    setMounted(true)
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

  const nextAppointment = mounted
    ? (() => {
        const today = new Date()
        const now = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`
        return todayAppointments
          .filter(a => a.horaInicio >= now && a.estado !== 'cancelada')
          .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))[0]
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
          ? nextAppointment.horaInicio
          : '--:--'
        : '-',
      sub: mounted
        ? nextAppointment
          ? nextAppointment.pacienteNombre
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
