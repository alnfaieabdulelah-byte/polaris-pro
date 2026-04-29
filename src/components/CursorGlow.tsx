"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Only on desktop
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth lerp
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${currentPos.current.x}px`;
        glowRef.current.style.top = `${currentPos.current.y}px`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow hidden lg:block"
      aria-hidden="true"
    />
  );
}
