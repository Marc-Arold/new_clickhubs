import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { recentResultsMock } from "../../data/mockData";

const resultConfig = {
  Genyen: { color: "text-success", bg: "bg-success/10", icon: TrendingUp },
  Elimine: { color: "text-danger", bg: "bg-danger/10", icon: TrendingDown },
  "An Jwèt": { color: "text-warning", bg: "bg-warning/10", icon: Minus },
};

export default function RecentResults() {
  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold text-lg">Dènye Rezilta</h2>
      <div className="bg-dark-surface border border-white/10 rounded-xl overflow-hidden">
        {recentResultsMock.map((result, i) => {
          const config = resultConfig[result.result] || resultConfig["An Jwèt"];
          const Icon = config.icon;
          return (
            <div
              key={result.id}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors ${
                i < recentResultsMock.length - 1
                  ? "border-b border-white/5"
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{result.game}</p>
                <p className="text-gray-500 text-xs">{result.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-bold ${config.color}`}>
                  {result.amount > 0 ? "+" : ""}
                  {result.amount.toLocaleString()} HTG
                </p>
                <p className={`text-xs ${config.color}`}>{result.result}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
