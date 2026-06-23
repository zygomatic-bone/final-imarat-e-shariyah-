import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const rays = [
      { x: 0.15, spd: 0.00025, w: 0.22, ph: 0,   hue: 45,  a: 0.13 },
      { x: 0.35, spd: 0.0003,  w: 0.18, ph: 1.2,  hue: 38,  a: 0.11 },
      { x: 0.55, spd: 0.00022, w: 0.25, ph: 2.4,  hue: 200, a: 0.09 },
      { x: 0.72, spd: 0.00028, w: 0.19, ph: 0.8,  hue: 50,  a: 0.12 },
      { x: 0.88, spd: 0.00032, w: 0.16, ph: 3.1,  hue: 42,  a: 0.10 },
      { x: 0.25, spd: 0.00018, w: 0.14, ph: 1.8,  hue: 52,  a: 0.08 },
      { x: 0.62, spd: 0.00035, w: 0.20, ph: 0.4,  hue: 36,  a: 0.11 },
    ];

    let t = 0;
    let raf: number;

    function draw() {
      const W = canvas!.width, H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      rays.forEach((r) => {
        const px = (r.x + Math.sin(t * r.spd + r.ph) * 0.22) * W;
        const g = ctx.createRadialGradient(px, 0, 0, px, H * 0.75, W * r.w * 1.6);
        const gold = light
          ? `hsla(${r.hue},75%,42%,${r.a * 0.7})`
          : `hsla(${r.hue},85%,58%,${r.a})`;
        const blue = light
          ? `hsla(210,60%,55%,${r.a * 0.3})`
          : `hsla(210,70%,40%,${r.a * 0.4})`;
        g.addColorStop(0, gold);
        g.addColorStop(0.5, blue);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      for (let i = 0; i < 5; i++) {
        const r = rays[i];
        const px = (r.x + Math.sin(t * r.spd * 1.4 + r.ph) * 0.18) * W;
        const lg = ctx.createLinearGradient(px - 1, 0, px + 1, H * 0.85);
        lg.addColorStop(0, light ? "hsla(45,80%,45%,.15)" : "hsla(48,90%,65%,.22)");
        lg.addColorStop(1, "transparent");
        ctx.fillStyle = lg;
        ctx.fillRect(px - 1.5, 0, 3, H * 0.85);
      }

      t += 16;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tickerItems = [
    "Annual Shura Conference 2025 — Registration Now Open",
    "New Fatwa Guidelines on Digital Finance Published",
    "Darul Qaza Q4 2025 Hearing Schedule Released",
    "سالانہ اجلاس شوریٰ ۲۰۲۵ — رجسٹریشن جاری ہے",
    "New Mangaluru Branch Inauguration — October 2025",
  ];
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <div className="hero-badge">Markazi Darul Qaza · Bengaluru</div>
        <div className="hero-urdu">
          اعلیٰ دینی، عدالتی، ادارہ
          <br />
          بنگلور، کرناٹک —
        </div>
        <h1 className="hero-title">Imarat-e-Shariah</h1>
        <p className="hero-subtitle">A Supreme Islamic Judicial Authority</p>
        <div className="hero-btns">
          <button className="btn-primary">Explore Institution →</button>
          <button className="btn-secondary">Latest Updates ↗</button>
        </div>
      </div>

      <div className="hero-ticker">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i}>
              {item}
              <span className="ticker-dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
