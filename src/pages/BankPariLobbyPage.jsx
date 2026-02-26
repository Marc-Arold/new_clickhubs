import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Landmark, Plus } from "lucide-react";
import { bankPariSplitsMock } from "../data/mockData";
import SplitCard from "../components/sports/SplitCard";

const statusFilters = [
  { key: "all", label: "Tout" },
  { key: "open", label: "Ouvri" },
  { key: "live", label: "Live" },
  { key: "completed", label: "Fini" },
];

const sortOptions = [
  { key: "odds", label: "Pli gwo kòt" },
  { key: "slots", label: "Plis plas" },
  { key: "price_asc", label: "Pi ba pri" },
  { key: "newest", label: "Pi nouvo" },
];

export default function BankPariLobbyPage() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeSort, setActiveSort] = useState("odds");

  const filteredSplits = useMemo(() => {
    let splits = bankPariSplitsMock.filter(
      (s) => activeStatus === "all" || s.status === activeStatus,
    );

    switch (activeSort) {
      case "odds":
        splits = splits.sort((a, b) => b.totalOdds - a.totalOdds);
        break;
      case "slots":
        splits = splits.sort(
          (a, b) =>
            b.maxPlayers - b.currentPlayers - (a.maxPlayers - a.currentPlayers),
        );
        break;
      case "price_asc":
        splits = splits.sort((a, b) => a.playerEntryFee - b.playerEntryFee);
        break;
      case "newest":
        splits = splits.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;
    }

    return splits;
  }, [activeStatus, activeSort]);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/jwet")}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} /> Retounen nan Lòbi
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
              <Landmark size={24} className="text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Paryaj Klasik</h1>
              <p className="text-gray-400 text-sm">
                Kreye yon split oswa antre nan youn. Vin Bankè ou!
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/bank-pari/kreye")}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-light text-dark font-bold text-sm rounded-xl cursor-pointer transition-all"
          >
            <Plus size={16} /> Kreye Split
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {statusFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveStatus(filter.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              activeStatus === filter.key
                ? "bg-gold/10 text-gold border-gold/20"
                : "bg-white/5 text-gray-400 hover:text-white border-white/10 hover:border-white/20"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setActiveSort(option.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              activeSort === option.key
                ? "bg-white/10 text-white border-white/20"
                : "bg-transparent text-gray-500 border-white/10 hover:text-gray-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Split count */}
      <p className="text-gray-500 text-sm">
        {filteredSplits.length} split{filteredSplits.length !== 1 ? " yo" : ""}{" "}
        disponib
      </p>

      {/* Split grid */}
      {filteredSplits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSplits.map((split) => (
            <SplitCard key={split.id} split={split} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">
            Pa gen split ki koresponn ak filtè ou yo.
          </p>
          <button
            onClick={() => {
              setActiveStatus("all");
              setActiveSort("odds");
            }}
            className="mt-3 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            Efase filtè yo
          </button>
        </div>
      )}

      {/* Mobile FAB */}
      <button
        onClick={() => navigate("/bank-pari/kreye")}
        className="sm:hidden fixed bottom-20 right-4 w-14 h-14 bg-gold hover:bg-gold-light text-dark rounded-full flex items-center justify-center shadow-lg shadow-gold/20 cursor-pointer transition-all z-40"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
