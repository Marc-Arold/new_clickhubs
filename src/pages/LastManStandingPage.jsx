import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Trophy, TrendingUp, Lock, Users } from 'lucide-react'
import { denyeSivivanPoolsMock, sivivanLeagues, sivivanTiers } from '../data/mockData'
import { enterPool } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import SeasonOverview from '../components/sports/SeasonOverview'
import ResultsTimeline from '../components/sports/ResultsTimeline'
import SurvivalStatus from '../components/sports/SurvivalStatus'
import CountdownTimer from '../components/sports/CountdownTimer'

export default function LastManStandingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()
  const [entering, setEntering] = useState(false)

  const pool = denyeSivivanPoolsMock.find(p => p.id === id)

  if (!pool) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Pool sa a pa egziste.</p>
          <button onClick={() => navigate('/sivivan')} className="mt-4 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none">
            Retounen nan Dènye Sivivan
          </button>
        </div>
      </div>
    )
  }

  const league = sivivanLeagues.find(l => l.key === pool.league)
  const tier = sivivanTiers.find(t => t.key === pool.tier)
  const canPick = pool.yourStatus === 'alive' && pool.status === 'active'
  const isOpen = pool.status === 'open'
  const isActiveNotIn = pool.status === 'active' && pool.yourStatus === 'not_entered'

  // Potential gains
  const potentialWin = Math.round(pool.prizePool * 0.90)
  const potentialTop3 = Math.round(pool.prizePool * 0.10 / 3)
  const odds = pool.playersAlive > 0 ? pool.playersAlive : pool.totalEntrants

  async function handleEnterPool() {
    setEntering(true)
    try {
      await enterPool(pool.id)
      updateBalance(user.availableBalance - pool.entryFee, user.escrowedBalance + pool.entryFee)
    } catch {
      // API error
    }
    setEntering(false)
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/sivivan')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Dènye Sivivan
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy size={24} className="text-gold" />
          {pool.name}
        </h1>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-gray-400 text-sm">{league?.flag} {league?.label}</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-400 text-sm">Jounen {pool.currentJournee} sou {pool.totalJournees}</span>
          <span className="text-gray-600">·</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            pool.tier === 'sprint' ? 'bg-danger/20 text-danger' :
            pool.tier === 'kout' ? 'bg-warning/20 text-warning' :
            pool.tier === 'mwayen' ? 'bg-success/20 text-success' :
            'bg-gold/20 text-gold'
          }`}>
            {tier?.label}
          </span>
        </div>
      </div>

      {/* Season overview */}
      <SeasonOverview season={pool} />

      {/* Potential Gains Calculator */}
      <div className="bg-gold/5 border border-gold/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-gold" />
          <h3 className="text-gold font-semibold text-sm">Gen Potansyèl</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dark-surface rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Si ou dènye sivivan</p>
            <p className="text-gold font-bold text-lg">{potentialWin.toLocaleString()} HTG</p>
          </div>
          <div className="bg-dark-surface rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Si top 3 sivivan</p>
            <p className="text-white font-bold text-lg">{potentialTop3.toLocaleString()} HTG</p>
            <p className="text-gray-600 text-[10px]">chak</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Users size={12} />
          <span>Chans ou kounye a: 1 sou {odds} jwè</span>
        </div>
      </div>

      {/* Survival status */}
      <SurvivalStatus playersAlive={pool.playersAlive} totalEntrants={pool.totalEntrants} />

      {/* Entry window — open pool */}
      {isOpen && (
        <div className="space-y-3">
          <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-gray-300 font-medium">Enskrisyon fèmen nan:</span>
            <CountdownTimer targetDate={pool.entryDeadline} urgent />
          </div>
          <button
            onClick={handleEnterPool}
            disabled={entering}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {entering ? 'Ap antre...' : `Antre nan Pool sa a — ${pool.entryFee.toLocaleString()} HTG`}
          </button>
        </div>
      )}

      {/* Entry closed banner — active pool, not entered */}
      {isActiveNotIn && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Lock size={16} className="text-gray-400" />
            <p className="text-gray-400 font-medium text-sm">Enskrisyon fèmen</p>
          </div>
          <p className="text-gray-500 text-xs">Pool sa a deja kòmanse. Ou pa ka antre ankò.</p>
        </div>
      )}

      {/* Weekly pick deadline — active and alive */}
      {canPick && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-gray-300 font-medium">Dat limit pou chwazi jounen sa a:</span>
          <CountdownTimer targetDate={pool.pickDeadline} urgent />
        </div>
      )}

      {/* Pick CTA */}
      {canPick && (
        <button
          onClick={() => navigate(`/sivivan/${id}/chwazi`)}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          Chwazi Ekip Jounen {pool.currentJournee} <ArrowRight size={16} />
        </button>
      )}

      {pool.yourStatus === 'eliminated' && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 text-center space-y-2">
          <p className="text-danger font-bold">Ou te elimine</p>
          <p className="text-gray-400 text-sm">Pa dekouraje — gen lòt pool ki ouvri kounye a!</p>
          <button
            onClick={() => navigate('/sivivan')}
            className="text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            Wè pool ki disponib
          </button>
        </div>
      )}

      {/* Previous picks */}
      {pool.previousPicks.length > 0 && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
          <h3 className="text-sm font-semibold text-white">Ekip Ou Deja Itilize</h3>
          <div className="flex flex-wrap gap-2">
            {pool.previousPicks.map((team) => (
              <span key={team} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                {team}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results timeline */}
      {pool.weeks.length > 0 && (
        <ResultsTimeline weeks={pool.weeks} />
      )}
    </div>
  )
}
