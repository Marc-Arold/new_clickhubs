import { DollarSign, Users, AlertCircle, TrendingUp, ShieldAlert } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function EscrowCalculator({ totalOdds, entryFee, escrow, onEscrowChange }) {
  const { user } = useAuth()
  const escrowNum = parseInt(escrow) || 0
  const entryFeeNum = parseInt(entryFee) || 0
  const minEscrow = 10000

  const payoutPerPlayer = entryFeeNum > 0 ? Math.round(entryFeeNum * totalOdds) : 0
  const netPayoutPerPlayer = payoutPerPlayer - entryFeeNum
  const maxPlayers = netPayoutPerPlayer > 0 ? Math.floor(escrowNum / netPayoutPerPlayer) : 0
  const canAfford = escrowNum <= user.availableBalance

  const creatorProfitIfWins = maxPlayers > 0
    ? Math.round(maxPlayers * entryFeeNum * 0.90)
    : 0

  const quickAmounts = [10000, 25000, 50000, 100000]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">5. Eskwo & Plas</h3>
      <p className="text-xs text-gray-500">
        Depoze lajan an eskwo pou kouvri peyman jwè yo si yo genyen. Plis ou depoze, plis plas ou genyen.
      </p>

      {/* Escrow input */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">Montan Eskwo (HTG) · Min: 10,000 HTG</label>
        <div className="relative">
          <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="number"
            value={escrow}
            onChange={(e) => onEscrowChange(e.target.value)}
            placeholder="10000"
            min={minEscrow}
            className="w-full pl-9 pr-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Quick amounts */}
      <div className="flex gap-2">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => onEscrowChange(String(amt))}
            className={`flex-1 py-1.5 text-xs rounded-lg border cursor-pointer transition-colors ${
              escrowNum === amt
                ? 'bg-gold/10 text-gold border-gold/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
            }`}
          >
            {(amt / 1000)}K
          </button>
        ))}
      </div>

      {/* Calculator results */}
      {escrowNum >= minEscrow && entryFeeNum > 0 && totalOdds > 1 && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Users size={14} />
              <span>Plas disponib</span>
            </div>
            <span className="text-white font-bold text-lg">{maxPlayers} jwè</span>
          </div>

          <div className="border-t border-white/10 pt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Peyman pa jwè si genyen</span>
              <span className="text-white">{payoutPerPlayer.toLocaleString()} HTG</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Eskwo ou (garanti)</span>
              <span className="text-white">{escrowNum.toLocaleString()} HTG</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 space-y-2">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={12} className="text-gold" />
              <span className="text-gold text-xs font-medium">Si ou genyen (tout jwè pèdi)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Pwofi (apre 10% frè)</span>
              <span className="text-gold font-bold">{creatorProfitIfWins.toLocaleString()} HTG</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldAlert size={12} className="text-danger" />
              <span className="text-danger text-xs font-medium">Si jwè yo genyen (tout match kòrèk)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Ou peye</span>
              <span className="text-danger font-bold">{(maxPlayers * payoutPerPlayer).toLocaleString()} HTG</span>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      {escrowNum > 0 && escrowNum < minEscrow && (
        <div className="flex items-center gap-2 text-warning text-xs">
          <AlertCircle size={12} /> Eskwo minimòm se 10,000 HTG
        </div>
      )}
      {escrowNum >= minEscrow && !canAfford && (
        <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-3 py-2 rounded-lg">
          <AlertCircle size={14} /> Ou pa gen ase lajan. Balans: {user.availableBalance.toLocaleString()} HTG
        </div>
      )}
    </div>
  )
}
