import { Gamepad2, TrendingUp, Coins, Trophy, Flame, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function StatsPanel() {
  const { user } = useAuth();
  const s = user.stats;

  const stats = [
    { icon: Gamepad2, label: "Jwèt Jwe", value: s.totalGamesPlayed, color: "text-blue-400", bg: "bg-blue-400/10" },
    { icon: TrendingUp, label: "Rasyo Gen", value: `${Math.round(s.winRate * 100)}%`, color: "text-success", bg: "bg-success/10" },
    { icon: Coins, label: "Total ou Mize", value: `${s.totalWagered.toLocaleString()} HTG`, color: "text-gold", bg: "bg-gold/10" },
    { icon: Trophy, label: "Total Gen", value: `${s.totalWon.toLocaleString()} HTG`, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { icon: Flame, label: "Maksimòm Gen", value: `${s.biggestSingleWin.toLocaleString()} HTG`, color: "text-orange-400", bg: "bg-orange-400/10" },
    { icon: Zap, label: "Seri Aktyèl", value: `${s.currentWinStreak} genyen`, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="glass-card rounded-xl p-4 card-shine group hover:border-gold/20 transition-all"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <stat.icon size={18} className={stat.color} />
          </div>
          <p className="text-white font-black text-lg">{stat.value}</p>
          <p className="text-gray-500 text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
