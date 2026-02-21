import { Link } from 'react-router-dom'
import { Crown, ArrowRight } from 'lucide-react'
import { leaderboardMock } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'

const medalColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600']

export default function LeaderboardTeaser() {
  const { user } = useAuth()
  const top3 = leaderboardMock.slice(0, 3)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">Klasman Semèn nan</h2>
        <Link
          to="/klasman"
          className="text-gold text-xs font-medium no-underline hover:text-gold-light flex items-center gap-1"
        >
          Wè tout <ArrowRight size={12} />
        </Link>
      </div>

      <div className="bg-dark-surface border border-white/10 rounded-xl p-4">
        {/* Top 3 */}
        <div className="space-y-3 mb-4">
          {top3.map((player, i) => (
            <div key={player.rank} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i === 0 ? 'bg-yellow-400/20' : i === 1 ? 'bg-gray-300/20' : 'bg-amber-600/20'
              }`}>
                <Crown size={14} className={medalColors[i]} />
              </div>
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold">
                {player.initials}
              </div>
              <span className="text-white text-sm font-medium flex-1">{player.username}</span>
              <span className="text-gold text-sm font-bold">{player.winnings.toLocaleString()} HTG</span>
            </div>
          ))}
        </div>

        {/* Player's own rank */}
        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center gap-3 bg-gold/5 border border-gold/10 rounded-lg px-3 py-2">
            <span className="text-gray-400 text-xs font-medium">#{user.rank}</span>
            <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
              {user.avatarInitials}
            </div>
            <span className="text-white text-sm flex-1">{user.displayName} <span className="text-gray-500">(ou)</span></span>
            <span className="text-gold text-sm font-bold">{user.stats.totalWon.toLocaleString()} HTG</span>
          </div>
        </div>
      </div>
    </div>
  )
}
