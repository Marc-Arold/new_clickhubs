import { useState, useEffect, useRef, useCallback } from "react";
import { Crown, Trophy, Zap, Coins } from "lucide-react";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const ENTRY_FEE = 500;
const PLATFORM_FEE = 0.1;

const ALL_PLAYERS = [
  {
    id: 1,
    name: "MaxK",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.18)",
    isYou: false,
  },
  {
    id: 2,
    name: "MarieJ",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.18)",
    isYou: false,
  },
  {
    id: 3,
    name: "RolandP",
    color: "#10B981",
    bg: "rgba(16,185,129,0.18)",
    isYou: false,
  },
  {
    id: 4,
    name: "Anna",
    color: "#F43F5E",
    bg: "rgba(244,63,94,0.18)",
    isYou: false,
  },
  {
    id: 5,
    name: "OU",
    color: "#D4A843",
    bg: "rgba(212,168,67,0.28)",
    isYou: true,
  },
  {
    id: 6,
    name: "KingsT",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.18)",
    isYou: false,
  },
  {
    id: 7,
    name: "SophieM",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.18)",
    isYou: false,
  },
  {
    id: 8,
    name: "CharlieB",
    color: "#F97316",
    bg: "rgba(249,115,22,0.18)",
    isYou: false,
  },
];

const TOTAL_POT = ALL_PLAYERS.length * ENTRY_FEE; // 4 000 HTG
const YOUR_PRIZE = Math.round(TOTAL_POT * (1 - PLATFORM_FEE)); // 3 600 HTG
const OPPONENTS = ALL_PLAYERS.filter((p) => !p.isYou);

/*
  Elimination offsets from battleStart (ms).
*/
const ELIM_OFFSETS = [480, 1020, 1600, 2080, 2700, 3350, 4000];

const PHASE_DURATION = {
  INTRO: 2600,
  BATTLE: ELIM_OFFSETS[ELIM_OFFSETS.length - 1] + 500, // 4 500 ms
  WINNER: 3400,
  RESET: 900,
};

/* ─────────────────────────────────────────────
   PLAYER TOKEN (SEATED AT TABLE)
───────────────────────────────────────────── */
function PlayerToken({
  player,
  visible,
  eliminated,
  isWinnerPhase,
  isShaking,
  isSurviving,
}) {
  const isWinner = player.isYou && isWinnerPhase;

  /* Build dynamic class list */
  const cls = [
    "relative w-14 h-14 rounded-full flex items-center justify-center font-black select-none z-10",
    "transition-all duration-300",
    visible && !eliminated && !isShaking && !isSurviving && !isWinner
      ? "animate-battle-enter"
      : "",
    isShaking ? "animate-shake" : "",
    isSurviving
      ? "animate-survive scale-110 shadow-[0_0_20px_rgba(212,168,67,0.4)]"
      : "",
    isWinner
      ? "animate-winner-glow scale-125 z-50 shadow-[0_0_40px_rgba(212,168,67,0.8)]"
      : "",
    eliminated ? "scale-90 opacity-20 filter grayscale" : "shadow-lg",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="relative flex flex-col items-center gap-1.5"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Laser line from eliminated player to pot (simulated) */}
      {eliminated && !isWinnerPhase && (
        <div
          className="absolute top-1/2 left-1/2 w-[1px] bg-red-500/50 h-[100px] origin-top -mt-7 -ml-[0.5px] pointer-events-none"
          style={{
            transform: `rotate(${Math.atan2(150 - 0, 150 - 0)}rad)` /* Simplified aiming to center */,
            opacity: 0,
            animation: "fade-out-laser 0.6s ease-out",
          }}
        />
      )}

      {/* Token circle */}
      <div
        className={cls}
        style={{
          background: player.bg,
          border: `2px solid ${player.color}`,
          color: player.color,
          fontSize: player.isYou ? "12px" : "11px",
          animationDelay:
            visible && !eliminated && !isShaking && !isSurviving && !isWinner
              ? `${player.id * 0.26}s`
              : undefined,
          backgroundSize: "cover",
          backgroundImage: player.isYou
            ? "linear-gradient(135deg, rgba(212,168,67,0.4), rgba(16,18,27,0.8))"
            : "none",
        }}
      >
        {/* Crown for YOU */}
        {player.isYou && (
          <Crown
            size={12}
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            style={{ color: "#D4A843", fill: "#D4A843" }}
          />
        )}

        {player.isYou ? (
          <span
            className="font-black tracking-tight"
            style={{ color: "#D4A843" }}
          >
            OU
          </span>
        ) : (
          <span>{player.name.slice(0, 3)}</span>
        )}

        {/* Eliminated X overlay */}
        {eliminated && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-dark/80 backdrop-blur-sm">
            <span className="text-danger font-black text-xl leading-none">
              ✕
            </span>
          </div>
        )}
      </div>

      {/* Name label */}
      <span
        className="text-[10px] font-semibold truncate max-w-[60px] text-center leading-none px-2 py-0.5 rounded-sm bg-dark/60 backdrop-blur-sm"
        style={{
          color: player.isYou ? "#D4A843" : "rgba(255,255,255,0.6)",
          fontWeight: player.isYou ? 900 : 600,
          border: player.isYou ? "1px solid rgba(212,168,67,0.3)" : "none",
        }}
      >
        {player.isYou ? "OU" : player.name}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ELIMINATION TOAST
