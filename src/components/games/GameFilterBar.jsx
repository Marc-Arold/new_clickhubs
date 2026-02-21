const filters = [
  { key: "all", label: "Tout" },
  { key: "sports", label: "Espò" },
  { key: "simulated", label: "Vityèl" },
  { key: "tournament", label: "Tounwa" },
  { key: "bank-pari", label: "Bank Pari" },
  { key: "my-entries", label: "Jwèt Mwen yo" },
];

export default function GameFilterBar({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${
            active === filter.key
              ? "bg-gold/10 text-gold border-gold/20"
              : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
