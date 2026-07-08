/**
 * ProductGallery — Interactive Apple-style evolution showcase
 *
 * Displays the design lifecycle from raw CAD drafts to real prototype models
 * and final clinical deployments.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { transitionSmooth } from '@/lib/animations';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imagePath: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'cad-front',
    title: 'Final CAD Design',
    category: 'Engineering Model',
    imagePath: '/gallery-cad-front.jpg',
    description: 'Initial structural design detailing front chassis dimensions and LCD mounting frames.',
  },
  {
    id: 'cad-back',
    title: 'Rear Clip Mechanism',
    category: 'Mechanical CAD',
    imagePath: '/gallery-cad-back.jpg',
    description: 'Detailed view of the dual-channel tension spring and structural clamping geometry.',
  },
  {
    id: 'prototype',
    title: 'Physical Prototype',
    category: '3D Printed Build',
    imagePath: '/gallery-prototype.png',
    description: 'Fully operational breadboard model built with PLA plastic clamp and active LCD telemetry panels.',
  },
  {
    id: 'concept',
    title: 'Production Concept',
    category: 'Industrial Concept',
    imagePath: '/gallery-concept.png',
    description: 'Render mapping final medical-grade PC-ABS contours, clean lines, and USB-C port allocations.',
  },
  {
    id: 'clinical',
    title: 'Device in Clinical Use',
    category: 'Clinical Deployment',
    imagePath: '/hero-product.jpg',
    description: 'The final SafeDrip hardware unit running monitoring tasks beside a patient in simulated hospital wards.',
  },
];

export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = GALLERY_ITEMS[activeIndex];

  return (
    <Section
      id="gallery"
      theme="white"
      overline="Design Lifecycle"
      title="From CAD to the Clinic"
      subtitle="Examine the evolution of SafeDrip, tracing the design from initial engineering drafts to actual prototypes and hospital deployment."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* ─── Left Column: Large Apple-style Interactive Image ─── */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-2xl bg-surface-50 border border-surface-150 p-4 sm:p-8 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] shadow-card">
            {/* Context Categorization overlay */}
            <div className="absolute top-4 left-6 text-[10px] font-mono text-surface-400 tracking-wider">
              {activeItem.category.toUpperCase()}
            </div>

            {/* Display Area for Active Image */}
            <div className="flex-1 flex items-center justify-center py-6 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.imagePath}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={transitionSmooth}
                  className="max-h-[320px] sm:max-h-[420px] w-auto object-contain rounded-lg shadow-soft"
                />
              </AnimatePresence>
            </div>

            {/* Explanatory description card footer inside the gallery card */}
            <div className="border-t border-surface-200/80 pt-4 mt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={transitionSmooth}
                  className="space-y-1"
                >
                  <h4 className="text-body font-bold text-surface-950">
                    {activeItem.title}
                  </h4>
                  <p className="text-caption text-surface-500 leading-relaxed text-pretty">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ─── Right Column: Thumbnail Selection Gallery ─── */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-caption font-bold text-surface-400 uppercase tracking-widest block mb-2">
            SELECT STAGE
          </h3>
          <div className="flex flex-col gap-3">
            {GALLERY_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl border text-left transition-all duration-300 ${
                    isActive
                      ? 'border-brand-500 bg-brand-50/50 shadow-soft text-brand-900 font-semibold'
                      : 'border-surface-150 bg-white hover:border-surface-250 text-surface-600'
                  }`}
                >
                  {/* Miniature Thumbnail Preview */}
                  <div className="w-12 h-12 rounded-lg bg-surface-50 border border-surface-200 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={item.imagePath}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span className="text-caption block font-bold text-surface-900 leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-surface-400 block mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
