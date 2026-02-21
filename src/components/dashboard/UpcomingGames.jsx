import { useNavigate } from "react-router-dom";
import { Users, Clock, ArrowRight } from "lucide-react";
import { upcomingGamesMock } from "../../data/mockData";

export default function UpcomingGames() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold text-lg">Jwèt k ap Vini</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {upcomingGamesMock.map((game) => {
          const fillPercent = Math.round(
            (game.playersIn / game.maxPlayers) * 100,
          );
          return (
            <div
              key={game.id}
              className="bg-dark-surface border border-white/10 rounded-xl p-4 hover:border-gold/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    game.status === "Ouvri"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  {game.status}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Clock size={12} />
                  {game.startsIn}
                </div>
              </div>

              <h3 className="text-white font-medium text-sm mb-3">
                {game.name}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Kòb ou k fè:</span>
                  <span className="text-gold font-bold">
                    {game.prizePool.toLocaleString()} HTG
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Pri:</span>
                  <span className="text-white">
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
                </div>
                <div className="w-full bg-white/5 rounded-full h-1">
                  <div
                    className="bg-gold rounded-full h-1"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => navigate(game.route)}
                className="w-full flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-dark font-semibold text-xs py-2.5 rounded-lg transition-all border border-gold/20 hover:border-gold cursor-pointer"
              >
                Antre Kounye a
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
