import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { denyeSivivanPoolsMock, sivivanLeagues, sivivanTiers } from '../data/mockData'
import SivivanPoolCard from '../components/sports/SivivanPoolCard'

export default function DenyeSivivanLobbyPage() {
  const navigate = useNavigate()
  const [activeLeague, setActiveLeague] = useState('all')
  const [activeTier, setActiveTier] = useState('all')

  const filteredPools = useMemo(() => {
    return denyeSivivanPoolsMock
      .filter(p => activeLeague === 'all' || p.league === activeLeague)
      .filter(p => activeTier === 'all' || p.tier === activeTier)
      .sort((a, b) => {
        // Open first, then active, then finished
        const order = { open: 0, active: 1, finished: 2 }
        return (order[a.status] ?? 3) - (order[b.status] ?? 3)
      })
  }, [activeLeague, activeTier])

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/jwet')}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
            <Shield size={24} className="text-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Dènye Sivivan</h1>
            <p className="text-gray-400 text-sm">
              Chwazi yon ekip chak jounen. Si ekip ou genyen, ou siviv. Dènye sivivan an pran pòt la.
            </p>
          </div>
        </div>
      </div>

      {/* League tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setActiveLeague('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${
            activeLeague === 'all'
              ? 'bg-gold/10 text-gold border-gold/20'
              : 'bg-white/5 text-gray-400 hover:text-white border-white/10 hover:border-white/20'
          }`}
        >
          Tout Lig
        </button>
        {sivivanLeagues.map(league => (
          <button
            key={league.key}
            onClick={() => setActiveLeague(league.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              activeLeague === league.key
                ? 'bg-gold/10 text-gold border-gold/20'
                : 'bg-white/5 text-gray-400 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            {league.flag} {league.label}
          </button>
        ))}
      </div>

      {/* Tier filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setActiveTier('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
            activeTier === 'all'
              ? 'bg-white/10 text-white border-white/20'
              : 'bg-transparent text-gray-500 border-white/10 hover:text-gray-300'
          }`}
        >
          Tout
        </button>
        {sivivanTiers.map(tier => (
          <button
            key={tier.key}
            onClick={() => setActiveTier(tier.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              activeTier === tier.key
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-transparent text-gray-500 border-white/10 hover:text-gray-300'
            }`}
          >
            {tier.label} ({tier.journees}j) · {tier.entryFee.toLocaleString()} HTG
          </button>
        ))}
      </div>

      {/* Pool count */}
      <p className="text-gray-500 text-sm">
        {filteredPools.length} pool{filteredPools.length !== 1 ? ' yo' : ''} disponib
      </p>

      {/* Pool grid */}
      {filteredPools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPools.map(pool => (
            <SivivanPoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Pa gen pool ki koresponn ak filtè ou yo.</p>
          <button
            onClick={() => { setActiveLeague('all'); setActiveTier('all') }}
            className="mt-3 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            Efase filtè yo
          </button>
        </div>
      )}
    </div>
  )
}
