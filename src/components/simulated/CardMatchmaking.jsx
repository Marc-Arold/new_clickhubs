import { useState } from 'react'
import { Zap, Plus, Trophy } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const modes = [
  { key: 'quick', label: 'Quick Match', desc: 'Match enstantane ak yon jwè menm montan', icon: Zap },
  { key: 'create', label: 'Kreye Tab', desc: 'Mete montan + envite yon zanmi', icon: Plus },
  { key: 'tournament', label: 'Tounwa', desc: 'Bracket 16 jwè — eliminasyon', icon: Trophy },
]

const quickStakes = [500, 1000, 2500, 5000]

export default function CardMatchmaking({ onMatch }) {
  const { user } = useAuth()
  const [selectedMode, setSelectedMode] = useState(null)
  const [stake, setStake] = useState('')
  const [searching, setSearching] = useState(false)

  async function handleSearch() {
    setSearching(true)
    await new Promise(r => setTimeout(r, 2000))
    onMatch(selectedMode, Number(stake))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-sm">Chwazi Mòd Jwèt</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setSelectedMode(mode.key)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
              selectedMode === mode.key
                ? 'border-gold bg-gold/10'
                : 'border-white/10 bg-dark-surface hover:border-white/20'
            }`}
          >
            <mode.icon size={20} className={selectedMode === mode.key ? 'text-gold' : 'text-gray-400'} />
            <p className="text-white font-medium text-sm mt-2">{mode.label}</p>
            <p className="text-gray-500 text-xs mt-1">{mode.desc}</p>
          </button>
        ))}
      </div>

      {selectedMode && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Montan Mize (HTG)</label>
            <span className="text-xs text-gray-500">Balans: {user?.availableBalance.toLocaleString()} HTG</span>
          </div>
          <div className="flex gap-2">
            {quickStakes.map((v) => (
              <button
                key={v}
                onClick={() => setStake(String(Math.min(v, user?.availableBalance)))}
                className={`flex-1 text-xs py-2 rounded-lg border cursor-pointer transition-colors ${
                  stake === String(v)
                    ? 'bg-gold/10 border-gold/30 text-gold'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {v.toLocaleString()}
              </button>
            ))}
          </div>
          {Number(stake) >= 500 && (
            <div className="bg-gold/5 border border-gold/20 rounded-lg p-3">
              <p className="text-xs text-gray-400">Peman si ou genyen:</p>
              <p className="text-gold font-bold">{Math.round(Number(stake) * 2 * 0.95).toLocaleString()} HTG</p>
              <p className="text-gray-500 text-xs">({stake} × 2 mwens 5% frè)</p>
            </div>
          )}
          <button
            onClick={handleSearch}
            disabled={!stake || Number(stake) < 500 || Number(stake) > user?.availableBalance || searching}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                Ap chèche advèsè...
              </span>
            ) : (
              'Jwenn yon Match'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
