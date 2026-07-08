/**
 * EngineeringCore — Optical sensing mechanism and interactive simulation
 *
 * Explains IR transmitter/receiver alignment, refraction mapping, and features
 * a live interactive drip chamber simulator matching slider values to pulse graphs.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RefreshCw } from 'lucide-react';

export function EngineeringCore() {
  const [flowRate, setFlowRate] = useState<number>(60); // mL/hr
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [pulseCount, setPulseCount] = useState<number>(0);
  const [pulseActive, setPulseActive] = useState<boolean>(false);

  // Approximate drops per minute. Standard gravity set is 20 drops/mL.
  // Drops per min = (Flow Rate mL/hr * 20 drops/mL) / 60 min = Flow Rate / 3.
  const dropsPerMinute = Math.round(flowRate / 3);
  const dripIntervalMs = dropsPerMinute > 0 ? (60 / dropsPerMinute) * 1000 : 999999;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Trigger drip event
      setPulseActive(true);
      setPulseCount((prev) => prev + 1);

      // Reset pulse high after animation completes
      setTimeout(() => {
        setPulseActive(false);
      }, 500);
    }, dripIntervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, dripIntervalMs]);

  return (
    <Section
      id="technology"
      theme="white"
      overline="Sensor Technology"
      title="High-Frequency Optical Sensing"
      subtitle="At the heart of SafeDrip lies a dual-channel infrared array that maps the silhouette of falling drops at 2,000 measurements per second."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* ─── Left Column: Core Technical Details ─── */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-title font-bold text-surface-950">
            Mapping Refraction Curves
          </h3>
          <p className="text-body text-surface-500">
            Standard counters count simple line breaks, resulting in errors from splashes or tube swaying. 
            SafeDrip tracks the exact geometry of the light beam interruption.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-2 shrink-0 animate-ping" />
              <div>
                <h4 className="text-body font-semibold text-surface-900">940nm Infrared Array</h4>
                <p className="text-caption text-surface-500 mt-1">
                  Narrow spectral transmitter isolates the sensor from fluorescent clinic room lighting.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-500 mt-2 shrink-0 animate-pulse" />
              <div>
                <h4 className="text-body font-semibold text-surface-900">2,000 Hz Core Sample Rate</h4>
                <p className="text-caption text-surface-500 mt-1">
                  Captures 30+ frames for a single droplet falling, verifying drop volume and shape.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Column: Interactive Drop Simulator ─── */}
        <div className="lg:col-span-7">
          <Card variant="outlined" padding="lg" hover={false} className="border border-surface-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-overline text-surface-400 font-bold block">INTERACTIVE SIMULATION</span>
                  <h4 className="text-body font-bold text-surface-900">Drip Chamber Real-Time Telemetry</h4>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => setIsPlaying(!isPlaying)}
                    icon={isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    className="!h-9 !px-3 rounded-lg"
                  >
                    <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => setPulseCount(0)}
                    icon={<RefreshCw className="h-4 w-4" />}
                    className="!h-9 !px-3 rounded-lg"
                  >
                    <span className="sr-only">Reset</span>
                  </Button>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-caption font-semibold">
                  <span className="text-surface-500">Target Flow Rate</span>
                  <span className="text-brand-600 font-mono">{flowRate} mL/hr ({dropsPerMinute} drops/min)</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  value={flowRate}
                  onChange={(e) => setFlowRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              {/* Simulation Grid Layout */}
              <div className="grid gap-6 sm:grid-cols-12 items-stretch mt-4">
                {/* Visual Drip Chamber */}
                <div className="sm:col-span-4 border border-surface-150 rounded-xl bg-surface-50 flex items-center justify-center relative h-52 overflow-hidden">
                  <div className="absolute top-2 text-[8px] font-mono text-surface-400 tracking-wider">
                    CHAMBER MONITOR
                  </div>
                  
                  {/* Drip Tube Profile */}
                  <div className="w-10 h-40 border border-surface-300 rounded-full bg-white/40 flex flex-col justify-between items-center py-6">
                    <div className="w-8 h-1 bg-surface-300 rounded" />
                    
                    {/* Simulated falling droplet */}
                    {isPlaying && (
                      <motion.div
                        key={pulseCount}
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 80, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: Math.max(0.3, Math.min(1.2, 35 / flowRate)), ease: 'linear' }}
                        className="w-2 h-3 bg-brand-500 rounded-full rounded-t-sm absolute"
                        style={{ top: '25%' }}
                      />
                    )}

                    {/* Sensor Alignment Indicator Bar */}
                    <div className="w-12 h-1 bg-brand-500/25 border-y border-brand-500/50 absolute top-[50%] flex justify-between items-center px-1">
                      <div className="w-1 h-1 rounded-full bg-brand-500" />
                      <div className="w-1 h-1 rounded-full bg-brand-500" />
                    </div>

                    <div className="w-8 h-1 bg-surface-300 rounded" />
                  </div>
                </div>

                {/* Oscilloscope Line Chart Grid */}
                <div className="sm:col-span-8 border border-surface-150 rounded-xl bg-surface-900 p-4 flex flex-col justify-between relative h-52 text-white">
                  <div className="flex justify-between items-center text-[8px] font-mono text-surface-400">
                    <span>SENSOR OSCILLOSCOPE (RX)</span>
                    <span className="font-semibold text-brand-400">SAMPLE RATE: 2,000Hz</span>
                  </div>

                  {/* SVG Waveform Curve */}
                  <div className="h-28 flex items-center justify-center relative">
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                      {/* Grid background lines */}
                      <line x1="0" y1="20" x2="200" y2="20" stroke="#333" strokeDasharray="3,3" />
                      <line x1="0" y1="50" x2="200" y2="50" stroke="#333" strokeDasharray="3,3" />
                      <line x1="0" y1="80" x2="200" y2="80" stroke="#333" strokeDasharray="3,3" />
                      
                      {/* Active Photodiode Interrupt Signal Path */}
                      <motion.path
                        d={pulseActive 
                          ? "M 0 50 L 60 50 Q 80 50, 90 90 Q 100 90, 110 50 L 200 50" 
                          : "M 0 50 L 200 50"
                        }
                        fill="none"
                        stroke={pulseActive ? "#10b981" : "#0a6ebd"}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                    </svg>

                    {/* Laser Signal Interruption Indicator Pulse */}
                    <AnimatePresence>
                      {pulseActive && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="absolute bg-accent-500/10 border border-accent-500/30 rounded-lg px-2 py-1 text-[9px] font-mono text-accent-400 top-2 right-2"
                        >
                          DROP DETECTED
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Realtime stats dashboard bottom footer */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-surface-400 border-t border-surface-800 pt-2">
                    <span>ACCUMULATED DROPS: {pulseCount}</span>
                    <span>VOL_EST: {(pulseCount / 20).toFixed(2)} mL</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
