import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Clock, Trophy, Monitor, Landmark, Zap, ChevronDown, ChevronUp } from 'lucide-react'

const typeIcons = {
  sports: Trophy,
  simulated: Monitor,
  'bank-pari': Landmark,
}

const statusColors = {
  'Ouvri': 'bg-success/20 text-success',
  'Ap ranpli vit': 'bg-warning/20 text-warning',
  'Fèmen': 'bg-danger/20 text-danger',
}

export default function GameLobbyCard({ game }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const Icon = typeIcons[game.type] || Trophy
  const fillPercent = Math.round((game.playersIn / game.maxPlayers) * 100)

  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden hover:border-gold/20 transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Icon size={20} className="text-gold" />
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[game.status] || statusColors['Ouvri']}`}>
            {game.status}
          </span>
        </div>

        <h3 className="text-white font-semibold text-sm mb-3">{game.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Pòt:</span>
            <span className="text-gold font-bold">{game.prizePool.toLocaleString()} HTG</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Antre:</span>
            <span className="text-white font-medium">{game.entryFee.toLocaleString()} HTG</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <Users size={14} />
              <span>Jwè:</span>
            </div>
            <span className="text-white font-medium">{game.playersIn} / {game.maxPlayers}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-gold rounded-full h-1.5 transition-all" style={{ width: `${fillPercent}%` }} />
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock size={12} />
            <span>Kòmanse nan {game.startsIn}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(game.route)}
            className="flex-1 bg-gold hover:bg-gold-light text-dark font-bold text-sm py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Antre
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors"
          >
            {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-white/10 px-5 py-4 bg-dark-accent/30">
          <h4 className="text-white font-medium text-sm mb-2">Règ yo</h4>
          <ul className="space-y-1.5 text-gray-400 text-xs">
            <li>Chak jwè peye frè antre a pou antre nan pòt la.</li>
            <li>Genyan an (oswa genyan yo) resevwa pòt total la mwens 10% frè platfòm.</li>
            <li>Tout lajan kenbe an eskwo jiskaske rezilta konfime.</li>
            <li>Si match la anile, tout lajan retounen otomatikman.</li>
          </ul>
          <div className="mt-3 bg-dark-surface rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Estrikti Peman</p>
            <p className="text-gold text-sm font-medium">
              1ye plas: 90% pòt • 2yèm-3yèm: 10% pòt
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
