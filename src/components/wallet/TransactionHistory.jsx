import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { transactionsMock } from "../../data/mockData";

const typeFilters = ["Tout", "Depo", "Retrè", "Antre Jwèt", "Genyen", "Bonus"];

const typeColors = {
  Depo: "text-success",
  Genyen: "text-success",
  Bonus: "text-purple-400",
  Retrè: "text-danger",
  Fich: "text-warning",
};

const statusConfig = {
  Konplete: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  "An Atant": { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  Echwe: { bg: "bg-danger/10", text: "text-danger", dot: "bg-danger" },
};

const PAGE_SIZE = 8;

export default function TransactionHistory() {
  const [typeFilter, setTypeFilter] = useState("Tout");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (typeFilter === "Tout") return transactionsMock;
    return transactionsMock.filter((t) => t.type === typeFilter);
  }, [typeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gold" />
        <h2 className="text-white font-bold text-lg">Istorik Tranzaksyon</h2>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {typeFilters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setTypeFilter(f);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer border transition-all ${
              typeFilter === f
                ? "bg-gold/10 text-gold border-gold/20 shadow-[0_0_8px_rgba(212,168,67,0.1)]"
                : "bg-dark-surface text-gray-400 border-white/10 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-6 gap-4 px-4 py-3 bg-dark-accent/50 border-b border-white/10 text-gray-500 text-xs font-bold uppercase tracking-wider">
          <span>Dat</span>
          <span>Tip</span>
          <span className="text-right">Montan</span>
          <span>Estati</span>
          <span className="col-span-2">Referans</span>
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            Pa gen tranzaksyon nan kategori sa a.
          </div>
        ) : (
          paged.map((tx, i) => {
            const status = statusConfig[tx.status] || statusConfig.Konplete;
            return (
              <div
                key={tx.id}
                className={`grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-4 px-4 py-3 text-sm items-center row-hover transition-colors ${
                  i < paged.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <span className="text-gray-400 text-xs">{tx.date}</span>
                <span
                  className={`text-xs font-medium ${typeColors[tx.type] || "text-gray-400"}`}
                >
                  {tx.type}
                </span>
                <span
                  className={`text-right font-bold text-sm ${tx.amount >= 0 ? "text-success" : "text-danger"}`}
                >
                  {tx.amount >= 0 ? "+" : ""}
                  {tx.amount.toLocaleString()} HTG
                </span>
                <span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {tx.status}
                  </span>
                </span>
                <span className="text-gray-500 text-xs col-span-2 hidden sm:block font-mono">
                  {tx.ref}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-gray-400 text-sm">
            Paj {page} sou {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
