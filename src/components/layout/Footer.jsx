import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark-accent border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="text-gold font-extrabold text-xl tracking-wider">
              CLIC HUBS
            </span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Premye platfòm pari ant Amatè kont Amatè (A2A) an Ayiti. Pa gen on
              konpayi ki genyen w — se ou ki genyen.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platfòm</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/kijan-li-mache"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Kijan li mache
              </Link>
              <Link
                to="/enskri"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Kreye yon kont
              </Link>
              <Link
                to="/konekte"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Konekte
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Tèm ak Kondisyon
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Jwèt Responsab
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Politik Konfidansyalite
              </a>
            </div>
          </div>

          {/* Contact & Language */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Kontakte Nou
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:support@clichubs.com"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                support@clichubs.com
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold text-sm no-underline transition-colors"
              >
                Sipò WhatsApp
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-xs mb-2">Lang</p>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded bg-gold/20 text-gold border border-gold/30 cursor-pointer">
                  Kreyòl
                </button>
                <button className="text-xs px-3 py-1 rounded bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 cursor-pointer">
                  Français
                </button>
                <button className="text-xs px-3 py-1 rounded bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 cursor-pointer">
                  English
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; 2026 Clic Hubs. Tout dwa rezève.
          </p>
          <p className="text-gray-500 text-xs">Powered by CLIC HUBS</p>
        </div>
      </div>
    </footer>
  );
}
