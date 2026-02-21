import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Users, Trophy } from 'lucide-react'
import { tournamentsMock } from '../data/mockData'
import ResultBanner from '../components/sports/ResultBanner'
import RoundTracker from '../components/sports/RoundTracker'
import CountdownTimer from '../components/sports/CountdownTimer'

export default function RoundResultPage() {
  const { id, roundId } = useParams()
  const navigate = useNavigate()

  const tournament = tournamentsMock.find(t => t.id === id)
  const roundNum = parseInt(roundId)
  const round = tournament?.rounds.find(r => r.round === roundNum)

  if (!tournament || !round || round.result === null) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Rezilta pa disponib ankò.</p>
          <button onClick={() => navigate(`/tounwa/${id}`)} className="mt-4 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none">
            Retounen nan Tounwa a
          </button>
        </div>
      </div>
    )
  }

  const pickLabels = { home: round.match.home, draw: 'Match Nul', away: round.match.away }
  const resultLabel = pickLabels[round.result]
  const yourPickLabel = pickLabels[round.yourPick]
  const nextRound = tournament.rounds.find(r => r.round === roundNum + 1)

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate(`/tounwa/${id}`)} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> {tournament.name}
        </button>
        <h1 className="text-2xl font-bold text-white">Rezilta Round {roundNum}</h1>
      </div>

      {/* Result banner */}
      <ResultBanner
        survived={round.survived}
        message={
          round.survived
            ? `Ou te chwazi kòrèkteman! Rezilta: ${round.match.home} ${round.actualScore} ${round.match.away}`
            : `Rezilta: ${round.match.home} ${round.actualScore} ${round.match.away}. Ou te chwazi ${yourPickLabel}.`
        }
        subMessage={
          round.survived
            ? `${round.playersEliminated} jwè elimine nan round sa a.`
            : `Ou te siviv ${roundNum - 1} round — ou te depase ${Math.round(((tournament.playersEntered - round.playersAfter - round.playersEliminated) / tournament.playersEntered) * 100)}% jwè yo.`
        }
      />

      {/* Round tracker */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
        <p className="text-xs text-gray-500 font-medium">Pwogrè Tounwa</p>
        <RoundTracker
          totalRounds={tournament.totalRounds}
          currentRound={tournament.currentRound}
          rounds={tournament.rounds}
        />
      </div>

      {/* Tournament status */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">Estati Tounwa</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-success" />
            <span className="text-sm text-gray-400">{round.playersAfter} jwè vivan</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-danger" />
            <span className="text-sm text-gray-400">{round.playersEliminated} elimine nan round sa a</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-gold" />
            <span className="text-sm text-gray-400">{tournament.prizePool.toLocaleString()} HTG pòt</span>
          </div>
        </div>
      </div>

      {/* Match details */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
        <p className="text-xs text-gray-500 font-medium">Detay Match</p>
        <div className="text-center">
          <p className="text-xs text-gold mb-1">{round.match.competition}</p>
          <p className="text-white font-bold text-lg">
            {round.match.home} <span className="text-gold mx-2">{round.actualScore}</span> {round.match.away}
          </p>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-white/10">
          <span className="text-gray-400">Prediksyon ou:</span>
          <span className={`font-medium ${round.survived ? 'text-success' : 'text-danger'}`}>{yourPickLabel}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Rezilta:</span>
          <span className="text-white font-medium">{resultLabel}</span>
        </div>
      </div>

      {/* Next actions */}
      {round.survived && nextRound ? (
        <button
          onClick={() => navigate(`/tounwa/${id}/round/${roundNum + 1}`)}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          Ale nan Round {roundNum + 1} <ArrowRight size={16} />
        </button>
      ) : round.survived ? (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 text-center space-y-2">
          <p className="text-gray-300 text-sm">Ap tann pwochen round lan...</p>
          {nextRound?.deadline && <CountdownTimer targetDate={nextRound.deadline} label="Ouvri nan:" />}
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => navigate('/jwet')}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
          >
            Eksplore Lòt Tounwa
          </button>
          <p className="text-center text-gray-500 text-xs">
            Pa dekouraje — antre nan pwochen tounwa a pou yon nouvo chans!
          </p>
        </div>
      )}
    </div>
  )
}
