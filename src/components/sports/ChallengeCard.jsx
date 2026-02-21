import { Swords, Clock, Trophy } from 'lucide-react'
import CountdownTimer from './CountdownTimer'

const pickLabels = { home: 'Lakay', draw: 'Match Nul', away: 'Deyò' }
const statusLabels = {
  pending: { label: 'Ap tann advèsè', color: 'bg-warning/20 text-warning' },
  active: { label: 'Aktif', color: 'bg-success/20 text-success' },
  completed: { label: 'Fini', color: 'bg-white/10 text-gray-400' },
}

export default function ChallengeCard({ challenge, isCreator = true }) {
  const status = statusLabels[challenge.status]

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Swords size={20} className="text-gold" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">Head-to-Head</p>
            <p className="text-xs text-gray-500">{challenge.match.competition}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Match */}
      <div className="px-5 py-4 text-center border-b border-white/10">
        <p className="text-white font-bold text-lg">{challenge.match.home} vs {challenge.match.away}</p>
        <div className="mt-2">
          <CountdownTimer targetDate={challenge.match.kickoff} label="Kòmanse nan:" />
        </div>
      </div>

      {/* Players */}
      <div className="px-5 py-4 grid grid-cols-2 gap-4">
        {/* Creator */}
        <div className={`text-center p-3 rounded-xl border ${isCreator ? 'border-gold/20 bg-gold/5' : 'border-white/10 bg-white/5'}`}>
          <p className="text-xs text-gray-500 mb-1">{isCreator ? 'Ou' : 'Advèsè'}</p>
          <p className="text-white font-bold text-sm">{challenge.creatorName}</p>
          <p className="text-gold text-xs font-medium mt-1">
            {challenge.creatorPick ? `${challenge.match[challenge.creatorPick === 'home' ? 'home' : challenge.creatorPick === 'away' ? 'away' : '']} ${challenge.creatorPick === 'draw' ? 'Match Nul' : ''}`.trim() : '—'}
          </p>
        </div>

        {/* Opponent */}
        <div className={`text-center p-3 rounded-xl border ${!isCreator ? 'border-gold/20 bg-gold/5' : 'border-white/10 bg-white/5'}`}>
          <p className="text-xs text-gray-500 mb-1">{!isCreator ? 'Ou' : 'Advèsè'}</p>
          <p className="text-white font-bold text-sm">{challenge.opponentName || 'Ap tann...'}</p>
          <p className="text-gold text-xs font-medium mt-1">
            {challenge.opponentPick ? `${challenge.match[challenge.opponentPick === 'home' ? 'home' : challenge.opponentPick === 'away' ? 'away' : '']} ${challenge.opponentPick === 'draw' ? 'Match Nul' : ''}`.trim() : '—'}
          </p>
        </div>
      </div>

      {/* Stake info */}
      <div className="px-5 py-3 bg-dark-accent/30 border-t border-white/10 flex justify-between text-sm">
        <span className="text-gray-400">Miz chak jwè</span>
        <span className="text-white font-bold">{challenge.stake.toLocaleString()} HTG</span>
      </div>
      <div className="px-5 py-3 flex justify-between text-sm">
        <span className="text-gray-400">Genyan resevwa</span>
        <span className="text-gold font-bold">{challenge.potAfterFee.toLocaleString()} HTG</span>
      </div>

      {/* Result */}
      {challenge.status === 'completed' && challenge.winner && (
        <div className={`px-5 py-4 border-t border-white/10 text-center ${
          challenge.winner === (isCreator ? 'creator' : 'opponent') ? 'bg-success/10' : 'bg-danger/10'
        }`}>
          <Trophy size={20} className={`mx-auto mb-1 ${
            challenge.winner === (isCreator ? 'creator' : 'opponent') ? 'text-success' : 'text-danger'
          }`} />
          <p className={`font-bold ${
            challenge.winner === (isCreator ? 'creator' : 'opponent') ? 'text-success' : 'text-danger'
          }`}>
            {challenge.winner === (isCreator ? 'creator' : 'opponent') ? 'Ou Genyen!' : 'Ou Pèdi'}
          </p>
        </div>
      )}
    </div>
  )
}
