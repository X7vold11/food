# 🔧 Troubleshooting Guide

## ❌ Error 404 Setelah Install PWA

Jika aplikasi menampilkan error 404 setelah di-install, ikuti langkah berikut:

### Solusi 1: Clear Cache & Reinstall (RECOMMENDED)

#### Di Android Chrome:
1. **Uninstall aplikasi** yang sudah ter-install:
   - Long press icon aplikasi
   - Pilih "Uninstall" atau "App info" → "Uninstall"

2. **Clear browser cache**:
   - Buka Chrome
   - Menu (⋮) → Settings → Privacy and security
   - Clear browsing data
   - Pilih "Cached images and files"
   - Time range: "All time"
   - Clear data

3. **Unregister Service Worker**:
   - Buka: chrome://serviceworker-internals/
   - Cari "x7vold11.github.io"
   - Klik "Unregister"

4. **Install ulang**:
   - Buka: https://x7vold11.github.io/food/
   - Tunggu banner install muncul
   - Install aplikasi

#### Di iOS Safari:
1. **Hapus dari Home Screen**:
   - Long press icon aplikasi
   - Tap "Remove App" → "Delete"

2. **Clear Safari cache**:
   - Settings → Safari
   - Clear History and Website Data
   - Confirm

3. **Install ulang**:
   - Buka Safari
   - Kunjungi: https://x7vold11.github.io/food/
   - Share (⬆️) → Add to Home Screen

### Solusi 2: Hard Refresh di Browser

1. Buka: https://x7vold11.github.io/food/
2. Hard refresh:
   - **Windows**: Ctrl + Shift + R
   - **Mac**: Cmd + Shift + R
   - **Mobile**: Clear cache seperti di atas
3. Install ulang aplikasi

### Solusi 3: Gunakan Incognito/Private Mode

1. Buka browser dalam mode incognito/private
2. Kunjungi: https://x7vold11.github.io/food/
3. Test apakah aplikasi berfungsi
4. Jika berfungsi, clear cache di mode normal
5. Install ulang

## 🔍 Verifikasi PWA

### Check Service Worker:
1. Buka: https://x7vold11.github.io/food/
2. Buka DevTools (F12)
3. Tab "Application" → "Service Workers"
4. Pastikan status: "activated and is running"
5. Jika ada error, klik "Unregister" dan refresh

### Check Manifest:
1. DevTools → Application → Manifest
2. Pastikan:
   - Name: "Analisis Kalori Makanan"
   - Start URL: "/food/"
   - Icons: semua icon terdeteksi

### Check Cache:
1. DevTools → Application → Cache Storage
2. Pastikan "kalori-ai-v1" ada
3. Check isi cache:
   - /food/index.html
   - /food/styles.css
   - /food/script.js

## ⚠️ Common Issues

### Issue: "Failed to register service worker"
**Solusi:**
- Pastikan menggunakan HTTPS (GitHub Pages sudah HTTPS)
- Clear cache dan reload
- Check console untuk error detail

### Issue: "Manifest not found"
**Solusi:**
- Pastikan manifest.json ada di root folder
- Check path di index.html: `<link rel="manifest" href="manifest.json">`
- Hard refresh browser

### Issue: "Icons not loading"
**Solusi:**
- Pastikan semua icon-*.png sudah di-upload
- Check path di manifest.json
- Clear cache dan reload

### Issue: "App opens but shows old version"
**Solusi:**
- Unregister service worker
- Clear cache
- Hard refresh
- Install ulang

## 📱 Testing Checklist

Sebelum install, pastikan:
- ✅ Buka https://x7vold11.github.io/food/ di browser
- ✅ Aplikasi berfungsi normal
- ✅ Bisa upload foto
- ✅ Bisa analisis (dengan API key)
- ✅ Service worker registered (check DevTools)
- ✅ Manifest terdeteksi (check DevTools)

Setelah install:
- ✅ Icon muncul di home screen
- ✅ Aplikasi bisa dibuka dari home screen
- ✅ Tampilan fullscreen (tanpa browser UI)
- ✅ Semua fitur berfungsi
- ✅ Bisa digunakan offline (setelah dibuka sekali)

## 🆘 Masih Error?

Jika masih mengalami masalah:

1. **Screenshot error** yang muncul
2. **Check console** (F12 → Console) untuk error message
3. **Buka issue** di GitHub dengan detail:
   - Device & OS (Android/iOS/Desktop)
   - Browser & versi
   - Screenshot error
   - Console error message

## 💡 Tips

- Selalu gunakan **latest version** browser
- **Clear cache** secara berkala
- Jika update aplikasi, **uninstall dan install ulang**
- Test di **incognito mode** untuk isolasi masalah
- Gunakan **DevTools** untuk debugging

## ✅ Update Terbaru

**Version: 1.0.1** (Latest)
- ✅ Fixed PWA paths untuk GitHub Pages
- ✅ Service worker path: `/food/service-worker.js`
- ✅ Manifest start_url: `/food/`
- ✅ Cache paths: `/food/*`

Jika Anda install sebelum update ini, silakan **uninstall dan install ulang** untuk mendapatkan versi terbaru.
