import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { tournamentsMock } from '../data/mockData'
import { enterTournament } from '../utils/api'
import TournamentInfo from '../components/sports/TournamentInfo'
import RulesPanel from '../components/sports/RulesPanel'
import RoundTracker from '../components/sports/RoundTracker'
import CountdownTimer from '../components/sports/CountdownTimer'
import EntryConfirmModal from '../components/sports/EntryConfirmModal'

export default function TournamentLobbyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()
  const [rulesAccepted, setRulesAccepted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [entered, setEntered] = useState(false)

  const tournament = tournamentsMock.find(t => t.id === id)

  if (!tournament) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Tounwa sa a pa egziste.</p>
          <button onClick={() => navigate('/jwet')} className="mt-4 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none">
            Retounen nan Lòbi
          </button>
        </div>
      </div>
    )
  }

  const isOpen = tournament.status === 'open'
  const isActive = tournament.status === 'active'
  const currentRound = tournament.rounds.find(r => r.yourPick === null && r.result === null)

  async function handleEntry() {
    try {
      await enterTournament(tournament.id)
      updateBalance(user.availableBalance - tournament.entryFee, user.escrowedBalance + tournament.entryFee)
      setEntered(true)
    } catch {
      // API error — don't deduct balance
    }
  }

  function handleConfirmClose() {
    setShowConfirm(false)
    if (entered && currentRound) {
      navigate(`/tounwa/${tournament.id}/round/${currentRound.round}`)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{tournament.name}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {isOpen ? 'Tounwa ouvri — anrejistre kounye a!' : `Round ${tournament.currentRound} sou ${tournament.totalRounds}`}
            </p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
            isOpen ? 'bg-success/20 text-success' : isActive ? 'bg-gold/20 text-gold' : 'bg-white/10 text-gray-400'
          }`}>
            {isOpen ? 'Ouvri' : isActive ? 'An Kou' : 'Fini'}
          </span>
        </div>
      </div>

      {/* Round Tracker (active tournaments) */}
      {isActive && tournament.rounds.length > 0 && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
          <p className="text-xs text-gray-500 font-medium">Pwogrè Round yo</p>
          <RoundTracker
            totalRounds={tournament.totalRounds}
            currentRound={tournament.currentRound}
            rounds={tournament.rounds}
          />
        </div>
      )}

      {/* Countdown */}
      {isOpen && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-gray-300 font-medium">Kòmanse nan:</span>
          <CountdownTimer targetDate={tournament.startDate} />
        </div>
      )}

      {/* Tournament info */}
      <TournamentInfo tournament={tournament} />

      {/* Rules */}
      {isOpen && !entered && (
        <RulesPanel
          rules={tournament.rules}
          accepted={rulesAccepted}
          onAccept={setRulesAccepted}
        />
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {isOpen && !entered && (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!rulesAccepted}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              rulesAccepted
                ? 'bg-gold hover:bg-gold-light text-dark cursor-pointer'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Trophy size={16} className="inline mr-2 mb-0.5" />
            Antre nan Tounwa — {tournament.entryFee.toLocaleString()} HTG
          </button>
        )}

        {isActive && currentRound && (
          <button
            onClick={() => navigate(`/tounwa/${tournament.id}/round/${currentRound.round}`)}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
          >
            Fè Prediksyon Round {currentRound.round}
          </button>
        )}

        {isActive && !currentRound && (
          <div className="flex-1 py-3 rounded-xl text-sm text-center bg-white/5 text-gray-400 border border-white/10">
            Ap tann rezilta round {tournament.currentRound}...
          </div>
        )}
      </div>

      {/* Entry confirm modal */}
      {showConfirm && (
        <EntryConfirmModal
          tournament={tournament}
          onClose={handleConfirmClose}
          onConfirm={handleEntry}
        />
      )}
    </div>
  )
}
