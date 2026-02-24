import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Zap, Star, TrendingUp } from "lucide-react";
import PlayerBattleAnimation from "./PlayerBattleAnimation";

function useCountUp(target, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    }
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return value;
}

const stats = [
  {
    target: 2500000,
    label: "HTG Peye",
    icon: TrendingUp,
    format: (v) => (v / 1000000).toFixed(1) + "M+",
  },
  {
    target: 1200,
    label: "Jwè Aktif",
    icon: Users,
    format: (v) => v.toLocaleString() + "+",
  },
  {
    target: 5,
    label: "Min Peman",
    icon: Zap,
    format: (v) => v,
  },
];

function StatItem({ target, label, icon: StatIcon, format }) {
  const value = useCountUp(target, target > 10000 ? 2500 : 1500);
  return (
    <div className="text-center flex flex-col items-center">
      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
        <StatIcon size={14} className="text-gold" />
      </div>
      <p className="text-gold text-xl sm:text-2xl font-black leading-none">
        {format(value)}
      </p>
      <p className="text-gray-500 text-[11px] mt-1.5 uppercase tracking-wider font-medium">
        {label}
      </p>
    </div>
  );
}

/* Floating decorative orbs */
function FloatingOrbs() {
  return (
    <>
      <div className="absolute top-20 right-[15%] w-2 h-2 bg-gold/40 rounded-full animate-float blur-[1px]" />
      <div className="absolute top-40 right-[25%] w-1.5 h-1.5 bg-yellow-300/30 rounded-full animate-float-delayed" />
      <div className="absolute bottom-32 right-[20%] w-3 h-3 bg-gold/20 rounded-full animate-float blur-[2px]" />
      <div className="absolute top-[60%] left-[8%] w-2 h-2 bg-gold/25 rounded-full animate-float-delayed" />
      <div className="absolute top-[30%] left-[5%] w-1 h-1 bg-yellow-200/40 rounded-full animate-float" />
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 min-h-[90vh] flex items-center">
      {/* Multi-layered background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de216?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-gold)_0%,_transparent_50%)] opacity-15" />

      {/* Grid pattern overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,168,67,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Headline + CTAs */}
          <div className="animate-fade-up">
            {/* Badge with shimmer */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-sm mb-6 relative overflow-hidden">
              <Star size={12} className="text-gold fill-gold" />
              <span className="text-gold text-xs font-bold tracking-wider uppercase">
                #1 Platfòm A2A an Ayiti
              </span>
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] mb-6 text-white">
              Jwe kont lòt Amatè.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold animate-gradient">
                Genyen yo epi pran lajan w.
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/enskri"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,168,67,0.3)] hover:shadow-[0_0_50px_rgba(212,168,67,0.5)] transition-all duration-300 hover:scale-[1.03] no-underline relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Kreye Kont Gratis
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                {/* Shine sweep on button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-dark-surface/50 hover:bg-dark-surface backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:border-gold/50 transition-all duration-300 no-underline"
              >
                Wè Jwèt Yo
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 p-6 rounded-2xl glass-card inline-flex flex-wrap items-center gap-8 sm:gap-12">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-8 sm:gap-12"
                >
                  <StatItem {...stat} />
                  {i < stats.length - 1 && (
                    <div className="w-px h-14 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Battle Animation */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {/* Label above card */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                An Dirèk
              </span>
            </div>

            <PlayerBattleAnimation />

            {/* Footnote below */}
            <p className="text-center text-gray-600 text-xs mt-3">
              Animasyon sa montre yon kous cheval. Rezilta yo ka varye.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
