/**
 * SafeDrip — Brand & Navigation Constants
 *
 * Single source of truth for brand copy, navigation links,
 * and social media URLs used across the entire site.
 */

export const BRAND = {
  name: 'SafeDrip',
  tagline: 'IV Safety. Every Drop Matters.',
  product: 'SafeDrip Smart IV Monitoring System',
  description:
    'Real-time IV monitoring for safer patient care. Intelligent alerts, seamless integration, clinical-grade precision.',
  copyright: `© ${new Date().getFullYear()} SafeDrip Technologies. All rights reserved.`,
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Overview', href: '#' },
  { label: 'Problem', href: '#problem' },
  { label: 'Technology', href: '#technology' },
  { label: 'Prototype', href: '#gallery' },
  { label: 'Validation', href: '#validation' },
  { label: 'Team', href: '#inventors' },
  { label: 'Contact', href: '#contact' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Product',
    links: [
      { label: 'Complications', href: '#problem' },
      { label: 'Integration', href: '#innovation' },
      { label: 'Core Optical Tech', href: '#technology' },
      { label: 'Specifications', href: '#specs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Design Evolution', href: '#evolution' },
      { label: 'Validation Data', href: '#validation' },
      { label: 'FAQ & Compliance', href: '#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Technical Datasheet', href: '#specs' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
  },
] as const;
