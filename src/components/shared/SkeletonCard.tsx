import { Skeleton } from "@/components/ui/skeleton"
import { cn } from '@/lib/utils.ts'

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 animate-pulse rounded-lg shadow-lg">
      <Skeleton className={cn([ 'w-full h-[213px]', 'rounded-t-lg' ])} />
      <div className="px-3.5 py-8 lg:px-8 ">
        <Skeleton className="h-6 w-[250px]" />

        <div className={cn(['flex flex-col gap-2', 'mt-4'])}>
          <Skeleton className="h-5 w-[200px]" />
          <Skeleton className="h-5 w-[200px]" />
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </div>
    </div>
  )
}
