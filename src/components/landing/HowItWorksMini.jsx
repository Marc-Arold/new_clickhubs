import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    image: "/images/step_1_deposit.png",
    label: "Enskri & Depoze",
    desc: "Kreye kont ou epi fè premye depo w avèk MonCash otomatikman.",
    color: "from-emerald-500",
    badge: "01",
  },
  {
    image: "/images/step_2_play.png",
    label: "Antre & Jwe",
    desc: "Chwazi espò a, antre nan yon chanm VIP, epi parye sou prediksyon w.",
    color: "from-purple-500",
    badge: "02",
  },
  {
    image: "/images/step_3_win.png",
    label: "Genyen & Retounen",
    desc: "Pran tout kòb la si w gen rezon epi rale l dirèk sou MonCash.",
    color: "from-gold",
    badge: "03",
  },
];

export default function HowItWorksMini() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-dark">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6 backdrop-blur-sm">
          <span className="text-gold text-xs font-bold uppercase tracking-wider">
            Kijan l mache?
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
          Pran Kontwòl{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">
            Jwèt La
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-16 text-lg">
          Twa etap senp se tou sa w bezwen pou kòmanse bat lòt jwè yo epi ranmase lajan w.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[110px] left-[20%] right-[20%] h-[2px] overflow-hidden z-20">
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/80 via-purple-500/80 to-gold/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
          </div>

          {steps.map((step, i) => (
             <div
             key={i}
             className="group flex flex-col items-center relative z-10"
           >
             {/* Number Badge placed directly on the connector line */}
             <div className="hidden md:flex absolute -top-4 w-10 h-10 rounded-full bg-dark border-2 border-white/20 items-center justify-center z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,168,67,0.4)] transition-all duration-300">
               <span className="text-white font-black text-sm">{step.badge}</span>
             </div>

             {/* Image Card */}
             <div className="w-full rounded-2xl md:mt-12 overflow-hidden border border-white/10 relative transition-transform duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-dark-surface shadow-lg">
               
               {/* Image Section */}
               <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                 <div
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                   style={{ backgroundImage: `url('${step.image}')` }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/40 to-transparent" />
                 
                 {/* Mobile Number Badge */}
                 <div className="absolute top-4 left-4 md:hidden w-8 h-8 rounded-full bg-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <span className="text-gold font-black text-xs">{step.badge}</span>
                 </div>
               </div>

               {/* Content Section */}
               <div className="p-6 relative text-center -mt-6">
                 {/* Glowing line acccent */}
                 <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r ${step.color} to-transparent opacity-80`} />
                 
                 <h3 className="text-white font-black text-xl mb-3 mt-2 group-hover:text-gold transition-colors duration-300">
                   {step.label}
                 </h3>
                 <p className="text-gray-400 text-sm leading-relaxed mb-1">
                   {step.desc}
                 </p>
               </div>
             </div>
           </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <Link
            to="/enskri"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-dark font-black px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(212,168,67,0.2)] hover:shadow-[0_0_40px_rgba(212,168,67,0.4)] transition-all duration-300 hover:scale-[1.03] no-underline"
          >
            Kreye Kont Ou Kounye a
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
