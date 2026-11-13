# ROADMAP — Tracker Tugas Mahasiswa (TugasIde)

## Sprint 1–2 (SELESAI) — MVP monolit
- [x] Form tambah tugas (nama, matkul, deadline, prioritas, keterangan) + validasi
- [x] Daftar tugas terurut (selesai → prioritas → deadline) + filter status
- [x] Tandai selesai / hapus / statistik TOTAL-SELESAI-AKTIF
- [x] Beranda: strip minggu, timeline jadwal kuliah, kalender mini, pengingat
- [x] Notes: catatan + autosave
- [x] Board: papan stabilo canvas + sticky note + undo
- [x] Fokus: timer pomodoro (iframe `timer.html`)

## Sprint 3 (INI) — Bedah monolit jadi ES Modules
- [x] Pecah `app.js` (±1.066 baris) menjadi 6 modul ES di `src/`
- [x] `state.js` menjadi pemilik data yang bebas DOM
- [x] Alur MVP identik dengan versi sebelum (terverifikasi)
- [x] Peta ketergantungan di `MODULE_MAP.md`
- [x] Riwayat commit bertahap `refactor:` per langkah, cabang `refactor/modul`, merge ke `main`

## Sprint 4 (SELESAI, v0.4.0) — Anti-banting: komponen, penyimpanan aman, perawatan
- [x] Komponen reusable `KartuTugas` / `BuatBadge` / `PesanKosong`; teks pengguna lewat `textContent`
- [x] Penyimpanan aman `tugaside:v1`: `muat()` menyaring data rusak, `simpan()` try/catch, cadangan memori
- [x] Tugas & catatan bertahan setelah reload; peringatan toast saat penyimpanan penuh/diblokir
- [x] Uji skenario rusak S2 dan S6 lewat DevTools (aplikasi tetap hidup)
- [x] README lengkap, CHANGELOG, tag `v0.4.0`

## Sprint 5 (rencana)
- [ ] Ekspor/impor data (JSON)
- [ ] Penyimpanan coretan Board
- [ ] Tes otomatis untuk `state.js` (urutkan, validasi) dan `simpanan.js` (data rusak)