───────────────────────────────────────────── */
function EliminationToast({ name }) {
  return (
    <div
      className="absolute top-4 right-4 bg-danger/20 backdrop-blur-md border border-danger/50 rounded-lg px-4 py-2 flex items-center gap-2 z-40 pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.4)]"
      style={{
        animation:
          "toast-in-out 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
      }}
    >
      <span className="text-danger text-sm font-black">✕</span>
      <span className="text-white text-xs font-bold">{name} kraze!</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PlayerBattleAnimation() {
  const [phase, setPhase] = useState("INTRO");
  const [visibleCount, setVisible] = useState(0);
  const [eliminated, setElim] = useState(new Set());
  const [prizeDisplay, setPrize] = useState(0);
  const [lastElim, setLastElim] = useState(null);
  const [shakingId, setShaking] = useState(null);
  const [arenaFlash, setFlash] = useState(false);
  const [mountKey, setMountKey] = useState(0);

  /* 3D tilt state */
  const containerRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const innerRef = useRef(null);

  const handleTiltMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !innerRef.current) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    tiltRef.current = { x, y };
    innerRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  const handleTiltLeave = useCallback(() => {
    if (!innerRef.current) return;
    innerRef.current.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  }, []);

  const timers = useRef([]);
  const clear = () => timers.current.forEach(clearTimeout);

  const addTimer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const runCycle = useCallback(() => {
    clear();
    setPhase("INTRO");
    setVisible(0);
    setElim(new Set());
    setPrize(0);
    setLastElim(null);
    setShaking(null);
    setFlash(false);

    /* ── INTRO: reveal players 1-by-1 + animate prize pool ── */
    ALL_PLAYERS.forEach((_, i) => {
      addTimer(() => setVisible(i + 1), i * 280);
    });
    const steps = 20;
    for (let s = 1; s <= steps; s++) {
      addTimer(
        () => setPrize(Math.round((TOTAL_POT / steps) * s)),
        500 + s * 95,
      );
    }

    /* ── BATTLE: eliminate with pre-shake ── */
    const battleStart = PHASE_DURATION.INTRO;
    addTimer(() => setPhase("BATTLE"), battleStart);

    const elimOrder = [...OPPONENTS].sort(() => Math.random() - 0.5);
    elimOrder.forEach((opp, i) => {
      const offset = ELIM_OFFSETS[i];

      /* Pre-shake 380ms before elimination */
      addTimer(
        () => {
          setShaking(opp.id);
          addTimer(() => setShaking(null), 420);
        },
        battleStart + offset - 380,
      );

      /* Elimination event */
      addTimer(() => {
        setElim((prev) => new Set([...prev, opp.id]));
        setLastElim(opp.name);
        setFlash(true);
        addTimer(() => setFlash(false), 580);
        addTimer(() => setLastElim(null), 1200);
      }, battleStart + offset);
    });

    /* ── WINNER "SWEEP" PHASE ── */
    const winnerStart = battleStart + PHASE_DURATION.BATTLE;
    addTimer(() => {
      setPhase("WINNER");
      setFlash(false);
    }, winnerStart);

    /* Animate prize counter up to winner amount */
    addTimer(() => {
      const steps2 = 18;
      for (let s = 1; s <= steps2; s++) {
        addTimer(() => setPrize(Math.round((YOUR_PRIZE / steps2) * s)), s * 55);
      }
    }, winnerStart + 180);

    /* ── RESET ── */
    const resetStart = winnerStart + PHASE_DURATION.WINNER;
    addTimer(() => setPhase("RESET"), resetStart);
    addTimer(
      () => setMountKey((k) => k + 1),
      resetStart + PHASE_DURATION.RESET,
    );
  }, [addTimer]);

  useEffect(() => {
    timers.current = [];
    runCycle();
    return clear;
  }, [mountKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const remainingCount = OPPONENTS.length - eliminated.size;
  const isWinnerPhase = phase === "WINNER";
  const isBattlePhase = phase === "BATTLE";

  /* Dynamic card shadow for impact */
  const cardShadow = arenaFlash
    ? "0 0 40px rgba(239,68,68,0.2)"
    : isWinnerPhase
      ? "0 0 60px rgba(212,168,67,0.4)"
      : "none";

  return (
    <div
      ref={containerRef}
      className="relative group"
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
      style={{ perspective: "1000px" }}
    >
      <style>{`
        @keyframes pot-sweep {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          40% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; filter: drop-shadow(0 0 30px #D4A843); }
          100% { transform: translate(-50%, 150px) scale(0.5); opacity: 0; filter: drop-shadow(0 0 50px #D4A843); }
        }
        .animate-pot-sweep {
          animation: pot-sweep 1s cubic-bezier(0.5, 0, 0.2, 1) forwards;
        }
        @keyframes fade-out-laser {
          0% { opacity: 1; box-shadow: 0 0 10px #ef4444; }
          100% { opacity: 0; box-shadow: 0 0 0px transparent; }
        }
      `}</style>

      {/* Animated gradient border glow */}
      <div
        className={`absolute -inset-[2px] rounded-3xl blur-[14px] transition-all duration-700 ${
          isWinnerPhase
            ? "opacity-100 bg-gradient-to-r from-gold via-yellow-200 to-gold shadow-[0_0_50px_rgba(212,168,67,0.6)]"
            : "opacity-40 bg-gradient-to-r from-gold via-[#10121b] to-gold group-hover:opacity-70"
        }`}
      />

      <div
        ref={innerRef}
        className="glass-card rounded-3xl relative overflow-hidden card-shine border border-white/10"
        style={{
          minHeight: "460px",
          boxShadow: cardShadow,
          transition: "transform 0.1s ease-out, box-shadow 0.4s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* HYPER PREMIUM LOTUS TABLE BACKGROUND */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-out ${isWinnerPhase ? "scale-110 brightness-110 filter contrast-125" : "scale-100 opacity-60"}`}
          style={{ backgroundImage: "url('/images/lotus_casino_table.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/40 to-dark/90 mix-blend-multiply" />

        {/* Arena Edge Glow */}
        <div
          className={`absolute inset-0 border-2 rounded-3xl transition-colors duration-500 pointer-events-none ${isWinnerPhase ? "border-gold/30" : "border-white/5"}`}
        />

        {/* ── Header ── */}
        <div className="flex items-center justify-between p-5 relative z-20 bg-gradient-to-b from-dark/80 to-transparent">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 shadow-lg ${
                isWinnerPhase
                  ? "bg-gold/20 border-gold/50 shadow-[0_0_15px_rgba(212,168,67,0.3)]"
                  : "bg-dark-surface/80 border-white/10"
              }`}
            >
              <Coins size={18} className="text-gold" />
            </div>
            <div>
              <p className="text-white font-black text-base shadow-sm">
                High-Stakes A2A
              </p>
              <p className="text-gold/80 text-[11px] font-bold uppercase tracking-wider mt-0.5">
                Ganyan an pran tout miz la!
              </p>
            </div>
          </div>

          {/* Phase badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all duration-500 shadow-xl backdrop-blur-md ${
              isWinnerPhase
                ? "bg-gold/20 border-gold/50 text-gold"
                : isBattlePhase
                  ? "bg-danger/20 border-danger/50 text-danger"
                  : "bg-success/20 border-success/50 text-success"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{
                background: "currentColor",
                animation: "pulse 1s ease infinite",
                boxShadow: `0 0 8px currentColor`,
              }}
            />
            {isWinnerPhase ? "VIKTWA!" : isBattlePhase ? "BATAY" : "ANTRE"}
          </div>
        </div>

        {/* ── THE TABLE ARENA ── */}
        <div className="relative z-10 h-[300px] w-full flex items-center justify-center">
          {/* Elimination toast */}
          {lastElim && <EliminationToast key={lastElim} name={lastElim} />}

          {/* THE CENTER POT */}
          <div
            className={`absolute top-1/2 left-1/2 z-20 flex flex-col items-center justify-center transition-all duration-300 ${isWinnerPhase ? "animate-pot-sweep" : "-translate-x-1/2 -translate-y-1/2"}`}
          >
            <div
              className={`p-4 rounded-full border-[3px] backdrop-blur-md transition-all duration-300 ${isWinnerPhase ? "bg-gold/20 border-gold shadow-[0_0_60px_rgba(212,168,67,0.8)] scale-110" : "bg-dark/80 border-gold/40 shadow-[0_0_30px_rgba(212,168,67,0.2)]"}`}
            >
              <p className="text-gray-400 text-[9px] uppercase font-black tracking-widest mb-1 text-center">
                Miz Total
              </p>
              <span
                className="font-black text-3xl leading-none animate-number-pop text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-gold"
                key={prizeDisplay}
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
              >
                {prizeDisplay.toLocaleString()}
              </span>
              <p className="text-gold/60 text-xs font-bold text-center mt-0.5">
                HTG
              </p>
            </div>
          </div>

          {/* Players arranged in an oval around the table */}
          {/* Top Row */}
          <div className="absolute top-[20px] w-full flex justify-around px-12">
            <PlayerToken
              player={ALL_PLAYERS[1]}
              visible={visibleCount >= 2}
              eliminated={eliminated.has(ALL_PLAYERS[1].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[1].id}
            />
            <PlayerToken
              player={ALL_PLAYERS[2]}
              visible={visibleCount >= 3}
              eliminated={eliminated.has(ALL_PLAYERS[2].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[2].id}
            />
            <PlayerToken
              player={ALL_PLAYERS[3]}
              visible={visibleCount >= 4}
              eliminated={eliminated.has(ALL_PLAYERS[3].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[3].id}
            />
          </div>

          {/* Middle Row (Sides) */}
          <div className="absolute top-[130px] w-full flex justify-between px-6">
            <PlayerToken
              player={ALL_PLAYERS[0]}
              visible={visibleCount >= 1}
              eliminated={eliminated.has(ALL_PLAYERS[0].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[0].id}
            />
            <PlayerToken
              player={ALL_PLAYERS[5]}
              visible={visibleCount >= 6}
              eliminated={eliminated.has(ALL_PLAYERS[5].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[5].id}
            />
          </div>

          {/* Bottom Row */}
          <div className="absolute bottom-[20px] w-full flex justify-around px-16 items-end">
            <PlayerToken
              player={ALL_PLAYERS[6]}
              visible={visibleCount >= 7}
              eliminated={eliminated.has(ALL_PLAYERS[6].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[6].id}
            />

            {/* YOU ARE FRONT AND CENTER */}
            <div className="mb-4">
              <PlayerToken
                player={ALL_PLAYERS[4]}
                visible={visibleCount >= 5}
                eliminated={eliminated.has(ALL_PLAYERS[4].id)}
                isWinnerPhase={isWinnerPhase}
                isShaking={shakingId === ALL_PLAYERS[4].id}
                isSurviving={isBattlePhase}
              />
            </div>

            <PlayerToken
              player={ALL_PLAYERS[7]}
              visible={visibleCount >= 8}
              eliminated={eliminated.has(ALL_PLAYERS[7].id)}
              isWinnerPhase={isWinnerPhase}
              isShaking={shakingId === ALL_PLAYERS[7].id}
            />
          </div>
        </div>

        {/* ── Bottom Status Bar ── */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark via-dark/80 to-transparent z-20">
          {isWinnerPhase ? (
            <div className="text-center animate-winner-text bg-dark/60 backdrop-blur-md p-3 rounded-2xl border border-gold/30 shadow-[0_0_30px_rgba(212,168,67,0.2)] mx-auto max-w-[80%]">
              <p className="text-gold font-black text-2xl tracking-tight leading-none mb-1 shadow-sm">
                OU PRAN TOUT LAJAN AN!
              </p>
              <p className="text-white text-xs font-bold flex items-center justify-center gap-1.5 opacity-90">
                <Zap size={12} className="text-success fill-success" />
                <span className="text-success">
                  +{(YOUR_PRIZE - ENTRY_FEE).toLocaleString()} HTG
                </span>{" "}
                pwofi nèt
              </p>
            </div>
          ) : (
            <div className="max-w-[80%] mx-auto">
              <div className="flex justify-between text-[10px] text-white font-bold mb-2 uppercase tracking-wider backdrop-blur-sm px-2 py-0.5 rounded-full bg-dark/40 border border-white/5 inline-flex mx-auto w-full">
                <span>
                  {phase === "INTRO"
                    ? `${visibleCount} / ${ALL_PLAYERS.length} patisipan...`
                    : `${remainingCount + 1} sivivan rete`}
                </span>
                <span className="text-gold">
                  {ALL_PLAYERS.length} × {ENTRY_FEE} HTG
                </span>
              </div>
              <div className="w-full h-2 bg-dark rounded-full overflow-hidden shadow-inner border border-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500 relative"
                  style={{
                    width:
                      phase === "INTRO"
                        ? `${(visibleCount / ALL_PLAYERS.length) * 100}%`
                        : `${((remainingCount + 1) / ALL_PLAYERS.length) * 100}%`,
                    background: isBattlePhase
                      ? "linear-gradient(90deg, #b91c1c, #f97316)"
                      : "linear-gradient(90deg, #D4A843, #F59E0B)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Coin rain during winner phase ── */}
        {isWinnerPhase && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-30">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? "12px" : i % 3 === 1 ? "8px" : "5px",
                  height: i % 3 === 0 ? "12px" : i % 3 === 1 ? "8px" : "5px",
                  left: `${2 + ((i * 5.7) % 96)}%`,
                  top: "-20px",
                  background:
                    i % 3 === 0
                      ? "#D4A843"
                      : i % 3 === 1
                        ? "#E8C46A"
                        : "#F59E0B",
                  animation: `coin-fall ${0.9 + (i % 5) * 0.15}s ease-in both`,
                  animationDelay: `${i * 45}ms`,
                  opacity: 0.95,
                  boxShadow: "0 0 10px rgba(212,168,67,0.6)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
