/**
 * ComplianceFAQ — Explaining medical safety compliance, data encryption, and FAQs
 *
 * Provides a clean medical accordion interface resolving integration questions.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { transitionFast } from '@/lib/animations';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does SafeDrip prevent false alarms caused by patient movement?',
    answer: 'Standard drip counters trigger alarms instantly when a single signal interval is missed. SafeDrip runs an on-device DSP digital bandpass filter that matches physical acceleration models of drip chambers. Real-time swings and pole bumps are isolated, preventing alarms during walks or bed shifts.',
  },
  {
    question: 'Does the optical beam alter the chemical compounds of medications?',
    answer: 'No. SafeDrip utilizes a 940nm narrowband infrared laser array at an emission power level of less than 0.5mW. This falls completely within the safe non-ionizing radiation spectra, and has zero thermal or chemical effect on saline, blood products, or complex medications.',
  },
  {
    question: 'How is data secured and transmitted to central nurse panels?',
    answer: 'All telemetry packets are encrypted on the microprocessor core using AES-256 standards before transmission. Packets contain no patient names or identifiers—only randomized device IDs and rate telemetry—ensuring full compliance with HIPAA and hospital security protocols.',
  },
  {
    question: 'What is the sanitization and sterilization protocol between patient stays?',
    answer: 'SafeDrip is engineered with seamless PC-ABS plastic surfaces rated to IP24 water ingress bounds. It is designed to be wiped down with standard clinical biocides, including 70% Isopropyl alcohol, bleach-based wipes, or quaternary ammonium solutions.',
  },
];

export function ComplianceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      theme="white"
      overline="Safety & Compliance"
      title="Integrity by Design"
      subtitle="Frequently asked integration, mechanical, and safety compliance questions regarding SafeDrip deployments."
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-surface-150 rounded-xl overflow-hidden bg-white transition-colors duration-250"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left text-body font-bold text-surface-900 transition-colors hover:bg-surface-50/50"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-surface-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-500' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={transitionFast}
                  >
                    <div className="p-5 pt-0 text-caption text-surface-500 border-t border-surface-100/50 leading-relaxed text-pretty bg-surface-50/20">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Clinical assurance callout bar */}
        <div className="mt-8 flex items-center gap-3 p-5 rounded-xl border border-brand-100 bg-brand-50/30 text-caption text-brand-700 leading-relaxed">
          <ShieldCheck className="h-5 w-5 text-brand-500 shrink-0" />
          <span>SafeDrip undergoes clinical simulated certifications in accordance with standard medical electrical safety guidelines.</span>
        </div>
      </div>
    </Section>
  );
}
