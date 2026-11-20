# Charter TugasIde

## Masalah
Mahasiswa D3 MM B kesulitan memantau deadline tugas karena tugas dari 13 mata kuliah diumumkan lewat kanal yang berbeda (grup chat, e-learning, lisan di kelas) dan tidak ada satu daftar yang menyatukannya, sehingga tugas terlewat atau baru dikerjakan mendekati batas.

## Persona
Habib, 19 tahun, mahasiswa semester 3 D3 MM B. Tiap hari ia kuliah dan praktikum, lalu mengerjakan tugas malam hari lewat laptop dan ponsel. Info tugas ia dapat dari beberapa grup chat dan catatan di ponsel. Masalahnya: ia sering baru sadar ada tugas saat teman bertanya "sudah kumpul belum?", dan di minggu padat ia tidak tahu tugas mana yang harus dikerjakan lebih dulu.

## Fitur MVP (MoSCoW)
| Fitur | Label |
|---|---|
| Kelola tugas: tambah, centang selesai, hapus, filter | Must |
| Kalender dan pengingat deadline terdekat | Must |
| Data tugas tetap ada setelah halaman di-refresh | Must |
| Catatan (Notes) | Should |
| Timer Pomodoro | Could |
| Login dan sinkron antar perangkat | **Won't** |

Won't: login dan sinkronisasi butuh server dan basis data, sedangkan proyek ini sepenuhnya di sisi browser dalam satu semester. Whiteboard sudah ada sejak Tugas 4 dan dicatat sebagai fitur warisan di luar MVP.

## Kriteria sukses
1. Pengguna baru menambah satu tugas lengkap tanpa bantuan dalam ≤ 30 detik.
2. Pengguna baru menyelesaikan alur utama (tambah tugas, lihat di pengingat, centang selesai) dalam ≤ 2 menit.
3. 100% tugas yang disimpan masih ada setelah refresh (diuji 5 kali).
4. Tampilan tidak terpotong dan tidak ada scroll samping di lebar 400 px.
5. Tampilan setelah Bootstrap dipasang sama dengan sebelumnya (dibandingkan lewat screenshot).

## Risiko dan antisipasi
| Risiko | Antisipasi |
|---|---|
| Bootstrap mengubah tampilan karena nama kelas `.card` dan `.toast` bentrok | Muat Bootstrap dengan `@layer` supaya CSS sendiri menang; bandingkan screenshot sebelum dan sesudah |
| Data hilang karena penyimpanan browser dihapus atau penuh | Bungkus baca/tulis dengan `try/catch`, tampilkan pesan, sediakan ekspor data |
| Pustaka CDN gagal dimuat saat offline | Kunci versi `@5.3.3`; fitur inti tidak bergantung pada Bootstrap JS |
| Waktu tidak cukup | Kerjakan berurutan sesuai label MoSCoW; Could dipotong lebih dulu |

## Pembaruan P13 (Tugas 7)
Bagian di atas adalah charter Sprint 1 (P09) dan tidak dihapus supaya perubahannya terlihat. Perubahan di bawah ini berangkat dari bukti empat sprint, bukan ide baru.

### Persona dipertegas
Persona tetap **Habib**, tidak diganti: ia mahasiswa semester 3 D3 MM B yang mengambil 13 mata kuliah hampir semuanya berpraktikum, kuliah dan praktikum sejak pagi, mengerjakan tugas malam hari bergantian di laptop dan ponsel, serta mendapat info tugas dari grup chat kelas, e-learning, dan pengumuman lisan. Yang ditambah hanya konteks keseharian dan kanal informasinya; masalahnya sama dengan P09.

### Keputusan fitur (MoSCoW → wajib/sebaiknya/belum)
| Fitur | Label P13 | Bukti di repo |
|---|---|---|
| Tambah, centang selesai, hapus tugas | Wajib | `v0.1.0` |
| Urutan prioritas, filter status, pengingat deadline di beranda | Wajib | `v0.1.0` |
| Penyimpanan lokal yang tahan refresh dan data rusak | Wajib | `v0.4.0` |
| Notes | Sebaiknya | `v0.1.0` |
| Timer Pomodoro | Sebaiknya | `v0.1.0` |
| Board sticky note (warisan Tugas 4) | Sebaiknya | `v0.1.0` |
| Login dan sinkron antar perangkat | Belum perlu | belum dibuat |
| Notifikasi push/email saat deadline dekat | Belum perlu | belum dibuat |

Alasan pemindahan label: Notes, Timer, dan Board sudah jadi tetapi tidak dipakai setiap hari, jadi turun dari Should/Could menjadi "sebaiknya". Login/sinkron tetap Won't karena butuh server; notifikasi push ditambahkan ke "belum perlu" karena pengingat di beranda sudah menutup kebutuhan dasar.

### Metrik yang ditetapkan di awal
1. Menambah satu tugas lengkap tanpa bantuan ≤ 30 detik.
2. Menjawab "tugas mana yang paling mendesak" ≤ 10 detik setelah beranda terbuka.
3. 100% tugas yang disimpan masih ada setelah refresh (diuji 5 kali).
4. Tidak ada scroll samping pada lebar 400 px.

### Yang sengaja tidak dibuat
Sinkronisasi antar perangkat dan notifikasi push: keduanya butuh server, akun, dan izin notifikasi, sedangkan nilai utama (satu daftar yang tidak hilang) sudah terpenuhi tanpa keduanya.
