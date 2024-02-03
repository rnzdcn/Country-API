import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChildrenType } from '@/types'
import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function Providers({children}: ChildrenType){
  return(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={'system'}>
          {children}
        </ThemeProvider>

        {
          process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />
        }
      </QueryClientProvider>
    </BrowserRouter>
  )
}
