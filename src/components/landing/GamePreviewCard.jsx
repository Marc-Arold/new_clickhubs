import { Link } from "react-router-dom";
import { Clock, Trophy, Monitor, Landmark, Users, ArrowRight } from "lucide-react";

const typeConfig = {
  sports: {
    icon: Trophy,
    bgImage:
      "url('/images/p2p_football_haiti.png')",
    accent: "from-emerald-500 to-emerald-700",
    accentBg: "bg-emerald-500/10",
  },
  simulated: {
    icon: Monitor,
    bgImage:
      "url('/images/p2p_horse_racing.png')",
    accent: "from-purple-500 to-purple-700",
    accentBg: "bg-purple-500/10",
  },
  "bank-pari": {
    icon: Landmark,
    bgImage:
      "url('/images/p2p_casino_haiti.png')",
    accent: "from-blue-500 to-blue-700",
    accentBg: "bg-blue-500/10",
  },
};

const statusStyles = {
  Ouvri: "bg-success/90 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]",
  "Ap ranpli vit":
    "bg-warning/90 text-dark font-bold animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.4)]",
  Fèmen: "bg-danger/90 text-white",
};

export default function GamePreviewCard({ game }) {
  const config = typeConfig[game.type] || typeConfig.sports;
  const Icon = config.icon;
  const fillPercent = Math.round((game.playersIn / game.maxPlayers) * 100);

  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Animated gradient border on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <div className="relative bg-dark-surface rounded-2xl overflow-hidden z-10">
        {/* Background Image Header */}
        <div
          className="h-44 relative flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: config.bgImage }}
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/50 to-dark/30" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.accent} opacity-20 mix-blend-overlay`}
          />

          {/* Zoom effect on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: config.bgImage }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/50 to-dark/30" />

          {/* Icon */}
          <div className="relative z-10 p-5 bg-dark/50 rounded-2xl backdrop-blur-md border border-white/10 group-hover:border-gold/40 group-hover:bg-dark/60 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,168,67,0.15)]">
            <Icon size={36} className="text-gold" />
          </div>

          {/* Status badge */}
          <span
            className={`absolute top-4 right-4 text-[10px] font-black px-3 py-1.5 rounded-full z-10 backdrop-blur-md uppercase tracking-wider ${statusStyles[game.status] || statusStyles.Ouvri}`}
          >
            {game.status}
          </span>

          {/* Player count badge */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-dark/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Users size={11} className="text-gold" />
            <span className="text-white text-[10px] font-bold">
              {game.playersIn}/{game.maxPlayers}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 relative bg-dark-surface z-20 -mt-6 rounded-t-3xl border-t border-white/5 card-shine">
          <h3 className="text-white font-black text-xl mb-1 truncate group-hover:text-gold transition-colors duration-300">
            {game.name}
          </h3>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-5 pb-4 border-b border-white/5">
            Antre:{" "}
            <span className="text-white">
              {game.entryFee.toLocaleString()} HTG
            </span>
          </p>

          {/* Prize pool — hero stat */}
          <div className="bg-dark/40 rounded-xl p-4 mb-5 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-xl -mr-5 -mt-5 pointer-events-none" />
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 relative z-10">
              Miz Total
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-3xl font-black relative z-10">
              {game.prizePool.toLocaleString()}{" "}
              <span className="text-lg text-gold/60">HTG</span>
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Clock size={12} className="text-gold" />
                {game.startsIn}
              </span>
              <span className="text-gold/70 font-bold">{fillPercent}%</span>
            </div>
            <div className="w-full bg-dark rounded-full h-2 border border-white/5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold to-yellow-400 rounded-full h-full transition-all duration-500 relative"
                style={{ width: `${fillPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/enskri"
            className="group/cta flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold hover:to-yellow-500 text-gold hover:text-dark font-bold text-sm py-3.5 rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 uppercase tracking-wide no-underline relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Jwe Kounye a
              <ArrowRight
                size={14}
                className="group-hover/cta:translate-x-1 transition-transform"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
