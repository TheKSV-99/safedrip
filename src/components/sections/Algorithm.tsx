/**
 * Algorithm — Highlights signal processing and noise filtering
 *
 * Explains DSP calculations that filter out patient steps, line sway, and ambient light.
 * Features an interactive animation displaying raw vs. filtered signal lines.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Shield, EyeOff, BarChart } from 'lucide-react';

export function Algorithm() {
  const [filterEnabled, setFilterEnabled] = useState<boolean>(true);

  return (
    <Section
      id="algorithm"
      theme="light"
      overline="Signal Processing"
      title="Digital Filtering Algorithms"
      subtitle="In-transit patients and medical pole movements introduce significant optical noise. SafeDrip isolates genuine droplets from physical disturbances in real-time."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* ─── Left Side: Interactive Waveforms ─── */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Card variant="default" padding="lg" hover={false} className="bg-surface-900 border border-surface-800 text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-overline text-surface-400 font-bold block">SIGNAL ISOLATION MONITOR</span>
                  <h4 className="text-body font-bold">DSP Filter Output</h4>
                </div>
                
                {/* Toggle Button */}
                <button
                  onClick={() => setFilterEnabled(!filterEnabled)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-caption font-semibold transition-all ${
                    filterEnabled 
                      ? 'bg-brand-500 text-white' 
                      : 'bg-surface-800 text-surface-400'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  {filterEnabled ? 'Filter: Enabled' : 'Filter: Disabled'}
                </button>
              </div>

              {/* Graphical Waveform Simulation Area */}
              <div className="h-48 border border-surface-800 rounded-xl bg-surface-950 p-4 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="300" y2="25" stroke="#222" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#222" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#222" />

                  {/* Simulated Waveform Path */}
                  <motion.path
                    d={filterEnabled
                      // Filtered, smooth signal with isolated peak in middle
                      ? "M 0 50 L 50 50 Q 80 50 100 50 L 120 50 Q 130 50 135 75 Q 140 75 145 50 L 160 50 Q 180 50 200 50 L 300 50"
                      // Noisy signal with spikes everywhere representing vibrations and light leaks
                      : "M 0 50 L 10 30 L 20 60 L 30 40 L 40 55 L 50 30 L 60 70 L 70 45 L 80 60 L 90 20 L 100 65 L 110 40 L 120 70 L 130 35 L 135 90 L 140 90 L 145 40 L 155 60 L 160 30 L 170 70 L 180 40 L 190 65 L 200 30 L 210 60 L 220 40 L 230 65 L 240 30 L 250 70 L 260 45 L 270 60 L 280 20 L 290 65 L 300 50"
                    }
                    fill="none"
                    stroke={filterEnabled ? "#10b981" : "#ef4444"}
                    strokeWidth="2"
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Status indicator badge overlays */}
                <div className="absolute bottom-3 left-4 text-[9px] font-mono text-surface-400">
                  {filterEnabled 
                    ? 'SIGNAL STATUS: PASS // NOISE RATIO < 1.2%' 
                    : 'SIGNAL STATUS: ERR // INTERFERENCE DETECTED'
                  }
                </div>
              </div>

              {/* Explanatory telemetry table */}
              <div className="grid grid-cols-3 gap-4 text-center border-t border-surface-850 pt-4 text-caption font-mono text-surface-400">
                <div>
                  <span className="block text-[9px] text-surface-500 font-bold uppercase">NOISE INPUT</span>
                  <span className={filterEnabled ? "text-surface-300" : "text-red-400 font-semibold"}>
                    {filterEnabled ? '34.2 dB (Attenuated)' : '34.2 dB'}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] text-surface-500 font-bold uppercase">CALIBRATION RANGE</span>
                  <span className="text-surface-300">10-150 mL/hr</span>
                </div>
                <div>
                  <span className="block text-[9px] text-surface-500 font-bold uppercase">ALGORITHM LATENCY</span>
                  <span className="text-brand-400">22 ms</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ─── Right Side: Mathematical/Clinical Pillars ─── */}
        <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <EyeOff className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-body font-bold text-surface-950">Ambient Light Deflection</h4>
              <p className="text-caption text-surface-500 mt-2 leading-relaxed">
                The optical transmitter switches off and on dynamically at 4kHz to check for background illumination changes, ensuring accuracy near bright ward windows.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <BarChart className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-body font-bold text-surface-950">Intelligent Drip Peak Mapping</h4>
              <p className="text-caption text-surface-500 mt-2 leading-relaxed">
                Tracks rise and fall curves of light blockages rather than instantaneous triggers, preventing drop-shatters or tube splashing from being double-counted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
