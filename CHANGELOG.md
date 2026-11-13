# CHANGELOG — TugasIde

Format mengikuti [Keep a Changelog](https://keepachangelog.com/); versi mengikuti [SemVer](https://semver.org/).

## [0.4.0] - 2026-11-13
### Added
- Komponen reusable `KartuTugas` dan `BuatBadge` di `src/komponen.js`; markup kartu tugas ditulis sekali dan dipakai untuk semua item daftar, teks pengguna lewat `textContent`.
- Penyimpanan aman proyek di `src/simpanan.js`: `KUNCI` berversi `tugaside:v1`, `muat()` menyaring data rusak dan tidak pernah melempar, `simpan()` dibungkus try/catch, cadangan di memori.
- Tugas dan catatan sekarang tersimpan di localStorage dan bertahan setelah reload; pengguna diberi tahu lewat toast bila penyimpanan penuh/diblokir.
- README lengkap (cara jalan, struktur modul, kontrak komponen & penyimpanan), CHANGELOG, ROADMAP Sprint 4.
### Fixed
- Aplikasi tidak lagi layar kosong saat isi penyimpanan dirusak.

## [0.3.0] - 2026-11-06
### Changed
- Monolit `app.js` (±1.066 baris) dibedah menjadi modul ES di `src/`: `util`, `state`, `beranda`, `tugas`, `notes`, `board`, `main`.
- Dimuat lewat `<script type="module">`; tanpa variabel global aplikasi dan tanpa atribut `onclick`.

## [0.2.0] - 2026-10-15
### Changed
- Perbaikan tampilan dan bug kecil pada daftar tugas, kalender, dan papan tulis.

## [0.1.0] - 2026-09-15
### Added
- Basis aplikasi TugasIde dari Tugas 4 beserta charter proyek: beranda, tugas, notes, board, fokus timer.
