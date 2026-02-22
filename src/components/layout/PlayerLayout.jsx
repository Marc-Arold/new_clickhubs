import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bell, Plus } from "lucide-react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import NotificationDrawer from "../notifications/NotificationDrawer";
import { useAuth } from "../../context/AuthContext";
import { notificationsMock } from "../../data/mockData";
import { Link } from "react-router-dom";

export default function PlayerLayout() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notificationsMock.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-dark-accent/90 backdrop-blur-xl border-b border-white/5 relative">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="flex items-center justify-between px-4 lg:px-8 h-14">
            <span className="lg:hidden text-gold font-extrabold text-lg tracking-wider">
              CLIC HUBS
            </span>

            <div className="hidden lg:flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-yellow-500/20 flex items-center justify-center text-gold text-xs font-bold border border-gold/20">
                {user?.avatarInitials}
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">
                  Bonjou,{" "}
                  <span className="text-gold font-bold">
                    {user?.displayName}
                  </span>
                </p>
                <p className="text-gray-500 text-[10px] leading-tight">
                  Balans:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 font-bold text-xs">
                    {user?.availableBalance?.toLocaleString()} HTG
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/potfey"
                className="lg:hidden inline-flex items-center gap-1.5 bg-gradient-to-r from-gold to-yellow-500 text-dark font-bold text-[10px] px-3 py-1.5 rounded-lg no-underline"
              >
                <Plus size={12} />
                Depo
              </Link>

              <Link
                to="/potfey"
                className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold hover:to-yellow-500 text-gold hover:text-dark font-bold text-xs px-4 py-2 rounded-lg border border-gold/20 hover:border-gold transition-all no-underline"
              >
                <Plus size={14} />
                Depoze
              </Link>

              <button
                onClick={() => setShowNotifications(true)}
                className="relative text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg cursor-pointer p-2 transition-all"
                aria-label={`${unreadCount} nouvo notifikasyon`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-dark-accent">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 bg-grid-pattern">
          <Outlet />
        </main>
      </div>

      <BottomNav />

      {showNotifications && (
        <NotificationDrawer onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}
