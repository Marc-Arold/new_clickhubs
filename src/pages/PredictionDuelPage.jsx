import { useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { duelQuestionsMock, duelMock } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { findDuelMatch } from '../utils/api'
import DuelQuestion from '../components/simulated/DuelQuestion'
import DuelScoreBar from '../components/simulated/DuelScoreBar'
import DuelResults from '../components/simulated/DuelResults'

export default function PredictionDuelPage() {
  const { duelId } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()

  const [phase, setPhase] = useState('matchmaking') // matchmaking | active | finished
  const [currentQ, setCurrentQ] = useState(0)
  const [yourScore, setYourScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [stake, setStake] = useState(500)
  const [searching, setSearching] = useState(false)

  // Refs to track accumulated scores (avoids stale closure in handleAnswer)
  const yourScoreRef = useRef(0)
  const opponentScoreRef = useRef(0)

  const questions = duelQuestionsMock

  async function handleFindMatch() {
    setSearching(true)
    try {
      await findDuelMatch('quick', stake)
      updateBalance(user.availableBalance - stake, user.escrowedBalance + stake)
      setTimeout(() => {
        setSearching(false)
        setPhase('active')
      }, 2000)
    } catch {
      setSearching(false)
    }
  }

  const handleAnswer = useCallback((answer, time) => {
    const q = questions[currentQ]
    const correct = answer === q.correct
    const speedBonus = correct ? Math.round(Math.max(0, 5 - (time / 3))) : 0
    const points = correct ? 10 + speedBonus : 0

    const mockAnswer = duelMock.answers[currentQ]
    const oppCorrect = mockAnswer?.opponentAnswer === q.correct
    const oppSpeedBonus = oppCorrect ? Math.round(Math.max(0, 5 - (mockAnswer.opponentTime / 3))) : 0
    const oppPoints = oppCorrect ? 10 + oppSpeedBonus : 0

    // Update both ref and state
    yourScoreRef.current += points
    opponentScoreRef.current += oppPoints
    setYourScore(yourScoreRef.current)
    setOpponentScore(opponentScoreRef.current)

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setPhase('finished')
        // Use refs for accurate final comparison
        if (yourScoreRef.current > opponentScoreRef.current) {
          const payout = Math.round(stake * 2 * 0.95)
          updateBalance(user.availableBalance + payout, user.escrowedBalance - stake)
        } else {
          updateBalance(undefined, user.escrowedBalance - stake)
        }
      } else {
        setCurrentQ(q => q + 1)
      }
    }, 1200)
  }, [currentQ, questions, stake, user, updateBalance])

  const won = yourScore > opponentScore
  const finalDuel = {
    ...duelMock,
    yourScore,
    opponentScore,
    winner: won ? 'you' : 'opponent',
    potAfterFee: Math.round(stake * 2 * 0.95),
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <h1 className="text-2xl font-bold text-white">Prediction Duel</h1>
        <p className="text-gray-400 text-sm mt-1">Trivia espò 1v1 — 10 kesyon, 15 segonn chak!</p>
      </div>

      {/* Phase: Matchmaking */}
      {phase === 'matchmaking' && (
        <div className="space-y-4">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 text-center space-y-5">
            <Zap size={32} className="text-gold mx-auto" />
            <h2 className="text-white font-bold text-lg">Jwenn yon Advèsè</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              10 kesyon sou espò. Chak kesyon gen 15 segonn. Pi vit ou reponn, plis pwen ou resevwa!
            </p>

            {/* Stake selection */}
            <div className="space-y-2">
              <p className="text-gray-400 text-xs">Chwazi montan mize:</p>
              <div className="flex justify-center gap-2">
                {[500, 1000, 2500].map((v) => (
                  <button
                    key={v}
                    onClick={() => setStake(v)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                      stake === v
                        ? 'bg-gold/10 border-2 border-gold text-gold'
                        : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {v.toLocaleString()} HTG
                  </button>
                ))}
              </div>
              <p className="text-gray-500 text-xs">
                Peman si ou genyen: <span className="text-gold font-bold">{Math.round(stake * 2 * 0.95).toLocaleString()} HTG</span>
              </p>
            </div>

            <button
              onClick={handleFindMatch}
              disabled={searching || user.availableBalance < stake}
              className="px-8 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searching ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                  Ap chèche advèsè...
                </span>
              ) : (
                `Kòmanse — ${stake.toLocaleString()} HTG`
              )}
            </button>
            {user.availableBalance < stake && (
              <p className="text-danger text-xs">Balans ensizan.</p>
            )}
          </div>
        </div>
      )}

      {/* Phase: Active (questions) */}
      {phase === 'active' && (
        <div className="space-y-4">
          <DuelScoreBar
            yourScore={yourScore}
            opponentScore={opponentScore}
            yourName="Ou"
            opponentName={duelMock.opponent}
          />
          <DuelQuestion
            key={currentQ}
            question={questions[currentQ]}
            questionNumber={currentQ + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {/* Phase: Finished */}
      {phase === 'finished' && (
        <div className="space-y-4">
          <DuelResults duel={finalDuel} questions={questions} />
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPhase('matchmaking')
                setCurrentQ(0)
                setYourScore(0)
                setOpponentScore(0)
                yourScoreRef.current = 0
                opponentScoreRef.current = 0
              }}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
            >
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
  )
}
