# AFTERHOURS — Technical, Design & Deployment Specification
**Project Name (Cloudflare Pages):** `afterhouse`  
**GitHub Repository:** `https://github.com/Arifrijalf/Afterhouse`  
**Target Custom Domain:** `arifrijalfadhilah.web.id`  
**Purpose:** Kartu percakapan & deeptalk intim pasangan (anti-mati-gaya pas ngedate malam).

> **PANDUAN UNTUK AI / DEVELOPER:**  
> Dokumen ini adalah kontrak absolut (Source of Truth). Jangan merombak arah desain (kembali ke AI slop / template warna neon ungu), jangan mengubah tone bahasa menjadi "gue/lu" atau formal kaku, dan jangan merusak struktur data 120 pertanyaan.

---

## 1. Design System & Philosophy (STRICT GUIDELINE)

Arah desain web ini dirancang secara sengaja untuk membuang gaya generik template AI (*anti-AI slop*):

### A. Palet Warna (The Late-Night Cafe Palette)
* **Background Utama:** `#121316` (Deep warm charcoal / obsidian).
* **Candlelight / Dim Mode:** `#08090a` (Mode redup agar tidak silau di meja kafe malam).
* **Card Surface:** `#181a1f` dengan border halus `#2d3038`.
* **Primary Text:** `#f4f3ee` / `#ecebe4` (Warm ivory / kertas gading).
* **Secondary / Notes Text:** `#8e8d87` & `#6d6c66` (Muted warm gray).
* **Deck Accent Colors:**
  - `01 / SPILL`: Terracotta `#e07a5f` (Badge: `#e07a5f`/10 border: `#e07a5f`/40).
  - `02 / RAWMIND`: Sage Olive `#81b29a` (Badge: `#81b29a`/10 border: `#81b29a`/40).
  - `03 / TETHER`: Amber Muted `#f2cc8f` (Badge: `#f2cc8f`/10 border: `#f2cc8f`/40).
  - `04 / HAZARD`: Caramel Ochre `#d4a373` (Badge: `#d4a373`/10 border: `#d4a373`/40).

### B. Tipografi (Editorial Typography Hierarchy)
* **Display / Pertanyaan:** `Instrument Serif` (*Italic*). Memberikan bobot puitis, intim, dan personal saat dibacakan.
* **Metadata & Tags (ID, Deck Code, Timer):** `JetBrains Mono` (*Uppercase, tracking-widest*). Memberikan kesan arsip kaset / dek analog.
* **Body & UI General:** `Plus Jakarta Sans`. Bersih dan mudah dibaca di layar HP kecil.

### C. Tone of Voice & Copywriting
* **Sudut Pandang:** **AKU / KAMU** (Wajib). Jangan pernah mengganti ke *"gue / lu"* atau bahasa korporat kaku.
* **Vibe:** Santai, dewasa muda, tulus, sedikit humoris, dan tidak menghakimi (*unfiltered yet compassionate*).

---

## 2. Struktur Data Pertanyaan (`src/data/prompts.ts`)

Total pertanyaan sekarang bertambah menjadi **300 pertanyaan** yang terbagi dalam **2 Edisi**:

### A. Edisi Pasangan (150 Pertanyaan: #1 – #120 & #241 – #270)
* `01 / SPILL`: #1 – #30 (First impression, overthinking, gengsi minta maaf)
* `02 / RAWMIND`: #31 – #60 (Isi kepala, ekspektasi keluarga, luka lama, safe harbor)
* `03 / TETHER`: #61 – #90 (Intimacy, gestur kecil, aturan berantem, janji masa tua)
* `04 / HAZARD`: #91 – #120 (Skenario zombie, alien, tukar tubuh, denda traktir)
* `05 / SNAP`: #241 – #270 (Pertanyaan kilat, simpel, pelukan, cepat 3 detik)

### B. Edisi Teman Tongkrongan (150 Pertanyaan: #121 – #240 & #271 – #300)
* `01 / ROAST`: #121 – #150 (Aib lucu, red flag tongkrongan, flexing, tukang ngaret)
* `02 / CIRCLE`: #151 – #180 (Loyalitas, pinjam uang, rahasia bersama, sahabat darurat)
* `03 / EXIST`: #181 – #210 (Quarter-life crisis, beban karier/finansial, imposter syndrome)
* `04 / MADNESS`: #211 – #240 (Skenario heist casino, pulau terpencil, taruhan kocak)
* `05 / BLITZ`: #271 – #300 (Tembak cepat satu kata, hitungan 1-2-3 tunjuk orangnya di meja)

