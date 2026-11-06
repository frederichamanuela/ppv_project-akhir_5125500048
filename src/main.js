import { $, form, inNama, dua, toast, pindahTab } from "./util.js";
import { HARI, BULAN } from "./state.js";
import { gambarNotes } from "./notes.js";
import { undoBoard } from "./board.js";
import { setLoading, renderSemua } from "./tugas.js";

// gambar/logo yang gagal dimuat langsung dibuang (pengganti atribut onerror inline)
document.addEventListener("error", (e) => {
  if (e.target.tagName === "IMG") e.target.remove();
}, true);

function updateJam() {
  const n = new Date();
  $("clockTime").textContent = dua(n.getHours()) + ":" + dua(n.getMinutes());
  $("clockDate").textContent = `${HARI[n.getDay()]}, ${n.getDate()} ${BULAN[n.getMonth()]} ${n.getFullYear()}`;
}
updateJam();
setInterval(updateJam, 1000);

document.querySelectorAll(".rail button").forEach((b) => {
  b.addEventListener("click", () => pindahTab(b.dataset.view));
});

const teksLoader = ["MEMUAT…", "MENYIAPKAN JADWAL…", "SELESAI…"];
let langkah = 0;

const loaderJalan = setInterval(() => {
  $("preFill").style.width = Math.min(100, (langkah + 1) * 38) + "%";
  $("preText").textContent = teksLoader[Math.min(langkah, teksLoader.length - 1)];
  langkah++;

  if (langkah >= 4) {
    clearInterval(loaderJalan);
    setTimeout(() => {
      $("preloader").classList.add("done");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        renderSemua();
      }, 600);
    }, 350);
  }
}, 450);

document.addEventListener("keydown", (e) => {
  // ctrl+z cuma buat undo board kalau lagi nggak ngetik
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    const a = document.activeElement;
    const lagiNgetik = a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable);
    if (!lagiNgetik) {
      e.preventDefault();
      undoBoard();
    }
    return;
  }

  if (e.key === "Escape") {
    form.reset();
    $("nameCount").textContent = "0/60";
    toast("FORM DIRESET.");
  }

  if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    pindahTab("tugas");
    setTimeout(() => inNama.focus(), 300);
  }
});

gambarNotes();
renderSemua();
