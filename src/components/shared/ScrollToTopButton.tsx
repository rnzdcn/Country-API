import { cn } from '@/lib/utils.ts'
import { useWindowScroll } from '@uidotdev/usehooks'
import { ArrowUp } from 'lucide-react'

const SCROLL_THRESHOLD = 400

export default function ScrollToTopButton() {
  const [{y}, scrollTo] = useWindowScroll()

  if (!y || y < SCROLL_THRESHOLD) return null

  return (
    <button
      onClick={() => scrollTo({top: 0, behavior: 'smooth'})}
      aria-label="Scroll to top"
      className={cn([
        'fixed bottom-6 left-6 z-50',
        'flex items-center justify-center',
        'h-11 w-11 md:h-12 md:w-12 rounded-full',
        'border border-primary shadow-md',
        'bg-primary text-primary-foreground',
        'transition-opacity duration-300 hover:opacity-90',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground focus-visible:ring-offset-1 ring-offset-background',
      ])}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
