# MODULE_MAP — Peta Modul TugasIde (Sprint 3 + Sprint 4)

Aplikasi dibedah dari satu `app.js` (±1.066 baris) jadi 9 modul ES di `src/`:

```
main.js ──> tugas.js    ──> util.js, state.js, beranda.js, komponen.js
        ──> beranda.js  ──> util.js, state.js
        ──> notes.js    ──> util.js, state.js
        ──> board.js    ──> util.js
        ──> util.js     ──> state.js
        ──> state.js    ──> simpanan.js
```

| Modul | Tugasnya | Import dari |
|---|---|---|
| `main.js` | Titik masuk: jam real-time, navigasi tab, preloader, Ctrl+Z, toast peringatan penyimpanan, delegasi error `<img>` | `util.js`, `state.js`, `notes.js`, `board.js`, `tugas.js` |
| `util.js` | Helper lintas fitur: `$`, pegangan DOM, format tanggal, toast, bunyi, animasi, pindah tab | `state.js` (HARI) |
| `state.js` | Pemilik data: `tugas`, `catatan`, JADWAL, konstanta, `urutkan()`, `simpanSemua()` — bebas DOM | `simpanan.js` |
| `simpanan.js` | Penyimpanan aman: `KUNCI = 'tugaside:v1'`, `muat()` menyaring data rusak, `simpan()` try/catch, cadangan memori | — |
| `komponen.js` | Komponen reusable: `KartuTugas()`, `BuatBadge()` — teks pengguna lewat `textContent` | — |
| `beranda.js` | Strip minggu, timeline jadwal, kalender mini, pengingat | `util.js`, `state.js` |
| `tugas.js` | Form tambah + validasi, daftar terurut (via `KartuTugas`), statistik, `renderSemua()` | `util.js`, `state.js`, `beranda.js`, `komponen.js` |
| `notes.js` | Daftar catatan, editor, autosave, status tersimpan | `util.js`, `state.js` |
| `board.js` | Canvas stabilo, sticky note, drag/scale, undo, toolbar format teks | `util.js` |

## Bagian yang belum dimodulkan (sengaja)

- `style.css` dan `timer.html` tidak dimodulkan karena bukan JavaScript (modul ES hanya untuk berkas `.js`).
- `index.html` tidak dimodulkan karena berperan markup statis; satu-satunya perubahan hanya `<script type="module" src="./src/main.js">`.
