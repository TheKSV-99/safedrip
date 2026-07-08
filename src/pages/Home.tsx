/**
 * Home — SafeDrip Landing page and storytelling journey
 *
 * Renders all custom premium sections in sequence, guiding James Dyson Award
 * judges and clinical directors through problem, solution, validation, and specs.
 */

import {
  Hero,
  StatsBar,
  ProductGallery,
  ClinicalProblem,
  Innovation,
  EngineeringCore,
  Algorithm,
  HardwareDesign,
  CaregiverWorkflow,
  ClinicalSimplicity,
  HospitalConnectivity,
  LaboratoryTesting,
  WatchAction,
  EngineeringTimeline,
  ClinicalValidation,
  EcoDesign,
  Specifications,
  MeetInventors,
  ComplianceFAQ,
} from '@/components/sections';

export function Home() {
  return (
    <>
      {/* Hook & Product Highlights */}
      <Hero />
      <ProductGallery />
      <StatsBar />

      {/* Problem context */}
      <ClinicalProblem />

      {/* Solution & Mechanical designs */}
      <Innovation />

      {/* Sensor core technologies */}
      <EngineeringCore />

      {/* Filter algorithms */}
      <Algorithm />

      {/* Hospital ward optimizations */}
      <HardwareDesign />

      {/* User experiences */}
      <CaregiverWorkflow />

      {/* Touchscreen UI screen details */}
      <ClinicalSimplicity />

      {/* Communication data flow path */}
      <HospitalConnectivity />

      {/* Laboratory validation and photographs */}
      <LaboratoryTesting />

      {/* Cinematic video demo player */}
      <WatchAction />

      {/* Evolution timeline */}
      <EngineeringTimeline />

      {/* Precision telemetry charts */}
      <ClinicalValidation />

      {/* Circle economies */}
      <EcoDesign />

      {/* Specs sheet */}
      <Specifications />

      {/* Meet the Inventors profile grid */}
      <MeetInventors />

      {/* Accreditations and Accordion */}
      <ComplianceFAQ />
    </>
  );
}
