## Tante Beauty Website

Tante Beauty is a modern, content-driven marketing website for a beauty, skin and hair-care brand.  
It is built with **Next.js App Router** and **Keystatic CMS**, enabling a fast, SEO-friendly site with an easy-to-manage content workflow for services, products, and customer reviews.

> This project is based on the official Keystatic Next.js template and has been customized for the Tante Beauty brand.

---

### Overview

- **Purpose**: Present Tante Beauty’s brand, services, showcase products, and share real customer results and reviews.
- **Key Features**:
  - Content-managed pages powered by **Keystatic** (`content/`, `products/`, `services/`, `reviews/`)
  - Modern, responsive UI using the **Next.js App Router** (`app/` directory)
  - Product listing and detail pages
  - Services overview and focused service sections
  - Reviews and before/after galleries
  - Keystatic **Admin UI** for non-technical content updates
  - SEO-friendly setup with `sitemap`, `robots.txt`, and Open Graph image

---

### Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Language**: TypeScript
- **UI**: React 19, CSS (with Tailwind/PostCSS tooling)
- **CMS**: Keystatic (`@keystatic/core`, `@keystatic/next`)
- **Content format**: `mdoc` + YAML files
- **Auth / Security**: JSON Web Tokens for Keystatic admin login, secure cookies via `middleware.ts`

---

### Project Structure (High-Level)

- `app/`
  - `page.tsx`: Home page
  - `products/`: Product listing and detail routes
  - `reviews/`: Reviews page
  - `contact/`: Contact page
  - `keystatic/`: Keystatic Admin UI
  - `keystatic-login/`: Admin login page and API
  - `keystatic-logout/`: Admin logout route
  - `components/`: Layout, sections, and shared UI components
- `content/`: Site-wide content (home, footer, SEO, settings)
- `products/`: Product content in `.mdoc` files
- `services/`: Service content in `.mdoc` files
- `reviews/`: Review entries (YAML)
- `public/uploads/`: Images, videos, and assets for content
- `keystatic.config.ts`: Keystatic schema and configuration
- `env.example`: Documented environment variables

---

### Getting Started

#### 1. Prerequisites

- Node.js **v18+** (recommended; aligned with Next.js 15 requirements)
- npm (comes with Node.js)

#### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

#### 3. Environment Configuration

1. Copy the example environment file:

```bash
cp env.example .env
```

2. Update the values in `.env`:
   - `KEYSTATIC_ADMIN_USERNAME`: Admin username for Keystatic CMS access
   - `KEYSTATIC_ADMIN_PASSWORD`: Admin password for Keystatic CMS access
   - `JWT_SECRET`: **Required** - Secret key for signing JWT tokens (use a strong, random string, min 32 characters)
   - `JWT_EXPIRATION`: Optional - Token expiration time (default: `2h`). Format: `2h`, `24h`, `7d`, or seconds
   - Optionally `ALLOWED_ORIGIN` and any `NEXT_PUBLIC_*` variables

> **Important**: Never commit `.env` to version control.

#### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at:

- **Homepage**: `http://localhost:3000`
- **Keystatic Admin UI**: `http://127.0.0.1:3000/keystatic`

---

### Scripts

- **`npm run dev`**: Start the Next.js development server.
- **`npm run build`**: Create an optimized production build.
- **`npm run start`**: Start the production server (after `npm run build`).

---

### Content Management (Keystatic)

- Keystatic’s configuration lives in `keystatic.config.ts`.
- Content is stored locally in:
  - `content/` for structured site content (home, footer, SEO, settings)
  - `products/` for product pages (`*.mdoc`)
  - `services/` for service pages (`*.mdoc`)
  - `reviews/` for customer reviews (`*.yaml`)
- Media assets (images, videos) are served from `public/uploads/`.

#### Accessing the Admin UI

1. Ensure `KEYSTATIC_ADMIN_USERNAME` and `KEYSTATIC_ADMIN_PASSWORD` are set in `.env`.
2. Start the dev server: `npm run dev`.
3. Visit `http://127.0.0.1:3000/keystatic-login` to log in.
4. Once authenticated, access the admin at `http://127.0.0.1:3000/keystatic`.

Authentication and session handling are implemented via the `app/api/keystatic-login/route.ts` API route and `middleware.ts`.

---

### Deployment

You can deploy this application to any platform that supports Next.js, such as **Vercel**, **Netlify**, or **Railway**.

1. Set the environment variables in your hosting platform (see `env.example` for documentation):
   - **Required**: `KEYSTATIC_ADMIN_USERNAME`, `KEYSTATIC_ADMIN_PASSWORD`, `JWT_SECRET`
   - **Optional**: `JWT_EXPIRATION` (defaults to `2h`), `ALLOWED_ORIGIN`, `NEXT_PUBLIC_*` variables
2. Ensure `NODE_ENV=production` (usually set automatically by the platform).
3. **Important**: Generate a strong `JWT_SECRET` using a secure random generator (e.g., `openssl rand -hex 32`).
4. Optionally set `ALLOWED_ORIGIN` to your public domain (e.g. `https://tantebeauty.com`) for CORS headers.

Refer to your hosting provider’s documentation for exact deployment steps.

---

### Author & Developer

- **Author / Brand**: Tante Beauty  
- **Developer**: David Murenzi

For questions, improvements, or collaboration, please reach out to the developer and/or the Tante Beauty team.

---

### License
This project is totally owned by Tante Beauty brand, use of its code or part of it not under their consent
is prohibited. This mean all its work belongs to Tante Beauty and any work of any kind must be approved by brand.
