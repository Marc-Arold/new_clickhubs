import { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WithdrawModal({ onClose }) {
  const { user } = useAuth();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const numAmount = parseInt(amount) || 0;
  const isValid =
    numAmount >= 100 && numAmount <= user?.availableBalance && phone.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numAmount < 100) {
      setError("Minimòm retrè se 100 HTG.");
      return;
    }
    if (numAmount > user?.availableBalance) {
      setError("Montan an depase balans disponib ou.");
      return;
    }
    // API stub
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-dark-accent border border-white/10 rounded-2xl p-6 w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1"
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-bold text-white">Retire Lajan</h3>
            <p className="text-gray-400 text-sm">
              Disponib:{" "}
              <span className="text-gold font-bold">
                {user?.availableBalance.toLocaleString()} HTG
              </span>
            </p>

            {error && (
              <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-3 py-2 rounded-lg">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Montan (HTG)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder="Min. 100 HTG"
                min="100"
                className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Nimewo MonCash pou retrè
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all ${
                isValid
                  ? "bg-gold hover:bg-gold-light text-dark cursor-pointer"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              Mande Retrè — {numAmount > 0 ? numAmount.toLocaleString() : "0"}{" "}
              HTG
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 mx-auto bg-warning/10 rounded-full flex items-center justify-center">
              <Check size={28} className="text-warning" />
            </div>
            <h3 className="text-xl font-bold text-white">Demand Konfime!</h3>
            <p className="text-gray-400 text-sm">
              Retrè {numAmount.toLocaleString()} HTG an kou tretman. Ou ap
              resevwa li sou MonCash nan mwens ke 5 minit.
            </p>
            <div className="bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
              <p className="text-warning text-xs font-medium">
                Estati: An Atant
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Fèmen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
