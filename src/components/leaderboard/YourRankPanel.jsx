import { useAuth } from "../../context/AuthContext";
import { ArrowUp } from "lucide-react";

export default function YourRankPanel() {
  const { user } = useAuth();
  const distanceToNext = 2000;
  const progressPercent = Math.min(100, Math.round((user.stats.totalWon / (user.stats.totalWon + distanceToNext)) * 100));

  return (
    <div className="sticky bottom-16 lg:bottom-0 relative rounded-xl overflow-hidden">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 rounded-xl z-0" />
      <div className="relative glass-card-gold rounded-xl p-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold/30 to-yellow-500/20 flex items-center justify-center text-gold font-bold text-sm border border-gold/20 shadow-[0_0_12px_rgba(212,168,67,0.15)]">
              {user.avatarInitials}
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                Plas ou semèn sa a:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 font-black">
                  #{user.rank}
                </span>
              </p>
              <p className="text-gray-400 text-xs">
                Ou Genyen: {user.stats.totalWon.toLocaleString()} HTG
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-gold text-sm font-bold justify-end">
              <ArrowUp size={14} />
              {distanceToNext.toLocaleString()} HTG
            </div>
            <p className="text-gray-500 text-xs">pou rive #{user.rank - 1}</p>
          </div>
        </div>

        {/* Progress to next rank */}
        <div className="w-full bg-dark/40 rounded-full h-2 border border-gold/10 overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold to-yellow-400 rounded-full h-full transition-all duration-500 relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
