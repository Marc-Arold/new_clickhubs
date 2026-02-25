import { X, TrendingUp } from 'lucide-react'

const OUTCOME_LABELS = { home: '1', draw: 'X', away: '2' }
const TIERS = [20, 30, 50, 100, 150, 200, 1000]

function getCurrentTier(odds) {
  let tier = null
  for (const t of TIERS) {
    if (odds >= t) tier = t
  }
  return tier
}

export default function FicheSlip({ picks, onRemove, totalOdds, entryFee, onReview }) {
  const currentTier = getCurrentTier(totalOdds)
  const canSubmit = totalOdds >= 20

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl p-4 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp size={15} className="text-gold" />
        <p className="text-white font-bold text-sm">Fich Ou</p>
        <span className="ml-auto text-gray-500 text-xs">{picks.length} evènman</span>
      </div>

      {/* Picks list */}
      {picks.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-gray-600 text-xs">Chwazi evènman yo nan lis la</p>
          <p className="text-gray-700 text-[10px] mt-1">Kote minimòm: 20</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {picks.map(p => (
            <div key={p.matchId} className="flex items-center gap-2 py-1.5 px-2 bg-white/5 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{p.matchName}</p>
                <p className="text-gray-500 text-[10px]">
                  {OUTCOME_LABELS[p.outcome]} · <span className="text-gold font-bold">{p.odds.toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={() => onRemove(p.matchId)}
                className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-danger transition-colors cursor-pointer shrink-0"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Running odds */}
      <div className="border-t border-white/10 pt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">Kote Total</span>
          <span className={`text-lg font-black ${canSubmit ? 'text-gold' : 'text-gray-500'}`}>
            {totalOdds.toFixed(2)}
          </span>
        </div>

        {/* Tier badges */}
        <div className="flex gap-1 flex-wrap">
          {TIERS.map(t => {
            const reached = totalOdds >= t
            const isActive = currentTier === t
            return (
              <span
                key={t}
                className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-all ${
                  isActive
                    ? 'bg-gold text-dark'
                    : reached
                    ? 'bg-gold/20 text-gold'
                    : 'bg-white/5 text-gray-600'
                }`}
              >
                {t}
              </span>
            )
          })}
        </div>

        {!canSubmit && (
          <p className="text-[10px] text-gray-600">
            Bezwen <span className="text-warning font-bold">{(20 - totalOdds).toFixed(2)}</span> ankò pou rive 20
          </p>
        )}

        {canSubmit && entryFee && (
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Si ou sèl genyen:</span>
              <span className="text-gold font-bold">{Math.round(totalOdds * entryFee).toLocaleString()} HTG</span>
            </div>
            <p className="text-gray-600 text-[10px] mt-0.5">Baze sou kote × mise ou</p>
          </div>
        )}
      </div>

      <button
        onClick={onReview}
        disabled={!canSubmit}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gold hover:bg-gold-light text-dark"
      >
        Revize Fich
      </button>
    </div>
  )
}
