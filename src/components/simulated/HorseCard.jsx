export default function HorseCard({ horse, selected, disabled, onSelect }) {
  return (
    <button
      onClick={() => !disabled && onSelect?.(horse.number)}
      disabled={disabled}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
        selected
          ? 'border-gold bg-gold/10'
          : disabled
          ? 'border-white/5 bg-dark-surface opacity-50 cursor-not-allowed'
          : 'border-white/10 bg-dark-surface hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${horse.color} flex items-center justify-center shrink-0`}>
          <span className="text-white font-bold text-sm">#{horse.number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm">{horse.name}</p>
          <p className="text-gray-500 text-xs">{horse.form}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-gold font-bold text-sm">{horse.odds}x</p>
          <p className="text-gray-500 text-xs">Kòt</p>
        </div>
      </div>
    </button>
  )
}
