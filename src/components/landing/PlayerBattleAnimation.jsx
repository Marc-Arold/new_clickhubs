import { useState, useEffect, useRef, useCallback } from "react";
import { Crown, Trophy, Zap } from "lucide-react";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const ENTRY_FEE    = 500;
const PLATFORM_FEE = 0.1;

const ALL_PLAYERS = [
  { id: 1, name: "MaxK",     color: "#3B82F6", bg: "rgba(59,130,246,0.18)",  isYou: false },
  { id: 2, name: "MarieJ",   color: "#A855F7", bg: "rgba(168,85,247,0.18)",  isYou: false },
  { id: 3, name: "RolandP",  color: "#10B981", bg: "rgba(16,185,129,0.18)",  isYou: false },
  { id: 4, name: "Anna",     color: "#F43F5E", bg: "rgba(244,63,94,0.18)",   isYou: false },
  { id: 5, name: "OU",       color: "#D4A843", bg: "rgba(212,168,67,0.28)",  isYou: true  },
  { id: 6, name: "KingsT",   color: "#06B6D4", bg: "rgba(6,182,212,0.18)",   isYou: false },
  { id: 7, name: "SophieM",  color: "#6366F1", bg: "rgba(99,102,241,0.18)",  isYou: false },
  { id: 8, name: "CharlieB", color: "#F97316", bg: "rgba(249,115,22,0.18)",  isYou: false },
];

const TOTAL_POT  = ALL_PLAYERS.length * ENTRY_FEE; // 4 000 HTG
const YOUR_PRIZE = Math.round(TOTAL_POT * (1 - PLATFORM_FEE)); // 3 600 HTG
const OPPONENTS  = ALL_PLAYERS.filter((p) => !p.isYou);

/*
  Elimination offsets from battleStart (ms).
  Varied intentionally for tension — some fast, some with a pause.
*/
const ELIM_OFFSETS = [480, 1020, 1600, 2080, 2700, 3350, 4000];

const PHASE_DURATION = {
  INTRO:  2600,
  BATTLE: ELIM_OFFSETS[ELIM_OFFSETS.length - 1] + 500, // 4 500 ms
  WINNER: 3400,
  RESET:  900,
};

/* Radial coin burst style for winner */
function coinStyle(i, total) {
  const angle = (360 / total) * i + (i % 3) * 10;
  const rad   = (angle * Math.PI) / 180;
  const dist  = 55 + (i % 4) * 20;
  return {
    "--tx":             `${Math.round(Math.cos(rad) * dist)}px`,
    "--ty":             `${Math.round(Math.sin(rad) * dist)}px`,
    animationDelay:     `${i * 30}ms`,
    animationDuration:  "0.85s",
    animationFillMode:  "both",
    animationName:      "coin-scatter",
    animationTimingFunction: "ease-out",
  };
}

