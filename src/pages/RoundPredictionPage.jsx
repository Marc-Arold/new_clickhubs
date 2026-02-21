import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, AlertTriangle, Users } from 'lucide-react'
import { tournamentsMock } from '../data/mockData'
import { submitPrediction } from '../utils/api'
import FixtureCard from '../components/sports/FixtureCard'
import PoolDistribution from '../components/sports/PoolDistribution'
import CountdownTimer from '../components/sports/CountdownTimer'
import RoundTracker from '../components/sports/RoundTracker'

export default function RoundPredictionPage() {
  const { id, roundId } = useParams()
  const navigate = useNavigate()
  const [selectedPick, setSelectedPick] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const tournament = tournamentsMock.find(t => t.id === id)
  const roundNum = parseInt(roundId)
  const round = tournament?.rounds.find(r => r.round === roundNum)

  if (!tournament || !round) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Round sa a pa disponib.</p>
          <button onClick={() => navigate(`/tounwa/${id}`)} className="mt-4 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none">
            Retounen nan Tounwa a
          </button>
        </div>
      </div>
    )
  }

  const hasResult = round.result !== null
  const hasPick = round.yourPick !== null || confirmed
  const pickLabel = { home: round.match.home, draw: 'Match Nul', away: round.match.away }

  async function handleConfirm() {
    setConfirming(true)
    await submitPrediction(tournament.id, roundNum, selectedPick)
    setConfirmed(true)
    setConfirming(false)
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate(`/tounwa/${id}`)} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> {tournament.name}
        </button>
        <h1 className="text-2xl font-bold text-white">Round {roundNum}</h1>
        <p className="text-gray-400 text-sm mt-1">
          {hasPick ? 'Prediksyon ou anrejistre. Bòn chans!' : 'Chwazi prediksyon ou avan dat limit la.'}
        </p>
      </div>

      {/* Round tracker */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
        <p className="text-xs text-gray-500 font-medium">Pwogrè</p>
        <RoundTracker
          totalRounds={tournament.totalRounds}
          currentRound={tournament.currentRound}
          rounds={tournament.rounds}
        />
      </div>

      {/* Deadline countdown */}
      {round.deadline && !hasPick && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-warning" />
            <span className="text-sm text-gray-300 font-medium">Dat limit prediksyon:</span>
          </div>
          <CountdownTimer targetDate={round.deadline} urgent />
        </div>
      )}

      {/* Survivors count */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gold" />
          <span className="text-sm text-gray-300">{tournament.playersAlive} jwè toujou vivan</span>
        </div>
        <span className="text-xs text-gray-500">{tournament.playersEntered - tournament.playersAlive} elimine</span>
      </div>

      {/* Fixture card with pick */}
      {!hasPick ? (
        <FixtureCard
          match={round.match}
          selectedPick={selectedPick}
          onPick={setSelectedPick}
          showDistribution={!!round.poolDistribution}
          poolDistribution={round.poolDistribution}
        />
      ) : (
        <>
          {/* Confirmed state */}
          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-gold/20 rounded-full flex items-center justify-center">
              <Check size={24} className="text-gold" />
            </div>
            <p className="text-white font-bold">Prediksyon ou anrejistre</p>
            <p className="text-gold text-lg font-bold">
              {pickLabel[confirmed ? selectedPick : round.yourPick]}
            </p>
            <p className="text-gray-400 text-sm">
              {round.match.home} vs {round.match.away}
            </p>
          </div>

          {/* Pool distribution after confirming */}
          {round.poolDistribution && (
            <PoolDistribution
              distribution={round.poolDistribution}
              matchHome={round.match.home}
              matchAway={round.match.away}
            />
          )}
        </>
      )}

      {/* Confirm button */}
      {!hasPick && selectedPick && (
        <button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50"
        >
          {confirming ? 'Ap konfime...' : `Konfime: ${pickLabel[selectedPick]}`}
        </button>
      )}

      {/* Link to result if available */}
      {hasResult && (
        <button
          onClick={() => navigate(`/tounwa/${id}/round/${roundNum}/rezilta`)}
          className="w-full py-3 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer transition-all"
        >
          Wè Rezilta Round {roundNum}
        </button>
      )}
    </div>
  )
}
