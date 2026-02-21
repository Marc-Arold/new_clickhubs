import { Clock } from 'lucide-react'
import { useCountdown } from '../../hooks/useCountdown'

export default function CountdownTimer({ targetDate, label, urgent = false }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate)

  if (expired) {
    return (
      <div className="flex items-center gap-2 text-danger text-sm font-medium">
        <Clock size={16} />
        <span>Tan an fini</span>
      </div>
    )
  }

  const isUrgent = urgent || (days === 0 && hours === 0 && minutes < 5)

  return (
    <div className={`flex items-center gap-2 text-sm font-medium ${isUrgent ? 'text-danger' : 'text-gray-400'}`}>
      <Clock size={16} />
      {label && <span className="text-gray-500">{label}</span>}
      <div className="flex gap-1">
        {days > 0 && (
          <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isUrgent ? 'bg-danger/10' : 'bg-white/5'}`}>
            {days}j
          </span>
        )}
        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isUrgent ? 'bg-danger/10' : 'bg-white/5'}`}>
          {String(hours).padStart(2, '0')}h
        </span>
        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isUrgent ? 'bg-danger/10' : 'bg-white/5'}`}>
          {String(minutes).padStart(2, '0')}m
        </span>
        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isUrgent ? 'bg-danger/10' : 'bg-white/5'}`}>
          {String(seconds).padStart(2, '0')}s
        </span>
      </div>
    </div>
  )
}
