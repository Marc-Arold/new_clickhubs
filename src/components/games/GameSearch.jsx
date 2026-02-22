import { Search } from "lucide-react";

export default function GameSearch({ value, onChange }) {
  return (
    <div className="relative group">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Chèche yon jwèt..."
        className="w-full pl-10 pr-4 py-2.5 glass-card rounded-xl text-white text-sm placeholder-gray-500 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
      />
    </div>
  );
}
