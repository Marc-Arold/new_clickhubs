import { X, TrendingUp } from "lucide-react";

const OUTCOME_LABELS = { home: "1", draw: "X", away: "2" };
const TIERS = [20, 30, 50, 100, 150, 200, 1000];

function getCurrentTier(odds) {
  let tier = null;
  for (const t of TIERS) {
    if (odds >= t) tier = t;
  }
  return tier;
}

export default function FicheSlip({
  picks,
  onRemove,
  totalOdds,
  entryFee,
  onReview,
}) {
  const currentTier = getCurrentTier(totalOdds);
  const canSubmit = totalOdds >= 20;

  return (
    <div className="bg-transparent lg:bg-dark-surface border-none lg:border lg:border-white/10 lg:rounded-2xl p-0 lg:p-5 flex flex-col h-full lg:h-auto gap-4 lg:gap-5">
      <div className="hidden lg:flex items-center gap-2 pb-3 border-b border-white/10">
        <TrendingUp size={18} className="text-gold" />
        <p className="text-white font-black text-base tracking-wide">Fich Ou</p>
        <span className="ml-auto bg-white/10 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {picks.length}
        </span>
      </div>

      {/* Picks list */}
      {picks.length === 0 ? (
        <div className="py-8 text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full border border-dashed border-gray-600 flex items-center justify-center mb-1">
            <span className="text-gray-500 text-lg">📝</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">Fich ou vid</p>
          <p className="text-gray-600 text-[10px] uppercase tracking-wider">
            Kòt minimòm pou jwe: 20
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[45vh] lg:max-h-80 overflow-y-auto pr-1">
          {picks.map((p) => (
            <div
              key={p.matchId}
              className="group flex items-center gap-3 py-2 px-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-xl transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] sm:text-xs font-bold truncate mb-1">
                  {p.matchName}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-medium text-gray-400 truncate max-w-[100px] sm:max-w-none">
                    {p.marketName}:
                  </span>
                  <span className="text-[10px] sm:text-xs bg-dark-surface px-1.5 py-0.5 rounded border border-white/5 text-gray-300 font-bold whitespace-nowrap">
                    {p.outcomeName}
                  </span>
                  <span className="text-gold font-black text-xs sm:text-sm ml-auto">
                    {p.odds.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemove(p.matchId)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-danger/20 hover:text-danger hover:scale-110 transition-all cursor-pointer shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Running odds */}
      <div className="border-t border-white/10 pt-4 space-y-4">
        <div className="flex items-center justify-between bg-dark-surface lg:bg-dark/50 rounded-xl p-3 border border-white/5">
          <span className="text-gray-400 text-sm font-medium">Kòt Total</span>
          <span
            className={`text-2xl font-black tracking-tight ${canSubmit ? "text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-400" : "text-gray-500"}`}
          >
            {totalOdds.toFixed(2)}
          </span>
        </div>

        {/* Tier badges */}
        <div className="space-y-1.5">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-1">
            Miltiplikatè
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {TIERS.map((t) => {
              const reached = totalOdds >= t;
              const isActive = currentTier === t;
              return (
                <span
                  key={t}
                  className={`text-[10px] px-2 py-1 rounded font-black transition-all ${
                    isActive
                      ? "bg-gold text-dark shadow-[0_0_10px_rgba(212,168,67,0.4)]"
                      : reached
                        ? "bg-gold/20 text-gold border border-gold/30"
                        : "bg-white/5 text-gray-600 border border-white/5"
                  }`}
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>

        {!canSubmit && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg py-2 px-3 flex items-center gap-2">
            <span className="text-warning text-xs shrink-0">⚠️</span>
            <p className="text-[11px] text-warning/90 font-medium">
              Bezwen{" "}
              <span className="font-black text-warning">
                {(20 - totalOdds).toFixed(2)}
              </span>{" "}
              ankò pou valide
            </p>
          </div>
        )}

        {canSubmit && entryFee && (
          <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-xl p-3 relative overflow-hidden group hover:border-gold/40 transition-colors">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold/20 rounded-full blur-xl -mr-4 -mt-4 transition-colors group-hover:bg-gold/30" />
            <div className="flex justify-between items-end relative z-10">
              <div>
                <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-0.5">
                  Potansyèl (Min)
                </span>
                <p className="text-gray-500 text-[9px] leading-tight max-w-[120px]">
                  Baze sou kòt × mise (Si w sèl genyen)
                </p>
              </div>
              <span className="text-gold font-black text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(212,168,67,0.3)]">
                {Math.round(totalOdds * entryFee).toLocaleString()} HTG
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onReview}
        disabled={!canSubmit}
        className="mt-1 w-full py-3.5 sm:py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark shadow-[0_4px_15px_rgba(212,168,67,0.25)] hover:shadow-[0_4px_20px_rgba(212,168,67,0.4)] hover:-translate-y-0.5 active:translate-y-0"
      >
        Revize Fich Sa
      </button>
    </div>
  );
}
