import { UserPlus, Gamepad2, Banknote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    label: "Enskri & Depoze",
    desc: "Kreye kont ou epi fè premye depo w avèk MonCash.",
    color: "from-emerald-500/20 to-emerald-700/10",
    iconColor: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/30",
  },
  {
    icon: Gamepad2,
    label: "Antre & Jwe",
    desc: "Chwazi yon jwèt epi fè prediksyon w.",
    color: "from-purple-500/20 to-purple-700/10",
    iconColor: "text-purple-400",
    borderColor: "group-hover:border-purple-500/30",
  },
  {
    icon: Banknote,
    label: "Genyen & Retounen",
    desc: "Pran kòb ou dirèk sou kont MonCash ou.",
    color: "from-gold/20 to-yellow-700/10",
    iconColor: "text-gold",
    borderColor: "group-hover:border-gold/30",
  },
];

export default function HowItWorksMini() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-dark">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
          <span className="text-gold text-xs font-bold uppercase tracking-wider">
            Kijan Li Mache
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
          3 Etap Senp Pou{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">
            Genyen
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-16 text-lg">
          Ou pa bezwen ekspè pou w fè kòb. Sistèm nan fèt pou l senp, rapid,
          epi transparan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/30 via-purple-500/30 to-gold/30" />
            {/* Animated pulse on the line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-shimmer" />
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              className={`group flex flex-col items-center glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] ${step.borderColor}`}
            >
              {/* Icon container with gradient background */}
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center relative mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,168,67,0.15)] transition-all duration-500`}
              >
                <step.icon
                  size={36}
                  className={`${step.iconColor} transition-transform duration-300`}
                />
                {/* Step number badge */}
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-gradient-to-br from-gold to-yellow-500 text-dark text-xs font-black rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,168,67,0.3)] border-2 border-dark">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-gold transition-colors duration-300">
                {step.label}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link
            to="/kijan-li-mache"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-semibold no-underline transition-all duration-300 bg-gold/5 hover:bg-gold/10 px-6 py-3 rounded-xl border border-gold/20 hover:border-gold/40"
          >
            Aprann plis sou kijan li mache
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
