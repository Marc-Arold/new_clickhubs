import { Crown } from "lucide-react";

const medals = [
  {
    bg: "bg-yellow-400/20",
    border: "border-yellow-400/30",
    text: "text-yellow-400",
    label: "1ye",
  },
  {
    bg: "bg-gray-300/20",
    border: "border-gray-300/30",
    text: "text-gray-300",
    label: "2yèm",
  },
  {
    bg: "bg-amber-600/20",
    border: "border-amber-600/30",
    text: "text-amber-600",
    label: "3yèm",
  },
];

export default function Podium({ top3 }) {
  // Reorder for visual: 2nd, 1st, 3rd
  const display = [top3[1], top3[0], top3[2]];
  const heights = ["h-28", "h-36", "h-24"];
  const medalIdx = [1, 0, 2];

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6 py-6">
      {display.map((player, i) => {
        if (!player) return null;
        const medal = medals[medalIdx[i]];
        return (
          <div key={player.rank} className="flex flex-col items-center">
            {/* Avatar */}
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${medal.bg} border-2 ${medal.border} flex items-center justify-center mb-2`}
            >
              <span className={`text-sm sm:text-lg font-bold ${medal.text}`}>
                {player.initials}
              </span>
            </div>

            {/* Name */}
            <p className="text-white font-semibold text-xs sm:text-sm">
              {player.username}
            </p>
            <p className="text-gold text-xs sm:text-sm font-bold">
              {player.winnings.toLocaleString()} HTG
            </p>
            <p className="text-gray-500 text-[10px] sm:text-xs">
              Genyen {player.gamesWon} pati{" "}
            </p>

            {/* Podium bar */}
            <div
              className={`${heights[i]} w-20 sm:w-28 ${medal.bg} border ${medal.border} rounded-t-lg mt-3 flex items-start justify-center pt-3`}
            >
              {medalIdx[i] === 0 && <Crown size={20} className={medal.text} />}
              <span className={`text-sm font-bold ${medal.text}`}>
                {medal.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
