import { useQuery } from '@tanstack/react-query'

export function useGetCountries() {
  return useQuery({
    queryKey: [ 'countries' ],
    queryFn: async () => {
      try {
        return await (await fetch(`${import.meta.env.VITE_API_URL}/all`)).json()
      } catch (error) {
        console.error(`Query Error: ${error}`)
      }
    },
    staleTime: 1000 * 60 * 60 * 24
  })
}
