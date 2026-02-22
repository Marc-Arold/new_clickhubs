import { useAuth } from "../context/AuthContext";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import StatsPanel from "../components/profile/StatsPanel";
import BadgesGrid from "../components/profile/BadgesGrid";
import ReferralHub from "../components/profile/ReferralHub";
import AccountSettings from "../components/profile/AccountSettings";
import ResponsibleGaming from "../components/profile/ResponsibleGaming";

const kycConfig = {
  verified: { label: "Verifye", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  pending: { label: "An Atant", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  unverified: { label: "Pa Verifye", color: "text-gray-400", bg: "bg-white/10", icon: XCircle },
};

export default function ProfilePage() {
  const { user } = useAuth();
  const kyc = kycConfig[user.kycStatus] || kycConfig.unverified;
  const KycIcon = kyc.icon;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Hero profile header */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 rounded-2xl z-0" />
        <div className="relative glass-card rounded-2xl overflow-hidden z-10">
          {/* Background banner */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-dark-accent via-dark-surface to-dark-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-surface" />
            {/* Decorative elements */}
            <div className="absolute top-4 left-[10%] w-2 h-2 bg-gold/20 rounded-full animate-float blur-[1px]" />
            <div className="absolute top-8 right-[15%] w-1.5 h-1.5 bg-gold/30 rounded-full animate-float-delayed" />
          </div>

          {/* Profile info */}
          <div className="px-6 pb-6 -mt-10 relative z-10">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-gold to-yellow-500 shadow-[0_0_25px_rgba(212,168,67,0.2)]">
                <div className="w-full h-full rounded-full bg-dark-surface flex items-center justify-center text-gold text-2xl font-black border-2 border-dark-surface">
                  {user.avatarInitials}
                </div>
              </div>

              <div className="flex-1 pb-1">
                <h1 className="text-2xl font-black text-white">{user.fullName}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-gray-400 text-sm">@{user.displayName}</p>
                  <span className="text-gray-600 text-xs">Manm depi Janvye 2026</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${kyc.bg} ${kyc.color}`}>
                    <KycIcon size={10} />
                    {kyc.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsPanel />
      <BadgesGrid />
      <ReferralHub />
      <AccountSettings />
      <ResponsibleGaming />
    </div>
  );
}
