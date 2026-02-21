import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Trophy, XCircle, RotateCcw } from 'lucide-react'
import { cardGameMock, cardHandRankings } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { findCardMatch, readyCardGame, requestRematch } from '../utils/api'
import CardMatchmaking from '../components/simulated/CardMatchmaking'
import CardHand from '../components/simulated/CardHand'

export default function CardShowdownPage() {
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()
  const game = cardGameMock

  const [phase, setPhase] = useState('matchmaking') // matchmaking | pre-game | dealing | reveal | finished
  const [matchInfo, setMatchInfo] = useState(null)
  const [ready, setReady] = useState(false)
  const [showRules, setShowRules] = useState(false)

  async function handleMatch(mode, stake) {
    try {
      await findCardMatch(mode, stake)
      updateBalance(user.availableBalance - stake, user.escrowedBalance + stake)
      setMatchInfo({ mode, stake, opponent: game.opponent })
      setPhase('pre-game')
    } catch {
      // API error — don't deduct balance
    }
  }

  async function handleReady() {
    await readyCardGame(game.id)
    setReady(true)
    setTimeout(() => setPhase('dealing'), 1500)
  }

  function handleReveal() {
    setPhase('reveal')
    setTimeout(() => setPhase('finished'), 2000)
  }

  async function handleRematch() {
    await requestRematch(game.id)
    setPhase('dealing')
    setReady(false)
    setTimeout(() => {
      setReady(true)
      setTimeout(() => setPhase('reveal'), 1500)
    }, 1000)
  }

  const won = game.winner === 'you'
  const payout = game.potAfterFee

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">P2P Card Showdown</h1>
            <p className="text-gray-400 text-sm mt-1">Batay kat 1v1 — pi gwo men an genyen!</p>
          </div>
          <button
            onClick={() => setShowRules(!showRules)}
            className="text-xs text-gold hover:underline cursor-pointer bg-transparent border-none"
          >
            {showRules ? 'Kache Règ' : 'Wè Règ'}
          </button>
        </div>
      </div>

      {/* Rules */}
      {showRules && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium text-sm mb-3">Klasman Men</h4>
          <div className="space-y-1.5">
            {cardHandRankings.map((h) => (
              <div key={h.rank} className="flex items-center justify-between text-xs">
                <span className="text-gray-300">
                  <span className="text-gold font-bold mr-2">{h.rank}.</span>
                  {h.name}
                </span>
                <span className="text-gray-500">{h.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase: Matchmaking */}
      {phase === 'matchmaking' && (
        <CardMatchmaking onMatch={handleMatch} />
      )}

      {/* Phase: Pre-game */}
      {phase === 'pre-game' && matchInfo && (
        <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">Match jwenn!</p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                  <span className="text-gold font-bold">{user.displayName.charAt(0)}</span>
                </div>
                <p className="text-white text-sm font-medium mt-1">Ou</p>
              </div>
              <span className="text-gray-500 font-bold">VS</span>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <span className="text-gray-400 font-bold">{matchInfo.opponent.charAt(1)}</span>
                </div>
                <p className="text-white text-sm font-medium mt-1">{matchInfo.opponent}</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-accent rounded-lg p-3 text-center">
            <p className="text-gray-500 text-xs">Mize</p>
            <p className="text-gold font-bold text-xl">{matchInfo.stake.toLocaleString()} HTG</p>
            <p className="text-gray-500 text-xs">Pòt apre frè: {Math.round(matchInfo.stake * 2 * 0.95).toLocaleString()} HTG</p>
          </div>

          <button
            onClick={handleReady}
            disabled={ready}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50"
          >
            {ready ? 'Ap distribye kat...' : 'Pare!'}
          </button>
        </div>
      )}

      {/* Phase: Dealing / Reveal / Finished */}
      {(phase === 'dealing' || phase === 'reveal' || phase === 'finished') && (
        <div className="space-y-6">
          {/* Stake info */}
          <div className="bg-dark-surface border border-white/10 rounded-xl p-3 flex items-center justify-between">
            <span className="text-gray-400 text-sm">Pòt:</span>
            <span className="text-gold font-bold">{payout.toLocaleString()} HTG</span>
          </div>

          {/* Cards */}
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-6">
              <CardHand
                cards={game.yourHand.cards}
                hidden={phase === 'dealing'}
                label="Men Ou"
                handName={game.yourHand.name}
                isWinner={phase !== 'dealing' && won}
              />
              <CardHand
                cards={game.opponentHand.cards}
                hidden={phase === 'dealing'}
                label={matchInfo?.opponent || game.opponent}
                handName={game.opponentHand.name}
                isWinner={phase !== 'dealing' && !won}
              />
            </div>

            {phase === 'dealing' && (
              <div className="text-center mt-6">
                <button
                  onClick={handleReveal}
                  className="px-8 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
                >
                  Revele Kat!
                </button>
              </div>
            )}
          </div>

          {/* Result */}
          {phase === 'finished' && (
            <div className="space-y-4">
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
                <p className="text-white text-sm">
                  Men ou: <span className="font-bold">{game.yourHand.name}</span> • Advèsè: <span className="font-bold">{game.opponentHand.name}</span>
                </p>
                {won && (
                  <p className="text-gold text-lg font-bold">+{payout.toLocaleString()} HTG kredite!</p>
                )}
              </div>

              {/* Provably fair */}
              <div className="bg-dark-surface border border-white/10 rounded-xl p-3 flex items-center gap-2">
                <ShieldCheck size={16} className="text-gold shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Semans RNG:</p>
                  <p className="text-xs text-gold font-mono truncate">{game.seedHash}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRematch}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
                >
                  <RotateCcw size={16} />
                  Jwe Ankò
                </button>
                <button
                  onClick={() => navigate('/jwet')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
                >
                  Retounen nan Lòbi
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
