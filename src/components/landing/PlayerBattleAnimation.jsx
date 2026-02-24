import { useState, useEffect, useRef, useCallback } from "react";
import { Crown, Trophy, Zap } from "lucide-react";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const ENTRY_FEE = 500;
const PLATFORM_FEE = 0.1; // 10%

const ALL_PLAYERS = [
  {
    id: 1,
    name: "MaxK",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.15)",
    isYou: false,
  },
  {
    id: 2,
    name: "MarieJ",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.15)",
    isYou: false,
  },
  {
    id: 3,
    name: "RolandP",
    color: "#10B981",
    bg: "rgba(16,185,129,0.15)",
    isYou: false,
  },
  {
    id: 4,
    name: "Anna",
    color: "#F43F5E",
    bg: "rgba(244,63,94,0.15)",
    isYou: false,
  },
  {
    id: 5,
    name: "OU",
    color: "#D4A843",
    bg: "rgba(212,168,67,0.25)",
    isYou: true,
  },
  {
    id: 6,
    name: "KingsT",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.15)",
    isYou: false,
  },
  {
    id: 7,
    name: "SophieM",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.15)",
    isYou: false,
  },
  {
    id: 8,
    name: "CharlieB",
    color: "#F97316",
    bg: "rgba(249,115,22,0.15)",
    isYou: false,
  },
];

const TOTAL_POT = ALL_PLAYERS.length * ENTRY_FEE; // 4 000 HTG
const YOUR_PRIZE = Math.round(TOTAL_POT * (1 - PLATFORM_FEE)); // 3 600 HTG
const OPPONENTS = ALL_PLAYERS.filter((p) => !p.isYou);

/* ─────────────────────────────────────────────
   PHASES (ms offsets from phase start)
   0 – INTRO    (players appear 1-by-1)
   1 – BATTLE   (eliminations)
   2 – WINNER   (you win!)
   3 – RESET    (fade-out, restart)
───────────────────────────────────────────── */
const PHASE_DURATION = {
  INTRO: 2600, // ~325ms per player
  BATTLE: 6000, // 7 eliminations × ~857ms
  WINNER: 3000,
  RESET: 800,
};

/* Random coin scatter inline style */
function coinStyle(i) {
  const angle = (360 / 20) * i + Math.random() * 18;
  const rad = (angle * Math.PI) / 180;
  const dist = 60 + Math.random() * 70;
  return {
    "--tx": `${Math.round(Math.cos(rad) * dist)}px`,
    "--ty": `${Math.round(Math.sin(rad) * dist)}px`,
    animationDelay: `${i * 40}ms`,
    animationDuration: "0.8s",
    animationFillMode: "both",
  };
}

