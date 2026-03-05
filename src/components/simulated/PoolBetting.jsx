import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const outcomeLabels = { home: 'Lekip Lakay', draw: 'Match Nul', away: 'Lekip Deyò' }
const outcomeColors = { home: 'border-blue-500 bg-blue-500/10', draw: 'border-gray-400 bg-gray-400/10', away: 'border-red-500 bg-red-500/10' }

export default function PoolBetting({ pools, onPlaceBet, disabled }) {
  const { user } = useAuth()
  const [selectedOutcome, setSelectedOutcome] = useState(null)
  const [amount, setAmount] = useState('')
  const totalPool = pools.home.amount + pools.draw.amount + pools.away.amount

  function calculatePayout(outcome) {
    const poolAmount = pools[outcome].amount
    const otherPools = totalPool - poolAmount
    const amountNum = Number(amount) || 0
    if (poolAmount + amountNum === 0) return 0
    const share = amountNum / (poolAmount + amountNum)
    return Math.round(share * (otherPools + poolAmount + amountNum) * 0.95)
  }

  function handleSubmit() {
    if (!selectedOutcome || !amount || Number(amount) < 100) return
    onPlaceBet(selectedOutcome, Number(amount))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-sm">Chwazi Rezilta & Mize</h3>

      {/* Pool sizes */}
      <div className="grid grid-cols-3 gap-2">
        {['home', 'draw', 'away'].map((outcome) => {
          const pool = pools[outcome]
          const pct = totalPool > 0 ? Math.round((pool.amount / totalPool) * 100) : 0
          const isSelected = selectedOutcome === outcome
          return (
            <button
              key={outcome}
              onClick={() => !disabled && setSelectedOutcome(outcome)}
              disabled={disabled}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                isSelected ? outcomeColors[outcome] : 'border-white/10 bg-dark-surface hover:border-white/20'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <p className="text-xs text-gray-400 mb-1">{outcomeLabels[outcome]}</p>
              <p className="text-gold font-bold text-sm">{pool.amount.toLocaleString()} HTG</p>
              <p className="text-gray-500 text-xs">{pool.bets} mize • {pct}%</p>
            </button>
          )
        })}
      </div>

      {/* Pool distribution bar */}
      <div className="w-full h-2 rounded-full flex overflow-hidden">
        {['home', 'draw', 'away'].map((outcome) => {
          const pct = totalPool > 0 ? (pools[outcome].amount / totalPool) * 100 : 33
          const colors = { home: 'bg-blue-500', draw: 'bg-gray-400', away: 'bg-red-500' }
          return <div key={outcome} className={`${colors[outcome]} h-full`} style={{ width: `${pct}%` }} />
        })}
      </div>

      {/* Stake input */}
      {selectedOutcome && !disabled && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Montan Mize (HTG)</label>
            <span className="text-xs text-gray-500">Balans: {user?.availableBalance.toLocaleString()} HTG</span>
          </div>
          <input
            type="number"
            min="100"
            max={user?.availableBalance}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Min: 100 HTG"
            className="w-full bg-dark-accent border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold/50"
          />
          <div className="flex gap-2">
            {[500, 1000, 2500, 5000].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(String(Math.min(v, user?.availableBalance)))}
                className="flex-1 text-xs py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
              >
                {v.toLocaleString()}
              </button>
            ))}
          </div>
          {Number(amount) >= 100 && (
            <div className="bg-gold/5 border border-gold/20 rounded-lg p-3">
              <p className="text-xs text-gray-400">Si <span className="text-white font-medium">{outcomeLabels[selectedOutcome]}</span> genyen:</p>
              <p className="text-gold font-bold text-lg">{calculatePayout(selectedOutcome).toLocaleString()} HTG</p>
              <p className="text-gray-500 text-xs">Peman estimatif (apre 5% frè platfòm)</p>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!amount || Number(amount) < 100 || Number(amount) > user?.availableBalance}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Konfime Mize: {Number(amount || 0).toLocaleString()} HTG sou {outcomeLabels[selectedOutcome]}
          </button>
        </div>
      )}
    </div>
  )
}
