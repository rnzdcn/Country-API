import { cn } from '@/lib/utils.ts'
import { useGetCountries } from '@/hooks/useGetCountries.ts'
import Dropdown from '@/components/shared/Dropdown.tsx'
import React from 'react'
import SearchInput from '@/components/shared/SearchInput.tsx'

export default function Homepage() {

  const countries = useGetCountries()

  const [ region, setRegion ] = React.useState<string | null>(null)
  const [ search, setSearch ] = React.useState<string | null>(null)

  return (
    <div className={cn([ 'flex flex-col flex-1' ])}>
      <div className={cn([ 'flex flex-col gap-8 md:flex-row justify-between' ])}>
        <SearchInput search={search} setSearch={setSearch} />

        <Dropdown region={region} setRegion={setRegion} />
      </div>
    </div>
  )
}
