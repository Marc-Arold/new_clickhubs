import { useState, useMemo } from "react";
import { SlidersHorizontal, Gamepad2 } from "lucide-react";
import GameFilterBar from "../components/games/GameFilterBar";
import GameSearch from "../components/games/GameSearch";
import GameLobbyCard from "../components/games/GameLobbyCard";
import { lobbyGamesMock } from "../data/mockData";

const sortOptions = [
  { key: "prizePool", label: "Pli Gwo Pòt" },
  { key: "startsIn", label: "Pi Vit Kòmanse" },
  { key: "playersIn", label: "Plis Jwè" },
  { key: "entryFee", label: "Frè (Ba → Wo)" },
];

export default function GamesLobbyPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("prizePool");
  const [showSort, setShowSort] = useState(false);

  const filteredGames = useMemo(() => {
    let games = [...lobbyGamesMock];

    if (activeFilter !== "all" && activeFilter !== "my-entries") {
      games = games.filter((g) => g.type === activeFilter);
    }

    if (searchQuery.trim()) {
      games = games.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    games.sort((a, b) => {
      if (sortBy === "prizePool") return b.prizePool - a.prizePool;
      if (sortBy === "playersIn") return b.playersIn - a.playersIn;
      if (sortBy === "entryFee") return a.entryFee - b.entryFee;
      return 0;
    });

    return games;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header with decorative elements */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-yellow-500/10 flex items-center justify-center border border-gold/10">
              <Gamepad2 size={20} className="text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Lòbi Jwèt</h1>
              <p className="text-gray-400 text-sm">
                Eksplore, filtre, epi antre nan nenpòt jwèt ki disponib.
              </p>
            </div>
          </div>
        </div>
      </div>

      <GameFilterBar active={activeFilter} onChange={setActiveFilter} />

      <div className="flex gap-3">
        <div className="flex-1">
          <GameSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-gray-400 text-sm hover:text-white hover:border-white/20 cursor-pointer transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Triye</span>
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl shadow-xl z-10 overflow-hidden border border-white/10">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortBy(opt.key);
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors border-none ${
                    sortBy === opt.key
                      ? "bg-gold/10 text-gold"
                      : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl">
          <Gamepad2 size={32} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            Pa gen jwèt disponib nan kategori sa a kounye a.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Nouvo jwèt ouvri chak jou — retounen oswa aktive notifikasyon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredGames.map((game) => (
            <GameLobbyCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
