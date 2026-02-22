import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Landmark,
  Shield,
  ArrowRight,
  Tv,
  Zap,
  Layers,
  Brain,
} from "lucide-react";
import WalletBar from "../components/dashboard/WalletBar";
import ActiveGamesPanel from "../components/dashboard/ActiveGamesPanel";
import UpcomingGames from "../components/dashboard/UpcomingGames";
import RecentResults from "../components/dashboard/RecentResults";
import LeaderboardTeaser from "../components/dashboard/LeaderboardTeaser";

const quickActions = [
  {
    label: "Pronos Eliminator",
    desc: "Tounwa eliminasyon",
    icon: Trophy,
    route: "/tounwa/pe-001",
    gradient: "from-emerald-500/20 to-emerald-700/10",
    iconColor: "text-emerald-400",
    bgImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop",
  },
  {
    label: "Bank Pari",
    desc: "Kreye oswa antre nan split",
    icon: Landmark,
    route: "/bank-pari",
    gradient: "from-blue-500/20 to-blue-700/10",
    iconColor: "text-blue-400",
    bgImage: "https://images.unsplash.com/photo-1518605368461-1ee7c53206fb?q=80&w=400&auto=format&fit=crop",
  },
  {
    label: "Dènye Sivivan",
    desc: "Pool sivivan chak jounen",
    icon: Shield,
    route: "/sivivan",
    gradient: "from-orange-500/20 to-orange-700/10",
    iconColor: "text-orange-400",
    bgImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=400&auto=format&fit=crop",
  },
];

const simulatedActions = [
  {
    label: "Foutbòl Vityèl",
    desc: "Match simile RNG",
    icon: Tv,
    route: "/virtual/football/vf-001",
    gradient: "from-purple-500/20 to-purple-700/10",
    iconColor: "text-purple-400",
  },
  {
    label: "Kous Cheval",
    desc: "Kous ak pòt",
    icon: Zap,
    route: "/virtual/horses/hr-001",
    gradient: "from-pink-500/20 to-pink-700/10",
    iconColor: "text-pink-400",
  },
  {
    label: "Card Showdown",
    desc: "Batay kat 1v1",
    icon: Layers,
    route: "/virtual/cards",
    gradient: "from-cyan-500/20 to-cyan-700/10",
    iconColor: "text-cyan-400",
  },
  {
    label: "Prediction Duel",
    desc: "Trivia espò 1v1",
    icon: Brain,
    route: "/duels/duel-001",
    gradient: "from-amber-500/20 to-amber-700/10",
    iconColor: "text-amber-400",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl">
      <WalletBar />

      {/* Sports quick access — rich cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-emerald-500" />
          <h2 className="text-white font-bold text-lg">Espò</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300 cursor-pointer text-left bg-dark-surface"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all duration-500"
                style={{ backgroundImage: `url('${action.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-surface via-dark-surface/90 to-dark-surface/70" />

              <div className="relative flex items-center gap-3 p-4 z-10">
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon size={20} className={action.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm group-hover:text-gold transition-colors">{action.label}</p>
                  <p className="text-gray-500 text-xs">{action.desc}</p>
                </div>
                <ArrowRight size={16} className="text-gray-600 group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Simulated games */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-purple-500" />
          <h2 className="text-white font-bold text-lg">Jwèt Vityèl</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {simulatedActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className="group flex flex-col items-center gap-2.5 bg-dark-surface border border-white/10 rounded-xl p-4 hover:border-gold/20 transition-all cursor-pointer text-center card-shine relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <action.icon size={22} className={action.iconColor} />
              </div>
              <div className="relative z-10">
                <p className="text-white font-bold text-sm group-hover:text-gold transition-colors">{action.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ActiveGamesPanel />
      <UpcomingGames />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentResults />
        <LeaderboardTeaser />
      </div>
    </div>
  );
}
