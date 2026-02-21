import { Trophy } from 'lucide-react'

export default function BracketView({ bracket, currentRound }) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-sm">Tablò Tounwa</h3>
      <div className="space-y-6">
        {bracket.map((round) => (
          <div key={round.round}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                round.round < currentRound ? 'bg-success/20 text-success' :
                round.round === currentRound ? 'bg-gold/20 text-gold' :
                'bg-white/5 text-gray-500'
              }`}>
                {round.round}
              </div>
              <span className={`text-sm font-medium ${
                round.round === currentRound ? 'text-gold' : 'text-gray-400'
              }`}>
                Round {round.round}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
              {round.matches.map((m) => (
                <div
                  key={m.id}
                  className={`bg-dark-surface border rounded-lg p-3 ${
                    round.round <= currentRound ? 'border-white/10' : 'border-white/5'
                  }`}
                >
                  {m.players[0] && m.players[1] ? (
                    <div className="space-y-1.5">
                      {m.players.map((player, i) => {
                        const isWinner = m.winner === player
                        const isYou = player === 'Ou'
                        return (
                          <div key={i} className={`flex items-center justify-between text-sm ${
                            m.winner ? (isWinner ? 'text-white' : 'text-gray-600 line-through') : 'text-gray-300'
                          }`}>
                            <span className={`font-medium ${isYou ? 'text-gold' : ''}`}>
                              {player}
                              {isWinner && <Trophy size={12} className="inline ml-1 text-gold" />}
                            </span>
                            {m.horsePicks[i] && (
                              <span className="text-xs text-gray-500">Cheval #{m.horsePicks[i]}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-xs text-center">Ap tann...</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
