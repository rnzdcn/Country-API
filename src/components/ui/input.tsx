import * as React from "react"
import { cn } from '@/lib/utils.ts'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn([
            'flex',
            'h-11 md:h-14 w-full shadow-md',
            'rounded-md border border-primary',
            'bg-primary',
            'px-3 py-3',
            'placeholder:text-primary-foreground',
            'text-sm md:text-base',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground focus-visible:ring-offset-1 ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50'
          ],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
