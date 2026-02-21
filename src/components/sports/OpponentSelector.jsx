import { useState } from 'react'
import { User, Globe, MessageCircle } from 'lucide-react'

export default function OpponentSelector({ opponentType, onTypeChange, opponentUsername, onUsernameChange }) {
  const tabs = [
    { key: 'friend', label: 'Yon Zanmi', icon: User },
    { key: 'open', label: 'Ouvri', icon: Globe },
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">4. Chwazi Advèsè</h3>

      {/* Type tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTypeChange(tab.key)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium cursor-pointer border transition-colors flex items-center justify-center gap-1.5 ${
              opponentType === tab.key
                ? 'bg-gold/10 text-gold border-gold/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Friend input */}
      {opponentType === 'friend' && (
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Non itilizatè oswa telefòn</label>
          <input
            type="text"
            value={opponentUsername}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="@username oswa +509..."
            className="w-full px-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      )}

      {/* Open challenge info */}
      {opponentType === 'open' && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-3">
          <p className="text-sm text-gray-400">
            Defi a ap poste nan lòbi a. Nenpòt jwè ka aksepte l.
          </p>
        </div>
      )}

      {/* WhatsApp info */}
      {opponentType === 'whatsapp' && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-3">
          <p className="text-sm text-gray-400">
            Nou pral jenere yon lyen pou ou pataje sou WhatsApp. Advèsè ou ap ka aksepte defi a dirèkteman.
          </p>
        </div>
      )}
    </div>
  )
}
