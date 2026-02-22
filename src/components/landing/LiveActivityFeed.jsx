import { activityFeed } from "../../data/mockData";

export default function LiveActivityFeed() {
  const items = [...activityFeed, ...activityFeed];

  return (
    <section className="py-3.5 bg-dark-surface/60 backdrop-blur-sm border-y border-white/5 overflow-hidden relative">
      {/* LIVE badge — premium styling */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 bg-dark/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
        <div className="relative">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75" />
        </div>
        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
          Live
        </span>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-surface/95 via-dark-surface/70 to-transparent z-[5]" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-surface/95 via-dark-surface/70 to-transparent z-[5]" />

      {/* Ticker */}
      <div className="flex animate-ticker whitespace-nowrap pl-36">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 mx-10 text-sm text-gray-300 font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(212,168,67,0.4)]" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
