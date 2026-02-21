import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check, AlertCircle, PartyPopper } from "lucide-react";
import OTPInput from "./OTPInput";

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["Trè fèb", "Fèb", "Mwayen", "Fò", "Trè fò"];
const strengthColors = [
  "bg-danger",
  "bg-danger",
  "bg-warning",
  "bg-success",
  "bg-success",
];

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    ageConfirm: false,
    termsAccept: false,
    referralCode: "",
  });

  // Resend OTP countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: value });
    setError("");
  };

  const passwordStrength = getPasswordStrength(form.password);

  const canSubmitStep1 =
    form.fullName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword &&
    form.ageConfirm &&
    form.termsAccept;

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Modpas yo pa menm.");
      return;
    }
    if (form.password.length < 8) {
      setError("Modpas dwe gen omwen 8 karaktè.");
      return;
    }
    // API call stub — would call registerUser()
    setStep(2);
    setResendTimer(60);
  };

  const handleOTPComplete = () => {
    // API call stub — would call verifyOTP()
    setStep(3);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    setResendTimer(60);
    // API call stub
  };

  // Step 1: Basic Info
  if (step === 1) {
    return (
      <form onSubmit={handleStep1Submit} className="space-y-5">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s === step
                    ? "bg-gold text-dark"
                    : s < step
                      ? "bg-success text-white"
                      : "bg-white/10 text-gray-500"
                }`}
              >
                {s < step ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-0.5 ${s < step ? "bg-success" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white">Kreye Kont Ou</h2>
        <p className="text-gray-400 text-sm">
          Antre enfòmasyon ou pou kreye yon kont gratis.
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-lg">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Non konplè
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={handleChange("fullName")}
            placeholder="Jean Baptiste"
            className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Adrès imèl</label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="jean@exemple.com"
            className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Nimewo telefòn{" "}
            <span className="text-gray-500">(itilize pou MonCash)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="+509 XXXX-XXXX"
            className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Modpas
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Omwen 8 karaktè"
              className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white bg-transparent border-none cursor-pointer p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < passwordStrength ? strengthColors[passwordStrength] : "bg-white/10"}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {strengthLabels[passwordStrength]}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Konfime modpas
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Tape modpas la ankò"
            className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
          />
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="text-danger text-xs mt-1">Modpas yo pa menm.</p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.ageConfirm}
              onChange={handleChange("ageConfirm")}
              className="mt-0.5 w-4 h-4 accent-gold"
            />
            <span className="text-sm text-gray-300">
              Mwen gen 18 an oswa plis.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.termsAccept}
              onChange={handleChange("termsAccept")}
              className="mt-0.5 w-4 h-4 accent-gold"
            />
            <span className="text-sm text-gray-300">
              Mwen aksepte{" "}
              <a href="#" className="text-gold hover:underline">
                Tèm ak Kondisyon
              </a>{" "}
              yo.
            </span>
          </label>
        </div>

        {/* Referral code */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Kòd referans <span className="text-gray-500">(opsyonèl)</span>
          </label>
          <input
            type="text"
            value={form.referralCode}
            onChange={handleChange("referralCode")}
            placeholder="Antre kòd la isit"
            className="w-full px-4 py-3 bg-dark-surface border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm"
          />
          {form.referralCode && (
            <p className="text-success text-xs mt-1">
              Ou ak zanmi ou ap resevwa 500 HTG bonus sou premye depo!
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmitStep1}
          className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all ${
            canSubmitStep1
              ? "bg-gold hover:bg-gold-light text-dark cursor-pointer"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          Kontinye
        </button>

        <p className="text-center text-sm text-gray-400">
          Ou gen yon kont deja?{" "}
          <Link
            to="/konekte"
            className="text-gold hover:underline no-underline"
          >
            Konekte
          </Link>
        </p>
      </form>
    );
  }

  // Step 2: Phone Verification (OTP)
  if (step === 2) {
    return (
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s === step
                    ? "bg-gold text-dark"
                    : s < step
                      ? "bg-success text-white"
                      : "bg-white/10 text-gray-500"
                }`}
              >
                {s < step ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-0.5 ${s < step ? "bg-success" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Verifye Telefòn Ou
          </h2>
          <p className="text-gray-400 text-sm">
            Nou voye yon kòd 6 chif sou{" "}
            <span className="text-white font-medium">{form.phone}</span>
          </p>
        </div>

        <OTPInput onComplete={handleOTPComplete} />

        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-gray-500 text-sm">
              Revoye kòd la nan {resendTimer}s
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-gold hover:text-gold-light text-sm bg-transparent border-none cursor-pointer font-medium"
            >
              Revoye kòd la
            </button>
          )}
        </div>

        <button
          onClick={() => setStep(1)}
          className="w-full py-3 rounded-lg font-medium text-sm bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
        >
          Retounen
        </button>
      </div>
    );
  }

  // Step 3: Welcome
  return (
    <div className="text-center space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s === step
                  ? "bg-gold text-dark"
                  : s < step
                    ? "bg-success text-white"
                    : "bg-white/10 text-gray-500"
              }`}
            >
              {s <= step ? <Check size={16} /> : s}
            </div>
            {s < 3 && <div className="flex-1 h-0.5 bg-success" />}
          </div>
        ))}
      </div>

      <div className="w-20 h-20 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
        <PartyPopper size={40} className="text-gold" />
      </div>

      <h2 className="text-3xl font-bold text-white">
        Byenveni nan Clic Hubs, {form.fullName.split(" ")[0]}!
      </h2>
      <p className="text-gray-400 text-lg max-w-sm mx-auto">
        Fè yon depo kounye a epi resevwa premye bonus ou — envite yon zanmi pou
        double li.
      </p>

      <div className="flex flex-col gap-3 max-w-sm mx-auto pt-4">
        <Link
          to="/potfey"
          className="w-full py-3.5 rounded-lg font-bold text-sm bg-gold hover:bg-gold-light text-dark transition-all no-underline text-center"
        >
          Fè premye depo ou
        </Link>
        <Link
          to="/jwet"
          className="w-full py-3.5 rounded-lg font-medium text-sm bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors no-underline text-center"
        >
          Eksplore Jwèt yo
        </Link>
      </div>
    </div>
  );
}
