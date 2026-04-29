"use client";

import { useEffect, useRef } from "react";

interface PolarisStarProps {
  size?: number;
  color?: string;
  glow?: boolean;
  glowColor?: string;
  animated?: boolean;
  spinning?: boolean;
  className?: string;
}

export default function PolarisStar({
  size = 40,
  color = "#FFFFFF",
  glow = true,
  glowColor,
  animated = true,
  spinning = false,
  className = "",
}: PolarisStarProps) {
  const starRef = useRef<SVGSVGElement>(null);
  const resolvedGlowColor = glowColor || color;

  // 8-point precision north star path
  // Built on a 100x100 grid system with perfect symmetry
  const star8Point = `
    M 50 2
    L 54.5 39.5
    L 86 8
    L 60.5 45.5
    L 98 50
    L 60.5 54.5
    L 86 92
    L 54.5 60.5
    L 50 98
    L 45.5 60.5
    L 14 92
    L 39.5 54.5
    L 2 50
    L 39.5 45.5
    L 14 8
    L 45.5 39.5
    Z
  `;

  return (
    <svg
      ref={starRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated && !spinning ? "polaris-star" : ""} ${spinning ? "polaris-star-spin" : ""} ${className}`}
      style={{
        filter: glow
          ? `drop-shadow(0 0 ${size * 0.1}px ${resolvedGlowColor}) drop-shadow(0 0 ${size * 0.05}px ${resolvedGlowColor})`
          : undefined,
        transformOrigin: "center center",
      }}
      aria-hidden="true"
    >
      {/* Outer glow ring */}
      {glow && (
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={`${resolvedGlowColor}08`}
          className="ambient-glow"
        />
      )}
      {/* Main star shape */}
      <path
        d={star8Point}
        fill={color}
        fillRule="evenodd"
      />
      {/* Inner highlight */}
      <circle
        cx="50"
        cy="50"
        r="4"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
}

// Polaris wordmark logo
export function PolarisLogo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: { star: 16, text: "text-sm tracking-[0.3em]" },
    md: { star: 24, text: "text-lg tracking-[0.35em]" },
    lg: { star: 32, text: "text-2xl tracking-[0.4em]" },
    xl: { star: 48, text: "text-4xl tracking-[0.5em]" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <PolarisStar size={s.star} animated={false} glow={true} />
      <span
        className={`font-black ${s.text} text-white uppercase`}
        style={{
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          letterSpacing: "0.35em",
          fontWeight: 900,
        }}
      >
        POLARIS
      </span>
    </div>
  );
}
