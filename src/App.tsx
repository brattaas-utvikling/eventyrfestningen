import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* topbar */}
      <header className="border-b border-navy-700/40 bg-navy-900/60 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-torch-500 shadow-torch"></div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gold-200/80">
                Eventyrfestningen
              </p>
              <p className="text-xs text-navy-100/70">Fortellinger bak murene</p>
            </div>
          </div>
          <nav className="hidden sm:flex gap-4 text-sm text-navy-100/80">
            <a href="#program" className="hover:text-white transition">Program</a>
            <a href="#om" className="hover:text-white transition">Om</a>
            <a href="#kontakt" className="hover:text-white transition">Kontakt</a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
        <section className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-navy-800/50 text-xs px-3 py-1 border border-navy-700/60">
              <span className="h-2 w-2 rounded-full bg-torch-400 animate-pulse"></span>
              Neste forestilling: 14. desember
            </p>
            <h1 className="text-4xl md:text-5xl font-display tracking-tight leading-tight">
              Magiske kvelder på <span className="text-gold-300">Festningen</span>
            </h1>
            <p className="text-navy-100/80 max-w-xl">
              Lev deg inn i historier om helter, skatter og hemmelige ganger.
              Familieforestilling med lys, lyd og levende fortelling.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#kontakt"
                className="bg-torch-500 hover:bg-torch-400 text-white px-5 py-2 rounded-md font-medium shadow-torch transition"
              >
                Reserver plass
              </a>
              <a
                href="#program"
                className="border border-navy-500/60 hover:border-navy-200/80 px-5 py-2 rounded-md text-sm text-navy-100/90 transition"
              >
                Se program
              </a>
            </div>
          </div>
          <div className="bg-navy-800/40 border border-navy-700/30 rounded-xl p-5 space-y-4 shadow-embossed">
            <h2 id="program" className="text-lg font-semibold flex items-center gap-2">
              Kveldens program
              <span className="text-xs bg-navy-900/70 border border-navy-700 px-2 py-0.5 rounded-full">
                60 min
              </span>
            </h2>
            <ul className="space-y-3 text-sm text-navy-100/90">
              <li className="flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-gold-400/90 text-navy-950 text-xs flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <p className="font-medium">Portene åpnes</p>
                  <p className="text-navy-100/60 text-xs">Historisk intro og lyssetting</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-gold-400/90 text-navy-950 text-xs flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <p className="font-medium">Eventyr i borggården</p>
                  <p className="text-navy-100/60 text-xs">Fortellerteater m/ musikk</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-gold-400/90 text-navy-950 text-xs flex items-center justify-center font-semibold">
                  3
                </span>
                <div>
                  <p className="font-medium">Fakkelavslutning</p>
                  <p className="text-navy-100/60 text-xs">Lys, røyk og hemmelig avsløring</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* kontakt / forms-test */}
        <section id="kontakt" className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="bg-navy-800/30 border border-navy-700/30 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Reserver billetter</h2>
            <p className="text-sm text-navy-100/75">
              Skjemaet bruker Tailwind Forms, så feltene skal se fine ut nå 💅
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="navn">
                  Navn
                </label>
                <input
                    id="navn"
                    type="text"
                    className="w-full"
                    placeholder="Eks. Jon Are"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="epost">
                  E-post
                </label>
                <input
                    id="epost"
                    type="email"
                    className="w-full"
                    placeholder="deg@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="antall">
                  Antall plasser
                </label>
                <select id="antall" className="w-full">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-torch-500 hover:bg-torch-400 text-white px-4 py-2 rounded-md font-medium shadow-torch"
              >
                Send inn
              </button>
            </form>
          </div>
          <div className="space-y-3 text-sm text-navy-100/70">
            <h3 className="text-lg font-semibold text-white">Praktisk info</h3>
            <p>📍 Fredriksten festning</p>
            <p>⏰ Oppmøte 30 min før forestilling</p>
            <p>🥶 Kle deg etter været – deler er ute</p>
            <p>🔥 Fakkel og lys brukes, si fra om sensitivitet</p>
          </div>
        </section>

        <footer className="border-t border-navy-700/40 pt-6 pb-10 text-xs text-navy-100/50 text-center">
          © {new Date().getFullYear()} Eventyrfestningen. Laget med Tailwind 4.
        </footer>
      </main>
    </div>
  );
}

export default App;
