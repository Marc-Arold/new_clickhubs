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
    color: "text-gold",
  },
  {
    label: "Bank Pari",
    desc: "Kreye oswa antre nan split",
    icon: Landmark,
    route: "/bank-pari",
    color: "text-gold",
  },
  {
    label: "Dènye Sivivan",
    desc: "Pool sivivan chak jounen",
    icon: Shield,
    route: "/sivivan",
    color: "text-gold",
  },
];

const simulatedActions = [
  {
    label: "Foutbòl Vityèl",
    desc: "Match simile RNG",
    icon: Tv,
    route: "/virtual/football/vf-001",
    color: "text-gold",
  },
  {
    label: "Kous Cheval",
    desc: "Tounwa eliminasyon",
    icon: Zap,
    route: "/virtual/horses/hr-001",
    color: "text-gold",
  },
  {
    label: "Card Showdown",
    desc: "Batay kat 1v1",
    icon: Layers,
    route: "/virtual/cards",
    color: "text-gold",
  },
  {
    label: "Prediction Duel",
    desc: "Trivia espò 1v1",
    icon: Brain,
    route: "/duels/duel-001",
    color: "text-gold",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl">
      <WalletBar />

      {/* Quick access to game flows */}
      <div className="space-y-3">
        <h2 className="text-white font-semibold text-lg">Espò</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className="flex items-center gap-3 bg-dark-surface border border-white/10 rounded-xl p-4 hover:border-gold/20 transition-all cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <action.icon size={20} className={action.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{action.label}</p>
                <p className="text-gray-500 text-xs">{action.desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-600 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Simulated games */}
      <div className="space-y-3">
        <h2 className="text-white font-semibold text-lg">Jwèt Vityèl</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {simulatedActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className="flex flex-col items-center gap-2 bg-dark-surface border border-white/10 rounded-xl p-4 hover:border-gold/20 transition-all cursor-pointer text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <action.icon size={20} className={action.color} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{action.label}</p>
                <p className="text-gray-500 text-xs">{action.desc}</p>
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
