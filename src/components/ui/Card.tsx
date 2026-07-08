/**
 * Card — Elevated content container
 *
 * Glassmorphism-optional surface with hover elevation.
 * Works as a general-purpose container for feature blocks, stats, and more.
 */

import { type ReactNode, type HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'glass' | 'outlined';

interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>> {
  variant?: CardVariant;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-soft border border-surface-100',
  elevated: 'bg-white shadow-card',
  glass: 'glass',
  outlined: 'bg-white/50 border border-surface-200',
};

const paddingStyles: Record<string, string> = {
  sm: 'p-5',
  md: 'p-7',
  lg: 'p-9',
};

export function Card({
  variant = 'default',
  hover = true,
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 8px 32px oklch(0 0 0 / 0.08)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'rounded-2xl overflow-hidden',
        'transition-colors duration-200',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
