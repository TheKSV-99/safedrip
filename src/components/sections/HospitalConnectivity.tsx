/**
 * HospitalConnectivity — Explains telemetry data flow and alerts
 *
 * Shows the flow: Device → WiFi → Central Dashboard → Alert Engine → Staff.
 * Uses an SVG connector with animated dash offsets, interactive node details,
 * and high-fidelity integrations screenshots.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Monitor, Wifi, Shield, Bell, Users, Laptop } from 'lucide-react';
import { transitionSmooth } from '@/lib/animations';

interface FlowNode {
  id: string;
  name: string;
  icon: any;
  summary: string;
  details: string;
  imagePath?: string;
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'device',
    name: 'SafeDrip Device',
    icon: Shield,
    summary: 'Measures flow rates non-invasively.',
    details: 'The optical clip detects volume fluctuations directly on the drip chamber, generating local data payloads every 500 milliseconds.',
    imagePath: `${import.meta.env.BASE_URL}timeline-5-mvp.jpg`,
  },
  {
    id: 'wifi',
    name: 'WiFi Bridge',
    icon: Wifi,
    summary: 'Secures transmissions over 802.11 b/g/n.',
    details: 'Wired with an on-chip transceiver that connects to secure clinical networks, transmitting AES-256 encrypted logs to the ward hub.',
    imagePath: `${import.meta.env.BASE_URL}connect-1-wifi.png`,
  },
  {
    id: 'dashboard',
    name: 'Central Panel',
    icon: Monitor,
    summary: 'Aggregates patient rooms telemetry.',
    details: 'The IV Drip Monitor console runs on ward displays, providing real-time room cards and settings panels for all active beds.',
    imagePath: `${import.meta.env.BASE_URL}connect-2-dashboard.png`,
  },
  {
    id: 'alerts',
    name: 'Alert Engine',
    icon: Bell,
    summary: 'Triggers instant risk calculations.',
    details: 'If flow metrics cross high/low bounds, the processor triggers visual warnings and empty bag flags.',
    imagePath: `${import.meta.env.BASE_URL}connect-3-alerts.png`,
  },
  {
    id: 'staff',
    name: 'Clinical Staff',
    icon: Users,
    summary: 'Alerts ward responders directly.',
    details: 'Forwards alarms directly to nurse panels and pagers, showing patient room details before symptoms escalate.',
    imagePath: `${import.meta.env.BASE_URL}connect-5-integration.jpg`,
  },
];

export function HospitalConnectivity() {
  const [activeNodeId, setActiveNodeId] = useState<string>('dashboard');

  const activeNode = FLOW_NODES.find((node) => node.id === activeNodeId) || FLOW_NODES[2];

  return (
    <Section
      id="connectivity"
      theme="light"
      overline="Hospital Telemetry"
      title="Hospital Connectivity Architecture"
      subtitle="SafeDrip integrates into clinic workflows, linking bedside IV poles to central nurse desks via secure WiFi loops."
    >
      <div className="space-y-12">
        {/* ─── Horizontal Interactive Flow Chart ─── */}
        <div className="relative border border-surface-200 rounded-2xl bg-white p-6 md:p-10 shadow-soft overflow-hidden">
          {/* Animated SVG Connection Line (Desktop only) */}
          <div className="absolute top-[52px] left-16 right-16 h-8 hidden lg:block pointer-events-none">
            <svg className="w-full h-full" fill="none">
              <path
                d="M 10 15 L 1200 15"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <motion.path
                d="M 10 15 L 1200 15"
                stroke="#0a6ebd"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="16, 24"
                animate={{ strokeDashoffset: [-120, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </div>

          {/* Nodes list grid */}
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-5 relative z-10">
            {FLOW_NODES.map((node) => {
              const isActive = node.id === activeNodeId;
              const NodeIcon = node.icon;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-50 border border-brand-200 shadow-soft text-brand-900 font-semibold'
                      : 'bg-white border border-surface-100 hover:border-surface-200 text-surface-600'
                  }`}
                >
                  {/* Node icon circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-500 border-brand-600 text-white shadow-glow-brand'
                        : 'bg-surface-50 border-surface-200 text-surface-500'
                    }`}
                  >
                    <NodeIcon className="h-5 w-5" />
                  </div>

                  <span className="text-caption font-bold text-surface-900 mt-4 leading-tight block">
                    {node.name}
                  </span>
                  <span className="text-[10px] text-surface-400 mt-1 leading-normal block">
                    {node.summary}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Detail Showcase Split Grid ─── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Visual details for active node */}
          <div className="lg:col-span-7">
            <Card variant="default" padding="lg" hover={false} className="border border-surface-150 bg-white">
              <div className="grid gap-6 md:grid-cols-12 items-center">
                {/* Image panel */}
                <div className="md:col-span-6 h-64 border border-surface-200 rounded-xl overflow-hidden bg-surface-50 relative flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeNode.imagePath && (
                      <motion.img
                        key={activeNode.id}
                        src={activeNode.imagePath}
                        alt=""
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={transitionSmooth}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Text specs */}
                <div className="md:col-span-6 space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeNode.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={transitionSmooth}
                      className="space-y-3"
                    >
                      <span className="text-overline text-brand-500 font-bold block uppercase">
                        Flow Stage Detail
                      </span>
                      <h4 className="text-body font-bold text-surface-950">
                        {activeNode.name}
                      </h4>
                      <p className="text-caption text-surface-500 leading-relaxed text-pretty">
                        {activeNode.details}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Physical Laboratory Hardware Integration Photo Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Card variant="outlined" padding="md" hover={false} className="border border-surface-200 bg-surface-50/50">
              <div className="space-y-4">
                <div className="w-full h-48 rounded-xl bg-surface-100 border border-surface-200 overflow-hidden relative">
                  <img
                    src={`${import.meta.env.BASE_URL}connect-5-integration.jpg`}
                    alt="SafeDrip lab-scale clinical loop assembly: breadboard sensor wired beside IV saline bag communicating to dashboard on laptop screen"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white font-bold flex items-center gap-1.5">
                    <Laptop className="h-3.5 w-3.5" />
                    <span>LAB BENCH SETUP INTEGRATION</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-caption font-bold text-surface-950">Ward Loop Integration</h4>
                  <p className="text-[11px] text-surface-500 leading-relaxed mt-1">
                    Telemetry complies with HL7 standards. Secures data logs through AES-256 pathways directly to clinical server terminals.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
