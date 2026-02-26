import { Link } from "react-router-dom";
import {
  Trophy,
  Landmark,
  Shield,
  Monitor,
  Zap,
  Spade,
  Target,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    icon: Trophy,
    label: "Pronos Eliminator",
    href: "/jwet?type=sports",
    hot: true,
    color: "from-emerald-500/20 to-emerald-700/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Landmark,
    label: "Bank Pari",
    href: "/jwet?type=bank-pari",
    hot: true,
    color: "from-purple-500/20 to-purple-700/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Shield,
    label: "Dènye Sivivan",
    href: "/jwet?type=sports",
    color: "from-blue-500/20 to-blue-700/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Monitor,
    label: "Virtual Football",
    href: "/jwet?type=simulated",
    color: "from-cyan-500/20 to-cyan-700/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Zap,
    label: "Kous Cheval",
    href: "/jwet?type=simulated",
    color: "from-amber-500/20 to-amber-700/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Spade,
    label: "Card Showdown",
    href: "/jwet?type=simulated",
    color: "from-rose-500/20 to-rose-700/10",
    iconColor: "text-rose-400",
  },
  {
    icon: Target,
    label: "Prediction Duel",
    href: "/jwet?type=simulated",
    color: "from-indigo-500/20 to-indigo-700/10",
    iconColor: "text-indigo-400",
  },
];

export default function GameCategoryBar() {
  return (
    <section className="py-6 bg-dark-surface/50 backdrop-blur-sm border-y border-white/5 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[100px] bg-gold/3 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <ChevronRight size={14} className="text-gold" />
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            jwèt Sou platfòm nan
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.href}
              className={`group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gradient-to-br ${cat.color} border border-white/5 hover:border-gold/40 text-gray-300 hover:text-white transition-all duration-300 whitespace-nowrap no-underline shrink-0 relative overflow-hidden`}
            >
              {/* Hover shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

              <div
                className={`w-9 h-9 rounded-lg bg-dark/40 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/20 group-hover:scale-110 ${cat.iconColor}`}
              >
                <cat.icon size={18} />
              </div>
              <span className="text-sm font-bold">{cat.label}</span>
              {cat.hot && (
                <span className="text-[8px] font-black bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                  Hot
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
