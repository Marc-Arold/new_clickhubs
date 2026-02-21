import { useEffect } from "react";
import {
  X,
  Clock,
  Trophy,
  Swords,
  ArrowDownToLine,
  ArrowUpFromLine,
  Zap,
  Gift,
  ShieldAlert,
  Gamepad2,
} from "lucide-react";
import { notificationsMock } from "../../data/mockData";

const typeConfig = {
  game_start: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  round_result: { icon: Trophy, color: "text-success", bg: "bg-success/10" },
  challenge: { icon: Swords, color: "text-gold", bg: "bg-gold/10" },
  withdrawal: {
    icon: ArrowUpFromLine,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  deposit: {
    icon: ArrowDownToLine,
    color: "text-success",
    bg: "bg-success/10",
  },
  jackpot: { icon: Zap, color: "text-gold", bg: "bg-gold/10" },
  referral: { icon: Gift, color: "text-purple-400", bg: "bg-purple-400/10" },
  security: { icon: ShieldAlert, color: "text-danger", bg: "bg-danger/10" },
};

export default function NotificationDrawer({ onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-dark-accent border-l border-white/10 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-bold text-lg">Notifikasyon</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto">
          {notificationsMock.length === 0 ? (
            <div className="text-center py-16">
              <Gamepad2 size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                Pa gen nouvo notifikasyon.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {notificationsMock.map((notif) => {
                const config = typeConfig[notif.type] || typeConfig.game_start;
                const Icon = config.icon;
                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer ${
                      !notif.read ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <Icon size={16} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm leading-snug ${notif.read ? "text-gray-400" : "text-white"}`}
                      >
                        {notif.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
