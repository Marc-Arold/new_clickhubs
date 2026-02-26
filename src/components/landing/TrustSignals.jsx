import { useState, useEffect, useRef } from "react";
import { Shield, Lock, Wallet, CheckCircle, Award } from "lucide-react";

function useCountUp(target, duration = 2500) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const elRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) ref.current = requestAnimationFrame(tick);
          }
          ref.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    if (elRef.current) observer.observe(elRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);

  return { value, elRef };
}

const signals = [
  {
    icon: Wallet,
    title: "Tranzaksyon MonCash",
    desc: "Depo & retrè an sekirite avèk metòd peman lokal ou konnen.",
    gradient: "from-emerald-600 to-emerald-400",
    color: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: Lock,
    title: "Lajan w Sekirize",
    desc: "Lajan w pwoteje nan yon kont jiskaske rezilta jwèt la soti.",
    gradient: "from-blue-600 to-blue-400",
    color: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: Shield,
    title: "Pari Transparan",
    desc: "Ou wè tout moun w ap jwe kont yo epi kantite lajan an dirèk.",
    gradient: "from-purple-600 to-purple-400",
    color: "rgba(168, 85, 247, 0.15)",
  },
];

const trustBadges = [
  { icon: CheckCircle, label: "SSL Encrypted" },
  { icon: Award, label: "Verifed Platform" },
  { icon: Shield, label: "Smart Matchmaking" },
];

export default function TrustSignals() {
  const { value, elRef } = useCountUp(2547300, 2500);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-dark">
      {/* Immersive Stadium Background behind the counter */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-transform duration-1000 scale-100"
        style={{ backgroundImage: "url('/images/p2p_football_haiti.png')" }}
      />
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_60%)] opacity-10 blur-3xl" />

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Counter — focal point */}
        <div className="text-center mb-20 relative">
          <p className="text-white font-black text-sm uppercase tracking-[0.3em] mb-4 drop-shadow-md">
            Lajan Nou Deja Peye
          </p>
          <div ref={elRef} className="relative inline-block">
            {/* Glow behind counter */}
            <div className="absolute inset-0 bg-gold/20 blur-[80px] rounded-full scale-[2] pointer-events-none" />
            <p className="text-6xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] via-[#FACC15] to-[#D4A843] relative drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] leading-none py-2">
              {value.toLocaleString()}
            </p>
            <span className="block text-2xl sm:text-4xl text-gold font-bold mt-2 tracking-wide drop-shadow-lg">
              GOUD RETIRE
            </span>
          </div>
        </div>

        {/* Premium Plaque Trust signal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {signals.map((signal, i) => (
            <div
              key={i}
              className="relative p-[1px] rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              {/* Animated gradient border */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${signal.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative h-full bg-dark/95 backdrop-blur-xl rounded-[23px] p-8 flex flex-col items-center text-center">
                {/* Glow ring around icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: signal.color }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${signal.gradient} opacity-20 rounded-2xl animate-pulse`}
                  />
                  <signal.icon size={28} className="text-white relative z-10" />
                </div>

                <h3 className="text-white font-black text-lg mb-3 tracking-wide">
                  {signal.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                  {signal.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges row */}
        {/* <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-16 pt-10 border-t border-white/5">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-gray-400 text-sm font-semibold tracking-wide"
            >
              <badge.icon size={16} className="text-gold" />
              {badge.label}
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
