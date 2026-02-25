import { useNavigate } from 'react-router-dom'
import { Users, Clock, ArrowRight, ShieldCheck } from 'lucide-react'
import { horseRacesMock } from '../data/mockData'

const PLATFORM_FEE = 0.05

function computePrizes(entryFee, maxPlayers) {
  const gross = entryFee * maxPlayers
  const net = gross * (1 - PLATFORM_FEE)
  return {
    first: Math.round(net * 0.65),
    second: Math.round(net * 0.25),
    third: Math.round(net * 0.10),
  }
}

function FillBar({ joined, max }) {
  const pct = Math.round((joined / max) * 100)
  const urgent = pct >= 80
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">{joined}/{max} jwè</span>
        <span className={urgent ? 'text-warning font-bold' : 'text-gray-500'}>{pct}% plen</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all ${urgent ? 'bg-warning' : 'bg-gold/60'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function VirtualHorseRacingLobbyPage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-40 h-40 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="text-3xl">🐎</span> Kous Cheval Vityèl
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Chwazi yon kous selon pri ak lè — 3 premye yo genyen!
          </p>
        </div>
      </div>

      {/* Prize structure reminder */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { medal: '🥇', label: '1ye Plas', pct: '65%' },
          { medal: '🥈', label: '2yèm Plas', pct: '25%' },
          { medal: '🥉', label: '3yèm Plas', pct: '10%' },
          { medal: '🏛️', label: 'Platfòm', pct: '5%' },
        ].map(item => (
          <div key={item.label} className="shrink-0 flex items-center gap-2 px-3 py-2 bg-dark-surface border border-white/10 rounded-xl text-xs">
            <span>{item.medal}</span>
            <span className="text-gray-400">{item.label}</span>
            <span className="text-gold font-bold">{item.pct}</span>
          </div>
        ))}
      </div>

      {/* Race cards */}
      <div className="space-y-3">
        {horseRacesMock.map((race, idx) => {
          const prizes = computePrizes(race.entryFee, race.maxPlayers)
          const spotsLeft = race.maxPlayers - race.playersJoined
          const urgent = spotsLeft <= 4

          return (
            <div
              key={race.id}
              className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all group"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: race info */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank badge */}
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 text-lg font-black text-gold">
                      #{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm">{race.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={11} /> {race.startsIn}
                        </span>
                        <span className={`text-xs font-medium ${urgent ? 'text-warning' : 'text-gray-500'}`}>
                          {urgent ? `⚡ ${spotsLeft} plas lib` : `${spotsLeft} plas lib`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: entry fee */}
                  <div className="text-right shrink-0">
                    <p className="text-gold font-black text-lg">{race.entryFee.toLocaleString()}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wide">HTG / antre</p>
                  </div>
                </div>

                {/* Fill bar */}
                <div className="mt-3">
                  <FillBar joined={race.playersJoined} max={race.maxPlayers} />
                </div>

                {/* Prize quick view */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="text-center py-2 px-1 bg-gold/5 border border-gold/10 rounded-xl">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">🥇 1ye</p>
                    <p className="text-gold font-bold text-xs mt-0.5">{prizes.first.toLocaleString()}</p>
                    <p className="text-gray-600 text-[9px]">HTG</p>
                  </div>
                  <div className="text-center py-2 px-1 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">🥈 2yèm</p>
                    <p className="text-gray-300 font-bold text-xs mt-0.5">{prizes.second.toLocaleString()}</p>
                    <p className="text-gray-600 text-[9px]">HTG</p>
                  </div>
                  <div className="text-center py-2 px-1 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">🥉 3yèm</p>
                    <p className="text-gray-300 font-bold text-xs mt-0.5">{prizes.third.toLocaleString()}</p>
                    <p className="text-gray-600 text-[9px]">HTG</p>
                  </div>
                </div>

                {/* Seed + CTA */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <ShieldCheck size={12} className="text-gold/60 shrink-0" />
                    <p className="text-[10px] text-gray-600 font-mono truncate">{race.seedHash.slice(0, 20)}…</p>
                  </div>
                  <button
                    onClick={() => navigate(`/virtual/horses/${race.id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all shrink-0"
                  >
                    Antre <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
