import { useState } from "react";
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
  { key: "pronos", label: "Pronos Eliminator" },
  { key: "bank-pari", label: "Bank Pari" },
  { key: "virtual", label: "Jwèt Simile" },
];

export default function LeaderboardPage() {
  const [activeTime, setActiveTime] = useState("week");
  const [gameFilter, setGameFilter] = useState("all");

  const top3 = leaderboardMock.slice(0, 3);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Klasman</h1>
        <p className="text-gray-400 text-sm">
          Wè ki moun ki ap domine platfòm nan semèn sa a.
        </p>
      </div>

      {/* Time tabs */}
      <div className="flex gap-2">
        {timeTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTime(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border transition-colors ${
              activeTime === tab.key
                ? "bg-gold/10 text-gold border-gold/20"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Game filter dropdown */}
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          className="ml-auto px-3 py-2 rounded-lg text-sm bg-dark-surface border border-white/10 text-gray-400 focus:border-gold focus:outline-none cursor-pointer"
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
