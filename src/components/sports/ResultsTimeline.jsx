import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function ResultsTimeline({ weeks }) {
  const [expanded, setExpanded] = useState(false)
  const displayWeeks = expanded ? weeks : weeks.slice(-3)

  return (
    <div className="bg-dark-surface border border-white/10 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Istorik Rezilta</h3>
        {weeks.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gold hover:text-gold-light bg-transparent border-none cursor-pointer"
          >
            {expanded ? 'Mwens' : `Wè tout (${weeks.length})`}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
      </div>

      <div className="divide-y divide-white/5">
        {displayWeeks.map((week, i) => (
          <div key={`${week.week}-${i}`} className="px-4 py-3 flex items-center gap-3">
            {/* Status icon */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              week.survived ? 'bg-success/20' : 'bg-danger/20'
            }`}>
              {week.survived ? (
                <Check size={14} className="text-success" />
              ) : (
                <X size={14} className="text-danger" />
              )}
            </div>

            {/* Week info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">J. {week.week}</span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-sm text-white truncate">{week.match}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-400">Chwa: <span className="text-gold">{week.yourPick}</span></span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-xs text-gray-400">Rezilta: {week.result}</span>
              </div>
            </div>

            {/* Eliminated count */}
            <div className="text-right shrink-0">
              <p className="text-xs text-danger">{week.eliminated} elimine</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
