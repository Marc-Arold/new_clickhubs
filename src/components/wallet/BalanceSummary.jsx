import { Wallet, Lock, Gift, Info } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const cards = [
  {
    icon: Wallet,
    label: "Balans Disponib",
    field: "availableBalance",
    color: "text-gold",
    bg: "bg-gold/10",
    borderColor: "border-gold/20",
    glowColor: "shadow-[0_0_15px_rgba(212,168,67,0.08)]",
    tooltip: "Lajan ou ka jwe oswa retire. Sa enkli tout genyen ki konfime.",
  },
  {
    icon: Lock,
    label: "Balans Fich Aktif",
    field: "escrowedBalance",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    glowColor: "shadow-[0_0_15px_rgba(96,165,250,0.08)]",
    tooltip: "Lajan ki bloke nan fich aktif. Yo retounen nan balans ou lè jwèt la fini.",
  },
  {
    icon: Gift,
    label: "Balans Bonus",
    field: "bonusBalance",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
    glowColor: "shadow-[0_0_15px_rgba(192,132,252,0.08)]",
    tooltip: "Bonus referans — ou ka jwe ak li men ou pa ka retire li dirèkteman.",
  },
];

export default function BalanceSummary() {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <BalanceCard key={card.field} card={card} amount={user[card.field]} />
      ))}
    </div>
  );
}

function BalanceCard({ card, amount }) {
  const [showTip, setShowTip] = useState(false);
  const Icon = card.icon;

  return (
    <div className={`glass-card rounded-xl p-5 relative card-shine border ${card.borderColor} ${card.glowColor}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-lg ${card.bg} flex items-center justify-center`}>
          <Icon size={18} className={card.color} />
        </div>
        <button
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onClick={() => setShowTip(!showTip)}
          className="text-gray-500 hover:text-gray-300 bg-transparent border-none cursor-pointer p-1"
        >
          <Info size={14} />
        </button>
      </div>
      <p className="text-gray-400 text-xs mb-1">{card.label}</p>
      <p className="text-white text-2xl font-black">
        {amount.toLocaleString()}{" "}
        <span className="text-sm font-normal text-gray-500">HTG</span>
      </p>

      {showTip && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg p-3 shadow-xl z-10 border border-white/10">
          <p className="text-gray-300 text-xs">{card.tooltip}</p>
        </div>
      )}
    </div>
  );
}
