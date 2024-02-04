import { cn } from '@/lib/utils.ts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import React from 'react'
import { Image } from '@/components/shared/Image.tsx'
import { useTheme } from '@/components/theme/theme-provider.tsx'

type DropdownType = {
  region: string | null
  setRegion: React.Dispatch<React.SetStateAction<string | null>>
}

type RegionType = {
  id: number,
  label: string
  value: string
}

const regions: Array<RegionType> = [
  {
    id: 1,
    label: 'Africa',
    value: 'africa',
  },
  {
    id: 2,
    label: 'America',
    value: 'america',
  },
  {
    id: 3,
    label: 'Asia',
    value: 'asia',
  },
  {
    id: 4,
    label: 'Europe',
    value: 'europe',
  },
  {
    id: 5,
    label: 'Oceana',
    value: 'oceana',
  },
]


export default function Dropdown({region, setRegion}: DropdownType) {
  const {theme} = useTheme()

  return (
    <div className={cn([
      'dropdown',
      'h-11 md:h-14 w-[11rem] md:w-[16rem]',
    ])}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn([
            'flex items-center justify-between',
            'h-full w-full',
            'rounded-md border border-primary shadow-md',
            'bg-primary',
            'text-left capitalize',
            'px-3',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground focus-visible:ring-offset-1 ring-offset-background'
          ])}
        >
          {!region ? 'Filter by region' : region}

          <Image
            className={cn([ 'w-5 h-5' ])}
            src={`/svg/${theme === 'light' ? 'chevron-down_dark' : 'chevron-down_light'}.svg`}
            alt={`${theme === 'light' ? 'Chevron Down Dark' : 'Chevron Down Light'} Icon`}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {
            regions.map(({ id, label, value }) =>
              <DropdownMenuItem key={id} onClick={() => setRegion(value)}>{label}</DropdownMenuItem>,
            )
          }
        </DropdownMenuContent>

      </DropdownMenu>
    </div>
  )
}
