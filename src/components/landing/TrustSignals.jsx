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
    title: "Powered by MonCash",
    desc: "Depo & retrè an sekirite avèk metòd peman lokal ou konnen.",
    color: "from-emerald-500/20 to-emerald-700/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Lock,
    title: "Eskrow Sekirize",
    desc: "Lajan w pwoteje nan yon kont eskrow jiskaske rezilta soti.",
    color: "from-blue-500/20 to-blue-700/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Lisansye & Transparan",
    desc: "Tout tranzaksyon verifye epi ouvè pou tout moun wè.",
    color: "from-purple-500/20 to-purple-700/10",
    iconColor: "text-purple-400",
  },
];

const trustBadges = [
  { icon: CheckCircle, label: "SSL Encrypted" },
  { icon: Award, label: "Licensed Platform" },
  { icon: Shield, label: "KYC Verified" },
];

export default function TrustSignals() {
  const { value, elRef } = useCountUp(2547300, 2500);

  return (
    <section className="py-16 sm:py-24 bg-dark-accent/20 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Counter — focal point */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">
            Total Lajan Peye Bay Jwè Yo
          </p>
          <div
            ref={elRef}
            className="relative inline-block"
          >
            {/* Glow behind counter */}
            <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-150 pointer-events-none" />
            <p className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold relative">
              {value.toLocaleString()} HTG
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <p className="text-gray-500 text-xs font-medium">
              aktyalize an tan reyèl
            </p>
          </div>
        </div>

        {/* Trust signal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {signals.map((signal, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 text-center hover:border-gold/20 hover:-translate-y-1 transition-all duration-500 group card-shine"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${signal.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(212,168,67,0.1)] transition-all duration-500`}
              >
                <signal.icon size={24} className={signal.iconColor} />
              </div>
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-gold transition-colors duration-300">
                {signal.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {signal.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges row */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-gray-500 text-xs font-medium"
            >
              <badge.icon size={14} className="text-gold/50" />
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
