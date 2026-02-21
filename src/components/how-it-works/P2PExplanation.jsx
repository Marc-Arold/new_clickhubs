import { ArrowRight } from "lucide-react";

export default function P2PExplanation() {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">
          Kisa A2A (Amatè-Kont-Amatè) vle di?
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Nan jwèt tradisyonèl yo, ou jwe kont{" "}
          <span className="text-danger font-medium">konpayi yo</span> — e
          konpayi sa yo toujou genyen. Sou Clic Hubs, ou jwe kont{" "}
          <span className="text-gold font-medium">lòt Amatè</span>. Nou pa janm
          parye kont ou. Nou sèlman kenbe yon ti frè pou fè platfòm nan mache.
        </p>

        {/* Visual example */}
        <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 sm:p-8">
          <h3 className="text-white font-semibold text-lg mb-6">
            Egzanp konkrè:
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
            <div className="flex-1 bg-dark-accent rounded-xl p-4">
              <p className="text-gold text-3xl font-bold">100</p>
              <p className="text-gray-400 text-sm">Amatè antre pou jwe</p>
            </div>
            <ArrowRight
              size={20}
              className="text-gray-500 rotate-90 sm:rotate-0"
            />
            <div className="flex-1 bg-dark-accent rounded-xl p-4">
              <p className="text-white text-sm mb-1">chak mete</p>
              <p className="text-gold text-3xl font-bold">500 HTG</p>
            </div>
            <ArrowRight
              size={20}
              className="text-gray-500 rotate-90 sm:rotate-0"
            />
            <div className="flex-1 bg-dark-accent rounded-xl p-4">
              <p className="text-white text-sm mb-1">Miz total</p>
              <p className="text-gold text-3xl font-bold">50,000</p>
              <p className="text-gray-400 text-xs">HTG</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs mb-1">Frè Clic Hubs (10%)</p>
              <p className="text-white text-xl font-bold">5,000 HTG</p>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs mb-1">Ganyan an resevwa</p>
              <p className="text-success text-xl font-bold">45,000 HTG</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-6 text-center italic">
            Nou genyen lè ou jwe — pa lè ou pèdi. Se sa ki diferans la.
          </p>
        </div>
      </div>
    </section>
  );
}
