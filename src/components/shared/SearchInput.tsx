import { cn } from '@/lib/utils.ts'
import { Image } from '@/components/shared/Image.tsx'
import { Input } from '@/components/ui/input.tsx'
import { useTheme } from '@/components/theme/theme-provider.tsx'
import React from 'react'

type SearchInputType = {
  search: string | null,
  setSearch: React.Dispatch<React.SetStateAction<string | null>>
}

export default function SearchInput({search, setSearch}: SearchInputType){
  const {theme} = useTheme()

  return(
    <div className={cn([
      'flex items-center relative',
      'py-3',
      'h-11 md:h-14 w-full md:max-w-lg lg:max-w-2xl',
      'rounded-md border border-primary',
      'bg-primary',
    ])}
    >
      <Image
        className={cn([ 'w-5 h-5', 'absolute z-50 left-2.5' ])}
        src={`/svg/${theme === 'light' ? 'search_dark' : 'search_light'}.svg`}
        alt={`${theme === 'light' ? 'Search Dark' : 'Search Light'} Icon`}
      />
      <Input
        value={search ? search : ''}
        onChange={(event) => setSearch(event.target.value)}
        className={cn([ 'pl-10 absolute' ])}
        placeholder={'Search for a country...'}
      />
    </div>
  )
}
