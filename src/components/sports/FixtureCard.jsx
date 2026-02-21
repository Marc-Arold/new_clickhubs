import { Trophy } from 'lucide-react'

export default function FixtureCard({ match, selectedPick, onPick, disabled = false, showDistribution = false, poolDistribution }) {
  const picks = [
    { key: 'home', label: match.home },
    { key: 'draw', label: 'Match Nul' },
    { key: 'away', label: match.away },
  ]

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl p-5 space-y-4">
      {/* Match header */}
      <div className="text-center space-y-1">
        <p className="text-xs text-gold font-medium">{match.competition}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-white font-bold text-lg">{match.home}</span>
          <span className="text-gray-500 text-sm font-medium">vs</span>
          <span className="text-white font-bold text-lg">{match.away}</span>
        </div>
      </div>

      {/* Pick buttons */}
      <div className="grid grid-cols-3 gap-2">
        {picks.map((pick) => (
          <button
            key={pick.key}
            onClick={() => !disabled && onPick?.(pick.key)}
            disabled={disabled}
            className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
              selectedPick === pick.key
                ? 'bg-gold/20 text-gold border-gold shadow-lg shadow-gold/10'
                : disabled
                  ? 'bg-white/5 text-gray-500 border-white/5 cursor-not-allowed'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {selectedPick === pick.key && <Trophy size={14} className="inline mr-1 mb-0.5" />}
            {pick.label}
          </button>
        ))}
      </div>

      {/* Pool distribution */}
      {showDistribution && poolDistribution && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">Distribisyon Jwè yo</p>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden">
            <div className="bg-success/60 rounded-l-full" style={{ width: `${poolDistribution.home}%` }} />
            <div className="bg-warning/60" style={{ width: `${poolDistribution.draw}%` }} />
            <div className="bg-blue-500/60 rounded-r-full" style={{ width: `${poolDistribution.away}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{match.home} {poolDistribution.home}%</span>
            <span>Nul {poolDistribution.draw}%</span>
            <span>{match.away} {poolDistribution.away}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
