import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BalanceSummary from "../components/wallet/BalanceSummary";
import DepositModal from "../components/wallet/DepositModal";
import WithdrawModal from "../components/wallet/WithdrawModal";
import TransactionHistory from "../components/wallet/TransactionHistory";
import KYCBanner from "../components/wallet/KYCBanner";

export default function WalletPage() {
  const { user } = useAuth();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Hero balance header */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 rounded-2xl z-0" />
        <div className="relative glass-card rounded-2xl p-6 sm:p-8 card-shine z-10">
          <div className="absolute top-0 right-0 w-60 h-60 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/3 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-yellow-500/10 flex items-center justify-center border border-gold/10 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
                <Wallet size={22} className="text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Wallet</h1>
                <p className="text-gray-400 text-sm">
                  Jere lajan ou — depoze, retire, epi wè istwa tranzaksyon ou.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                  Balans Total
                </p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-4xl sm:text-5xl font-black">
                  {(user?.availableBalance + user?.escrowedBalance + user?.bonusBalance).toLocaleString()}
                  <span className="text-lg text-gold/50 ml-2">HTG</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeposit(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-bold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(212,168,67,0.3)] cursor-pointer relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowDownToLine size={16} />
                    Depoze
                  </span>
                </button>
                <button
                  onClick={() => setShowWithdraw(true)}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium text-sm px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <ArrowUpFromLine size={16} />
                  Retire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <KYCBanner />
      <BalanceSummary />
      <TransactionHistory />

      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}
      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} />}
    </div>
  );
}
