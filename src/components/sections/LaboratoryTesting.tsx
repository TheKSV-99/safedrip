/**
 * LaboratoryTesting — Showcases laboratory prototype photographs and explains
 * optical sensing, breadboard validation, and live IV testing.
 *
 * Implements subtle zoom animations on photos.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Sparkles, Cpu, Award } from 'lucide-react';

interface LabPhoto {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

const LAB_PHOTOS: LabPhoto[] = [
  {
    id: 'overview',
    title: 'Hospital loop integration',
    description: 'Bedside telemetry unit connected to a laptop running the live IV Drip Monitor server.',
    imagePath: `${import.meta.env.BASE_URL}lab-1-overview.jpg`,
  },
  {
    id: 'battery',
    title: 'Battery and circuit assembly',
    description: '3D-printed enclosure showing internal 3.7V 2700mAh battery cell and controller wiring.',
    imagePath: `${import.meta.env.BASE_URL}lab-3-battery.jpg`,
  },
  {
    id: 'wiring',
    title: 'Breadboard logic setup',
    description: 'Controller screen mounted on a breadboard verifying keypad response and power bridge.',
    imagePath: `${import.meta.env.BASE_URL}lab-4-wiring.jpg`,
  },
  {
    id: 'monitor',
    title: 'Live telemetry calibration',
    description: 'Interactive drip dashboard on the bedside screen registering flow rates and drops/min.',
    imagePath: `${import.meta.env.BASE_URL}lab-5-monitor.png`,
  },
];

export function LaboratoryTesting() {
  const [activePhotoId, setActivePhotoId] = useState<string>('overview');

  const activePhoto = LAB_PHOTOS.find((p) => p.id === activePhotoId) || LAB_PHOTOS[0];

  return (
    <Section
      id="laboratory"
      theme="white"
      overline="Rigorous Bench Testing"
      title="Laboratory Validation & Prototyping"
      subtitle="Go inside the development lab. SafeDrip underwent extensive physical testing, breadboard calibrations, and battery cycle evaluations to meet clinical safety protocols."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start mt-8">
        {/* ─── Left Column: Interactive Prototype Photo Showcase with Zoom ─── */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Selected Image Card */}
          <div className="relative border border-surface-200 rounded-2xl bg-white p-4 shadow-soft overflow-hidden select-none">
            <div className="w-full h-80 sm:h-96 rounded-xl bg-surface-50 border border-surface-150 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <motion.img
                    src={activePhoto.imagePath}
                    alt={activePhoto.title}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="w-full h-full object-cover cursor-zoom-in"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Photo description overlays */}
            <div className="mt-4 space-y-1">
              <h4 className="text-caption font-bold text-surface-950">
                {activePhoto.title}
              </h4>
              <p className="text-[11px] text-surface-500">
                {activePhoto.description}
              </p>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {LAB_PHOTOS.map((photo) => {
              const isActive = photo.id === activePhotoId;
              return (
                <button
                  key={photo.id}
                  onClick={() => setActivePhotoId(photo.id)}
                  className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-300 ${
                    isActive
                      ? 'border-brand-500 ring-2 ring-brand-100 shadow-soft scale-[1.02]'
                      : 'border-surface-200 hover:border-surface-300'
                  }`}
                >
                  <img
                    src={photo.imagePath}
                    alt=""
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Right Column: Engineering Expositions ─── */}
        <div className="lg:col-span-6 space-y-8 lg:pt-4">
          {/* Explanation 1: Optical Sensing */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mt-1">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-body font-bold text-surface-950">
                Non-Invasive Optical Sensing Array
              </h4>
              <p className="text-caption text-surface-500 leading-relaxed text-pretty">
                SafeDrip clips directly to the outside of standard IV drip chambers. An aligned infrared beam measures refraction dips caused by drops. When a droplet breaks the beam, the sensor captures the transient light attenuation pattern, calculating exact drop sizes without contacting sterile fluid.
              </p>
            </div>
          </div>

          {/* Explanation 2: Breadboard Validation */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 mt-1">
              <Cpu className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-body font-bold text-surface-950">
                Rigorous Breadboard Verification
              </h4>
              <p className="text-caption text-surface-500 leading-relaxed text-pretty">
                Early validation verified sensor signal translation, OLED refresh behaviors, and keypad entries. Key hardware boundaries—such as ADC sampling frequencies and SPI bus parameters—were optimized using breadboard models prior to layout tape-outs.
              </p>
            </div>
          </div>

          {/* Explanation 3: Live IV testing */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mt-1">
              <Award className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-body font-bold text-surface-950">
                Closed-Loop Live Infusion Testing
              </h4>
              <p className="text-caption text-surface-500 leading-relaxed text-pretty">
                Prototypes were tested under real infusion flows alongside clinical gravity drip sets. We calibrated drop factor indexes and calculated system margins against clinical syringe pumps, ensuring telemetry output remains stable under rapid flow changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
