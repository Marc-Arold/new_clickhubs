import { Link } from "react-router-dom";
import {
  FileText, Clock, CheckCircle, UserCheck, User, Trophy,
  CreditCard, Percent, XCircle, AlertCircle, LogOut,
  RefreshCw, Scale, Mail, ChevronRight, AlertTriangle,
} from "lucide-react";

/* ── Reusable section card ── */
function Section({ id, icon: Icon, article, title, children }) {
  return (
    <div id={id} className="scroll-mt-28 glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon size={19} className="text-gold" />
        </div>
        <div>
          <p className="text-gold/50 text-[10px] font-bold uppercase tracking-widest mb-0.5">
            {article}
          </p>
          <h2 className="text-xl font-black text-white leading-tight">{title}</h2>
        </div>
      </div>
      <div className="text-gray-400 text-[15px] leading-7 space-y-3">
        {children}
      </div>
    </div>
  );
}

/* ── Highlight / warning box ── */
function NoteBox({ type = "info", icon: Icon = AlertCircle, children }) {
  const s = {
    info:    "bg-gold/8 border-gold/20 text-gold/90",
    warning: "bg-warning/8 border-warning/20 text-warning/90",
    danger:  "bg-danger/8 border-danger/20 text-danger/90",
  }[type];
  return (
    <div className={`border rounded-xl p-4 flex gap-3 ${s}`}>
      <Icon size={16} className="flex-shrink-0 mt-0.5" />
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}

/* ── Bullet list ── */
function Li({ children }) {
  return (
    <li className="flex gap-3 items-start">
      <ChevronRight size={13} className="text-gold flex-shrink-0 mt-1.5" />
      <span>{children}</span>
    </li>
  );
}

const NAV = [
  { id: "akseptasyon",  label: "Akseptasyon" },
  { id: "elijibilite",  label: "Elijibilite" },
  { id: "kont",         label: "Kont Ou" },
  { id: "regl",         label: "Règ Jwèt" },
  { id: "peman",        label: "Depò & Retrè" },
  { id: "komisyon",     label: "Frè" },
  { id: "entèdi",       label: "Entèdi" },
  { id: "responsabilite", label: "Responsabilite" },
  { id: "fèmti",        label: "Fèmti Kont" },
  { id: "chanjman",     label: "Chanjman" },
  { id: "lwa",          label: "Lwa" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* ── Hero ── */}
      <div className="relative py-20 sm:py-28 overflow-hidden bg-dark-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(22,33,62,0.8)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(212,168,67,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 mb-6">
            <FileText size={28} className="text-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Tèm ak Kondisyon
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            Règ ak kondisyon jeneral pou itilize platfòm CLIC HUBS. Li yo avèk atansyon.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-500 text-xs">
            <Clock size={11} />
            Dènye mizajou: 25 fevriye 2026
          </div>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div className="border-b border-white/5 bg-dark-accent/10 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 no-underline transition-all whitespace-nowrap"
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-5">

        <Section id="akseptasyon" icon={CheckCircle} article="Atik 1" title="Akseptasyon Tèm yo">
          <p>
            Lè ou itilize platfòm CLIC HUBS — ki gen ladan sit entènèt la, aplikasyon mobil la, ak tout sèvis ki asosye yo — ou dakò pou respekte tèm ak kondisyon sa yo nan totalite yo.
          </p>
          <p>
            Si ou pa dakò ak nenpòt dispozisyon nan dokiman sa a, ou pa otorize pou itilize platfòm nan. Itilizasyon kontinye sèvis yo apre yon chanjman nan tèm yo konsidere kòm yon akseptasyon implicite chanjman sa yo.
          </p>
          <NoteBox type="info" icon={AlertCircle}>
            Tèm sa yo disponib an Kreyòl ayisyen, ki se vèsyon ofisyèl ak obligatwa legal la.
          </NoteBox>
        </Section>

        <Section id="elijibilite" icon={UserCheck} article="Atik 2" title="Elijibilite ak Kondisyon Aksè">
          <p>
            Pou itilize CLIC HUBS, ou dwe satisfè tout kondisyon sa yo:
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Ou dwe gen omwen <strong className="text-white">18 an</strong> oswa plis.</Li>
            <Li>Ou dwe kapab pase yon verifikasyon idantite (KYC) valid.</Li>
            <Li>Ou dwe gen kapasite legal pou fè kontra obligatwa.</Li>
            <Li>Ou pa dwe te sispann oswa entèdi nan platfòm nan anvan.</Li>
            <Li>Ou dwe itilize platfòm nan pou kont pa ou sèlman — pa nan non yon lòt moun.</Li>
          </ul>
          <NoteBox type="danger" icon={XCircle}>
            <strong>Minè yo entèdi sou platfòm nan.</strong> Nenpòt kont ki detekte pou yon minè ap fèmen imedyatman epi tout solde ap konfiske.
          </NoteBox>
        </Section>

        <Section id="kont" icon={User} article="Atik 3" title="Kont Ou">
          <p>
            Ou responsab pou tout aktivite ki fèt sou kont ou. Ou dwe bay enfòmasyon ki veridik, egzak, ak konplè pandan enskripsyon ak nenpòt modifikasyon kont.
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Yon sèl kont pa moun sèlman. Kreyasyon plizyè kont entèdi.</Li>
            <Li>Ou dwe kenbe konfidansyalite modpas ak enfòmasyon koneksyon ou.</Li>
            <Li>Avize nou imedyatman si ou sispecte yon aksè san otorizasyon nan kont ou.</Li>
            <Li>CLIC HUBS rezève dwa pou fèmen yon kont ki vyole règ sa yo.</Li>
          </ul>
          <p>
            CLIC HUBS pa responsab pou pèt ki soti nan aksè san otorizasyon si ou pa te pwoteje enfòmasyon koneksyon ou.
          </p>
        </Section>

        <Section id="regl" icon={Trophy} article="Atik 4" title="Règ Jwèt yo">
          <p>
            CLIC HUBS se yon platfòm <strong className="text-white">Pari Amatè kont Amatè (P2P)</strong>. Sa vle di ou pari dirèkteman kont lòt itilizatè yo — CLIC HUBS pa jwe kont ou epi pa pran plas adversè ou.
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Tout pari yo final yon fwa ou konfime yo. Okenn pari pa ka anile aprè konfirmasyon.</Li>
            <Li>Rezilta jwèt yo detèmine selon sous ofisyèl ki preskri pou chak evènman.</Li>
            <Li>An ka iregularite teknik oswa enfòmasyon ensifizab, CLIC HUBS kapab anile yon pari epi ranbouse miz la.</Li>
            <Li>Kòt yo etabli pou chak match oswa konpetisyon epi yo pa chanje aprè pari a.</Li>
            <Li>Prezans nan yon pari aktif deja obligatwa pou resevwa nenpòt peman.</Li>
          </ul>
          <NoteBox type="warning" icon={AlertTriangle}>
            Pari se yon aktivite ki gen risk. Ou ka pèdi tout oswa yon pati nan miz ou. Pa janm mize plis pase ou kapab pèdi.
          </NoteBox>
        </Section>

        <Section id="peman" icon={CreditCard} article="Atik 5" title="Depò ak Retrè">
          <p>
            Tout tranzaksyon finansyè sou CLIC HUBS fèt an <strong className="text-white">Goud ayisyen (HTG)</strong> via solisyon mobil-moni ofisyèl ki disponib nan peyi a (Moncash, Natcash, ak lòt).
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Depò minimòm: <strong className="text-white">100 HTG</strong>.</Li>
            <Li>Retrè minimòm: <strong className="text-white">200 HTG</strong>.</Li>
            <Li>Retrè trete nan <strong className="text-white">5 minit</strong> an mwayèn, sijè a verifikasyon.</Li>
            <Li>Ou paka retire fon ki ankou nan yon pari aktif.</Li>
            <Li>Done peman ou yo verifye pou prevansyon fwòd (KYC/AML).</Li>
          </ul>
          <p>
            CLIC HUBS rezève dwa pou mande dokiman adisyonèl anvan trete yon retrè enpòtan. Retrè ki pa konfime nan 30 jou tounen nan kont la.
          </p>
        </Section>

        <Section id="komisyon" icon={Percent} article="Atik 6" title="Frè ak Komisyon">
          <p>
            CLIC HUBS pweleve yon <strong className="text-white">komisyon de 10%</strong> sou valè chak po (po = total miz yo kolekte pou yon jwèt). Sa vle di ganyan yo resevwa <strong className="text-white">90%</strong> nan po total la.
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Pa gen frè pou kreye yon kont.</Li>
            <Li>Pa gen frè pou depò.</Li>
            <Li>Pa gen frè kache — sèl prelèvman se komisyon 10% la.</Li>
            <Li>Komision kalkilasyon anvan distribisyon gan yo.</Li>
          </ul>
          <NoteBox type="info" icon={AlertCircle}>
            Egzanp: Si yon jwèt gen po de 4 000 HTG, ganyan an resevwa 3 600 HTG (90%). CLIC HUBS kenbe 400 HTG (10%).
          </NoteBox>
        </Section>

        <Section id="entèdi" icon={XCircle} article="Atik 7" title="Konpòtman Entèdi">
          <p>
            Plizyè kalite konpòtman entèdi sou CLIC HUBS. Vyolasyon yo ka lakòz sispansyon imèdya oswa fèmti pèmanan kont ou:
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Kreye plizyè kont (multi-accounting).</Li>
            <Li>Itilize yon kont nan non yon lòt moun.</Li>
            <Li>Fwòd, manipilasyon match, oswa kolaborasyon avèk adversè pou tronpe sistèm nan.</Li>
            <Li>Itilizasyon bot, skrip otomatik, oswa enpèsonasyon.</Li>
            <Li>Blanchisman lajan oswa aktivite finansyè ilegal.</Li>
            <Li>Esplwatasyon bug oswa fay teknik nan sistèm nan.</Li>
            <Li>Itilize yon lòt moun kòm entèmèdyè pou pari.</Li>
          </ul>
          <NoteBox type="danger" icon={XCircle}>
            Nan ka fwòd konfime, CLIC HUBS ka konfiske tout solde nan kont la epi voye enfòmasyon yo bay otorite konpetan yo.
          </NoteBox>
        </Section>

        <Section id="responsabilite" icon={AlertCircle} article="Atik 8" title="Responsabilite Platfòm">
          <p>
            CLIC HUBS fè tout efò pou asire platfòm nan disponib ak fonksyonèl 24/7, men nou pa garanti yon sèvis san entèripsyon. Nou pa responsab pou:
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Pèt ki soti nan entèripsyon sèvis, pwoblèm teknik, oswa fòs majè.</Li>
            <Li>Pèt ki soti nan desizyon pari ou fè.</Li>
            <Li>Pèt ki soti nan aksè san otorizasyon nan kont ou pa fòt nou.</Li>
            <Li>Chanjman nan kòt oswa kondisyon ki fèt anvan yon pari.</Li>
          </ul>
          <p>
            Responsabilite total CLIC HUBS, pou nenpòt ka, pa ka depase solde ki nan kont ou nan moman insidan an.
          </p>
        </Section>

        <Section id="fèmti" icon={LogOut} article="Atik 9" title="Fèmti Kont">
          <p>
            Ou ka fèmen kont ou nenpòt ki lè en kontaktant sipò nou an. Tout solde disponib (ki pa nan pari aktif) ap restitye nan 5 jou ouvrab.
          </p>
          <p>
            CLIC HUBS kapab fèmen yon kont san avètisman si:
          </p>
          <ul className="space-y-2 mt-1">
            <Li>Ou vyole tèm ak kondisyon yo.</Li>
            <Li>Done ou bay yo fo oswa enfòmasyon ou a ekspirasyon.</Li>
            <Li>Aktivite sou kont ou a leve soupçon fwòd oswa blanchisman lajan.</Li>
            <Li>Ou pa itilize kont ou pandan plis pase 12 mwa (kont inaktif).</Li>
          </ul>
        </Section>

        <Section id="chanjman" icon={RefreshCw} article="Atik 10" title="Chanjman nan Tèm yo">
          <p>
            CLIC HUBS rezève dwa pou modifye tèm sa yo nenpòt ki lè. Lè gen yon chanjman enpòtan, nou ap avize ou via imel oswa notifikasyon sou platfòm nan omwen <strong className="text-white">7 jou</strong> anvan chanjman an antre an vigè.
          </p>
          <p>
            Itilizasyon ou kontinyèl nan platfòm lan aprè dat antre an vigè a konsidere kòm akseptasyon tèm modifye yo. Si ou pa dakò, ou ka fèmen kont ou anvan dat la.
          </p>
        </Section>

        <Section id="lwa" icon={Scale} article="Atik 11" title="Lwa Aplikab ak Rezolisyon Konfli">
          <p>
            Tèm sa yo gouvène pa lwa Repiblik Dayiti. Tout konfli ki soti nan oswa an rapò ak itilizasyon platfòm nan ap soumèt pou rezolisyon bay tribinal konpetan Pòtoprens.
          </p>
          <p>
            Si yon dispozisyon nan tèm sa yo dekrete invalid pa yon tribinal, rès dispozisyon yo ap kontinye an plen vigè.
          </p>
          <NoteBox type="info" icon={AlertCircle}>
            Pou nenpòt kesyon oswa plent, kontakte nou nan <strong>support@clichubs.com</strong> anvan pran aksyon legal.
          </NoteBox>
        </Section>

        {/* Bottom CTA */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 text-center">
          <Mail size={24} className="text-gold mx-auto mb-3" />
          <h3 className="text-lg font-black text-white mb-2">Ou gen kesyon?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Ekip sipò nou an disponib pou reponn tout kesyon legal ou.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@clichubs.com"
              className="inline-flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold/20 border border-gold/25 hover:border-gold/45 text-gold px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
            >
              <Mail size={15} />
              support@clichubs.com
            </a>
            <Link
              to="/jwet-responsab"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
            >
              Jwèt Responsab
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
