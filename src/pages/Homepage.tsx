import { cn } from '@/lib/utils.ts'
import { useGetCountries } from '@/hooks/useGetCountries.ts'
import Dropdown from '@/components/shared/Dropdown.tsx'
import React from 'react'
import SearchInput from '@/components/shared/SearchInput.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Image } from '@/components/shared/Image.tsx'
import { Link } from 'react-router-dom'
import SkeletonCard from '@/components/shared/SkeletonCard.tsx'
import { useDebounce } from '@uidotdev/usehooks'

export default function Homepage() {
  const [ region, setRegion ] = React.useState<string | null>(null)
  const [ search, setSearch ] = React.useState<string | null>(null)
  const debouncedSearch = useDebounce(search, 1000)

  const countries = useGetCountries({countryName: debouncedSearch, region})

  React.useEffect(() => {
    if (search) {
      setRegion(null);
    }
  }, [search]);

  React.useEffect(() => {
    if (region) {
      setSearch(null);
    }
  }, [region]);

  return (
    <div className={cn([ 'flex flex-col flex-1 gap-8 lg:px-8 xl:px-16' ])}>
      <div className={cn([ 'flex flex-col gap-8 md:flex-row justify-between' ])}>
        <SearchInput search={search} setSearch={setSearch} />

        <Dropdown region={region} setRegion={setRegion} />
      </div>

      {
        countries.isError &&
        <div className={cn(['flex flex-1 items-center justify-center text-center text-red-400'])}>
          Please check the information you entered and try the search again.
        </div>
      }

      <div className={cn([
        'w-full',
        'grid grid-cols-1 gap-3.5 lg:gap-8',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4',
      ])}>

        {
          countries.isLoading && Array.from([1, 2, 3, 4, 5, 6, 7, 8], ( key) => <SkeletonCard key={key}/>)
        }

        {
          countries.data && Array.from(countries.data,(country, key) => (
            <Link to={`/${country.name}`} key={key}>
              <Card>
                <Image
                  className={cn([ 'w-full h-[213px]', 'rounded-t-lg' ])}
                  src={country.flag_url}
                  alt={country.flag_alt}
                />

                <CardContent className={cn([ 'px-3.5 py-8 lg:px-8' ])}>
                  <h2 className={cn([ 'text-lg md:text-xl font-bold' ])}>
                    {country.name.length > 20 ? country.name.substring(0, 33) + '...' : country.name}
                  </h2>

                  <div className={cn(['flex flex-col gap-1', 'mt-4'])}>
                    <h4 className={cn(['text-base md:text-xl font-semibold'])}>Population: <span className={'font-normal'}>{country.population.toLocaleString()}</span></h4>
                    <h4 className={cn(['text-base md:text-xl font-semibold'])}>Region: <span className={'font-normal'}>{country.region}</span></h4>
                    <h4 className={cn(['text-base md:text-xl font-semibold'])}>Capital: <span className={'font-normal'}>{country.capital}</span></h4>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
