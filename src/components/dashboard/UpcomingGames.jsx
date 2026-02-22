import { useNavigate } from "react-router-dom";
import { Users, Clock, ArrowRight } from "lucide-react";
import { upcomingGamesMock } from "../../data/mockData";

export default function UpcomingGames() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gold" />
          <h2 className="text-white font-bold text-lg">Jwèt k ap Vini</h2>
        </div>
      </div>

      {/* Horizontal scrollable on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {upcomingGamesMock.map((game) => {
          const fillPercent = Math.round(
            (game.playersIn / game.maxPlayers) * 100
          );
          return (
            <div
              key={game.id}
              className="group min-w-[280px] sm:min-w-0 relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              {/* Gradient border on hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

              <div className="relative bg-dark-surface border border-white/10 rounded-xl p-4 z-10 card-shine">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      game.status === "Ouvri"
                        ? "bg-success/20 text-success"
                        : "bg-warning/20 text-warning animate-pulse"
                    }`}
                  >
                    {game.status}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock size={12} className="text-gold/60" />
                    {game.startsIn}
                  </div>
                </div>

                <h3 className="text-white font-bold text-sm mb-3 group-hover:text-gold transition-colors">
                  {game.name}
                </h3>

                {/* Prize pool — hero stat */}
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
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users size={12} />
                      <span>
                        {game.playersIn}/{game.maxPlayers}
                      </span>
                    </div>
                    <span className="text-gold/70 text-[10px] font-bold">{fillPercent}%</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-1.5 border border-white/5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold to-yellow-400 rounded-full h-full transition-all duration-500 relative"
                      style={{ width: `${fillPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(game.route)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold hover:to-yellow-500 text-gold hover:text-dark font-bold text-xs py-2.5 rounded-lg transition-all border border-gold/20 hover:border-gold cursor-pointer"
                >
                  Antre Kounye a
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
