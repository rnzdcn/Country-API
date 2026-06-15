import React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'
import {ImageOff} from 'lucide-react'
import {cn} from '@/lib/utils.ts'

const imageVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        avatar: 'rounded-full h-full md:h-[141px] w-full md:w-[141px]',
        logo: 'h-full md:h-[153px] w-full md:w-[510px]',
      },
      size: {
        default: '',
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof imageVariants> {
  src: string,
  alt: string
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(({
    className,
    variant,
    size,
    src,
    alt,
    ...props
  }, ref) => {
    if (!src) {
      return (
        <div className={cn([
          imageVariants({variant, size, className}),
          'flex flex-col items-center justify-center gap-1.5',
          'text-center text-[11px] font-medium text-foreground/40',
          'bg-slate-200 dark:bg-slate-700 rounded-sm',
        ])}>
          <ImageOff className="w-5 h-5" />
          No flag image available
        </div>
      )
    }

    return (
      <img src={src} alt={alt} ref={ref} className={imageVariants({variant, size, className})} {...props}
           draggable={false}/>
    )
  },
)

Image.displayName = 'Image'

// eslint-disable-next-line react-refresh/only-export-components
export {Image, imageVariants}
