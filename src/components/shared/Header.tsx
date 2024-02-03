import { cn } from '@/lib/utils.ts'
import { useTheme } from '@/components/theme/theme-provider.tsx'
import {Image} from '@/components/shared/Image'

export default function Header() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <nav
      className={cn([
        'px-4',
        'flex items-center justify-between',
        'h-[var(--header-height)]',
        'bg-primary',
        'text-foreground',
      ])}
    >
      <h1
        className={cn([
          'font-extrabold text-base md:text-lg lg:text-xl'
      ])}
      >
        Where in the world?
      </h1>

      <button
        className={cn([
          'flex gap-1.5',
          'text-sm font-semibold'
        ])}
        onClick={toggleTheme}>
        <Image
          className={cn(['w-5 h-5', 'mr-1 md:mr-2'])}
          src={`/svg/${theme === 'light' ? 'moon' : 'sun'}.svg`}
          alt={`${theme === 'light' ? 'Moon' : 'Sun'} Icon`}
        />
        {theme === 'light' ? 'Dark Mode' : 'Light Mode' }
      </button>
    </nav>
  )
}
