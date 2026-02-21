import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import P2PExplanation from '../components/how-it-works/P2PExplanation'
import GameTypeCards from '../components/how-it-works/GameTypeCard'
import FairnessSection from '../components/how-it-works/FairnessSection'
import FAQAccordion from '../components/how-it-works/FAQAccordion'

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="text-center py-16 border-b border-white/10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Kijan Clic Hubs Mache
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Tout sa ou bezwen konnen sou platfòm nan — kijan li mache, kijan ou genyen, epi kijan ou resevwa lajan ou.
        </p>
      </div>

      <P2PExplanation />
      <GameTypeCards />
      <FairnessSection />
      <FAQAccordion />

      {/* Final CTA */}
      <div className="text-center py-16 border-t border-white/10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Prè pou eseye?
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Kreye yon kont gratis an 2 minit epi kòmanse jwe jodi a.
        </p>
        <Link
          to="/enskri"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 no-underline shadow-lg shadow-gold/20"
        >
          Kreye Kont Gratis
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  )
}
