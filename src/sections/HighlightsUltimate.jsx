// src/components/HighlightsUltimate.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline"; // Vite + React: fine to import normally
// If you prefer dynamic import, you can lazy-load Spline with React.lazy

gsap.registerPlugin(ScrollTrigger);

// small throttle util
function throttle(fn, wait = 16) {
  let t = null;
  return function (...args) {
    if (!t) {
      t = setTimeout(() => {
        fn.apply(this, args);
        t = null;
      }, wait);
    }
  };
}

// 3D tilt (lighter version)
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = throttle((e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 10;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    }, 12);

    const onLeave = () => {
      el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}

// Particle canvas hook
function useParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = innerWidth);
    let h = (canvas.height = innerHeight);
    let raf = null;

    // particle data
    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      alpha: 0.2 + Math.random() * 0.5,
    }));

    const handleResize = () => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let mouse = { x: w / 2, y: h / 2 };
    const onMove = throttle((e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, 12);
    window.addEventListener("mousemove", onMove);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // subtle background gradient for depth
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(10,12,25,0.0)");
      grad.addColorStop(1, "rgba(9,14,28,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let p of particles) {
        // slight attraction to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 20);
        p.vx += (dx / dist) * 0.0008;
        p.vy += (dy / dist) * 0.0008;

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return canvasRef;
}

// marquee builder to duplicate list for seamless scroll
function MarqueeRow({ children, reverse = false, duration = 20 }) {
  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`} style={{ overflow: "hidden" }}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          // duplicate track width by repeating the children twice
        }}
      >
        <div style={{ display: "inline-flex", gap: "1.25rem" }}>{children}</div>
        <div style={{ display: "inline-flex", gap: "1.25rem" }}>{children}</div>
      </div>
    </div>
  );
}

export default function HighlightsUltimate() {
  const metrics = useMemo(
    () => [
      { title: "600+", subtitle: "LeetCode Problems Solved" },
      { title: "20+", subtitle: "Full-Stack Projects Completed" },
      { title: "5", subtitle: "Hackathons Participated" },
      { title: "10,000+", subtitle: "Lines of TypeScript Written" },
      { title: "Top 20%", subtitle: "Global LeetCode Ranking" },
      { title: "AIR 178", subtitle: "Naukri CodeQuest Rank" },
    ],
    []
  );

  const highlights = useMemo(
    () => [
      {
        title: "Dwello",
        desc: "Cloud-Native Rental Platform (AWS, Prisma, PostGIS, Amplify)",
      },
      {
        title: "Sapienly",
        desc: "Ed-Tech LMS with Stripe, Redis, JWT, VdoCipher DRM",
      },
      {
        title: "PriceWise Tracker",
        desc: "BrightData Scraper + Automated Email Alerts",
      },
      {
        title: "GSAP Admin Dashboard",
        desc: "Interactive Animated Dashboard with Motion UI",
      },
    ],
    []
  );

  const achievements = useMemo(
    () => [
      { title: "AIR 178 – CodeQuest", desc: "Ranked nationally in Naukri’s contest." },
      { title: "Flipkart GRiD 7.0", desc: "Qualified Round 1 among 150,000+ engineers." },
      { title: "e-Yantra 2023", desc: "Qualified Stage 1 in IIT Bombay’s robotics competition." },
      { title: "Leadership Roles", desc: "PR Lead for Culrav & Avishkar 2024." },
    ],
    []
  );

  // refs for tilt
  const refs = useRef([]);
  refs.current = [];

  const addRef = (r) => r && refs.current.push(r);

  // register tilt for each card
  useEffect(() => {
    refs.current.forEach((r) => {
      if (!r) return;
      // reuse useTilt logic inline for easier cleanup
      const el = r;
      const onMove = throttle((e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 10;
        const rotateX = (0.5 - py) * 10;
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      }, 12);
      const onLeave = () => {
        el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      // cleanup
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  // GSAP scroll reveal + parallax for section headings
  useEffect(() => {
    const sections = document.querySelectorAll(".hl-card");
    gsap.from(sections, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".highlights-root",
        start: "top 80%",
        end: "bottom 10%",
        scrub: false,
      },
    });

    // small parallax on background spline container
    const bg = document.querySelector(".spline-bg");
    if (bg) {
      gsap.to(bg, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".highlights-root",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // particle canvas
  const particlesRef = useParticles();

  return (
    <section className="highlights-root relative c-space py-20">
      {/* Particle Canvas */}
      <canvas ref={particlesRef} className="particles-canvas" />

      {/* Spline Background Scene behind cards */}
      <div
        className="spline-bg pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{ filter: "blur(18px) saturate(1.05)", transform: "translateZ(-1px)" }}
      >
        {/* put a minimal Spline scene URL or your spline scene file here */}
        <Spline scene="https://prod.spline.design/XXXXXXX/scene.splinecode" />
        {/* Replace the above URL with your Spline scene URL */}
      </div>

      {/* Section Title with shimmer */}
      <h2 className="text-heading text-3xl md:text-4xl font-bold shimmer-title">
        A Quick Snapshot of My Journey
      </h2>

      {/* Metrics Grid */}
      <div className="grid w-full grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            className="hl-card neon-border"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <div
              ref={addRef}
              className="neon-card-content p-6 rounded-2xl card-glow"
              style={{ minHeight: 120 }}
            >
              <h3 className="text-4xl font-bold text-white">{m.title}</h3>
              <p className="mt-2 text-neutral-400">{m.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Highlights as auto-scrolling marquee */}
      <h2 className="mt-14 text-heading text-2xl md:text-3xl font-semibold shimmer-title">
        GitHub Highlights
      </h2>

      <div className="mt-6">
        <MarqueeRow duration={22}>
          {highlights.map((h, idx) => (
            <div
              key={idx}
              className="inline-block p-4 rounded-xl neon-border neon-card-content"
              style={{ minWidth: 300 }}
            >
              <h4 className="text-xl font-semibold text-white">{h.title}</h4>
              <p className="text-neutral-400 mt-1">{h.desc}</p>
            </div>
          ))}
        </MarqueeRow>

        <div className="mt-4">
          <MarqueeRow reverse duration={28}>
            {highlights.map((h, idx) => (
              <div
                key={idx}
                className="inline-block p-4 rounded-xl neon-border neon-card-content"
                style={{ minWidth: 300 }}
              >
                <h4 className="text-xl font-semibold text-white">{h.title}</h4>
                <p className="text-neutral-400 mt-1">{h.desc}</p>
              </div>
            ))}
          </MarqueeRow>
        </div>
      </div>

      {/* Achievements */}
      <h2 className="mt-16 text-heading text-2xl md:text-3xl font-semibold shimmer-title">
        Achievements & Milestones
      </h2>

      <div className="grid w-full grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            className="hl-card neon-border"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <div ref={addRef} className="neon-card-content p-6 rounded-2xl card-glow">
              <h3 className="text-xl font-semibold text-white">{a.title}</h3>
              <p className="mt-2 text-neutral-400">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
