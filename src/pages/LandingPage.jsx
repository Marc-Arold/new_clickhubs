import { useState, useEffect, useRef } from "react";
import PromoSlider from "../components/landing/PromoSlider";
import LiveActivityFeed from "../components/landing/LiveActivityFeed";
import GameCategoryBar from "../components/landing/GameCategoryBar";
import GamePreviewCard from "../components/landing/GamePreviewCard";
import HowItWorksMini from "../components/landing/HowItWorksMini";
import WinningsCalculator from "../components/landing/WinningsCalculator";
import TrustSignals from "../components/landing/TrustSignals";
import PlayerBattleAnimation from "../components/landing/PlayerBattleAnimation";
import { gamePreviewsMock } from "../data/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Trophy, ChevronUp, Crown, Swords, Zap } from "lucide-react";

/* ── Coin rain particles for the final CTA ── */
const COIN_POSITIONS = [5, 12, 19, 26, 33, 40, 47, 54, 61, 68, 75, 82, 89, 94, 8];
const COIN_COLORS = ["#D4A843", "#E8C46A", "#F59E0B", "#D4A843", "#E8C46A"];

function CoinRain() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {COIN_POSITIONS.map((left, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${left}%`,
            top: "-20px",
            width: i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "5px",
            height: i % 3 === 0 ? "10px" : i % 3 === 1 ? "7px" : "5px",
            background: COIN_COLORS[i % COIN_COLORS.length],
            opacity: 0.6 + (i % 4) * 0.1,
            animation: "coin-fall 3s ease-in infinite",
            animationDelay: `${(i * 0.19).toFixed(2)}s`,
            animationDuration: `${2.2 + (i % 5) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Scroll-to-top button ── */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Retounen anwo"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "1.5rem",
        zIndex: 50,
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #D4A843, #F59E0B)",
        color: "#1A1A2E",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hovered
          ? "0 0 35px rgba(212,168,67,0.75), 0 8px 24px rgba(0,0,0,0.5)"
          : "0 0 18px rgba(212,168,67,0.4), 0 4px 16px rgba(0,0,0,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-5px) scale(1.14)"
            : "translateY(0) scale(1)"
          : "translateY(22px) scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.2s ease",
      }}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}

/* ── Animate-on-scroll via IntersectionObserver ── */
function AnimateOnScroll({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenStyle = {
    up:    { opacity: 0, transform: "translateY(55px)" },
    left:  { opacity: 0, transform: "translateX(-55px)" },
    right: { opacity: 0, transform: "translateX(55px)" },
    scale: { opacity: 0, transform: "scale(0.88)" },
  }[direction] ?? { opacity: 0, transform: "translateY(55px)" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        ...(visible ? { opacity: 1, transform: "none" } : hiddenStyle),
      }}
    >
      {children}
    </div>
  );
}

