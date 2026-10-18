# Preview proyek MudahNulis

`src/data/projects.json` menyimpan satu daftar proyek. `published` mengatur visibilitas, sedangkan `status` menyatakan tahap produk; keduanya terpisah. `detailMode: "preview"` tidak membutuhkan Markdown. Proyek tanpa mode tersebut tetap memakai studi kasus ID/EN.

Screenshot asli belum tersedia. Simpan screenshot di `src/assets/images/projects/mudahnulis/` (misalnya `mudahnulis-workspace.webp`). Jangan gunakan screenshot referensi desain sebagai aset proyek.

Setelah file ada, tambahkan objek pada `gallery` MudahNulis:

```json
{
	"path": "src/assets/images/projects/mudahnulis/mudahnulis-workspace.webp",
	"alt": { "id": "Ruang kerja penyuntingan MudahNulis", "en": "MudahNulis editing workspace" },
	"caption": { "id": "Preview versi pengembangan", "en": "Development version preview" },
	"order": 1,
	"cover": true
}
```

`caption` dan `cover` opsional; `order` wajib unik. Cover kartu memakai field `cover` proyek jika diisi, lalu gambar galeri bertanda `cover: true`, lalu gambar pertama menurut `order`. Tanpa gambar, kartu hanya menampilkan tipografi dan overview menampilkan pesan preview belum tersedia. Semua URL gambar menggunakan asset helper/base path hosting. Galeri tanpa JavaScript tetap menampilkan gambar serta tautan file asli.

Field opsional `githubUrl` dan `demoUrl` hanya diisi setelah URL HTTPS publik benar-benar tersedia. Jangan tambahkan URL contoh/localhost. Jalankan `npm run check`, `npm run build`, dan `npm run test:e2e` setelah memperbarui data/aset.

# Athalla Reinaldi — personal portfolio

Astro + TypeScript static starter implementing the supplied PRD. Requires Node.js 22.12+ (Node 24 recommended) and npm. No React, backend, CSS framework, or runtime third-party scripts.

## Development

Open a terminal in `athalla-portfolio`. Run `npm ci`, then `npm run dev`.
`npm run check` checks types; `npm run build` validates content, builds static pages, and checks local links/anchors. `npm run preview` serves the production build. `npm run test:e2e` runs static-output smoke tests after a build; these are not a substitute for browser accessibility tests.

## Content and assets

- `src/data/education.ts`: edit nama institusi, `logo`, monogram, tahun, serta program/status ID–EN di sini. Path logo relatif terhadap `src/assets/`; logo SMA memakai `images/organizations/sma2.png`. `endYear: null` menampilkan “Sekarang / Present”. Komponen `Education.astro` membaca daftar ini otomatis.

- `src/config/site.json`: approved public email, WhatsApp (international digits without +), social URLs, portrait, CV paths, publication status. Asset paths are relative to `public/`, without the base path. Never paste private contact details without permission.
- Put approved PDFs in `public/documents/cv/`, then set `cvAssets.id` and `.en`. Actual file size is read at build time. Missing files fail validation; absent CVs have no fake buttons.
- Put an approved portrait in `src/assets/images/profile/` and set `portrait` to `src/assets/images/profile/athalla-portrait.webp`. The AR monogram remains until supplied. Existing public image paths remain supported.
- `src/data/experiences.ts`: categorized responsibilities supplied by the owner, including 2023–2025 Xyraamarket customer count and gross revenue (not profit). Celeste is the Volunteer Head of Stage Crew entry, not a separate creative/logistics role. Its previously supplied February 2024 date is retained pending clarification against the older February 2025 record.
- `src/i18n/id.json` and `en.json`: matching UI keys, including accessible labels. Locale URLs are authoritative; root redirects to ID.
- `src/data/projects.json`: initially empty deliberately. Add only verified projects. Each entry needs `slug`, `category` (`college`/`personal`), `published`, localized `{id,en}` values for `title`, `summary`, `role`, `status`, `team`, an ISO `date`, a local `cover`, at most four `tags`, and `artifacts` with localized labels and HTTPS/local URLs.
- Each published project needs matching `src/content/projects/id/{slug}.md` and `en/{slug}.md`. Use level-two headings for problem, context/data, approach, personal contribution, results, limitations, lessons, and artifacts. Do not repeat the H1. Native Markdown rendering is for trusted owner-authored content only.
- `src/data/certifications.json`: add `id`, `published`, localized `title`, `issuer`, ISO `issuedAt`, `previewAsset`, and `originalAsset`. An empty list hides the section and navigation. Native modal dialogs provide keyboard focus trapping and Escape dismissal; original-file links work without JS.

