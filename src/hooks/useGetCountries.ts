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
      let endpoint = `${import.meta.env.VITE_API_URL}/all`

      if (countryName && !region) {
        endpoint = `${import.meta.env.VITE_API_URL}/name/${countryName}`;
      } else if (region && !countryName) {
        endpoint = `${import.meta.env.VITE_API_URL}/region/${region}`;
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
