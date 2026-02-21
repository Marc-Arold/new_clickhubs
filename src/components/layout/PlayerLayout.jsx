import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Bell } from 'lucide-react'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import NotificationDrawer from '../notifications/NotificationDrawer'
import { useAuth } from '../../context/AuthContext'
import { notificationsMock } from '../../data/mockData'

export default function PlayerLayout() {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = notificationsMock.filter(n => !n.read).length

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile + desktop) */}
        <header className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between px-4 lg:px-8 h-14">
            {/* Mobile logo */}
            <span className="lg:hidden text-gold font-extrabold text-lg tracking-wider">
              CLIC HUBS
            </span>

            {/* Desktop: greeting */}
            <div className="hidden lg:block">
              <p className="text-white text-sm font-medium">
                Bonjou, <span className="text-gold">{user?.displayName}</span>
              </p>
            </div>

            {/* Notification bell */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-2"
              aria-label={`${unreadCount} nouvo notifikasyon`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNav />

      {showNotifications && (
        <NotificationDrawer onClose={() => setShowNotifications(false)} />
      )}
    </div>
  )
}
