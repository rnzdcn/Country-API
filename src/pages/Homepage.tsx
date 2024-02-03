import { cn } from '@/lib/utils.ts'
import { Input } from '@/components/ui/input.tsx'
import { Image } from '@/components/shared/Image.tsx'
import { useTheme } from '@/components/theme/theme-provider.tsx'
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { useGetCountries } from '@/hooks/useGetCountries.ts'

export default function Homepage() {
  const { theme } = useTheme()

  const countries = useGetCountries()

  return (
    <div className={cn([ 'flex flex-col flex-1' ])}>
      <div className={cn(['flex flex-col gap-8 md:flex-row justify-between'])}>
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
            className={cn([ 'pl-10 absolute' ])}
            placeholder={'Search for a country...'}
          />
        </div>


        <div className={cn([
          'h-11 md:h-14 w-[11rem] md:w-[16rem]',
        ])}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn([
                'h-full w-full',
                'rounded-md border border-primary shadow-md',
                'bg-primary',
                'text-left',
                'px-3'
              ])}
            >
              Filter by Region
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>Africa</DropdownMenuItem>
              <DropdownMenuItem>America</DropdownMenuItem>
              <DropdownMenuItem>Asia</DropdownMenuItem>
              <DropdownMenuItem>Europe</DropdownMenuItem>
              <DropdownMenuItem>Oceana</DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
