import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer', {
  variants: {
    variant: {
      default: 'bg-sitora-primary text-sitora-white hover:text-sitora-primary sm:text-md border-sitora-primary inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-transparent',
      secondary: 'bg-sitora-gold-medium text-sitora-black shadow-sm hover:bg-sitora-gold-dark',
      outline: 'border border-sitora-primary text-sitora-primary bg-transparent hover:bg-sitora-primary hover:text-sitora-white',
      ghost: 'bg-transparent text-sitora-primary hover:bg-sitora-primary-light hover:text-sitora-white',
      text: 'bg-transparent text-sitora-primary hover:underline',
      destructive: 'bg-sitora-error text-white shadow-sm hover:bg-sitora-error/80',
      link: 'text-sitora-primary underline-offset-4 hover:underline',
      whiteOutline: 'bg-background border border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white',
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8 text-base',
      icon: 'h-9 w-9 p-0',
      'icon-lg': 'h-12 w-12 p-0',
      'icon-xl': 'h-16 w-16 p-0',
    },
    rounded: {
      true: 'rounded-full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: false,
  },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
