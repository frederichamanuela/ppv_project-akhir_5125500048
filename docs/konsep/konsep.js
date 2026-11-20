// konsep.js — isi konsep produk TugasIde untuk Tugas 7 (Project Akhir P09–P12).
const KONSEP = {
  nama: 'TugasIde',
  tagline: 'Satu halaman untuk tugas, tenggat, catatan, whiteboard, dan timer fokus.',
  persona: {
    nama: 'Muhammad Habib Al Rifai, 20 tahun',
    siapa: 'Mahasiswa semester 3 D3 Teknologi Multimedia dan Broadcasting yang aktif di organisasi E-Bio dan mengambil banyak kegiatan perkuliahan.',
    keseharian: 'Kuliah dan praktikum Senin sampai Jumat, ditambah kegiatan organisasi. Tugas masuk lewat ETHOL, grup kelas, dan langsung dari dosen; pengerjaan sebagian besar dilakukan malam hari.',
    masalah: 'Tenggat tersebar di tiga sampai empat tempat, sehingga ia sering baru menyadari tugas sehari sebelum batas pengumpulan.',
  },
  masalah: 'Beberapa kali Habib menerima beberapa tugas sekaligus dengan tenggat yang berdekatan, berasal dari ETHOL, grup kelas, dan langsung dari dosen. Tenggat yang menumpuk membuat ia sering baru menyadarinya sehari sebelum batas. Akibatnya waktu pengerjaan kurang dan kualitas tugas menurun.',
  solusi: 'TugasIde mengumpulkan tugas, tenggat, catatan, whiteboard, dan timer fokus dalam satu halaman web. Beranda menampilkan tugas dengan tenggat terdekat paling atas. Data disimpan di perangkat pengguna sehingga tidak perlu membuat akun.',
  fitur: [
    { nama: 'Daftar tugas dengan tenggat (tab Tugas)', prioritas: 'wajib', alasan: 'Inti masalah persona: tenggat harus ada di satu tempat. Sudah jadi: v0.1.0.' },
    { nama: 'Ringkasan tenggat terdekat (tab Beranda)', prioritas: 'wajib', alasan: 'Menjawab masalah "baru sadar sehari sebelum batas" tanpa perlu menelusuri daftar. Sudah jadi: v0.1.0.' },
    { nama: 'Penyimpanan data yang tidak hilang saat dimuat ulang', prioritas: 'wajib', alasan: 'Daftar tugas yang hilang membuat aplikasi tidak dipercaya; diperbaiki di P12 (Anti-Banting). Sudah jadi: v0.4.0.' },
    { nama: 'Timer fokus (tab Fokus)', prioritas: 'sebaiknya', alasan: 'Membantu mengerjakan tugas, tetapi pengguna tetap bisa memakai timer lain. Sudah jadi: v0.1.0.' },
    { nama: 'Catatan (tab Notes)', prioritas: 'sebaiknya', alasan: 'Berguna untuk bahan tugas, bukan penyebab utama tenggat terlewat. Sudah jadi: v0.1.0.' },
    { nama: 'Papan coretan atau whiteboard (tab Board)', prioritas: 'sebaiknya', alasan: 'Ruang brainstorming ide dan sticky note; berguna, tetapi bukan alur wajib mencatat tugas. Sudah jadi: v0.1.0.' },
    { nama: 'Akun dan sinkronisasi antar perangkat', prioritas: 'belum', alasan: 'Butuh server dan login; tidak menguji nilai utama aplikasi. Belum dibuat.' },
    { nama: 'Notifikasi pengingat', prioritas: 'belum', alasan: 'Butuh izin peramban dan layanan latar; pengingat di beranda sudah menutup kebutuhan dasar. Belum dibuat.' },
  ],
  pembanding: [
    { nama: 'Todoist', kelebihan: 'Pengingat, tersedia di banyak perangkat, dan tampilan daftar tugas yang rapi.', kekurangan: 'Sebagian fitur lanjutan berbayar dan tidak dirancang untuk konteks mata kuliah praktikum.' },
    { nama: 'Trello', kelebihan: 'Papan Kanban yang fleksibel dan bisa dipakai berkelompok.', kekurangan: 'Tidak ada ringkasan tenggat terdekat bawaan dan tidak ada timer fokus.' },
    { nama: 'Notion', kelebihan: 'Sangat fleksibel: catatan, basis data, dan papan dalam satu tempat.', kekurangan: 'Tampilan terlalu rumit untuk pengguna baru yang hanya ingin mencatat tugas.' },
  ],
  pembeda: 'TugasIde tidak hanya memberi todo list, kalender, notes, dan timer, tetapi juga ruang bertukar pikiran lewat whiteboard — semuanya tanpa akun dan tanpa server.',
};
