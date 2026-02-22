import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 25;

const rankStyle = (rank) => {
  if (rank === 1) return "text-yellow-400 font-black";
  if (rank === 2) return "text-gray-300 font-bold";
  if (rank === 3) return "text-amber-600 font-bold";
  return "text-gray-400 font-medium";
};

const avatarStyle = (rank) => {
  if (rank === 1) return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30 rank-glow-gold";
  if (rank === 2) return "bg-gray-300/20 text-gray-300 border-gray-300/30 rank-glow-silver";
  if (rank === 3) return "bg-amber-600/20 text-amber-600 border-amber-600/30 rank-glow-bronze";
  return "bg-gold/10 text-gold border-gold/10";
};

export default function RankingsTable({ data }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paged = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-dark-accent/50 border-b border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
          <span>Plas</span>
          <span className="col-span-2">Jwè</span>
          <span className="text-right">Genyen</span>
          <span className="text-right hidden sm:block">Rasyo</span>
          <span className="text-right hidden sm:block">Pi Gwo Gen</span>
        </div>

        {paged.map((player, i) => (
          <div
            key={player.rank}
            className={`grid grid-cols-6 gap-4 px-4 py-3 items-center row-hover transition-colors ${
              i < paged.length - 1 ? "border-b border-white/5" : ""
            } ${player.rank <= 3 ? "bg-gold/[0.02]" : ""}`}
          >
            <span className={`text-sm ${rankStyle(player.rank)}`}>
              {player.rank <= 3 ? (
                <span className="flex items-center gap-1">
                  {player.rank === 1 && <Crown size={12} className="text-yellow-400" />}
                  #{player.rank}
                </span>
              ) : (
                `#${player.rank}`
              )}
            </span>
            <div className="col-span-2 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border ${avatarStyle(player.rank)}`}
              >
                {player.initials}
              </div>
              <span className="text-white text-sm truncate font-medium">
                {player.username}
              </span>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-sm font-bold text-right">
              {player.winnings.toLocaleString()}
            </span>
            <span className="text-gray-400 text-sm text-right hidden sm:block">
              {Math.round(player.winRate * 100)}%
            </span>
            <span className="text-gray-400 text-sm text-right hidden sm:block">
              {player.biggestWin.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-gray-400 text-sm">
            Paj {page} sou {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
