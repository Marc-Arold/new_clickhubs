import { Shield, Eye } from "lucide-react";

export default function FairnessSection() {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-dark-surface border border-gold/20 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
              <Shield size={22} className="text-gold" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Kijan nou garanti jwèt simile yo jis?
              </h2>
              <p className="text-gray-400 text-sm">
                Transparans total — ou ka verifye poukont ou.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              Tout jwèt simile (foutbòl vityèl, kous cheval, jwèt kat) itilize
              yon sistèm{" "}
              <span className="text-gold font-medium">
                RNG (Random Number Generator)
              </span>{" "}
              sètifye.
            </p>
            <p>
              Avan chak jwèt kòmanse, yon{" "}
              <span className="text-white font-medium">Nimewo</span> pibliye.
              Nimewo sa a se baz kalkil ki detèmine rezilta a.
            </p>
            <p>
              Apre jwèt la fini, ou ka pran Nimewo la epi verifye rezilta a
              poukont ou ak zouti verifikasyon nou an. Sa vle di{" "}
              <span className="text-gold font-medium">
                pèsonn — menm nou menm — pa ka manipile rezilta a
              </span>{" "}
              apre seed la pibliye.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-lg px-4 py-3">
            <Eye size={18} className="text-gold flex-shrink-0" />
            <p className="text-gold text-sm font-medium">
              Chak jwèt gen yon bouton "Verifye Rezilta sa" ki ouvri zouti
              verifikasyon an.
            </p>
          </div>
        </div>

        {/* Withdrawals section */}
        <div className="mt-8 bg-dark-surface border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Kijan m ap resevwa lajan m?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-success font-bold text-sm">5m</span>
              </div>
              <div>
                <p className="text-white font-medium">
                  MonCash — otomatik nan 5 minit
                </p>
                <p className="text-gray-400 text-sm">
                  Pèman ale dirèkteman sou nimewo MonCash ou. Pifò pèman fèt nan
                  mwens ke 5 minit.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-warning font-bold text-sm">24è</span>
              </div>
              <div>
                <p className="text-white font-medium">
                  Transfè bank — nan 24 è
                </p>
                <p className="text-gray-400 text-sm">
                  Pou montan ki pi gwo, ou ka chwazi transfè bank. Sa pran jiska
                  24 è pou trete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
