import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Users, Trophy, Zap } from 'lucide-react'
import { horseRaceMock } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { enterHorseRace, pickHorse } from '../utils/api'
import HorseCard from '../components/simulated/HorseCard'
import RaceSimulation from '../components/simulated/RaceSimulation'
import BracketView from '../components/simulated/BracketView'

export default function VirtualHorseRacingPage() {
  const { raceId } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()
  const race = raceId === horseRaceMock.id ? horseRaceMock : null

  const [phase, setPhase] = useState('lobby') // lobby | picking | racing | results | bracket
  const [entered, setEntered] = useState(false)
  const [selectedHorse, setSelectedHorse] = useState(null)
  const [pickConfirmed, setPickConfirmed] = useState(false)

  if (!race) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Kous sa a pa egziste.</p>
        </div>
      </div>
    )
  }

  async function handleEnter() {
    try {
      await enterHorseRace(race.id)
      updateBalance(user.availableBalance - race.entryFee, user.escrowedBalance + race.entryFee)
      setEntered(true)
      setPhase('picking')
    } catch {
      // API error — don't deduct balance
    }
  }

  async function handleConfirmPick() {
    await pickHorse(race.id, race.currentRound, selectedHorse)
    setPickConfirmed(true)
    setTimeout(() => setPhase('racing'), 1500)
  }

  function handleRaceFinish() {
    setPhase('results')
  }

  const pickedHorseObj = race.horses.find(h => h.number === selectedHorse)
  const raceWinners = race.raceResult.slice(0, 2)
  const survived = selectedHorse && raceWinners.some(r => r.horse === selectedHorse)

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <h1 className="text-2xl font-bold text-white">{race.name}</h1>
        <p className="text-gray-400 text-sm mt-1">Tounwa kous cheval vityèl — cheval ou dwe fini nan 2 premye!</p>
      </div>

      {/* Race info */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-xs">Pòt</p>
            <p className="text-gold font-bold">{race.prizePool.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Antre</p>
            <p className="text-white font-bold">{race.entryFee.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Jwè</p>
            <p className="text-white font-bold flex items-center gap-1"><Users size={14} /> {race.totalPlayers}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Round</p>
            <p className="text-white font-bold">{race.currentRound} / {race.totalRounds}</p>
          </div>
        </div>
      </div>

      {/* RNG Seed */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-3 flex items-center gap-2">
        <ShieldCheck size={16} className="text-gold shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Semans RNG:</p>
          <p className="text-xs text-gold font-mono truncate">{race.seedHash}</p>
        </div>
      </div>

      {/* Phase: Lobby */}
      {phase === 'lobby' && (
        <div className="space-y-4">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <Zap size={32} className="text-gold mx-auto" />
            <h2 className="text-white font-bold text-lg">Antre nan Tounwa a</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Chwazi yon cheval pou chak kous. Si cheval ou fini nan 2 premye, ou avanse nan pwochen round la. Dènye jwè ki rete genyen pòt la!
            </p>
            <button
              onClick={handleEnter}
              disabled={user.availableBalance < race.entryFee}
              className="px-8 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Antre — {race.entryFee.toLocaleString()} HTG
            </button>
            {user.availableBalance < race.entryFee && (
              <p className="text-danger text-xs">Balans ensizan. Depoze plis lajan.</p>
            )}
          </div>
        </div>
      )}

      {/* Phase: Picking */}
      {phase === 'picking' && (
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm">Chwazi Cheval Ou — Round {race.currentRound}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {race.horses.map((horse) => (
              <HorseCard
                key={horse.number}
                horse={horse}
                selected={selectedHorse === horse.number}
                disabled={pickConfirmed}
                onSelect={setSelectedHorse}
              />
            ))}
          </div>
          {selectedHorse && !pickConfirmed && (
            <div className="space-y-2">
              <div className="bg-dark-surface border border-white/10 rounded-xl p-3 text-center">
                <p className="text-sm text-gray-400">Chwa ou:</p>
                <p className="text-gold font-bold text-lg">#{selectedHorse} — {pickedHorseObj?.name}</p>
              </div>
              <button
                onClick={handleConfirmPick}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
              >
                Konfime Chwa
              </button>
            </div>
          )}
          {pickConfirmed && (
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-center">
              <p className="text-gold font-bold">Chwa konfime! Kous la kòmanse...</p>
            </div>
          )}
        </div>
      )}

      {/* Phase: Racing */}
      {phase === 'racing' && (
        <RaceSimulation commentary={race.raceCommentary} onFinish={handleRaceFinish} />
      )}

      {/* Phase: Results */}
      {phase === 'results' && (
        <div className="space-y-4">
          {/* Result banner */}
          <div className={`rounded-2xl p-6 text-center space-y-3 ${
            survived ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'
          }`}>
            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${
              survived ? 'bg-success/20' : 'bg-danger/20'
            }`}>
              <Trophy size={28} className={survived ? 'text-success' : 'text-danger'} />
            </div>
            <p className={`text-xl font-bold ${survived ? 'text-success' : 'text-danger'}`}>
              {survived ? 'OU AVANSE!' : 'Pa gen chans fwa sa a'}
            </p>
            <p className="text-gray-400 text-sm">
              Ou te chwazi <span className="text-white font-medium">#{selectedHorse} — {pickedHorseObj?.name}</span>
            </p>
            {!survived && (
              <p className="text-gray-500 text-xs">Pwochen tounwa kòmanse talè — eseye ankò!</p>
            )}
          </div>

          {/* Race results table */}
          <div className="bg-dark-surface border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-medium text-sm mb-3">Rezilta Kous la</h4>
            <div className="space-y-2">
              {race.raceResult.map((r) => {
                const isAdvanced = r.position <= 2
                const isYours = r.horse === selectedHorse
                return (
                  <div key={r.position} className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                    isYours ? 'bg-gold/10 border border-gold/20' : isAdvanced ? 'bg-success/5' : ''
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-sm ${
                        r.position === 1 ? 'text-gold' : r.position === 2 ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {r.position}ye
                      </span>
                      <span className={`text-sm ${isYours ? 'text-gold font-bold' : 'text-white'}`}>
                        #{r.horse} — {r.name} {isYours ? '(Ou)' : ''}
                      </span>
                    </div>
                    {isAdvanced && <span className="text-xs text-success font-medium">Avanse</span>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setPhase('bracket')}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
            >
              Wè Tablò
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

      {/* Phase: Bracket */}
      {phase === 'bracket' && (
        <div className="space-y-4">
          <BracketView bracket={race.bracket} currentRound={race.currentRound} />
          <button
            onClick={() => setPhase('results')}
            className="w-full py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
          >
            Retounen nan Rezilta
          </button>
        </div>
      )}
    </div>
  )
}
