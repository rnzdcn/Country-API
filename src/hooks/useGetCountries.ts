import { useQuery } from '@tanstack/react-query'
import { CountryType } from '@/types'

type UseCountryDataProps = {
  countryName?: string | null;
  region?: string | null;
};

export function useGetCountries({countryName, region}: UseCountryDataProps) {
  return useQuery({
    queryKey: [ 'countries', countryName, region ],
    queryFn: async () => {
      const fields = 'fields=name,flags,population,region,capital';
      let endpoint = `${import.meta.env.VITE_API_URL}/all?${fields}`

      if (countryName && !region) {
        endpoint = `${import.meta.env.VITE_API_URL}/name/${countryName}?${fields}`;
      } else if (region && !countryName) {
        endpoint = `${import.meta.env.VITE_API_URL}/region/${region}?${fields}`;
      }

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json()
    },
    select: (countries: Array<CountryType>) => {
      if (!countries) return
      return countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country: CountryType) => {
        return {
          flag_url: country.flags.svg,
          flag_alt: country.flags.alt,
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital,
        }
      })
    },
    retry: 1
  })
}
