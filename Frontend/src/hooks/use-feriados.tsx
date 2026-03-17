import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export const useFeriados = (year?: number) => {
  const currentYear = year ?? new Date().getFullYear()
  const { data } = useSWR(`/api/feriados?year=${currentYear}`, fetcher)

  return {
    feriadosData: data ?? [],
  }
}
