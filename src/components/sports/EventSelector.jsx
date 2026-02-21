import { useState, useMemo } from 'react'
import { Search, Calendar, ChevronRight } from 'lucide-react'
import { upcomingMatchesMock } from '../../data/mockData'

export default function EventSelector({ selectedMatch, onSelect }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return upcomingMatchesMock
    const q = search.toLowerCase()
    return upcomingMatchesMock.filter(m =>
      m.home.toLowerCase().includes(q) ||
      m.away.toLowerCase().includes(q) ||
      m.competition.toLowerCase().includes(q)
    )
  }, [search])

  function formatDate(iso) {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-HT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">1. Chwazi yon Match</h3>

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

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filtered.map((match) => (
          <button
            key={match.id}
            onClick={() => onSelect(match)}
            className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
              selectedMatch?.id === match.id
                ? 'bg-gold/10 border-gold/20'
                : 'bg-dark-surface border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-white font-medium text-sm">{match.home} vs {match.away}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-gold">{match.competition}</span>
                  <span>·</span>
                  <Calendar size={10} />
                  <span>{formatDate(match.kickoff)}</span>
                </div>
              </div>
              <ChevronRight size={16} className={selectedMatch?.id === match.id ? 'text-gold' : 'text-gray-600'} />
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-4">Pa gen match ki koresponn.</p>
        )}
      </div>
    </div>
  )
}
