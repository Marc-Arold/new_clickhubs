import { useState } from "react";
import { ShieldAlert, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ResponsibleGaming() {
  const { user } = useAuth();
  const [dailyLimit, setDailyLimit] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [showBreakConfirm, setShowBreakConfirm] = useState(false);
  const [breakDuration, setBreakDuration] = useState(null);

  const breakOptions = [
    { key: "24h", label: "24 è" },
    { key: "7d", label: "7 jou" },
    { key: "30d", label: "30 jou" },
    { key: "permanent", label: "Pèmanan" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-warning" />
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <ShieldAlert size={18} className="text-gold" />
          Jwèt Responsab
        </h2>
      </div>

      <div className="glass-card rounded-xl divide-y divide-white/5 overflow-hidden">
        {/* Deposit limits */}
        <div className="p-5 space-y-4">
          <p className="text-gray-300 text-sm font-medium">Limit Depo</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Limit jounalye (HTG)
              </label>
              <input
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                placeholder="Pa gen limit"
                className="w-full px-3 py-2 bg-dark-accent/50 border border-white/10 rounded-lg text-white text-sm focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 placeholder-gray-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Limit semèn (HTG)
              </label>
              <input
                type="number"
                value={weeklyLimit}
                onChange={(e) => setWeeklyLimit(e.target.value)}
                placeholder="Pa gen limit"
                className="w-full px-3 py-2 bg-dark-accent/50 border border-white/10 rounded-lg text-white text-sm focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 placeholder-gray-600 transition-all"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-gold/10 text-gold border border-gold/20 rounded-lg text-xs font-bold cursor-pointer hover:bg-gold/20 transition-all hover:shadow-[0_0_10px_rgba(212,168,67,0.1)]">
            Anrejistre Limit
          </button>
        </div>

        {/* Take a break */}
        <div className="p-5 space-y-4">
          <p className="text-gray-300 text-sm font-medium">Pran yon Poz</p>
          <p className="text-gray-500 text-xs">
            Lè ou aktive sa, ou pa ka jwe pandan peryòd la. Sa pa ka defèt.
          </p>
          <div className="flex flex-wrap gap-2">
            {breakOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setBreakDuration(opt.key);
                  setShowBreakConfirm(true);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer border transition-all ${
                  opt.key === "permanent"
                    ? "bg-danger/10 text-danger border-danger/20 hover:bg-danger/20"
                    : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {showBreakConfirm && (
            <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle
                  size={16}
                  className="text-danger mt-0.5 flex-shrink-0"
                />
                <p className="text-danger text-sm">
                  Ou sèten ou vle bloke kont ou pou{" "}
                  <span className="font-bold">
                    {breakOptions.find((o) => o.key === breakDuration)?.label}
                  </span>
                  ? Aksyon sa a pa ka defèt.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowBreakConfirm(false);
                    setBreakDuration(null);
                  }}
                  className="flex-1 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-xs font-medium cursor-pointer transition-colors hover:text-white"
                >
                  Anile
                </button>
                <button className="flex-1 py-2 bg-danger text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-red-500 transition-colors">
                  Konfime
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Close account */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium">
                Fèmen Kont Mwen
              </p>
              <p className="text-gray-500 text-xs">
                Aksyon sa a pèmanan. Tout done ou ap efase.
              </p>
            </div>
            <button className="px-4 py-2 bg-danger/10 text-danger border border-danger/20 rounded-lg text-xs font-bold cursor-pointer hover:bg-danger/20 transition-all">
              Fèmen Kont
            </button>
          </div>
        </div>

        {/* KYC Status */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium">
                Verifikasyon Idantite (KYC)
              </p>
              <p className="text-xs mt-0.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.kycStatus === "verified"
                      ? "bg-success/10 text-success"
                      : user.kycStatus === "pending"
                        ? "bg-warning/10 text-warning"
                        : "bg-white/10 text-gray-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      user.kycStatus === "verified"
                        ? "bg-success"
                        : user.kycStatus === "pending"
                          ? "bg-warning"
                          : "bg-gray-400"
                    }`}
                  />
                  {user.kycStatus === "verified"
                    ? "Verifye"
                    : user.kycStatus === "pending"
                      ? "An Atant"
                      : "Pa Verifye"}
                </span>
              </p>
            </div>
            {user.kycStatus === "unverified" && (
              <button className="px-4 py-2 bg-gold/10 text-gold border border-gold/20 rounded-lg text-xs font-bold cursor-pointer hover:bg-gold/20 transition-all hover:shadow-[0_0_10px_rgba(212,168,67,0.1)]">
                Verifye Idantite
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
