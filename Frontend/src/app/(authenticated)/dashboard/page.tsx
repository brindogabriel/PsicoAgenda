'use client'

import { StatsCards } from '@/components/dashboard/stats-cards'
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments'
import { useAuth } from '@/hooks/auth'
import { usePatients } from '@/hooks/use-patients'

export default function DashboardPage() {
  const { user } = useAuth({ middleware: 'auth' })
  const { patients } = usePatients()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Hola, {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumen de tu agenda para hoy.
        </p>
      </div>

      <StatsCards appointments={[]} patients={patients} />
      <UpcomingAppointments appointments={[]} />
    </div>
  )
}
