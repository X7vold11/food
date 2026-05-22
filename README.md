# 🍽️ Analisis Kalori Makanan - AI Nutrition Analyzer

Aplikasi Progressive Web App (PWA) untuk menganalisis kalori dan nutrisi makanan berdasarkan foto menggunakan Google Gemini AI.

## ✨ Fitur

- 📸 Upload foto atau ambil gambar langsung dari kamera
- 🤖 Analisis nutrisi otomatis menggunakan AI (Gemini 3.5 Flash)
- 📊 Estimasi Kalori, Protein, Karbohidrat, dan Lemak
- 💾 API Key tersimpan otomatis di browser
- 📱 **PWA - Install sebagai aplikasi native di mobile**
- 🔄 **Offline support dengan Service Worker**
- 📱 Responsive design - berfungsi di desktop dan mobile
- 🎨 UI/UX modern dan menarik
- ⚡ Fast loading dan optimized performance

## 🚀 Demo

[Live Demo](https://x7vold11.github.io/food/)

## 📱 Install sebagai Aplikasi

### Di Android:
1. Buka website di Chrome
2. Tap menu (⋮) → "Install app" atau "Add to Home screen"
3. Aplikasi akan muncul di home screen seperti aplikasi native

### Di iOS:
1. Buka website di Safari
2. Tap tombol Share (⬆️)
3. Scroll dan tap "Add to Home Screen"
4. Tap "Add"

### Di Desktop:
1. Buka website di Chrome/Edge
2. Klik icon install (➕) di address bar
3. Atau klik menu → "Install Analisis Kalori Makanan"

## 🔑 Cara Menggunakan

1. Dapatkan API Key dari [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Masukkan API Key di kolom yang tersedia
3. Upload foto makanan atau ambil foto baru
4. Klik "Analisis Kalori"
5. Lihat hasil analisis nutrisi

## 🛠️ Teknologi

- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)
- Google Gemini 3.5 Flash API
- **Service Worker** untuk offline support
- **Web App Manifest** untuk PWA
- **Cache API** untuk performance

## 📦 Instalasi Lokal

1. Clone repository ini:
```bash
git clone https://github.com/X7vold11/food.git
```

2. Buka `index.html` di browser

Tidak perlu instalasi dependencies atau build process!

## 🌐 Deploy ke GitHub Pages

1. Push code ke GitHub repository
2. Buka Settings → Pages
3. Pilih branch `main` sebagai source
4. Aplikasi akan live di `https://x7vold11.github.io/food/`

## 🎨 Membuat Icon PWA

Lihat file `ICON-INSTRUCTIONS.md` untuk panduan lengkap membuat icon PWA.

**Quick Start:**
1. Buka `create-icons.html` di browser
2. Download semua icon yang di-generate
3. Upload ke repository

## 📁 Struktur File

```
food/
├── index.html              # Main HTML file
├── styles.css              # Styling
├── script.js               # Main JavaScript
├── service-worker.js       # Service Worker untuk PWA
├── manifest.json           # Web App Manifest
├── icon-*.png             # PWA Icons (berbagai ukuran)
├── create-icons.html      # Tool untuk generate icons
├── icon.svg               # Icon template SVG
└── README.md              # Documentation
```

## ⚠️ Catatan

- API Key disimpan secara lokal di browser Anda (localStorage)
- Hasil analisis bersifat estimasi
- Konsultasikan dengan ahli gizi untuk informasi lebih akurat
- Service Worker akan cache file untuk akses offline
- PWA membutuhkan HTTPS untuk berfungsi (GitHub Pages sudah HTTPS)

## 🔄 Update & Maintenance

Aplikasi akan otomatis check update setiap kali dibuka. Jika ada versi baru:
1. Notifikasi akan muncul
2. Klik "OK" untuk update
3. Aplikasi akan reload dengan versi terbaru

## 📄 Lisensi

MIT License

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan Google Gemini AI

## 🐛 Bug Reports & Feature Requests

Silakan buat issue di GitHub repository untuk melaporkan bug atau request fitur baru.
