import { Link } from "react-router-dom";
import { Users, Clock, Trophy, Monitor, Landmark } from "lucide-react";

const typeIcons = {
  sports: Trophy,
  simulated: Monitor,
  "bank-pari": Landmark,
};

const statusColors = {
  Ouvri: "bg-success/20 text-success",
  "Ap ranpli vit": "bg-warning/20 text-warning",
  Fèmen: "bg-danger/20 text-danger",
};

export default function GamePreviewCard({ game }) {
  const Icon = typeIcons[game.type] || Trophy;
  const fillPercent = Math.round((game.playersIn / game.maxPlayers) * 100);

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 hover:border-gold/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
          <Icon size={20} className="text-gold" />
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[game.status] || statusColors["Ouvri"]}`}
        >
          {game.status}
        </span>
      </div>

      <h3 className="text-white font-semibold text-base mb-3 group-hover:text-gold transition-colors">
        {game.name}
      </h3>

      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Gen Posib:</span>
          <span className="text-gold font-bold">
            {game.prizePool.toLocaleString()} HTG
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Pri:</span>
          <span className="text-white font-medium">
            {game.entryFee.toLocaleString()} HTG
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-400">
            <Users size={14} />
            <span>Jwè:</span>
          </div>
          <span className="text-white font-medium">
            {game.playersIn} / {game.maxPlayers}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/5 rounded-full h-1.5">
          <div
            className="bg-gold rounded-full h-1.5 transition-all"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Clock size={12} />
          <span>Ap Kòmanse nan {game.startsIn}</span>
        </div>
      </div>

      <Link
        to="/enskri"
        className="block w-full text-center bg-gold/10 hover:bg-gold text-gold hover:text-dark font-semibold text-sm py-3 rounded-lg transition-all no-underline border border-gold/20 hover:border-gold"
      >
        Jwe Kounye a
      </Link>
    </div>
  );
}
