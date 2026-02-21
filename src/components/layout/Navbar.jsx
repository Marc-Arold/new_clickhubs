import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-dark-accent/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-gold font-extrabold text-2xl tracking-wider">
              CLIC HUBS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/kijan-li-mache"
              className={`text-sm font-medium no-underline transition-colors ${
                isActive('/kijan-li-mache') ? 'text-gold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Kijan li mache
            </Link>
            <Link
              to="/konekte"
              className={`text-sm font-medium no-underline transition-colors ${
                isActive('/konekte') ? 'text-gold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Konekte
            </Link>
            <Link
              to="/enskri"
              className="bg-gold hover:bg-gold-light text-dark font-bold text-sm px-5 py-2.5 rounded-lg transition-colors no-underline"
            >
              Kreye Kont Gratis
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white bg-transparent border-none p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fèmen meni' : 'Ouvri meni'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-accent border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link
              to="/kijan-li-mache"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white no-underline py-2 text-sm font-medium"
            >
              Kijan li mache
            </Link>
            <Link
              to="/konekte"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white no-underline py-2 text-sm font-medium"
            >
              Konekte
            </Link>
            <Link
              to="/enskri"
              onClick={() => setMenuOpen(false)}
              className="bg-gold hover:bg-gold-light text-dark font-bold text-sm px-5 py-2.5 rounded-lg transition-colors no-underline text-center"
            >
              Kreye Kont Gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
