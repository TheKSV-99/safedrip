/**
 * CTAContact — Closing Call to Action & procurement demo request
 *
 * Includes downloadable documents (whitepapers, study reports) and an interactive request form.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, FileText, CheckCircle } from 'lucide-react';

export function CTAContact() {
  const [formData, setFormData] = useState({ name: '', email: '', facility: '', role: 'clinician' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate API request
    setSubmitted(true);
  };

  return (
    <Section
      id="contact"
      theme="dark"
      overline="Get in Touch"
      title="Advance the Quality of Gravity Infusions"
      subtitle="Request a prototype physical demo unit for your simulation center or download our technical whitepapers."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-stretch">
        {/* ─── Left Column: Technical Documentation Downloads ─── */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-title font-bold text-white">
              Engineering Whitepapers
            </h3>
            <p className="text-body text-surface-400">
              Access the complete design log files, validation run charts, and sensor transmission schemas.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Technical Whitepaper.pdf',
                size: '4.2 MB',
                desc: 'Detailed optical sensing formulas and signal mapping logs.',
              },
              {
                title: 'Clinical Accuracy Run.pdf',
                size: '2.8 MB',
                desc: 'Syringe pump comparison charts and variance logs.',
              },
            ].map((doc) => (
              <a
                key={doc.title}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-between p-4 rounded-xl border border-surface-800 bg-surface-900/60 hover:bg-surface-900 hover:border-surface-700 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-surface-800 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-caption text-white block">{doc.title}</span>
                    <span className="text-[10px] text-surface-500 block mt-0.5">{doc.desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-surface-500 group-hover:text-brand-400 transition-colors">
                  <span>{doc.size}</span>
                  <Download className="h-3.5 w-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ─── Right Column: Interactive Request Form ─── */}
        <div className="lg:col-span-7">
          <Card variant="glass" padding="lg" hover={false} className="border border-surface-800 bg-surface-900/40 backdrop-blur-sm h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-surface-400 uppercase tracking-wider block">FullName</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Helen Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-surface-800 bg-surface-950 text-white placeholder-surface-600 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-surface-400 uppercase tracking-wider block">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. h.miller@clinic.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-surface-800 bg-surface-950 text-white placeholder-surface-600 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-surface-400 uppercase tracking-wider block">Clinical Facility</label>
                      <input
                        type="text"
                        placeholder="e.g. City General Hospital"
                        value={formData.facility}
                        onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-surface-800 bg-surface-950 text-white placeholder-surface-600 focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-surface-400 uppercase tracking-wider block">Primary Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-surface-800 bg-surface-950 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      >
                        <option value="clinician">Clinical Lead / Nurse</option>
                        <option value="administrator">Procurement Director</option>
                        <option value="engineer">Medical Device Engineer</option>
                        <option value="judge">James Dyson Judge</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-4 justify-center">
                    Submit Request
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-8 text-white font-mono"
                >
                  <CheckCircle className="h-12 w-12 text-accent-400" />
                  <div>
                    <span className="text-overline text-accent-400 font-bold block">SUBMISSION CONFIRMED</span>
                    <h4 className="text-body font-bold mt-2">Request Processed</h4>
                  </div>
                  <p className="text-caption text-surface-400 max-w-sm">
                    A representative from SafeDrip Technologies will contact you at <strong>{formData.email}</strong> with details on prototype availability and whitepapers.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', facility: '', role: 'clinician' });
                    }}
                    className="mt-6 bg-surface-800 text-white border-surface-700 hover:bg-surface-700"
                  >
                    Send Another Request
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </Section>
  );
}
