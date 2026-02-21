import { AlertTriangle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function KYCBanner() {
  const { user } = useAuth()

  if (user.totalDeposits < 50000 || user.kycStatus === 'verified') return null

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-3 flex-1">
        <AlertTriangle size={20} className="text-warning flex-shrink-0" />
        <div>
          <p className="text-warning font-medium text-sm">
            {user.kycStatus === 'pending'
              ? 'Verifikasyon idantite ou an kou...'
              : 'Kont ou rive sèy verifikasyon.'}
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            {user.kycStatus === 'pending'
              ? 'N ap revize dokiman ou yo. Sa ka pran jiska 24è.'
              : 'Silvouplè verifye idantite ou pou kontinye depoze. Balans ou an sekirite epi ou ka retire li.'}
          </p>
        </div>
      </div>
      {user.kycStatus !== 'pending' && (
        <button className="bg-warning hover:bg-yellow-400 text-dark font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap">
          Verifye Idantite
        </button>
      )}
    </div>
  )
}
