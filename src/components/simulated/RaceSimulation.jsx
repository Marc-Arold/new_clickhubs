import { useState, useEffect, useRef } from 'react'

export default function RaceSimulation({ commentary, onFinish }) {
  const [visibleEvents, setVisibleEvents] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (currentIdx >= commentary.length) {
      onFinish?.()
      return
    }
    const delay = currentIdx === 0 ? 1000 : 2500
    const timer = setTimeout(() => {
      setVisibleEvents(prev => [...prev, commentary[currentIdx]])
      setCurrentIdx(prev => prev + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [currentIdx, commentary, onFinish])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleEvents])

  const progress = commentary.length > 0 ? (currentIdx / commentary.length) * 100 : 0

  return (
    <div className="space-y-3">
      {/* Race progress */}
      <div className="flex items-center gap-3">
        <span className="text-gold font-bold text-xs">DEPA</span>
        <div className="flex-1 bg-white/5 rounded-full h-2">
          <div className="bg-gold rounded-full h-2 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-gold font-bold text-xs">RIVE</span>
      </div>

      {/* Commentary */}
      <div ref={scrollRef} className="bg-dark-surface border border-white/10 rounded-xl p-4 h-52 overflow-y-auto space-y-3">
        {visibleEvents.map((event, i) => {
          const isFinal = event.text.includes('FINI')
          return (
            <div key={i} className={`flex gap-3 items-start ${isFinal ? 'bg-gold/10 -mx-2 px-2 py-1.5 rounded-lg' : ''}`}>
              <span className="text-gold font-mono text-xs font-bold min-w-[50px]">{event.distance}</span>
              <p className={`text-sm ${isFinal ? 'text-gold font-bold' : 'text-gray-300'}`}>{event.text}</p>
            </div>
          )
        })}
        {currentIdx < commentary.length && (
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Kous an kou...
          </div>
        )}
      </div>
    </div>
  )
}
