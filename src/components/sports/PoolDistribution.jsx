export default function PoolDistribution({ distribution, matchHome, matchAway }) {
  return (
    <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
      <p className="text-xs text-gray-500 font-medium">Distribisyon Jwè yo Kounye a</p>
      <div className="flex gap-1 h-4 rounded-full overflow-hidden">
        <div className="bg-success/60 rounded-l-full transition-all" style={{ width: `${distribution.home}%` }} />
        <div className="bg-warning/60 transition-all" style={{ width: `${distribution.draw}%` }} />
        <div className="bg-blue-500/60 rounded-r-full transition-all" style={{ width: `${distribution.away}%` }} />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-success font-medium">{matchHome} — {distribution.home}%</span>
        <span className="text-warning font-medium">Nul — {distribution.draw}%</span>
        <span className="text-blue-400 font-medium">{matchAway} — {distribution.away}%</span>
      </div>
    </div>
  )
}
