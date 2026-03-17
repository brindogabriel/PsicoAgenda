import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export const usePatients = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/pacientes', fetcher)

  return {
    patients: data ?? [],
    error,
    isLoading,
    mutate,
  }
}
