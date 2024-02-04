import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils.ts'
import { Image } from '@/components/shared/Image.tsx'
import { useTheme } from '@/components/theme/theme-provider.tsx'

export default function BackButton(){
  const {theme} = useTheme()

  return(
    <Link to={'/'}>
      <button className={cn([
        'flex items-center justify-center gap-2.5',
        'border border-foreground',
        'rounded-md border border-primary shadow-md',
        'bg-primary',
        'text-sm md:text-base',
        'h-11 md:h-14 w-32',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground focus-visible:ring-offset-1 ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50'
      ])}
      >
        <Image
          className={cn([ 'w-4 h-4' ])}
          src={`/svg/${theme === 'light' ? 'arrow-left_dark' : 'arrow-left_light'}.svg`}
          alt={`${theme === 'light' ? 'Arrow Left Dark' : 'Arrow Left Dark'} Icon`}
        />
        Back
      </button>
    </Link>
  )
}
