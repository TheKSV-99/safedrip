/**
 * EngineeringTimeline — Premium horizontal scrolling evolution timeline
 *
 * Visualizes the chronological journey from breadboard POC to clinical hardware.
 * Uses Framer Motion viewports for premium stagger-slide entrances.
 */

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { staggerContainerFast, staggerItem } from '@/lib/animations';

interface Milestone {
  version: string;
  year: string;
  title: string;
  description: string;
  imagePath: string;
}

const MILESTONES: Milestone[] = [
  {
    version: 'v1.0',
    year: '2024 (Phase 1)',
    title: 'Initial Breadboard',
    description: 'Basic proof of concept. Validated core light refraction sensing formulas using an open wire breadboard connected to a gravity drip bag.',
    imagePath: `${import.meta.env.BASE_URL}timeline-1-breadboard.png`,
  },
  {
    version: 'v1.5',
    year: '2025 (Phase 2)',
    title: 'Improved Prototype',
    description: 'Upgraded system featuring an enclosed active green light photodiode tracking drops, reducing ambient interference by 80%.',
    imagePath: `${import.meta.env.BASE_URL}timeline-2-prototype.jpg`,
  },
  {
    version: 'v2.0',
    year: '2025 (Phase 3)',
    title: 'CAD Design',
    description: 'Industrial modeling phase. Computed the physical spring latch bounds, internal tolerances, and grip force parameters.',
    imagePath: `${import.meta.env.BASE_URL}timeline-3-cad.png`,
  },
  {
    version: 'v2.5',
    year: '2025 (Phase 4)',
    title: '3D Printing',
    description: 'Rapid prototyping shell builds. Simulated printer tolerances and sliced PC-ABS enclosures using Bambu Lab slicers.',
    imagePath: `${import.meta.env.BASE_URL}timeline-4-printing.jpg`,
  },
  {
    version: 'v3.0',
    year: '2026 (Phase 5)',
    title: 'Functional MVP',
    description: 'The enclosed medical-grade telemetry device. Finished with a high-contrast clinical OLED, internal battery backup, and IP24 enclosure.',
    imagePath: `${import.meta.env.BASE_URL}timeline-5-mvp.jpg`,
  },
];

export function EngineeringTimeline() {
  return (
    <Section
      id="evolution"
      theme="light"
      overline="Product Evolution"
      title="Engineering Timeline"
      subtitle="Follow the step-by-step development of SafeDrip from lab bench proof of concept to full medical-grade implementation."
    >
      <div className="relative mt-8">
        {/* Horizontal Connecting Timeline Axis Line */}
        <div className="absolute top-[175px] left-8 right-8 h-0.5 bg-gradient-to-r from-brand-300 via-accent-300 to-brand-500 hidden md:block" />

        {/* Scrollable Container */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex overflow-x-auto gap-8 pb-10 pt-4 px-4 scrollbar-thin scrollbar-thumb-surface-300 scrollbar-track-transparent snap-x snap-mandatory"
        >
          {MILESTONES.map((stone, index) => (
            <motion.div
              key={stone.version}
              variants={staggerItem}
              className="flex-shrink-0 w-[290px] sm:w-[340px] snap-center relative flex flex-col items-center"
            >
              {/* Timeline Connector node Node circle */}
              <div className="mb-8 hidden md:flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-brand-500 shadow-soft flex items-center justify-center z-10 relative">
                  <div className="w-3 h-3 rounded-full bg-brand-500 animate-pulse" />
                </div>
                {/* Visual Index annotation */}
                <div className="absolute -top-6 font-mono text-[10px] text-surface-400 font-bold">
                  0{index + 1}
                </div>
              </div>

              {/* Milestone Card */}
              <Card variant="default" padding="sm" hover className="w-full border border-surface-150 bg-white">
                {/* Milestone Image */}
                <div className="w-full h-44 rounded-lg bg-surface-50 border border-surface-200 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={stone.imagePath}
                    alt={stone.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Category Version Overlays */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-white font-bold">
                    {stone.version}
                  </div>
                </div>

                {/* Milestone copy */}
                <div className="mt-5 space-y-2">
                  <span className="text-overline text-brand-500 font-bold block uppercase">
                    {stone.year}
                  </span>
                  <h4 className="text-body font-bold text-surface-950">
                    {stone.title}
                  </h4>
                  <p className="text-caption text-surface-500 leading-relaxed min-h-[72px]">
                    {stone.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
