import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Repeat, ShieldCheck, Trophy, Edit3, CheckCircle } from 'lucide-react'
import { pronosContestsMock, upcomingMatchesMock } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import MatchPick from '../components/pronos/MatchPick'
import FicheSlip from '../components/pronos/FicheSlip'

const OUTCOME_LABELS = { home: '1', draw: 'X', away: '2' }
const OUTCOME_NAMES = {
  home: (match) => match.home,
  draw: () => 'Egalite',
  away: (match) => match.away,
}

// Group matches by competition
function groupByCompetition(matches) {
  return matches.reduce((acc, m) => {
    if (!acc[m.competition]) acc[m.competition] = []
    acc[m.competition].push(m)
    return acc
  }, {})
}

export default function PronosContestPage() {
  const { contestId } = useParams()
  const navigate = useNavigate()
  const { user, updateBalance } = useAuth()

  const contest = pronosContestsMock.find(c => c.id === contestId)
  const [phase, setPhase] = useState('info') // info | builder | review | confirmed
  // picks: { [matchId]: { matchId, matchName, outcome, odds } }
  const [picks, setPicks] = useState({})
  const [ficheCount, setFicheCount] = useState(0) // fiches already submitted this session

  if (!contest) {
    return (
      <div className="max-w-4xl space-y-6">
        <button onClick={() => navigate('/pronos')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0">
          <ArrowLeft size={16} /> Tout Konkurans
        </button>
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Konkurans sa a pa egziste.</p>
        </div>
      </div>
    )
  }

  const picksArray = Object.values(picks)
  const totalOdds = picksArray.reduce((acc, p) => acc * p.odds, 1)
  const displayOdds = picksArray.length === 0 ? 0 : totalOdds
  const grouped = useMemo(() => groupByCompetition(upcomingMatchesMock), [])

  const deadline = new Date(contest.deadline)
  const now = new Date()
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))

  function handlePick(matchId, outcome, odds) {
    const match = upcomingMatchesMock.find(m => m.id === matchId)
    setPicks(prev => {
      if (prev[matchId]?.outcome === outcome) {
        // Deselect
        const next = { ...prev }
        delete next[matchId]
        return next
      }
      return {
        ...prev,
        [matchId]: {
          matchId,
          matchName: `${match.home} vs ${match.away}`,
          outcome,
          odds,
        },
      }
    })
  }

  function handleRemovePick(matchId) {
    setPicks(prev => {
      const next = { ...prev }
      delete next[matchId]
      return next
    })
  }

  function handleConfirm() {
    updateBalance(
      user.availableBalance - contest.entryFee,
      user.escrowedBalance + contest.entryFee
    )
    setFicheCount(prev => prev + 1)
    setPhase('confirmed')
  }

  function handleRemiser() {
    setPicks({})
    setPhase('builder')
  }

  const ficheId = `PE-${contest.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header nav */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => phase === 'builder' ? setPhase('info') : navigate('/pronos')}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} />
          {phase === 'builder' ? 'Retounen' : 'Tout Konkurans'}
        </button>
        <span className="text-gray-700 text-xs">|</span>
        <button onClick={() => navigate('/pronos')} className="text-gray-500 hover:text-white text-xs bg-transparent border-none cursor-pointer p-0">
          Lòbi Pronos
        </button>
      </div>

      {/* Contest info bar — always visible */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h1 className="text-white font-bold text-base">{contest.name}</h1>
              {contest.rolloverWeeks > 0 && (
                <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/30 uppercase">
                  <Repeat size={8} /> {contest.rolloverWeeks}x report
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate(`/pronos/${contestId}/palmares`)}
            className="text-xs text-gold hover:text-gold-light font-medium cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
          >
            <Trophy size={12} /> Klasman
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Jackpot</p>
            <p className="text-gold font-black">{contest.jackpot.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Antre</p>
            <p className="text-white font-bold">{contest.entryFee.toLocaleString()} HTG</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Jwè</p>
            <p className="text-white font-bold flex items-center gap-1">
              <Users size={12} /> {contest.participants}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Rete</p>
            <p className="text-white font-bold flex items-center gap-1">
              <Clock size={12} /> {daysLeft}j
            </p>
          </div>
        </div>
      </div>

      {/* ── Phase: INFO ── */}
      {phase === 'info' && (
        <div className="space-y-4">
          {/* Odds tiers */}
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-4">
            <p className="text-gray-400 text-xs mb-3">Tye kote disponib — plis ou riske, plis ou ka genyen:</p>
            <div className="flex gap-2 flex-wrap">
              {contest.oddsTiers.map(t => (
                <div key={t} className="flex flex-col items-center px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-gold font-black text-sm">×{t}</span>
                  <span className="text-gray-600 text-[9px] mt-0.5">
                    {t >= 20 ? `≥ ${t}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution explainer */}
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-4 space-y-3">
            <p className="text-white font-semibold text-sm">Kijan distribisyon an mache?</p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                <p><span className="text-white font-medium">Pwopòsyonèl ak kote ou:</span> Si kote fich ou se 200 e yon lòt genyan ak kote 100, ou pran 2× pati li.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                <p><span className="text-white font-medium">Planché garanti:</span> Chak genyan resevwa omwen kote × mise yo (tankou yon bookmaker).</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                <p><span className="text-white font-medium">Si tro anpil genyan:</span> Tout peman lise pwopòsyonèlman pou respekte planché a.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                <p><span className="text-white font-medium">Frè platfòm:</span> 5% kenbe sou jackpot total la.</p>
              </div>
            </div>
          </div>

          {/* User fiches status */}
          {ficheCount > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-2xl p-4">
              <p className="text-success font-bold text-sm mb-1">✅ {ficheCount} fich soumèt</p>
              <p className="text-gray-400 text-xs">
                {ficheCount < 2
                  ? `Ou ka fè ankò 1 fich (Remiz) si premye fich ou pèdi.`
                  : 'Ou rive limit 2 fich pou konkurans sa a.'}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={() => { setPicks({}); setPhase('builder') }}
              disabled={ficheCount >= 2}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Edit3 size={15} />
              {ficheCount === 0 ? 'Bati Fich Ou' : ficheCount === 1 ? 'Remiz — 2yèm Fich' : 'Limit 2 fich atenn'}
            </button>
            <button
              onClick={() => navigate(`/pronos/${contestId}/palmares`)}
              className="px-4 py-3.5 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
            >
              Klasman
            </button>
          </div>

          {user.availableBalance < contest.entryFee && (
            <p className="text-danger text-xs text-center">
              Balans ensizan ({user.availableBalance.toLocaleString()} HTG). Depoze plis lajan.
            </p>
          )}
        </div>
      )}

      {/* ── Phase: BUILDER ── */}
      {phase === 'builder' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-gold" />
            <p className="text-gray-400 text-xs">Chwazi yon rezilta pa match. Kote yo miltipliye youn pa lòt.</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-4 items-start">
            {/* Match catalog */}
            <div className="space-y-5">
              {Object.entries(grouped).map(([competition, matches]) => (
                <div key={competition}>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-1">
                    {competition}
                  </p>
                  <div className="space-y-2">
                    {matches.map(match => (
                      <MatchPick
                        key={match.id}
                        match={match}
                        selectedPick={picks[match.id]?.outcome ?? null}
                        onPick={handlePick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Fiche slip — sticky on large screens */}
            <div className="lg:sticky lg:top-4">
              <FicheSlip
                picks={picksArray}
                onRemove={handleRemovePick}
                totalOdds={displayOdds}
                entryFee={contest.entryFee}
                onReview={() => setPhase('review')}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Phase: REVIEW ── */}
      {phase === 'review' && (
        <div className="space-y-4">
          <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
              <p className="text-white font-bold text-sm">Revize Fich Ou</p>
              <p className="text-gray-500 text-xs mt-0.5">{picksArray.length} evènman chwazi</p>
            </div>

            {/* Events table */}
            <div className="divide-y divide-white/5">
              {picksArray.map((p, i) => (
                <div key={p.matchId} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-gray-600 text-xs w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{p.matchName}</p>
                    <p className="text-gray-500 text-[10px]">
                      {OUTCOME_LABELS[p.outcome]} — {OUTCOME_NAMES[p.outcome](
                        upcomingMatchesMock.find(m => m.id === p.matchId) || {}
                      )}
                    </p>
                  </div>
                  <span className="text-gold font-bold text-xs shrink-0">{p.odds.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="px-5 py-4 bg-dark/30 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Kote kominèd</span>
                <span className="text-gold font-black text-xl">{displayOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Frè antre</span>
                <span className="text-white font-medium">−{contest.entryFee.toLocaleString()} HTG</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Si ou sèl genyen (min)</span>
                <span className="text-gold font-bold">{Math.round(displayOdds * contest.entryFee).toLocaleString()} HTG</span>
              </div>
              <p className="text-gray-600 text-[10px]">
                Gain reyèl depan de konbyen lòt genyan ak kote yo. Distribisyon pwopòsyonèl.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPhase('builder')}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={14} /> Modifye
            </button>
            <button
              onClick={handleConfirm}
              disabled={user.availableBalance < contest.entryFee}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Konfime & Peye {contest.entryFee.toLocaleString()} HTG
            </button>
          </div>
        </div>
      )}

      {/* ── Phase: CONFIRMED ── */}
      {phase === 'confirmed' && (
        <div className="space-y-4">
          {/* Ticket */}
          <div className="bg-success/10 border border-success/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle size={24} className="text-success" />
              </div>
              <div>
                <p className="text-success font-bold text-base">Fich Konfime!</p>
                <p className="text-gray-400 text-xs font-mono">{ficheId}</p>
              </div>
            </div>

            <div className="space-y-2">
              {picksArray.map((p, i) => (
                <div key={p.matchId} className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 truncate mr-2">{i + 1}. {p.matchName}</span>
                  <span className="text-white font-medium shrink-0">
                    {OUTCOME_LABELS[p.outcome]} ({p.odds.toFixed(2)})
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-success/20 pt-3 flex justify-between">
              <span className="text-gray-400 text-sm">Kote total</span>
              <span className="text-gold font-black text-lg">{displayOdds.toFixed(2)}</span>
            </div>
          </div>

          {ficheCount < 2 && (
            <div className="bg-dark-surface border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Ou ka fè ankò <span className="text-white font-bold">1 Remiz</span> si premye fich ou pèdi.</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/pronos/${contestId}/palmares`)}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors"
            >
              Wè Klasman
            </button>
            <button
              onClick={() => navigate('/pronos')}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Lòt Konkurans
            </button>
          </div>

          {ficheCount < 2 && (
            <button
              onClick={handleRemiser}
              className="w-full py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-white border border-white/10 hover:border-white/20 bg-transparent cursor-pointer transition-colors flex items-center justify-center gap-1"
            >
              <Repeat size={12} /> Prepare yon Remiz si premye fich ou pèdi
            </button>
          )}
        </div>
      )}
    </div>
  )
}
