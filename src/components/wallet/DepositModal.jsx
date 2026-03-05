import { useState, useEffect } from 'react'
import { X, Check, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function DepositModal({ onClose }) {
  const { user, updateBalance } = useAuth()

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState(user?.phone || '')
  const [step, setStep] = useState(1) // 1: form, 2: success
  const [error, setError] = useState('')

  const numAmount = parseInt(amount) || 0
  const isValid = numAmount >= 100 && phone.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (numAmount < 100) {
      setError('Minimòm depo se 100 HTG.')
      return
    }
    // API stub — would call deposit()
    updateBalance(user?.availableBalance + numAmount)
    setStep(2)
  }

  const quickAmounts = [500, 1000, 2500, 5000]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-dark-accent border border-white/10 rounded-2xl p-6 w-full max-w-sm">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1">
          <X size={20} />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-bold text-white">Depoze via MonCash</h3>

            {error && (
              <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-3 py-2 rounded-lg">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Montan (HTG)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError('') }}
                placeholder="Min. 100 HTG"
                min="100"
                className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
              <div className="flex gap-2 mt-2">
                {quickAmounts.map((qa) => (
                  <button
                    key={qa}
                    type="button"
                    onClick={() => setAmount(qa.toString())}
                    className={`flex-1 py-1.5 text-xs rounded-lg border cursor-pointer transition-colors ${
                      amount === qa.toString()
                        ? 'bg-gold/10 text-gold border-gold/20'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {qa.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Nimewo MonCash</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all ${
                isValid ? 'bg-gold hover:bg-gold-light text-dark cursor-pointer' : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              Voye Demann — {numAmount > 0 ? numAmount.toLocaleString() : '0'} HTG
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <Check size={28} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-white">Depo reyisi!</h3>
            <p className="text-gray-400 text-sm">
              {numAmount.toLocaleString()} HTG ajoute nan kont ou. Balans ou: <span className="text-gold font-bold">{user?.availableBalance.toLocaleString()} HTG</span>
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Fèmen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
