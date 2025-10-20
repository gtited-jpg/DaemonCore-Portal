# DaemonCore Portal (Next.js + Firebase Auth)

A themed, production-ready customer portal for **portal.daemoncore.app**.
- 🔐 Google / GitHub sign-in (Firebase Auth, client-side)
- 🪐 Cosmic DaemonCore styling (purple nebula + starfield)
- 👤 Protected **/dashboard** and **/account**
- 🧾 Link-out to **LemonSqueezy** customer portal for invoices & downloads

---

## 1) Configure Firebase
Create a Firebase project → Build → Authentication → Sign-in method:
- Enable **Google** and/or **GitHub** providers.
- Add an app (Web), then copy keys into `.env.local`.

Create `.env.local` from example:
```
cp .env.local.example .env.local
# fill keys
```

## 2) Dev Run
```
npm install
npm run dev
```
Open http://localhost:3000

## 3) Protect Routes
Already implemented: if a user isn’t logged in, `/dashboard` and `/account` redirect to `/`.

## 4) LemonSqueezy
- For subscriptions & invoices, you can link to the hosted portal (placeholder on `/ls-portal`).
- For a 1:1 experience, create server endpoints that call LemonSqueezy API and display purchases.

## 5) Deploy
### Vercel (recommended)
- Create a new project from this folder.
- Add domain **portal.daemoncore.app**.
- Add env vars from `.env.local` in Vercel → Settings → Environment Variables.

### cPanel Node App
- Ensure Node 18+.
- Upload repo, run `npm ci && npm run build`.
- Configure the app to run `npm start` (port assigned by cPanel). Point the subdomain to this app.

## 6) DNS
Add a subdomain DNS record:
- If using Vercel: create **CNAME** `portal` → your Vercel domain (e.g. `cname.vercel-dns.com` as directed by Vercel).
- If using your own server: create **A** record `portal` → your server IP.

## 7) Theme Notes
- The starfield is a performant canvas render.
- Colors match `#8b5cf6` → `#7c3aed` gradient identity.
- Replace `/public/logo.svg` if you have a newer mark; links are wired.

## 8) Where to wire real data
- `/pages/dashboard.tsx`: replace product cards with your actual products + download links.
- `/pages/ls-portal.tsx`: point to your store’s portal or generate LS session links server-side.

---

**Support:** contact@daemoncore.app
