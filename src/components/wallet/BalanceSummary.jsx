import { Wallet, Lock, Gift, Info } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function TooltipCard({ icon: Icon, label, amount, color, tooltip }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="bg-dark-surface border border-white/10 rounded-xl p-5 relative">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
        >
          <Icon size={18} />
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
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-white text-2xl font-bold">
        {amount.toLocaleString()}{" "}
        <span className="text-sm font-normal text-gray-400">HTG</span>
      </p>

      {showTip && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-accent border border-white/10 rounded-lg p-3 shadow-xl z-10">
          <p className="text-gray-300 text-xs">{tooltip}</p>
        </div>
      )}
    </div>
  );
}

export default function BalanceSummary() {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <TooltipCard
        icon={Wallet}
        label="Balans Disponib"
        amount={user.availableBalance}
        color="bg-gold/10 text-gold"
        tooltip="Lajan ou ka jwe oswa retire. Sa enkli tout genyen ki konfime."
      />
      <TooltipCard
        icon={Lock}
        label="Balans Fich Aktif"
        amount={user.escrowedBalance}
        color="bg-blue-400/10 text-blue-400"
        tooltip="Lajan ki bloke nan fich aktif. Yo retounen nan balans ou lè jwèt la fini."
      />
      <TooltipCard
        icon={Gift}
        label="Balans Bonus"
        amount={user.bonusBalance}
        color="bg-purple-400/10 text-purple-400"
        tooltip="Bonus referans — ou ka jwe ak li men ou pa ka retire li dirèkteman. Genyen yo ale nan balans disponib."
      />
    </div>
  );
}
