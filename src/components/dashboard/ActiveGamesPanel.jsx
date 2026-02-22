import { Link, useNavigate } from "react-router-dom";
import { Clock, Trophy, Landmark, Eye, Zap } from "lucide-react";
import { activeGamesMock } from "../../data/mockData";

const typeConfig = {
  sports: { icon: Trophy, color: "from-emerald-500/20 to-emerald-700/10", iconColor: "text-emerald-400", accent: "border-l-emerald-500" },
  simulated: { icon: Zap, color: "from-purple-500/20 to-purple-700/10", iconColor: "text-purple-400", accent: "border-l-purple-500" },
  "bank-pari": { icon: Landmark, color: "from-blue-500/20 to-blue-700/10", iconColor: "text-blue-400", accent: "border-l-blue-500" },
};

export default function ActiveGamesPanel() {
  const navigate = useNavigate();

  if (activeGamesMock.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-gray-400 text-sm mb-3">
          Ou pa gen fich kap jwe la.
        </p>
        <Link
          to="/jwet"
          className="text-gold hover:text-gold-light text-sm font-medium no-underline"
        >
          Eksplore lòbi a →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-success" />
        <h2 className="text-white font-bold text-lg">Fich Ou Yo</h2>
        <span className="text-[10px] font-bold bg-success/10 text-success px-2.5 py-0.5 rounded-full border border-success/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
          {activeGamesMock.length} aktif
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeGamesMock.map((game) => {
          const config = typeConfig[game.type] || typeConfig.sports;
          const Icon = config.icon;
          return (
            <div
              key={game.id}
              className={`glass-card rounded-xl p-4 hover:border-gold/20 transition-all duration-300 group card-shine border-l-3 ${config.accent}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={18} className={config.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm truncate group-hover:text-gold transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-success text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    {game.status}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                    <Clock size={12} />
                    <span>Pwochen: {game.nextRound}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(game.route)}
                className="mt-3 w-full flex items-center justify-center gap-2 text-gold text-xs font-bold bg-gold/5 hover:bg-gold/10 border border-gold/10 hover:border-gold/20 rounded-lg py-2.5 cursor-pointer transition-all"
              >
                <Eye size={14} />
                Plis detay
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
