/**
 * Footer — Site footer with multi-column link grid
 *
 * Includes brand lockup, section links, and legal bar.
 * Viewport-triggered entrance animation.
 */

import { motion } from 'framer-motion';
import { Droplets, Mail, MapPin } from 'lucide-react';
import { BRAND, FOOTER_SECTIONS } from '@/lib/constants';
import { staggerContainer, staggerItem, fadeUp, viewportOnce } from '@/lib/animations';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer id="contact" className="bg-surface-950 text-surface-400">
      {/* ─── Main Footer Grid ─── */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* ─── Brand Column ─── */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <a href="#" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand">
                <Droplets className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {BRAND.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-caption leading-relaxed text-surface-500">
              {BRAND.description}
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="mailto:somanadh9963@gmail.com"
                className="flex items-center gap-2.5 text-caption text-surface-500 transition-colors hover:text-brand-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                somanadh9963@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-caption text-surface-500">
                <MapPin className="h-4 w-4 shrink-0" />
                Chennai, India
              </div>
              <a
                href="https://github.com/TheKSV-99"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-caption text-surface-500 transition-colors hover:text-brand-400"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub: @TheKSV-99
              </a>
              <a
                href="https://www.youtube.com/@sk.techlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-caption text-surface-500 transition-colors hover:text-brand-400"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
                YouTube: @sk.techlabs
              </a>
            </div>
          </motion.div>

          {/* ─── Link Columns ─── */}
          {FOOTER_SECTIONS.map((section) => (
            <motion.div key={section.title} variants={staggerItem}>
              <h3 className="mb-4 text-caption font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-caption text-surface-500',
                        'transition-colors duration-200 hover:text-brand-400',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Legal Bar ─── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="border-t border-surface-800"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-overline text-surface-600">
            {BRAND.copyright}
          </p>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="text-overline text-surface-600 transition-colors hover:text-surface-400"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-overline text-surface-600 transition-colors hover:text-surface-400"
            >
              Terms
            </a>
            <a
              href="#cookies"
              className="text-overline text-surface-600 transition-colors hover:text-surface-400"
            >
              Cookies
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
