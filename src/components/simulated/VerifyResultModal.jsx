import { useState, useEffect } from 'react'
import { X, ShieldCheck, Copy, Check } from 'lucide-react'

export default function VerifyResultModal({ seedHash, result, onClose }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  const [inputSeed, setInputSeed] = useState('')
  const [verified, setVerified] = useState(null)

  function handleCopy() {
    navigator.clipboard.writeText(seedHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleVerify() {
    setVerified(inputSeed === seedHash)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-dark-surface border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-gold" />
            <h3 className="text-white font-bold text-lg">Verifye Rezilta a</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer bg-transparent border-none">
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-400 text-sm">
          Match sa a te jwe ak yon semans RNG sètifye. Ou ka verifye ke rezilta a pa t manipile.
        </p>

        {/* Seed display */}
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Semans RNG (Hash SHA-256)</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-dark-accent border border-white/10 rounded-lg px-3 py-2 text-xs text-gold font-mono break-all">
              {seedHash}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer transition-colors"
            >
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="bg-dark-accent rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Rezilta jenerasyon:</p>
          <p className="text-white font-bold">{result}</p>
        </div>

        {/* Manual verify */}
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Antre semans pou verifye:</label>
          <input
            value={inputSeed}
            onChange={(e) => { setInputSeed(e.target.value); setVerified(null) }}
            placeholder="Kole semans la isit..."
            className="w-full bg-dark-accent border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
          />
          <button
            onClick={handleVerify}
            disabled={!inputSeed}
            className="w-full py-2.5 rounded-lg font-bold text-sm bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 cursor-pointer transition-all disabled:opacity-50"
          >
            Verifye
          </button>
          {verified === true && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
              <p className="text-success font-medium text-sm">Verifye! Rezilta a otantik.</p>
            </div>
          )}
          {verified === false && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 text-center">
              <p className="text-danger font-medium text-sm">Semans la pa kòrèk.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
