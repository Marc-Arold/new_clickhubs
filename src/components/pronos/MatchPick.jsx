import { Check } from 'lucide-react'

const OUTCOME_LABELS = { home: '1', draw: 'X', away: '2' }

export default function MatchPick({ match, selectedPick, onPick }) {
  const kickoffDate = new Date(match.kickoff)
  const dateLabel = kickoffDate.toLocaleDateString('fr-HT', { weekday: 'short', day: 'numeric', month: 'short' })
  const timeLabel = kickoffDate.toLocaleTimeString('fr-HT', { hour: '2-digit', minute: '2-digit' })

  const outcomes = [
    { key: 'home', label: '1', odds: match.suggestedOdds.home, name: match.home },
    { key: 'draw', label: 'X', odds: match.suggestedOdds.draw, name: 'Egalite' },
    { key: 'away', label: '2', odds: match.suggestedOdds.away, name: match.away },
  ]

  return (
    <div className={`bg-dark-surface border rounded-xl p-4 transition-all ${
      selectedPick ? 'border-gold/30 bg-gold/5' : 'border-white/10 hover:border-white/20'
    }`}>
      {/* Match header */}
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {match.home} vs {match.away}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">{match.competition} · {dateLabel} {timeLabel}</p>
        </div>
        {selectedPick && (
          <span className="flex items-center gap-1 text-xs font-bold text-gold shrink-0 ml-2">
            <Check size={12} /> {OUTCOME_LABELS[selectedPick]}
          </span>
        )}
      </div>

      {/* Outcome buttons */}
      <div className="grid grid-cols-3 gap-2">
        {outcomes.map(o => {
          const isSelected = selectedPick === o.key
          return (
            <button
              key={o.key}
              onClick={() => onPick(match.id, o.key, o.odds)}
              className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gold text-dark border-gold shadow-[0_0_8px_rgba(212,168,67,0.3)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-gold/30 hover:text-white'
              }`}
            >
              <span className="text-base leading-none mb-0.5">{o.label}</span>
              <span className={`text-[10px] font-black ${isSelected ? 'text-dark' : 'text-gold'}`}>
                {o.odds.toFixed(2)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
