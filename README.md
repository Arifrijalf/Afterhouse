<div align="center">

# ☕ AFTERHOURS.
### *The Anti-Awkward Conversation Decks for Late-Night Dates & Hangouts*

[![License: MIT](https://img.shields.io/badge/License-MIT-81b29a?style=for-the-badge)](./LICENSE)
[![Built with React](https://img.shields.io/badge/React_19-Vite_6-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Deployed on Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-Ready-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

<p align="center">
  <b>Biar pas ngedate berdua atau nongkrong di warkop malam hari ga cuma sibuk scroll HP masing-masing.</b><br/>
  Koleksi <b>300 kartu percakapan tanpa filter</b> bergaya editorial kafe malam dengan bahasa kasual santai anak muda.
</p>

[**✨ Fitur Utama**](#-fitur-utama) • [**🃏 Koleksi Kartu**](#-koleksi-dek-kartu) • [**🚀 Cara Jalankan**](#-quick-start) • [**☁️ Deploy Sendiri**](#-deploy-ke-cloudflare-pages)

---

</div>

<br/>

## 🎯 Kenapa Afterhours Dibuat?

Pernah ga sih kalian ngalamin:
- **Lagi ngedate di kafe remang-remang**, tapi setelah makanan habis malah bingung mau ngomongin apa dan ujung-ujungnya buka Instagram atau TikTok sendiri-sendiri?
- **Lagi kumpul tongkrongan**, tapi obrolannya muter-muter di topik itu aja atau malah mabar game online tanpa ada obrolan bermakna?

**Afterhours** hadir sebagai solusi: aplikasi web kartu percakapan berbasis web (ringan, secepat kilat dibuka lewat browser HP tanpa perlu download aplikasi apapun), dirancang dengan estetika *late-night cafe* yang hangat dan tipografi puitis.

---

## ✨ Fitur Utama

- 🎨 **Anti-AI Slop Design System**: Menolak gaya kartu gradien neon ungu generik. Dibuat dengan palet *warm charcoal*, *terracotta*, dan tipografi ganda (`Instrument Serif` italic puitis + `JetBrains Mono` kaset vintage).
- 🕯️ **Candlelight / Dim Screen Mode**: Tombol redupkan kontras layar agar tidak silau atau merusak suasana saat dibuka di kafe remang-remang.
- ⏱️ **Timer 2:00 Menit (Deep Listening)**: Mode dengar gantian tanpa interupsi. Konfeti otomatis meluncur saat waktu giliran habis.
- 🔖 **Pocket Bookmark**: Simpan topik obrolan favorit ke memori browser lokal (*local storage*) untuk dibahas lagi nanti.
- 📲 **Instant Share**: Satu klik untuk membagikan pertanyaan langsung ke WhatsApp pasangan atau Instagram Story.
- 📱 **Mobile-First & Instant**: Ukuran bundle super ramping (<100KB gzip), loading 0.2 detik di jaringan seluler.

---

## 🃏 Koleksi Dek Kartu (300 Pertanyaan)

Web ini memiliki **2 Mode Edisi** yang dapat diganti secara instan:

### ❤️ 1. Edisi Pasangan (150 Pertanyaan)
Dirancang dengan sudut pandang **"aku / kamu"** yang intim, jujur, dan hangat:
- **`01 / SPILL` (30 kartu)**: First impression, overthinking chat, perbandingan masa lalu, gengsi minta maaf.
- **`02 / RAWMIND` (30 kartu)**: Lelah batin, ekspektasi keluarga, luka lama, ketakutan masa depan, *safe space*.
- **`03 / TETHER` (30 kartu)**: *Intimacy*, gestur kecil, aturan berantem, tatapan mata 30 detik, janji masa tua.
- **`04 / HAZARD` (30 kartu)**: Skenario kiamat zombie berdua, tukar raga 24 jam, alien, denda jajan kopi.
- **`05 / SNAP` (30 kartu)**: *Quick & cute!* Pertanyaan 3 detik tanpa mikir, pelukan 5 detik, cek dingin tangan.

### 👥 2. Edisi Teman Tongkrongan (150 Pertanyaan)
Dirancang untuk meja warkop / kafe rame-rame tanpa ada rasa baper:
- **`01 / ROAST` (30 kartu)**: Aib masa cringe, tukang ngaret janjian, wacana jalan yang selalu batal, teman yang bucin lupa kawan.
- **`02 / CIRCLE` (30 kartu)**: Batas pinjam uang teman, rasa takut circle bubar saat dewasa, lem perekat tongkrongan.
- **`03 / EXIST` (30 kartu)**: *Quarter-life crisis*, rasa tertinggal di LinkedIn, beban *sandwich generation*, imposter syndrome.
- **`04 / MADNESS` (30 kartu)**: Skenario heist kasino, pulau kanibal, tantangan buka riwayat chat, denda bayar cemilan.
- **`05 / BLITZ` (30 kartu)**: *Fast game!* Hitungan 1-2-3 tunjuk orangnya di meja, tembak satu kata cepat.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler** | [Vite 6](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Typography** | `Instrument Serif`, `JetBrains Mono`, `Plus Jakarta Sans` |
| **Icons & VFX** | [Lucide React](https://lucide.dev/) + [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) (Edge CDN) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/) |

---

## 🚀 Quick Start (Menjalankan di Komputer Lokal)

Prasyarat: Pastikan sudah menginstall [Node.js](https://nodejs.org/) (v18+).

```bash
# 1. Clone repository ini
git clone https://github.com/Arifrijalf/Afterhouse.git

# 2. Masuk ke direktori
cd Afterhouse

# 3. Install semua dependensi
npm install

# 4. Jalankan development server
npm run dev
```

Buka **`http://localhost:5173`** di browser Anda.  
*(Gunakan shortcut `Ctrl + Shift + M` di browser untuk simulasi layar smartphone).*

---

## ☁️ Deploy ke Cloudflare Pages

### Cara 1: Deploy Langsung via Terminal (Satu Baris Perintah)
Project ini sudah dilengkapi script Wrangler bawaan:

```bash
# Build & Deploy langsung ke Cloudflare Pages:
npm run deploy
```

### Cara 2: Sambungkan Repository GitHub
1. Buka dashboard [Cloudflare Pages](https://dash.cloudflare.com/).
2. Klik **Create Application** > **Pages** > **Connect to Git**.
3. Pilih repository Anda (**`Afterhouse`**).
4. Pengaturan build:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Sambungkan custom domain Anda di tab **Custom domains** (jika ada).

---

## 🤝 Berkontribusi / Request Topik Pertanyaan

Punya ide pertanyaan deeptalk baru atau ide skenario konyol buat tongkrongan? Kami sangat terbuka untuk pull request!

1. **Fork** repository ini.
2. Buat branch baru (`git checkout -b feature/ide-topik-baru`).
3. Tambahkan pertanyaan ke `src/data/prompts.ts`.
4. Commit perubahan Anda (`git commit -m 'feat: tambah 10 pertanyaan deep baru'`).
5. Push ke branch Anda (`git push origin feature/ide-topik-baru`).
6. Buka **Pull Request**!

---

## 🌟 Support Project Ini

Jika web ini membantu obrolan ngedate Anda jadi lebih hangat atau bikin malam nongkrong kalian makin seru:

- ⭐ **Berikan Star** di pojok kanan atas repository ini!
- 🍴 **Fork** repository ini dan buat versi kartu percakapan versi Anda sendiri.

---

<div align="center">
  <p><i>"Because the best conversations happen when you put your phones down."</i></p>
</div>
