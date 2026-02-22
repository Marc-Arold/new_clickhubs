import { AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function KYCBanner() {
  const { user } = useAuth();

  if (user.totalDeposits < 50000 || user.kycStatus === "verified") return null;

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-warning/0 via-warning/20 to-warning/0 rounded-xl z-0" />
      <div className="relative bg-warning/5 border border-warning/20 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-warning" />
          </div>
          <div>
            <p className="text-warning font-bold text-sm">
              {user.kycStatus === "pending"
                ? "Verifikasyon idantite ou an kou..."
                : "Kont ou rive sèy verifikasyon."}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              {user.kycStatus === "pending"
                ? "N ap revize dokiman ou yo. Sa ka pran jiska 24è."
                : "Silvouplè verifye idantite ou pou kontinye depoze."}
            </p>
          </div>
        </div>
        {user.kycStatus !== "pending" && (
          <button className="bg-gradient-to-r from-warning to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-dark font-bold text-xs px-5 py-2.5 rounded-lg cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] whitespace-nowrap">
            Verifye Idantite
          </button>
        )}
      </div>
    </div>
  );
}
