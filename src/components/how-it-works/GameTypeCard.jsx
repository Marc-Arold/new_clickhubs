import { Trophy, Monitor, Swords, Zap } from 'lucide-react'
import { gameTypes } from '../../data/mockData'

const icons = {
  trophy: Trophy,
  monitor: Monitor,
  swords: Swords,
  jackpot: Zap,
}

export default function GameTypeCards() {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3">Tip Jwèt yo</h2>
        <p className="text-gray-400 text-lg mb-8">Yon ti eksplikasyon pou chak tip jwèt sou platfòm nan.</p>

        <div className="space-y-6">
          {gameTypes.map((game, index) => {
            const Icon = icons[game.icon] || Trophy
            return (
              <div
                key={index}
                className="bg-dark-surface border border-white/10 rounded-2xl p-6 hover:border-gold/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{game.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{game.description}</p>
                    <div className="bg-dark-accent rounded-lg px-4 py-2 inline-block">
                      <p className="text-gold text-sm font-medium">{game.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
