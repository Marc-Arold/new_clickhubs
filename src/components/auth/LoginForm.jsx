import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || "/dashboard";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const isLockedOut = lockoutTimer > 0;

  useEffect(() => {
    if (lockoutTimer > 0) {
      const t = setTimeout(() => setLockoutTimer(lockoutTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [lockoutTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    // Mock login: accept any non-empty credentials
    if (identifier.trim() && password) {
      login({ identifier, password });
      navigate(returnUrl);
      return;
    }

    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);

    if (newAttempts >= 5) {
      setLockoutTimer(15 * 60);
      setError("Kont lan bloke pou 15 minit apre twòp tantativ.");
      return;
    }

    setError("Nimewo oswa modpas la bon.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-4 bg-gold/10 rounded-xl flex items-center justify-center">
            <Lock size={24} className="text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-white">Konekte</h2>
          <p className="text-gray-400 text-sm mt-1">
            Antre nan kont ou pou kontinye jwe.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-lg">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLockedOut && (
          <div className="bg-danger/10 border border-danger/20 text-center py-4 rounded-lg">
            <p className="text-danger text-sm font-medium">Kont bloke</p>
            <p className="text-danger text-2xl font-bold mt-1">
              {formatTime(lockoutTimer)}
            </p>
            <a
              href="#"
              className="text-gold text-xs hover:underline mt-2 inline-block"
            >
              Kontakte Nou Pou Sipò
            </a>
          </div>
        )}

        <div>
          <label
            htmlFor="login-identifier"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Nimewo telefòn oswa imèl
          </label>
          <input
            id="login-identifier"
            type="text"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError("");
            }}
            placeholder="+509 XXXX-XXXX"
            disabled={isLockedOut}
            className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Modpas
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Antre modpas ou"
              disabled={isLockedOut}
              className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm pr-12 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white bg-transparent border-none cursor-pointer p-1"
              aria-label={showPassword ? "Kache modpas" : "Montre modpas"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <span className="text-sm text-gray-300">Sonje m</span>
          </label>
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-gold hover:text-gold-light text-sm bg-transparent border-none cursor-pointer font-medium"
          >
            Ou Bliye modpas la?
          </button>
        </div>

        <button
          type="submit"
          disabled={!identifier.trim() || !password || isLockedOut}
          className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all ${
            identifier.trim() && password && !isLockedOut
              ? "bg-gold hover:bg-gold-light text-dark cursor-pointer"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          Konekte
        </button>

        <p className="text-center text-sm text-gray-400">
          Ou pa gen kont?{" "}
          <Link to="/enskri" className="text-gold hover:underline no-underline">
            Kreye yon kont gratis
          </Link>
        </p>
      </form>

      {showForgotModal && (
        <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
      )}
    </>
  );
}
