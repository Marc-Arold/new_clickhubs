import { Crown } from "lucide-react";

const medals = [
  {
    bg: "bg-yellow-400/20",
    border: "border-yellow-400/40",
    text: "text-yellow-400",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.25)]",
    label: "1ye",
    ringGradient: "from-yellow-400 to-yellow-600",
  },
  {
    bg: "bg-gray-300/20",
    border: "border-gray-300/40",
    text: "text-gray-300",
    glow: "shadow-[0_0_20px_rgba(209,213,219,0.15)]",
    label: "2yèm",
    ringGradient: "from-gray-300 to-gray-500",
  },
  {
    bg: "bg-amber-600/20",
    border: "border-amber-600/40",
    text: "text-amber-600",
    glow: "shadow-[0_0_20px_rgba(217,119,6,0.15)]",
    label: "3yèm",
    ringGradient: "from-amber-500 to-amber-700",
  },
];

export default function Podium({ top3 }) {
  const display = [top3[1], top3[0], top3[2]];
  const heights = ["h-28", "h-36", "h-24"];
  const medalIdx = [1, 0, 2];

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/[0.03] to-transparent rounded-2xl pointer-events-none" />

      <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
        {/* Decorative particles */}
        <div className="absolute top-4 left-[15%] w-2 h-2 bg-gold/20 rounded-full animate-float blur-[1px]" />
        <div className="absolute top-8 right-[20%] w-1.5 h-1.5 bg-yellow-400/20 rounded-full animate-float-delayed" />
        <div className="absolute bottom-12 left-[30%] w-1 h-1 bg-gold/30 rounded-full animate-float" />

        <div className="flex items-end justify-center gap-3 sm:gap-8 py-4">
          {display.map((player, i) => {
            if (!player) return null;
            const medal = medals[medalIdx[i]];
            const isWinner = medalIdx[i] === 0;

            return (
              <div key={player.rank} className="flex flex-col items-center">
                {/* Avatar with gradient ring */}
                <div className={`relative ${isWinner ? "mb-3" : "mb-2"}`}>
                  {isWinner && (
                    <Crown
                      size={24}
                      className="text-yellow-400 absolute -top-5 left-1/2 -translate-x-1/2 animate-float"
                    />
                  )}
                  <div
                    className={`w-14 h-14 sm:w-18 sm:h-18 rounded-full p-[2px] bg-gradient-to-br ${medal.ringGradient} ${medal.glow}`}
                  >
                    <div
                      className={`w-full h-full rounded-full ${medal.bg} flex items-center justify-center`}
                    >
                      <span
                        className={`text-base sm:text-xl font-black ${medal.text}`}
                      >
                        {player.initials}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name & stats */}
                <p className="text-white font-bold text-xs sm:text-sm text-center">
                  {player.username}
                </p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-xs sm:text-sm font-black mt-0.5">
                  {player.winnings.toLocaleString()} HTG
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs">
                  Genyen {player.gamesWon} pati
                </p>

                {/* Podium bar */}
                <div
                  className={`${heights[i]} w-20 sm:w-28 ${medal.bg} border ${medal.border} rounded-t-xl mt-3 flex flex-col items-center justify-start pt-3 relative overflow-hidden`}
                >
                  <span className={`text-sm font-black ${medal.text}`}>
                    {medal.label}
                  </span>
                  {/* Shimmer effect on winner */}
                  {isWinner && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
