import { getPosts } from '../lib/wordpress';

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Comuna Bârnova</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Acasă</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Administrație</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Servicii</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Turism</a>
              <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Viitorul Comunei Bârnova
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              O platformă modernă, intuitivă și rapidă pentru toți locuitorii comunei noastre.
              Informații oficiale, servicii digitale și noutăți în timp real.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                Vezi Anunțurile
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-slate-900">
                Ghid servicii <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Anunțuri Recente
              </h2>
              <p className="text-slate-500 mt-2">Ultimele știri și actualizări de la Primărie</p>
            </div>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline decoration-2 underline-offset-4">
              Vezi toate știrile
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
              >
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      Oficial
                    </span>
                    <time className="text-xs text-slate-400 font-medium">
                      {new Date(post.date).toLocaleDateString('ro-RO')}
                    </time>
                  </div>
                  <h3 
                    className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div 
                    className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="pt-4 border-t border-slate-50">
                    <button className="flex items-center text-blue-600 font-bold text-sm hover:gap-2 transition-all">
                      Citește mai mult <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 pt-24">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Servicii Digitale</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Acces la documente și cereri online, direct de pe telefon sau calculator, fără cozi.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Ghid Turistic</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Descoperă frumusețile locale, traseele turistice și istoria bogată a comunei Bârnova.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Transparență</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consultări publice și decizii ale consiliului local, disponibile oricând pentru cetățeni.
            </p>
          </div>
        </section>

        <footer className="mt-32 pt-16 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">Comuna Bârnova</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Partenerul tău în era digitală. Modernizăm serviciile publice pentru o comunitate mai puternică.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Link-uri utile</h5>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Portal Cetățean</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Plăți Online</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documente</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact</h5>
              <ul className="space-y-4 text-sm text-slate-600">
                <li>Str. Nicolae Titulescu Nr. 10, Bârnova</li>
                <li>contact@primariabarnova.ro</li>
                <li>+40 232 294 120</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
            <div>&copy; {new Date().getFullYear()} Primăria Bârnova. Site construit pentru viitor.</div>
            <div>
              Creat de <a href="https://andreipaciurca.github.io" className="text-blue-600 hover:underline font-medium">Andrei Alexandru Paciurca</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
