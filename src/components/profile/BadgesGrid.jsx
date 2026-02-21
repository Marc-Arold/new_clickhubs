import { Trophy, Shield, Zap, Users, Gamepad2, Flame, Star, Medal } from 'lucide-react'
import { badgesMock } from '../../data/mockData'

const iconMap = {
  trophy: Trophy,
  shield: Shield,
  zap: Zap,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  star: Star,
  medal: Medal,
}

export default function BadgesGrid() {
  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold text-lg">Badj & Akonplisman</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badgesMock.map((badge) => {
          const Icon = iconMap[badge.icon] || Trophy
          return (
            <div
              key={badge.id}
              className={`rounded-xl p-4 text-center border transition-colors ${
                badge.unlocked
                  ? 'bg-dark-surface border-gold/20'
                  : 'bg-dark-surface/50 border-white/5 opacity-50'
              }`}
            >
              <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                badge.unlocked ? 'bg-gold/10' : 'bg-white/5'
              }`}>
                <Icon size={22} className={badge.unlocked ? 'text-gold' : 'text-gray-600'} />
              </div>
              <p className={`text-xs font-medium ${badge.unlocked ? 'text-white' : 'text-gray-600'}`}>
                {badge.name}
              </p>
              {!badge.unlocked && (
                <p className="text-gray-600 text-[10px] mt-1">{badge.hint}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
