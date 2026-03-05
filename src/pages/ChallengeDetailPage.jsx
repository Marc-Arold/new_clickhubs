import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { h2hChallengesMock } from '../data/mockData'
import { acceptH2HChallenge, declineH2HChallenge } from '../utils/api'
import ChallengeCard from '../components/sports/ChallengeCard'
import ShareChallengeDrawer from '../components/sports/ShareChallengeDrawer'

export default function ChallengeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()
  const [accepted, setAccepted] = useState(false)
  const [declined, setDeclined] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [selectedPick, setSelectedPick] = useState(null)

  const challenge = h2hChallengesMock.find(c => c.id === id)

  if (!challenge) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Defi sa a pa egziste.</p>
          <button onClick={() => navigate('/jwet')} className="mt-4 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none">
            Retounen nan Lòbi
          </button>
        </div>
      </div>
    )
  }

  const isCreator = challenge.creatorName === '@ClicBoss' // mock check
  const isPending = challenge.status === 'pending' && !accepted && !declined

  const pickOptions = [
    { key: 'home', label: challenge.match.home },
    { key: 'draw', label: 'Match Nul' },
    { key: 'away', label: challenge.match.away },
  ]

  async function handleAccept() {
    try {
      await acceptH2HChallenge(challenge.id, selectedPick)
      updateBalance(user?.availableBalance - challenge.stake, user?.escrowedBalance + challenge.stake)
      setAccepted(true)
    } catch {
      // API error — don't deduct balance
    }
  }

  async function handleDecline() {
    await declineH2HChallenge(challenge.id)
    setDeclined(true)
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <h1 className="text-2xl font-bold text-white">Detay Defi</h1>
        <p className="text-gray-400 text-sm mt-1">
          {isCreator ? 'Ou kreye defi sa a.' : 'Ou resevwa yon defi!'}
        </p>
      </div>

      {/* Challenge card */}
      <ChallengeCard challenge={challenge} isCreator={isCreator} />

      {/* Accepted state */}
      {accepted && (
        <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-success/20 rounded-full flex items-center justify-center">
            <Check size={24} className="text-success" />
          </div>
          <p className="text-success font-bold">Defi Aksepte!</p>
          <p className="text-gray-400 text-sm">Lajan an an eskwo. Ap tann rezilta match la.</p>
        </div>
      )}

      {/* Declined state */}
      {declined && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 text-center space-y-2">
          <p className="text-danger font-bold">Defi Refize</p>
          <button
            onClick={() => navigate('/jwet')}
            className="text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            Retounen nan Lòbi
          </button>
        </div>
      )}

      {/* Accept/decline for recipient of pending challenge */}
      {!isCreator && isPending && (
        <div className="space-y-4">
          {/* Pick selection */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Chwazi prediksyon ou:</p>
            <div className="grid grid-cols-3 gap-2">
              {pickOptions.filter(p => p.key !== challenge.creatorPick).map((pick) => (
                <button
                  key={pick.key}
                  onClick={() => setSelectedPick(pick.key)}
                  className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
                    selectedPick === pick.key
                      ? 'bg-gold/20 text-gold border-gold shadow-lg shadow-gold/10'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {pick.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Advèsè ou te chwazi: <span className="text-gold">{pickOptions.find(p => p.key === challenge.creatorPick)?.label}</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="flex-1 py-3 bg-white/5 text-gray-400 border border-white/10 rounded-xl text-sm font-medium cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <X size={16} /> Refize
            </button>
            <button
              onClick={handleAccept}
              disabled={!selectedPick}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedPick
                  ? 'bg-gold hover:bg-gold-light text-dark cursor-pointer'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check size={16} /> Aksepte — {challenge.stake.toLocaleString()} HTG
            </button>
          </div>
        </div>
      )}

      {/* Share for creator of pending challenge */}
      {isCreator && challenge.status === 'pending' && (
        <button
          onClick={() => setShowShare(true)}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
        >
          Pataje Defi a
        </button>
      )}

      {showShare && (
        <ShareChallengeDrawer
          shareLink={`https://clichubs.com/defi/${challenge.id}`}
          challenge={challenge}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  )
}
