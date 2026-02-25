import { useState } from 'react'
import { Pencil } from 'lucide-react'

const HORSE_COLORS = [
  { label: 'Wouj', value: 'bg-red-500' },
  { label: 'Oranj', value: 'bg-orange-500' },
  { label: 'Jòn', value: 'bg-yellow-500' },
  { label: 'Vèt', value: 'bg-green-500' },
  { label: 'Ble', value: 'bg-blue-500' },
  { label: 'Vyolèt', value: 'bg-purple-500' },
  { label: 'Woze', value: 'bg-pink-500' },
  { label: 'Tèl', value: 'bg-teal-500' },
]


export default function HorseCustomizer({ horse, onSave }) {
  const [name, setName] = useState(horse.name)
  const [color, setColor] = useState(horse.color)

  function handleSave() {
    const trimmed = name.trim()
    if (!trimmed) return
    onSave(trimmed, color)
  }

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl p-5 space-y-5">
      <div className="flex items-center gap-2">
        <Pencil size={16} className="text-gold" />
        <h3 className="text-white font-semibold text-sm">Pèsonalize Cheval Ou</h3>
      </div>

      {/* Preview */}
      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-2xl shrink-0 border-2 border-gold`}>
          🐎
        </div>
        <div>
          <p className="text-white font-bold">{name || 'Cheval Ou'}</p>
          <p className="text-gray-500 text-xs">Ou</p>
        </div>
      </div>

      {/* Name input */}
      <div className="space-y-1.5">
        <label className="text-gray-400 text-xs font-medium">Non Cheval la</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={20}
          placeholder="Egzanp: Tonnè Nwa"
          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors"
        />
        <p className="text-gray-600 text-xs text-right">{name.length}/20</p>
      </div>

      {/* Color picker */}
      <div className="space-y-2">
        <label className="text-gray-400 text-xs font-medium">Koulè</label>
        <div className="grid grid-cols-4 gap-2">
          {HORSE_COLORS.map(c => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              title={c.label}
              className={`h-10 rounded-xl cursor-pointer transition-all ${c.value} ${
                color === c.value
                  ? 'scale-110 shadow-lg'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={color === c.value ? { outline: `3px solid white`, outlineOffset: '2px' } : {}}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!name.trim()}
        className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Konfime — Antre nan Kous la
      </button>
    </div>
  )
}
