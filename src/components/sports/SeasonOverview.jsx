import { Trophy, Users, Calendar, Shield, DollarSign } from 'lucide-react'

const statusConfig = {
  alive: { label: 'Vivan', color: 'bg-success/20 text-success', icon: Shield },
  eliminated: { label: 'Elimine', color: 'bg-danger/20 text-danger', icon: Shield },
  not_entered: { label: 'Pa Antre', color: 'bg-white/10 text-gray-400', icon: Shield },
}

export default function SeasonOverview({ season }) {
  const status = statusConfig[season.yourStatus]

  const stats = [
    { icon: Trophy, label: 'Pòt Total', value: `${season.prizePool.toLocaleString()} HTG`, color: 'text-gold' },
    { icon: DollarSign, label: 'Frè Antre', value: `${season.entryFee.toLocaleString()} HTG`, color: 'text-white' },
    { icon: Users, label: 'Jwè Vivan', value: `${season.playersAlive} / ${season.totalEntrants}`, color: 'text-success' },
    { icon: Calendar, label: 'Jounen', value: `${season.currentJournee ?? season.currentWeek ?? 0} sou ${season.totalJournees ?? season.totalWeeks ?? 0}`, color: 'text-white' },
  ]

  return (
    <div className="space-y-4">
      {/* Your status */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">Estati ou</p>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
        {season.yourStatus === 'alive' && (
          <div className="text-right">
            <p className="text-xs text-gray-500">Jounen siviv</p>
            <p className="text-white font-bold text-lg">{season.weeks.filter(w => w.survived).length}</p>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-dark-surface border border-white/10 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-2">
              <stat.icon size={14} className="text-gray-500" />
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <p className={`font-bold text-sm ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Survival counter */}
      {season.playersAlive <= 10 && season.playersAlive > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
          <p className="text-warning font-bold text-lg">Sèlman {season.playersAlive} jwè toujou vivan!</p>
          <p className="text-warning/70 text-xs mt-1">Tansyon ap monte...</p>
        </div>
      )}
    </div>
  )
}
