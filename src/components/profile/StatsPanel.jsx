import { Gamepad2, TrendingUp, Coins, Trophy, Flame, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function StatsPanel() {
  const { user } = useAuth();
  const s = user.stats;

  const stats = [
    { icon: Gamepad2, label: "Jwèt Jwe", value: s.totalGamesPlayed },
    {
      icon: TrendingUp,
      label: "Rasyo Gen",
      value: `${Math.round(s.winRate * 100)}%`,
    },
    {
      icon: Coins,
      label: "Total ou Mize",
      value: `${s.totalWagered.toLocaleString()} HTG`,
    },
    {
      icon: Trophy,
      label: "Total Gen",
      value: `${s.totalWon.toLocaleString()} HTG`,
    },
    {
      icon: Flame,
      label: "Maksimòm Gen",
      value: `${s.biggestSingleWin.toLocaleString()} HTG`,
    },
    { icon: Zap, label: "Seri Aktyèl", value: `${s.currentWinStreak} genyen` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-dark-surface border border-white/10 rounded-xl p-4"
        >
          <stat.icon size={18} className="text-gold mb-2" />
          <p className="text-white font-bold text-lg">{stat.value}</p>
          <p className="text-gray-500 text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
