"use client";

import { useEffect, useRef } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";

interface RibbonLayer {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  speed: number;
  amplitude: number;
  phase: number;
  opacity: number;
  depth: number;
  blur: number;
}

const LIGHT_COLORS = [
  "rgba(212, 175, 55, OPACITY)",
  "rgba(247, 231, 206, OPACITY)",
  "rgba(183, 110, 121, OPACITY)",
  "rgba(232, 218, 239, OPACITY)",
  "rgba(162, 155, 254, OPACITY)",
  "rgba(135, 206, 235, OPACITY)",
  "rgba(165, 243, 252, OPACITY)",
  "rgba(178, 242, 187, OPACITY)",
  "rgba(64, 224, 208, OPACITY)",
  "rgba(46, 204, 113, OPACITY)",
  "rgba(255, 218, 185, OPACITY)",
  "rgba(255, 253, 208, OPACITY)",
  "rgba(253, 203, 110, OPACITY)",
  "rgba(144, 238, 144, OPACITY)",
  "rgba(224, 255, 255, OPACITY)",
  "rgba(255, 216, 168, OPACITY)",
  "rgba(129, 140, 248, OPACITY)",
  "rgba(251, 207, 232, OPACITY)",
  "rgba(167, 243, 208, OPACITY)",
  "rgba(253, 186, 116, OPACITY)",
  "rgba(147, 197, 253, OPACITY)",
  "rgba(196, 181, 253, OPACITY)",
  "rgba(254, 202, 202, OPACITY)",
];

const DARK_COLORS = [
  "rgba(9, 132, 227, OPACITY)",
  "rgba(108, 92, 231, OPACITY)",
  "rgba(46, 204, 113, OPACITY)",
  "rgba(0, 206, 201, OPACITY)",
  "rgba(232, 67, 147, OPACITY)",
  "rgba(212, 175, 55, OPACITY)",
];

export default function AuroraRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark, mounted } = useThemeMode();
  const animRef = useRef<number>(0);
  const ribbonsRef = useRef<RibbonLayer[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Create multiple layers with different depths
    const layers = [
      { count: 4, depth: 0.3, speedMult: 0.4, opacityMult: 0.6, widthMult: 1.8 },
      { count: 4, depth: 0.6, speedMult: 0.7, opacityMult: 0.8, widthMult: 1.2 },
      { count: 4, depth: 1.0, speedMult: 1.0, opacityMult: 1.0, widthMult: 0.8 },
    ];

    ribbonsRef.current = [];
    let colorIndex = 0;

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 60;
        for (let j = 0; j <= segments; j++) {
          points.push({ x: (j / segments) * w, y: h / 2 });
        }

        const baseWidth = isDark ? 100 : 80;
        const baseOpacity = isDark ? 0.12 : 0.06;

        ribbonsRef.current.push({
          points,
          color: colors[colorIndex % colors.length],
          width: baseWidth * layer.widthMult + Math.random() * 40,
          speed: (0.15 + Math.random() * 0.2) * layer.speedMult,
          amplitude: (60 + Math.random() * 100) * layer.depth,
          phase: Math.random() * Math.PI * 2,
          opacity: baseOpacity * layer.opacityMult,
          depth: layer.depth,
          blur: isDark ? 30 + layer.depth * 40 : 20 + layer.depth * 25,
        });
        colorIndex++;
      }
    });

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 0.004; // Slower movement
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Use additive blending for realistic aurora effect
      ctx.globalCompositeOperation = isDark ? "lighter" : "screen";

      // Sort by depth for proper layering
      const sortedRibbons = [...ribbonsRef.current].sort((a, b) => a.depth - b.depth);

      for (const ribbon of sortedRibbons) {
        const segments = ribbon.points.length;

        // Multi-frequency wave motion for organic feel
        for (let i = 0; i < segments; i++) {
          const progress = i / segments;
          
          // Base curved position
          const baseY = h * 0.25 + (h * 0.5) * Math.sin(progress * Math.PI);
          
          // Primary wave
          const wave1 = Math.sin(t * ribbon.speed + progress * 8 + ribbon.phase) * ribbon.amplitude;
          
          // Secondary wave for complexity
          const wave2 = Math.sin(t * ribbon.speed * 1.5 + progress * 12 + ribbon.phase * 2) * (ribbon.amplitude * 0.3);
          
          // Tertiary wave for subtle detail
          const wave3 = Math.cos(t * ribbon.speed * 0.5 + progress * 5) * (ribbon.amplitude * 0.2);
          
          // Horizontal drift
          const drift = Math.sin(t * 0.1 + progress * 3 + ribbon.phase) * 20;

          ribbon.points[i].x = progress * w + drift;
          ribbon.points[i].y = baseY + wave1 + wave2 + wave3;
        }

        const colorWithOpacity = ribbon.color.replace("OPACITY", String(ribbon.opacity));
        const glowColor = ribbon.color.replace("OPACITY", String(ribbon.opacity * 0.8));

        // Draw glow layer (softer, wider)
        ctx.beginPath();
        ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y);

        for (let i = 1; i < segments - 2; i++) {
          const xc = (ribbon.points[i].x + ribbon.points[i + 1].x) / 2;
          const yc = (ribbon.points[i].y + ribbon.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(ribbon.points[i].x, ribbon.points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
          ribbon.points[segments - 2].x,
          ribbon.points[segments - 2].y,
          ribbon.points[segments - 1].x,
          ribbon.points[segments - 1].y
        );

        // Outer glow
        ctx.strokeStyle = colorWithOpacity;
        ctx.lineWidth = ribbon.width * 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = ribbon.blur * 2;
        ctx.shadowColor = glowColor;
        ctx.stroke();

        // Inner core (brighter, narrower)
        ctx.beginPath();
        ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y);

        for (let i = 1; i < segments - 2; i++) {
          const xc = (ribbon.points[i].x + ribbon.points[i + 1].x) / 2;
          const yc = (ribbon.points[i].y + ribbon.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(ribbon.points[i].x, ribbon.points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
          ribbon.points[segments - 2].x,
          ribbon.points[segments - 2].y,
          ribbon.points[segments - 1].x,
          ribbon.points[segments - 1].y
        );

        ctx.strokeStyle = ribbon.color.replace("OPACITY", String(ribbon.opacity * 1.3));
        ctx.lineWidth = ribbon.width * 0.4;
        ctx.shadowBlur = ribbon.blur * 0.5;
        ctx.shadowColor = ribbon.color.replace("OPACITY", String(ribbon.opacity * 1.5));
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      ctx.globalCompositeOperation = "source-over";

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark, mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
