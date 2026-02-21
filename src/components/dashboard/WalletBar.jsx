import { Link } from "react-router-dom";
import { Wallet, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WalletBar() {
  const { user } = useAuth();

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
          <Wallet size={22} className="text-gold" />
        </div>
        <div>
          <p className="text-gray-500 text-xs">Balans Disponib</p>
          <p className="text-gold text-2xl font-bold">
            {user.availableBalance.toLocaleString()} HTG
          </p>
        </div>
        <div className="hidden sm:block pl-6 border-l border-white/10">
          <p className="text-gray-500 text-xs">Nan Jwèt Live yo</p>
          <p className="text-white text-lg font-semibold">
            {user.escrowedBalance.toLocaleString()} HTG
          </p>
        </div>
      </div>

      <Link
        to="/potfey"
        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold text-sm px-5 py-2.5 rounded-lg transition-colors no-underline"
      >
        <Plus size={16} />
        Fè Depo
      </Link>
    </div>
  );
}
