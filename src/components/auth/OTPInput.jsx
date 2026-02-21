import { useRef, useState } from 'react'

export default function OTPInput({ length = 6, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const inputRefs = useRef([])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newValues = [...values]
    newValues[index] = value.slice(-1)
    setValues(newValues)

    // Auto-advance to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if complete
    const code = newValues.join('')
    if (code.length === length && !newValues.includes('')) {
      onComplete?.(code)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const newValues = [...values]
    for (let i = 0; i < pasted.length; i++) {
      newValues[i] = pasted[i]
    }
    setValues(newValues)
    if (pasted.length === length) {
      onComplete?.(pasted)
    } else {
      inputRefs.current[pasted.length]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-bold bg-dark-surface border border-white/20 rounded-lg text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
        />
      ))}
    </div>
  )
}
