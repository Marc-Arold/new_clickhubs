import { Search } from 'lucide-react'

export default function GameSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Chèche yon jwèt..."
        className="w-full pl-10 pr-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
    </div>
  )
}
