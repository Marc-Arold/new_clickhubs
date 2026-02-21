import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Clock, Trophy, TrendingUp, ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { sivivanLeagues, sivivanTiers } from '../../data/mockData'
import CountdownTimer from './CountdownTimer'

const statusConfig = {
  open: { label: 'Ouvri', color: 'bg-success/20 text-success' },
  active: { label: 'Aktif', color: 'bg-warning/20 text-warning' },
  finished: { label: 'Fini', color: 'bg-white/10 text-gray-400' },
}

const tierColors = {
  sprint: 'bg-danger/20 text-danger',
  kout: 'bg-warning/20 text-warning',
  mwayen: 'bg-success/20 text-success',
  sezon: 'bg-gold/20 text-gold',
}

export default function SivivanPoolCard({ pool }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const league = sivivanLeagues.find(l => l.key === pool.league)
  const tier = sivivanTiers.find(t => t.key === pool.tier)
  const status = statusConfig[pool.status] || statusConfig.open
  const fillPercent = Math.round((pool.totalEntrants / pool.maxEntrants) * 100)

  // Potential gains calculation
  const potentialWin = Math.round(pool.prizePool * 0.90)
  const potentialTop3 = Math.round(pool.prizePool * 0.10 / 3)

  // CTA logic
  const isOpen = pool.status === 'open'
  const isActiveAndIn = pool.status === 'active' && (pool.yourStatus === 'alive' || pool.yourStatus === 'eliminated')
  const isActiveNotIn = pool.status === 'active' && pool.yourStatus === 'not_entered'

  let ctaLabel = 'Wè Detay'
  if (isOpen) ctaLabel = 'Antre'
  else if (pool.yourStatus === 'alive') ctaLabel = 'Kontinye'

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden hover:border-gold/20 transition-all">
      <div className="p-5">
        {/* Header: league + tier + status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{league?.flag}</span>
            <span className="text-white font-medium text-sm">{league?.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tierColors[pool.tier]}`}>
              {tier?.label} ({pool.totalJournees}j)
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Pòt:</span>
            <span className="text-gold font-bold">{pool.prizePool.toLocaleString()} HTG</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Antre:</span>
            <span className="text-white font-medium">{pool.entryFee.toLocaleString()} HTG</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <Users size={14} />
              <span>Jwè:</span>
            </div>
            <span className="text-white font-medium">{pool.totalEntrants} / {pool.maxEntrants}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-gold rounded-full h-1.5 transition-all" style={{ width: `${fillPercent}%` }} />
          </div>

          {/* Journée progress for active/finished pools */}
          {pool.status !== 'open' && (
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Clock size={12} />
              <span>Jounen {pool.currentJournee} sou {pool.totalJournees}</span>
            </div>
          )}

          {/* Entry deadline for open pools */}
          {isOpen && pool.entryDeadline && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Enskrisyon fèmen nan:</span>
              <CountdownTimer targetDate={pool.entryDeadline} />
            </div>
          )}

          {/* Closed entry banner */}
          {isActiveNotIn && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Lock size={12} />
              <span>Enskrisyon fèmen</span>
            </div>
          )}
        </div>

        {/* Potential gains */}
        <div className="bg-gold/5 border border-gold/10 rounded-lg p-2.5 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={12} className="text-gold" />
            <span className="text-gold text-xs font-medium">Gen Potansyèl</span>
          </div>
          <p className="text-gold font-bold text-sm">{potentialWin.toLocaleString()} HTG</p>
          <p className="text-gray-500 text-[10px]">si ou dènye sivivan • {potentialTop3.toLocaleString()} HTG si top 3</p>
        </div>

        {/* CTA + expand */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/sivivan/${pool.id}`)}
            className={`flex-1 font-bold text-sm py-2.5 rounded-lg transition-colors cursor-pointer ${
              isOpen
                ? 'bg-gold hover:bg-gold-light text-dark'
                : pool.yourStatus === 'alive'
                  ? 'bg-gold/20 hover:bg-gold/30 text-gold border border-gold/20'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            {ctaLabel}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors"
          >
            {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Expanded rules */}
      {expanded && pool.rules && (
        <div className="border-t border-white/10 px-5 py-4 bg-dark-accent/30">
          <h4 className="text-white font-medium text-sm mb-2">Règ yo</h4>
          <ul className="space-y-1.5 text-gray-400 text-xs">
            {pool.rules.map((rule, i) => (
              <li key={i}>• {rule}</li>
            ))}
          </ul>
          {pool.payoutStructure && (
            <div className="mt-3 bg-dark-surface rounded-lg p-3">
              <p className="text-gray-500 text-xs mb-1">Estrikti Peman</p>
              {pool.payoutStructure.map((p, i) => (
                <p key={i} className="text-gold text-sm font-medium">
                  {p.place}: {p.payout}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
