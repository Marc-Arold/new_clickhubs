import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import { activityFeed } from '../../data/mockData'

export default function LiveActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activityFeed.length)
        setIsVisible(true)
      }, 300)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-4 bg-dark-accent/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <Activity size={16} className="text-gold" />
          </div>
          <p
            className={`text-sm text-gray-300 transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {activityFeed[currentIndex]}
          </p>
        </div>
      </div>
    </section>
  )
}
