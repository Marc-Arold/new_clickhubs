import { useState, useEffect } from 'react'
import { X, AlertTriangle, Check, DollarSign } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function EntryConfirmModal({ tournament, onClose, onConfirm }) {
  const { user } = useAuth()

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  const [step, setStep] = useState(1)
  const canAfford = user.availableBalance >= tournament.entryFee

  function handleConfirm() {
    onConfirm()
    setStep(2)
  }

  if (step === 2) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-dark-accent border border-white/10 rounded-2xl p-6 w-full max-w-sm">
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <Check size={28} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-white">Ou Anrejistre!</h3>
            <p className="text-gray-400 text-sm">
              Ou antre nan <span className="text-gold font-bold">{tournament.name}</span>.
              <br /><span className="text-gold font-bold">{tournament.entryFee.toLocaleString()} HTG</span> dedwi nan balans ou.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Ale nan Tounwa a
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-dark-accent border border-white/10 rounded-2xl p-6 w-full max-w-sm space-y-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1">
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold text-white">Konfime Antre</h3>

        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tounwa</span>
            <span className="text-white font-medium">{tournament.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Frè Antre</span>
            <span className="text-gold font-bold">{tournament.entryFee.toLocaleString()} HTG</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Balans Disponib</span>
            <span className="text-white font-medium">{user.availableBalance.toLocaleString()} HTG</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between text-sm">
            <span className="text-gray-400">Balans Apre</span>
            <span className="text-white font-medium">{(user.availableBalance - tournament.entryFee).toLocaleString()} HTG</span>
          </div>
        </div>

        {!canAfford && (
          <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-3 py-2 rounded-lg">
            <AlertTriangle size={14} />
            Ou pa gen ase lajan. Depoze plis avan.
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-sm font-medium cursor-pointer hover:text-white transition-colors"
          >
            Anile
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canAfford}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              canAfford
                ? 'bg-gold hover:bg-gold-light text-dark cursor-pointer'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
            }`}
          >
            <DollarSign size={14} className="inline mr-1 mb-0.5" />
            Konfime
          </button>
        </div>
      </div>
    </div>
  )
}
