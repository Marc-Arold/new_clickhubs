import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react'
import { denyeSivivanPoolsMock } from '../data/mockData'
import { submitWeeklyPick } from '../utils/api'
import WeeklyMatchList from '../components/sports/WeeklyMatchList'
import CountdownTimer from '../components/sports/CountdownTimer'

export default function WeeklyPickPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [confirming, setConfirming] = useState(false)

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

  async function handleConfirm() {
    setConfirming(true)
    await submitWeeklyPick(pool.id, selectedTeam)
    setConfirmed(true)
    setConfirming(false)
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate(`/sivivan/${id}`)} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> {pool.name}
        </button>
        <h1 className="text-2xl font-bold text-white">Chwazi Ekip — Jounen {pool.currentJournee}</h1>
        <p className="text-gray-400 text-sm mt-1">
          {confirmed ? 'Chwa ou anrejistre.' : 'Chwazi yon ekip ou kwè ki pral genyen jounen sa a.'}
        </p>
      </div>

      {/* Deadline */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-warning" />
          <span className="text-sm text-gray-300 font-medium">Dat limit:</span>
        </div>
        <CountdownTimer targetDate={pool.pickDeadline} urgent />
      </div>

      {/* Already used teams warning */}
      {pool.previousPicks.length > 0 && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-2">Ekip ou deja itilize (ou pa ka chwazi yo ankò):</p>
          <div className="flex flex-wrap gap-1.5">
            {pool.previousPicks.map((team) => (
              <span key={team} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-500 line-through">
                {team}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Confirmed state */}
      {confirmed ? (
        <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 mx-auto bg-gold/20 rounded-full flex items-center justify-center">
            <Check size={24} className="text-gold" />
          </div>
          <p className="text-white font-bold">Chwa ou anrejistre!</p>
          <p className="text-gold text-lg font-bold">{selectedTeam}</p>
          <p className="text-gray-400 text-sm">Bòn chans!</p>
          <button
            onClick={() => navigate(`/sivivan/${id}`)}
            className="mt-2 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            Retounen nan Pool la
          </button>
        </div>
      ) : (
        <>
          {/* Match list with team pick buttons */}
          <WeeklyMatchList
            matches={pool.thisWeekMatches}
            previousPicks={pool.previousPicks}
            selectedTeam={selectedTeam}
            onSelect={setSelectedTeam}
          />

          {/* Confirm button */}
          {selectedTeam && (
            <div className="space-y-2">
              <div className="bg-dark-surface border border-white/10 rounded-xl p-3 text-center">
                <p className="text-sm text-gray-400">Chwa ou jounen sa a:</p>
                <p className="text-gold font-bold text-lg">{selectedTeam}</p>
              </div>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50"
              >
                {confirming ? 'Ap konfime...' : `Konfime: ${selectedTeam}`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
