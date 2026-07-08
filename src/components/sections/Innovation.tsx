/**
 * Innovation — Highlights universal clip-on design
 *
 * Explains the physical clamp ergonomics, chamber compatibility, and materials
 * using a premium engineering diagram layout.
 */

import { motion } from 'framer-motion';
import { Paperclip, Zap, Compass, RefreshCw } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { viewportOnce } from '@/lib/animations';

const FEATURES = [
  {
    icon: Paperclip,
    title: 'Clip-and-Go Mount',
    description: 'Spring-loaded industrial hinge design adjusts to drip chamber widths between 12mm and 22mm. Secure mounting in under three seconds.',
  },
  {
    icon: Zap,
    title: 'Zero Tubing Alterations',
    description: 'Calculates drip metrics non-invasively through standard translucent plastic chambers. Operates entirely external to the sterile path.',
  },
  {
    icon: Compass,
    title: 'Auto-Gravity Alignment',
    description: 'Internal multi-axis sensor tracks pole tilt angles. Corrects for chamber angles up to 15 degrees without losing accuracy.',
  },
  {
    icon: RefreshCw,
    title: 'Ward sanitization ready',
    description: 'Polycarbonate-ABS seamless housing supports fast medical-grade isopropyl chemical wipe-downs between clinical stays.',
  },
];

export function Innovation() {
  return (
    <Section
      id="innovation"
      theme="light"
      overline="Industrial Design"
      title="Universal Non-Invasive Integration"
      subtitle="SafeDrip requires no specialized drip tubes, adapters, or calibration steps. It clips onto existing gravity infusion equipment seamlessly."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* ─── Left Side: CAD Exploded Rendering Mockup ─── */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative mx-auto max-w-[480px]">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100/40 via-transparent to-accent-100/30 blur-2xl" />
            
            {/* CAD style blueprint overlay container */}
            <div className="relative border border-surface-200/80 rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-soft">
              <div className="absolute top-4 left-4 text-[10px] font-mono text-surface-400 tracking-wider">
                FIG 4.2 // CLAMP MECHANICAL SUB-ASSEMBLY
              </div>
              
              {/* Simplified premium vector style CAD drawing with CSS */}
              <div className="h-64 sm:h-80 w-full flex items-center justify-center border border-dashed border-surface-200 rounded-xl bg-surface-50/50 relative overflow-hidden mt-6">
                {/* Horizontal and vertical alignment lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-px bg-surface-200" />
                  <div className="h-full w-px bg-surface-200" />
                </div>
                
                {/* Drip chamber profile shape */}
                <div className="absolute w-12 h-44 border-2 border-surface-300 rounded-full bg-white/40 flex flex-col justify-between items-center py-4">
                  <div className="w-10 h-1 bg-surface-300" />
                  {/* Drop inside chamber */}
                  <motion.div
                    animate={{ y: [0, 40, 0], opacity: [0.8, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn' }}
                    className="w-2.5 h-3.5 bg-brand-500 rounded-full rounded-t-sm"
                  />
                  <div className="w-10 h-1 bg-surface-300" />
                </div>
                
                {/* SafeDrip Device Clamp Profile Overlay */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  className="absolute w-24 h-32 border-2 border-brand-500/80 rounded-xl bg-white shadow-soft flex flex-col justify-between p-3"
                  style={{ left: '20%' }}
                >
                  <div className="w-full h-2 bg-brand-500/20 rounded" />
                  
                  {/* Clamping arms extending to the chamber */}
                  <div className="absolute -right-3 top-6 w-5 h-3 border-y-2 border-r-2 border-brand-500/80 bg-brand-50 rounded-r-lg" />
                  <div className="absolute -right-3 bottom-6 w-5 h-3 border-y-2 border-r-2 border-brand-500/80 bg-brand-50 rounded-r-lg" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-brand-600 font-semibold uppercase">IR SENSOR RX</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  </div>
                </motion.div>
                
                {/* Measurements annotations */}
                <div className="absolute right-4 bottom-4 font-mono text-[9px] text-surface-400 text-right">
                  D_CLAMP: 12-22mm<br />
                  F_GRIP: 4.8N ±0.2N
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-surface-400">
                <span>SCALE: 1.0 (NTS)</span>
                <span>SAFE-DRIP TECH LABS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Side: Engineering Features List ─── */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feat) => (
              <Card key={feat.title} variant="outlined" padding="md" hover className="border border-surface-150">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 mb-4">
                  <feat.icon className="h-5 w-5" />
                </div>
                <h4 className="text-body font-bold text-surface-950">
                  {feat.title}
                </h4>
                <p className="mt-2 text-caption text-surface-500 leading-relaxed">
                  {feat.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
