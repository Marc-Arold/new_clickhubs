import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Info } from 'lucide-react'
import { pronosContestsMock, pronosLeaderboardMock } from '../data/mockData'

const STATUS_STYLES = {
  pending: 'text-gray-400 bg-white/5',
  won: 'text-success bg-success/10',
  lost: 'text-danger bg-danger/10',
}
const STATUS_LABELS = { pending: 'An kou', won: 'Genyen', lost: 'Pèdi' }

const MEDALS = ['🥇', '🥈', '🥉']

export default function PronosPalmaresPage() {
  const { contestId } = useParams()
  const navigate = useNavigate()

  const contest = pronosContestsMock.find(c => c.id === contestId)
  if (!contest) {
    return (
      <div className="max-w-4xl space-y-6">
        <button onClick={() => navigate('/pronos')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Tout Konkurans
        </button>
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Konkurans sa a pa egziste.</p>
        </div>
      </div>
    )
  }

  const deadline = new Date(contest.deadline)
  const now = new Date()
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
  const netPool = Math.round(contest.jackpot * (1 - contest.platformFee))

  // Compute proportional potential gain for display
  const totalOddsSum = pronosLeaderboardMock
    .filter(p => p.status !== 'lost')
    .reduce((acc, p) => acc + p.totalOdds, 0)

  const leaderboard = pronosLeaderboardMock.map(p => {
    const propGain = totalOddsSum > 0
      ? Math.round((p.totalOdds / totalOddsSum) * netPool)
      : 0
    const floorGain = Math.round(p.totalOdds * contest.entryFee)
    return {
      ...p,
      propGain,
      displayGain: p.status === 'lost' ? 0 : Math.max(propGain, floorGain),
    }
  })

  const userRow = leaderboard.find(p => p.isUser)

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/pronos/${contestId}`)}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} /> {contest.name}
        </button>
        <span className="text-gray-700 text-xs">|</span>
        <button onClick={() => navigate('/pronos')} className="text-gray-500 hover:text-white text-xs bg-transparent border-none cursor-pointer p-0">
          Lòbi Pronos
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-black text-white">🏆 Palmarès</h1>
        <p className="text-gray-400 text-sm mt-1">{contest.name} — Klasman an dirèk</p>
      </div>

      {/* Jackpot + deadline bar */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Jackpot</p>
            <p className="text-gold font-black text-lg">{contest.jackpot.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Pòt nèt (95%)</p>
            <p className="text-white font-bold">{netPool.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Rete</p>
            <p className="text-white font-bold flex items-center gap-1">
              <Clock size={13} /> {daysLeft}j
            </p>
          </div>
        </div>
      </div>

      {/* Distribution info */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-start gap-3">
        <Info size={14} className="text-gold shrink-0 mt-0.5" />
        <p className="text-gray-400 text-xs">
          Klasman baze sou <span className="text-white font-medium">kote total fich</span> chak jwè. Genyan resevwa pati pwopòsyonèl: pi gwo kote = pi gwo share. Chifè "Gain Potansyèl" yo montre distribisyon si tout match kòrèk jodi a.
        </p>
      </div>

      {/* User's own row */}
      {userRow && (
        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4">
          <p className="text-gold font-bold text-xs uppercase tracking-wide mb-2">Pozisyon Ou</p>
          <div className="flex items-center gap-3">
            <span className="text-lg w-8 text-center shrink-0">
              {userRow.rank <= 3 ? MEDALS[userRow.rank - 1] : `#${userRow.rank}`}
            </span>
            <div className="flex-1">
              <p className="text-gold font-bold text-sm">{userRow.username}</p>
              <p className="text-gray-400 text-xs">Kote: <span className="text-white font-bold">{userRow.totalOdds.toFixed(1)}</span> · {userRow.ficheEvents} evènman</p>
            </div>
            <div className="text-right">
              <p className="text-gold font-black text-base">{userRow.displayGain.toLocaleString()} HTG</p>
              <p className="text-gray-500 text-[10px]">Gain potansyèl</p>
            </div>
          </div>
        </div>
      )}

      {/* Full leaderboard */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <p className="text-white font-semibold text-sm">Tout Patisipan</p>
          <p className="text-gray-500 text-xs">{pronosLeaderboardMock.length} jwè</p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 px-5 py-2 border-b border-white/5 text-[10px] text-gray-600 uppercase tracking-wider font-bold">
          <span>Rk</span>
          <span>Jwè</span>
          <span className="text-right">Kote</span>
          <span className="text-right hidden sm:block">Gain potansyèl</span>
        </div>

        <div className="divide-y divide-white/5">
          {leaderboard.map((p, idx) => {
            const medal = idx < 3 ? MEDALS[idx] : null
            return (
              <div
                key={p.username}
                className={`grid grid-cols-[auto_1fr_auto_auto] gap-3 px-5 py-3 items-center transition-colors ${
                  p.isUser ? 'bg-gold/5' : idx < 3 ? 'bg-white/5' : ''
                }`}
              >
                {/* Rank */}
                <span className={`text-sm w-8 text-center shrink-0 ${
                  idx === 0 ? 'text-gold' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-amber-600' : 'text-gray-600 text-xs'
                }`}>
                  {medal ?? `${p.rank}`}
                </span>

                {/* Player info */}
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${p.isUser ? 'text-gold' : 'text-white'}`}>
                    {p.username} {p.isUser && <span className="text-xs font-normal text-gray-500">(Ou)</span>}
                  </p>
                  <p className="text-gray-600 text-[10px]">{p.ficheEvents} evènman · {p.ficheCount} fich</p>
                </div>

                {/* Odds */}
                <div className="text-right">
                  <p className={`text-sm font-bold ${p.status === 'lost' ? 'text-gray-600 line-through' : p.isUser ? 'text-gold' : 'text-white'}`}>
                    ×{p.totalOdds.toFixed(1)}
                  </p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${STATUS_STYLES[p.status]}`}>
                    {STATUS_LABELS[p.status]}
                  </span>
                </div>

                {/* Potential gain — hidden on mobile */}
                <div className="text-right hidden sm:block">
                  {p.status === 'lost' ? (
                    <span className="text-gray-600 text-xs">—</span>
                  ) : (
                    <p className={`text-sm font-bold ${p.isUser ? 'text-gold' : 'text-gray-300'}`}>
                      {p.displayGain.toLocaleString()}
                      <span className="text-[9px] text-gray-600 ml-0.5">HTG</span>
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/pronos/${contestId}`)}
          className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
        >
          Konkurans
        </button>
        <button
          onClick={() => navigate('/pronos')}
          className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
        >
          Tout Konkurans
        </button>
      </div>
    </div>
  )
}
