import { useNavigate } from 'react-router-dom'
import { ArrowRight, Users, Clock, Repeat } from 'lucide-react'
import { pronosContestsMock } from '../data/mockData'

function JackpotBadge({ weeks }) {
  if (weeks === 0) return null
  return (
    <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/30 uppercase tracking-wide">
      <Repeat size={8} /> {weeks}x report
    </span>
  )
}

function ContestCard({ contest, onEnter }) {
  const deadline = new Date(contest.deadline)
  const now = new Date()
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))

  return (
    <div className="group relative bg-dark-surface border border-white/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      {/* Ambient glow */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-gold/10 transition-all" />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🏆</span>
              <p className="text-white font-bold text-sm">{contest.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/20 font-bold uppercase tracking-wide">
                Ouvri
              </span>
              <JackpotBadge weeks={contest.rolloverWeeks} />
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-gold font-black text-xl">{contest.entryFee.toLocaleString()}</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wide">HTG / fich</p>
          </div>
        </div>

        {/* Jackpot */}
        <div className="bg-dark/60 border border-white/5 rounded-xl p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">Jackpot kounye a</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300 text-2xl font-black">
            {contest.jackpot.toLocaleString()} <span className="text-xs text-gold/50">HTG</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-white font-bold text-sm">{contest.participants.toLocaleString()}</p>
            <p className="text-gray-500 text-[10px] flex items-center justify-center gap-0.5">
              <Users size={9} /> Jwè
            </p>
          </div>
          <div>
            <p className="text-white font-bold text-sm">{contest.totalFiches.toLocaleString()}</p>
            <p className="text-gray-500 text-[10px]">Fich</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm">{daysLeft}j</p>
            <p className="text-gray-500 text-[10px] flex items-center justify-center gap-0.5">
              <Clock size={9} /> Rete
            </p>
          </div>
        </div>

        {/* Odds tiers strip */}
        <div className="flex gap-1 flex-wrap">
          {contest.oddsTiers.map(t => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 font-bold border border-white/10">
              ×{t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onEnter(contest.id)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold hover:to-yellow-500 text-gold hover:text-dark border border-gold/20 hover:border-gold transition-all cursor-pointer group/cta"
        >
          <span>Antre nan Konkurans</span>
          <ArrowRight size={15} className="group-hover/cta:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

export default function PronosEliminatorLobbyPage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-48 h-48 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="text-3xl">🏆</span> Pronos Eliminator
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Bati yon fich ak kote kominèd ≥20 — genyen pati ou nan jackpot la!
          </p>
        </div>
      </div>

      {/* How distribution works */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { icon: '📋', label: 'Chwazi evènman', desc: 'Kote × = fich ou' },
          { icon: '🎯', label: 'Kote ≥ 20', desc: 'Minimòm pou soumèt' },
          { icon: '📊', label: 'Distribisyon pwopòsyonèl', desc: 'Pi gwo kote = pi gwo pati' },
          { icon: '🔄', label: 'Jackpot akimile', desc: 'Si pa genyan, pòt la woule' },
        ].map(item => (
          <div key={item.label} className="shrink-0 flex items-center gap-2 px-3 py-2 bg-dark-surface border border-white/10 rounded-xl text-xs">
            <span>{item.icon}</span>
            <div>
              <p className="text-white font-medium">{item.label}</p>
              <p className="text-gray-500 text-[10px]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contest cards grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {pronosContestsMock.map(contest => (
          <ContestCard
            key={contest.id}
            contest={contest}
            onEnter={id => navigate(`/pronos/${id}`)}
          />
        ))}
      </div>

      {/* Rules at bottom */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold text-sm mb-3">📋 Règ Jeneral</h3>
        <ul className="space-y-2 text-gray-400 text-xs">
          {[
            'Chwazi ant 2 ak 8 evènman pou fich ou. Kote kominèd dwe ≥ 20.',
            'Limite 2 fich pa jwè pa konkurans. 2yèm fich la rele "Remiz".',
            'Distribisyon pwopòsyonèl: genyan ak pi gwo kote resevwa plis.',
            'Planché minimòm: chak genyan dwe resevwa omwen kote × mise yo.',
            'Si pa genyen semèn nan, jackpot akimile pou semèn pwochèn.',
            'Platfòm kenbe 5% pòt la kòm frè administrasyon.',
          ].map((rule, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
