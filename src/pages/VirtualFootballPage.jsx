import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Trophy, XCircle } from 'lucide-react'
import { virtualMatchesMock } from '../data/mockData'
import { placeVirtualBet } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import VirtualTeamCard from '../components/simulated/VirtualTeamCard'
import PoolBetting from '../components/simulated/PoolBetting'
import MatchSimulation from '../components/simulated/MatchSimulation'
import VerifyResultModal from '../components/simulated/VerifyResultModal'

function KickoffCountdown({ seconds: initial, onEnd }) {
  const [sec, setSec] = useState(initial)
  useEffect(() => {
    if (sec <= 0) { onEnd(); return }
    const t = setTimeout(() => setSec(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [sec, onEnd])
  return (
    <span className="text-4xl font-bold text-gold">{sec}</span>
  )
}

export default function VirtualFootballPage() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()
  const match = virtualMatchesMock.find(m => m.id === matchId)

  const [phase, setPhase] = useState('pre-match')
  const [bet, setBet] = useState(null)
  const [showVerify, setShowVerify] = useState(false)

  if (!match) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Match sa a pa egziste.</p>
        </div>
      </div>
    )
  }

  const outcomeLabels = { home: match.homeTeam.name, draw: 'Match Nul', away: match.awayTeam.name }

  async function handlePlaceBet(outcome, amount) {
    try {
      await placeVirtualBet(match.id, outcome, amount)
      updateBalance(user.availableBalance - amount, user.escrowedBalance + amount)
      setBet({ outcome, amount })
      setPhase('countdown')
    } catch {
      // API error — don't deduct balance
    }
  }

  function handleCountdownEnd() {
    setPhase('live')
  }

  function handleSimulationFinish() {
    setPhase('finished')
    if (bet) {
      const isWin = bet.outcome === match.result
      if (isWin) {
        const pool = match.pools[bet.outcome]
        const totalPool = match.pools.home.amount + match.pools.draw.amount + match.pools.away.amount + bet.amount
        const share = bet.amount / (pool.amount + bet.amount)
        const winPayout = Math.round(share * totalPool * 0.95)
        updateBalance(user.availableBalance + winPayout, user.escrowedBalance - bet.amount)
      } else {
        updateBalance(undefined, user.escrowedBalance - bet.amount)
      }
    }
  }

  const resultText = match.finalScore ? `${match.homeTeam.name} ${match.finalScore.home} - ${match.finalScore.away} ${match.awayTeam.name}` : ''
  const won = bet && bet.outcome === match.result
  const payout = (() => {
    if (!bet || !won) return 0
    const pool = match.pools[bet.outcome]
    const totalPool = match.pools.home.amount + match.pools.draw.amount + match.pools.away.amount + bet.amount
    const share = bet.amount / (pool.amount + bet.amount)
    return Math.round(share * totalPool * 0.95)
  })()

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <h1 className="text-2xl font-bold text-white">Foutbòl Vityèl</h1>
        <p className="text-gray-400 text-sm mt-1">Match simile pa RNG sètifye — rezilta nan kèk minit.</p>
      </div>

      {/* RNG Seed */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-3 flex items-center gap-2">
        <ShieldCheck size={16} className="text-gold shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Semans RNG (Hash):</p>
          <p className="text-xs text-gold font-mono truncate">{match.seedHash}</p>
        </div>
      </div>

      {/* Teams matchup */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-6">
        <div className="flex items-center">
          <VirtualTeamCard team={match.homeTeam} side="home" />
          <div className="px-4 text-center">
            {phase === 'finished' ? (
              <div className="text-2xl font-bold text-white">
                {match.finalScore.home} - {match.finalScore.away}
              </div>
            ) : phase === 'live' ? (
              <div className="text-gold font-bold text-sm animate-pulse">AN KOU</div>
            ) : (
              <div className="text-gray-500 font-bold text-lg">VS</div>
            )}
          </div>
          <VirtualTeamCard team={match.awayTeam} side="away" />
        </div>
      </div>

      {/* Phase: Pre-match — Betting */}
      {phase === 'pre-match' && (
        <PoolBetting pools={match.pools} onPlaceBet={handlePlaceBet} disabled={false} />
      )}

      {/* Phase: Countdown */}
      {phase === 'countdown' && (
        <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <p className="text-gray-400 text-sm">Mize ou anrejistre! Match la kòmanse nan:</p>
          <KickoffCountdown seconds={10} onEnd={handleCountdownEnd} />
          <div className="bg-gold/5 border border-gold/20 rounded-lg p-3 inline-block">
            <p className="text-xs text-gray-400">Ou mize: <span className="text-gold font-bold">{bet.amount.toLocaleString()} HTG</span> sou <span className="text-white font-medium">{outcomeLabels[bet.outcome]}</span></p>
          </div>
        </div>
      )}

      {/* Phase: Live simulation */}
      {phase === 'live' && (
        <MatchSimulation commentary={match.commentary} onFinish={handleSimulationFinish} />
      )}

      {/* Phase: Finished */}
      {phase === 'finished' && (
        <div className="space-y-4">
          {bet ? (
            <div className={`rounded-2xl p-6 text-center space-y-3 ${
              won ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'
            }`}>
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${
                won ? 'bg-success/20' : 'bg-danger/20'
              }`}>
                {won ? <Trophy size={28} className="text-success" /> : <XCircle size={28} className="text-danger" />}
              </div>
              <p className={`text-xl font-bold ${won ? 'text-success' : 'text-danger'}`}>
                {won ? 'OU GENYEN!' : 'Pa gen chans fwa sa a'}
              </p>
              <p className="text-white font-medium">{resultText}</p>
              {won ? (
                <p className="text-gold text-lg font-bold">+{payout.toLocaleString()} HTG kredite nan kont ou</p>
              ) : (
                <>
                  <p className="text-gray-400 text-sm">Mize ou: {bet.amount.toLocaleString()} HTG sou {outcomeLabels[bet.outcome]}</p>
                  <p className="text-gray-500 text-xs">Pwochen match kòmanse nan kèk minit — eseye ankò!</p>
                </>
              )}
            </div>
          ) : (
            <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-white font-bold text-lg">{resultText}</p>
              <p className="text-gray-400 text-sm mt-2">Ou pa t mize sou match sa a.</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowVerify(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
            >
              <ShieldCheck size={16} />
              Verifye Rezilta
            </button>
            <button
              onClick={() => navigate('/jwet')}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Pwochen Match
            </button>
          </div>
        </div>
      )}

      {showVerify && (
        <VerifyResultModal
          seedHash={match.seedHash}
          result={resultText}
          onClose={() => setShowVerify(false)}
        />
      )}
    </div>
  )
}
