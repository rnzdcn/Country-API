import { cn } from '@/lib/utils.ts'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Image } from '@/components/shared/Image.tsx'
import { Link } from 'react-router-dom'

type CountryCardProps = {
  name: string,
  flag_url: string,
  flag_alt: string,
  population: number,
  region: string,
  capital?: string[],
}

export default function CountryCard({name, flag_url, flag_alt, population, region, capital}: CountryCardProps) {
  return (
    <Link to={`/${name}`} className="group">
      <Card className={cn([
        'overflow-hidden border border-border/50',
        'shadow-sm transition-all duration-300 ease-out',
        'group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-border',
      ])}>
        <div className={cn([
          'aspect-[3/2] flex items-center justify-center p-5 overflow-hidden',
          'bg-slate-100 dark:bg-slate-800',
        ])}>
          <Image
            className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.04]"
            src={flag_url}
            alt={flag_alt}
          />
        </div>

        <CardContent className="px-5 pt-4 pb-5">
          <h2 className="font-extrabold text-base leading-tight mb-3.5 line-clamp-1">
            {name}
          </h2>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 shrink-0">Population</span>
              <span className="text-sm font-semibold truncate">{population.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-baseline gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 shrink-0">Region</span>
              <span className="text-sm font-semibold truncate">{region}</span>
            </div>
            <div className="flex justify-between items-baseline gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 shrink-0">Capital</span>
              <span className="text-sm font-semibold truncate">{capital?.[0] ?? '—'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
