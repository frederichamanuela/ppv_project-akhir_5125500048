// notes.js — satu-satunya pemilik fitur catatan: daftar di kiri, editor kanan, autosave, dan status tersimpannya.

import { $, dua, toast } from "./util.js";
import { catatan, tambahCatatan, hapusCatatan, simpanSemua } from "./state.js";

const judulNote = $("noteTitle");
const isiNote = $("noteBody");
let timerSimpan = null;
let catatanAktif = null;

function tandaiTersimpan() {
  const n = new Date();
  $("noteSaved").textContent = `✓ TERSIMPAN ${dua(n.getHours())}:${dua(n.getMinutes())}:${dua(n.getSeconds())}`;
}

const catatanSekarang = () => catatan.find((n) => n.id === catatanAktif);

$("noteAdd").addEventListener("click", () => {
  const baru = {
    id: Date.now(),
    title: "",
    body: "",
    ts: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" }).toUpperCase()
  };
  tambahCatatan(baru);
  simpanSemua();
  catatanAktif = baru.id;
  gambarNotes();
  judulNote.focus();
  toast("CATATAN BARU DIBUAT.");
});
function bikinKalauKosong() {
  if (catatanSekarang()) return;
  $("noteAdd").click();
}
$("noteEmpty").addEventListener("click", bikinKalauKosong);
$("noteEmpty").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    bikinKalauKosong();
  }
});

$("noteDel").addEventListener("click", () => {
  if (!catatanSekarang()) { toast("PILIH DULU CATATAN YANG MAU DIHAPUS."); return; }
  hapusCatatan(catatanAktif);
  simpanSemua();
  catatanAktif = catatan.length ? catatan[0].id : null;
  gambarNotes();
  toast("CATATAN DIHAPUS.");
});

$("noteDone").addEventListener("click", () => {
  const n = catatanSekarang();
  if (!n) { toast("BELUM ADA CATATAN DIPILIH."); return; }
  clearTimeout(timerSimpan);
  n.title = judulNote.value.trim();
  n.body = isiNote.value;
  simpanSemua();
  catatanAktif = null;
  $("noteSaved").textContent = "BELUM ADA PERUBAHAN.";
  gambarNotes();
  toast("CATATAN TERSIMPAN. SILAKAN BUAT BARU.");
});
function autosave() {
  $("noteSaved").textContent = "● MENGETIK…";
  clearTimeout(timerSimpan);
  timerSimpan = setTimeout(() => {
    const n = catatanSekarang();
    if (!n) return;
    n.title = judulNote.value.trim();
    n.body = isiNote.value;
    gambarDaftarNote();
    if (simpanSemua()) tandaiTersimpan();
    else $("noteSaved").textContent = "! BELUM TERSIMPAN PERMANEN.";
  }, 600);
}
judulNote.addEventListener("input", autosave);
isiNote.addEventListener("input", autosave);

function gambarDaftarNote() {
  const ul = $("noteList");
  ul.innerHTML = "";
  catatan.forEach((n) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.className = n.id === catatanAktif ? "active" : "";

    const judul = document.createElement("b");
    judul.textContent = n.title || "TANPA JUDUL";
    const sub = document.createElement("small");
    sub.textContent = n.ts + (n.body ? " - " + n.body.slice(0, 24) : "");
    b.appendChild(judul);
    b.appendChild(sub);

    b.addEventListener("click", () => {
      catatanAktif = n.id;
      gambarNotes();
    });
    li.appendChild(b);
    ul.appendChild(li);
  });
}

export function gambarNotes() {
  gambarDaftarNote();
  const n = catatanSekarang();
  $("noteEmpty").classList.toggle("hidden", !!n);
  $("noteFields").classList.toggle("hidden", !n);
  if (n) {
    judulNote.value = n.title;
    isiNote.value = n.body;
  }
}
