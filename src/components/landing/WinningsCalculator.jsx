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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4 backdrop-blur-sm">
            <Calculator size={12} className="text-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-wider">
              Benefis Posib
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 z-10 relative">
            Ou vle konnen konbyen w,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold animate-gradient block sm:inline">
              kapab fè?
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed relative z-10">
            Chwazi konbyen w vle mize epi wè konbyen amatè ou ka genyen.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* ── Left: Controls (5 columns) ── */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            {/* Entry fee selector */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Coins size={16} className="text-gold" />
                </div>
                <p className="text-white font-bold text-sm">
                  Pri pou w antre (HTG)
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {ENTRY_OPTIONS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setEntry(v)}
                    className="py-3 rounded-xl text-xs font-black transition-all duration-200 relative overflow-hidden"
                    style={
                      entry === v
                        ? {
                            background:
                              "linear-gradient(135deg, #D4A843, #E8C46A)",
                            color: "#1A1A2E",
                            boxShadow: "0 4px 15px rgba(212,168,67,0.3)",
                            transform: "scale(1.05)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }
                    }
                  >
                    {v >= 1000 ? `${v / 1000}k` : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Player count selector */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users size={16} className="text-purple-400" />
                </div>
                <p className="text-white font-bold text-sm">
                  Kantite jwè w ap bat
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {PLAYER_OPTIONS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setPlayers(v)}
                    className="py-3 rounded-xl text-xs font-black transition-all duration-200"
                    style={
                      players === v
                        ? {
                            background:
                              "linear-gradient(135deg, #A855F7, #7C3AED)",
                            color: "#fff",
                            boxShadow: "0 4px 15px rgba(168,85,247,0.3)",
                            transform: "scale(1.05)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Multiplier badge */}
            <div
              className="rounded-2xl p-5 flex items-center justify-between border shadow-lg"
              style={{
                background: "rgba(212,168,67,0.05)",
                borderColor: "rgba(212,168,67,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={20} className="text-gold" />
                </div>
                <p className="text-gray-300 font-medium text-sm">
                  Miltiplikatè
                </p>
              </div>
              <p className="text-gold font-black text-3xl leading-none">
                {multiplier}x
              </p>
            </div>
          </div>

          {/* ── Right: Massive Visual Result Card (7 columns) ── */}
          <div className="lg:col-span-7 relative h-[450px] sm:h-full min-h-[450px]">
            {/* Border glow */}
            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-gold/40 via-purple-500/20 to-gold/20 opacity-50 blur-[2px] pointer-events-none" />

            <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
              {/* Background Image of the Winner */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: "url('/images/p2p_mobile_haiti.png')",
                }}
              />

              {/* Gradients to make text readable */}
              <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/40 to-dark/95" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent" />

              {/* Result Content Positioned Over Image */}
              <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between">
                {/* Top Stats */}
                <div className="space-y-4 max-w-[280px]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-gray-300 text-sm font-medium">
                      Miz Ou
                    </span>
                    <span className="text-white font-black text-base">
                      {entry.toLocaleString()} HTG
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-gray-300 text-sm font-medium">
                      Total Miz
                    </span>
                    <span
                      className="text-white font-black text-base"
                      key={aPot}
                    >
                      {aPot.toLocaleString()} HTG
                    </span>
                  </div>
                </div>

                {/* Center Big Win Amount */}
                <div className="mt-auto mb-8 sm:mb-12">
                  <div className="inline-flex items-center gap-2 bg-success/20 border border-success/30 px-3 py-1 rounded-full mb-3 backdrop-blur-md">
                    <Zap size={14} className="text-success" />
                    <span className="text-success font-bold text-xs uppercase tracking-wider drop-shadow-md">
                      Si w bat yo tout
                    </span>
                  </div>
                  <p className="text-gray-200 text-lg font-medium mb-1 drop-shadow-lg">
                    Ou pran:
                  </p>
                  <p
                    className="font-black leading-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                    key={aWinnings}
                    style={{
                      fontSize: "clamp(3.5rem, 8vw, 5rem)",
                      background:
                        "linear-gradient(to bottom right, #FFFFFF, #FACC15, #D4A843)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: "1",
                    }}
                  >
                    {aWinnings.toLocaleString()}
                    <span
                      className="text-3xl sm:text-4xl ml-2 drop-shadow-md"
                      style={{ WebkitTextFillColor: "rgba(255,255,255,0.9)" }}
                    >
                      HTG
                    </span>
                  </p>
                  <p
                    className="text-success font-black text-xl sm:text-2xl mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    key={aProfit}
                  >
                    +{aProfit.toLocaleString()} HTG Pwofi Nèt
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="relative z-20">
                  <Link
                    to="/enskri"
                    className="group/btn inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-black px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-[0_10px_30px_rgba(212,168,67,0.4)] hover:shadow-[0_15px_40px_rgba(212,168,67,0.6)] no-underline"
                  >
                    Kòmanse Jwe Kounye a
                    <ArrowRight
                      size={18}
                      className="group/btn-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
