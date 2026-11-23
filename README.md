# BarberApp — Landing Page

Static site: `index.html` + `style.css` + `script.js`. Tanpa framework, tanpa build step, tanpa CDN.
Font Geist di-host sendiri dari `assets/fonts/`.

## Jalanin di lokal

```bash
python3 -m http.server 8080
# buka http://localhost:8080
```

## Deploy (pilih salah satu)

Semua opsi: **tanpa build command**, folder publish = root repo (`.`).

- **Netlify** — Add new site → Import from Git → pilih repo. Build command: kosong. Publish directory: `.`
  (atau drag & drop folder ini ke app.netlify.com/drop). Header cache dibaca dari `_headers`.
- **Vercel** — Add New → Project → pilih repo. Framework preset: *Other*. Build command & output directory: kosong.
  Header cache dibaca dari `vercel.json`.
- **Cloudflare Pages** — Create → Pages → Connect to Git. Framework preset: *None*. Build command: kosong.
  Build output directory: `/`. Header cache dibaca dari `_headers`.

## Setelah domain jadi (penting buat preview link di WA/IG/FB)

Di `index.html`, ganti URL relatif jadi absolut:

```html
<meta property="og:image" content="https://DOMAINKAMU/og-image.png">
<meta name="twitter:image" content="https://DOMAINKAMU/og-image.png">
```

dan tambahkan:

```html
<link rel="canonical" href="https://DOMAINKAMU/">
<meta property="og:url" content="https://DOMAINKAMU/">
```

## Yang perlu diganti nanti

- **Testimoni** — section `#testimoni` sengaja dinonaktifkan (dalam komentar HTML) supaya halaman siap
  dipakai untuk iklan. Kalau sudah ada testimoni asli (dengan izin), hapus tanda komentarnya dan isi.
- **Nomor WA / pesan otomatis** — cari `wa.me/6285111230209` di `index.html` (semua tombol CTA pakai link yang sama).

## Aset turunan

- `assets/ss-*-480.webp` dan `assets/ss-desktop-*-1080.webp`: versi kecil screenshot untuk `srcset` (HP lebih ringan).
- `assets/logo-ondark-96.png`, `assets/logo-onlight-96.png`: logo ukuran kecil untuk navbar/footer.
- `assets/app/*.webp` (+ `-480`): screenshot tambahan dari Panduan Pengguna untuk slide fitur.
- `assets/panduan/*.webp`: preview halaman Panduan Pengguna (sampul, daftar isi, contoh kasus).
- `og-image.png` (1200×630) dibuat dari `tools/og.html`. Untuk generate ulang: `node tools/build-og.js` (butuh Playwright).
