import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-accent via-dark to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_50%)] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
          <Zap size={14} className="text-gold" />
          <span className="text-gold text-xs font-medium">
            Premye platfòm Paryaj Amatè kont Amatè an Ayiti
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
          {/* <span className="text-white">Konpayi yo pap janm genyen w ankò.</span>
          <br /> */}
          <span className="text-gold">
            On espas pou Amatè parye epi genyen lòt Amatè.
          </span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Clic Hubs se platfòm kote Amatè ap jwe youn kont lòt. Nou kenbe sèlman
          yon ti frè. Tout rès lajan ale dirèkteman bay Amatè yo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/enskri"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 no-underline shadow-lg shadow-gold/20"
          >
            Kreye Kont Gratis
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/10 transition-all no-underline"
          >
            Antre nan Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div>
            <p className="text-gold text-2xl sm:text-3xl font-bold">2.5M+</p>
            <p className="text-gray-500 text-xs sm:text-sm">HTG Peye</p>
          </div>
          <div>
            <p className="text-gold text-2xl sm:text-3xl font-bold">1,200+</p>
            <p className="text-gray-500 text-xs sm:text-sm">Amatè Aktif</p>
          </div>
          <div>
            <p className="text-gold text-2xl sm:text-3xl font-bold">5 min</p>
            <p className="text-gray-500 text-xs sm:text-sm">Delè Peman </p>
          </div>
        </div>
      </div>
    </section>
  );
}
