import { Link } from "react-router-dom";
import { Wallet, Plus, Lock, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WalletBar() {
  const { user } = useAuth();

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 rounded-2xl z-0" />

      <div className="relative glass-card rounded-2xl p-5 sm:p-6 card-shine z-10">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/3 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-5 flex-wrap">
            {/* Main balance */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-yellow-500/10 flex items-center justify-center border border-gold/10 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
                <Wallet size={24} className="text-gold" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                  Balans Disponib
                </p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-3xl sm:text-4xl font-black">
                  {user.availableBalance.toLocaleString()}{" "}
                  <span className="text-lg text-gold/50">HTG</span>
                </p>
              </div>
            </div>

            {/* Escrowed */}
            <div className="hidden sm:flex items-center gap-3 pl-5 border-l border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Lock size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                  Nan Jwèt
                </p>
                <p className="text-white text-lg font-bold">
                  {user.escrowedBalance.toLocaleString()} HTG
                </p>
              </div>
            </div>

            {/* P&L indicator */}
            <div className="hidden md:flex items-center gap-3 pl-5 border-l border-white/10">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-success" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                  Semèn sa a
                </p>
                <p className="text-success text-lg font-bold">
                  +{(user.stats.totalWon * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })} HTG
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              to="/potfey"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-bold text-sm px-5 py-3 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(212,168,67,0.3)] no-underline relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus size={16} />
                Fè Depo
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>
        </div>

        {/* Mobile escrowed balance */}
        <div className="sm:hidden mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-blue-400" />
            <span className="text-gray-400 text-xs">Nan Jwèt:</span>
            <span className="text-white text-sm font-bold">{user.escrowedBalance.toLocaleString()} HTG</span>
          </div>
          <div className="flex items-center gap-1.5 text-success text-xs font-bold">
            <TrendingUp size={12} />
            +{(user.stats.totalWon * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </div>
  );
}
