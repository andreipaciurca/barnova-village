# Bârnova Village - Modern Experience

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

### Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server (after running build).
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run scrape`: Runs the data migration script from the existing site.

---
*Created for a better community.*
