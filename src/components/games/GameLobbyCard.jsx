import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Clock,
  Trophy,
  Monitor,
  Landmark,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

const typeConfig = {
  "pronos-eliminator": {
    icon: Trophy,
    gradient: "from-rose-500 to-red-700",
    iconColor: "text-rose-400",
    bgImage:
      "url('/images/p2p_football_haiti.png')",
    emoji: "🏆",
  },
  sports: {
    icon: Trophy,
    gradient: "from-emerald-500 to-emerald-700",
    iconColor: "text-emerald-400",
    bgImage:
      "url('/images/p2p_football_haiti.png')",
  },
  simulated: {
    icon: Monitor,
    gradient: "from-purple-500 to-purple-700",
    iconColor: "text-purple-400",
    bgImage:
      "url('/images/p2p_horse_racing.png')",
  },
  "horse-race": {
    icon: Trophy,
    gradient: "from-amber-500 to-yellow-700",
    iconColor: "text-amber-400",
    bgImage:
      "url('/images/p2p_horse_racing.png')",
    emoji: "🐎",
  },
  "bank-pari": {
    icon: Landmark,
    gradient: "from-blue-500 to-blue-700",
    iconColor: "text-blue-400",
    bgImage:
      "url('/images/p2p_casino_haiti.png')",
  },
};

const statusStyles = {
  Ouvri: "bg-success/90 text-white shadow-[0_0_8px_rgba(34,197,94,0.3)]",
  "Ap ranpli vit":
    "bg-warning/90 text-dark font-bold animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.3)]",
  Fèmen: "bg-danger/90 text-white",
};

export default function GameLobbyCard({ game }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const config = typeConfig[game.type] || typeConfig.sports;
  const Icon = config.icon;
  const fillPercent = Math.round((game.playersIn / game.maxPlayers) * 100);

  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
      {/* Animated gradient border on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/25 to-gold/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <div className="relative bg-dark-surface rounded-2xl overflow-hidden z-10">
        {/* Header with background image */}
        <div
          className="h-28 relative flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: config.bgImage }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/60 to-dark/40" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-15 mix-blend-overlay`}
          />

          {/* Zoom on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: config.bgImage }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/60 to-dark/40" />

          {/* Icon */}
          <div className="relative z-10 p-4 bg-dark/50 rounded-xl backdrop-blur-md border border-white/10 group-hover:border-gold/30 transition-all duration-500 group-hover:scale-105">
            {config.emoji
              ? <span className="text-3xl leading-none">{config.emoji}</span>
              : <Icon size={28} className="text-gold" />
            }
          </div>

          {/* Status badge */}
          <span
            className={`absolute top-3 right-3 text-[9px] font-black px-2.5 py-1 rounded-full z-10 backdrop-blur-md uppercase tracking-wider ${statusStyles[game.status] || statusStyles.Ouvri}`}
          >
            {game.status}
          </span>

          {/* Player count */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-dark/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            <Users size={10} className="text-gold" />
            <span className="text-white text-[10px] font-bold">
              {game.playersIn}/{game.maxPlayers}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 relative -mt-4 rounded-t-2xl bg-dark-surface z-20 border-t border-white/5 card-shine">
          <h3 className="text-white font-bold text-base mb-1 truncate group-hover:text-gold transition-colors duration-300">
            {game.name}
          </h3>

          {/* Prize pool */}
          <div className="bg-dark/40 rounded-lg p-3 mb-3 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
            <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">
              Miz Total
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-2xl font-black">
              {game.prizePool.toLocaleString()}{" "}
              <span className="text-xs text-gold/50">HTG</span>
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Antre:</span>
              <span className="text-white font-medium">
                {game.entryFee.toLocaleString()} HTG
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Clock size={12} className="text-gold/60" />
              <span>Kòmanse nan {game.startsIn}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-dark rounded-full h-1.5 border border-white/5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold to-yellow-400 rounded-full h-full transition-all duration-500 relative"
                style={{ width: `${fillPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(game.route)}
              className="group/cta flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold hover:to-yellow-500 text-gold hover:text-dark font-bold text-sm py-2.5 rounded-xl border border-gold/20 hover:border-gold transition-all cursor-pointer relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Antre
                <ArrowRight
                  size={14}
                  className="group-hover/cta:translate-x-1 transition-transform"
                />
              </span>
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors"
            >
              {expanded ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div className="border-t border-white/10 px-5 py-4 bg-dark-accent/30">
            {game.type === 'pronos-eliminator' ? (
              <>
                <h4 className="text-white font-bold text-sm mb-2">Règ Pronos Eliminator</h4>
                <ul className="space-y-1.5 text-gray-400 text-xs mb-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Bati yon fich ak kote kominèd ≥ 20 (jiska 1000).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Limit 2 fich pa jwè — 2yèm fich rele "Remiz".
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Distribisyon pwopòsyonèl: pi gwo kote = pi gwo pati jackpot.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Si pa genyan, jackpot akimile pou semèn pwochèn.
                  </li>
                </ul>
                <div className="glass-card-gold rounded-lg p-3">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Tye Kote</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {[20, 30, 50, 100, 150, 200, 1000].map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20 font-bold">×{t}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : game.type === 'horse-race' ? (
              <>
                <h4 className="text-white font-bold text-sm mb-2">Règ Kous la</h4>
                <ul className="space-y-1.5 text-gray-400 text-xs mb-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Chak jwè vin ak cheval pa yo — pa gen chwa cheval.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Ou wè cheval ou ak 5 lòt konpetitè pandan kous la.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Rezilta detèmine pa yon RNG ki ka verifye (seed hash).
                  </li>
                </ul>
                <div className="glass-card-gold rounded-lg p-3 space-y-1.5">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Distribisyon Pòt ({game.maxPlayers} jwè × {game.entryFee.toLocaleString()} HTG)
                  </p>
                  {(() => {
                    const net = game.entryFee * game.maxPlayers * 0.95
                    return (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">🥇 1ye Plas (65%)</span>
                          <span className="text-gold font-bold">{Math.round(net * 0.65).toLocaleString()} HTG</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">🥈 2yèm Plas (25%)</span>
                          <span className="text-gray-300 font-medium">{Math.round(net * 0.25).toLocaleString()} HTG</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">🥉 3yèm Plas (10%)</span>
                          <span className="text-gray-300 font-medium">{Math.round(net * 0.10).toLocaleString()} HTG</span>
                        </div>
                        <div className="border-t border-white/10 pt-1.5 flex justify-between text-[10px]">
                          <span className="text-gray-600">Frè platfòm (5%)</span>
                          <span className="text-gray-600">{Math.round(game.entryFee * game.maxPlayers * 0.05).toLocaleString()} HTG</span>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </>
            ) : (
              <>
                <h4 className="text-white font-bold text-sm mb-2">Règ yo</h4>
                <ul className="space-y-1.5 text-gray-400 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Chak jwè peye frè antre a pou antre nan pòt la.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Genyan an resevwa pòt total la mwens 10% frè platfòm.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Tout lajan kenbe an eskwo jiskaske rezilta konfime.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    Si match la anile, tout lajan retounen otomatikman.
                  </li>
                </ul>
                <div className="mt-3 glass-card-gold rounded-lg p-3">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Estrikti Peman
                  </p>
                  <p className="text-gold text-sm font-bold">
                    1ye plas: 90% pòt • 2yèm-3yèm: 10% pòt
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
