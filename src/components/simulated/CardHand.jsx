const suitColors = {
  '♥': 'text-red-500',
  '♦': 'text-red-500',
  '♠': 'text-white',
  '♣': 'text-white',
}

export default function CardHand({ cards, hidden, label, handName, isWinner }) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-gray-400 text-xs font-medium">{label}</p>
      <div className="flex justify-center gap-1.5">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`w-12 h-16 sm:w-14 sm:h-20 rounded-lg flex flex-col items-center justify-center text-sm font-bold border-2 transition-all ${
              hidden
                ? 'bg-gold/20 border-gold/30'
                : isWinner
                ? 'bg-dark-accent border-success/50 shadow-lg shadow-success/10'
                : 'bg-dark-accent border-white/20'
            }`}
          >
            {hidden ? (
              <span className="text-gold text-lg">?</span>
            ) : (
              <>
                <span className={suitColors[card.suit]}>{card.value}</span>
                <span className={`text-lg ${suitColors[card.suit]}`}>{card.suit}</span>
              </>
            )}
          </div>
        ))}
      </div>
      {handName && !hidden && (
        <p className={`text-sm font-bold ${isWinner ? 'text-success' : 'text-gray-500'}`}>{handName}</p>
      )}
    </div>
  )
}
