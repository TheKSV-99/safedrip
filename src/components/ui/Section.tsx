/**
 * Section — Reusable page section wrapper
 *
 * Provides consistent vertical spacing, optional header with
 * overline/title/subtitle, and viewport-triggered entrance animation.
 */

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import { cn } from '@/lib/utils';

type SectionTheme = 'light' | 'white' | 'dark' | 'brand';

interface SectionProps {
  id?: string;
  theme?: SectionTheme;
  overline?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
}

const themeStyles: Record<SectionTheme, string> = {
  light: 'bg-surface-50 text-surface-900',
  white: 'bg-white text-surface-900',
  dark: 'bg-surface-950 text-white',
  brand: 'bg-brand-600 text-white',
};

const overlineTheme: Record<SectionTheme, string> = {
  light: 'text-brand-500',
  white: 'text-brand-500',
  dark: 'text-brand-300',
  brand: 'text-white/70',
};

const subtitleTheme: Record<SectionTheme, string> = {
  light: 'text-surface-500',
  white: 'text-surface-500',
  dark: 'text-surface-400',
  brand: 'text-white/80',
};

export function Section({
  id,
  theme = 'light',
  overline,
  title,
  subtitle,
  children,
  className,
  containerClassName,
  fullWidth = false,
}: SectionProps) {
  const hasHeader = overline || title || subtitle;

  return (
    <section
      id={id}
      className={cn(
        'py-section-sm lg:py-section',
        themeStyles[theme],
        className,
      )}
    >
      <div
        className={cn(
          !fullWidth && 'mx-auto max-w-7xl px-5 sm:px-6 lg:px-8',
          containerClassName,
        )}
      >
        {hasHeader && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto mb-14 max-w-3xl text-center lg:mb-18"
          >
            {overline && (
              <motion.p
                variants={staggerItem}
                className={cn(
                  'mb-3 text-overline font-semibold uppercase tracking-widest',
                  overlineTheme[theme],
                )}
              >
                {overline}
              </motion.p>
            )}
            {title && (
              <motion.h2
                variants={staggerItem}
                className="text-headline font-bold tracking-tight text-balance"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                variants={staggerItem}
                className={cn(
                  'mt-5 text-body-lg text-pretty',
                  subtitleTheme[theme],
                )}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
