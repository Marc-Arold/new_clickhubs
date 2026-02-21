import { useState, useEffect } from 'react'

export default function DuelQuestion({ question, questionNumber, totalQuestions, onAnswer }) {
  const [timeLeft, setTimeLeft] = useState(15)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (locked) return
    if (timeLeft <= 0) {
      setLocked(true)
      onAnswer(null, 15)
      return
    }
    const t = setTimeout(() => setTimeLeft(s => s - 0.1), 100)
    return () => clearTimeout(t)
  }, [timeLeft, locked, onAnswer])

  function handleSelect(option) {
    if (locked) return
    const answerTime = 15 - timeLeft
    setSelected(option)
    setLocked(true)
    setTimeout(() => onAnswer(option, answerTime), 800)
  }

  const timerPct = (timeLeft / 15) * 100
  const isUrgent = timeLeft < 5

  return (
    <div className="space-y-4">
      {/* Question header */}
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs">Kesyon {questionNumber}/{totalQuestions}</span>
        <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full text-gray-400">{question.category}</span>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-white/5 rounded-full h-2">
        <div
          className={`rounded-full h-2 transition-all duration-100 ${isUrgent ? 'bg-danger' : 'bg-gold'}`}
          style={{ width: `${timerPct}%` }}
        />
      </div>
      <p className={`text-right text-xs font-mono ${isUrgent ? 'text-danger' : 'text-gray-500'}`}>
        {Math.max(0, timeLeft).toFixed(1)}s
      </p>

      {/* Question */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg text-center mb-6">{question.question}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((option) => {
            const isSelected = selected === option
            const isCorrect = locked && option === question.correct
            const isWrong = locked && isSelected && option !== question.correct
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={locked}
                className={`p-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer text-left ${
                  isCorrect ? 'border-success bg-success/10 text-success' :
                  isWrong ? 'border-danger bg-danger/10 text-danger' :
                  isSelected ? 'border-gold bg-gold/10 text-gold' :
                  'border-white/10 bg-dark-accent text-white hover:border-white/20'
                } ${locked ? 'cursor-default' : ''}`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
