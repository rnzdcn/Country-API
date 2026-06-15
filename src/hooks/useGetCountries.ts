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
      const responseFields = 'response_fields=names.common,flag.url_svg,flag.description,population,region,capitals'
      const pagination = `limit=${PAGE_SIZE}&offset=${pageParam}`
      let endpoint = `${import.meta.env.VITE_API_URL}?${responseFields}&${pagination}`

      if (countryName && !region) {
        endpoint = `${import.meta.env.VITE_API_URL}?q=${encodeURIComponent(countryName)}&${responseFields}&${pagination}`;
      } else if (region && !countryName) {
        endpoint = `${import.meta.env.VITE_API_URL}?region=${encodeURIComponent(region)}&${responseFields}&${pagination}`;
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

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
