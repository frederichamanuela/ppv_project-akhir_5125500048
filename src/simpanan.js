// simpanan.js — penyimpanan aman data proyek: KUNCI berversi, tidak pernah melempar galat,
// menyaring data rusak, punya cadangan di memori, dan memberi tahu pengguna bila penyimpanan gagal.
export const KUNCI = 'tugaside:v1';

// cadangan di memori: kalau localStorage diblokir/rusak, aplikasi masih punya data terakhir yang sah
let cadanganMemori = { tugas: [], catatan: [] };

// sinyal ke aplikasi (main.js yang memasang pendengarnya) supaya pengguna tahu penyimpanan bermasalah
function pesan(teks) {
  console.warn('[simpanan] ' + teks);
  window.dispatchEvent(new CustomEvent('tugaside:peringatan', { detail: teks }));
}

// muat() -> { tugas: [...sah], catatan: [...sah] }; tidak pernah melempar galat
export function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (mentah === null) return { tugas: [], catatan: [] };
    let data;
    try {
      data = JSON.parse(mentah);
    } catch {
      pesan('Data tersimpan rusak, aplikasi dimulai dengan data kosong.');
      return { tugas: [], catatan: [] };
    }
    if (!data || typeof data !== 'object') {
      return { tugas: [], catatan: [] };
    }
    const hasil = {
      tugas: Array.isArray(data.tugas) ? data.tugas.filter(sahTugas) : [],
      catatan: Array.isArray(data.catatan) ? data.catatan.filter(sahCatatan) : []
    };
    cadanganMemori = hasil;
    return hasil;
  } catch (err) {
    pesan('Penyimpanan tidak tersedia, memakai data cadangan sesi ini.');
    return { ...cadanganMemori, tugas: [...cadanganMemori.tugas], catatan: [...cadanganMemori.catatan] };
  }
}

export function simpan(data) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify({
      tugas: Array.isArray(data.tugas) ? data.tugas : [],
      catatan: Array.isArray(data.catatan) ? data.catatan : []
    }));
    cadanganMemori = { tugas: [...data.tugas], catatan: [...data.catatan] };
    return true;
  } catch (err) {
    pesan('Data tidak tersimpan permanen: penyimpanan penuh atau diblokir.');
    return false;
  }
}

// item rusak (bukan objek, id/nama/matkul bukan yang semestinya) disaring keluar
function sahTugas(t) {
  return !!t && typeof t === 'object' &&
    typeof t.nama === 'string' &&
    typeof t.matkul === 'string' &&
    typeof t.deadline === 'string' &&
    typeof t.done === 'boolean';
}

function sahCatatan(c) {
  return !!c && typeof c === 'object' &&
    typeof c.title === 'string' &&
    typeof c.body === 'string';
}
