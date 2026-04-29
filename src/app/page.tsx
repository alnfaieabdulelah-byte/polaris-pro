"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EmotionsSection from "@/components/EmotionsSection";
import GenresSection from "@/components/GenresSection";
import FooterSection from "@/components/FooterSection";
import CursorGlow from "@/components/CursorGlow";

export default function PolarisApp() {
  const [activeSection, setActiveSection] = useState("hero");
  const emotionsRef = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const emotionsTop = emotionsRef.current?.offsetTop ?? 0;
      const genresTop = genresRef.current?.offsetTop ?? 0;

      if (scrollY < emotionsTop - 200) {
        setActiveSection("hero");
      } else if (scrollY < genresTop - 200) {
        setActiveSection("emotions");
      } else {
        setActiveSection("genres");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = useCallback(
    (section: string) => {
      setActiveSection(section);

      if (section === "hero") {
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (section === "emotions") {
        emotionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (section === "genres") {
        genresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    },
    []
  );

  return (
    <main className="min-h-screen bg-black">
      {/* Cursor glow — desktop only */}
      <CursorGlow />

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero */}
      <div ref={heroRef}>
        <HeroSection onNavigate={handleNavigate} />
      </div>

      {/* Separator */}
      <div
        className="h-px mx-auto max-w-4xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Emotions Section */}
      <div ref={emotionsRef}>
        <EmotionsSection />
      </div>

      {/* Separator */}
      <div
        className="h-px mx-auto max-w-4xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Genres Section */}
      <div ref={genresRef}>
        <GenresSection />
      </div>

      {/* Footer + Install */}
      <FooterSection />
    </main>
  );
}
