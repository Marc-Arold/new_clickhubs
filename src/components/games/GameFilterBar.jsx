import { Trophy, Monitor, Landmark, Gamepad2, LayoutGrid } from "lucide-react";

const filters = [
  { key: "all", label: "Tout", icon: LayoutGrid },
  { key: "pronos-eliminator", label: "Pronos", icon: null, emoji: "🏆" },
  { key: "sports", label: "Espò", icon: Trophy },
  { key: "horse-race", label: "Kous Cheval", icon: null, emoji: "🐎" },
  { key: "simulated", label: "Vityèl", icon: Monitor },
  { key: "bank-pari", label: "Paryaj Klasik", icon: Landmark },
  { key: "my-entries", label: "Jwèt Mwen", icon: Gamepad2 },
];

export default function GameFilterBar({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const isActive = active === filter.key;
        const Icon = filter.icon;
        return (
          <button
            key={filter.key}
            onClick={() => onChange(filter.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer border relative ${
              isActive
                ? "bg-gold/10 text-gold border-gold/20 shadow-[0_0_10px_rgba(212,168,67,0.1)]"
                : "bg-dark-surface text-gray-400 border-white/10 hover:text-white hover:border-white/20"
            }`}
          >
            {filter.emoji ? (
              <span className="text-base leading-none">{filter.emoji}</span>
            ) : (
              <Icon size={16} />
            )}
            {filter.label}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
