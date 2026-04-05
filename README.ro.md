# Comuna Bârnova - Experiență Modernă

![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)
[barnova.vercel.app](https://barnova.vercel.app/)

![Build Status](https://github.com/andreipaciurca/barnova-village/actions/workflows/ci.yml/badge.svg)
![Dependabot Status](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)

Acest repository modernizează site-ul comunei Bârnova cu cele mai noi tehnologii (Next.js 15+, TypeScript, Tailwind CSS), un design nou rezilient și funcționalități avansate.

## Arhitectură și Structura Proiectului

### Unde este indexul și CSS-ul?
Spre deosebire de site-urile tradiționale HTML/PHP, aceasta este o aplicație **Next.js**:
- **Index**: Principalul punct de intrare este `src/app/page.tsx`. Acest fișier servește ca "index.html" și definește structura paginii de pornire folosind componente React.
- **CSS**: Folosim **Tailwind CSS**, un framework utility-first. Stilurile globale sunt gestionate prin convențiile Next.js, iar stilizarea specifică componentelor se face direct în clasele JSX (clase utilitare). Nu sunt necesare fișiere `.css` separate și mari.

## Viziune
- **Design Modern**: Inspirat de cele mai recente standarde web.
- **Reziliență**: Securizat prin design, protejat cu CI/CD și Dependabot.
- **Bazat pe cunoaștere**: Date extrase de pe [primariabarnova.ro](https://primariabarnova.ro/) pentru a asigura continuitatea.

## Găzduire și Arhitectură
Versiunea actuală este concepută ca o aplicație **Headless WordPress**.

### Poate fi găzduit pe WordPress?
Tehnic, aceasta este o aplicație **Next.js** (JavaScript/TypeScript), nu o temă tradițională WordPress în PHP. Prin urmare:
- **Frontend**: Cel mai bine găzduit pe platforme moderne precum **Vercel** sau **Netlify** pentru viteză, edge computing și desfășurări fără timp de nefuncționare.
- **Backend (Management Conținut)**: Continuați să folosiți panoul de control **WordPress** existent la [primariabarnova.ro](https://primariabarnova.ro/) pentru a gestiona postările, anunțurile și paginile.

### De ce această abordare?
1. **Dinamic**: Next.js preia cel mai recent conținut din API-ul REST WordPress în timp real sau la momentul build-ului.
2. **Ușor de utilizat**: Personalul primăriei poate continua să folosească interfața WordPress cu care este familiarizat.
3. **Ușor de întreținut**: Separarea aspectului (Next.js) de date (WordPress) face actualizările mai sigure și mai rapide.
4. **Rezistent**: Găzduirea modernă protejează împotriva multor vulnerabilități de securitate comune specifice WordPress.

## Tehnologii Utilizate
- **Framework**: Next.js (App Router)
- **Limbaj**: TypeScript
- **Stilizare**: Tailwind CSS
- **CI/CD**: GitHub Actions
- **Securitate**: Dependabot, Fluxuri de lucru automatizate

## Bune Practici
- Configurații TypeScript stricte.
- Pipeline-uri CI/CD cuprinzătoare (Testare, Build, Lint).
- Actualizări regulate ale dependențelor prin Dependabot.
- Actualizări automate de resume/informații (planificat).

## Automatizare și CI/CD
- **Deployment**: Desfășurări automate pe Vercel/Netlify la fiecare push pe `main`.
- **Sincronizare**: Scripturi pentru migrarea sau sincronizarea datelor între medii.

## 🔐 Admin Dashboard & Securitate (Tier Gratuit)

Am implementat un sistem administrativ complet folosind un stack modern și securizat, delegând responsabilitățile către servicii externe pentru a menține costurile **ZERO**.

### 🛠️ Tehnologii Utilizate
- **Supabase (Auth & Database):** Autentificare **Passwordless** (Magic Links/Token-based) și bază de date PostgreSQL.
- **Next.js (App Router):** Rute securizate prin Middleware și Server Components.
- **Dependency Injection (DI):** Arhitectură modulară folosind decoratori de tip **SpringBoot** (`@Service`).
- **Vercel:** Hosting gratuit cu integrare automată.

### 🚀 Configurare Pas cu Pas
1. **Creează un proiect gratuit pe [Supabase](https://supabase.com/).**
2. **Configurează Autentificarea:**
   - Mergi la `Authentication` -> `Providers` -> `Email`.
   - Activează `Confirm Email` și asigură-te că `Magic Links` sunt permise.
3. **Execută Schema SQL:**
   - Deschide `SQL Editor` în Supabase și rulează conținutul fișierului `supabase/schema.sql` din acest proiect.
4. **Variabile de Mediu:**
   - În Vercel (sau `.env.local`), adaugă următoarele chei preluate din setările proiectului Supabase:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     SUPABASE_SERVICE_ROLE_KEY=...
     NEXT_PUBLIC_SITE_URL=https://barnova.vercel.app
     ```

### 🔐 Acces Admin & Dashboard
Pentru a gestiona conținutul site-ului, urmați acești pași:
1. **Accesați Pagina de Login:** Navigați la [/admin/login](https://barnova.vercel.app/admin/login) sau folosiți link-ul **Dashboard Admin** din bara de navigare.
2. **Autentificare Magic Link:** Introduceți adresa de email administrativă. Veți primi un email cu un link de acces securizat.
3. **Acces Dashboard:** Dați click pe butonul din email pentru a fi redirecționat automat către panoul de control (`/admin/dashboard`).
4. **Cerințe:** Email-ul dumneavoastră trebuie să fie deja înregistrat în secțiunea `Authentication` a proiectului Supabase asociat.

### 🔒 Securitate
- **Fără Parole:** Atacurile de tip brute-force sunt inutile, deoarece autentificarea se bazează pe link-uri unice trimise pe email.
- **RLS (Row Level Security):** Baza de date este protejată la nivel de rând; doar administratorii autentificați pot modifica postările.
- **Middleware:** Accesul la rutele `/admin/*` este verificat la nivel de server înainte de randare.

## Dezvoltare Locală și Testare

Pentru a rula și testa proiectul pe mașina locală, urmați acești pași:

### Cerințe prealabile
- **Node.js**: Asigurați-vă că aveți instalat Node.js 18.x sau o versiune ulterioară.
- **npm**: De obicei vine împreună cu Node.js.

### Pași
1. **Instalați Dependențele**:
   ```bash
   npm install
   ```
2. **Rulați Serverul de Dezvoltare**:
   ```bash
   npm run dev
   ```
3. **Deschideți Aplicația**:
   Navigați la [http://localhost:3000](http://localhost:3000) în browserul web.

Serverul de dezvoltare dispune de "Hot Reloading", astfel încât orice modificare adusă codului (cum ar fi în `src/app/page.tsx`) va fi reflectată instantaneu în browser.

### Date Locale și Automatizare
Pentru a menține site-ul la zi cu cele mai recente informații despre conducere, folosim o combinație de scraping și date electorale oficiale:

- **Scraping Conducere**: Extrage automat Primarul, Viceprimarul, Secretarul, membrii Consiliului Local și lista departamentelor din site-ul oficial.
- **Sincronizare Date Electorale**: Preia și validează rezultatele oficiale de la BEC (Biroul Electoral Central) / AEP pentru a asigura acuratețea datelor pentru alegerile locale 2024.
- **Automatizare Zilnică**: Un GitHub Action (`.github/workflows/daily-sync.yml`) rulează zilnic la ora 07:00 (ora României) pentru a reîmprospăta aceste date și a menține interfața actualizată.

### Scripturi
- `npm run dev`: Pornește serverul de dezvoltare la [http://localhost:3000](http://localhost:3000).
- `npm run build`: Creează un build optimizat pentru producție.
- `npm run start`: Pornește serverul de producție (după rularea build-ului).
- `npm run lint`: Rulează ESLint pentru a verifica problemele de calitate a codului.
- `npm run scrape:leadership`: Extrage datele despre conducere de pe `primariabarnova.ro`.
- `npm run fetch:bec`: Sincronizează și validează datele conducerii cu rezultatele oficiale BEC/AEP.
- `npm test`: Rulează suita de teste (Vitest).

### Monitorizare Stare (Health)
Proiectul include un endpoint de monitorizare la `/api/health` care verifică:
- **Starea Sistemului**: Timp de funcționare (uptime), utilizarea memoriei și versiunea.
- **Conectivitate Supabase**: Verifică dacă aplicația poate comunica cu succes cu baza de date PostgreSQL.
- **Mediu Vercel**: Detectează dacă aplicația rulează în mediul de producție sau preview din Vercel.

### Cum se Verifică
1. Rulați `npm run scrape:leadership` pentru a colecta cele mai noi informații.
2. Rulați `npm run fetch:bec` pentru a le valida față de datele electorale oficiale.
3. Verificați `public/data/leadership.json` pentru rezultatul final.
4. Rulați `npm run dev` și verificați secțiunea "Conducere" de pe pagina principală.

---
*Creat pentru o comunitate mai bună.*
