import { Check, Circle, Lock } from 'lucide-react'

export default function RoundTracker({ totalRounds, currentRound, rounds }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
      {Array.from({ length: totalRounds }, (_, i) => {
        const roundNum = i + 1
        const roundData = rounds.find(r => r.round === roundNum)
        const isComplete = roundData?.survived != null
        const isCurrent = roundNum === currentRound
        const survived = roundData?.survived

        return (
          <div key={roundNum} className="flex items-center">
            {i > 0 && (
              <div className={`w-4 sm:w-6 h-0.5 ${isComplete ? (survived ? 'bg-success' : 'bg-danger') : 'bg-white/10'}`} />
            )}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                isComplete
                  ? survived
                    ? 'bg-success/20 text-success border border-success/30'
                    : 'bg-danger/20 text-danger border border-danger/30'
                  : isCurrent
                    ? 'bg-gold/20 text-gold border-2 border-gold'
                    : 'bg-white/5 text-gray-500 border border-white/10'
              }`}
            >
              {isComplete ? (
                survived ? <Check size={14} /> : '✕'
              ) : isCurrent ? (
                roundNum
              ) : (
                <Lock size={12} />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
