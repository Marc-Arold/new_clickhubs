import { useState, useMemo } from 'react'
import { Search, Calendar, X, Check } from 'lucide-react'
import { upcomingMatchesMock, countryFilters } from '../../data/mockData'

export default function MultiEventSelector({ selectedEvents, onEventsChange }) {
  const [search, setSearch] = useState('')
  const [activeCountry, setActiveCountry] = useState('all')

  const filtered = useMemo(() => {
    const selectedIds = new Set(selectedEvents.map(e => e.id))
    const q = search.toLowerCase().trim()
    return upcomingMatchesMock
      .filter(m => !selectedIds.has(m.id))
      .filter(m => activeCountry === 'all' || m.country === activeCountry)
      .filter(m =>
        !q ||
        m.home.toLowerCase().includes(q) ||
        m.away.toLowerCase().includes(q) ||
        m.competition.toLowerCase().includes(q)
      )
  }, [search, selectedEvents, activeCountry])

  // Group filtered matches by competition
  const grouped = useMemo(() => {
    const groups = {}
    for (const match of filtered) {
      if (!groups[match.competition]) {
        groups[match.competition] = []
      }
      groups[match.competition].push(match)
    }
    return groups
  }, [filtered])

  function formatDate(iso) {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-HT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  function addEvent(match) {
    if (selectedEvents.length >= 5) return
    onEventsChange([...selectedEvents, match])
  }

  function removeEvent(matchId) {
    onEventsChange(selectedEvents.filter(m => m.id !== matchId))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">1. Chwazi Match yo</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          selectedEvents.length >= 2 ? 'bg-success/20 text-success' : 'bg-white/10 text-gray-400'
        }`}>
          {selectedEvents.length}/5 match
        </span>
      </div>

      {/* Selected events */}
      {selectedEvents.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedEvents.map((match) => (
            <div key={match.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
              <span className="text-gold text-xs font-medium">{match.home} vs {match.away}</span>
              <button
                onClick={() => removeEvent(match.id)}
                className="text-gold/60 hover:text-gold bg-transparent border-none cursor-pointer p-0"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Country filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {countryFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveCountry(filter.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              activeCountry === filter.key
                ? 'bg-gold/10 text-gold border-gold/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            <span>{filter.flag}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Chèche ekip oswa konpetisyon..."
          className="w-full pl-9 pr-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      {/* Available matches grouped by competition */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {Object.entries(grouped).map(([competition, matches]) => (
          <div key={competition} className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <div className="w-1 h-4 bg-gold/40 rounded-full" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{competition}</span>
              <span className="text-xs text-gray-600">({matches.length})</span>
            </div>
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => addEvent(match)}
                disabled={selectedEvents.length >= 5}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedEvents.length >= 5
                    ? 'bg-dark-surface border-white/5 opacity-50 cursor-not-allowed'
                    : 'bg-dark-surface border-white/10 hover:border-gold/20 hover:bg-gold/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-white font-medium text-sm">{match.home} vs {match.away}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={10} />
                      <span>{formatDate(match.kickoff)}</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={12} className="text-transparent" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
        {Object.keys(grouped).length === 0 && (
          <p className="text-center text-gray-500 text-sm py-4">
            {search || activeCountry !== 'all' ? 'Pa gen match ki koresponn.' : 'Tout match yo deja chwazi.'}
          </p>
        )}
      </div>

      {selectedEvents.length > 0 && selectedEvents.length < 2 && (
        <p className="text-warning text-xs">Ou bezwen omwen 2 match pou kreye yon split.</p>
      )}
    </div>
  )
}
