import { useQuery } from '@tanstack/react-query'

export function useGetCountries() {
  return useQuery({
    queryKey: [ 'countries' ],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/all`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
}
