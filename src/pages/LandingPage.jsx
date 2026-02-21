import HeroSection from '../components/landing/HeroSection'
import LiveActivityFeed from '../components/landing/LiveActivityFeed'
import GamePreviewCard from '../components/landing/GamePreviewCard'
import HowItWorksMini from '../components/landing/HowItWorksMini'
import TrustSignals from '../components/landing/TrustSignals'
import { gamePreviewsMock } from '../data/mockData'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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
          🧪 Mode Demo — Antre nan Dashboard san koneksyon
          <ArrowRight size={16} />
        </Link>
      </div>

      <LiveActivityFeed />

      {/* Game Previews */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Jwèt ki Ouvri Kounye a
            </h2>
            <p className="text-gray-400 text-lg">Antre nan yon jwèt epi kòmanse genyen</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {gamePreviewsMock.map((game) => (
              <GamePreviewCard key={game.id} game={game} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/enskri"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium no-underline transition-colors"
            >
              Enskri pou wè tout jwèt yo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <HowItWorksMini />
      <TrustSignals />

      {/* Final CTA */}
      <section className="py-20 bg-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prè pou kòmanse genyen?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Enskri gratis, depoze via MonCash, epi antre nan premye jwèt ou jodi a.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/enskri"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 no-underline shadow-lg shadow-gold/20"
            >
              Kreye Kont Gratis
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
