/**
 * Hero — Full-screen immersive hero section
 *
 * Apple/Dyson-inspired split layout:
 * - Left: Brand tagline, headline, supporting copy, dual CTAs
 * - Right: Product hero image with floating shadow
 * - Bottom: Scroll indicator
 *
 * Uses staggered entrance animations for a cinematic reveal.
 */

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/* ─── Easing ─── */
const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Animation Variants ─── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: expoOut },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: expoOut,
      delay: 0.4,
    },
  },
};

const scrollIndicatorVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 1.4, ease: expoOut },
  },
};

export function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      {/* ─── Background Gradient Orbs ─── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Top-right soft blue glow */}
        <div className="absolute -top-32 right-0 h-[700px] w-[700px] rounded-full bg-brand-50/60 blur-[120px]" />
        {/* Bottom-left soft green glow */}
        <div className="absolute -bottom-48 -left-24 h-[500px] w-[500px] rounded-full bg-accent-50/40 blur-[100px]" />
        {/* Center subtle radial */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-50/20 blur-[140px]" />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ═══ LEFT COLUMN — Copy ═══ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Tagline */}
            <motion.div variants={itemVariants}>
              <p className="text-overline font-semibold uppercase tracking-[0.12em] text-brand-500">
                IV Safety. Every Drop Matters.
              </p>
              <div className="mt-3 h-[2px] w-14 rounded-full bg-gradient-to-r from-brand-400 to-accent-400" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-7 text-[2.75rem] leading-[1.08] font-bold tracking-tight text-surface-950 sm:text-[3.25rem] lg:text-[3.5rem] xl:text-display text-balance"
            >
              A Smart IV Monitoring System That{' '}
              <span className="gradient-text">Protects Patients</span>,{' '}
              Supports Caregivers.
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-7 text-body-lg leading-relaxed text-surface-500 text-pretty"
            >
              SafeDrip continuously monitors IV therapy using intelligent optical
              sensing, detecting flow irregularities, estimating remaining fluid,
              and delivering instant alerts before clinical risks occur.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
                onClick={() => handleScroll('technology')}
              >
                Explore Technology
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-500 transition-colors">
                    <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
                  </span>
                }
                iconPosition="left"
                onClick={() => handleScroll('watch-action')}
              >
                Watch Prototype
              </Button>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN — Product Image ═══ */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Ambient glow behind the image */}
            <div
              className="absolute inset-0 m-auto h-[80%] w-[80%] rounded-3xl bg-gradient-to-br from-brand-100/50 via-transparent to-accent-100/30 blur-3xl"
              aria-hidden="true"
            />

            {/* The hero image */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-elevated lg:rounded-3xl">
                <img
                  src={`${import.meta.env.BASE_URL}hero-product.jpg`}
                  alt="SafeDrip Smart IV Monitoring System — clip-on device attached to an IV pole, showing real-time monitoring data on its built-in display, in a clinical setting with a patient resting comfortably"
                  className="h-auto w-full max-w-[580px] object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating shadow below the image */}
              <div
                className="absolute -bottom-6 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-surface-900/8 blur-2xl"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#stats"
          className="flex flex-col items-center gap-2 text-surface-400 transition-colors hover:text-brand-500"
          aria-label="Scroll to learn more"
        >
          <span className="text-overline font-medium uppercase tracking-widest">
            Discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
