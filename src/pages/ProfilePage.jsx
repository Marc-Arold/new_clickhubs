import { useAuth } from '../context/AuthContext'
import StatsPanel from '../components/profile/StatsPanel'
import BadgesGrid from '../components/profile/BadgesGrid'
import ReferralHub from '../components/profile/ReferralHub'
import AccountSettings from '../components/profile/AccountSettings'
import ResponsibleGaming from '../components/profile/ResponsibleGaming'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl space-y-8">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold text-2xl font-bold">
          {user.avatarInitials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
          <p className="text-gray-400 text-sm">@{user.displayName} · Manm depi Janvye 2026</p>
        </div>
      </div>

      <StatsPanel />
      <BadgesGrid />
      <ReferralHub />
      <AccountSettings />
      <ResponsibleGaming />
    </div>
  )
}
