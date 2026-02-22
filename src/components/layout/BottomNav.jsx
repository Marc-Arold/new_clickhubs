import { Link, useLocation } from "react-router-dom";
import { Home, Gamepad2, Trophy, Wallet, User } from "lucide-react";

const tabs = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/jwet", label: "Jwèt", icon: Gamepad2 },
  { path: "/klasman", label: "Klasman", icon: Trophy },
  { path: "/potfey", label: "Wallet", icon: Wallet },
  { path: "/profil", label: "Pwofil", icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-accent/95 backdrop-blur-xl border-t border-white/5 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full no-underline transition-all relative ${
                isActive ? "text-gold" : "text-gray-500"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-gold to-yellow-400 rounded-full shadow-[0_0_8px_rgba(212,168,67,0.4)]" />
              )}
              <tab.icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-2.5 w-1 h-1 rounded-full bg-gold shadow-[0_0_4px_rgba(212,168,67,0.6)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
