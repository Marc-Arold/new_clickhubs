import { useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ReferralHub() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const referralLink = `https://clichubs.com/r/${user.referralCode}`

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold text-lg">Envite Zanmi</h2>
      <div className="bg-dark-surface border border-white/10 rounded-xl p-5">
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="text-center">
            <p className="text-gold text-2xl font-bold">{user.referralCount}</p>
            <p className="text-gray-500 text-xs">Zanmi envite</p>
          </div>
          <div className="text-center">
            <p className="text-success text-2xl font-bold">{user.referralBonus.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">HTG Bonus</p>
          </div>
          <div className="text-center">
            <p className="text-white text-2xl font-bold">500</p>
            <p className="text-gray-500 text-xs">HTG pa zanmi</p>
          </div>
        </div>

        {/* Referral code */}
        <div className="mb-4">
          <p className="text-gray-400 text-xs mb-1.5">Kòd referans ou</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-dark-accent border border-white/10 rounded-lg px-4 py-2.5 text-gold font-mono font-bold text-sm">
              {user.referralCode}
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors border ${
                copied
                  ? 'bg-success/10 text-success border-success/20'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Kopye!' : 'Kopye'}
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/20 text-xs font-medium py-2.5 rounded-lg cursor-pointer transition-colors">
            <Share2 size={14} />
            WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 text-xs font-medium py-2.5 rounded-lg cursor-pointer transition-colors"
          >
            <Copy size={14} />
            Kopye lyen
          </button>
        </div>
      </div>
    </div>
  )
}
