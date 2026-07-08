/**
 * WatchAction — Cinematic video player section embedding the YouTube prototype
 *
 * Implements glassmorphism frames, responsive aspect-video ratios, and an
 * interactive timestamp guide timeline below.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Play, Clock, Sparkles } from 'lucide-react';
import { transitionSmooth } from '@/lib/animations';

interface VideoSegment {
  id: string;
  timestamp: string;
  title: string;
  description: string;
}

const SEGMENTS: VideoSegment[] = [
  {
    id: 'prototype',
    timestamp: '0:00',
    title: 'Hardware Assembly',
    description: 'Mounting the 3D-printed telemetry clamp directly to a standard gravity drip chamber.',
  },
  {
    id: 'calibration',
    timestamp: '0:15',
    title: 'OLED Calibration',
    description: 'System power-up, baseline sensor diagnostic checklist, and self-checks.',
  },
  {
    id: 'monitoring',
    timestamp: '0:35',
    title: 'Optical Processing',
    description: 'The infrared emitter array tracking falling droplets in real-time.',
  },
  {
    id: 'dashboard',
    timestamp: '1:00',
    title: 'Telemetry Dashboard',
    description: 'Aggregating active drops/min, flow counts, and volume curves on clinical screens.',
  },
  {
    id: 'alerts',
    timestamp: '1:25',
    title: 'Alert Triggering',
    description: 'Automated warnings triggered when the line experiences occlusion or runs dry.',
  },
];

export function WatchAction() {
  const [activeSegmentId, setActiveSegmentId] = useState<string>('prototype');

  const activeSegment = SEGMENTS.find((s) => s.id === activeSegmentId) || SEGMENTS[0];

  return (
    <Section
      id="watch-action"
      theme="dark"
      overline="Interactive Demonstration"
      title="Watch SafeDrip in Action"
      subtitle="See how SafeDrip measures gravity infusions. Explore the segments below to skip through assembly, self-calibration, and live warning cycles."
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Cinematic Glass Player Container */}
        <div className="relative p-3 sm:p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-elevated overflow-hidden">
          {/* Aspect ratio frame for iframe */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-card">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/eCLnxPmnJtw?si=cV2de80_bJBoLVmn"
              title="SafeDrip Prototype Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Interactive Playback Timeline */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
            <span className="text-[11px] font-mono font-bold text-brand-400 tracking-wider uppercase">
              Demonstration Segments
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
              <Clock className="h-3.5 w-3.5" />
              <span>Click nodes to view milestones</span>
            </div>
          </div>

          {/* Timeline Nodes Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {SEGMENTS.map((seg) => {
              const isActive = seg.id === activeSegmentId;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegmentId(seg.id)}
                  className={`flex flex-col items-start text-left p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white/10 border border-white/20 shadow-soft text-white'
                      : 'bg-white/0 border border-transparent text-white/50 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-brand-400 bg-brand-950/80 px-2 py-0.5 rounded border border-brand-900">
                      {seg.timestamp}
                    </span>
                    {isActive && <Play className="h-3 w-3 text-brand-400 fill-brand-400" />}
                  </div>

                  <h5 className="text-caption font-bold mt-3 leading-tight block text-white">
                    {seg.title}
                  </h5>
                </button>
              );
            })}
          </div>

          {/* Segment Details Card */}
          <Card variant="outlined" padding="md" hover={false} className="border border-white/10 bg-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={transitionSmooth}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-950/80 border border-brand-900 flex items-center justify-center text-brand-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-caption font-bold text-white flex items-center gap-2">
                    <span>{activeSegment.title}</span>
                    <span className="text-[10px] font-mono font-medium text-white/40">
                      (Starts at {activeSegment.timestamp})
                    </span>
                  </h4>
                  <p className="text-[12px] text-white/60 leading-relaxed text-pretty">
                    {activeSegment.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </Section>
  );
}
