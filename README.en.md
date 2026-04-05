# Bârnova Village - Modern Experience

![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)
[barnova.vercel.app](https://barnova.vercel.app/)

![Build Status](https://github.com/andreipaciurca/barnova-village/actions/workflows/ci.yml/badge.svg)
![Dependabot Status](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)

This repository modernizes the Bârnova village website with the latest tech (Next.js 15+, TypeScript, Tailwind CSS), a new resilient design, and advanced features.

## Architecture & Project Structure

### Where is the index and CSS?
Unlike traditional HTML/PHP sites, this is a **Next.js** application:
- **Index**: The main entry point is `src/app/page.tsx`. This file serves as the "index.html" and defines the home page structure using React components.
- **CSS**: We use **Tailwind CSS**, a utility-first framework. Global styles are managed via Next.js conventions, and component-specific styling is done directly in the JSX classes (utility classes). No separate large `.css` files are needed.

## Vision
- **Modern Design**: Inspired by the latest web standards.
- **Resilience**: Secure by design, protected with CI/CD and Dependabot.
- **Knowledge-driven**: Data scraped from [primariabarnova.ro](https://primariabarnova.ro/) to ensure continuity.

## Hosting & Architecture
The 2026 version is designed as a **Headless WordPress** application.

### Can it be hosted on WordPress?
Technically, this is a **Next.js** (JavaScript/TypeScript) application, not a traditional PHP WordPress theme. Therefore:
- **Frontend**: Best hosted on modern platforms like **Vercel** or **Netlify** for speed, edge computing, and zero-downtime deployments.
- **Backend (Content Management)**: You continue using the existing **WordPress** dashboard at [primariabarnova.ro](https://primariabarnova.ro/) to manage posts, announcements, and pages.

### Why this approach?
1. **Dynamic**: Next.js fetches the latest content from the WordPress REST API in real-time or at build time.
2. **Easy to Use**: Village staff can keep using the WordPress interface they are familiar with.
3. **Easy to Maintain**: Separating the "look" (Next.js) from the "data" (WordPress) makes updates safer and faster.
4. **Resilient**: Modern hosting protects against many common WordPress-specific security vulnerabilities.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CI/CD**: GitHub Actions
- **Security**: Dependabot, Automated Workflows

## Best Practices
- Strict TypeScript configurations.
- Comprehensive CI/CD pipelines (Test, Build, Lint).
- Regular dependency updates via Dependabot.
- Automated resume/info updates (planned).

## Automation & CI/CD
- **Deployment**: Automated deployments to Vercel/Netlify on every push to `main`.
- **Sync**: Scripts to migrate or sync data between environments.

## 🔐 Admin Dashboard & Security
We've implemented a complete administrative system using a modern, secure stack.

### 🛠️ Tech Stack
- **Supabase (Auth & Database):** **Passwordless** authentication (Magic Links) and PostgreSQL database.
- **Next.js (App Router):** Secured routes via Middleware and Server Components.
- **Vercel:** Free hosting with automatic integration.

### 🚀 Step-by-Step Configuration
1. **Create a free project on [Supabase](https://supabase.com/).**
2. **Configure Authentication:**
   - Go to `Authentication` -> `Providers` -> `Email`.
   - Enable `Confirm Email` and ensure `Magic Links` are allowed.
3. **Add Administrative Users:**
   - Go to `Authentication` -> `Users` -> `Add User`.
   - Enter the email address you want to use for administration. Only emails in this list can log in.
4. **Execute SQL Schema:**
   - Open the `SQL Editor` in Supabase and run the content of the `supabase/schema.sql` file from this project to create the required tables.
   - **IMPORTANT NOTE:** If you get the error `Could not find the table 'public.posts' in the schema cache`, go to `Settings > API` in the Supabase dashboard and click the **"PostgREST Cache: Refresh"** button (or simply ensure the tables were created successfully).
5. **Environment Variables:**
   - In Vercel (or `.env.local`), add the following keys from `Project Settings` -> `API`:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     # Use PUBLISHABLE_DEFAULT_KEY if Supabase provides this new format
     NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
     ```

### 🔐 Admin Access & Dashboard
To manage the site content, follow these simple steps:
1. **Access the Login Page:** Navigate to [barnova.vercel.app/admin/login](https://barnova.vercel.app/admin/login) or click the **Admin Dashboard** link in the main navigation menu (top).
2. **Enter your Email:** Use the email address previously added in Supabase.
3. **Send the Link:** Press the **"Send Access Link"** button.
4. **Check your Email:** You will receive a message from Supabase (Subject: "Confirm your signup" or "Log in").
5. **Authenticate:** Click the **"Confirm your email"** button or the link within the message.
6. **You're Logged In:** Your browser will automatically redirect you to the dashboard (`/admin/dashboard`), where you can add or edit posts.

## Local Development & Testing

To run and test the project on your local machine, follow these steps:

### Prerequisites
- **Node.js**: Ensure you have Node.js 18.x or later installed.
- **npm**: Usually comes with Node.js.

### Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run the Development Server**:
   ```bash
   npm run dev
   ```
3. **Open the App**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

The development server features "Hot Reloading," so any changes you make to the code (like in `src/app/page.tsx`) will be reflected instantly in the browser.

### Local Data & Automation
To keep the site updated with the latest leadership information, we use a combination of scraping and official election data:

- **Leadership Scraping**: Extracts the current Mayor, Vice-mayor, Secretary, Local Council members, and Department list from the official website.
- **Election Data Sync**: Fetches and validates official results from the BEC (Biroul Electoral Central) / AEP to ensure data accuracy for the 2024 local elections.
- **Daily Automation**: A GitHub Action (`.github/workflows/daily-sync.yml`) runs daily at 07:00 AM (RO time) to refresh these data points and keep the UI updated.

### Scripts
- `npm run dev`: Starts the development server at [http://localhost:3000](http://localhost:3000).
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server (after running build).
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run scrape:leadership`: Scrapes the latest leadership data from `primariabarnova.ro`.
- `npm run fetch:bec`: Sychronizes and validates leadership data with official election results.
- `npm test`: Runs the test suite (Vitest).

### Health Monitoring & Logs
The project includes a comprehensive health dashboard and API:
- **Health Dashboard**: [barnova.vercel.app/health](https://barnova.vercel.app/health) - Visual monitoring of services and uptime.
- **API Status**: [/api/health](https://barnova.vercel.app/api/health) - JSON endpoint tracking system status, memory, and database connectivity.

### 📊 Accessing Logs (Production)
To troubleshoot issues in production, visit:
1. **Vercel Logs:** [vercel.com/dashboard](https://vercel.com/dashboard) -> Select Project -> `Logs` tab. Here you see Serverless Function errors (SSR) and Edge Middleware logs.
2. **Supabase Logs:** [supabase.com/dashboard](https://supabase.com/dashboard) -> `Settings` -> `Database` -> `Logs`. Here you see SQL queries, Auth errors, and API activity.
3. **Admin Dashboard:** In the control panel ([/admin/dashboard](https://barnova.vercel.app/admin/dashboard)), we've integrated a **Monitoring & Logs** section for quick access.

### How to Verify
1. Run `npm run scrape:leadership` to gather the latest info.
2. Run `npm run fetch:bec` to validate it against official election data.
3. Check `public/data/leadership.json` for the result.
4. Access `/api/health` to confirm all services (Supabase/Vercel) are "connected".
5. Run `npm run dev` and check the "Leadership" section on the home page.

---
*Created for a better community.*
