// beranda.js — satu-satunya tempat menggambar halaman beranda: strip minggu, timeline jadwal, kalender mini, dan pengingat.

import { $, dua, keISO, namaHari, tglPendek, senin, jamKeAngka, inDeadline, inNama, toast, pindahTab } from "./util.js";
import { JADWAL, HARI, BULAN, URUT_HARI, BOBOT, hariIni, tugas, getTglDipilih, setTglDipilih } from "./state.js";

let hariAktif = hariIni.getDay();
let kalTahun = hariIni.getFullYear();
let kalBulan = hariIni.getMonth();

export function gambarMinggu() {
  const sn = senin(hariIni);
  $("weekTitle").textContent = BULAN[sn.getMonth()] + " " + sn.getFullYear();

  const strip = $("weekStrip");
  strip.innerHTML = "";

  URUT_HARI.forEach((wd, i) => {
    const d = new Date(sn);
    d.setDate(sn.getDate() + i);

    const tombol = document.createElement("button");
    if (wd === hariAktif) tombol.classList.add("active");
    if (keISO(d) === keISO(hariIni)) tombol.classList.add("istoday");

    const angka = document.createElement("b");
    angka.textContent = d.getDate();
    const nama = document.createElement("span");
    nama.textContent = HARI[wd].slice(0, 3);
    tombol.appendChild(angka);
    tombol.appendChild(nama);

    tombol.addEventListener("click", () => {
      hariAktif = wd;
      gambarMinggu();
      gambarTimeline();
    });
    strip.appendChild(tombol);
  });

  // label di atas timeline
  const terpilih = new Date(sn);
  terpilih.setDate(sn.getDate() + URUT_HARI.indexOf(hariAktif));
  $("tlDayLabel").textContent = `${HARI[hariAktif]}, ${terpilih.getDate()} ${BULAN[terpilih.getMonth()].slice(0, 3)}`;
}

export function gambarTimeline() {
  // TASK BERDEADLINE DI TANGGAL TAMPIL: NAMA + MATKUL + DEADLINE
  const snTgl = senin(hariIni);
  snTgl.setDate(snTgl.getDate() + URUT_HARI.indexOf(hariAktif));
  const isoTampil = keISO(snTgl);
  const deadTampil = tugas
    .filter((t) => !t.done && t.deadline === isoTampil)
    .sort((a, b) => BOBOT[a.prioritas] - BOBOT[b.prioritas]);
  const box = $("tlTugas");
  box.innerHTML = "";
  box.classList.toggle("hidden", !deadTampil.length);
  deadTampil.forEach((t) => {
    const li = document.createElement("li");
    const nama = document.createElement("div");
    nama.className = "tt-nama";
    nama.textContent = t.nama;
    const meta = document.createElement("div");
    meta.className = "tt-meta";
    meta.textContent = `${t.matkul} • DEADLINE ${tglPendek(t.deadline)}`;
    li.appendChild(nama);
    li.appendChild(meta);
    box.appendChild(li);
  });

  const tl = $("timeline");
  tl.innerHTML = "";

  const kelas = JADWAL[hariAktif] || [];
  const JAM_MULAI = 8, JAM_AKHIR = 17, TINGGI_BARIS = 52;

  for (let h = JAM_MULAI; h < JAM_AKHIR; h++) {
    const baris = document.createElement("div");
    baris.className = "tl-row";
    const label = document.createElement("div");
    label.className = "tl-hour";
    label.textContent = dua(h);
    const sel = document.createElement("div");
    sel.className = "tl-cell";
    baris.appendChild(label);
    baris.appendChild(sel);
    tl.appendChild(baris);
  }

  if (!kelas.length) {
    const kosong = document.createElement("div");
    kosong.className = "tl-free";
    kosong.textContent = "TIDAK ADA KELAS HARI INI. CEK PENGINGAT DI SAMPING.";
    tl.appendChild(kosong);
    return;
  }

  tl.style.position = "relative";
  kelas.forEach((k, i) => {
    const [mulai, selesai] = k.jam.split("-");
    const blok = document.createElement("div");
    blok.className = "tl-block" + (i % 2 ? " alt" : "");
    blok.style.top = ((jamKeAngka(mulai) - JAM_MULAI) * TINGGI_BARIS + 4) + "px";
    blok.style.height = Math.max(44, (jamKeAngka(selesai) - jamKeAngka(mulai)) * TINGGI_BARIS - 8) + "px";

    const judul = document.createElement("div");
    judul.textContent = k.mk;
    const waktu = document.createElement("small");
    waktu.textContent = mulai.replace(".", ":") + " - " + selesai.replace(".", ":");
    blok.appendChild(judul);
    blok.appendChild(waktu);
    tl.appendChild(blok);
  });
}

