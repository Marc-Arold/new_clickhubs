import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Users, Zap } from "lucide-react";

const SLIDES = [
  {
    id: 0,
    image:
      "/images/lotus_winner_hero.png",
    colorOverlay:
      "linear-gradient(108deg, rgba(16,18,27,0.85) 0%, rgba(16,18,27,0.60) 45%, rgba(16,18,27,0.1) 100%)",
    accentColor: "#D4A843",
    accentGlow: "rgba(212,168,67,0.3)",
    badgeText: "👑 PLATFÒM P2P O FOND",
    badgeBg: "#b45309",
    headline: "Jwe kont",
    highlight: "lòt amatè.",
    sub: "Genyen epi pran tout lajan yo. Nou jis la pou fasilite pati yo.",
    odds: null,
    ctaText: "Pran Tout Lajan an",
  },
  {
    id: 1,
    image:
      "/images/p2p_horse_racing.png",
    colorOverlay:
      "linear-gradient(108deg, rgba(69,10,10,0.92) 0%, rgba(69,10,10,0.72) 42%, rgba(69,10,10,0.10) 100%)",
    accentColor: "#EF4444",
    accentGlow: "rgba(239,68,68,0.28)",
    badgeText: "🏇 KOUS CHEVAL — LIVE",
    badgeBg: "#dc2626",
    headline: "Kous Cheval",
    highlight: "An Dirèk!",
    sub: "Chwazi cheval ou epi gade kous la an dirèk. Pèman sou plas ak MonCash.",
    odds: [
      { label: "Rapid Fire #5", value: "3.5x" },
      { label: "Thunder #1", value: "4.2x" },
      { label: "Storm #3", value: "2.8x" },
    ],
    ctaText: "Patisipe",
  },
  {
    id: 2,
    image:
      "/images/p2p_casino_haiti.png",
    colorOverlay:
      "linear-gradient(108deg, rgba(46,16,101,0.92) 0%, rgba(46,16,101,0.72) 42%, rgba(46,16,101,0.10) 100%)",
    accentColor: "#A855F7",
    accentGlow: "rgba(168,85,247,0.28)",
    badgeText: "🃏 KAZINO & JEU KAT",
    badgeBg: "#7c3aed",
    headline: "Domino &",
    highlight: "Jwèt Kat!",
    sub: "Jwèt kat ak domino an tan reyèl kont lòt jwè Ayisyen — domino, albou ak plis jweèt kat!",
    odds: null,
    ctaText: "Jwe Kounye a",
  },
  {
    id: 3,
    image:
      "/images/p2p_mobile_haiti.png",
    colorOverlay:
      "linear-gradient(108deg, rgba(92,55,0,0.92) 0%, rgba(92,55,0,0.72) 42%, rgba(92,55,0,0.10) 100%)",
    accentColor: "#D4A843",
    accentGlow: "rgba(212,168,67,0.35)",
    badgeText: "🎁 OFRI ESPESYAL — 250 HTG",
    badgeBg: "#b45309",
    headline: "Bonus 250 HTG",
    highlight: "Gratis!",
    sub: "Enskri jodi a epi resevwa 250 HTG sou premye depo w. Envite zanmi pou double bonus ou!",
    odds: null,
    ctaText: "Jwenn Bonus Ou",
  },
];

const STATS = [
  { icon: TrendingUp, value: "2.5M+", label: "HTG Peye", color: "#D4A843" },
  { icon: Users, value: "1 200+", label: "Jwè Aktif", color: "#22C55E" },
  { icon: Zap, value: "0 min", label: "Peman Sou Plas", color: "#3B82F6" },
];

export default function PromoSlider() {
  const [current, setCurrent] = useState(0);

  /* Auto-rotate every 8 s */
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <div>
      {/* ── Slider ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(480px, 58vw, 600px)" }}
      >
        {/* All slides stacked; only current one is opaque */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
          >
            {/* Background image — slow zoom on active slide */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
                transform: i === current ? "scale(1.06)" : "scale(1)",
                transition: "transform 7s ease-out",
              }}
            />

            {/* Directional color overlay */}
            <div
              className="absolute inset-0"
              style={{ background: slide.colorOverlay }}
            />

            {/* Bottom-to-dark fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/85" />

            {/* Left-side accent glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 700px 500px at 3% 65%, ${slide.accentGlow} 0%, transparent 65%)`,
              }}
            />

            {/* Slide content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-10 flex flex-col justify-center">
              {/* Live badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-[11px] font-black uppercase tracking-[0.12em] mb-6 self-start"
                style={{
                  background: slide.badgeBg,
                  boxShadow: `0 0 28px ${slide.accentColor}70`,
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {slide.badgeText}
              </div>

              {/* Headline */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.04] mb-4 text-white"
                style={{ textShadow: "0 2px 32px rgba(0,0,0,0.75)" }}
              >
                {slide.headline}{" "}
                <span
                  style={{
                    color: slide.accentColor,
                    textShadow: `0 0 45px ${slide.accentColor}aa`,
                  }}
                >
                  {slide.highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-gray-200/90 text-base sm:text-lg mb-7 max-w-lg leading-relaxed"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.95)" }}
              >
                {slide.sub}
              </p>

              {/* Odds pills */}
              {slide.odds && (
                <div className="flex gap-3 mb-7 flex-wrap">
                  {slide.odds.map((o) => (
                    <div
                      key={o.label}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-md border"
                      style={{
                        background: "rgba(0,0,0,0.45)",
                        borderColor: `${slide.accentColor}45`,
                      }}
                    >
                      <span className="text-gray-300 text-xs font-semibold">{o.label}</span>
                      <span
                        className="font-black text-lg leading-none"
                        style={{
                          color: slide.accentColor,
                          textShadow: `0 0 14px ${slide.accentColor}99`,
                        }}
                      >
                        {o.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA button */}
              <Link
                to="/enskri"
                className="group inline-flex items-center gap-2 no-underline px-8 py-4 rounded-xl font-black text-lg text-dark transition-all duration-300 hover:scale-[1.04] self-start relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}cc)`,
                  boxShadow: `0 0 40px ${slide.accentColor}55, 0 6px 28px rgba(0,0,0,0.4)`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {slide.ctaText}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>
        ))}

        {/* ── Prev / Next arrows ── */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-dark/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-dark/80 hover:border-white/35 transition-all cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-dark/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-dark/80 hover:border-white/35 transition-all cursor-pointer"
        >
          <ChevronRight size={22} />
        </button>

        {/* ── Navigation dots ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300 cursor-pointer border-none p-0"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background:
                  i === current ? SLIDES[current].accentColor : "rgba(255,255,255,0.3)",
                boxShadow:
                  i === current ? `0 0 12px ${SLIDES[current].accentColor}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="border-b border-white/5"
        style={{ background: "rgba(22,33,62,0.97)" }}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-center sm:justify-start gap-8 sm:gap-16 flex-wrap">
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${color}18` }}
              >
                <Icon size={15} style={{ color }} />
              </div>
              <div>
                <p
                  className="font-black text-lg text-white leading-none"
                  style={{ textShadow: `0 0 14px ${color}44` }}
                >
                  {value}
                </p>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider font-medium mt-0.5">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
