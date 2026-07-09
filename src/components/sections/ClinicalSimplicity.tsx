/**
 * ClinicalSimplicity — Showcases onboard touchscreen interface UI screens
 *
 * Displays five device UI screens in high-fidelity mockups. Clicking any screen
 * triggers an Apple-style enlarged detail overlay with workflow details.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { X, Check, MonitorPlay } from 'lucide-react';
import { transitionSmooth } from '@/lib/animations';

interface ScreenWorkflow {
  id: string;
  title: string;
  tagline: string;
  imagePath: string;
  badge: string;
  summary: string;
  details: string;
}

const WORKFLOWS: ScreenWorkflow[] = [
  {
    id: 'boot',
    title: 'Boot Initialization',
    tagline: 'Firmware & Sensor Verification',
    imagePath: `${import.meta.env.BASE_URL}screen-1-boot.png`,
    badge: 'Step 1: Power Up',
    summary: 'Performs self-diagnostics and verifies optical sensor alignment during startup.',
    details: 'When powered on, SafeDrip executes a boot verification routine. It checks processor temperature, transmitter battery voltage, and calibrates the dual photodiode array to ambient baseline lux levels, ensuring clinical readiness before lines are attached.',
  },
  {
    id: 'patient',
    title: 'Patient Registration',
    tagline: 'Secure Numeric Keypad Entry',
    imagePath: `${import.meta.env.BASE_URL}screen-2-patient.png`,
    badge: 'Step 2: ID Lock',
    summary: 'Registers unique patient IDs directly on the device using a tactile digital grid.',
    details: 'To comply with health informatics requirements, the caregiver locks a unique Patient ID (e.g., P00123) into device memory. This links telemetry logs directly to the matching ward bed without exposing personal data.',
  },
  {
    id: 'iv',
    title: 'IV Fluid Selection',
    tagline: 'Viscosity and Refraction Catalog',
    imagePath: `${import.meta.env.BASE_URL}screen-3-iv.png`,
    badge: 'Step 3: Fluid Mapping',
    summary: 'Toggles between fluid catalogs (Saline, Glucose, Lactated Ringer).',
    details: 'Different infusion liquids have varying density, viscosity, and refractive indices which affect drip physics. Caregivers select the fluid type using a single touch, letting the processor auto-adjust drop-volume algorithms.',
  },
  {
    id: 'factor',
    title: 'Drop Factor Setup',
    tagline: 'Precision Tubing Calibration',
    imagePath: `${import.meta.env.BASE_URL}screen-4-factor.png`,
    badge: 'Step 4: Calibration',
    summary: 'Configures drops-per-mL limits to match the attached administration set.',
    details: 'IV lines are categorized by drop factors (e.g., 20 drops/mL or 60 micro-drips/mL). SafeDrip provides a numeric touchscreen setup panel to ensure raw drop counts translate into correct volumetric flow metrics.',
  },
  {
    id: 'dashboard',
    title: 'Main Dashboard',
    tagline: 'Active Clinical Telemetry Center',
    imagePath: `${import.meta.env.BASE_URL}screen-5-dashboard.png`,
    badge: 'Step 5: Active Monitor',
    summary: 'Consolidated overview of current settings and active sensor calibrations.',
    details: 'The primary dashboard shows patient IDs, fluid types, drip factors, and active calibration status. It serves as the primary cockpit for ward staff, featuring clear monochrome digits readable from across the patient room.',
  },
];

export function ClinicalSimplicity() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeWorkflow = WORKFLOWS.find((w) => w.id === selectedId) || null;

  return (
    <Section
      id="simplicity"
      theme="white"
      overline="Onboard Interface"
      title="Designed for Clinical Simplicity"
      subtitle="SafeDrip combines precise sensor telemetry with a simple touchscreen interface. Review the onboard setup screens designed for zero-training clinical safety."
    >
      {/* ─── Grid of 5 UI Device Mockups ─── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mt-8">
        {WORKFLOWS.map((w, index) => (
          <motion.div
            key={w.id}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => setSelectedId(w.id)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            {/* Green casing device mockup */}
            <div className="relative border-4 border-surface-800 rounded-[28px] bg-surface-950 p-4 aspect-[3/4] flex flex-col justify-between shadow-card transition-all duration-300 group-hover:border-brand-500 overflow-hidden">
              {/* Metallic corner screw overlays */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-surface-700 border border-surface-600" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-surface-700 border border-surface-600" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-surface-700 border border-surface-600" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-surface-700 border border-surface-600" />

              {/* Display Screen */}
              <div className="flex-1 bg-black border border-surface-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                <img
                  src={w.imagePath}
                  alt={w.title}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
                
                {/* Click to expand hover overlay */}
                <div className="absolute inset-0 bg-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-lg bg-black/80 text-[10px] font-mono text-white tracking-wider uppercase">
                    Click to Inspect
                  </div>
                </div>
              </div>
            </div>

            {/* Title / Steps below mockup */}
            <div className="mt-4 px-2 space-y-1">
              <span className="text-[10px] font-mono font-bold text-brand-500 block uppercase">
                Step 0{index + 1}
              </span>
              <h4 className="text-caption font-bold text-surface-900 leading-tight group-hover:text-brand-600 transition-colors">
                {w.title}
              </h4>
              <p className="text-[11px] text-surface-400 leading-normal line-clamp-2">
                {w.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Apple-style Enlarged Lightbox Detail Modal ─── */}
      <AnimatePresence>
        {selectedId && activeWorkflow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-surface-950/70 backdrop-blur-md">
            {/* Modal clickout zone */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedId(null)} />

            {/* Modal card content block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={transitionSmooth}
              className="relative z-10 w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-elevated flex flex-col md:flex-row"
            >
              {/* Left Column: Huge Mockup Display */}
              <div className="md:w-1/2 bg-surface-50 p-8 flex items-center justify-center border-r border-surface-100 select-none">
                <div className="relative w-64 aspect-[3/4] border-8 border-surface-800 rounded-[32px] bg-surface-950 p-4 shadow-card">
                  {/* Screws */}
                  <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-surface-700 border border-surface-600" />
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-surface-700 border border-surface-600" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-surface-700 border border-surface-600" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-surface-700 border border-surface-600" />

                  {/* Display */}
                  <div className="w-full h-full bg-black border border-surface-800 rounded-xl overflow-hidden">
                    <img
                      src={activeWorkflow.imagePath}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Workflow specifications */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-overline text-brand-500 font-bold block uppercase">
                        {activeWorkflow.badge}
                      </span>
                      <h3 className="text-title font-bold text-surface-950 mt-1">
                        {activeWorkflow.title}
                      </h3>
                      <p className="text-caption text-surface-400 italic">
                        {activeWorkflow.tagline}
                      </p>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="p-1.5 rounded-full bg-surface-100 hover:bg-surface-200 text-surface-500 transition-colors"
                      aria-label="Close details"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-body text-surface-500 leading-relaxed text-pretty">
                    {activeWorkflow.details}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-surface-100 flex items-center justify-between text-[11px] font-mono text-surface-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-accent-500" />
                    <span>Locked-in parameters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MonitorPlay className="h-3.5 w-3.5" />
                    <span>Touch interface</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
