/**
 * CaregiverWorkflow — Simplification of nursing procedures
 *
 * Explains setup workflows. Features an interactive device OLED interface mockup
 * where visitors trigger a 3-second auto-calibration drip sequence.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CheckCircle, RefreshCcw } from 'lucide-react';

type SetupStep = 'idle' | 'calibrating' | 'completed' | 'error';

export function CaregiverWorkflow() {
  const [step, setStep] = useState<SetupStep>('idle');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (step !== 'calibrating') return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [step]);

  const handleStartCalibration = () => {
    setStep('calibrating');
  };

  const handleReset = () => {
    setStep('idle');
    setProgress(0);
  };

  return (
    <Section
      id="workflow"
      theme="light"
      overline="Caregiver Workflow"
      title="Zero-Configuration Setup"
      subtitle="Infusion setups shouldn't add to nurse workload. SafeDrip requires a single-button click, auto-detecting base flow rates in under three seconds."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* ─── Left Column: OLED Interface Simulator ─── */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
          <div className="relative w-72 h-96 bg-surface-950 rounded-[36px] p-6 border-8 border-surface-800 shadow-elevated flex flex-col justify-between text-white">
            {/* Screen bezel logo */}
            <div className="text-[10px] font-mono text-surface-600 tracking-widest text-center uppercase">
              SafeDrip v1.2
            </div>

            {/* Simulated OLED screen area */}
            <div className="flex-1 bg-black border border-surface-800 rounded-xl my-4 p-4 flex flex-col justify-between relative overflow-hidden font-mono">
              {step === 'idle' && (
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                  <div className="w-10 h-10 rounded-full border border-dashed border-brand-400 flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 rounded-full bg-brand-500" />
                  </div>
                  <div>
                    <span className="text-[11px] text-surface-400 block uppercase">SENSOR READY</span>
                    <span className="text-body font-bold text-white block mt-1">LATCH CHAMBER</span>
                  </div>
                </div>
              )}

              {step === 'calibrating' && (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div>
                    <span className="text-[9px] text-brand-400 block uppercase">CALIBRATING BASE RATE</span>
                    <span className="text-body font-bold text-white block mt-1">MONITORING FLOW...</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-surface-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-brand-500 h-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-caption text-surface-500 block text-right">{progress}%</span>
                </div>
              )}

              {step === 'completed' && (
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                  <CheckCircle className="h-10 w-10 text-accent-400" />
                  <div>
                    <span className="text-[9px] text-accent-400 block uppercase">CALIBRATION PASS</span>
                    <span className="text-body font-bold text-white block mt-1">RATE: 60 mL/hr</span>
                  </div>
                  <span className="text-[9px] text-surface-500 block">FLOW RETAINED AT ±1.5%</span>
                </div>
              )}

              {/* Interface Telemetry Base Overlay */}
              <div className="border-t border-surface-900 pt-2 flex justify-between text-[8px] text-surface-500">
                <span>BATTERY: 94%</span>
                <span>TELEMETRY: ON</span>
              </div>
            </div>

            {/* Screen bezel button */}
            <div className="flex justify-center">
              {step === 'idle' && (
                <Button
                  variant="primary"
                  onClick={handleStartCalibration}
                  className="!h-10 !px-5 text-caption font-semibold rounded-lg"
                >
                  PRESS TO LOCK
                </Button>
              )}
              {step === 'calibrating' && (
                <Button
                  variant="ghost"
                  disabled
                  className="!h-10 !px-5 text-caption font-semibold rounded-lg bg-surface-900 text-surface-500"
                >
                  CALIBRATING...
                </Button>
              )}
              {step === 'completed' && (
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  icon={<RefreshCcw className="h-4 w-4" />}
                  iconPosition="left"
                  className="!h-10 !px-5 text-caption font-semibold rounded-lg bg-surface-900 text-white border-surface-800 hover:bg-surface-800"
                >
                  RESET CAL
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Right Column: Steps Overview ─── */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <h3 className="text-title font-bold text-surface-950">
            Designed for High-Pressure Wards
          </h3>
          <p className="text-body text-surface-500">
            Nurses manage multiple beds simultaneously. SafeDrip operates through a zero-training, visual feedback workflow.
          </p>

          <div className="space-y-4 pt-4">
            {[
              {
                num: '01',
                title: 'Clip on Chamber',
                desc: 'Attach the device clamp. Built-in light baffles immediately isolate ambient window light.',
              },
              {
                num: '02',
                title: 'Calibrate Single Button',
                desc: 'Single button press triggers initial rate detection, locking in baseline parameters.',
              },
              {
                num: '03',
                title: 'Real-Time Oversight',
                desc: 'Continuous tracking maps anomalies. If drip rates spike or drop, alert signals trigger immediately.',
              },
            ].map((s) => (
              <div key={s.num} className="flex gap-4 items-start border-b border-surface-150 pb-4">
                <span className="font-mono text-body-lg font-bold text-brand-500">{s.num}</span>
                <div>
                  <h4 className="text-body font-semibold text-surface-900">{s.title}</h4>
                  <p className="text-caption text-surface-500 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
