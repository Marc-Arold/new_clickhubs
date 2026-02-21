import { useState } from 'react'
import { ScrollText, Check } from 'lucide-react'

export default function RulesPanel({ rules, accepted, onAccept }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false)

  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollHeight - scrollTop - clientHeight < 20) {
      setScrolledToBottom(true)
    }
  }

  return (
    <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <ScrollText size={14} className="text-gold" />
        Règ yo
      </h3>

      <div
        className="max-h-48 overflow-y-auto space-y-2 pr-2 text-sm text-gray-400"
        onScroll={handleScroll}
      >
        {rules.map((rule, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-gold font-bold shrink-0">{i + 1}.</span>
            <span>{rule}</span>
          </div>
        ))}
      </div>

      <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
        accepted
          ? 'bg-gold/10 border-gold/20'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}>
        <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
          accepted ? 'bg-gold border-gold' : 'border-white/20'
        }`}>
          {accepted && <Check size={14} className="text-dark" />}
        </div>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onAccept(e.target.checked)}
          className="sr-only"
        />
        <span className="text-sm text-gray-300">Mwen konprann règ yo epi mwen aksepte yo</span>
      </label>
    </div>
  )
}
