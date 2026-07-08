/**
 * Button — Primary interactive element
 *
 * Supports three visual variants and two sizes.
 * Uses Framer Motion for micro-interaction hover/tap feedback.
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'default' | 'lg';

interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 shadow-soft hover:shadow-glow-brand active:bg-brand-700',
  secondary:
    'bg-white text-brand-700 border border-surface-200 hover:border-brand-300 hover:text-brand-600 shadow-soft hover:shadow-card',
  ghost:
    'bg-transparent text-surface-700 hover:text-brand-600 hover:bg-surface-100',
};

const sizeStyles: Record<Size, string> = {
  default: 'h-11 px-6 text-body gap-2',
  lg: 'h-13 px-8 text-body-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      children,
      icon,
      iconPosition = 'left',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          'rounded-xl cursor-pointer select-none',
          'transition-colors duration-200 ease-out',
          'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="shrink-0">{icon}</span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
