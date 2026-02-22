import { useState } from "react";
import { Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AccountSettings() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [language, setLanguage] = useState("kreyol");
  const [notifPrefs, setNotifPrefs] = useState({
    gameStart: true,
    results: true,
    challenges: true,
    withdrawals: true,
    marketing: false,
  });

  const toggleNotif = (key) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gray-400" />
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <Settings size={18} className="text-gray-400" />
          Paramèt Kont lan
        </h2>
      </div>

      <div className="glass-card rounded-xl divide-y divide-white/5 overflow-hidden">
        {/* Display name */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Non itilizatè
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-dark-accent/50 border border-white/10 rounded-lg text-white text-sm focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
            />
            <button className="px-4 py-2.5 bg-gold/10 text-gold border border-gold/20 rounded-lg text-sm font-bold cursor-pointer hover:bg-gold/20 transition-all hover:shadow-[0_0_10px_rgba(212,168,67,0.1)]">
              Chanje
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Ou ka chanje non ou 1 fwa pa mwa.
          </p>
        </div>

        {/* Change password */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium">Modpas</p>
              <p className="text-gray-500 text-xs">Chanje modpas kont ou</p>
            </div>
            <button className="px-4 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-xs font-medium cursor-pointer hover:text-white hover:border-white/20 transition-colors">
              Chanje modpas
            </button>
          </div>
        </div>

        {/* Update phone */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium">
                Nimewo telefòn
              </p>
              <p className="text-gray-500 text-xs">{user.phone}</p>
            </div>
            <button className="px-4 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-xs font-medium cursor-pointer hover:text-white hover:border-white/20 transition-colors">
              Mete ajou
            </button>
          </div>
        </div>

        {/* Notification preferences */}
        <div className="p-5 space-y-3">
          <p className="text-gray-300 text-sm font-medium mb-3">
            Preferans notifikasyon
          </p>
          {[
            { key: "gameStart", label: "Jwèt ki pral kòmanse" },
            { key: "results", label: "Rezilta jwèt" },
            { key: "challenges", label: "Defi youn-kont-youn" },
            { key: "withdrawals", label: "Retrè trete" },
            { key: "marketing", label: "Pwomosyon ak nouvo jwèt" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{label}</span>
              <button
                onClick={() => toggleNotif(key)}
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer border-none ${
                  notifPrefs[key] ? "bg-gold shadow-[0_0_8px_rgba(212,168,67,0.2)]" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 bg-white rounded-full absolute top-[3px] transition-transform shadow-sm ${
                    notifPrefs[key] ? "translate-x-[22px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </label>
          ))}
        </div>

        {/* Language */}
        <div className="p-5">
          <p className="text-gray-300 text-sm font-medium mb-2">Lang</p>
          <div className="flex gap-2">
            {[
              { key: "kreyol", label: "Kreyòl" },
              { key: "francais", label: "Français" },
              { key: "english", label: "English" },
            ].map((lang) => (
              <button
                key={lang.key}
                onClick={() => setLanguage(lang.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer border transition-all ${
                  language === lang.key
                    ? "bg-gold/10 text-gold border-gold/20 shadow-[0_0_8px_rgba(212,168,67,0.1)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
