import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { recentResultsMock } from "../../data/mockData";

const resultConfig = {
  Genyen: { color: "text-success", bg: "bg-success/10", icon: TrendingUp, borderColor: "border-l-success" },
  Elimine: { color: "text-danger", bg: "bg-danger/10", icon: TrendingDown, borderColor: "border-l-danger" },
  "An Jwèt": { color: "text-warning", bg: "bg-warning/10", icon: Minus, borderColor: "border-l-warning" },
};

export default function RecentResults() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-blue-500" />
        <h2 className="text-white font-bold text-lg">Dènye Rezilta</h2>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {recentResultsMock.map((result, i) => {
          const config = resultConfig[result.result] || resultConfig["An Jwèt"];
          const Icon = config.icon;
          return (
            <div
              key={result.id}
              className={`flex items-center gap-3 px-4 py-3 row-hover cursor-pointer transition-colors border-l-3 ${config.borderColor} ${
                i < recentResultsMock.length - 1
                  ? "border-b border-white/5"
                  : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{result.game}</p>
                <p className="text-gray-500 text-[10px]">{result.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-bold ${config.color}`}>
                  {result.amount > 0 ? "+" : ""}
                  {result.amount.toLocaleString()} HTG
                </p>
                <p className={`text-[10px] font-medium ${config.color}`}>{result.result}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
