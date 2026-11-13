// tugas.js — satu-satunya pemilik fitur daftar tugas: form tambah, validasi, daftar terurut, statistik, dan render ulang aplikasi.

import { $, form, daftar, inNama, inMatkul, inDeadline, inPrioritas, inKet, selFilter,
         dua, tglPendek, toast, bunyi, animMasuk, animGoyang, keISO } from "./util.js";
import { BOBOT, hariIni, tugas, tambahTugas, hapusTugas, urutkan, getTglDipilih, setTglDipilih, simpanSemua } from "./state.js";
import { gambarMinggu, gambarTimeline, gambarKalender, gambarPengingat } from "./beranda.js";
import { KartuTugas, PesanKosong } from "./komponen.js";

let filter = "semua";
let idBaru = null;

export function validasi(tampilkan = true) {
  const err = {};

  if (inNama.value.trim().length < 3) err.nama = "NAMA TUGAS MINIMAL 3 KARAKTER.";
  if (!inMatkul.value) err.matkul = "PILIH MATA KULIAH.";

  if (!inDeadline.value) {
    err.deadline = "ISI DEADLINE.";
  } else if (new Date(inDeadline.value + "T00:00:00") < hariIni) {
    err.deadline = "DEADLINE TIDAK BOLEH TANGGAL LAMPAU.";
  }

  if (tampilkan) {
    $("errName").textContent = err.nama || "";
    $("errMatkul").textContent = err.matkul || "";
    $("errDeadline").textContent = err.deadline || "";
    inNama.classList.toggle("invalid", !!err.nama);
    inMatkul.classList.toggle("invalid", !!err.matkul);
    inDeadline.classList.toggle("invalid", !!err.deadline);
  }

  return Object.keys(err).length === 0;
}

export function setLoading(nyala) {
  $("loading").classList.toggle("hidden", !nyala);
  if (nyala) {
    $("empty").classList.add("hidden");
    daftar.innerHTML = "";
  }
}

export function renderSemua() {
  gambarMinggu();
  gambarTimeline();
  gambarKalender();
  gambarPengingat();
  render();
}

export function render() {
  const tampil = urutkan(tugas.filter((t) => {
    if (filter === "semua") return true;
    return filter === "selesai" ? t.done : !t.done;
  }));

  daftar.replaceChildren();
  $("empty").classList.toggle("hidden", tugas.length > 0);

  if (tugas.length) {
    if (!tampil.length) {
      const kosong = PesanKosong("TIDAK ADA DI FILTER INI.", "task t-message");
      kosong.innerHTML = `<div class="t-main"><div class="t-name"></div><div class="t-meta"></div></div>`;
      kosong.querySelector(".t-name").textContent = "TIDAK ADA DI FILTER INI.";
      kosong.querySelector(".t-meta").textContent = "GANTI FILTER KE SEMUA.";
      daftar.appendChild(kosong);
    }

    tampil.forEach((t) => {
      const li = KartuTugas(t);
      if (t.id === idBaru) {
        idBaru = null;
        animMasuk(li, 12);
      }

      li.querySelector(".t-check").addEventListener("click", () => {
        t.done = !t.done;
        if (t.done) bunyi();
        toast(t.done ? "TUGAS SELESAI." : "TUGAS DIAKTIFKAN KEMBALI.");
        simpanSemua();
        renderSemua();
      });

      li.querySelector(".btn-del").addEventListener("click", () => {
        hapusTugas(t.id);
        toast("TUGAS DIHAPUS.");
        simpanSemua();
        renderSemua();
      });

      li.addEventListener("mouseover", () => li.classList.add("hovered"));
      li.addEventListener("mouseout", () => li.classList.remove("hovered"));

      daftar.appendChild(li);
    });
  }

  simpanSemua();
  updateStatistik();
}

function updateStatistik() {
  const selesai = tugas.filter((t) => t.done).length;
  $("statTotal").textContent = tugas.length;
  $("statDone").textContent = selesai;
  $("statActive").textContent = tugas.length - selesai;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validasi(true)) {
    toast("PERIKSA KEMBALI ISIAN YANG DITANDAI MERAH.");
    [inNama, inMatkul, inDeadline].forEach((el) => {
      if (el.classList.contains("invalid")) animGoyang(el);
    });
    return;
  }

  setLoading(true);
  $("btnSave").disabled = true;

  setTimeout(() => {
    const tBaru = {
      id: Date.now(),
      nama: inNama.value.trim(),
      matkul: inMatkul.value,
      deadline: inDeadline.value,
      prioritas: inPrioritas.value,
      ket: inKet.value.trim(),
      done: false
    };
    tambahTugas(tBaru);
    setLoading(false);
    $("btnSave").disabled = false;
    form.reset();
    inPrioritas.value = "NORMAL";
    $("nameCount").textContent = "0/60";
    setTglDipilih(null);
    idBaru = tBaru.id;
    renderSemua();
    toast("TUGAS DITAMBAHKAN.");
  }, 800);
});

inNama.addEventListener("input", () => {
  $("nameCount").textContent = `${inNama.value.length}/60`;
  if (inNama.value.trim().length >= 3) {
    $("errName").textContent = "";
    inNama.classList.remove("invalid");
  }
});

inMatkul.addEventListener("change", () => {
  if (inMatkul.value) {
    $("errMatkul").textContent = "";
    inMatkul.classList.remove("invalid");
  }
});

inDeadline.addEventListener("change", () => {
  setTglDipilih(inDeadline.value || null);
  gambarKalender();
  validasi(true);
});

inPrioritas.addEventListener("change", () => toast("PRIORITAS: " + inPrioritas.value + "."));

selFilter.addEventListener("change", () => {
  filter = selFilter.value;
  render();
});
