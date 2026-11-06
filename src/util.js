// util.js — perkakas umum: pegangan DOM, format tanggal, toast, suara, animasi, dan pindah tab.

export const $ = (id) => document.getElementById(id);

// pegangan elemen yang dipakai lintas fitur
export const form = $("taskForm");
export const daftar = $("taskList");
export const inNama = $("inName");
export const inMatkul = $("inMatkul");
export const inDeadline = $("inDeadline");
export const inPrioritas = $("inPrioritas");
export const inKet = $("inDesc");
export const selFilter = $("filterStatus");

export const dua = (n) => String(n).padStart(2, "0");
export const keISO = (d) => `${d.getFullYear()}-${dua(d.getMonth() + 1)}-${dua(d.getDate())}`;
export const namaHari = (s) => HARI[new Date(s + "T00:00:00").getDay()] || "";

import { HARI } from "./state.js";

export function tglPendek(s) {
  return new Date(s + "T00:00:00")
    .toLocaleDateString("id-ID", { day: "numeric", month: "short" })
    .toUpperCase();
}

export function senin(ref) {
  const d = new Date(ref);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

export function jamKeAngka(jam) {
  const [h, m] = jam.split(".").map(Number);
  return h + m / 60;
}

let timerToast;
export function toast(pesan) {
  const t = $("toast");
  t.textContent = pesan;
  t.classList.add("show");
  clearTimeout(timerToast);
  timerToast = setTimeout(() => t.classList.remove("show"), 2200);
}

// ASET AUDIO: BUNYI SELESAI, GAGAL DIMUAT = DIAM
export function bunyi() {
  try {
    new Audio("assets/selesai.wav").play().catch(() => {});
  } catch (e) {}
}

// ANIMASI PUNYA FUNGSI, HANYA TRANSFORM/OPACITY, HORMATI REDUCED-MOTION
export const GERAK_MINIM = matchMedia("(prefers-reduced-motion: reduce)").matches;
export function animMasuk(el, geser = 10) {
  if (GERAK_MINIM || !el.animate) return;
  el.animate(
    [{ opacity: 0, transform: `translateY(${geser}px)` }, { opacity: 1, transform: "none" }],
    { duration: 250, easing: "ease-out" }
  );
}
export function animGoyang(el) {
  if (GERAK_MINIM || !el.animate) return;
  el.animate(
    [
      { transform: "none" },
      { transform: "translateX(-7px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-4px)" },
      { transform: "none" }
    ],
    { duration: 300, easing: "ease-out" }
  );
}

export function pindahTab(nama) {
  document.querySelectorAll(".view").forEach((v) => v.classList.add("hidden"));
  const tampil = $("view-" + nama);
  tampil.classList.remove("hidden");
  animMasuk(tampil);
  document.querySelectorAll(".rail button").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === nama);
  });
  window.scrollTo({ top: 0 });
}