## Mathcademy 2026

Halaman `/id/magang/` dan `/en/magang/` dibangun statis; konten dan terjemahan ada di `src/data/magang.ts`, layout di `src/pages/[lang]/magang.astro`, dan kartu beranda di `src/components/sections/MagangCard.astro`. Teks Indonesia mengikuti naskah pemilik. Pilihan tersedia hanya Variansi (pertama) dan Sampling (kedua).

Pilihan ketiga **Biner** sudah memiliki narasi ID/EN, panel minat belajar, anchor, serta tercantum pada hasil cetak. Sumber awal ketertarikan terhadap Biner (misalnya percakapan atau kegiatan tertentu) belum diberikan; jangan mengarang nama orang/acara/media sosial. Informasi ini dapat ditambahkan setelah dikonfirmasi pemilik. Panel Sampling dan Biner bersumber dari `bureauPanels` di `src/data/magang.ts` dan menyatakan minat belajar, bukan pengalaman pengabdian/profesional yang sudah dilakukan.

Tombol “Cetak / Simpan sebagai PDF” membuka dialog cetak browser, bukan unduhan otomatis. Pilih A4 dan Save as PDF, periksa seluruh lima bagian, serta matikan header/footer bawaan browser jika tidak diinginkan. Print stylesheet memaksa kertas putih/teks gelap dan menyembunyikan kontrol, navigasi, footer, dan dekorasi situs.

Belum tersedia cuplikan naskah, bahan ajar, atau dokumentasi pertunjukan yang disetujui sebagai contoh karya. Portrait asli hanya dipakai untuk perkenalan, bukan dokumentasi kegiatan. Untuk menambahkan karya, drag-and-drop gambar berizin ke `src/assets/images/magang/`, lalu tambahkan satu entri pada `creativeWorks` di `src/data/magang.ts`:

- `id`: ID unik kebab-case, misalnya `cuplikan-naskah`.
- `category`: `script` (naskah), `event` (dokumentasi), atau `teaching` (bahan ajar).
- `image`: `src/assets/images/magang/cuplikan-naskah.png`, sesuai format file asli.
- `title`, `caption`, `alt`: masing-masing objek `{ id: 'teks Indonesia', en: 'English text' }`.
- `contribution`: objek ID/EN opsional untuk peran pribadi yang sudah dikonfirmasi.

Caption menjelaskan konteks supaya hasil cetak tetap dapat dipahami. Jangan unggah identitas murid/data pribadi tanpa izin. Daftar kosong tidak menghasilkan kartu atau placeholder. `CreativeGallery.astro` memakai asset helper, preview dialog native dengan Escape/fokus kembali, dan tautan file asli tanpa JS. Naskah/bahan ajar memakai `object-fit: contain`. Navigasi halaman memakai anchor asli, sticky scrollspy, dan offset dari tinggi header/nav; teks personal tetap di `magang.ts`.

## Themes and hosting

Color tokens live in `src/styles/tokens.css`. Theme follows the OS until explicitly selected; `portfolio.theme` overrides it. Storage failures do not block navigation. Locale switching preserves hash, open experience cards, and carousel position where storage is available.

Set `SITE_URL` to the actual HTTPS origin and `BASE_PATH` to `/` or e.g. `/portfolio/` before building. Generated routes and assets respect that path. Deploy `dist/` to any static host with directory-index support. GitHub Pages workflows are under `.github/workflows/`; if this entire workspace is the repository root, move that directory to the repository root so GitHub discovers it (workflows currently use `athalla-portfolio` as their working directory). If the portfolio folder itself becomes the repository root, remove those working-directory/path prefixes.

