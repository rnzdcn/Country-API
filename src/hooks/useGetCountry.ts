import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { CountryType } from '@/types'

export function useGetCountry(){
  const {country} = useParams()

  if(!country) {
    throw new Error('Undefined country params')
  }

  return useQuery({
    queryKey: ['country'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/name/${country}`)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    },
    select: (countries: Array<CountryType>) => {
      if (!countries) return
      return countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country: CountryType) => {
        return {
          flag_url: country.flags.png,
          flag_alt: country.flags.alt,
          name: country.name.common,
          native_name: country.name.nativeName,
          population: country.population,
          region: country.region,
          sub_region: country.subregion,
          capital: country.capital,
          top_level_domain: country.tld,
          currencies: country.currencies,
          languages: country.languages,
          border_countries: country.borders,
        }
      })
    },
    retry: 1
  })
}
