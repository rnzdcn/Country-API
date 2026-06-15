import { cn } from '@/lib/utils.ts'
import { useGetCountries } from '@/hooks/useGetCountries.ts'
import Dropdown from '@/components/shared/Dropdown.tsx'
import React from 'react'
import SearchInput from '@/components/shared/SearchInput.tsx'
import CountryCard from '@/components/shared/CountryCard.tsx'
import SkeletonCard from '@/components/shared/SkeletonCard.tsx'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton.tsx'
import { useDebounce, useMediaQuery, useWindowScroll } from '@uidotdev/usehooks'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { chunk } from 'lodash'

const GRID_COLS_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export default function Homepage() {
  const [ region, setRegion ] = React.useState<string | null>(null)
  const [ search, setSearch ] = React.useState<string | null>(null)
  const debouncedSearch = useDebounce(search, 1000)

  const countries = useGetCountries({countryName: debouncedSearch, region})

  const [, scrollTo] = useWindowScroll()

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

  React.useEffect(() => {
    scrollTo({top: 0, behavior: 'smooth'})
  }, [debouncedSearch, region, scrollTo]);

  const isXl = useMediaQuery('(min-width: 1280px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isSm = useMediaQuery('(min-width: 640px)')
  const columns = isXl ? 4 : isLg ? 3 : isSm ? 2 : 1

  const rows = React.useMemo(
    () => countries.data ? chunk(countries.data, columns) : [],
    [countries.data, columns],
  )

  const containerRef = React.useRef<HTMLDivElement>(null)
  const containerOffsetRef = React.useRef(0)

  React.useLayoutEffect(() => {
    containerOffsetRef.current = containerRef.current?.offsetTop ?? 0
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 320,
    overscan: 3,
    scrollMargin: containerOffsetRef.current,
  })

  const {fetchNextPage, hasNextPage, isFetchingNextPage} = countries
  const lastVirtualRowIndex = virtualizer.getVirtualItems().at(-1)?.index

  React.useEffect(() => {
    if (lastVirtualRowIndex === undefined) return
    if (lastVirtualRowIndex >= rows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [lastVirtualRowIndex, rows.length, hasNextPage, isFetchingNextPage, fetchNextPage])

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

      {
        countries.data?.length === 0 &&
        <div className={cn(['flex flex-1 items-center justify-center text-center text-foreground/60'])}>
          No countries found.
        </div>
      }

      {
        countries.isLoading &&
        <div className={cn([
          'w-full',
          'grid grid-cols-1 gap-3.5 lg:gap-8',
          'sm:grid-cols-2',
          'lg:grid-cols-3',
          'xl:grid-cols-4',
        ])}>
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8], (key) => <SkeletonCard key={key}/>)}
        </div>
      }

      {
        countries.data && countries.data.length > 0 &&
        <div ref={containerRef} className="w-full relative" style={{height: virtualizer.getTotalSize()}}>
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              className="absolute top-0 left-0 w-full"
              style={{transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`}}
            >
              <div className={cn(['grid gap-3.5 lg:gap-8 pb-3.5 lg:pb-8', GRID_COLS_CLASS[columns]])}>
                {rows[virtualRow.index].map((country, key) => (
                  <CountryCard
                    key={key}
                    name={country.name}
                    flag_url={country.flag_url}
                    flag_alt={country.flag_alt}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      }

      {
        isFetchingNextPage &&
        <div className={cn(['flex items-center justify-center py-4 text-sm text-foreground/50'])}>
          Loading more countries...
        </div>
      }

      <ScrollToTopButton />
    </div>
  )
}
