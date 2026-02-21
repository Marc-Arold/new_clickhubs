import { Link, useNavigate } from "react-router-dom";
import { Clock, Trophy, Landmark, Eye } from "lucide-react";
import { activeGamesMock } from "../../data/mockData";

const typeIcons = {
  sports: Trophy,
  simulated: Trophy,
  "bank-pari": Landmark,
};

export default function ActiveGamesPanel() {
  const navigate = useNavigate();

  if (activeGamesMock.length === 0) {
    return (
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-gray-400 text-sm mb-3">Ou pa gen fich kap jwe la.</p>
        <Link
          to="/dashboard"
          className="text-gold hover:text-gold-light text-sm font-medium no-underline"
        >
          Eksplore lòbi a →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold text-lg">Fich Ou Yo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeGamesMock.map((game) => {
          const Icon = typeIcons[game.type] || Trophy;
          return (
            <div
              key={game.id}
              className="bg-dark-surface border border-white/10 rounded-xl p-4 hover:border-gold/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">
                    {game.name}
                  </h3>
                  <p className="text-success text-xs mt-1">{game.status}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                    <Clock size={12} />
                    <span>Pwochen: {game.nextRound}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(game.route)}
                className="mt-3 w-full flex items-center justify-center gap-2 text-gold text-xs font-medium bg-gold/5 hover:bg-gold/10 border border-gold/10 rounded-lg py-2 cursor-pointer transition-colors"
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
