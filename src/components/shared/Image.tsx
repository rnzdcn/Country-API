import React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

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
    return (
      <img src={src} alt={alt} ref={ref} className={imageVariants({variant, size, className})} {...props}
           draggable={false}/>
    )
  },
)

Image.displayName = 'Image'

// eslint-disable-next-line react-refresh/only-export-components
export {Image, imageVariants}
