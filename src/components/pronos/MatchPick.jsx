import { useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { countryFilters, mockSubMarkets } from '../../data/mockData'

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

  // Faked sub-market odds generation consistently based on ID sum to avoid re-renders changing odds
  const seed = match.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  const formattedSubMarkets = mockSubMarkets.map(market => ({
    ...market,
    outcomes: market.outcomes.map((o, idx) => {
      // Generate some fake reasonable odds like 1.5 - 3.5
      const randomOdd = 1.3 + ((seed + idx) % 20) / 10
      return { ...o, odds: randomOdd }
    })
  }))

  const [isExpanded, setIsExpanded] = useState(false)
  const isSelected = selectedPick && !outcomes.find(o => o.key === selectedPick) 
    ? true // a submarket is picked
    : selectedPick !== null

  const mainSelection = outcomes.find(o => o.key === selectedPick)
  let activeSubMarketLabel = null
  if (selectedPick && !mainSelection) {
    formattedSubMarkets.forEach(m => {
      const found = m.outcomes.find(o => o.key === selectedPick)
      if (found) activeSubMarketLabel = `${m.marketName}: ${found.name}`
    })
  }

  const flag = countryFilters.find(c => c.key === match.country)?.flag || '🌍'

  return (
    <div className={`relative bg-dark border rounded-2xl p-4 sm:p-5 transition-all outline-none ${
      selectedPick 
        ? 'border-gold bg-gradient-to-br from-gold/10 to-transparent shadow-[0_0_15px_rgba(212,168,67,0.15)] ring-1 ring-gold/50' 
        : 'border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent hover:bg-white/[0.04] hover:border-white/10'
    }`}>
      {/* Match header */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] sm:text-xs">{flag}</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">{match.competition}</span>
          </div>
          <p className="text-white font-bold text-sm sm:text-base leading-tight truncate">
            {match.home} <span className="text-gray-500 font-normal mx-0.5 sm:mx-1">vs</span> {match.away}
          </p>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 flex items-center gap-1.5 font-medium">
             {dateLabel} · {timeLabel}
          </p>
        </div>
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 border border-gold/30 shadow-[0_0_10px_rgba(212,168,67,0.2)]">
            <Check size={14} className="text-gold" />
          </div>
        )}
      </div>

      {/* Active Submarket label if applicable */}
      {activeSubMarketLabel && (
        <div className="mb-3 bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5 flex items-center justify-between">
           <span className="text-gray-300 text-xs font-medium">Chwa ou:</span>
           <span className="text-gold font-bold text-xs">{activeSubMarketLabel}</span>
        </div>
      )}

      {/* Outcome buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {outcomes.map(o => {
          const isThisSelected = selectedPick === o.key
          return (
            <button
              key={o.key}
              onClick={() => onPick(match.id, o.key, o.odds, 'Rezilta Match')}
              className={`flex flex-col items-center py-2.5 sm:py-3 px-2 rounded-xl transition-all cursor-pointer border ${
                isThisSelected
                  ? 'bg-gold text-dark border-gold shadow-[0_0_15px_rgba(212,168,67,0.4)] transform scale-[1.02]'
                  : 'bg-white/5 text-gray-300 border-white/5 hover:border-gold/30 hover:bg-white/10'
              }`}
            >
              <span className={`text-xs sm:text-sm font-bold leading-none mb-1 sm:mb-1.5 ${isThisSelected ? 'text-dark/90' : 'text-gray-400'}`}>{o.label}</span>
              <span className={`text-sm sm:text-base font-black ${isThisSelected ? 'text-dark' : 'text-gold'}`}>
                {o.odds.toFixed(2)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Sub-markets toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/10"
      >
        <span>Lòt Pari</span>
        <span className="bg-dark px-1.5 rounded">{formattedSubMarkets.length}</span>
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Expanded Sub-markets */}
      {isExpanded && (
        <div className="mt-3 space-y-3 border-t border-white/5 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {formattedSubMarkets.map(market => (
            <div key={market.marketKey} className="bg-dark-surface/50 rounded-xl p-3 border border-white/5">
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">{market.marketName}</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {market.outcomes.map(o => {
                  const isThisSelected = selectedPick === o.key
                  return (
                    <button
                      key={o.key}
                      onClick={() => onPick(match.id, o.key, o.odds, market.marketName, o.name)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer border ${
                        isThisSelected
                          ? 'bg-gold/20 text-gold border-gold/40'
                          : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-semibold">{o.label}</span>
                      <span className={`font-black text-sm ${isThisSelected ? 'text-gold' : 'text-gray-300'}`}>{o.odds.toFixed(2)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
