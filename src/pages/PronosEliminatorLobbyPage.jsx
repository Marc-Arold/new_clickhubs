import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Clock, Repeat, X, HelpCircle } from "lucide-react";
import { pronosContestsMock } from "../data/mockData";

function JackpotBadge({ weeks }) {
  if (weeks === 0) return null;
  return (
    <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/30 uppercase tracking-wide">
      <Repeat size={8} /> {weeks}x report
    </span>
  );
}

function ContestCard({ contest, onEnter }) {
  const deadline = new Date(contest.deadline);
  const now = new Date();
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

  return (
    <div className="group relative bg-dark-surface border border-white/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col">
      {/* Ambient glow */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-gold/15 transition-all" />

      <div className="relative p-4 sm:p-5 flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl shrink-0">🏆</span>
              <p className="text-white font-bold text-base sm:text-lg truncate">
                {contest.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/20 font-bold uppercase tracking-wide">
                Ouvri
              </span>
              <JackpotBadge weeks={contest.rolloverWeeks} />
            </div>
          </div>
          <div className="text-right shrink-0 bg-dark/40 px-3 py-1.5 rounded-lg border border-white/5">
            <p className="text-gold font-black text-lg">
              {contest.entryFee.toLocaleString()}
            </p>
            <p className="text-gray-500 text-[9px] uppercase tracking-wide">
              HTG / fich
            </p>
          </div>
        </div>

        {/* Jackpot */}
        <div className="bg-gradient-to-br from-dark-surface/80 to-dark/90 border border-gold/10 rounded-xl p-3 sm:p-4 relative overflow-hidden group-hover:border-gold/20 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none group-hover:bg-gold/20 transition-colors" />
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 relative z-10">
            Maganngo Jackpot la
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold text-2xl sm:text-3xl font-black relative z-10">
            {contest.jackpot.toLocaleString()}{" "}
            <span className="text-xs text-gold/60">HTG</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-center mt-auto">
          <div className="bg-white/5 rounded-lg py-2 px-1">
            <p className="text-white font-bold text-sm sm:text-base">
              {contest.participants.toLocaleString()}
            </p>
            <p className="text-gray-400 text-[10px] flex items-center justify-center gap-1 uppercase tracking-wider">
              <Users size={10} /> Jwè
            </p>
          </div>
          <div className="bg-white/5 rounded-lg py-2 px-1">
            <p className="text-white font-bold text-sm sm:text-base">
              {contest.totalFiches.toLocaleString()}
            </p>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider">
              Fich
            </p>
          </div>
          <div className="bg-white/5 rounded-lg py-2 px-1">
            <p className="text-white font-bold text-sm sm:text-base">
              {daysLeft}j
            </p>
            <p className="text-gray-400 text-[10px] flex items-center justify-center gap-1 uppercase tracking-wider">
              <Clock size={10} /> Rete
            </p>
          </div>
        </div>

        {/* Odds tiers strip */}
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10px] text-gray-500 my-auto mr-1 font-medium">
            Kòt miltiplikatè:
          </span>
          {contest.oddsTiers.map((t) => (
            <span
              key={t}
              className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-dark/50 text-gold font-bold border border-gold/20"
            >
              ×{t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onEnter(contest.id)}
          className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark shadow-[0_0_15px_rgba(212,168,67,0.2)] hover:shadow-[0_0_20px_rgba(212,168,67,0.4)] transition-all cursor-pointer group/cta"
        >
          <span>Parye Kounye a</span>
          <ArrowRight
            size={16}
            className="group-hover/cta:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

export default function PronosEliminatorLobbyPage() {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="max-w-4xl max-w-full space-y-6 pb-10">
      {/* Hero Banner Ultra-Premium */}
      <div className="relative bg-dark-surface border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[160px]">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-gold/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Side: Content */}
        <div className="relative z-10 p-6 sm:p-8 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold text-[10px] font-black uppercase tracking-widest border border-gold/20">
              Jwe ak amatè
            </span>
            <button
              onClick={() => setShowHowItWorks(true)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              <HelpCircle size={14} /> Kijan sa mache?
            </button>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white italic tracking-tight leading-none mb-3">
            Jackpòt{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-400">
              ELIMINATOR
            </span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md">
            Fè yon fich. Si fich ou a pase ak pi gwo kòt pase tout moun, ou pran
            plis nan <strong>kòb la!</strong>
          </p>
        </div>

        {/* Right Side: Jackpot Spotlight */}
        <div className="relative w-full md:w-64 bg-dark/60 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 bg-gold/5" />
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 relative z-10 w-full">
            Gwo Jackpot Semèn Sa
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold text-4xl font-black relative z-10 drop-shadow-[0_0_15px_rgba(212,168,67,0.3)]">
            +900K <span className="text-sm">HTG</span>
          </p>
        </div>
      </div>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-dark-surface border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setShowHowItWorks(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span className="text-gold">⚡</span> Kijan lap mache?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "📋",
                    label: "1. Fè Chwa",
                    desc: "Chwazi rezilta reyèl sou match ak kreye yon fich",
                  },
                  {
                    icon: "🎯",
                    label: "2. Vize Lwen",
                    desc: "Miltipliye kòt yo. Minimòm pou reponn se yon kòt: 20",
                  },
                  {
                    icon: "💰",
                    label: "3. Pataje Gato a",
                    desc: "Genyan ak pi gwo kòt pran plis la nan pòt la. Ou jwe kont pwobabilite, men kont lòt moun tou.",
                  },
                  {
                    icon: "🔄",
                    label: "4. Woule Pòt la",
                    desc: "Pa gen genyan semèn nan? Tout kòb la double pou pwochen!",
                  },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="bg-dark/40 border border-white/5 rounded-2xl p-4 flex gap-3"
                  >
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white font-bold mb-1">{item.label}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-sm text-gold-light mt-4">
                <p>
                  <strong>Règ Jeneral:</strong> Chwazi ant 2 ak 8 evènman pou
                  fich ou. Limite 2 fich pa jwè pa konkurans. 2yèm fich la rele
                  "Remiz".
                </p>
              </div>

              <button
                onClick={() => setShowHowItWorks(false)}
                className="w-full py-3.5 rounded-xl font-bold text-dark bg-gold hover:bg-yellow-400 transition-colors text-sm uppercase tracking-wider"
              >
                Mwen Konprann
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contest cards grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {pronosContestsMock.map((contest) => (
          <ContestCard
            key={contest.id}
            contest={contest}
            onEnter={(id) => navigate(`/pronos/${id}`)}
          />
        ))}
      </div>

      {/* Rules at bottom */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold text-sm mb-3">📋 Règ Jeneral</h3>
        <ul className="space-y-2 text-gray-400 text-xs">
          {[
            "Chwazi ant 2 ak 8 evènman pou fich ou. Kote kominèd dwe ≥ 20.",
            'Limite 2 fich pa jwè pa konkurans. 2yèm fich la rele "Remiz".',
            "Distribisyon pwopòsyonèl: genyan ak pi gwo kote resevwa plis.",
            "Planché minimòm: chak genyan dwe resevwa omwen kote × mise yo.",
            "Si pa genyen semèn nan, jackpot akimile pou semèn pwochèn.",
            "Platfòm kenbe 5% pòt la kòm frè administrasyon.",
          ].map((rule, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
