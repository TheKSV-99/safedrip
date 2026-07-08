/**
 * StatsBar — Four premium statistic cards below the hero
 *
 * Displays key product metrics in a responsive grid with
 * viewport-triggered stagger entrance and hover elevation.
 */

import { motion, type Variants } from 'framer-motion';
import { Crosshair, Eye, Paperclip, BatteryCharging } from 'lucide-react';
import { viewportOnce } from '@/lib/animations';

const stats = [
  {
    icon: Crosshair,
    value: '97%',
    label: 'Monitoring Accuracy',
    color: 'text-brand-500',
    bg: 'bg-brand-50',
  },
  {
    icon: Eye,
    value: 'Real-Time',
    label: 'Optical Monitoring',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
  },
  {
    icon: Paperclip,
    value: 'Non-Invasive',
    label: 'Clip-on Design',
    color: 'text-brand-500',
    bg: 'bg-brand-50',
  },
  {
    icon: BatteryCharging,
    value: 'Portable',
    label: 'Battery Powered',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
  },
] as const;

const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: expoOut,
    },
  },
};

export function StatsBar() {
  return (
    <section
      id="stats"
      className="relative bg-white pb-20 pt-4 lg:pb-28 lg:pt-8"
    >
      {/* Subtle top divider gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow:
                  '0 8px 32px oklch(0 0 0 / 0.06), 0 2px 8px oklch(0 0 0 / 0.04)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative overflow-hidden rounded-2xl border border-surface-100 bg-white p-7 shadow-soft transition-colors"
            >
              {/* Hover gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-50/0 to-accent-50/0 opacity-0 transition-opacity duration-500 group-hover:from-brand-50/40 group-hover:to-accent-50/20 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Value */}
                <p className="text-title font-bold tracking-tight text-surface-950">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="mt-1 text-caption font-medium text-surface-500">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
