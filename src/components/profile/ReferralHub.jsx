import { useState } from "react";
import { Copy, Check, Share2, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ReferralHub() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://clichubs.com/r/${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gold" />
        <h2 className="text-white font-bold text-lg">Envite Zanmi</h2>
      </div>
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 rounded-xl z-0" />
        <div className="relative glass-card rounded-xl p-5 z-10">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center glass-card-gold rounded-lg py-3 px-2">
              <p className="text-gold text-2xl font-black">{user.referralCount}</p>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Zanmi envite</p>
            </div>
            <div className="text-center glass-card-gold rounded-lg py-3 px-2">
              <p className="text-success text-2xl font-black">{user.referralBonus.toLocaleString()}</p>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">HTG Bonus</p>
            </div>
            <div className="text-center glass-card-gold rounded-lg py-3 px-2">
              <div className="flex items-center justify-center gap-1">
                <Sparkles size={14} className="text-gold" />
                <p className="text-white text-2xl font-black">500</p>
              </div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">HTG pa zanmi</p>
            </div>
          </div>

          {/* Referral code */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs mb-1.5">Kòd referans ou</p>
            <div className="flex gap-2">
              <div className="flex-1 glass-card-gold rounded-lg px-4 py-2.5 text-gold font-mono font-bold text-sm border border-gold/20">
                {user.referralCode}
              </div>
              <button
                onClick={handleCopy}
                className={`px-4 rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer transition-all border ${
                  copied
                    ? "bg-success/10 text-success border-success/20 shadow-[0_0_10px_rgba(34,197,94,0.15)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Kopye!" : "Kopye"}
              </button>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/20 text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-all hover:shadow-[0_0_10px_rgba(22,163,74,0.1)]">
              <Share2 size={14} />
              WhatsApp
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-colors"
            >
              <Copy size={14} />
              Kopye lyen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
