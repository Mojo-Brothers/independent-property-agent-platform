# PRODUCTION DEPLOYMENT & RECOVERY RUNBOOK
## Robby Viory Fansya – Independent Property Agent Platform

**Target Infrastructure:** GitHub + Cloudflare Pages + Supabase (100% Free Tier)  
**Production URL:** `https://robbyvioryfansya.pages.dev` (atau custom domain masa depan)  

---

## 1. LANGKAH DEPLOYMENT GITHUB REPOSITORY

1. **Commit Seluruh Kode Sumber Lokal:**
   ```bash
   git add .
   git commit -m "feat: complete independent property agent platform v1.0.0"
   ```
2. **Buat Repositori Baru di GitHub:**
   * Buka [github.com/new](https://github.com/new).
   * Beri nama: `independent-property-agent-platform`.
   * Pilih tipe: **Private** (atau Public).
3. **Hubungkan Remote dan Push:**
   ```bash
   git remote add origin https://github.com/username/independent-property-agent-platform.git
   git push -u origin main
   ```

---

## 2. SETUP BACKEND SUPABASE (FREE TIER)

1. Buat proyek baru di [database.new](https://database.new) (Supabase Console).
2. Pilih region terdekat: **Singapore (ap-southeast-1)**.
3. Buka **SQL Editor** pada dashboard Supabase.
4. Buka file lokal `supabase/migrations/20261119000000_initial_schema.sql`, salin seluruh kueri SQL, tempelkan ke SQL Editor, dan klik **RUN**.
5. Buka menu **Authentication > Providers > Email** dan nonaktifkan opsi *"Enable Email Signup"* untuk mencegah registrasi publik.
6. Salin kredensial proyek dari **Project Settings > API**:
   * `Project URL` -> `PUBLIC_SUPABASE_URL`
   * `anon public key` -> `PUBLIC_SUPABASE_ANON_KEY`
   * `service_role secret key` -> `SUPABASE_SERVICE_ROLE_KEY`

---

## 3. DEPLOYMENT KE CLOUDFLARE PAGES

1. Masuk ke [dash.cloudflare.com](https://dash.cloudflare.com) > **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
2. Pilih repository `independent-property-agent-platform`.
3. Atur konfigurasi build sebagai berikut:
   * **Framework preset:** `Astro`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
4. Di bagian **Environment Variables (Production)**, masukkan:
   * `NODE_VERSION`: `20.18.0` (atau `22.x`)
   * `PUBLIC_SUPABASE_URL`: `https://your-project.supabase.co`
   * `PUBLIC_SUPABASE_ANON_KEY`: `eyJhbG...`
   * `SUPABASE_SERVICE_ROLE_KEY`: `eyJhbG...` (Secret)
   * `PUBLIC_AGENT_NAME`: `Robby Viory Fansya`
   * `PUBLIC_AGENT_TITLE`: `Independent Property Agent`
   * `PUBLIC_WHATSAPP_NUMBER`: `6281280000000`
   * `PUBLIC_OFFICIAL_EMAIL`: `contact@robbyproperty.com`
5. Klik **Save and Deploy**.
6. Cloudflare akan melakukan build dan mempublikasikan situs ke subdomain:
   `https://independent-property-agent-platform.pages.dev` (atau subdomain kustom pilihan Anda).

---

## 4. PRODUCTION SMOKE TEST CHECKLIST

Lakukan pengujian berikut begitu link live tersedia:
* [ ] Buka halaman utama: Pastikan hero, palet navy/gold, dan navigasi termuat mulus.
* [ ] Buka katalog `/properties`: Coba filter lokasi dan tipe properti.
* [ ] Buka detail properti `/properties/cluster-grand-asteria-residence-65-90`: Coba klik tombol "Tanya Unit" dan ganti foto galeri.
* [ ] Uji formulir inquiry: Masukkan data uji dan pastikan notifikasi sukses muncul.
* [ ] Buka `/admin/login`: Masukkan kredensial admin dan pastikan berhasil masuk ke dashboard `/admin`.
* [ ] Klik tombol floating WhatsApp: Pastikan mengarah ke tautan pesan pre-filled WhatsApp dengan benar.
