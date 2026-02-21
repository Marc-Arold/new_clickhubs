import { useAuth } from "../../context/AuthContext";

export default function YourRankPanel() {
  const { user } = useAuth();

  return (
    <div className="sticky bottom-16 lg:bottom-0 bg-dark-accent/95 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
            {user.avatarInitials}
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              Plas ou semèn sa a:{" "}
              <span className="text-gold font-bold">#{user.rank}</span>
            </p>
            <p className="text-gray-400 text-xs">
              Ou Genyen: {user.stats.totalWon.toLocaleString()} HTG
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gold text-sm font-bold">Rete 2,000 HTG</p>
          <p className="text-gray-500 text-xs">pou rive #{user.rank - 1}</p>
        </div>
      </div>
    </div>
  );
}
