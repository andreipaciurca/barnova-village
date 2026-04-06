# Bârnova Village - Experiență Civică Modernă

![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)
[![barnova.vercel.app](https://img.shields.io/badge/site-barnova.vercel.app-blue.svg)](https://barnova.vercel.app/)
![Build Status](https://github.com/andreipaciurca/barnova-village/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Backend-emerald?logo=supabase)

Un portal digital modern, rapid și transparent pentru comunitatea din Bârnova. Acest proiect transformă site-ul tradițional al comunei într-o experiență de înaltă performanță folosind **Next.js 16**, **Supabase** și **Tailwind CSS**.

---

### ⚠️ Proiect Demo & Public API
**Acest site este un proiect demonstrativ și nu este afiliat cu Primăria Bârnova sau Consiliul Județean Iași. Datele sunt preluate din surse publice și API-uri guvernamentale în scop educativ.**

Inspirat de **demoanaf.ro**, punem la dispoziție următoarele endpoint-uri publice:
- **Leadership**: `GET /api/v1/leadership` (Primar, Consiliu Local)
- **Postări**: `GET /api/v1/posts` (Știri agregate)
- **Statistici**: `GET /api/v1/stats` (Indicatori simpli)
- **Sănătate**: `GET /api/health` (Monitorizare sistem)

---

### 🚀 Caracteristici Cheie
- **UI/UX Modern**: Design curat, receptiv, optimizat pentru mobil și desktop.
- **Date Automatizate**: Scraping zilnic pentru informații despre conducerea locală și departamente.
- **Integritate Electorală**: Sincronizare în timp real cu rezultatele oficiale BEC/AEP.
- **Admin Dashboard**: Portal securizat (Magic Link) pentru gestionarea știrilor și anunțurilor, cu layout unificat și preview live pentru editor.
- **Transparență Digitală**: Integrare directă cu surse de date deschise precum `data.gov.ro`.
- **Sănătate Sistem**: Dashboard de diagnoză în timp real la `/health`.

---

### 🛠️ Tehnologii Utilizate
- **Frontend**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS & Lucide Icons
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Deployment**: Vercel (Hobby Tier)
- **Automatizare**: GitHub Actions (Daily Sync)
- **Testing**: Vitest, Testing Library & Playwright

---

### 📈 Monitorizare și Diagnoză
Menținem o disponibilitate ridicată printr-un dashboard public:
- **Pagina de Status**: [barnova.vercel.app/health](https://barnova.vercel.app/health)
- **Status API**: [barnova.vercel.app/api/health](https://barnova.vercel.app/api/health)

---

### 📖 Documentație Detaliată
Pentru instrucțiuni de instalare și configurare, consultați:
- [**Documentație în Română**](README.ro.md)

### 📰 Reader & Editor Flow
- Postările publicate se deschid la `/posts/[slug]`.
- Anunțurile interne se pot citi direct într-un reader modal pe homepage.
- Editorul de postări include preview live înainte de publicare.

---

### 🤝 Misiune Civică
Acest proiect este construit pentru a oferi cetățenilor acces ușor la informații locale, promovând transparența și eficiența digitală în sectorul public.

---
*Creat pentru o comunitate mai bună.*
