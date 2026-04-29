"use client";

import { useState, useEffect, useRef } from "react";
import { PolarisLogo } from "./PolarisStar";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const navLinks = [
    { id: "emotions", label: "Emotions", labelShort: "Emotions" },
    { id: "genres", label: "Genres", labelShort: "Genres" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(0,0,0,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-polaris">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("hero")}
            className="transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg p-1"
            aria-label="POLARIS home"
          >
            <PolarisLogo size="sm" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`nav-tab text-sm font-semibold tracking-widest uppercase transition-colors focus:outline-none ${
                  activeSection === link.id
                    ? "text-white active"
                    : "text-white/40 hover:text-white/80"
                }`}
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.label}
              </button>
            ))}

            {/* GitHub / Install CTA */}
            <a
              href="#install"
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Install App
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-white/60 hover:text-white focus:outline-none"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span
                  className="h-px bg-current transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen
                      ? "rotate(45deg) translateY(5px)"
                      : "none",
                  }}
                />
                <span
                  className="h-px bg-current transition-all duration-300"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "none",
                  }}
                />
                <span
                  className="h-px bg-current transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen
                      ? "rotate(-45deg) translateY(-5px)"
                      : "none",
                  }}
                />
              </div>
            </button>

            {/* Mobile menu */}
            {menuOpen && (
              <div
                className="absolute top-full right-0 left-0 py-4 px-6 flex flex-col gap-4"
                style={{
                  background: "rgba(0,0,0,0.95)",
                  backdropFilter: "blur(30px)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMenuOpen(false);
                    }}
                    className={`text-left text-sm font-semibold tracking-widest uppercase transition-colors py-2 ${
                      activeSection === link.id
                        ? "text-white"
                        : "text-white/40"
                    }`}
                  >
                    {link.labelShort}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
