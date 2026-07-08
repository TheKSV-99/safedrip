/**
 * Navbar — Primary site navigation
 *
 * Features:
 * - Transparent → glass morphism on scroll
 * - Mobile slide-down menu with stagger animation
 * - Active link highlight
 * - Sticky positioning with smooth backdrop blur transition
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplets } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import { fadeDown, staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500 ease-out',
        isScrolled
          ? 'glass shadow-soft'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* ─── Logo ─── */}
        <a
          href="#"
          className="group flex items-center gap-2.5"
          aria-label={`${BRAND.name} home`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-glow-brand transition-shadow duration-300 group-hover:shadow-glow-accent">
            <Droplets className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-surface-900">
            {BRAND.name}
          </span>
        </a>

        {/* ─── Desktop Links ─── */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-4 py-2 text-caption font-medium',
                'text-surface-600 transition-colors duration-200',
                'hover:text-brand-600',
                'after:absolute after:bottom-0.5 after:left-4 after:right-4',
                'after:h-0.5 after:scale-x-0 after:rounded-full',
                'after:bg-brand-500 after:transition-transform after:duration-300',
                'hover:after:scale-x-100',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ─── Mobile Toggle ─── */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-surface-700 hover:bg-surface-100 transition-colors lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-surface-100 glass lg:hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-7xl space-y-1 px-5 py-6 sm:px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  variants={staggerItem}
                  href={link.href}
                  onClick={closeMobile}
                  className="block rounded-xl px-4 py-3 text-body font-medium text-surface-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
