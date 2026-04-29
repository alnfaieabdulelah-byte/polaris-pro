"use client";

import { useEffect, useState, useRef } from "react";
import PolarisStar from "./PolarisStar";

interface HeroSectionProps {
  onNavigate: (section: "emotions" | "genres") => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)",
      }}
    >
      {/* Starfield background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {mounted && <Starfield />}
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Polaris Star */}
        <div
          className={`mb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.1s" }}
        >
          <PolarisStar size={72} glow={true} animated={true} />
        </div>

        {/* Wordmark */}
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.25s" }}
        >
          <h1
            className="font-black text-white uppercase"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              letterSpacing: "0.25em",
              lineHeight: 1,
              fontWeight: 900,
              textShadow: "0 0 80px rgba(255,255,255,0.08)",
            }}
          >
            POLARIS
          </h1>
        </div>

        {/* Tagline */}
        <div
          className={`mt-4 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p
            className="text-white/40 uppercase tracking-[0.4em] font-medium"
            style={{ fontSize: "clamp(0.6rem, 2vw, 0.85rem)" }}
          >
            Your Emotional Music Universe
          </p>
        </div>

        {/* Divider line */}
        <div
          className={`mt-8 h-px w-24 transition-all duration-1000 ${mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            transitionDelay: "0.55s",
          }}
        />

        {/* Description */}
        <div
          className={`mt-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.65s" }}
        >
          <p
            className="text-white/50 font-light max-w-lg mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}
          >
            Navigate your inner world through music.
            <br />
            Not a playlist. A{" "}
            <span className="text-white/80 font-medium italic">
              personal emotional operating system.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.8s" }}
        >
          <button
            onClick={() => onNavigate("emotions")}
            className="group relative px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#000",
              boxShadow: "0 0 40px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.4)",
              letterSpacing: "0.15em",
            }}
          >
            <span className="relative z-10">Explore Emotions</span>
          </button>

          <button
            onClick={() => onNavigate("genres")}
            className="group px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              letterSpacing: "0.15em",
            }}
          >
            Browse Genres
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 flex flex-col items-center gap-2 transition-all duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1.2s" }}
        >
          <p className="text-white/20 text-xs tracking-widest uppercase">
            Scroll to begin
          </p>
          <div className="w-px h-8 overflow-hidden">
            <div
              className="w-full h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
              style={{
                animation: "energy-surge 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Minimal starfield
function Starfield() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `star-pulse ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
