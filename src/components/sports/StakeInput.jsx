import { DollarSign, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function StakeInput({ stake, onStakeChange, rake = 5 }) {
  const { user } = useAuth()
  const stakeNum = parseInt(stake) || 0
  const potAfterFee = Math.floor(stakeNum * 2 * (1 - rake / 100))
  const isValid = stakeNum >= 500
  const canAfford = stakeNum <= user?.availableBalance

  const quickAmounts = [500, 1000, 2500, 5000]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">3. Montan Miz</h3>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">Montan (HTG) · Min: 500 HTG</label>
        <div className="relative">
          <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="number"
            value={stake}
            onChange={(e) => onStakeChange(e.target.value)}
            placeholder="500"
            min={500}
            className="w-full pl-9 pr-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Quick amounts */}
      <div className="flex gap-2">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => onStakeChange(String(amt))}
            className={`flex-1 py-1.5 text-xs rounded-lg border cursor-pointer transition-colors ${
              stakeNum === amt
                ? 'bg-gold/10 text-gold border-gold/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
            }`}
          >
            {amt.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Payout preview */}
      {stakeNum >= 500 && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Ou mize</span>
            <span className="text-white">{stakeNum.toLocaleString()} HTG</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Advèsè mize</span>
            <span className="text-white">{stakeNum.toLocaleString()} HTG</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Frè platfòm ({rake}%)</span>
            <span className="text-gray-400">-{Math.floor(stakeNum * 2 * rake / 100).toLocaleString()} HTG</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between text-sm">
            <span className="text-gray-300 font-medium">Si ou genyen</span>
            <span className="text-gold font-bold">{potAfterFee.toLocaleString()} HTG</span>
          </div>
        </div>
      )}

      {/* Warnings */}
      {stakeNum > 0 && stakeNum < 500 && (
        <div className="flex items-center gap-2 text-warning text-xs">
          <AlertCircle size={12} /> Montan minimòm se 500 HTG
        </div>
      )}
      {stakeNum >= 500 && !canAfford && (
        <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-3 py-2 rounded-lg">
          <AlertCircle size={14} /> Ou pa gen ase lajan. Balans: {user?.availableBalance.toLocaleString()} HTG
        </div>
      )}
    </div>
  )
}
