import { useNavigate } from 'react-router-dom'
import { Users, TrendingUp, Layers, ArrowRight } from 'lucide-react'
import CountdownTimer from './CountdownTimer'

const statusConfig = {
  open: { label: 'Ouvri', color: 'bg-success/20 text-success' },
  live: { label: 'Live', color: 'bg-warning/20 text-warning' },
  settling: { label: 'Ap kalkile', color: 'bg-warning/20 text-warning' },
  completed: { label: 'Fini', color: 'bg-white/10 text-gray-400' },
  cancelled: { label: 'Anile', color: 'bg-danger/20 text-danger' },
}

export default function SplitCard({ split }) {
  const navigate = useNavigate()
  const status = statusConfig[split.status] || statusConfig.open
  const fillPercent = Math.round((split.currentPlayers / split.maxPlayers) * 100)
  const potentialPayout = Math.round(split.playerEntryFee * split.totalOdds)
  const slotsLeft = split.maxPlayers - split.currentPlayers

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden hover:border-gold/20 transition-all">
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
              <span className="text-gold text-xs font-bold">{split.creatorInitials}</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{split.creatorName}</p>
              <p className="text-gray-500 text-xs">Bankè</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gold/10 text-gold text-xs font-bold px-2 py-0.5 rounded-full">
              {split.totalOdds.toFixed(2)}x
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Event count */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Layers size={12} />
          <span>{split.events.length} match nan split sa a</span>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Antre:</span>
            <span className="text-white font-medium">{split.playerEntryFee.toLocaleString()} HTG</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <Users size={14} />
              <span>Jwè:</span>
            </div>
            <span className="text-white font-medium">{split.currentPlayers} / {split.maxPlayers}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-gold rounded-full h-1.5 transition-all" style={{ width: `${fillPercent}%` }} />
          </div>

          {/* Join deadline */}
          {split.status === 'open' && split.joinDeadline && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Fèmen nan:</span>
              <CountdownTimer targetDate={split.joinDeadline} />
            </div>
          )}
        </div>

        {/* Potential payout */}
        <div className="bg-gold/5 border border-gold/10 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={12} className="text-gold" />
            <span className="text-gold text-xs font-medium">Gen Potansyèl</span>
          </div>
          <p className="text-gold font-bold text-sm">
            {split.playerEntryFee.toLocaleString()} HTG → {potentialPayout.toLocaleString()} HTG
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate(`/bank-pari/${split.id}`)}
          className={`w-full font-bold text-sm py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            split.status === 'open' && slotsLeft > 0
              ? 'bg-gold hover:bg-gold-light text-dark'
              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
          }`}
        >
          {split.status === 'open' && slotsLeft > 0 ? (
            <>Antre — {split.playerEntryFee.toLocaleString()} HTG</>
          ) : (
            <>Wè Detay <ArrowRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  )
}
