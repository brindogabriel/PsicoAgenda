import { useQuery, useQueryClient } from '@tanstack/react-query'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { fetcher } from '@/lib/fetcher'

export const usePatients = (p0: (prev: any) => any[]) => {
  const { data, error, isLoading, mutate } = useSWR('/api/pacientes', fetcher)

  return {
    patients: data ?? [],
    error,
    isLoading,
    mutate,
  }
}

// export const useNoticiasPrensa = () => {
//   // Usando TanStack Query para la sección de prensa con todas las noticias
//   const { data, error, isLoading, refetch } = useQuery({
//     queryKey: ['noticias-prensa'],
//     queryFn: async () => {
//       const response = await axios.get('/api/noticias?all=1')
//       return response.data
//     },
//   })

//   const queryClient = useQueryClient()

//   const mutate = async () => {
//     await queryClient.invalidateQueries({ queryKey: ['noticias-prensa'] })
//   }

//   return {
//     noticias: data ?? [],
//     error,
//     isLoading,
//     mutate,
//     refetch,
//   }
// }

// export const useNoticiasLanding = () => {
//   const { data, error, isLoading } = useSWR(`/api/noticias?landing=1`, fetcher)

//   return { data, error, isLoading }
// }
