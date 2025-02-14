import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        white: 'bg-gameWhite text-primary shadow hover:bg-base/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        tertiary: 'bg-primary text-base font-custom',
        forGradient:
          'flex w-full font-normal cursor-pointer items-center bg-[#002147] justify-center',
        forGradientWithGreenText:
          'flex w-full font-normal cursor-pointer items-center justify-center bg-greedGradient bg-clip-text text-transparent',
        forGradientWithRedText:
          'flex w-full font-normal cursor-pointer items-center justify-center bg-redGradient bg-clip-text text-transparent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        blueGame: 'bg-darkBlueGradient text-white shadow hover:bg-primary/90',
        gameDarkBlue:
          'bg-gameCenterModal shadow-none hover:bg-buttonBlueGradient/90',
        playerOption:
          'flex w-full font-normal cursor-pointer items-start gap-1 py-[3px] hover:bg-[#002147] justify-normal',
        close:
          'mt-auto w-full bg-transparent text-center text-[#FF8C8C] transition-all duration-300 ease-in-out hover:bg-[#002147]',
      },
      size: {
        xs: 'h-5 rounded-sm w-15',
        sm: 'h-6 rounded-md w-18',
        default: 'h-9 w-full',
        inspectField: 'h-5 w-full rounded-[3px] text-xs',
        lg: 'h-10 rounded-md w-30',
        icon: 'h-9 w-9',
        widthFull: 'w-full h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
