import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import BalanceSummary from "../components/wallet/BalanceSummary";
import DepositModal from "../components/wallet/DepositModal";
import WithdrawModal from "../components/wallet/WithdrawModal";
import TransactionHistory from "../components/wallet/TransactionHistory";
import KYCBanner from "../components/wallet/KYCBanner";

export default function WalletPage() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Wallet</h1>
          <p className="text-gray-400 text-sm">
            Jere lajan ou — depoze, retire, epi wè istwa tranzaksyon ou.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeposit(true)}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowDownToLine size={16} />
            Depoze
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowUpFromLine size={16} />
            Retire
          </button>
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
