import { Shield, Lock, Wallet } from "lucide-react";

const signals = [
  {
    icon: Wallet,
    title: "Touche ak MonCash",
    description:
      "Depo ak retrè sekirize avèk MonCash, platfòm peman #1 an Ayiti.",
  },
  {
    icon: Lock,
    title: "Miz an Depo nan men nou",
    description:
      "Tout lajan kenbe an depo nan men nou jiskaske rezilta konfime. Pa gen risk pou ou.",
  },
  {
    icon: Shield,
    title: "Transparan 100%",
    description:
      "Tout jwèt simile gen yon Kòd pou verifye rezilta a. Nou pa kache anyen.",
  },
];

export default function TrustSignals() {
  return (
    <section className="py-20 bg-dark-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Poukisa Pou Fè Nou Konfyans
          </h2>
          <p className="text-gray-400 text-lg">
            Sekirite ou se priyorite #1 nou
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-white/10 rounded-2xl p-6 text-center hover:border-gold/20 transition-all"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
                <signal.icon size={24} className="text-gold" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {signal.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Total payouts counter */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-1">
            Lajan Nou peye bay jwè yo Deja
          </p>
          <p className="text-gold text-4xl font-bold">2,547,300 HTG</p>
          <p className="text-gray-500 text-xs mt-1">(aktyalize otomatikman)</p>
        </div>
      </div>
    </section>
  );
}