## Before public release

This is an explicitly **non-indexable development preview**, not a release-ready portfolio. Complete both CVs, portrait, approved contact details, verified bilingual projects and covers, and confirm experience claims. Set `readyForPublication` only after review; build validation then enforces the primary release assets and domain. Change `public/robots.txt` to allow indexing, supply locale OG images, and add a sitemap for the confirmed domain. Local font files are not supplied: the site currently uses the system fallback instead of fetching fonts from a third party.

Manually verify all PRD T01–T13 scenarios, including ID/EN × light/dark, 320/375/768/1440 px, 200% zoom, blocked storage, no JS, clipboard failure, carousel 0/1/2/>3 items, certificate errors, keyboard navigation, and screen readers. Browser automation, final performance/contrast audits, analytics, and optional animation remain later work; no completion claims are made for them.

## Menambahkan aset melalui Explorer VS Code

1. Buka folder `athalla-portfolio` di Explorer VS Code. Foto: `src/assets/images/profile/`; logo organisasi: `src/assets/images/organizations/`; cover: `src/assets/images/projects/`; logo tools: `src/assets/icons/tools/`. CV tetap di `public/documents/cv/`, sertifikat di `public/documents/certificates/`.
2. Drag-and-drop file dari File Explorer Windows ke folder tujuan di Explorer VS Code. Gunakan aset sendiri/berizin; SVG untuk logo, WebP/AVIF untuk foto. Nama file huruf kecil dengan tanda hubung, tanpa spasi, misalnya `athalla-portrait.webp`, `xyraamarket-logo.svg`, `excel.svg`.
3. Untuk logo Excel, letakkan `excel.svg` di `src/assets/icons/tools/`. Di `src/data/tools.ts`, ubah field Excel dari `logo: ''` menjadi `logo: 'icons/tools/excel.svg'`. Nama dan fungsi ID/EN ada pada entri yang sama. File dicari melalui pemetaan import Vite di `src/utils/assets.ts`, bukan path Windows.
4. Untuk Xyraamarket, letakkan `xyraamarket-logo.svg` di `src/assets/images/organizations/`. Di `src/data/experiences.ts`, pada entri `id: 'xyraamarket'`, isi `logo: 'images/organizations/xyraamarket-logo.svg'`. Olativity memakai pola yang sama: `images/organizations/olativity-logo.svg`. Logo yang belum tersedia atau gagal dimuat diganti monogram; tidak ada logo milik portofolio referensi yang disalin.
5. Foto dihubungkan melalui `src/config/site.json` seperti contoh di atas. Cover proyek di `src/data/projects.json` dapat memakai `src/assets/images/projects/nama-proyek.webp`; asset helper juga mendukung path public lama. PDF memakai path relatif terhadap `public/`, misalnya `documents/cv/athalla-cv-id.pdf`, tanpa menambahkan base hosting. Jangan gunakan `C:\Users\...` atau `D:\...` sebagai URL gambar.
6. Jalankan pemeriksaan dan build kembali setelah menambah aset. Folder kosong dipertahankan oleh `.gitkeep`; hapus file tersebut bila tidak lagi diperlukan.

### Aset dan informasi yang masih perlu dilengkapi

- Foto portrait pribadi, logo Xyraamarket/Olativity/Celeste/kegiatan, dan logo lokal berizin Excel, Python, Google Sheets, n8n, Canva, PowerPoint, Word. Saat ini semuanya memakai monogram, bukan logo buatan yang mengatasnamakan merek.
- CV ID/EN, kontak yang disetujui untuk publikasi, cover dan artefak proyek, serta sertifikat jika ada.
- Tanggal mulai tutor (opsional; saat ini hanya “Sekarang / Present”), konfirmasi periode Celeste (data stage crew Februari 2024 versus catatan lama Februari 2025), dan contoh penggunaan n8n untuk dokumentasi portofolio. Evaluasi siswa, adaptasi metode, jumlah murid, dan hasil nilai tidak ditambahkan tanpa konfirmasi.