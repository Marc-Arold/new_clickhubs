import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const mockUser = {
  id: "usr_001",
  fullName: "Jean Baptiste",
  displayName: "JeanB",
  email: "jean@exemple.com",
  phone: "+509 3456-7890",
  avatarInitials: "JB",
  availableBalance: 12500,
  escrowedBalance: 3000,
  bonusBalance: 500,
  totalDeposits: 35000,
  kycStatus: "unverified", // unverified | pending | verified
  referralCode: "JEAN2026",
  referralCount: 3,
  referralBonus: 1500,
  stats: {
    totalGamesPlayed: 47,
    winRate: 0.34,
    totalWagered: 82000,
    totalWon: 67500,
    biggestSingleWin: 18000,
    currentWinStreak: 2,
  },
  rank: 47,
  createdAt: "2026-01-15",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // true for dev

  const login = () => {
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateBalance = (available, escrowed) => {
    setUser((prev) => ({
      ...prev,
      availableBalance: Math.max(0, available ?? prev.availableBalance),
      escrowedBalance: Math.max(0, escrowed ?? prev.escrowedBalance),
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
