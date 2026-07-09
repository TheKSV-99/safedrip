/**
 * MeetInventors — Apple executive-style profile showcase
 *
 * Displays two minimal premium profile cards with bios, roles, and contacts.
 */

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Mail, ShieldCheck, Cpu } from 'lucide-react';
import { staggerContainerFast, staggerItem } from '@/lib/animations';

interface Inventor {
  name: string;
  role: string;
  email: string;
  bio: string;
  photoPath: string;
  icon: any;
}

const INVENTORS: Inventor[] = [
  {
    name: 'Somanadha Vinayak.K',
    role: 'Hardware Architect & CAD Lead',
    email: 'somanadh9963@gmail.com',
    bio: 'Leads physical chassis design, multi-view SolidWorks modeling, and rapid tolerancing. Developed the universal spring-tensioned clamp mount and mechanical casing layouts.',
    photoPath: `${import.meta.env.BASE_URL}inventor-somanadh.png`,
    icon: ShieldCheck,
  },
  {
    name: 'Sofiya.S',
    role: 'Firmware & Software Lead',
    email: 'sofiya774@gmail.com',
    bio: 'Designs microcontroller signal paths, infrared attenuation logic, and secure telemetry interfaces. Engineered the core digital filtering loop and ward monitor dashboards.',
    photoPath: `${import.meta.env.BASE_URL}inventor-sofiya.png`,
    icon: Cpu,
  },
];

export function MeetInventors() {
  return (
    <Section
      id="inventors"
      theme="light"
      overline="Project Founders"
      title="Meet the Inventors"
      subtitle="Meet the engineering team behind the SafeDrip telemetry platform, combining industrial hardware logic with clinical software designs."
    >
      <motion.div
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mt-8"
      >
        {INVENTORS.map((inv) => {
          const TeamIcon = inv.icon;
          return (
            <motion.div key={inv.email} variants={staggerItem}>
              <Card
                variant="default"
                padding="lg"
                hover
                className="h-full border border-surface-150 bg-white flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Portrait photo circular */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-surface-100 bg-surface-50 shadow-soft relative flex items-center justify-center">
                      <img
                        src={inv.photoPath}
                        alt={inv.name}
                        className="w-full h-full object-cover select-none"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Copy details */}
                  <div className="space-y-3 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                      <h4 className="text-body font-bold text-surface-950">
                        {inv.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 self-center px-2 py-0.5 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-mono font-medium">
                        <TeamIcon className="h-3 w-3" />
                        {inv.role.split(' & ')[0]}
                      </span>
                    </div>

                    <span className="text-[12px] text-brand-600 font-mono font-semibold block">
                      {inv.role}
                    </span>

                    <p className="text-caption text-surface-500 leading-relaxed text-pretty">
                      {inv.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Email action */}
                <div className="mt-8 pt-4 border-t border-surface-100 flex items-center justify-center md:justify-start">
                  <a
                    href={`mailto:${inv.email}`}
                    className="inline-flex items-center gap-2 text-caption text-surface-400 hover:text-brand-600 transition-colors font-mono"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{inv.email}</span>
                  </a>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
