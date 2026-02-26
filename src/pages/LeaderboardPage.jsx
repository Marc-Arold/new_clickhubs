import { useState } from "react";
import { Trophy } from "lucide-react";
import Podium from "../components/leaderboard/Podium";
import RankingsTable from "../components/leaderboard/RankingsTable";
import YourRankPanel from "../components/leaderboard/YourRankPanel";
import { leaderboardMock } from "../data/mockData";

const timeTabs = [
  { key: "week", label: "Semèn sa a" },
  { key: "month", label: "Mwa sa a" },
  { key: "all", label: "Tout Tan" },
];

const gameFilters = [
  { key: "all", label: "Tout Jwèt" },
  { key: "pronos", label: "Jackpòt Eliminator" },
  { key: "bank-pari", label: " Paryaj Klasik" },
  { key: "virtual", label: "Jwèt Simile" },
];

export default function LeaderboardPage() {
  const [activeTime, setActiveTime] = useState("week");
  const [gameFilter, setGameFilter] = useState("all");

  const top3 = leaderboardMock.slice(0, 3);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-40 h-40 bg-yellow-400/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-gold/10 flex items-center justify-center border border-gold/10 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
            <Trophy size={22} className="text-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Klasman</h1>
            <p className="text-gray-400 text-sm">
              Wè ki moun ki ap domine platfòm nan semèn sa a.
            </p>
          </div>
        </div>
      </div>

      {/* Segmented time control + game filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex glass-card rounded-xl p-1 gap-0.5">
          {timeTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTime(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-none transition-all ${
                activeTime === tab.key
                  ? "bg-gold/15 text-gold shadow-[0_0_10px_rgba(212,168,67,0.1)]"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          className="ml-auto px-3 py-2.5 rounded-xl text-sm glass-card text-gray-400 focus:border-gold focus:outline-none cursor-pointer"
        >
          {gameFilters.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Podium */}
      <Podium top3={top3} />

      {/* Full rankings */}
      <RankingsTable data={leaderboardMock} />

      {/* Your rank */}
      <YourRankPanel />
    </div>
  );
}
