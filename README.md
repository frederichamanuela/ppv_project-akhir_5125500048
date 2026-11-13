# TugasIde: Tracker Tugas Mahasiswa

Website untuk mencatat tugas kuliah, brainstorming ide, mencatat catatan, dan timer fokus (Pomodoro).

## 1. Cara Menjalankan

Aplikasi memakai ES Modules, jadi **harus lewat server lokal** (klik dua kali `index.html` akan gagal karena `file://`).

```bash
cd project-akhir
python -m http.server 5500
# buka http://127.0.0.1:5500/
```

Alternatif: Live Server (VS Code) atau `npx vite`. Tanpa build step, tanpa dependensi eksternal.

## 2. Fitur MVP dan Statusnya

| Fitur | Status |
|---|---|
| Tambah tugas (nama, matkul, deadline, prioritas, keterangan) + validasi 3 aturan | Selesai |
| Daftar tugas terurut (Urgent → deadline → selesai di bawah) + filter Semua/Aktif/Selesai + statistik | Selesai |
| Tandai selesai, hapus tugas | Selesai |
| Beranda: strip minggu, timeline jadwal, kalender mini (titik deadline), pengingat | Selesai |
| Notes: daftar + editor + autosave + status tersimpan | Selesai |
| Board: stabilo canvas, sticky note 3 warna, drag/scale, undo, format teks | Selesai |
| Fokus: timer Pomodoro 5 kartu + custom (iframe `timer.html`) | Selesai |
| Penyimpanan lokal tugas & catatan (tahan data rusak) | Selesai (Sprint 4) |
| Penyimpanan untuk coretan Board | Belum (sengaja; papan hanya untuk sesi berjalan) |

## 3. Struktur Modul

```
index.html      markup halaman
style.css       tema dashboard (dipakai juga timer.html)
timer.html      timer Pomodoro mandiri (dimuat lewat iframe)
src/
  main.js       titik masuk: jam, navigasi tab, preloader, Ctrl+Z, peringatan penyimpanan
  util.js       helper: $, format tanggal, toast, bunyi, animasi, pindah tab
  state.js      pemilik data tugas/catatan + konstanta jadwal + urutkan (tanpa DOM)
  simpanan.js   penyimpanan aman data proyek (localStorage)
  komponen.js   komponen reusable: KartuTugas, BuatBadge
  beranda.js    strip minggu, timeline jadwal, kalender mini, pengingat
  tugas.js      form + validasi + daftar tugas + statistik
  notes.js      daftar catatan + editor + autosave
  board.js      canvas stabilo + sticky note + undo + toolbar teks
assets/         logo.svg, kosong.svg, selesai.wav
uji/            pemeriksa dari LAMPIRAN (tidak diubah)
```

Arah impor satu jalur: `main.js` → fitur (`tugas.js`, `notes.js`, `beranda.js`, `board.js`) → `komponen.js` / `util.js` / `state.js` → `simpanan.js`. Tidak ada dependensi melingkar.

## 4. Kontrak Komponen (`src/komponen.js`)

| Komponen | Kontrak | Dipakai di |
|---|---|---|
| `KartuTugas(tugas)` | Menerima objek `{ id, nama, matkul, deadline, prioritas, ket, done }`, mengembalikan `HTMLElement` (`li.task`). Semua teks pengguna lewat `textContent` (judul `<b>tebal</b>` tampil sebagai teks, bukan HTML). | Semua item daftar tugas (`#taskList`) |
| `BuatBadge(teks, kelas)` | Mengembalikan `span` berisi teks; dipakai untuk badge matkul, prioritas, dan tanggal di dalam `KartuTugas`. | 3 badge per kartu tugas |

## 5. Kontrak Penyimpanan (`src/simpanan.js`)

| Ekspor | Perilaku |
|---|---|
| `KUNCI = 'tugaside:v1'` | Kunci localStorage berversi. |
| `muat()` | Selalu mengembalikan `{ tugas: [...], catatan: [...] }`; tidak pernah melempar galat. JSON rusak, bukan objek, atau item tidak sah disaring keluar. Bila localStorage diblokir, memakai cadangan di memori. |
| `simpan(data)` | Menulis JSON ke `KUNCI` dalam try/catch; gagal (penuh/diblokir) tidak melempar, hanya memperingatkan. |

Bila data rusak atau penyimpanan gagal, aplikasi tetap hidup dan pengguna diberi tahu lewat toast (event `tugaside:peringatan`) serta pesan di Console.

## 6. Validasi Form (3 aturan)

1. Nama tugas minimal 3 karakter.
2. Mata kuliah wajib dipilih.
3. Deadline wajib diisi dan tidak boleh tanggal yang sudah lewat.

## 7. Bonus: Pintasan Keyboard

1. `Enter` saat fokus di form = simpan tanpa mouse.
2. `/` = loncat ke form tugas, `Esc` = reset form.
3. `Ctrl+Z` di Board = batalkan langkah terakhir (saat mengetik di form tetap undo tulisan).

## 8. Animasi dan Aksesibilitas

- Animasi masuk (tab, kartu baru) dan getaran isian salah memakai `element.animate()`, hanya `transform`/`opacity`, 250–300ms.
- `prefers-reduced-motion: reduce` mematikan animasi/transisi (matchMedia di JS + media query di CSS).

## 9. Kredit Aset dan Pustaka

- Tanpa pustaka/framework eksternal: HTML, CSS, dan JavaScript murni (ES Modules).
- `assets/logo.svg`, `assets/kosong.svg`, `assets/selesai.wav`: aset buatan sendiri untuk aplikasi ini.
- Referensi desain: <https://id.pinterest.com/pin/707276316520163390/> (tampilan UI) dan <https://oatside.com/> (animasi interaktif).

## 10. Catatan Integritas (P12)

Sebagian kode refactor dan pengaturan dokumen dibantu asisten AI (OpenCode). Berkas pemeriksa di `uji/` tidak diubah. Riwayat lengkap ada di `git log` dan `CHANGELOG.md`.
