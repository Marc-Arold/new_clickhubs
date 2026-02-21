import { Calendar } from 'lucide-react'

export default function WeeklyMatchList({ matches, previousPicks, selectedTeam, onSelect }) {
  function formatTime(iso) {
    const d = new Date(iso)
    return d.toLocaleTimeString('fr-HT', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => {
        const homeUsed = previousPicks.includes(match.home)
        const awayUsed = previousPicks.includes(match.away)

        return (
          <div key={match.id} className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
            {/* Match info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{formatTime(match.kickoff)}</span>
              </div>
            </div>

            {/* Teams as buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => !homeUsed && onSelect(match.home)}
                disabled={homeUsed}
                className={`py-3 px-3 rounded-xl text-sm font-semibold transition-all border cursor-pointer text-center ${
                  homeUsed
                    ? 'bg-white/5 text-gray-600 border-white/5 cursor-not-allowed line-through'
                    : selectedTeam === match.home
                      ? 'bg-gold/20 text-gold border-gold shadow-lg shadow-gold/10'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {match.home}
                {homeUsed && <span className="block text-xs text-gray-600 font-normal mt-0.5 no-underline" style={{ textDecoration: 'none' }}>Deja itilize</span>}
              </button>

              <button
                onClick={() => !awayUsed && onSelect(match.away)}
                disabled={awayUsed}
                className={`py-3 px-3 rounded-xl text-sm font-semibold transition-all border cursor-pointer text-center ${
                  awayUsed
                    ? 'bg-white/5 text-gray-600 border-white/5 cursor-not-allowed line-through'
                    : selectedTeam === match.away
                      ? 'bg-gold/20 text-gold border-gold shadow-lg shadow-gold/10'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {match.away}
                {awayUsed && <span className="block text-xs text-gray-600 font-normal mt-0.5 no-underline" style={{ textDecoration: 'none' }}>Deja itilize</span>}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
