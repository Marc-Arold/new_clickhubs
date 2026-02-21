import { useState, useEffect } from 'react'
import { X, Copy, Check, MessageCircle, Share2 } from 'lucide-react'

export default function ShareChallengeDrawer({ shareLink, challenge, onClose }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  function handleCopy() {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappMessage = encodeURIComponent(
    `Mwen defi ou nan ${challenge.match.home} vs ${challenge.match.away} pou ${challenge.stake.toLocaleString()} HTG sou Clic Hubs. Èske ou gen kouraj aksepte? ${shareLink}`
  )

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-dark-accent border-l border-white/10 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Share2 size={18} className="text-gold" />
            Pataje Defi
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-4">
          <p className="text-gray-400 text-sm">
            Pataje lyen sa a ak advèsè ou pou li aksepte defi a.
          </p>

          {/* Link */}
          <div className="bg-dark-surface border border-white/10 rounded-xl p-3 flex items-center gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 bg-transparent text-white text-sm border-none outline-none"
            />
            <button
              onClick={handleCopy}
              className="p-2 bg-gold/10 rounded-lg text-gold hover:bg-gold/20 transition-colors cursor-pointer border-none"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm cursor-pointer hover:bg-[#20BD5A] transition-colors no-underline"
          >
            <MessageCircle size={18} />
            Pataje sou WhatsApp
          </a>

          {/* Challenge summary */}
          <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
            <p className="text-xs text-gray-500 font-medium">Rezime Defi</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Match</span>
              <span className="text-white">{challenge.match.home} vs {challenge.match.away}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Miz</span>
              <span className="text-gold font-bold">{challenge.stake.toLocaleString()} HTG</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Genyan resevwa</span>
              <span className="text-gold font-bold">{challenge.potAfterFee.toLocaleString()} HTG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
