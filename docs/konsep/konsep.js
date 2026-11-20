// konsep.js — isi konsep produk TugasIde untuk Tugas 7 (Project Akhir P09–P12).
const KONSEP = {
  nama: 'TugasIde',
  tagline: 'Satu daftar untuk semua deadline tugas kuliah, lengkap dengan pengingat dan timer fokus.',
  persona: {
    nama: 'Habib, 19 tahun',
    siapa: 'Mahasiswa semester 3 D3 Teknologi Multimedia dan Broadcasting (MM B) yang mengambil 13 mata kuliah, hampir semuanya berpraktikum.',
    keseharian: 'Kuliah dan praktikum sejak pagi, lalu mengerjakan tugas malam hari bergantian di laptop dan ponsel. Info tugas ia dapat dari grup chat kelas, e-learning, dan pengumuman lisan di kelas.',
    masalah: 'Ia sering baru sadar ada tugas saat teman bertanya "sudah kumpul belum?", dan di minggu padat ia tidak tahu tugas mana yang harus dikerjakan lebih dulu.',
  },
  masalah: 'Tugas dari 13 mata kuliah diumumkan lewat kanal yang berbeda: grup chat, e-learning, dan lisan di kelas. Tidak ada satu daftar yang menyatukannya, jadi Habib baru sadar ada tugas saat teman bertanya atau saat batas pengumpulan sudah dekat. Di minggu padat ia juga tidak tahu tugas mana yang harus dikerjakan lebih dulu.',
  solusi: 'TugasIde menyatukan tugas dari semua mata kuliah dalam satu daftar yang diurutkan menurut prioritas dan deadline terdekat. Pengguna bisa menandai tugas selesai, melihat pengingat di beranda, dan menyimpan semuanya di browser sehingga tetap ada setelah halaman dimuat ulang. Timer fokus dan catatan disediakan supaya waktu mengerjakan tugas lebih terkendali.',
  fitur: [
    { nama: 'Tambah, centang selesai, dan hapus tugas', prioritas: 'wajib', alasan: 'Inti masalah persona: satu daftar yang bisa diubah saat keadaan berubah. Sudah jadi: v0.1.0.' },
    { nama: 'Urutan prioritas, filter status, dan pengingat deadline di beranda', prioritas: 'wajib', alasan: 'Menjawab "tidak tahu mana yang harus dikerjakan dulu" tanpa membuka tiap grup chat. Sudah jadi: v0.1.0.' },
    { nama: 'Penyimpanan lokal yang tahan refresh dan data rusak', prioritas: 'wajib', alasan: 'Daftar hanya berguna kalau tidak hilang saat halaman ditutup; versi aman ada di v0.4.0.' },
    { nama: 'Notes untuk catatan tugas', prioritas: 'sebaiknya', alasan: 'Menyimpan detail tugas, tetapi alur utama tetap jalan tanpa ini. Sudah jadi: v0.1.0.' },
    { nama: 'Timer fokus Pomodoro', prioritas: 'sebaiknya', alasan: 'Membantu mulai mengerjakan, bukan syarat untuk mencatat tugas. Sudah jadi: v0.1.0.' },
    { nama: 'Board sticky note warisan Tugas 4', prioritas: 'sebaiknya', alasan: 'Berguna untuk brainstorming, tetapi tidak dipakai setiap hari. Sudah jadi: v0.1.0.' },
    { nama: 'Login dan sinkronisasi antar perangkat', prioritas: 'belum', alasan: 'Butuh server, basis data, dan akun; nilai utama produk tidak bergantung pada ini. Belum dibuat.' },
    { nama: 'Notifikasi push atau email saat deadline dekat', prioritas: 'belum', alasan: 'Butuh izin notifikasi dan layanan latar belakang; pengingat di beranda sudah menutup kebutuhan dasar. Belum dibuat.' },
  ],
  pembanding: [
    { nama: 'Google Classroom', kelebihan: 'Resmi dipakai kampus; tugas, tenggat, dan materi per kelas ada di satu tempat.', kekurangan: 'Hanya mencakup kelas yang memakainya, jadi lintas mata kuliah sering tidak lengkap; tidak ada timer fokus atau catatan pribadi.' },
    { nama: 'Notion', kelebihan: 'Sangat fleksibel: daftar tugas, catatan, dan papan bisa disatukan dalam satu ruang.', kekurangan: 'Harus disusun dan diisi sendiri; terasa berat untuk kebutuhan "catat cepat" di ponsel.' },
    { nama: 'Todoist', kelebihan: 'Pengingat dan prioritas matang, bisa dipakai lintas perangkat.', kekurangan: 'Bukan konteks kuliah (tidak ada mata kuliah atau kelas), fitur pengingat penuh berbayar, dan tidak ada timer atau catatan.' },
  ],
  pembeda: 'Satu halaman yang menyatukan daftar tugas, pengingat, catatan, dan timer fokus khusus mahasiswa — tanpa login, tanpa server, dan tetap jalan saat offline di browser.',
};
