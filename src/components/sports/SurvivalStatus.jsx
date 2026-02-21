import { Users, Shield } from 'lucide-react'

export default function SurvivalStatus({ playersAlive, totalEntrants }) {
  const pct = Math.round((playersAlive / totalEntrants) * 100)
  const isLow = playersAlive <= 10

  return (
    <div className={`rounded-xl p-4 border ${
      isLow ? 'bg-warning/10 border-warning/20' : 'bg-dark-surface border-white/10'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield size={16} className={isLow ? 'text-warning' : 'text-success'} />
          <span className={`text-sm font-medium ${isLow ? 'text-warning' : 'text-white'}`}>
            {isLow ? `Sèlman ${playersAlive} jwè rete!` : `${playersAlive} jwè toujou vivan`}
          </span>
        </div>
        <span className="text-xs text-gray-500">{pct}% siviv</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/5 rounded-full h-2">
        <div
          className={`rounded-full h-2 transition-all ${isLow ? 'bg-warning' : 'bg-success'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between mt-1.5 text-xs text-gray-500">
        <span>{totalEntrants - playersAlive} elimine</span>
        <span>{totalEntrants} total</span>
      </div>
    </div>
  )
}
