# Move Easy Physiotherapy (React + Vite + Supabase)

## A. Supabase setup (once)
1. Go to supabase.com > Sign up (free) > **New project**. Choose a name, a strong database password (save it privately; this project never needs it) and region **Mumbai/South Asia**. Wait ~2 min.
2. Left menu **SQL Editor** > New query > paste ALL of `supabase/migrations/001_init.sql` > **Run**. This creates the table, indexes, security rules (RLS).
3. **Authentication > Users > Add user > Create new user**: enter the admin email and a strong password, tick "Auto Confirm User".
4. **Authentication > Sign In / Providers**: turn OFF "Allow new users to sign up" (only you create staff accounts).
5. SQL Editor: run the last line of the SQL file (the commented `insert into public.admins ...`) with your admin email, uncommented.
6. **Project Settings > API** (or "API Keys"): copy **Project URL** and the **publishable (anon) key**. NEVER copy the "service_role"/"secret" key.

## B. Run on your computer
1. Install Node.js (LTS) from nodejs.org and VS Code from code.visualstudio.com.
2. VS Code: File > Open Folder > this folder. Terminal > New Terminal.
3. Copy `.env.example` to a new file named `.env`; paste the two values after the `=` signs:
   `VITE_SUPABASE_URL=` and `VITE_SUPABASE_PUBLISHABLE_KEY=`
4. Run: `npm install` then `npm run dev`. Open the http://localhost:5173 link.

## C. Test
1. Patient: open /appointment, submit a request. You see "request has been received".
2. Supabase > Table Editor > appointments: the row is there with status Pending.
3. Open /admin/login, log in with the admin account. The dashboard shows the row.
4. Change status / add a note; refresh. It stays. Check in Table Editor.
5. Privacy: log out, then open /admin/dashboard directly. You are sent to login. In Supabase the anon role has no SELECT, so visitors can never read any appointment.
6. Extra check: log in with a second user that is NOT in the admins table. Dashboard rejects them.

## D. Deploy (free) with Vercel
1. github.com > New repository > upload this folder (`.env` is ignored by `.gitignore`; never upload it).
2. vercel.com > Add New Project > import the repo (Vite is detected automatically).
3. Environment Variables: add the same two `VITE_...` values > Deploy. You get a live URL.
4. Domain: Vercel > Settings > Domains > add your domain and follow the DNS instructions.
5. Replace `YOUR-DOMAIN.com` in `index.html`, `public/robots.txt` and `public/sitemap.xml`, then redeploy.

## E. Google
- Search Console: search.google.com/search-console > Add property > URL prefix > verify (HTML tag or DNS) > Sitemaps > enter `sitemap.xml`. Indexing/ranking is not guaranteed.
- Google Business Profile: business.google.com > add Move Easy Physiotherapy, the address, phones, website, photos, services and your real opening hours; verify as Google instructs.

## F. Editing
- Phone/address/WhatsApp/services: `src/lib/config.js`. Marathi/English labels: `src/lib/i18n.jsx`.
- Images: replace files in `public/images/` keeping the same names (`doctor.jpg` is not supplied yet).
- Doctor details: `DOCTOR` in `src/pages/Home.jsx`. Testimonials: section in the same file.
- Backup: Supabase > Table Editor > appointments > Export to CSV.

## G. Folder note
`static-version-whatsapp-only/` is the simple HTML/CSS/JS site (no Supabase, no install needed; it sends bookings by WhatsApp only). The main project in this folder is the React + Supabase site. Deploy only the main project; you can delete `static-version-whatsapp-only/` anytime.

## H. Design notes (v2)
- Logo: `public/images/logo.png` was cropped from the screenshot you sent. If you have the original logo file, replace it (same name).
- Optional service photos: `public/images/services/pain-ortho.jpg`, `neuro.jpg`, `post-surgical.jpg`, `sports-other.jpg`. Without them a teal icon header shows.
- Hero photo: add `public/images/hero.jpg`; doctor photo: `public/images/doctor.jpg`.
- Colours: first lines of `src/style.css` (`:root`).
