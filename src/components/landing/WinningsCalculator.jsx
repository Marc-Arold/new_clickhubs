import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Zap,
  Users,
  Coins,
} from "lucide-react";

const ENTRY_OPTIONS = [100, 250, 500, 1000, 2000];
const PLAYER_OPTIONS = [5, 10, 20, 50, 100];
const PLATFORM_CUT = 0.1; // 10%

function useAnimatedNumber(target, duration = 400) {
  const [value, setValue] = useState(target);
  const prev = useRef(target);
  const frame = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const from = prev.current;
    prev.current = target;

    cancelAnimationFrame(frame.current);
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return value;
}

export default function WinningsCalculator() {
  const [entry, setEntry] = useState(500);
  const [players, setPlayers] = useState(20);

  const pot = entry * players;
  const winnings = Math.round(pot * (1 - PLATFORM_CUT));
  const netProfit = winnings - entry;
  const multiplier = (winnings / entry).toFixed(1);

  const aPot = useAnimatedNumber(pot);
  const aWinnings = useAnimatedNumber(winnings);
  const aProfit = useAnimatedNumber(netProfit);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-dark">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <Calculator size={12} className="text-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-wider">
              Benefis Posib
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Kalkile Sa Ou Ka{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold animate-gradient">
              Touche
            </span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            Chanje miz ak kantite jwè pou wè egzakteman konbyen lajan ou ka
            genyen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ── Left: Controls ── */}
          <div className="space-y-6">
            {/* Entry fee selector */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Coins size={13} className="text-gold" />
                </div>
                <p className="text-white font-bold text-sm">Pri pou w antre</p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {ENTRY_OPTIONS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setEntry(v)}
                    className="py-2.5 rounded-xl text-xs font-black transition-all duration-200 relative overflow-hidden"
                    style={
                      entry === v
                        ? {
                            background:
                              "linear-gradient(135deg, #D4A843, #E8C46A)",
                            color: "#1A1A2E",
                            boxShadow: "0 0 16px rgba(212,168,67,0.4)",
                            transform: "scale(1.05)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    {v >= 1000 ? `${v / 1000}k` : v}
                    <span className="block text-[8px] font-medium mt-0.5 opacity-70">
                      HTG
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Player count selector */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users size={13} className="text-purple-400" />
                </div>
                <p className="text-white font-bold text-sm">Kantite jwè</p>
                <span className="ml-auto text-gray-500 text-xs">
                  ou genyen yo tout
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {PLAYER_OPTIONS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setPlayers(v)}
                    className="py-2.5 rounded-xl text-xs font-black transition-all duration-200"
                    style={
                      players === v
                        ? {
                            background:
                              "linear-gradient(135deg, #A855F7, #7C3AED)",
                            color: "#fff",
                            boxShadow: "0 0 16px rgba(168,85,247,0.3)",
                            transform: "scale(1.05)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    {v}
                    <span className="block text-[8px] font-medium mt-0.5 opacity-70">
                      jwè
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Multiplier badge */}
            <div
              className="rounded-2xl p-4 flex items-center gap-4 border"
              style={{
                background: "rgba(212,168,67,0.06)",
                borderColor: "rgba(212,168,67,0.2)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">Retou sou miz ou</p>
                <p className="text-gold font-black text-2xl leading-none">
                  {multiplier}
                  <span className="text-gold/60 text-base ml-1">× retou</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Result Card ── */}
          <div className="relative">
            {/* Border glow */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-gold via-yellow-500/50 to-gold opacity-20 blur-sm animate-gradient" />

            <div className="glass-card rounded-3xl p-6 relative">
              {/* Glow inside */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap size={11} className="text-gold" />
                  Si ou genyen...
                </p>

                {/* Row: mize */}
                <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Miz Ou</span>
                  <span className="text-white font-bold text-sm">
                    {entry.toLocaleString()} HTG
                  </span>
                </div>

                {/* Row: total pot */}
                <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-white font-semibold text-sm" key={aPot}>
                    {aPot.toLocaleString()} HTG
                  </span>
                </div>

                {/* Row: platform cut */}
                <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-gray-500 text-xs">
                    Frè platfòm (10%)
                  </span>
                  <span className="text-gray-500 text-xs">
                    −{(pot * PLATFORM_CUT).toLocaleString()} HTG
                  </span>
                </div>

                {/* Big win amount */}
                <div className="py-5 text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Ou resevwa
                  </p>
                  <p
                    className="font-black leading-none animate-number-pop"
                    key={aWinnings}
                    style={{
                      fontSize: "clamp(2.2rem, 6vw, 3rem)",
                      background:
                        "linear-gradient(135deg, #D4A843, #E8C46A, #D4A843)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                      filter: "drop-shadow(0 0 16px rgba(212,168,67,0.4))",
                    }}
                  >
                    {aWinnings.toLocaleString()}
                    <span
                      style={{
                        fontSize: "1.2rem",
                        WebkitTextFillColor: "rgba(212,168,67,0.6)",
                      }}
                      className="ml-2"
                    >
                      HTG
                    </span>
                  </p>
                </div>

                {/* Net profit */}
                <div
                  className="rounded-xl p-3 flex items-center justify-between mb-5"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <span className="text-success text-sm font-semibold">
                    Benefis
                  </span>
                  <span
                    className="text-success font-black text-lg"
                    key={aProfit}
                  >
                    +{aProfit.toLocaleString()} HTG
                  </span>
                </div>

                <Link
                  to="/enskri"
                  className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-black py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] no-underline relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Kòmanse
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>

                <p className="text-center text-gray-600 text-xs mt-3">
                  Mize reyèl yo ka varye. Chif sa yo se yon estimasyon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