Setiap objek mengikuti interface:
```typescript
export interface PromptCard {
  id: number;
  deck: 'spill' | 'deep' | 'us' | 'wild';
  stamp: string;    // e.g. "FIRST_SPARK", "EGO_CHECK"
  question: string; // Teks pertanyaan utama (aku/kamu)
  subtext?: string; // Catatan kecil / aturan tambahan (opsional)
}
```

---

## 3. Fitur Utama Aplikasi (`src/App.tsx`)

1. **Shuffle Engine:** Mengambil kartu acak tanpa mengulang kartu yang sama secara beruntun.
2. **Deck Filter Tabs:** Filter ke dek tertentu atau gabungkan semua dek.
3. **Candlelight Mode (Flame Icon):** Toggle untuk meredupkan kontras layar di ruangan remang-remang.
4. **Timer 2 Menit (Hourglass Icon):** Mode dengar tanpa interupsi, confetti terpicu saat waktu habis.
5. **Bookmark Storage:** Menyimpan kartu favorit ke browser `localStorage` (`afterhours_saved`).
6. **Share Web API:** Membagikan pertanyaan via WhatsApp/IG Story atau clipboard fallback.

---

## 4. Panduan Menjalankan & Build Lokal

```bash
# Direktori project
cd "C:\Users\arif\Desktop\project\arifrijalfadhilah.web.id"

# 1. Menjalankan Dev Server
npm run dev

# 2. Build untuk Produksi (Wajib lolos tanpa error typecheck)
npm run build
```

---

## 5. Panduan Git & Push ke GitHub

Setiap kali melakukan pembaruan, jalankan urutan perintah berikut:

```powershell
cd "C:\Users\arif\Desktop\project\arifrijalfadhilah.web.id"

# 1. Pastikan build lolos sebelum commit
npm run build

# 2. Cek status file yang berubah
git status

# 3. Add dan commit dengan pesan jelas (Conventional Commits)
git add .
git commit -m "feat: [deskripsi perubahan singkat]"

# 4. Push ke GitHub Repo Resmi
git remote set-url origin https://github.com/Arifrijalf/Afterhouse.git 2>$null || git remote add origin https://github.com/Arifrijalf/Afterhouse.git
git push -u origin main
```

---

## 6. Panduan Deploy ke Cloudflare

Ada 2 cara deploy ke Cloudflare. Pilih yang paling sesuai:

### Metode A: Direct Deploy via Wrangler CLI (Rekomendasi Cepat dari Terminal)

Wrangler memungkinkan deploy langsung dari terminal tanpa harus menunggu GitHub webhook.

```powershell
# 1. Masuk ke direktori
cd "C:\Users\arif\Desktop\project\arifrijalfadhilah.web.id"

# 2. Lakukan build produksi
npm run build

# 3. Deploy folder dist/ ke Cloudflare Pages dengan project name 'afterhouse'
npx wrangler pages deploy dist --project-name=afterhouse
```

> **Catatan Pertama Kali Pakai Wrangler:**  
> Browser akan terbuka otomatis untuk meminta izin login akun Cloudflare Anda. Cukup klik **Allow**. Setelahnya, proses deploy akan berjalan otomatis dalam beberapa detik.

### Metode B: Cloudflare Pages Dashboard (Git Integration)

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Klik **Create Application** > tab **Pages** > **Connect to Git**.
3. Pilih repository GitHub: `Arifrijalf/Afterhouse`.
4. Isi konfigurasi build:
   * **Project name:** `afterhouse`
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
5. Klik **Save and Deploy**. Setiap kali Anda melakukan `git push origin main`, Cloudflare akan otomatis meng-update web secara langsung!

---

## 7. Pengaturan Custom Domain (`arifrijalfadhilah.web.id`)

1. Di dashboard Cloudflare Pages, buka tab **Custom domains**.
2. Klik **Set up a custom domain** > masukkan: `arifrijalfadhilah.web.id`.
3. Tambahkan DNS CNAME:
   * **Type:** `CNAME`
   * **Name:** `@` (atau `arifrijalfadhilah.web.id`)
   * **Content / Value:** `afterhouse.pages.dev`
   * **Proxy status:** Proxied (Orange cloud on)
4. Cloudflare akan menerbitkan sertifikat SSL otomatis dalam beberapa menit. Web aman dengan protokol HTTPS aktif.
