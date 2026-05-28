import { cn } from '@/lib/utils.ts'
import BackButton from '@/components/shared/BackButton.tsx'
import { useGetCountry } from '@/hooks/useGetCountry.ts'
import { Image } from '@/components/shared/Image.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import React from 'react'

export default function Country() {
  const country = useGetCountry()

  return (
    <div className={cn([ 'flex flex-col flex-1 gap-10 lg:px-8 xl:px-16' ])}>
      <BackButton />

      {country.isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full">
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 aspect-[4/3] flex items-center justify-center p-8">
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <Skeleton className="h-8 w-2/3" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {Array.from({ length: 8 }, (_, i) => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
            <div className="flex flex-col gap-2.5">
              <Skeleton className="h-3 w-28" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }, (_, i) => <Skeleton key={i} className="h-7 w-14 rounded-md" />)}
              </div>
            </div>
          </div>
        </div>
      )}

      {country.data && Array.from(country.data, (country, key) => {
        const nativeNameKey = Object.keys(country.native_name)[0]
        const nativeName = (country.native_name[nativeNameKey] as { common: string }).common

        const currencies = Object.values(country.currencies as Record<string, { name: string }>)
          .map(c => c.name)
          .join(', ')

        const languages = Object.values(country.languages).join(', ')

        return (
          <React.Fragment key={key}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full">

              <div className={cn([
                'rounded-xl overflow-hidden shadow-md',
                'bg-slate-100 dark:bg-slate-800',
                'flex items-center justify-center p-8',
              ])}>
                <Image
                  className="w-full h-auto max-h-[360px] object-contain drop-shadow-md"
                  src={country.flag_url}
                  alt={country.flag_alt}
                />
              </div>

              <div className="flex flex-col justify-center gap-8">
                <h1 className="text-2xl lg:text-3xl font-extrabold leading-tight">
                  {country.name}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="flex flex-col gap-2">
                    <DetailRow label="Native Name" value={nativeName} />
                    <DetailRow label="Population" value={country.population.toLocaleString()} />
                    <DetailRow label="Region" value={country.region} />
                    <DetailRow label="Sub Region" value={country.sub_region ?? '—'} />
                    <DetailRow label="Capital" value={country.capital?.[0] ?? '—'} />
                  </div>

                  <div className="flex flex-col gap-2 mt-4 sm:mt-0">
                    <DetailRow label="Top Level Domain" value={country.top_level_domain?.join(', ') ?? '—'} />
                    <DetailRow label="Currencies" value={currencies || '—'} />
                    <DetailRow label="Languages" value={languages || '—'} />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    Border Countries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {country.border_countries?.length
                      ? country.border_countries.map((bc, i) => (
                          <span
                            key={i}
                            className={cn([
                              'bg-primary text-primary-foreground',
                              'text-xs font-semibold',
                              'px-4 py-1.5 rounded-md',
                              'shadow-sm border border-border/50',
                            ])}
                          >
                            {bc}
                          </span>
                        ))
                      : <span className="text-sm text-foreground/60">None</span>
                    }
                  </div>
                </div>
              </div>

            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5 text-sm">
      <span className="font-semibold shrink-0">{label}:</span>
      <span className="text-foreground/70">{value}</span>
    </div>
  )
}
