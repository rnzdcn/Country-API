import { useInfiniteQuery } from '@tanstack/react-query'
import { CountriesPage } from '@/types'

type UseCountryDataProps = {
  countryName?: string | null;
  region?: string | null;
};

const PAGE_SIZE = 100

export function useGetCountries({countryName, region}: UseCountryDataProps) {
  return useInfiniteQuery({
    queryKey: [ 'countries', countryName, region ],
    queryFn: async ({pageParam}) => {
      const params = new URLSearchParams()
      if (countryName && !region) {
        params.set('q', countryName)
      } else if (region && !countryName) {
        params.set('region', region)
      }
      params.set('limit', String(PAGE_SIZE))
      params.set('offset', String(pageParam))

      const endpoint = `${import.meta.env.VITE_API_URL}/api/countries?${params.toString()}`

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json()
      return json.data as CountriesPage
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.meta.more ? lastPage.meta.offset + lastPage.meta.limit : undefined,
    select: (data) => data.pages.flatMap((page) => page.objects.map((country) => ({
      flag_url: country.flag.url_svg,
      flag_alt: country.flag.description,
      name: country.names.common,
      population: country.population,
      region: country.region,
      capital: country.capitals?.map((capital) => capital.name),
    }))),
    retry: 1,
  })
}
