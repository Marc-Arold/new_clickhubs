import { Trophy, Shield, Zap, Users, Gamepad2, Flame, Star, Medal } from "lucide-react";
import { badgesMock } from "../../data/mockData";

const iconMap = {
  trophy: Trophy,
  shield: Shield,
  zap: Zap,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  star: Star,
  medal: Medal,
};

export default function BadgesGrid() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gold" />
        <h2 className="text-white font-bold text-lg">Badj & Akonplisman</h2>
        <span className="text-[10px] font-bold bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20">
          {badgesMock.filter((b) => b.unlocked).length}/{badgesMock.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badgesMock.map((badge) => {
          const Icon = iconMap[badge.icon] || Trophy;
          return (
            <div
              key={badge.id}
              className={`group rounded-xl p-4 text-center border transition-all duration-300 relative overflow-hidden ${
                badge.unlocked
                  ? "glass-card border-gold/20 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(212,168,67,0.1)]"
                  : "bg-dark-surface/30 border-white/5 opacity-50 grayscale"
              }`}
            >
              {badge.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent pointer-events-none" />
              )}
              <div
                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                  badge.unlocked ? "bg-gold/10" : "bg-white/5"
                }`}
              >
                <Icon
                  size={22}
                  className={
                    badge.unlocked ? "text-gold" : "text-gray-600"
                  }
                />
              </div>
              <p
                className={`text-xs font-bold ${
                  badge.unlocked ? "text-white" : "text-gray-600"
                }`}
              >
                {badge.name}
              </p>
              {!badge.unlocked && (
                <p className="text-gray-600 text-[10px] mt-1">{badge.hint}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
