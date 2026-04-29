"use client";

import { useEffect, useRef } from "react";

interface AmbientEnvironmentProps {
  emotionId: string;
  primaryColor: string;
  secondaryColor: string;
  animation: string;
  intensity?: number;
}

export default function AmbientEnvironment({
  emotionId,
  primaryColor,
  secondaryColor,
  animation,
  intensity = 1,
}: AmbientEnvironmentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;

    // Parse hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 255, b: 255 };
    };

    const rgb = hexToRgb(primaryColor);
    const rgb2 = hexToRgb(secondaryColor);

    // Particles for love/particles-float
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
    };

    const particles: Particle[] = [];
    if (animation === "particles-float" || animation === "burst-light") {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.5 + 0.2),
          size: Math.random() * 3 + 1,
          alpha: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 30 - 15,
        });
      }
    }

    // Rain drops for sadness
    type RainDrop = {
      x: number;
      y: number;
      speed: number;
      length: number;
      alpha: number;
    };

    const rainDrops: RainDrop[] = [];
    if (animation === "rain") {
      for (let i = 0; i < 60; i++) {
        rainDrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 4 + 3,
          length: Math.random() * 20 + 10,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      const alpha = 0.4 * intensity;

      switch (animation) {
        case "particles-float": {
          // Warm ambient orb
          const grad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.6
          );
          const pulse = 0.5 + Math.sin(time * 0.5) * 0.15;
          grad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * pulse})`
          );
          grad.addColorStop(
            0.5,
            `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.3 * pulse})`
          );
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Floating particles
          particles.forEach((p) => {
            p.x += p.vx + Math.sin(time + p.hue) * 0.3;
            p.y += p.vy;
            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
            const pGrad = ctx.createRadialGradient(
              p.x,
              p.y,
              0,
              p.x,
              p.y,
              p.size * 4
            );
            pGrad.addColorStop(
              0,
              `rgba(${rgb.r},${rgb.g},${rgb.b},${p.alpha})`
            );
            pGrad.addColorStop(1, "transparent");
            ctx.fillStyle = pGrad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            ctx.fill();
          });
          break;
        }

        case "rain": {
          // Blue ambient base
          const rainGrad = ctx.createRadialGradient(
            width * 0.3,
            height * 0.3,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.8
          );
          rainGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.6})`
          );
          rainGrad.addColorStop(1, "transparent");
          ctx.fillStyle = rainGrad;
          ctx.fillRect(0, 0, width, height);

          // Rain drops
          rainDrops.forEach((drop) => {
            drop.y += drop.speed;
            if (drop.y > height + drop.length) {
              drop.y = -drop.length;
              drop.x = Math.random() * width;
            }
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${drop.alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x - 1, drop.y + drop.length);
            ctx.stroke();
          });
          break;
        }

        case "pulse-sharp": {
          // Red sharp pulsing
          const pulseSpeed = 0.8;
          const pulseIntensity = 0.5 + Math.abs(Math.sin(time * pulseSpeed)) * 0.5;
          const sharpGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.7
          );
          sharpGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * pulseIntensity * 0.8})`
          );
          sharpGrad.addColorStop(
            0.3,
            `rgba(${rgb.r},${rgb.g * 0.3},${rgb.b * 0.2},${alpha * pulseIntensity * 0.4})`
          );
          sharpGrad.addColorStop(1, "transparent");
          ctx.fillStyle = sharpGrad;
          ctx.fillRect(0, 0, width, height);

          // Sharp flicker lines
          if (Math.sin(time * 10) > 0.7) {
            const x = Math.random() * width;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb2.r},${rgb2.g},${rgb2.b},0.1)`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(x, 0);
            ctx.lineTo(x + 20, height);
            ctx.stroke();
          }
          break;
        }

        case "burst-light": {
          // Happy yellow burst
          const burstPulse = 0.6 + Math.sin(time * 0.8) * 0.3;
          const burstGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.4,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.7
          );
          burstGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * burstPulse})`
          );
          burstGrad.addColorStop(
            0.6,
            `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.2})`
          );
          burstGrad.addColorStop(1, "transparent");
          ctx.fillStyle = burstGrad;
          ctx.fillRect(0, 0, width, height);

          // Sparkling particles
          particles.forEach((p) => {
            p.x += p.vx + Math.sin(time * 2 + p.hue) * 0.5;
            p.y += Math.sin(time + p.hue) * 0.3 - 0.2;
            if (p.y < -10) p.y = height;
            const twinkle = 0.4 + Math.abs(Math.sin(time * 3 + p.hue)) * 0.6;
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.alpha * twinkle})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          break;
        }

        case "energy-surge": {
          // Orange motivation surge
          const surge = 0.5 + Math.sin(time * 1.5) * 0.4;
          const surgeGrad = ctx.createLinearGradient(0, height, 0, 0);
          surgeGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * surge})`);
          surgeGrad.addColorStop(0.5, `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.3})`);
          surgeGrad.addColorStop(1, "transparent");
          ctx.fillStyle = surgeGrad;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case "breathe": {
          // Calm breathing green
          const breathScale = 1 + Math.sin(time * 0.4) * 0.15;
          const breathGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.5 * breathScale
          );
          breathGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.7 * breathScale})`
          );
          breathGrad.addColorStop(
            0.5,
            `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.2})`
          );
          breathGrad.addColorStop(1, "transparent");
          ctx.fillStyle = breathGrad;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case "crown-glow": {
          // Purple confidence glow
          const glowPulse = 0.5 + Math.sin(time * 0.7) * 0.3;
          const crownGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.3,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.7
          );
          crownGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * glowPulse})`
          );
          crownGrad.addColorStop(
            0.6,
            `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.2})`
          );
          crownGrad.addColorStop(1, "transparent");
          ctx.fillStyle = crownGrad;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case "void-pulse": {
          // Lonely void
          const voidPulse = 0.3 + Math.sin(time * 0.3) * 0.2;
          const voidGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            width * 0.1 * (1 + Math.sin(time * 0.3) * 0.1),
            width * 0.5,
            height * 0.5,
            width * 0.6
          );
          voidGrad.addColorStop(0, "transparent");
          voidGrad.addColorStop(
            0.3,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * voidPulse})`
          );
          voidGrad.addColorStop(1, "transparent");
          ctx.fillStyle = voidGrad;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case "sepia-drift": {
          // Nostalgic warm drift
          const drift = Math.sin(time * 0.3) * 0.1;
          const sepiaGrad = ctx.createRadialGradient(
            width * (0.4 + drift),
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.7
          );
          sepiaGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.6})`
          );
          sepiaGrad.addColorStop(
            0.5,
            `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.3})`
          );
          sepiaGrad.addColorStop(1, "transparent");
          ctx.fillStyle = sepiaGrad;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case "shatter": {
          // Heartbreak shatter
          const shatterPulse = 0.4 + Math.abs(Math.sin(time * 0.6)) * 0.4;
          const shatterGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.4,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.65
          );
          shatterGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * shatterPulse})`
          );
          shatterGrad.addColorStop(
            0.4,
            `rgba(${rgb2.r},${rgb2.g},${rgb2.b},${alpha * 0.25})`
          );
          shatterGrad.addColorStop(1, "transparent");
          ctx.fillStyle = shatterGrad;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        default: {
          // Generic ambient
          const defaultGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.6
          );
          defaultGrad.addColorStop(
            0,
            `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.5})`
          );
          defaultGrad.addColorStop(1, "transparent");
          ctx.fillStyle = defaultGrad;
          ctx.fillRect(0, 0, width, height);
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [emotionId, primaryColor, secondaryColor, animation, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
