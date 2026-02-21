import { useState, useEffect } from "react";
import { X, ArrowLeft, Check } from "lucide-react";
import OTPInput from "./OTPInput";

export default function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState(1); // 1: phone, 2: OTP, 3: new password, 4: success
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    // API stub
    setStep(2);
    setResendTimer(60);
  };

  const handleOTPComplete = () => {
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 8 || newPassword !== confirmPassword) return;
    // API stub
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-dark-accent border border-white/10 rounded-2xl p-6 w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1"
        >
          <X size={20} />
        </button>

        {/* Step 1: Enter phone */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <h3 className="text-xl font-bold text-white">Bliye modpas?</h3>
            <p className="text-gray-400 text-sm">
              Antre nimewo telefòn ou pou resevwa yon kòd la.
            </p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+509 XXXX-XXXX"
              className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
            />
            <button
              type="submit"
              disabled={!phone.trim()}
              className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                phone.trim()
                  ? "bg-gold hover:bg-gold-light text-dark cursor-pointer"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              Voye Kòd la
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="space-y-5">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0"
            >
              <ArrowLeft size={14} /> Retounen
            </button>
            <h3 className="text-xl font-bold text-white">Antre kòd la</h3>
            <p className="text-gray-400 text-sm">
              Kòd voye sou <span className="text-white">{phone}</span>
            </p>
            <OTPInput onComplete={handleOTPComplete} />
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-gray-500 text-sm">
                  Revoye nan {resendTimer}s
                </p>
              ) : (
                <button
                  onClick={() => setResendTimer(60)}
                  className="text-gold text-sm bg-transparent border-none cursor-pointer font-medium"
                >
                  Revoye kòd la
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: New password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <h3 className="text-xl font-bold text-white">Nouvo modpas</h3>
            <p className="text-gray-400 text-sm">
              Chwazi yon nouvo modpas pou kont ou.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Nouvo modpas
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Omwen 8 karaktè"
                className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Konfime modpas
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Tape modpas la ankò"
                className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-danger text-xs mt-1">Modpas yo pa menm.</p>
              )}
            </div>
            <button
              type="submit"
              disabled={
                newPassword.length < 8 || newPassword !== confirmPassword
              }
              className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                newPassword.length >= 8 && newPassword === confirmPassword
                  ? "bg-gold hover:bg-gold-light text-dark cursor-pointer"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              Chanje Modpas la
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <Check size={28} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-white">Modpas chanje!</h3>
            <p className="text-gray-400 text-sm">
              Ou ka konekte kounye a ak nouvo modpas la.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Retounen konekte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