/* ─────────────────────────────────────────────
   PLAYER TOKEN
───────────────────────────────────────────── */
function PlayerToken({ player, visible, eliminated, isWinnerPhase }) {
  const isWinner = player.isYou && isWinnerPhase;

  return (
    <div
      className="relative flex flex-col items-center gap-1"
      style={{
        opacity: visible ? (eliminated ? 0.15 : 1) : 0,
        transition: "opacity 0.4s ease",
        filter: eliminated ? "grayscale(0.8)" : "none",
      }}
    >
      {/* Token circle */}
      <div
        className={`relative w-12 h-12 rounded-full flex items-center justify-center font-black text-sm select-none transition-all duration-300 ${
          visible ? "animate-battle-enter" : ""
        } ${isWinner ? "animate-winner-glow" : ""}`}
        style={{
          background: player.bg,
          border: `2px solid ${player.color}`,
          color: player.color,
          fontSize: player.isYou ? "10px" : "11px",
          animationDelay: `${player.id * 0.28}s`,
          zIndex: isWinner ? 10 : 1,
          transform: player.isYou ? "scale(1.15)" : "scale(1)",
        }}
      >
        {/* YOU crown */}
        {player.isYou && (
          <Crown
            size={9}
            className="absolute -top-2 left-1/2 -translate-x-1/2"
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
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-danger/30">
            <span className="text-danger font-black text-lg leading-none">
              ✕
            </span>
          </div>
        )}

        {/* Winner coin burst particles */}
        {isWinner && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#D4A843" : "#E8C46A",
                  animation: "coin-scatter 0.9s ease-out both",
                  ...coinStyle(i),
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Name below */}
      <span
        className="text-[9px] font-semibold truncate max-w-[52px] text-center"
        style={{ color: player.isYou ? "#D4A843" : "rgba(255,255,255,0.5)" }}
      >
        {player.isYou ? "VOU" : player.name}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ELIMINATION NOTIFICATION
───────────────────────────────────────────── */
function EliminationToast({ name }) {
  return (
    <div
      key={name + Date.now()}
      className="absolute top-2 right-2 bg-danger/10 border border-danger/30 rounded-lg px-3 py-1.5 flex items-center gap-1.5"
      style={{
        animation:
          "fade-up 0.3s ease-out both, opacity 0.3s ease 1.2s reverse both",
      }}
    >
      <span className="text-danger text-xs">✕</span>
      <span className="text-danger text-xs font-bold">{name} pèdi!</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PlayerBattleAnimation() {
  const [phase, setPhase] = useState("INTRO");
  const [visibleCount, setVisible] = useState(0);
  const [eliminated, setEliminated] = useState(new Set());
  const [prizeDisplay, setPrize] = useState(0);
  const [lastElim, setLastElim] = useState(null);
  const [winnerReady, setWinner] = useState(false);
  const [mountKey, setMountKey] = useState(0); // forces re-mount on restart

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
    setEliminated(new Set());
    setPrize(0);
    setLastElim(null);
    setWinner(false);

    /* Phase 1 — INTRO: reveal players 1-by-1 */
    ALL_PLAYERS.forEach((_, i) => {
      addTimer(() => setVisible(i + 1), i * 280);
    });

    /* Animate prize pool counter during intro */
    const steps = 20;
    for (let s = 1; s <= steps; s++) {
      addTimer(
        () => setPrize(Math.round((TOTAL_POT / steps) * s)),
        500 + s * 100,
      );
    }

    /* Phase 2 — BATTLE: eliminate opponents one by one */
    const elimOrder = [...OPPONENTS].sort(() => Math.random() - 0.5);
    const battleStart = PHASE_DURATION.INTRO;
    elimOrder.forEach((opp, i) => {
      addTimer(
        () => {
          setEliminated((prev) => new Set([...prev, opp.id]));
          setLastElim(opp.name);
          addTimer(() => setLastElim(null), 1200);
        },
        battleStart + i * 820,
      );
    });

    /* Phase 3 — WINNER */
    const winnerStart = battleStart + PHASE_DURATION.BATTLE;
    addTimer(() => {
      setPhase("WINNER");
      setWinner(true);
    }, winnerStart);

    /* Animate prize counter up to winner amount */
    addTimer(() => {
      const steps2 = 15;
      for (let s = 1; s <= steps2; s++) {
        addTimer(() => setPrize(Math.round((YOUR_PRIZE / steps2) * s)), s * 60);
      }
    }, winnerStart + 100);

    /* Phase 4 — RESET */
    const resetStart = winnerStart + PHASE_DURATION.WINNER;
    addTimer(() => {
      setPhase("RESET");
      setWinner(false);
    }, resetStart);

    addTimer(() => {
      setMountKey((k) => k + 1);
    }, resetStart + PHASE_DURATION.RESET);
  }, [addTimer]);

  /* Restart cycle whenever mountKey changes */
  useEffect(() => {
    timers.current = [];
    runCycle();
    return clear;
  }, [mountKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const remainingCount = OPPONENTS.length - eliminated.size;
  const isWinnerPhase = phase === "WINNER";

  return (
    <div className="relative group">
      {/* Animated gradient border glow */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-gold via-yellow-600 to-gold rounded-3xl opacity-20 group-hover:opacity-40 blur-sm transition-all duration-700 animate-gradient" />

      <div
        className="glass-card rounded-3xl p-6 relative overflow-hidden card-shine border-white/10"
        style={{ minHeight: "420px" }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl -mr-12 -mt-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -ml-8 -mb-8" />
          {isWinnerPhase && (
            <div className="absolute inset-0 bg-gold/5 animate-pulse rounded-3xl" />
          )}
        </div>

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Trophy size={15} className="text-gold" />
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none">
                Kous Cheval
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5">An dirèk</p>
            </div>
          </div>
          {/* Phase label */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-500"
            style={
              isWinnerPhase
                ? {
                    background: "rgba(212,168,67,0.15)",
                    borderColor: "rgba(212,168,67,0.4)",
                    color: "#D4A843",
                  }
                : phase === "BATTLE" || (phase === "INTRO" && visibleCount > 0)
                  ? {
                      background: "rgba(239,68,68,0.1)",
                      borderColor: "rgba(239,68,68,0.3)",
                      color: "#EF4444",
                    }
                  : {
                      background: "rgba(34,197,94,0.1)",
                      borderColor: "rgba(34,197,94,0.3)",
                      color: "#22C55E",
                    }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={
                isWinnerPhase
                  ? {
                      background: "#D4A843",
                      animation: "pulse 1s ease infinite",
                    }
                  : {
                      background: "currentColor",
                      animation: "pulse 1s ease infinite",
                    }
              }
            />
            {isWinnerPhase ? "Viktwa!" : phase === "BATTLE" ? "Kous" : "Antre"}
          </div>
        </div>

        {/* ── Prize Pool ── */}
        <div className="bg-dark/50 rounded-xl p-3 mb-5 border border-white/5 relative z-10">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">
            {isWinnerPhase ? "Ou resevwa" : "Miz total"}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="font-black text-3xl leading-none animate-number-pop"
              key={prizeDisplay}
              style={{
                color: isWinnerPhase ? "#22C55E" : "#D4A843",
                textShadow: isWinnerPhase
                  ? "0 0 20px rgba(34,197,94,0.4)"
                  : "0 0 20px rgba(212,168,67,0.3)",
              }}
            >
              {prizeDisplay.toLocaleString()}
            </span>
            <span className="text-gold/60 text-sm font-bold">HTG</span>
            {isWinnerPhase && (
              <span className="ml-auto text-success text-xs font-black animate-winner-text flex items-center gap-1">
                <Zap size={11} className="fill-current" />+
                {(YOUR_PRIZE - ENTRY_FEE).toLocaleString()} HTG benefis
              </span>
            )}
          </div>
        </div>

        {/* ── Arena: Player Grid ── */}
        <div className="relative z-10 mb-4">
          {/* Elimination toast */}
          {lastElim && <EliminationToast name={lastElim} />}

          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {ALL_PLAYERS.map((player) => (
              <PlayerToken
                key={player.id}
                player={player}
                visible={visibleCount >= player.id}
                eliminated={eliminated.has(player.id)}
                isWinnerPhase={isWinnerPhase}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom Status Bar ── */}
        <div className="relative z-10">
          {isWinnerPhase ? (
            /* WINNER MESSAGE */
            <div className="text-center py-2 animate-winner-text">
              <p className="text-gold font-black text-xl tracking-wide">
                GENYEN YO TOUT!
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {ENTRY_FEE.toLocaleString()} HTG mize →{" "}
                {YOUR_PRIZE.toLocaleString()} HTG touche
              </p>
            </div>
          ) : (
            /* Progress bar */
            <div>
              <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                <span>
                  {phase === "INTRO"
                    ? `${visibleCount} / ${ALL_PLAYERS.length} jwè antre...`
                    : `${remainingCount} jwè rete`}
                </span>
                <span>
                  {ALL_PLAYERS.length} × {ENTRY_FEE} HTG
                </span>
              </div>
              <div className="w-full h-1.5 bg-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width:
                      phase === "INTRO"
                        ? `${(visibleCount / ALL_PLAYERS.length) * 100}%`
                        : `${(remainingCount / ALL_PLAYERS.length) * 100}%`,
                    background:
                      phase === "BATTLE"
                        ? "linear-gradient(90deg, #EF4444, #F97316)"
                        : "linear-gradient(90deg, #D4A843, #E8C46A)",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Coin rain during winner phase */}
        {isWinnerPhase && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${5 + ((i * 5.3) % 90)}%`,
                  top: "-12px",
                  background:
                    i % 3 === 0
                      ? "#D4A843"
                      : i % 3 === 1
                        ? "#E8C46A"
                        : "#F59E0B",
                  animation: "coin-fall 1.2s ease-in both",
                  animationDelay: `${i * 70}ms`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