export function gambarKalender() {
  $("calTitle").textContent = BULAN[kalBulan] + " " + kalTahun;
  const grid = $("calGrid");
  grid.innerHTML = "";

  const kosongAwal = (new Date(kalTahun, kalBulan, 1).getDay() + 6) % 7;
  const jumlahHari = new Date(kalTahun, kalBulan + 1, 0).getDate();
  // tanggal yg masih ada deadline belum selesai
  const adaDeadline = new Set(tugas.filter((t) => !t.done).map((t) => t.deadline));

  for (let i = 0; i < kosongAwal; i++) {
    const s = document.createElement("span");
    s.className = "cal-blank";
    s.setAttribute("aria-hidden", "true");
    grid.appendChild(s);
  }

  for (let d = 1; d <= jumlahHari; d++) {
    const b = document.createElement("button");
    b.textContent = d;
    const key = `${kalTahun}-${dua(kalBulan + 1)}-${dua(d)}`;

    if (key === keISO(hariIni)) b.classList.add("today");
    if (adaDeadline.has(key)) {
      // TITIK KECIL = INDIKATOR VISUAL, BUKAN TOMBOL BARU
      b.classList.add("has-dl");
      const titik = document.createElement("span");
      titik.className = "titik";
      titik.setAttribute("aria-hidden", "true");
      b.appendChild(titik);
    }
    if (key === getTglDipilih()) b.classList.add("picked");

    b.addEventListener("click", () => {
      setTglDipilih(key);
      inDeadline.value = key;
      $("errDeadline").textContent = "";
      inDeadline.classList.remove("invalid");
      gambarKalender();
      pindahTab("tugas");
      setTimeout(() => inNama.focus(), 300);
      toast("DEADLINE: " + tglPendek(key) + ". TINGGAL ISI NAMA + MATKUL.");
    });
    grid.appendChild(b);
  }
}

$("calPrev").addEventListener("click", () => {
  kalBulan--;
  if (kalBulan < 0) { kalBulan = 11; kalTahun--; }
  gambarKalender();
});
$("calNext").addEventListener("click", () => {
  kalBulan++;
  if (kalBulan > 11) { kalBulan = 0; kalTahun++; }
  gambarKalender();
});
$("calToday").addEventListener("click", () => {
  kalTahun = hariIni.getFullYear();
  kalBulan = hariIni.getMonth();
  gambarKalender();
});

export function gambarPengingat() {
  const ul = $("remindList");
  ul.innerHTML = "";

  const belum = tugas.filter((t) => !t.done).sort((a, b) => a.deadline.localeCompare(b.deadline));

  if (!belum.length) {
    ul.innerHTML = `<li class="ok"><span>SEMUA TUGAS SUDAH SELESAI. AMAN.</span><span class="jam">TIDAK ADA PENGINGAT</span></li>`;
    return;
  }

  belum.slice(0, 5).forEach((t) => {
    const li = document.createElement("li");
    const judul = document.createElement("span");
    judul.textContent = t.nama.toUpperCase();
    const ket = document.createElement("span");
    ket.className = "jam";
    ket.textContent = "DEADLINE " + namaHari(t.deadline) + ", " + tglPendek(t.deadline);
    li.appendChild(judul);
    li.appendChild(ket);
    ul.appendChild(li);
  });
}
