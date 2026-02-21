import { UserPlus, Gamepad2, Banknote } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Kreye Kont & Fè Depo",
    description: "Enskri gratis an 2 minit. Fè depo ak MonCash.",
  },
  {
    icon: Gamepad2,
    title: "Antre nan yon Jwèt",
    description: "Chwazi yon jwèt epi jwe kont lòt Amatè yo.",
  },
  {
    icon: Banknote,
    title: "Genyen & Retire Lajan",
    description: "Genyen lajan dirèkteman nan kont MonCash ou.",
  },
];

export default function HowItWorksMini() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Kijan sa mache
          </h2>
          <p className="text-gray-400 text-lg">3 etap senp pou kòmanse</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors relative">
                <step.icon size={28} className="text-gold" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
