/**
 * SafeDrip — Framer Motion Animation Presets
 *
 * Reusable motion variants and transition configs for consistent,
 * premium animations across the entire site.
 */

import type { Variants, Transition } from 'framer-motion';

/* ─── Transitions ─── */

export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const transitionSmooth: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export const transitionFast: Transition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
};

/* ─── Fade In ─── */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionSmooth,
  },
};

/* ─── Fade Up (hero text, section headings) ─── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

/* ─── Fade Down (navigation bar) ─── */

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

/* ─── Scale In (cards, product shots) ─── */

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSpring,
  },
};

/* ─── Slide In from Left ─── */

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSmooth,
  },
};

/* ─── Slide In from Right ─── */

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSmooth,
  },
};

/* ─── Stagger Container ─── */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ─── Stagger Item (works inside stagger containers) ─── */

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

/* ─── Viewport Trigger Settings ─── */

export const viewportOnce = {
  once: true,
  margin: '-80px' as `${number}px`,
};

export const viewportRepeat = {
  once: false,
  margin: '-60px' as `${number}px`,
  amount: 0.2,
};
