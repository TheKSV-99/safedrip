/**
 * HardwareDesign — Showcases structural, mechanical, and electrical details
 *
 * Emulates high-end spec callouts. Features interactive hotspots on a CAD diagram
 * highlighting battery placement, shell durability, sanitization, and the secure latch.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Info } from 'lucide-react';
import { transitionSmooth } from '@/lib/animations';

interface Hotspot {
  id: string;
  x: string; // CSS percentage positions
  y: string;
  title: string;
  description: string;
  highlight: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'enclosure',
    x: '25%',
    y: '20%',
    title: 'PC-ABS Medical Grade Shell',
    highlight: 'Antimicrobial Surface',
    description: 'Designed to survive repeat cleanings with harsh isopropyl agents. Low-friction joints prevent skin pinches during caregiver mounting.',
  },
  {
    id: 'battery',
    x: '75%',
    y: '30%',
    title: 'Dual LiPo Energy Storage',
    highlight: '48hr Continuous Runtime',
    description: 'Internal backup battery ensures uninterrupted telemetry monitoring during patient transfers or primary power source blackouts.',
  },
  {
    id: 'latch',
    x: '35%',
    y: '70%',
    title: 'Tension Hinge Clamp',
    highlight: 'Secure Pole Attachment',
    description: 'Spring-loaded structural clamp exerts exactly 4.8 Newtons of force to grip drip chambers securely without risking plastic cracking.',
  },
  {
    id: 'screen',
    x: '60%',
    y: '60%',
    title: 'High-Contrast OLED Display',
    highlight: 'Night-Shift Optimization',
    description: 'Monochrome, self-luminous display emits soft light that won\'t disturb resting patients while remaining readable from three meters.',
  },
];

export function HardwareDesign() {
  const [activeId, setActiveId] = useState<string>('enclosure');

  const activeSpot = HOTSPOTS.find((spot) => spot.id === activeId) || HOTSPOTS[0];

  return (
    <Section
      id="hardware"
      theme="white"
      overline="Mechanical Engineering"
      title="Engineered for Hospital Wards"
      subtitle="Medical environments demand hardware that is chemically resistant, drop-proof, and completely intuitive. Every aspect of SafeDrip is tuned for durability."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* ─── Left Column: CAD Schematic Drawing with Clickable Hotspots ─── */}
        <div className="lg:col-span-7">
          <div className="relative border border-surface-200 rounded-2xl bg-surface-50/50 p-6 flex flex-col justify-between h-96 overflow-hidden select-none shadow-soft">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-surface-400 tracking-wider">
              ASSEMBLY LAYOUT // ANNOTATION LAYER
            </div>

            {/* Schematic graphics */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
              {/* Outer structural bounds shape */}
              <div className="w-56 h-72 border-2 border-dashed border-surface-300 rounded-3xl relative flex items-center justify-center bg-white/30">
                <div className="w-48 h-64 border border-surface-200 rounded-2xl flex flex-col justify-between p-4 bg-white/60">
                  <div className="w-full h-8 border border-dashed border-surface-200 rounded" />
                  <div className="w-24 h-24 border border-dashed border-surface-200 rounded-full mx-auto" />
                  <div className="w-full h-8 border border-dashed border-surface-200 rounded" />
                </div>
              </div>
            </div>

            {/* Hotspots */}
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveId(spot.id)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activeId === spot.id
                    ? 'bg-brand-500 border-brand-600 text-white shadow-glow-brand scale-110'
                    : 'bg-white border-surface-300 text-surface-600 hover:border-brand-300 hover:text-brand-500'
                }`}
                style={{ top: spot.y, left: spot.x }}
                aria-label={`View ${spot.title} details`}
              >
                <span className="text-caption font-bold font-mono">
                  {spot.id === 'enclosure' ? '1' : spot.id === 'battery' ? '2' : spot.id === 'latch' ? '3' : '4'}
                </span>
              </button>
            ))}

            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-surface-400">
              CLICK HOTSPOTS TO SHOW CALLOUTS
            </div>
          </div>
        </div>

        {/* ─── Right Column: Selected Hotspot Details ─── */}
        <div className="lg:col-span-5">
          <Card variant="outlined" padding="lg" hover={false} className="border border-surface-200 min-h-[280px] flex flex-col justify-between relative bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpot.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={transitionSmooth}
                className="space-y-6"
              >
                <div>
                  <span className="text-overline text-brand-500 font-bold block">
                    {activeSpot.highlight}
                  </span>
                  <h4 className="text-[1.35rem] font-bold text-surface-950 mt-1">
                    {activeSpot.title}
                  </h4>
                </div>

                <p className="text-body text-surface-500 leading-relaxed text-pretty">
                  {activeSpot.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-2 text-caption text-surface-400 pt-4 border-t border-surface-150">
              <Info className="h-4 w-4 text-brand-500 shrink-0" />
              <span>Sanitization testing complies with ISO 10993 bioclean standards.</span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
