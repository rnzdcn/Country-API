import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { CountryDetail } from '@/types'

export function useGetCountry(){
  const {country} = useParams()

  if(!country) {
    throw new Error('Undefined country params')
  }

  return useQuery({
    queryKey: ['country', country],
    queryFn: async () => {
      const responseFields = 'response_fields=names.common,names.native,flag.url_svg,flag.description,population,region,subregion,capitals,tlds,currencies,languages,borders'
      const endpoint = `${import.meta.env.VITE_API_URL}?q=${encodeURIComponent(country)}&${responseFields}`

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const json = await response.json()
      const countries = json.data.objects as Array<CountryDetail>
      const match = countries.find((item) => item.names.common.toLowerCase() === country.toLowerCase())

      if (!match) {
        throw new Error('Country not found')
      }

      return match
    },
    select: (country: CountryDetail) => {
      return {
        flag_url: country.flag.url_svg,
        flag_alt: country.flag.description,
        name: country.names.common,
        native_name: country.names.native,
        population: country.population,
        region: country.region,
        sub_region: country.subregion,
        capital: country.capitals?.map((capital) => capital.name),
        top_level_domain: country.tlds,
        currencies: country.currencies,
        languages: country.languages,
        border_countries: country.borders,
      }
    },
    retry: 1
  })
}
