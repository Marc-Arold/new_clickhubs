import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Users, Clock, TrendingUp } from 'lucide-react'
import { horseRacesMock } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import HorseCustomizer from '../components/simulated/HorseCustomizer'
import RaceTrack from '../components/simulated/RaceTrack'

// Prize distribution constants
const PLATFORM_FEE = 0.05
const PRIZE_SPLIT = { first: 0.65, second: 0.25, third: 0.10 }

function computePrizes(entryFee, maxPlayers) {
  const gross = entryFee * maxPlayers
  const net = gross * (1 - PLATFORM_FEE)
  return {
    gross,
    net: Math.round(net),
    first: Math.round(net * PRIZE_SPLIT.first),
    second: Math.round(net * PRIZE_SPLIT.second),
    third: Math.round(net * PRIZE_SPLIT.third),
    platform: Math.round(gross * PLATFORM_FEE),
  }
}

function getUserPosition(raceResult) {
  const r = raceResult.find(r => r.id === 'user')
  return r ? r.position : null
}

export default function VirtualHorseRacingPage() {
  const { raceId } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance, userHorse, updateUserHorse } = useAuth()

  const race = horseRacesMock.find(r => r.id === raceId)

  const [phase, setPhase] = useState('lobby') // lobby | customize | racing | results

  if (!race) {
    return (
      <div className="max-w-4xl space-y-6">
        <button onClick={() => navigate('/jwet')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Kous sa a pa egziste.</p>
        </div>
      </div>
    )
  }

  const prizes = computePrizes(race.entryFee, race.maxPlayers)
  const userPosition = getUserPosition(race.raceResult)
  const spotsLeft = race.maxPlayers - race.playersJoined

  function handleEnterClick() {
    if (user?.availableBalance < race.entryFee) return
    setPhase('customize')
  }

  function handleCustomizeSave(name, color) {
    updateUserHorse(name, color)
    updateBalance(
      user?.availableBalance - race.entryFee,
      user?.escrowedBalance + race.entryFee
    )
    setPhase('racing')
  }

  function handleRaceFinish() {
    setPhase('results')
  }

  // Build result from actual finish order (animation) mapped back to mock result
  const resultEntries = race.raceResult.slice().sort((a, b) => a.position - b.position)

  // Prize payout for the user
  let userPayout = 0
  if (userPosition === 1) userPayout = prizes.first
  else if (userPosition === 2) userPayout = prizes.second
  else if (userPosition === 3) userPayout = prizes.third

  const userWon = userPayout > 0

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <button onClick={() => navigate('/virtual/horses')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0">
            <ArrowLeft size={16} /> Tout Kous
          </button>
          <span className="text-gray-700 text-xs">|</span>
          <button onClick={() => navigate('/jwet')} className="text-gray-500 hover:text-white text-xs bg-transparent border-none cursor-pointer p-0">
            Lòbi Jwèt
          </button>
        </div>
        <h1 className="text-2xl font-bold text-white">🐎 {race.name}</h1>
        <p className="text-gray-400 text-sm mt-1">
          Kous cheval vityèl — 3 premye yo genyen!
        </p>
      </div>

      {/* Race info bar */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Antre</p>
            <p className="text-white font-bold">{race.entryFee.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Jwè</p>
            <p className="text-white font-bold flex items-center gap-1">
              <Users size={13} /> {race.playersJoined}/{race.maxPlayers}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Kòmanse</p>
            <p className="text-white font-bold flex items-center gap-1">
              <Clock size={13} /> {race.startsIn}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Plas lib</p>
            <p className={`font-bold ${spotsLeft <= 3 ? 'text-danger' : 'text-white'}`}>
              {spotsLeft} plas
            </p>
          </div>
        </div>
      </div>

      {/* Prize breakdown — always visible */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={15} className="text-gold" />
          <p className="text-white font-semibold text-sm">Distribisyon Pòt la</p>
          <span className="text-gray-600 text-xs ml-auto">{race.maxPlayers} jwè × {race.entryFee.toLocaleString()} HTG</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 px-3 bg-gold/10 border border-gold/20 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥇</span>
              <div>
                <p className="text-white font-bold text-sm">1ye Plas</p>
                <p className="text-gray-500 text-xs">65% pòt nèt</p>
              </div>
            </div>
            <p className="text-gold font-bold">{prizes.first.toLocaleString()} HTG</p>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥈</span>
              <div>
                <p className="text-white font-medium text-sm">2yèm Plas</p>
                <p className="text-gray-500 text-xs">25% pòt nèt</p>
              </div>
            </div>
            <p className="text-gray-300 font-bold">{prizes.second.toLocaleString()} HTG</p>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥉</span>
              <div>
                <p className="text-white font-medium text-sm">3yèm Plas</p>
                <p className="text-gray-500 text-xs">10% pòt nèt</p>
              </div>
            </div>
            <p className="text-gray-300 font-bold">{prizes.third.toLocaleString()} HTG</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs text-right">
          Frè platfòm: {prizes.platform.toLocaleString()} HTG (5%)
        </p>
      </div>

      {/* Seed hash */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-3 flex items-center gap-2">
        <ShieldCheck size={15} className="text-gold shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Semans RNG verifyab:</p>
          <p className="text-xs text-gold font-mono truncate">{race.seedHash}</p>
        </div>
      </div>

      {/* ── Phase: Lobby ── */}
      {phase === 'lobby' && (
        <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 text-center space-y-4">
          {/* User's current horse preview */}
          <div className="flex items-center justify-center gap-3">
            <div className={`w-14 h-14 rounded-full ${userHorse.color} flex items-center justify-center text-2xl border-2 border-gold`}>
              🐎
            </div>
            <div className="text-left">
              <p className="text-white font-bold">{userHorse.name}</p>
              <p className="text-gray-500 text-xs">Cheval Ou</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm max-w-md mx-auto">
            3 premye cheval yo genyen pòt la. Ou ka pèsonalize non ak koulè cheval ou anvan ou antre.
          </p>

          <button
            onClick={handleEnterClick}
            disabled={user?.availableBalance < race.entryFee}
            className="px-8 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Antre — {race.entryFee.toLocaleString()} HTG
          </button>

          {user?.availableBalance < race.entryFee && (
            <p className="text-danger text-xs">Balans ensizan. Depoze plis lajan.</p>
          )}

          <p className="text-gray-600 text-xs">
            Balans: {user?.availableBalance.toLocaleString()} HTG
          </p>
        </div>
      )}

      {/* ── Phase: Customize ── */}
      {phase === 'customize' && (
        <HorseCustomizer
          horse={userHorse}
          onSave={handleCustomizeSave}
        />
      )}

      {/* ── Phase: Racing ── */}
      {phase === 'racing' && (
        <div className="bg-dark-surface border border-white/10 rounded-2xl p-5">
          <RaceTrack
            userHorse={userHorse}
            opponents={race.opponents}
            raceResult={race.raceResult}
            onFinish={handleRaceFinish}
          />
        </div>
      )}

      {/* ── Phase: Results ── */}
      {phase === 'results' && (
        <div className="space-y-4">
          {/* Result banner */}
          <div className={`rounded-2xl p-6 text-center space-y-3 ${
            userWon ? 'bg-success/10 border border-success/20' : 'bg-dark-surface border border-white/10'
          }`}>
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
              userWon ? 'bg-success/20' : 'bg-white/5'
            }`}>
              {userPosition === 1 ? '🥇' : userPosition === 2 ? '🥈' : userPosition === 3 ? '🥉' : '🐎'}
            </div>
            <p className={`text-xl font-bold ${userWon ? 'text-success' : 'text-white'}`}>
              {userPosition === 1
                ? 'OU GENYEN — 1ye Plas!'
                : userPosition === 2
                ? 'OU GENYEN — 2yèm Plas!'
                : userPosition === 3
                ? 'OU GENYEN — 3yèm Plas!'
                : `${userPosition}yèm Plas`}
            </p>
            {userWon ? (
              <p className="text-success font-bold text-lg">
                +{userPayout.toLocaleString()} HTG
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Pwochen kous kòmanse talè — eseye ankò!
              </p>
            )}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
              <span>Cheval ou:</span>
              <div className={`w-5 h-5 rounded-full ${userHorse.color} inline-block`} />
              <span className="text-white">{userHorse.name}</span>
            </div>
          </div>

          {/* Full results table */}
          <div className="bg-dark-surface border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-medium text-sm mb-3">Rezilta Kous la</h4>
            <div className="space-y-2">
              {resultEntries.map(r => {
                const isUser = r.id === 'user'
                const opponent = race.opponents.find(o => o.username === r.id)
                const horseName = isUser ? userHorse.name : opponent?.horse.name ?? r.id
                const horseColor = isUser ? userHorse.color : opponent?.horse.color ?? 'bg-gray-600'
                const medal = r.position <= 3 ? ['🥇', '🥈', '🥉'][r.position - 1] : null
                const posLabel = r.position <= 3
                  ? ['1ye', '2yèm', '3yèm'][r.position - 1]
                  : `${r.position}yèm`
                const payout = r.position === 1 ? prizes.first : r.position === 2 ? prizes.second : r.position === 3 ? prizes.third : 0

                return (
                  <div
                    key={r.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                      isUser ? 'bg-gold/10 border border-gold/20' : r.position <= 3 ? 'bg-white/5' : ''
                    }`}
                  >
                    <span className="text-sm w-8 shrink-0 text-center">
                      {medal ?? <span className="text-gray-600">{posLabel}</span>}
                    </span>
                    <div className={`w-8 h-8 rounded-full ${horseColor} flex items-center justify-center text-sm shrink-0`}>
                      🐎
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isUser ? 'text-gold' : 'text-white'}`}>
                        {horseName} {isUser && '(Ou)'}
                      </p>
                      <p className="text-gray-600 text-xs">{isUser ? 'Ou' : r.id}</p>
                    </div>
                    {payout > 0 && (
                      <span className={`text-sm font-bold shrink-0 ${isUser ? 'text-gold' : 'text-gray-400'}`}>
                        +{payout.toLocaleString()} HTG
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/virtual/horses')}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
            >
              Tout Kous yo
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
