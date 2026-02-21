import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const PAGE_SIZE = 25;

export default function RankingsTable({ data }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paged = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="bg-dark-surface border border-white/10 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-dark-accent/50 border-b border-white/10 text-gray-500 text-xs font-medium">
          <span>Plas</span>
          <span className="col-span-2">Jwè</span>
          <span className="text-right">Genyen</span>
          <span className="text-right hidden sm:block">Rasyo</span>
          <span className="text-right hidden sm:block">Pi Gwo Gen</span>
        </div>

        {paged.map((player, i) => (
          <div
            key={player.rank}
            className={`grid grid-cols-6 gap-4 px-4 py-3 items-center hover:bg-white/5 transition-colors ${
              i < paged.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <span className="text-gray-400 text-sm font-medium">
              #{player.rank}
            </span>
            <div className="col-span-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
                {player.initials}
              </div>
              <span className="text-white text-sm truncate">
                {player.username}
              </span>
            </div>
            <span className="text-gold text-sm font-bold text-right">
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
