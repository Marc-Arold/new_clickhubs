import { Link, useLocation } from "react-router-dom";
import { Home, Gamepad2, Wallet, Trophy, User, LogOut, Plus, ArrowDownToLine } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/jwet", label: "Jwèt", icon: Gamepad2 },
  { path: "/potfey", label: "Wallet", icon: Wallet },
  { path: "/klasman", label: "Klasman", icon: Trophy },
  { path: "/profil", label: "Profil", icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-dark-accent/90 to-dark-accent/70 backdrop-blur-xl border-r border-white/5 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link to="/dashboard" className="no-underline flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(212,168,67,0.2)]">
            <span className="text-dark font-black text-xs">CH</span>
          </div>
          <span className="text-gold font-extrabold text-xl tracking-wider">
            CLIC HUBS
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-2">
          Navigasyon
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-200 relative ${
                isActive
                  ? "bg-gold/10 text-gold accent-bar-left"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(212,168,67,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick deposit CTA */}
      <div className="px-4 mb-2">
        <Link
          to="/potfey"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold hover:to-yellow-500 text-gold hover:text-dark font-bold text-sm py-3 rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 no-underline"
        >
          <ArrowDownToLine size={16} />
          Depoze Vit
        </Link>
      </div>

      {/* Wallet summary */}
      {user && (
        <div className="p-4 border-t border-white/5">
          <div className="glass-card-gold rounded-xl p-4 mb-3 card-shine">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Balans Disponib
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-2xl font-black">
              {user.availableBalance.toLocaleString()} HTG
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gold/10">
              <div>
                <p className="text-gray-600 text-[10px]">Nan jwèt</p>
                <p className="text-white text-sm font-semibold">
                  {user.escrowedBalance.toLocaleString()} HTG
                </p>
              </div>
              <Link
                to="/potfey"
                className="w-8 h-8 rounded-lg bg-gold/10 hover:bg-gold/20 flex items-center justify-center text-gold transition-colors no-underline"
              >
                <Plus size={16} />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-yellow-500/20 flex items-center justify-center text-gold text-xs font-bold border border-gold/20">
                {user.avatarInitials}
              </div>
              <span className="text-gray-300 text-sm">{user.displayName}</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-danger bg-transparent border-none cursor-pointer p-1.5 rounded-lg hover:bg-danger/10 transition-all"
              title="Dekonekte"
              aria-label="Dekonekte"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
