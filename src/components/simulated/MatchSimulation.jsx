import { useState, useEffect, useRef } from 'react'

export default function MatchSimulation({ commentary, onFinish }) {
  const [visibleEvents, setVisibleEvents] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [matchMinute, setMatchMinute] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (currentIdx >= commentary.length) {
      onFinish?.()
      return
    }

    const nextEvent = commentary[currentIdx]
    const delay = currentIdx === 0 ? 1000 : 2000

    const timer = setTimeout(() => {
      setVisibleEvents(prev => [...prev, nextEvent])
      setMatchMinute(nextEvent.minute)
      setCurrentIdx(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentIdx, commentary, onFinish])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleEvents])

  const progress = commentary.length > 0 ? (matchMinute / 90) * 100 : 0

  return (
    <div className="space-y-3">
      {/* Match progress */}
      <div className="flex items-center gap-3">
        <span className="text-gold font-mono font-bold text-sm">{matchMinute}'</span>
        <div className="flex-1 bg-white/5 rounded-full h-2">
          <div
            className="bg-gold rounded-full h-2 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <span className="text-gray-500 text-xs">90'</span>
      </div>

      {/* Commentary feed */}
      <div
        ref={scrollRef}
        className="bg-dark-surface border border-white/10 rounded-xl p-4 h-64 overflow-y-auto space-y-2"
      >
        {visibleEvents.map((event, i) => {
          const isGoal = event.text.includes('GOL!')
          const isHalfTime = event.text.includes('Mi-tan') || event.text.includes('mi-tan')
          const isFinal = event.text.includes('Siflè final') || event.text.includes('FINI')
          return (
            <div
              key={i}
              className={`flex gap-3 items-start ${
                isGoal ? 'bg-gold/10 -mx-2 px-2 py-1.5 rounded-lg' :
                isHalfTime || isFinal ? 'bg-white/5 -mx-2 px-2 py-1.5 rounded-lg' : ''
              }`}
            >
              <span className="text-gold font-mono text-xs font-bold min-w-[28px]">{event.minute}'</span>
              <p className={`text-sm ${isGoal ? 'text-gold font-bold' : isFinal ? 'text-white font-semibold' : 'text-gray-300'}`}>
                {event.text}
              </p>
            </div>
          )
        })}
        {currentIdx < commentary.length && (
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Match an kou...
          </div>
        )}
      </div>
    </div>
  )
}
