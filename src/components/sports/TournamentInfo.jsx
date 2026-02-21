import { Trophy, Users, DollarSign, Calendar, Target, Layers } from 'lucide-react'

export default function TournamentInfo({ tournament }) {
  const stats = [
    { icon: Trophy, label: 'Pòt Total', value: `${tournament.prizePool.toLocaleString()} HTG`, color: 'text-gold' },
    { icon: DollarSign, label: 'Frè Antre', value: `${tournament.entryFee.toLocaleString()} HTG`, color: 'text-white' },
    { icon: Users, label: 'Jwè', value: `${tournament.playersEntered} / ${tournament.maxPlayers}`, color: 'text-white' },
    { icon: Target, label: 'Round', value: tournament.status === 'active' ? `${tournament.currentRound} sou ${tournament.totalRounds}` : `${tournament.totalRounds} total`, color: 'text-white' },
    { icon: Layers, label: 'Vivan', value: tournament.status === 'active' ? `${tournament.playersAlive} jwè` : '—', color: 'text-success' },
  ]

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

      {/* Fill bar */}
      {tournament.status === 'open' && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{tournament.playersEntered} anrejistre</span>
            <span>{tournament.maxPlayers} maks</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div
              className="bg-gold rounded-full h-2 transition-all"
              style={{ width: `${(tournament.playersEntered / tournament.maxPlayers) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Payout structure */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Trophy size={14} className="text-gold" />
          Estrikti Peman
        </h3>
        {tournament.payoutStructure.map((p, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-400">{p.place}</span>
            <span className="text-gold font-medium">{p.payout}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
