export default function DuelScoreBar({ yourScore, opponentScore, yourName, opponentName }) {
  const total = yourScore + opponentScore || 1
  const yourPct = (yourScore / Math.max(total, 1)) * 100

  return (
    <div className="bg-dark-surface border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-center">
          <p className="text-gold font-bold text-lg">{yourScore}</p>
          <p className="text-xs text-gray-400">{yourName}</p>
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg">{opponentScore}</p>
          <p className="text-xs text-gray-400">{opponentName}</p>
        </div>
      </div>
      <div className="w-full h-2 rounded-full flex overflow-hidden bg-white/10">
        <div className="bg-gold h-full transition-all duration-500" style={{ width: `${yourPct}%` }} />
        <div className="bg-gray-500 h-full transition-all duration-500" style={{ width: `${100 - yourPct}%` }} />
      </div>
    </div>
  )
}
