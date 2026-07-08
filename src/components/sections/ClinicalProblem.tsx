/**
 * ClinicalProblem — Detailed look at IV complications
 *
 * Explains infiltration, phlebitis, and extravasation with interactive cards
 * and empirical statistics highlighting manual observation latencies.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ShieldAlert, Activity, Info } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { transitionSmooth } from '@/lib/animations';

interface FailureMode {
  id: string;
  title: string;
  incidence: string;
  consequences: string;
  description: string;
  badge: string;
}

const FAILURE_MODES: FailureMode[] = [
  {
    id: 'infiltration',
    badge: 'Most Common',
    title: 'IV Infiltration',
    incidence: 'Up to 23% of therapies',
    consequences: 'Swelling, severe local pain, nerve compression, tissue damage.',
    description: 'Occurs when non-vesicant IV fluid or medication leaks into surrounding tissue instead of entering the vein. Frequently goes unnoticed during busy shifts.',
  },
  {
    id: 'extravasation',
    badge: 'High Severity',
    title: 'Extravasation',
    incidence: 'Up to 6% of ICU cases',
    consequences: 'Blistering, severe chemical burns, tissue necrosis, skin grafting.',
    description: 'The accidental leakage of vesicant (highly irritant/destructive) drugs, such as chemotherapeutic agents or vasopressors, into surrounding tissue.',
  },
  {
    id: 'air-in-line',
    badge: 'Clinical Alert',
    title: 'Air-In-Line Anomalies',
    incidence: 'Frequent nuisance alert',
    consequences: 'Air embolism risk, clinical panic, device locking.',
    description: 'Bubbles or continuous air pockets traversing the line. Manual check workflows lead to frequent false alarms or delayed intervention times.',
  },
];

export function ClinicalProblem() {
  const [activeMode, setActiveMode] = useState<string>('infiltration');

  const selectedData = FAILURE_MODES.find((mode) => mode.id === activeMode) || FAILURE_MODES[0];

  return (
    <Section
      id="problem"
      theme="white"
      overline="The Clinical Friction"
      title="The Silent Complications of IV Infusions"
      subtitle="Modern medicine relies on intravenous access, yet monitoring remains largely manual. Fluid complications are recognized hours after tissue saturation has occurred."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ─── Left Side: Stats and Interactive Toggles ─── */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div className="space-y-6">
            <h3 className="text-title font-bold text-surface-950">
              Why Manual Checks Fail
            </h3>
            <p className="text-body text-surface-500">
              Nurses monitor IV lines by visual and manual check intervals (often 2 to 4 hours apart). 
              Anomalies occurring between visits can cause substantial subcutaneous tissue saturation before detection.
            </p>
          </div>

          {/* Interactive Mode Toggles */}
          <div className="mt-8 space-y-3">
            {FAILURE_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                  activeMode === mode.id
                    ? 'border-brand-500 bg-brand-50/50 shadow-soft text-brand-900'
                    : 'border-surface-100 bg-white hover:border-surface-200 text-surface-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeMode === mode.id ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-500'}`}>
                    {mode.id === 'infiltration' ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : mode.id === 'extravasation' ? (
                      <ShieldAlert className="h-5 w-5" />
                    ) : (
                      <Activity className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-body block">{mode.title}</span>
                    <span className="text-overline text-surface-400 font-medium tracking-wide">
                      {mode.badge}
                    </span>
                  </div>
                </div>
                <Info className={`h-4 w-4 shrink-0 transition-transform ${activeMode === mode.id ? 'text-brand-500 rotate-180' : 'text-surface-300'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ─── Right Side: Visual Case Details ─── */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <Card variant="default" padding="lg" hover={false} className="relative overflow-hidden min-h-[380px] flex flex-col justify-between border border-surface-100">
            {/* Visual Fluid Infiltration Indicator */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-200 to-accent-100 blur-[80px]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedData.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={transitionSmooth}
                className="space-y-6 relative z-10"
              >
                <div className="inline-flex px-3 py-1 rounded-full text-overline font-semibold tracking-wider text-brand-600 bg-brand-50 border border-brand-100">
                  {selectedData.badge}
                </div>

                <h4 className="text-[1.75rem] font-bold text-surface-950 leading-tight">
                  {selectedData.title}
                </h4>

                <div className="grid gap-6 sm:grid-cols-2 pt-2 border-t border-surface-100">
                  <div>
                    <span className="text-overline text-surface-400 font-bold block">INCIDENCE RATE</span>
                    <span className="text-body font-semibold text-surface-800">{selectedData.incidence}</span>
                  </div>
                  <div>
                    <span className="text-overline text-surface-400 font-bold block">CLINICAL RISK</span>
                    <span className="text-body font-semibold text-brand-600">{selectedData.consequences}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-overline text-surface-400 font-bold block">HOW IT OCCURS</span>
                  <p className="text-body text-surface-600 leading-relaxed text-pretty">
                    {selectedData.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-2.5 text-caption text-surface-400 pt-4 border-t border-surface-100">
              <ShieldAlert className="h-4 w-4 text-brand-500 shrink-0" />
              <span>Continuous monitoring resolves validation gaps and alerts nursing teams immediately.</span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
