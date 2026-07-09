"use client";

import { useScrollFX } from "@/lib/useScrollFX";
import GrainOverlay from "@/components/GrainOverlay";
import Nav from "@/components/Nav";
import AudioPlayer from "@/components/AudioPlayer";
import TravelRocket from "@/components/TravelRocket";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Escales from "@/components/sections/Escales";
import Contact from "@/components/sections/Contact";

export default function PortfolioApp() {
  const activeSection = useScrollFX();

  return (
    <div style={{ fontFamily: "var(--font-body)", position: "relative" }}>
      <GrainOverlay />

      <Hero />
      <About />
      <Escales />
      <Contact />

      <TravelRocket />
      <Nav activeSection={activeSection} />
      <AudioPlayer />
    </div>
  );
}
