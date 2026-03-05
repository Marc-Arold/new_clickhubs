import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Swords, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { predictionTypesMock } from '../data/mockData'
import { createH2HChallenge } from '../utils/api'
import EventSelector from '../components/sports/EventSelector'
import StakeInput from '../components/sports/StakeInput'
import OpponentSelector from '../components/sports/OpponentSelector'
import ShareChallengeDrawer from '../components/sports/ShareChallengeDrawer'

export default function CreateChallengePage() {
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()

  const [selectedMatch, setSelectedMatch] = useState(null)
  const [predictionType, setPredictionType] = useState('winner')
  const [myPick, setMyPick] = useState(null)
  const [stake, setStake] = useState('')
  const [opponentType, setOpponentType] = useState('friend')
  const [opponentUsername, setOpponentUsername] = useState('')
  const [step, setStep] = useState('form') // 'form' | 'success'
  const [shareLink, setShareLink] = useState(null)
  const [showShare, setShowShare] = useState(false)
  const [createdChallenge, setCreatedChallenge] = useState(null)

  const stakeNum = parseInt(stake) || 0
  const rake = 5
  const potAfterFee = Math.floor(stakeNum * 2 * (1 - rake / 100))

  const isValid = selectedMatch && myPick && stakeNum >= 500 && stakeNum <= user?.availableBalance && (opponentType !== 'friend' || opponentUsername.trim())

  const pickOptions = selectedMatch ? [
    { key: 'home', label: selectedMatch.home },
    { key: 'draw', label: 'Match Nul' },
    { key: 'away', label: selectedMatch.away },
  ] : []

  async function handleCreate() {
    try {
      const result = await createH2HChallenge({
        matchId: selectedMatch.id,
        predictionType,
        pick: myPick,
        stake: stakeNum,
        opponentType,
        opponentUsername,
      })
      updateBalance(user?.availableBalance - stakeNum, user?.escrowedBalance + stakeNum)
      setShareLink(result.shareLink)
      setCreatedChallenge({
        match: selectedMatch,
        stake: stakeNum,
        potAfterFee,
      })
      setStep('success')
    } catch {
      // API error — don't deduct balance
    }
  }

  if (step === 'success') {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <Check size={32} className="text-success" />
          </div>
          <h1 className="text-2xl font-bold text-white">Defi Kreye!</h1>
          <p className="text-gray-400 text-sm">
            Defi <span className="text-gold font-bold">{stakeNum.toLocaleString()} HTG</span> sou{' '}
            <span className="text-white font-medium">{selectedMatch.home} vs {selectedMatch.away}</span> kreye avèk siksè.
          </p>

          <div className="flex flex-col gap-3 max-w-sm mx-auto pt-4">
            <button
              onClick={() => setShowShare(true)}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Pataje Defi a
            </button>
            <button
              onClick={() => navigate('/jwet')}
              className="w-full py-3 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer transition-all"
            >
              Retounen nan Lòbi
            </button>
          </div>
        </div>

        {showShare && createdChallenge && (
          <ShareChallengeDrawer
            shareLink={shareLink}
            challenge={createdChallenge}
            onClose={() => setShowShare(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Swords size={24} className="text-gold" />
          Kreye yon Defi Head-to-Head
        </h1>
        <p className="text-gray-400 text-sm mt-1">Chwazi yon match, fè prediksyon ou, epi defi yon advèsè.</p>
      </div>

      {/* Step 1: Event selection */}
      <EventSelector selectedMatch={selectedMatch} onSelect={setSelectedMatch} />

      {/* Step 2: Prediction type + pick */}
      {selectedMatch && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">2. Prediksyon Ou</h3>

          {/* Prediction type */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {predictionTypesMock.map((type) => (
              <button
                key={type.key}
                onClick={() => { setPredictionType(type.key); setMyPick(null) }}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer border transition-colors ${
                  predictionType === type.key
                    ? 'bg-gold/10 text-gold border-gold/20'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Pick (for winner type) */}
          {predictionType === 'winner' && (
            <div className="grid grid-cols-3 gap-2">
              {pickOptions.map((pick) => (
                <button
                  key={pick.key}
                  onClick={() => setMyPick(pick.key)}
                  className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
                    myPick === pick.key
                      ? 'bg-gold/20 text-gold border-gold shadow-lg shadow-gold/10'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {pick.label}
                </button>
              ))}
            </div>
          )}

          {/* Placeholder for other types */}
          {predictionType !== 'winner' && (
            <div className="bg-dark-surface border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">Tip prediksyon sa a ap disponib byento.</p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Stake */}
      {selectedMatch && myPick && (
        <StakeInput stake={stake} onStakeChange={setStake} rake={rake} />
      )}

      {/* Step 4: Opponent */}
      {selectedMatch && myPick && stakeNum >= 500 && (
        <OpponentSelector
          opponentType={opponentType}
          onTypeChange={setOpponentType}
          opponentUsername={opponentUsername}
          onUsernameChange={setOpponentUsername}
        />
      )}

      {/* Create button */}
      {selectedMatch && myPick && stakeNum >= 500 && (
        <button
          onClick={handleCreate}
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
            isValid
              ? 'bg-gold hover:bg-gold-light text-dark cursor-pointer'
              : 'bg-white/10 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Swords size={16} className="inline mr-2 mb-0.5" />
          Kreye Defi — {stakeNum.toLocaleString()} HTG
        </button>
      )}
    </div>
  )
}
