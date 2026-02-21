import { Calendar, Check, X, Minus } from 'lucide-react'

const pickLabels = { home: 'Lakay', draw: 'Match Nul', away: 'Deyò' }

function getPickTeam(event) {
  if (event.pick === 'home') return event.match.home
  if (event.pick === 'away') return event.match.away
  return 'Match Nul'
}

export default function SplitEventList({ events }) {
  function formatDate(iso) {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-HT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white">Match yo nan Split la</h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={event.id} className="bg-dark-surface border border-white/10 rounded-xl p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-600 text-xs font-mono">{index + 1}.</span>
                  <p className="text-white text-sm font-medium truncate">{event.match.home} vs {event.match.away}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="text-gold">{event.match.competition}</span>
                  <span>·</span>
                  <Calendar size={10} />
                  <span>{formatDate(event.match.kickoff)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Chwa:</span>
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    {getPickTeam(event)} ({pickLabels[event.pick]})
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-gold font-bold text-sm">{event.odds.toFixed(2)}x</span>
                {event.result && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    event.result === 'win' ? 'bg-success/20' :
                    event.result === 'lose' ? 'bg-danger/20' :
                    'bg-white/10'
                  }`}>
                    {event.result === 'win' && <Check size={12} className="text-success" />}
                    {event.result === 'lose' && <X size={12} className="text-danger" />}
                    {event.result === 'void' && <Minus size={12} className="text-gray-400" />}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
