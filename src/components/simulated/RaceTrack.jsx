import { useState, useEffect, useRef } from 'react'

const TICK_MS = 120
const TOTAL_DISTANCE = 100

// Speed multipliers indexed by final position (index 0 = 1st place, fastest)
const SPEED_MULTIPLIERS = [1.0, 0.92, 0.85, 0.79, 0.73, 0.67]

function getMedal(pos) {
  if (pos === 1) return '🥇'
  if (pos === 2) return '🥈'
  if (pos === 3) return '🥉'
  return null
}

export default function RaceTrack({ userHorse, opponents, raceResult, onFinish }) {
  // Build participant list: user first, then opponents
  const participants = [
    { id: 'user', username: 'Ou', horse: userHorse, isUser: true },
    ...opponents.map(o => ({ id: o.username, username: o.username, horse: o.horse, isUser: false })),
  ]

  // Map participant id → their target finish position (from raceResult)
  const positionMap = {}
  raceResult.forEach(r => { positionMap[r.id] = r.position })

  // Each participant gets a speed based on their target finish position
  // Position 1 → index 0 → fastest, position 6 → index 5 → slowest
  const baseSpeed = {}
  participants.forEach(p => {
    const pos = positionMap[p.id] ?? 6
    baseSpeed[p.id] = SPEED_MULTIPLIERS[pos - 1] ?? SPEED_MULTIPLIERS[5]
  })

  const [progress, setProgress] = useState(() =>
    Object.fromEntries(participants.map(p => [p.id, 0]))
  )
  const [finishOrder, setFinishOrder] = useState([]) // [{id, position}]
  const [done, setDone] = useState(false)
  const finishedRef = useRef(new Set())
  const finishOrderRef = useRef([])

  useEffect(() => {
    if (done) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = { ...prev }
        let allDone = true

        participants.forEach(p => {
          if (next[p.id] >= TOTAL_DISTANCE) return

          allDone = false
          // Random advance: base speed + noise
          const noise = (Math.random() * 0.8 + 0.2)
          const advance = baseSpeed[p.id] * noise * 1.8
          const newVal = Math.min(TOTAL_DISTANCE, next[p.id] + advance)
          next[p.id] = newVal

          if (newVal >= TOTAL_DISTANCE && !finishedRef.current.has(p.id)) {
            finishedRef.current.add(p.id)
            finishOrderRef.current.push(p.id)
          }
        })

        if (allDone || finishedRef.current.size === participants.length) {
          clearInterval(interval)
          setFinishOrder([...finishOrderRef.current])
          setDone(true)
          // Give a short delay before calling onFinish so user sees 100%
          setTimeout(() => onFinish?.(finishOrderRef.current), 1200)
        }

        return next
      })
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [done]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sort participants by current progress (descending) for rank display
  const ranked = [...participants].sort((a, b) => (progress[b.id] ?? 0) - (progress[a.id] ?? 0))

  return (
    <div className="space-y-4">
      {/* Track header */}
      <div className="flex items-center justify-between">
        <p className="text-white font-semibold text-sm">
          {done ? 'Kous la fini!' : 'Kous an kou...'}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block" />
          LIVE
        </div>
      </div>

      {/* Race lanes */}
      <div className="space-y-2">
        {ranked.map((p, idx) => {
          const pct = progress[p.id] ?? 0
          const finishedPos = finishOrderRef.current.indexOf(p.id) + 1
          const isFinished = finishedRef.current.has(p.id)
          const medal = isFinished ? getMedal(finishedPos) : null

          return (
            <div
              key={p.id}
              className={`rounded-xl p-3 border transition-all ${
                p.isUser
                  ? 'border-gold/40 bg-gold/5'
                  : 'border-white/10 bg-dark-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Position number (live rank) */}
                <span className={`text-xs font-bold w-5 text-right shrink-0 ${
                  idx === 0 ? 'text-gold' : idx === 1 ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {isFinished ? medal || `${finishedPos}` : `${idx + 1}`}
                </span>

                {/* Horse avatar */}
                <div className={`w-9 h-9 rounded-full ${p.horse.color} flex items-center justify-center text-base shrink-0 ${
                  p.isUser ? 'ring-2 ring-gold ring-offset-1 ring-offset-dark' : ''
                }`}>
                  🐎
                </div>

                {/* Name + progress */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-medium truncate ${p.isUser ? 'text-gold' : 'text-white'}`}>
                      {p.horse.name}
                      {p.isUser && <span className="text-gray-500 ml-1">(Ou)</span>}
                    </p>
                    <span className={`text-xs shrink-0 ml-2 ${isFinished ? 'text-gold font-bold' : 'text-gray-500'}`}>
                      {isFinished ? 'FINI' : `${Math.round(pct)}%`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-100 ${
                        p.isUser ? 'bg-gold' : 'bg-white/30'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Username */}
                <span className="text-gray-600 text-xs shrink-0 hidden sm:block">{p.username}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Track markers */}
      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span>DEPA 🏁</span>
        <span>RIVE 🏆</span>
      </div>
    </div>
  )
}
