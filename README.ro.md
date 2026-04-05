# Comuna Bârnova - Experiență Modernă

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

### Scripturi
- `npm run dev`: Pornește serverul de dezvoltare.
- `npm run build`: Creează un build optimizat pentru producție.
- `npm run start`: Pornește serverul de producție (după rularea build-ului).
- `npm run lint`: Rulează ESLint pentru a verifica problemele de calitate a codului.
- `npm run scrape`: Rulează scriptul de migrare a datelor de pe site-ul existent.

---
*Creat pentru o comunitate mai bună.*
