import { ChildrenType } from '@/types'
import Header from '@/components/shared/Header.tsx'
import { cn } from '@/lib/utils.ts'

export default function MainLayout({children}: ChildrenType ){
  return(
    <main className={cn(['flex flex-col', 'gap-0 md:gap-8', 'min-h-screen w-full'])}>
      <Header/>

      <section className={cn(['content', 'flex flex-1', 'bg-background', 'text-foreground', 'py-8 px-4' ])}>
        {children}
      </section>
    </main>
  )
}
