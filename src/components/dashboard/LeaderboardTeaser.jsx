import { Link } from "react-router-dom";
import { Crown, ArrowRight } from "lucide-react";
import { leaderboardMock } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

const medalConfig = [
  { bg: "bg-yellow-400/20", text: "text-yellow-400", glow: "rank-glow-gold" },
  { bg: "bg-gray-300/20", text: "text-gray-300", glow: "rank-glow-silver" },
  { bg: "bg-amber-600/20", text: "text-amber-600", glow: "rank-glow-bronze" },
];

export default function LeaderboardTeaser() {
  const { user } = useAuth();
  const top3 = leaderboardMock.slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-yellow-400" />
          <h2 className="text-white font-bold text-lg">Klasman Semèn nan</h2>
        </div>
        <Link
          to="/klasman"
          className="inline-flex items-center gap-1.5 text-gold text-xs font-bold no-underline bg-gold/5 hover:bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20 hover:border-gold/40 transition-all"
        >
          Wè tout <ArrowRight size={12} />
        </Link>
      </div>

      <div className="glass-card rounded-xl p-4">
        {/* Top 3 */}
        <div className="space-y-2 mb-4">
          {top3.map((player, i) => {
            const medal = medalConfig[i];
            return (
              <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className={`w-8 h-8 rounded-full ${medal.bg} ${medal.glow} flex items-center justify-center`}>
                  {i === 0 ? (
                    <Crown size={14} className={medal.text} />
                  ) : (
                    <span className={`text-xs font-black ${medal.text}`}>{i + 1}</span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-yellow-500/10 flex items-center justify-center text-gold text-xs font-bold border border-gold/10">
                  {player.initials}
                </div>
                <span className="text-white text-sm font-medium flex-1 truncate">
                  {player.username}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-sm font-bold">
                  {player.winnings.toLocaleString()} HTG
                </span>
              </div>
            );
          })}
        </div>

        {/* Player's own rank */}
        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center gap-3 glass-card-gold rounded-lg px-3 py-2.5">
            <span className="text-gold text-xs font-black">#{user.rank}</span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/30 to-yellow-500/20 flex items-center justify-center text-gold text-xs font-bold border border-gold/20">
              {user.avatarInitials}
            </div>
            <span className="text-white text-sm flex-1">
              {user.displayName}{" "}
              <span className="text-gray-500 text-xs">(ou)</span>
            </span>
            <span className="text-gold text-sm font-bold">
              {user.stats.totalWon.toLocaleString()} HTG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
