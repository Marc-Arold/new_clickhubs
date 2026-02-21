import { TrendingUp, AlertCircle, Sparkles } from 'lucide-react'

export default function OddsInput({ events, odds, onOddsChange, picks }) {
  const totalOdds = events.reduce((acc, event) => {
    const eventOdds = parseFloat(odds[event.id]) || 1
    return acc * eventOdds
  }, 1)

  const allValid = events.every(e => {
    const o = parseFloat(odds[e.id])
    return o && o >= 1.1
  })

  const allHaveSuggestions = picks && events.every(e => {
    const pick = picks[e.id]
    return pick && e.suggestedOdds && e.suggestedOdds[pick]
  })

  function fillAllSuggestions() {
    events.forEach(match => {
      const pick = picks[match.id]
      if (pick && match.suggestedOdds && match.suggestedOdds[pick]) {
        onOddsChange(match.id, String(match.suggestedOdds[pick]))
      }
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">3. Chwazi Kòt yo</h3>
        {allHaveSuggestions && (
          <button
            onClick={fillAllSuggestions}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold text-xs font-medium rounded-lg border border-gold/20 hover:bg-gold/20 cursor-pointer transition-colors"
          >
            <Sparkles size={12} />
            Itilize tout sijesyon
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500">Mete kòt pou chak match. Pi gwo kòt = plis risk pou ou, men plis atiran pou jwè yo.</p>

      <div className="space-y-2">
        {events.map((match) => {
          const eventOdds = parseFloat(odds[match.id]) || 0
          const isValid = eventOdds >= 1.1
          const pick = picks ? picks[match.id] : null
          const suggested = pick && match.suggestedOdds ? match.suggestedOdds[pick] : null
          const pickLabel = pick === 'home' ? match.home : pick === 'away' ? match.away : pick === 'draw' ? 'Match Nul' : ''

          return (
            <div key={match.id} className="bg-dark-surface border border-white/10 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{match.home} vs {match.away}</p>
                  <p className="text-xs text-gray-500">{match.competition}</p>
                </div>
                <div className="w-20">
                  <input
                    type="number"
                    value={odds[match.id] || ''}
                    onChange={(e) => onOddsChange(match.id, e.target.value)}
                    placeholder="1.50"
                    min="1.1"
                    step="0.1"
                    className={`w-full px-2 py-1.5 text-center text-sm font-bold rounded-lg border bg-transparent focus:outline-none focus:ring-1 ${
                      !odds[match.id] ? 'border-white/10 text-white focus:border-gold focus:ring-gold'
                      : isValid ? 'border-gold/30 text-gold focus:border-gold focus:ring-gold'
                      : 'border-danger/30 text-danger focus:border-danger focus:ring-danger'
                    }`}
                  />
                </div>
              </div>

              {/* Suggested odds row */}
              {suggested && (
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-gold/60" />
                    <span className="text-xs text-gray-400">
                      Sijesyon pou <span className="text-white font-medium">{pickLabel}</span>:
                    </span>
                    <span className="text-gold font-bold text-sm">{suggested.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => onOddsChange(match.id, String(suggested))}
                    className="px-2.5 py-1 bg-gold/10 text-gold text-xs font-medium rounded-md border border-gold/20 hover:bg-gold/20 cursor-pointer transition-colors"
                  >
                    Itilize
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Combined odds */}
      {allValid && (
        <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp size={16} className="text-gold" />
            <span className="text-gold text-sm font-medium">Kòt Total</span>
          </div>
          <p className="text-gold font-bold text-2xl">{totalOdds.toFixed(2)}x</p>
        </div>
      )}

      {!allValid && events.length > 0 && (
        <div className="flex items-center gap-2 text-warning text-xs">
          <AlertCircle size={12} />
          <span>Chak kòt dwe omwen 1.10</span>
        </div>
      )}
    </div>
  )
}
