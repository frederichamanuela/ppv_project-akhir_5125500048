// state.js — satu-satunya pemilik data aplikasi: daftar tugas, catatan, konstanta jadwal, dan penyaringnya.

export const JADWAL = {
  1: [
    { mk: "PRAKTIKUM ANIMASI 2D", jam: "08.00-09.40" },
    { mk: "ANIMASI 2D", jam: "10.00-11.40" },
    { mk: "SISTEM PEMANCAR", jam: "13.00-14.30" },
    { mk: "PRAKTIKUM SISTEM PEMANCAR", jam: "14.50-16.20" }
  ],
  2: [
    { mk: "WORKSHOP UI/UX", jam: "08.00-10.30" },
    { mk: "PEMROGRAMAN VISUAL", jam: "13.00-15.30" }
  ],
  3: [
    { mk: "JURNALISTIK", jam: "08.00-09.40" },
    { mk: "PRAKTIKUM PEMROGRAMAN VISUAL", jam: "10.00-11.40" },
    { mk: "JARINGAN KOMPUTER", jam: "13.00-14.30" },
    { mk: "PRAKTIKUM JARINGAN KOMPUTER", jam: "14.50-16.20" }
  ],
  4: [
    { mk: "TEKNIK PENYIARAN", jam: "08.00-10.30" },
    { mk: "PRODUKSI KONTEN DIGITAL", jam: "13.00-15.30" }
  ],
  5: [], 6: [], 0: []
};

export const HARI = { 1: "SENIN", 2: "SELASA", 3: "RABU", 4: "KAMIS", 5: "JUMAT", 6: "SABTU", 0: "MINGGU" };
export const BULAN = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
export const URUT_HARI = [1, 2, 3, 4, 5, 6, 0]; // senin dulu, minggu terakhir
export const BOBOT = { "URGENT": 0, "SEMI URGENT": 1, "NORMAL": 2 };

export const hariIni = new Date();
hariIni.setHours(0, 0, 0, 0);

export let tugas = [];
export let catatan = [];

// tanggal yang dipilih lewat kalender mini, dipakai beranda dan form tugas
let tglDipilih = null;
export const getTglDipilih = () => tglDipilih;
export const setTglDipilih = (v) => { tglDipilih = v; };

export function tambahTugas(t) {
  tugas.unshift(t);
}
export function hapusTugas(id) {
  tugas = tugas.filter((x) => x.id !== id);
}
export function tambahCatatan(c) {
  catatan.unshift(c);
}
export function hapusCatatan(id) {
  catatan = catatan.filter((n) => n.id !== id);
}

export function urutkan(arr) {
  return [...arr].sort((a, b) =>
    (a.done - b.done) ||
    (BOBOT[a.prioritas] - BOBOT[b.prioritas]) ||
    (a.deadline < b.deadline ? -1 : 1) ||
    (b.id - a.id)
  );
}
