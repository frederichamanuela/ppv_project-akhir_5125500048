// komponen.js — komponen reusable: ditulis sekali, dipakai semua item daftarnya.
// Kontrak: fungsi menerima data lewat parameter, mengembalikan elemen, teks pengguna SELALU lewat textContent.

// KartuTugas(tugas) -> HTMLElement. Dipakai untuk setiap baris di daftar tugas (#taskList).
export function KartuTugas(t) {
  const li = document.createElement('li');
  li.className = 'task' + (t.done ? ' done' : '');

  const cek = document.createElement('input');
  cek.type = 'checkbox';
  cek.className = 't-check';
  cek.checked = !!t.done;
  cek.title = 'SELESAI?';

  const utama = document.createElement('div');
  utama.className = 't-main';

  const nama = document.createElement('div');
  nama.className = 't-name';
  nama.textContent = (t.nama || '').toUpperCase(); // teks pengguna aman, bukan HTML

  // keterangan opsional (kompatibel mundur dengan data lama tanpa ket)
  if ((t.ket || '').trim()) {
    const ket = document.createElement('div');
    ket.className = 't-desc';
    ket.textContent = t.ket;
    utama.appendChild(ket);
  }

  const meta = document.createElement('div');
  meta.className = 't-meta';
  const bMatkul = BuatBadge(t.matkul, 'badge');
  const bPrio = BuatBadge(t.prioritas, 'badge ' + (t.prioritas || '').replace(/\s/g, ''));
  const telat = !t.done && t.deadline && new Date(t.deadline + 'T00:00:00') < new Date().setHours(0, 0, 0, 0);
  const bTgl = BuatBadge(tglPendek(t.deadline) + (telat ? ' - TERLEWAT' : ''), 'badge' + (telat ? ' overdue' : ''));
  meta.append(bMatkul, bPrio, bTgl);
  utama.appendChild(meta);

  const aksi = document.createElement('div');
  aksi.className = 't-actions';
  const hapus = document.createElement('button');
  hapus.className = 'btn-del';
  hapus.title = 'HAPUS';
  hapus.textContent = '✕';
  aksi.appendChild(hapus);

  li.append(cek, utama, aksi);
  return li;
}

// BuatBadge(teks, kelas) -> HTMLElement. Dipakai di dalam KartuTugas (badge matkul, prioritas, tanggal).
export function BuatBadge(teks, kelas) {
  const b = document.createElement('span');
  b.className = kelas;
  b.textContent = teks || '';
  return b;
}

// PesanKosong(teks) -> HTMLElement. Dipakai: daftar tugas kosong, filter tanpa hasil, dan pesan pengingat kosong.
export function PesanKosong(teks, kelas = 'kosong') {
  const p = document.createElement('p');
  p.className = kelas;
  p.textContent = teks;
  return p;
}

function tglPendek(s) {
  if (!s || isNaN(new Date(s + 'T00:00:00'))) return 'TANPA TANGGAL';
  return new Date(s + 'T00:00:00')
    .toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    .toUpperCase();
}
