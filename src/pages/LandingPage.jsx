import HeroSection from "../components/landing/HeroSection";
import LiveActivityFeed from "../components/landing/LiveActivityFeed";
import GameCategoryBar from "../components/landing/GameCategoryBar";
import FeaturedMatches from "../components/landing/FeaturedMatches";
import GamePreviewCard from "../components/landing/GamePreviewCard";
import HowItWorksMini from "../components/landing/HowItWorksMini";
import WinningsCalculator from "../components/landing/WinningsCalculator";
import TrustSignals from "../components/landing/TrustSignals";
import { gamePreviewsMock } from "../data/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";

/* Coin rain particles for the final CTA */
const COIN_POSITIONS = [5, 12, 19, 26, 33, 40, 47, 54, 61, 68, 75, 82, 89, 94, 8];
const COIN_COLORS    = ["#D4A843", "#E8C46A", "#F59E0B", "#D4A843", "#E8C46A"];

function CoinRain() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {COIN_POSITIONS.map((left, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left:             `${left}%`,
            top:              "-20px",
            width:            i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "5px",
            height:           i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "5px",
            background:       COIN_COLORS[i % COIN_COLORS.length],
            opacity:          0.6 + (i % 4) * 0.1,
            animation:        "coin-fall 3s ease-in infinite",
            animationDelay:   `${(i * 0.19).toFixed(2)}s`,
            animationDuration:`${2.2 + (i % 5) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div>
      <HeroSection />

      {/* Temporary demo access button */}
      <div className="bg-gold/10 border-b border-gold/20 py-3 text-center">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-bold text-sm no-underline transition-colors"
        >
          Mode Demo — Antre nan Dashboard san koneksyon
          <ArrowRight size={16} />
        </Link>
      </div>

      <LiveActivityFeed />

      <GameCategoryBar />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <FeaturedMatches />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* Popular Games */}
      <section className="py-16 sm:py-24 bg-dark-accent/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Trophy size={16} className="text-gold" />
                </div>
                <span className="text-gold text-xs font-bold uppercase tracking-wider">
                  Jwèt Ouvri Kounye a
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Jwèt ki Popilè
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Chwazi yon jwèt epi kòmanse jwe kont lòt amatè yo
              </p>
            </div>
            <Link
              to="/jwet"
              className="hidden sm:inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-semibold no-underline transition-all duration-300 bg-gold/5 hover:bg-gold/10 px-5 py-2.5 rounded-xl border border-gold/20 hover:border-gold/40"
            >
              Wè tout jwèt yo
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gamePreviewsMock.map((game) => (
              <GamePreviewCard key={game.id} game={game} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/jwet"
              className="inline-flex items-center gap-2 text-gold text-sm font-semibold no-underline"
            >
              Wè tout jwèt yo
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <HowItWorksMini />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* Winnings Calculator */}
      <WinningsCalculator />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <TrustSignals />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* Final CTA — Dramatic full-width section with coin rain */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-dark/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_60%)] opacity-12" />

        {/* Coin rain particles */}
        <CoinRain />

        {/* Floating orbs */}
        <div className="absolute top-10 left-[10%] w-3 h-3 bg-gold/20 rounded-full animate-float blur-[1px]" />
        <div className="absolute bottom-20 right-[15%] w-2 h-2 bg-gold/30 rounded-full animate-float-delayed" />
        <div className="absolute top-[40%] right-[8%] w-4 h-4 bg-gold/10 rounded-full animate-float blur-[2px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,168,67,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6 backdrop-blur-sm">
            <Sparkles size={12} className="text-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-wider">
              Kòmanse jounen w la
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Prè pou w{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold animate-gradient">
              Genyen?
            </span>
          </h2>
          <p className="text-gray-300/80 text-lg sm:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
            Enskri gratis epi kòmanse jwe kont lòt amatè yo jodi a. Premye
            pari w ap tann ou.
          </p>

          <Link
            to="/enskri"
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-black text-xl px-12 py-5 rounded-xl shadow-[0_0_40px_rgba(212,168,67,0.3)] hover:shadow-[0_0_60px_rgba(212,168,67,0.5)] transition-all duration-300 hover:scale-[1.03] no-underline relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Kreye Kont Gratis
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            {/* Shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          <p className="text-gray-600 text-sm mt-6">
            Pa gen frè kache. Anile nenpòt lè.
          </p>
        </div>
      </section>
    </div>
  );
}
