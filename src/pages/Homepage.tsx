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
            <Link to={`/${country.name}`} key={key} className="group">
              <Card className={cn([
                'overflow-hidden border border-border/50',
                'shadow-sm transition-all duration-300 ease-out',
                'group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-border',
              ])}>
                <div className={cn([
                  'aspect-[3/2] flex items-center justify-center p-5 overflow-hidden',
                  'bg-slate-100 dark:bg-slate-800',
                ])}>
                  <Image
                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.04]"
                    src={country.flag_url}
                    alt={country.flag_alt}
                  />
                </div>

                <CardContent className="px-5 pt-4 pb-5">
                  <h2 className="font-extrabold text-base leading-tight mb-3.5 line-clamp-1">
                    {country.name}
                  </h2>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 shrink-0">Population</span>
                      <span className="text-sm font-semibold truncate">{country.population.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 shrink-0">Region</span>
                      <span className="text-sm font-semibold truncate">{country.region}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 shrink-0">Capital</span>
                      <span className="text-sm font-semibold truncate">{country.capital?.[0] ?? '—'}</span>
                    </div>
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
