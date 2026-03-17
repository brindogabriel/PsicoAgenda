import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export const useAppointments = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/turnos', fetcher)

  const pad = (n: number) => String(n).padStart(2, '0')

  return {
    appointments:
      data?.map((t: any) => ({
        id: String(t.id),
        pacienteId: String(t.paciente_id),
        pacienteNombre: `${t.paciente?.nombre ?? ''} ${t.paciente?.apellido ?? ''}`,
        tipo: 'Terapia',
        fecha: (() => {
          const d = new Date(t.fecha_inicio)
          return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
        })(),
        horaInicio: (() => {
          const d = new Date(t.fecha_inicio)
          return `${pad(d.getHours())}:${pad(d.getMinutes())}`
        })(),
        horaFin: (() => {
          const d = new Date(t.fecha_fin)
          return `${pad(d.getHours())}:${pad(d.getMinutes())}`
        })(),
        estado: t.estado,
      })) ?? [],
    error,
    isLoading,
    mutate,
  }
}
