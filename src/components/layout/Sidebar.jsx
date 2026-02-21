import { Link, useLocation } from "react-router-dom";
import { Home, Gamepad2, Wallet, Trophy, User, LogOut } from "lucide-react";
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
    <aside className="hidden lg:flex flex-col w-64 bg-dark-accent border-r border-white/10 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/dashboard" className="no-underline">
          <span className="text-gold font-extrabold text-xl tracking-wider">
            CLIC HUBS
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors ${
                isActive
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Wallet summary */}
      {user && (
        <div className="p-4 border-t border-white/10">
          <div className="bg-dark-surface rounded-xl p-4 mb-3">
            <p className="text-gray-500 text-xs mb-1">Balans Disponib</p>
            <p className="text-gold text-xl font-bold">
              {user.availableBalance.toLocaleString()} HTG
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Nan jwèt:{" "}
              <span className="text-white">
                {user.escrowedBalance.toLocaleString()} HTG
              </span>
            </p>
          </div>

          {/* User info + logout */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                {user.avatarInitials}
              </div>
              <span className="text-gray-300 text-sm">{user.displayName}</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-danger bg-transparent border-none cursor-pointer p-1"
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
