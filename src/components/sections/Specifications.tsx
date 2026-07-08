/**
 * Specifications — Complete technical spec sheets
 *
 * Tabulated breakdown of sensing thresholds, mechanical bounds, electrical capacities,
 * and telemetry standards. Includes unit dimensions and certifications.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { transitionSmooth } from '@/lib/animations';

interface SpecRow {
  parameter: string;
  value: string;
  notes: string;
}

interface SpecGroup {
  id: string;
  name: string;
  rows: SpecRow[];
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    id: 'sensing',
    name: 'Sensing Core',
    rows: [
      { parameter: 'Sensor Wavelength', value: '940 nm', notes: 'Narrowband infrared' },
      { parameter: 'Sensing Sample Rate', value: '2,000 Hz', notes: 'Digital signal processor level' },
      { parameter: 'Flow Tracking Limits', value: '15 – 150 mL/hr', notes: 'Gravity range compliance' },
      { parameter: 'Volume Resolution', value: '±1.5% Volumetric', notes: 'Standard pediatric scale' },
      { parameter: 'Ambient Suppression', value: '4 kHz Modulation', notes: 'Window light deflection' },
    ],
  },
  {
    id: 'mechanical',
    name: 'Mechanical & Materials',
    rows: [
      { parameter: 'Enclosure Material', value: 'Polycarbonate-ABS', notes: 'Antimicrobial blend' },
      { parameter: 'Device Dimensions', value: '78 x 45 x 22 mm', notes: 'Ultra-compact clip profile' },
      { parameter: 'Clamping Diameter', value: '12 – 22 mm', notes: 'Universal drip chambers' },
      { parameter: 'Clamping Force', value: '4.8 N ± 0.2 N', notes: 'Optimal plastic protection' },
      { parameter: 'Ingress Protection', value: 'IP24 Rating', notes: 'Splash-resistant enclosure' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical & Power',
    rows: [
      { parameter: 'Battery Cells', value: 'Dual Lithium-Polymer', notes: 'Parallel cell fail-safe' },
      { parameter: 'Battery Runtime', value: '48 Hours Active', notes: 'Continuous flow tracking' },
      { parameter: 'Charging Port', value: 'USB-C Interface', notes: 'Medical grade configuration' },
      { parameter: 'Battery Capacity', value: '1,200 mAh', notes: 'Intelligent power control' },
      { parameter: 'Charging Cycle', value: '2.5 Hours to 100%', notes: 'Fast-recovery architecture' },
    ],
  },
];

export function Specifications() {
  const [activeGroup, setActiveGroup] = useState<string>('sensing');

  const selectedGroup = SPEC_GROUPS.find((group) => group.id === activeGroup) || SPEC_GROUPS[0];

  return (
    <Section
      id="specs"
      theme="light"
      overline="Technical Blueprint"
      title="Engineering Specifications"
      subtitle="Complete performance metrics, physical dimensions, electrical layouts, and sensor thresholds."
    >
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {SPEC_GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`px-6 py-2.5 rounded-xl text-caption font-semibold transition-all duration-300 ${
                activeGroup === group.id
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'bg-white text-surface-600 border border-surface-150 hover:border-surface-200'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        {/* Detailed spec grid panel */}
        <div className="max-w-4xl mx-auto">
          <Card variant="default" padding="lg" hover={false} className="border border-surface-100 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGroup.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionSmooth}
                className="overflow-x-auto"
              >
                <table className="w-full text-left text-caption font-mono">
                  <thead>
                    <tr className="border-b border-surface-150 text-[10px] text-surface-400 font-bold uppercase tracking-wider">
                      <th className="pb-3 w-1/3">Parameter</th>
                      <th className="pb-3 w-1/3 text-brand-600">Spec Metric</th>
                      <th className="pb-3 w-1/3">Engineering Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGroup.rows.map((row) => (
                      <tr key={row.parameter} className="border-b border-surface-100 hover:bg-surface-50/50 transition-colors">
                        <td className="py-4 font-semibold text-surface-800">{row.parameter}</td>
                        <td className="py-4 font-bold text-surface-950">{row.value}</td>
                        <td className="py-4 text-surface-500">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </Section>
  );
}