/* ── Sports categories for the showcase section ── */
const SPORT_CATEGORIES = [
  {
    title: "Foutbòl",
    sub: "Parie sou gwo match mondyal",
    image:
      "/images/p2p_football_haiti.png",
    color: "#22C55E",
    badge: "⚽ SPORTS",
  },
  {
    title: "Kous Cheval",
    sub: "Kous an dirèk chak 5 minit",
    image:
      "/images/p2p_horse_racing.png",
    color: "#EF4444",
    badge: "🏇 LIVE",
  },
  {
    title: "Jeu Kat & Kazino",
    sub: "Blackjack, Card Showdown",
    image:
      "/images/p2p_casino_haiti.png",
    color: "#A855F7",
    badge: "🃏 CASINO",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* ── 1. Full-screen promo slider (hero) ── */}
      <PromoSlider />

      {/* ── 2. Live activity ticker ── */}
      <AnimateOnScroll>
        <LiveActivityFeed />
      </AnimateOnScroll>

      {/* ── 3. Game category quick links ── */}
      <AnimateOnScroll delay={80}>
        <GameCategoryBar />
      </AnimateOnScroll>

      {/* ── 4. Sports showcase — 3 big image cards ── */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll direction="up">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 rounded-full bg-gold" />
                <span className="text-gold text-xs font-black uppercase tracking-widest">
                  Kategori Jwèt
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Chwazi Fason Ou Vle Jwe
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Spò reyèl, kous cheval oswa jwèt kat — tout la pou ou.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SPORT_CATEGORIES.map((cat, i) => (
              <AnimateOnScroll key={cat.title} direction="up" delay={i * 100}>
                <Link
                  to="/enskri"
                  className="group relative rounded-2xl overflow-hidden no-underline block"
                  style={{ height: "280px" }}
                >
                  {/* Background image with zoom on hover */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />

                  {/* Dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-dark/15" />

                  {/* Color accent on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to top, ${cat.color}45 0%, transparent 55%)`,
                    }}
                  />

                  {/* Top badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
                      style={{
                        background: "rgba(0,0,0,0.55)",
                        border: `1px solid ${cat.color}60`,
                      }}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="text-white font-black text-2xl leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 mb-3">{cat.sub}</p>
                    <div
                      className="inline-flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{ color: cat.color }}
                    >
                      Jwe kounye a <ArrowRight size={14} />
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${cat.color}50` }}
                  />
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* ── 5. Popular live games ── */}
      <section className="py-16 sm:py-24 bg-dark-accent/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll direction="up">
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
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gamePreviewsMock.map((game, i) => (
              <AnimateOnScroll key={game.id} direction="up" delay={i * 120}>
                <GamePreviewCard game={game} />
              </AnimateOnScroll>
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

      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* ── 6. P2P Battle demo ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark/95 z-0" />
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "url('/images/lotus_casino_table.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            mixBlendMode: "overlay"
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 800px 500px at 80% 50%, rgba(212,168,67,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — description */}
            <AnimateOnScroll direction="left">
              <div className="flex items-center gap-2 mb-4">
                <Swords size={16} className="text-gold" />
                <span className="text-gold text-xs font-black uppercase tracking-widest">
                  Platfòm P2P
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Jwe Dirèkteman{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold animate-gradient">
                  Kont Lòt Moun
                </span>
              </h2>

              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Pa gen "Kay" ki genyen tout tan. Ou menm ak lòt jwè yo mete lajan ansanm —
                pi bon jwè a ranmase tout miz la. Platfòm nou an jis pran yon ti frè sèvis.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Crown, label: "Mize lajan kont lòt amatè reyèl" },
                  { icon: Zap, label: "Rezilta an dirèk, peman nan 5 minit" },
                  { icon: Trophy, label: "Pa gen riz — sistèm transparan" },
                ].map((bullet) => {
                  const BulletIcon = bullet.icon;
                  return (
                    <div key={bullet.label} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <BulletIcon size={13} className="text-gold" />
                      </div>
                      <span className="text-gray-300 text-sm font-medium">{bullet.label}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/enskri"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-black px-6 py-3 rounded-xl no-underline transition-all hover:scale-[1.03]"
              >
                Kòmanse Jwe
                <ArrowRight size={16} />
              </Link>
            </AnimateOnScroll>

            {/* Right — live animation */}
            <AnimateOnScroll direction="right" delay={100}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                  An Dirèk
                </span>
              </div>
              <PlayerBattleAnimation />
              <p className="text-center text-gray-600 text-xs mt-3">
                Animasyon sa montre yon kous cheval. Rezilta yo ka varye epi plen lòt jwèt.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <AnimateOnScroll direction="left">
        <HowItWorksMini />
      </AnimateOnScroll>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <AnimateOnScroll direction="right">
        <WinningsCalculator />
      </AnimateOnScroll>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <AnimateOnScroll direction="up">
        <TrustSignals />
      </AnimateOnScroll>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* ── 7. Final CTA ── */}
      <AnimateOnScroll direction="scale">
        <section className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/lotus_winner_hero.png')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-dark/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_60%)] opacity-15" />

          <CoinRain />

          <div className="absolute top-10 left-[10%] w-3 h-3 bg-gold/20 rounded-full animate-float blur-[1px]" />
          <div className="absolute bottom-20 right-[15%] w-2 h-2 bg-gold/30 rounded-full animate-float-delayed" />
          <div className="absolute top-[40%] right-[8%] w-4 h-4 bg-gold/10 rounded-full animate-float blur-[2px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,168,67,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.6) 1px, transparent 1px)",
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
              Enskri gratis epi kòmanse jwe kont lòt amatè yo jodi a. Premye pari w ap tann ou.
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>

            <p className="text-gray-600 text-sm mt-6">Pa gen frè kache. Anile nenpòt lè.</p>
          </div>
        </section>
      </AnimateOnScroll>

      <ScrollToTopButton />
    </div>
  );
}