/* ─────────────────────────────────────────────
   PLAYER TOKEN
───────────────────────────────────────────── */
function PlayerToken({ player, visible, eliminated, isWinnerPhase, isShaking, isSurviving }) {
  const isWinner = player.isYou && isWinnerPhase;

  /* Build dynamic class list */
  const cls = [
    "relative w-12 h-12 rounded-full flex items-center justify-center font-black select-none",
    "transition-opacity duration-300",
    visible && !eliminated && !isShaking && !isSurviving && !isWinner
      ? "animate-battle-enter"
      : "",
    isShaking   ? "animate-shake"       : "",
    isSurviving ? "animate-survive"     : "",
    isWinner    ? "animate-winner-glow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="relative flex flex-col items-center gap-1"
      style={{
        opacity:    visible ? (eliminated ? 0.1 : 1) : 0,
        transition: "opacity 0.5s ease",
        filter:     eliminated ? "grayscale(1) blur(0.5px)" : "none",
      }}
    >
      {/* Token circle */}
      <div
        className={cls}
        style={{
          background:     player.bg,
          border:         `2px solid ${player.color}`,
          color:          player.color,
          fontSize:       player.isYou ? "10px" : "11px",
          animationDelay:
            visible && !eliminated && !isShaking && !isSurviving && !isWinner
              ? `${player.id * 0.26}s`
              : undefined,
          transform:      player.isYou ? "scale(1.18)" : "scale(1)",
          zIndex:         isWinner ? 10 : 1,
        }}
      >
        {/* Crown for YOU */}
        {player.isYou && (
          <Crown
            size={9}
            className="absolute -top-2.5 left-1/2 -translate-x-1/2"
            style={{ color: "#D4A843", fill: "#D4A843" }}
          />
        )}

        {player.isYou ? (
          <span className="font-black tracking-tight" style={{ color: "#D4A843" }}>
            OU
          </span>
        ) : (
          <span>{player.name.slice(0, 3)}</span>
        )}

        {/* Eliminated X */}
        {eliminated && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-danger/40">
            <span className="text-danger font-black text-xl leading-none">✕</span>
          </div>
        )}

        {/* Winner coin burst */}
        {isWinner && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width:      i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "5px",
                  height:     i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "5px",
                  background: i % 2 === 0 ? "#D4A843" : "#E8C46A",
                  ...coinStyle(i, 20),
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Name label */}
      <span
        className="text-[9px] font-semibold truncate max-w-[52px] text-center leading-none"
        style={{
          color:      player.isYou ? "#D4A843" : "rgba(255,255,255,0.4)",
          fontWeight: player.isYou ? 900 : 600,
        }}
      >
        {player.isYou ? "VOU" : player.name}
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
      className="absolute top-2 right-2 bg-danger/10 border border-danger/30 rounded-lg px-3 py-1.5 flex items-center gap-1.5 z-30 pointer-events-none"
      style={{ animation: "toast-in-out 1.5s ease both" }}
    >
      <span className="text-danger text-xs font-black">✕</span>
      <span className="text-danger text-xs font-bold">{name} pèdi!</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PlayerBattleAnimation() {
  const [phase,        setPhase]   = useState("INTRO");
  const [visibleCount, setVisible] = useState(0);
  const [eliminated,   setElim]    = useState(new Set());
  const [prizeDisplay, setPrize]   = useState(0);
  const [lastElim,     setLastElim]= useState(null);
  const [shakingId,    setShaking] = useState(null);
  const [arenaFlash,   setFlash]   = useState(false);
  const [mountKey,     setMountKey]= useState(0);

  const timers = useRef([]);
  const clear  = () => timers.current.forEach(clearTimeout);

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
      addTimer(
        () => {
          setElim((prev) => new Set([...prev, opp.id]));
          setLastElim(opp.name);
          setFlash(true);
          addTimer(() => setFlash(false), 580);
          addTimer(() => setLastElim(null), 1500);
        },
        battleStart + offset,
      );
    });

    /* ── WINNER ── */
    const winnerStart = battleStart + PHASE_DURATION.BATTLE;
    addTimer(() => {
      setPhase("WINNER");
      setFlash(false);
    }, winnerStart);

    /* Animate prize counter up to winner amount */
    addTimer(() => {
      const steps2 = 18;
      for (let s = 1; s <= steps2; s++) {
        addTimer(
          () => setPrize(Math.round((YOUR_PRIZE / steps2) * s)),
          s * 55,
        );
      }
    }, winnerStart + 180);

    /* ── RESET ── */
    const resetStart = winnerStart + PHASE_DURATION.WINNER;
    addTimer(() => setPhase("RESET"), resetStart);
    addTimer(() => setMountKey((k) => k + 1), resetStart + PHASE_DURATION.RESET);
  }, [addTimer]);

  useEffect(() => {
    timers.current = [];
    runCycle();
    return clear;
  }, [mountKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const remainingCount = OPPONENTS.length - eliminated.size;
  const isWinnerPhase  = phase === "WINNER";
  const isBattlePhase  = phase === "BATTLE";

  /* Dynamic card shadow */
  const cardShadow = arenaFlash
    ? "inset 0 0 80px rgba(239,68,68,0.45), 0 0 40px rgba(239,68,68,0.2)"
    : isWinnerPhase
      ? "inset 0 0 60px rgba(212,168,67,0.15), 0 0 60px rgba(212,168,67,0.3)"
      : "none";

  return (
    <div className="relative group">
      {/* Animated gradient border glow */}
      <div
        className={`absolute -inset-[2px] rounded-3xl blur-sm transition-all duration-700 animate-gradient ${
          isWinnerPhase
            ? "opacity-70 bg-gradient-to-r from-gold via-yellow-200 to-gold"
            : "opacity-25 bg-gradient-to-r from-gold via-yellow-600 to-gold group-hover:opacity-45"
        }`}
      />

      <div
        className="glass-card rounded-3xl p-6 relative overflow-hidden card-shine"
        style={{
          minHeight:  "420px",
          boxShadow:  cardShadow,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl -mr-12 -mt-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -ml-8 -mb-8" />
          {isWinnerPhase && (
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent animate-pulse rounded-3xl" />
          )}
        </div>

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-500"
              style={
                isWinnerPhase
                  ? { background: "rgba(212,168,67,0.2)", borderColor: "rgba(212,168,67,0.45)" }
                  : { background: "rgba(212,168,67,0.08)", borderColor: "rgba(212,168,67,0.18)" }
              }
            >
              <Trophy size={15} className="text-gold" />
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none">Kous Cheval</p>
              <p className="text-gray-500 text-[10px] mt-0.5">An dirèk</p>
            </div>
          </div>

          {/* Phase badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-500"
            style={
              isWinnerPhase
                ? { background: "rgba(212,168,67,0.15)", borderColor: "rgba(212,168,67,0.4)",  color: "#D4A843" }
                : isBattlePhase
                  ? { background: "rgba(239,68,68,0.12)", borderColor: "rgba(239,68,68,0.35)", color: "#EF4444" }
                  : { background: "rgba(34,197,94,0.1)",  borderColor: "rgba(34,197,94,0.3)",  color: "#22C55E" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "currentColor", animation: "pulse 1s ease infinite" }}
            />
            {isWinnerPhase ? "Viktwa!" : isBattlePhase ? "Kous" : "Antre"}
          </div>
        </div>

        {/* ── Prize Pool ── */}
        <div
          className="rounded-xl p-3 mb-5 border relative z-10 transition-all duration-400"
          style={{
            background:  isWinnerPhase ? "rgba(34,197,94,0.08)"   : "rgba(0,0,0,0.35)",
            borderColor: isWinnerPhase ? "rgba(34,197,94,0.28)"   : "rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">
            {isWinnerPhase ? "Ou resevwa" : "Miz total"}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="font-black text-3xl leading-none animate-number-pop"
              key={prizeDisplay}
              style={{
                color:      isWinnerPhase ? "#22C55E" : "#D4A843",
                textShadow: isWinnerPhase
                  ? "0 0 24px rgba(34,197,94,0.55)"
                  : "0 0 20px rgba(212,168,67,0.45)",
              }}
            >
              {prizeDisplay.toLocaleString()}
            </span>
            <span className="text-gold/60 text-sm font-bold">HTG</span>
            {isWinnerPhase && (
              <span className="ml-auto text-success text-xs font-black animate-winner-text flex items-center gap-1">
                <Zap size={11} className="fill-current" />
                +{(YOUR_PRIZE - ENTRY_FEE).toLocaleString()} HTG benefis
              </span>
            )}
          </div>
        </div>

        {/* ── Arena: Player Grid ── */}
        <div className="relative z-10 mb-4">
          {/* Elimination toast — key forces remount on each new elimination */}
          {lastElim && <EliminationToast key={lastElim} name={lastElim} />}

          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {ALL_PLAYERS.map((player) => (
              <PlayerToken
                key={player.id}
                player={player}
                visible={visibleCount >= player.id}
                eliminated={eliminated.has(player.id)}
                isWinnerPhase={isWinnerPhase}
                isShaking={shakingId === player.id}
                isSurviving={isBattlePhase && player.isYou && !eliminated.has(player.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom Status Bar ── */}
        <div className="relative z-10">
          {isWinnerPhase ? (
            <div className="text-center py-2 animate-winner-text">
              <p className="text-gold font-black text-xl tracking-wide">
                GENYEN YO TOUT!
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {ENTRY_FEE.toLocaleString()} HTG mize &rarr; {YOUR_PRIZE.toLocaleString()} HTG touche
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                <span>
                  {phase === "INTRO"
                    ? `${visibleCount} / ${ALL_PLAYERS.length} jwè antre...`
                    : `${remainingCount + 1} jwè rete`}
                </span>
                <span>{ALL_PLAYERS.length} × {ENTRY_FEE} HTG</span>
              </div>
              <div className="w-full h-1.5 bg-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: phase === "INTRO"
                      ? `${(visibleCount / ALL_PLAYERS.length) * 100}%`
                      : `${((remainingCount + 1) / ALL_PLAYERS.length) * 100}%`,
                    background: isBattlePhase
                      ? "linear-gradient(90deg, #EF4444, #F97316)"
                      : "linear-gradient(90deg, #D4A843, #E8C46A)",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Coin rain during winner phase ── */}
        {isWinnerPhase && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
            {Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width:              i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "4px",
                  height:             i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "4px",
                  left:               `${3 + ((i * 3.7) % 94)}%`,
                  top:                "-14px",
                  background:         i % 3 === 0 ? "#D4A843" : i % 3 === 1 ? "#E8C46A" : "#F59E0B",
                  animation:          `coin-fall ${0.85 + (i % 5) * 0.18}s ease-in both`,
                  animationDelay:     `${i * 55}ms`,
                  opacity:            0.9,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
