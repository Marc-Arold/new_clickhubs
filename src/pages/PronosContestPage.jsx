import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Clock,
  Repeat,
  ShieldCheck,
  Trophy,
  Edit3,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import {
  pronosContestsMock,
  upcomingMatchesMock,
  countryFilters,
} from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import MatchPick from "../components/pronos/MatchPick";
import FicheSlip from "../components/pronos/FicheSlip";

const OUTCOME_LABELS = { home: "1", draw: "X", away: "2" };
const OUTCOME_NAMES = {
  home: (match) => match.home,
  draw: () => "Egalite",
  away: (match) => match.away,
};

// Group matches by competition
function groupByCompetition(matches) {
  return matches.reduce((acc, m) => {
    if (!acc[m.competition]) acc[m.competition] = [];
    acc[m.competition].push(m);
    return acc;
  }, {});
}

export default function PronosContestPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateBalance } = useAuth();

  const contest = pronosContestsMock.find((c) => c.id === contestId);
  const [phase, setPhase] = useState("builder"); // builder | review | confirmed
  // picks: { [matchId]: { matchId, matchName, outcome, odds } }
  const [picks, setPicks] = useState({});
  const [ficheCount, setFicheCount] = useState(0); // fiches already submitted this session

  // Filters
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Mobile FicheSlip
  const [isMobileSlipOpen, setIsMobileSlipOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Prevent background scrolling when mobile slip is open
  useEffect(() => {
    if (isMobileSlipOpen && phase === "builder") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSlipOpen, phase]);

  if (!contest) {
    return (
      <div className="max-w-4xl space-y-6">
        <button
          onClick={() => navigate("/pronos")}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} /> Tout Jackpòt yo
        </button>
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Jackpòt sa a pa egziste.</p>
        </div>
      </div>
    );
  }

  const picksArray = Object.values(picks);
  const totalOdds = picksArray.reduce((acc, p) => acc * p.odds, 1);
  const displayOdds = picksArray.length === 0 ? 0 : totalOdds;

  const filteredMatches = useMemo(() => {
    return upcomingMatchesMock.filter((m) => {
      const sportMatch = selectedSport === "all" || m.sport === selectedSport;
      const countryMatch =
        selectedCountry === "all" || m.country === selectedCountry;
      return sportMatch && countryMatch;
    });
  }, [selectedSport, selectedCountry]);

  const grouped = useMemo(
    () => groupByCompetition(filteredMatches),
    [filteredMatches],
  );

  const deadline = new Date(contest.deadline);
  const now = new Date();
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

  function handlePick(
    matchId,
    outcomeKey,
    odds,
    marketName = "Rezilta Match",
    outcomeName = null,
  ) {
    const match = upcomingMatchesMock.find((m) => m.id === matchId);
    // If outcomeName isn't provided (for classic 1X2), attempt to use OUTCOME_NAMES
    const finalOutcomeName =
      outcomeName ||
      (OUTCOME_NAMES[outcomeKey]
        ? OUTCOME_NAMES[outcomeKey](match)
        : outcomeKey);

    setPicks((prev) => {
      // If same exact pick, deselect
      if (prev[matchId]?.outcome === outcomeKey) {
        const next = { ...prev };
        delete next[matchId];
        return next;
      }
      return {
        ...prev,
        [matchId]: {
          matchId,
          matchName: `${match.home} vs ${match.away}`,
          outcome: outcomeKey, // Just the raw key for MatchPick to know what is selected
          odds,
          marketName,
          outcomeName: finalOutcomeName,
        },
      };
    });
  }

  function handleRemovePick(matchId) {
    setPicks((prev) => {
      const next = { ...prev };
      delete next[matchId];
      return next;
    });
  }

  function handleConfirm() {
    if (!isAuthenticated || !user) {
      navigate('/konekte', { state: { returnUrl: `/pronos/${contestId}` } });
      return;
    }
    updateBalance(
      user?.availableBalance - contest.entryFee,
      user?.escrowedBalance + contest.entryFee,
    );
    setFicheCount((prev) => prev + 1);
    setPhase("confirmed");
  }

  function handleRemiser() {
    setPicks({});
    setPhase("builder");
  }

  const ficheId = `PE-${contest.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header nav */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/pronos")}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} />
          Tout Jackpòt yo
        </button>
        <span className="text-gray-700 text-xs">|</span>
        <span className="text-gray-500 text-xs">Lòbi Jackpòt Yo</span>
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
            <p className="text-gray-500 text-xs mb-0.5">Jackpòt</p>
            <p className="text-gold font-black">
              {contest.jackpot.toLocaleString()} HTG
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Antre</p>
            <p className="text-white font-bold">
              {contest.entryFee.toLocaleString()} HTG
            </p>
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

      {/* ── Phase: BUILDER ── */}
      {phase === "builder" && (
        <div className="space-y-4 pb-32 lg:pb-0 relative">
          <div className="flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-xl p-3">
            <ShieldCheck size={18} className="text-gold shrink-0" />
            <p className="text-gold-light text-xs font-medium">
              Fè on fich (kòt ≥20). Pi gwo kòt la, pran pi gwo pati nan{" "}
              <span className="text-white font-bold">
                {contest.jackpot.toLocaleString()} HTG
              </span>{" "}
              Jackpot la!
            </p>
          </div>

          {/* Filters */}
          <div className="bg-dark border border-white/10 rounded-2xl p-3 space-y-3">
            <div
              className="flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <Filter size={16} className="text-gold" /> Filtre Match Yo
                <span className="text-xs text-gray-500 italic hidden md:inline-block">
                  ({filteredMatches.length} match disponib)
                </span>
              </div>
              <button className="md:hidden text-gray-400 bg-transparent border-none p-0">
                {showFilters ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>

            <div
              className={`space-y-3 ${showFilters ? "block" : "hidden md:block"}`}
            >
              <div className="flex flex-wrap gap-2">
                {["all", "football", "basketball"].map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      selectedSport === sport
                        ? "bg-gold/20 text-gold border-gold"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {sport === "all"
                      ? "Tout Espò"
                      : sport === "football"
                        ? "Foutbòl"
                        : "Baskètbòl"}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {countryFilters.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCountry(c.key)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      selectedCountry === c.key
                        ? "bg-gold/20 text-gold border-gold"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            {/* Match catalog */}
            <div className="space-y-5">
              {Object.keys(grouped).length === 0 ? (
                <div className="text-center py-12 bg-dark-surface border border-white/10 rounded-2xl">
                  <p className="text-gray-400 text-sm mb-3">
                    Pa gen match ki jwenn ak Fich ou yo.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSport("all");
                      setSelectedCountry("all");
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-colors border border-white/10 cursor-pointer"
                  >
                    Reyajiste Filt yo
                  </button>
                </div>
              ) : (
                Object.entries(grouped).map(([competition, matches]) => (
                  <div key={competition}>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-1">
                      {competition}
                    </p>
                    <div className="space-y-3">
                      {matches.map((match) => (
                        <MatchPick
                          key={match.id}
                          match={match}
                          selectedPick={picks[match.id]?.outcome ?? null}
                          onPick={handlePick}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Sticky Slip / Mobile Drawer */}
            <div
              className={`fixed inset-x-0 bottom-0 z-[100] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:static lg:block lg:z-auto ${isMobileSlipOpen ? "translate-y-0" : "translate-y-[calc(100%-64px)]"} lg:translate-y-0`}
            >
              {/* Mobile Handle - High Visibility */}
              <div
                className={`lg:hidden flex items-center justify-between px-5 py-3 cursor-pointer shadow-[0_-15px_40px_rgba(0,0,0,0.6)] rounded-t-2xl border-t border-x border-white/10 transition-colors ${picksArray.length > 0 ? "bg-gold" : "bg-dark-surface"}`}
                onClick={() => setIsMobileSlipOpen(!isMobileSlipOpen)}
              >
                <div className="flex items-center gap-3 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-inner ${picksArray.length > 0 ? "bg-dark text-gold" : "bg-white/10 text-gray-500"}`}
                  >
                    {picksArray.length}
                  </div>
                  <span
                    className={`font-black text-base ${picksArray.length > 0 ? "text-dark" : "text-white"}`}
                  >
                    Fich Ou
                  </span>
                  {picksArray.length > 0 && !isMobileSlipOpen && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-danger rounded-full animate-ping" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-black text-lg drop-shadow-sm ${picksArray.length > 0 ? "text-dark w-16 text-right" : "text-gray-500"}`}
                  >
                    {displayOdds.toFixed(2)}
                  </span>
                  <div
                    className={`p-1 rounded-full ${picksArray.length > 0 ? "bg-dark/20 text-dark" : "bg-white/5 text-gray-400"}`}
                  >
                    {isMobileSlipOpen ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronUp size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="bg-dark-surface lg:bg-transparent h-[75vh] lg:h-auto overflow-y-auto lg:overflow-visible p-4 lg:p-0 border-x border-white/10 lg:border-none lg:sticky lg:top-6 pb-8 lg:pb-0 shadow-2xl lg:shadow-none">
                <FicheSlip
                  picks={picksArray}
                  onRemove={handleRemovePick}
                  totalOdds={displayOdds}
                  entryFee={contest.entryFee}
                  onReview={() => {
                    setIsMobileSlipOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setPhase("review");
                  }}
                />
              </div>
            </div>

            {/* Overlay for mobile drawer */}
            {isMobileSlipOpen && (
              <div
                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                onClick={() => setIsMobileSlipOpen(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Phase: REVIEW ── */}
      {phase === "review" && (
        <div className="space-y-4">
          <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
              <p className="text-white font-bold text-sm">Revize Fich Ou</p>
              <p className="text-gray-500 text-xs mt-0.5">
                {picksArray.length} evènman chwazi
              </p>
            </div>

            {/* Events table */}
            <div className="divide-y divide-white/5">
              {picksArray.map((p, i) => (
                <div
                  key={p.matchId}
                  className="flex items-center gap-3 px-5 py-3"
                >
                  <span className="text-gray-600 text-xs w-4 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">
                      {p.matchName}
                    </p>
                    <p className="text-gray-500 text-[10px]">
                      <span className="font-medium text-gray-400">
                        {p.marketName}
                      </span>
                      : {p.outcomeName}
                    </p>
                  </div>
                  <span className="text-gold font-bold text-xs shrink-0">
                    {p.odds.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="px-5 py-4 bg-dark/30 border-t border-white/10 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-400">Kot Total</span>
                  <span className="text-white font-bold text-lg">
                    {displayOdds.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center bg-gold/10 border border-gold/20 -mx-2 px-2 py-1.5 rounded-lg">
                  <span className="text-gold font-bold text-xs">⚡ Puisans Jackpòt</span>
                  <span className="text-gold font-black text-xl drop-shadow-[0_0_8px_rgba(212,168,67,0.4)]">
                    {Math.pow(displayOdds, 1.25).toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-gray-400">Frè antre</span>
                  <span className="text-white font-medium">
                    −{contest.entryFee.toLocaleString()} HTG
                  </span>
                </div>
                <div className="flex justify-between text-xs items-center border-t border-white/5 pt-2 mt-2">
                  <span className="text-gray-400">Gany de Baz (Kòt × Mise)</span>
                  <span className="text-gold font-bold">
                    {Math.round(displayOdds * contest.entryFee).toLocaleString()}{" "}
                    HTG
                  </span>
                </div>
              </div>
              
              <div className="bg-dark/50 border border-white/5 rounded-lg p-3 text-[10px] space-y-2">
                <p className="text-gray-400 leading-relaxed">
                  <span className="font-bold text-white">💰 Pataj Gato a:</span> Ou resevwa yon pati nan kès la baze sou <strong>Puisans Jackpòt</strong> ou. Plis ou pran risk, plis ou resevwa.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  <span className="font-bold text-warning">🛡️ Lissage Ksafe:</span> Si semèn nan gen <strong>twòp</strong> genyan, kès la gendwa pa sifi pou bay tout moun <em>Gany de Baz</em> la nèt. Nan ka ekstrèm sa yo, tout gany ap ajiste (Lissage) pou pèmèt sistèm nan peye tout mond en fason ekitab.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPhase("builder")}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={14} /> Modifye
            </button>
            <button
              onClick={handleConfirm}
              disabled={isAuthenticated && user?.availableBalance < contest.entryFee}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Konfime & Peye {contest.entryFee.toLocaleString()} HTG
            </button>
          </div>
        </div>
      )}

      {/* ── Phase: CONFIRMED ── */}
      {phase === "confirmed" && (
        <div className="space-y-4">
          {/* Ticket */}
          <div className="bg-success/10 border border-success/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle size={24} className="text-success" />
              </div>
              <div>
                <p className="text-success font-bold text-base">
                  Fich Konfime!
                </p>
                <p className="text-gray-400 text-xs font-mono">{ficheId}</p>
              </div>
            </div>

            <div className="space-y-2">
              {picksArray.map((p, i) => (
                <div
                  key={p.matchId}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-gray-400 truncate mr-2">
                    {i + 1}. {p.matchName}
                  </span>
                  <span className="text-white font-medium shrink-0">
                    {OUTCOME_LABELS[p.outcome]} ({p.odds.toFixed(2)})
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-success/20 pt-3 flex justify-between">
              <span className="text-gray-400 text-sm">Kot total</span>
              <span className="text-gold font-black text-lg">
                {displayOdds.toFixed(2)}
              </span>
            </div>
          </div>

          {ficheCount < 2 && (
            <div className="bg-dark-surface border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">
                Ou ka fè ankò{" "}
                <span className="text-white font-bold">1 Remiz</span> si premye
                fich ou pèdi.
              </p>
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
              onClick={() => navigate("/pronos")}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Lòt Jackpòt yo
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
  );
}
