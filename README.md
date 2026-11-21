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

- **Testimoni** — 3 slot di section `#testimoni` masih placeholder `[TESTIMONI ASLI NANTI]`
  (ada komentar di HTML). Ganti dengan testimoni asli, atau hapus section-nya.
- **Screenshot tutup kasir** — `assets/ss-tutup-kasir.webp` yang dikirim rusak (isinya halaman "Not Found").
  Sementara fitur Laci kasir pakai `ss-desktop-kasir.webp`. Setelah ada screenshot yang benar,
  ikuti komentar `GANTI NANTI` di `index.html`.
- **Nomor WA / pesan otomatis** — cari `wa.me/6285111230209` di `index.html` (semua tombol CTA pakai link yang sama).

## Aset turunan

- `assets/ss-*-480.webp` dan `assets/ss-desktop-*-1080.webp`: versi kecil screenshot untuk `srcset` (HP lebih ringan).
- `assets/logo-ondark-96.png`, `assets/logo-onlight-96.png`: logo ukuran kecil untuk navbar/footer.
- `og-image.png` (1200×630) dibuat dari `tools/og.html`. Untuk generate ulang: `node tools/build-og.js` (butuh Playwright).
