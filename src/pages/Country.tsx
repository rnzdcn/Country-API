import { cn } from '@/lib/utils.ts'
import BackButton from '@/components/shared/BackButton.tsx'
import { useGetCountry } from '@/hooks/useGetCountry.ts'
import { Image } from '@/components/shared/Image.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import React from 'react'

export default function Country() {
  const country = useGetCountry()

  return (
    <div className={cn([ 'flex flex-col flex-1 gap-14 lg:px-8 xl:px-16' ])}>
      <BackButton />

      <div className={cn(
        [
          'grid grid-cols-1 lg:grid-cols-2 gap-8',
          'w-full',
          'gap-y-md',
        ])}
      >
        {
          country.isLoading && <Skeleton className={cn([ 'w-full h-[320px]' ])} />
        }
        {
          country.isLoading &&
          <div className={cn(['lg:py-5'])}>
            <Skeleton className="h-6 w-7/12 sm:mb-3.5" />

            <div className={cn(['flex flex-col gap-3.5', 'mt-8'])}>
              <Skeleton className="h-5 w-6/12" />
              <Skeleton className="h-5 w-6/12" />
              <Skeleton className="h-5 w-5/12" />
            </div>
          </div>
        }

        {
          country.data && Array.from(country.data, (country, key) => {
            const nativeNameKey = Object.keys(country.native_name)[0]
            const nativeName = (country.native_name[nativeNameKey] as { common: string }).common

            const mappedLanguages = Object.entries(country.languages).map(([ code, name ]) => {
              return { code, name }
            })

            const languages = Array.from(mappedLanguages, ({ name }) => name).join(', ')

            return(
              <React.Fragment key={key}>
                <div className={cn([ 'flex justify-center', 'max-h-[320px]' ])}>
                  <Image
                    className={cn([ 'w-full h-full max-w-2xl shadow-lg' ])}
                    src={country.flag_url}
                    alt={country.flag_alt}
                  />
                </div>

                <div className={cn([ 'flex flex-col items-start sm:items-center lg:items-start', 'lg:py-5' ])}>
                  <h2 className={cn([ 'text-lg md:text-xl lg:text-2xl font-bold text-left sm:mb-3.5 ' ])}>
                    {country.name.length > 20 ? country.name.substring(0, 33) + '...' : country.name}
                  </h2>

                  <div className={cn([ 'grid grid-cols-1 sm:grid-cols-2 lg:gap-8' ])}>
                    <div className={cn([ 'flex flex-col gap-2', 'mt-4' ])}>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Native Name: <span
                        className={'font-normal'}>{nativeName}</span></h4>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Population: <span
                        className={'font-normal'}>{country.population.toLocaleString()}</span></h4>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Region: <span
                        className={'font-normal'}>{country.region}</span></h4>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Sub Region: <span
                        className={'font-normal'}>{country.sub_region}</span></h4>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Capital: <span
                        className={'font-normal'}>{country.capital}</span></h4>
                    </div>

                    <div className={cn([ 'flex flex-col gap-2', 'mt-2' ])}>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Top Level Domain: <span
                        className={'font-normal'}>{nativeName}</span></h4>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Currencies: <span
                        className={'font-normal'}>{country.population.toLocaleString()}</span></h4>
                      <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Language: <span
                        className={'font-normal'}>{languages}</span></h4>
                    </div>
                  </div>

                  <div className={cn([ 'flex flex-col gap-2 mt-5' ])}>
                    <h4 className={cn([ 'text-base md:text-xl font-semibold' ])}>Border Countries:</h4>
                    <div className={cn([ 'flex flex-wrap gap-2.5' ])}>
                      {
                        country.border_countries ?
                          country.border_countries.map((bc, key) => (
                            <div
                              key={key}
                              className={cn([ 'bg-primary p-2', 'rounded-md shadow-md' ])}
                            >
                              {bc}
                            </div>
                          ))
                          :
                          <div className={cn([ 'bg-primary p-2', 'rounded-md shadow-md' ])}>None</div>
                      }
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}
