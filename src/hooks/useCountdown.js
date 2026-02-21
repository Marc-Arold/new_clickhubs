import { useState, useEffect } from 'react'

function calcTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calcTimeLeft(targetDate)
      setTimeLeft(tl)
      if (tl.expired) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}
