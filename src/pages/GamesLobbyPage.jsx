import { useState, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import GameFilterBar from '../components/games/GameFilterBar'
import GameSearch from '../components/games/GameSearch'
import GameLobbyCard from '../components/games/GameLobbyCard'
import { lobbyGamesMock } from '../data/mockData'

const sortOptions = [
  { key: 'prizePool', label: 'Pli Gwo Pòt' },
  { key: 'startsIn', label: 'Pi Vit Kòmanse' },
  { key: 'playersIn', label: 'Plis Jwè' },
  { key: 'entryFee', label: 'Frè (Ba → Wo)' },
]

export default function GamesLobbyPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('prizePool')
  const [showSort, setShowSort] = useState(false)

  const filteredGames = useMemo(() => {
    let games = [...lobbyGamesMock]

    // Filter by category
    if (activeFilter !== 'all' && activeFilter !== 'my-entries') {
      games = games.filter(g => g.type === activeFilter)
    }

    // Search
    if (searchQuery.trim()) {
      games = games.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    games.sort((a, b) => {
      if (sortBy === 'prizePool') return b.prizePool - a.prizePool
      if (sortBy === 'playersIn') return b.playersIn - a.playersIn
      if (sortBy === 'entryFee') return a.entryFee - b.entryFee
      return 0
    })

    return games
  }, [activeFilter, searchQuery, sortBy])

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Lòbi Jwèt</h1>
        <p className="text-gray-400 text-sm">Eksplore, filtre, epi antre nan nenpòt jwèt ki disponib.</p>
      </div>

      <GameFilterBar active={activeFilter} onChange={setActiveFilter} />

      <div className="flex gap-3">
        <div className="flex-1">
          <GameSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-gray-400 text-sm hover:text-white hover:border-white/20 cursor-pointer transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Triye</span>
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-dark-accent border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setSortBy(opt.key); setShowSort(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors border-none ${
                    sortBy === opt.key
                      ? 'bg-gold/10 text-gold'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">
            Pa gen jwèt disponib nan kategori sa a kounye a.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Nouvo jwèt ouvri chak jou — retounen oswa aktive notifikasyon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <GameLobbyCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
