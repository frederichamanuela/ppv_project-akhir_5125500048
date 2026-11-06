# MODULE_MAP — Peta Modul TugasIde (Sprint 3)

Aplikasi dibedah dari satu `app.js` (±1.066 baris) jadi 6 modul ES di `src/`:

```
                  ┌──────────────┐
                  │   main.js    │  titik masuk: jam, navigasi, preloader, Ctrl+Z
                  └──────┬───────┘
       ┌───────────┬─────┴──────┬──────────────┐
       ▼           ▼            ▼              ▼
┌────────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐
│ beranda.js │ │ tugas.js │ │ notes.js │ │  board.js  │
│ minggu,    │ │ form +   │ │ catatan  │ │ canvas +   │
│ timeline,  │ │ validasi │ │ autosave │ │ sticky,    │
│ kalender,  │ │ daftar + │ │          │ │ undo, fmt  │
│ pengingat  │ │ statistik │ │          │ │ teks       │
└─────┬──────┘ └────┬─────┘ └────┬─────┘ └─────┬──────┘
      │             │            │             │
      └─────────────┴──────┬─────┴─────────────┘
                           ▼
              ┌──────────────────────────┐
              │  state.js (data, bebas   │
              │  DOM) + util.js (helper) │
              └──────────────────────────┘
```

| Modul | Tugasnya | Import dari |
|---|---|---|
| `main.js` | Titik masuk: jam real-time, navigasi tab, preloader, Ctrl+Z (undo board), delegasi error `<img>` | `util.js`, `state.js`, `notes.js`, `board.js`, `tugas.js` |
| `util.js` | Helper lintas fitur: `$`, pegangan DOM, format tanggal, toast, bunyi, animasi, pindah tab | `state.js` (HARI) |
| `state.js` | Pemilik data: `tugas`, `catatan`, JADWAL, konstanta, `urutkan()` — **bebas DOM** | — |
| `beranda.js` | Strip minggu, timeline jadwal, kalender mini, pengingat | `util.js`, `state.js` |
| `tugas.js` | Form tambah + validasi, daftar terurut, statistik, `renderSemua()` | `util.js`, `state.js`, `beranda.js` |
| `notes.js` | Daftar catatan, editor, autosave, status tersimpan | `util.js`, `state.js` |
| `board.js` | Canvas stabilo, sticky note, drag/scale, undo, toolbar format teks | `util.js` |

## Bagian yang belum dimodulkan (sengaja)

- `style.css` / `timer.html` — bukan JavaScript, jadi tidak masuk jelma modul ES.
- `index.html` — markup statis, cuma ganti `<script type="module" src="./src/main.js">`.
