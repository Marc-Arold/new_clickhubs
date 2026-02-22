import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Flame, TrendingUp } from "lucide-react";
import { upcomingMatchesMock, countryFilters } from "../../data/mockData";

const featured = upcomingMatchesMock.slice(0, 6);

function getFlag(country) {
  const filter = countryFilters.find((f) => f.key === country);
  return filter ? filter.flag : "";
}

function formatKickoff(iso) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { day, time };
}

function OddButton({ label, value, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl py-3.5 text-center transition-all duration-300 cursor-pointer group/odd overflow-hidden ${
        isSelected
          ? "bg-gold/20 border-2 border-gold shadow-[0_0_15px_rgba(212,168,67,0.2)]"
          : "bg-dark/60 border border-white/5 hover:border-gold/40 hover:bg-gold/10"
      }`}
    >
      <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">
        {label}
      </span>
      <span
        className={`font-black text-lg transition-colors ${
          isSelected ? "text-gold" : "text-white group-hover/odd:text-gold"
        }`}
      >
        {value.toFixed(2)}
      </span>
      {/* Subtle pulse on select */}
      {isSelected && (
        <div className="absolute inset-0 bg-gold/5 animate-pulse rounded-xl" />
      )}
    </button>
  );
}

function MatchCard({ match }) {
  const { time } = formatKickoff(match.kickoff);
  const [selected, setSelected] = useState(null);

  const odds = [
    { label: "1", value: match.suggestedOdds.home },
    { label: "X", value: match.suggestedOdds.draw },
    { label: "2", value: match.suggestedOdds.away },
  ];

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-gold/20 hover:-translate-y-1 transition-all duration-300 group card-shine relative">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Competition + Kickoff */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5 bg-dark/50 px-2.5 py-1 rounded-md border border-white/5">
          <span className="text-base leading-none">
            {getFlag(match.country)}
          </span>
          {match.competition}
        </span>
        <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium bg-dark/50 px-2 py-1 rounded-md border border-white/5">
          <Calendar size={11} className="text-gold/60" />
          {time}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <p className="text-white font-bold text-[15px] group-hover:text-gold transition-colors duration-300">
            {match.home}
          </p>
        </div>
        <div className="mx-3 w-11 h-11 rounded-full bg-gradient-to-br from-dark/80 to-dark-accent/80 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/30 group-hover:shadow-[0_0_10px_rgba(212,168,67,0.1)] transition-all duration-300">
          <span className="text-gold/60 text-[10px] font-black group-hover:text-gold transition-colors">
            VS
          </span>
        </div>
        <div className="flex-1 text-right">
          <p className="text-white font-bold text-[15px] group-hover:text-gold transition-colors duration-300">
            {match.away}
          </p>
        </div>
      </div>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-2">
        {odds.map((odd) => (
          <OddButton
            key={odd.label}
            label={odd.label}
            value={odd.value}
            isSelected={selected === odd.label}
            onClick={() =>
              setSelected(selected === odd.label ? null : odd.label)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function FeaturedMatches() {
  return (
    <section className="py-16 sm:py-20 bg-dark relative overflow-hidden">
      {/* Multiple ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Flame size={16} className="text-gold" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-wider">
                Match Popilè
              </span>
              <div className="flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-success text-[10px] font-bold">
                  LIVE
                </span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Match Ki Ap Vini
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Chwazi yon match epi kòmanse parye
            </p>
          </div>
          <Link
            to="/jwet"
            className="hidden sm:inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-semibold no-underline transition-all duration-300 bg-gold/5 hover:bg-gold/10 px-5 py-2.5 rounded-xl border border-gold/20 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(212,168,67,0.1)]"
          >
            Wè tout match yo
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Live odds banner */}
        <div className="flex items-center gap-3 mb-6 px-4 py-2.5 rounded-xl bg-dark-surface/40 border border-white/5 w-fit">
          <TrendingUp size={14} className="text-gold" />
          <span className="text-gray-400 text-xs font-medium">
            Kòt yo aktyalize an tan reyèl
          </span>
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/jwet"
            className="inline-flex items-center gap-2 text-gold text-sm font-semibold no-underline"
          >
            Wè tout match yo
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
