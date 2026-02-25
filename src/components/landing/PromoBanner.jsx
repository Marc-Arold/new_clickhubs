import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const TICKER_ITEMS = [
  { sport: "⚽", text: "Barcelona vs PSG", odds: "2.1x", live: true },
  { sport: "🏇", text: "Kous Cheval #5 — Kanpyon", odds: "3.5x", live: true },
  { sport: "🃏", text: "Blackjack Final", odds: "1.8x", live: false },
  { sport: "⚽", text: "Real Madrid vs Chelsea", odds: "2.7x", live: true },
  { sport: "🏀", text: "NBA: Lakers vs Heat", odds: "1.9x", live: false },
  { sport: "🏇", text: "Kous Cheval #2 — Rapid Fire", odds: "4.2x", live: true },
  { sport: "🎯", text: "Pati H2H — Finale Semèn", odds: "3.0x", live: true },
  { sport: "🎁", text: "50 HTG Bonus pou Tout Nouvo Manm!", odds: null, live: false },
];

// Duplicate for seamless infinite scroll
const ALL_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function PromoBanner() {
  return (
    <div
      className="relative overflow-hidden border-b border-gold/20 flex items-center"
      style={{
        height: "34px",
        background: "linear-gradient(90deg, #1c0808 0%, #1A1A2E 25%, #16213E 100%)",
      }}
    >
      {/* LEFT: LIVE badge */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-1.5 px-3 shrink-0"
        style={{
          background: "#DC2626",
          boxShadow: "6px 0 18px rgba(220,38,38,0.55)",
          minWidth: "60px",
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <span className="text-white text-[10px] font-black tracking-[0.15em] uppercase">
          LIVE
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="ml-[60px] mr-[92px] h-full overflow-hidden flex items-center">
        <div
          className="flex items-center whitespace-nowrap animate-ticker"
          style={{ animationDuration: "38s" }}
        >
          {ALL_ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4">
              <span className="text-sm leading-none">{item.sport}</span>
              <span className="text-gray-300 text-[11px] font-medium">{item.text}</span>
              {item.odds && (
                <>
                  <span className="text-gray-600 text-[11px]">→</span>
                  <span className="text-gold text-[12px] font-black">{item.odds}</span>
                </>
              )}
              {item.live && (
                <span
                  className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-red-400"
                  style={{
                    background: "rgba(220,38,38,0.15)",
                    border: "1px solid rgba(220,38,38,0.3)",
                  }}
                >
                  dirèk
                </span>
              )}
              <span className="text-white/10 text-sm ml-2">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: CTA button */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 flex items-center px-3"
        style={{
          background: "linear-gradient(90deg, transparent, #16213E 35%)",
          paddingLeft: "28px",
        }}
      >
        <Link
          to="/enskri"
          className="no-underline flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-dark transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(90deg, #D4A843, #F59E0B)" }}
        >
          <Zap size={9} className="fill-dark" />
          Enskri Gratis
        </Link>
      </div>
    </div>
  );
}
