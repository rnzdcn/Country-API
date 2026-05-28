import { Skeleton } from "@/components/ui/skeleton"
import { cn } from '@/lib/utils.ts'

export default function SkeletonCard() {
  return (
    <div className={cn(['rounded-xl overflow-hidden shadow-sm border border-border/50 bg-card'])}>
      <div className="aspect-[3/2] bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-5">
        <Skeleton className="w-full h-full rounded-sm" />
      </div>
      <div className="px-5 pt-4 pb-5">
        <Skeleton className="h-5 w-3/4 mb-3.5" />
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-baseline gap-3">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="flex justify-between items-baseline gap-3">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between items-baseline gap-3">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>
      </div>
    </div>
  )
}
