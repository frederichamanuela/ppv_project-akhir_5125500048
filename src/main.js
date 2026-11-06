import { $, form, daftar, inNama, inMatkul, inDeadline, inPrioritas, inKet, selFilter,
         dua, keISO, namaHari, tglPendek, senin, jamKeAngka,
         toast, bunyi, animMasuk, animGoyang, pindahTab } from "./util.js";
import { JADWAL, HARI, BULAN, URUT_HARI, BOBOT, hariIni, tugas, catatan,
         tambahTugas, hapusTugas, tambahCatatan, hapusCatatan,
         getTglDipilih, setTglDipilih, urutkan } from "./state.js";
import { gambarMinggu, gambarTimeline, gambarKalender, gambarPengingat } from "./beranda.js";
import { gambarNotes } from "./notes.js";

let filter = "semua";
let idBaru = null;

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

const board = $("board");
const wrap = $("drawWrap");
const layer = $("stickLayer");
const ctx = board.getContext("2d");

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, board.width, board.height);

let lagiGambar = false;
let alat = "hl";
let coretan = [];
let goresan = null; // goresan yang lagi digambar
const riwayat = [];
const WARNA_STICKY = ["", "blue", "paper"];

function catatRiwayat(aksi) {
  riwayat.push(aksi);
  if (riwayat.length > 30) riwayat.shift();
}

function gambarUlang() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, board.width, board.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  coretan.forEach((c) => {
    ctx.strokeStyle = c.style;
    ctx.lineWidth = c.width;
    ctx.beginPath();
    c.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
  });
}
function posCanvas(e) {
  const r = board.getBoundingClientRect();
  return [
    (e.clientX - r.left) * board.width / r.width,
    (e.clientY - r.top) * board.height / r.height
  ];
}

board.addEventListener("pointerdown", (e) => {
  if (alat !== "hl") return;
  lagiGambar = true;
  board.setPointerCapture(e.pointerId);
  goresan = { pts: [posCanvas(e)], style: "", width: 0 };
});

board.addEventListener("pointermove", (e) => {
  if (!lagiGambar || !goresan) return;
  goresan.pts.push(posCanvas(e));
  goresan.style = `rgba(${warnaHl},.55)`;
  goresan.width = 20;
  gambarUlang();
  ctx.strokeStyle = goresan.style;
  ctx.lineWidth = goresan.width;
  ctx.beginPath();
  goresan.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
});

["pointerup", "pointercancel", "pointerleave"].forEach((ev) => {
  board.addEventListener(ev, () => {
    if (lagiGambar && goresan && goresan.pts.length) {
      coretan.push(goresan);
      catatRiwayat({ k: "stroke" });
    }
    lagiGambar = false;
    goresan = null;
  });
});

let warnaHl = "58,78,251";
document.querySelectorAll(".swatches .sw").forEach((s) => {
  s.style.background = `rgb(${s.dataset.hl})`;
  s.addEventListener("click", () => {
    warnaHl = s.dataset.hl;
    alat = "hl";
    tandaiAlat();
    document.querySelectorAll(".swatches .sw").forEach((x) => x.classList.toggle("active", x === s));
  });
});
document.querySelectorAll("#fmtPop .sw").forEach((s) => {
  s.style.background = s.dataset.warna;
});

function tandaiAlat() {
  document.querySelectorAll(".draw-bar .chip[data-tool]").forEach((x) => {
    x.classList.toggle("active", x.dataset.tool === alat);
  });
}

document.querySelectorAll(".draw-bar .chip[data-tool]").forEach((c) => {
  c.addEventListener("click", () => {
    alat = c.dataset.tool;
    tandaiAlat();
    // sticky langsung ditempel, alat balik ke stabilo
    if (alat === "sticky") {
      tambahIde("sticky");
      alat = "hl";
      tandaiAlat();
      return;
    }
    toast("ALAT: " + c.textContent + ".");
  });
});

function persenPapan(e) {
  const r = wrap.getBoundingClientRect();
  return [
    ((e.clientX - r.left) / r.width * 100).toFixed(1),
    ((e.clientY - r.top) / r.height * 100).toFixed(1)
  ];
}

wrap.addEventListener("click", (e) => {
  if (alat !== "text") return;
  if (e.target.closest(".brain,.freetext")) return;
  if (!e.target.closest("canvas")) return;
  const [x, y] = persenPapan(e);
  tambahIde("text", x, y);
});

let geser = 0;

function tambahIde(jenis, x, y) {
  if (x === undefined) {
    geser = (geser + 1) % 6;
    x = 6 + geser * 5;
    y = 8 + geser * 7;
  }

  let el;

  if (jenis === "text") {
    el = document.createElement("div");
    el.className = "freetext";
    el.style.left = x + "%";
    el.style.top = y + "%";
    el.style.color = "#2D2654";
    el.contentEditable = "true";
    el.dataset.ph = "KETIKâ€¦";
    el.textContent = "";
    el.addEventListener("pointerdown", (ev) => dragKalauGeser(ev, el));
    el.focus();
  } else {
    el = document.createElement("div");
    el.className = "brain";
    el.style.left = x + "%";
    el.style.top = y + "%";

    const grab = document.createElement("div");
    grab.className = "grab";
    const tblWarna = document.createElement("button");
    tblWarna.className = "mini";
    tblWarna.textContent = "WARNA";
    tblWarna.title = "GANTI WARNA";
    const tblHapus = document.createElement("button");
    tblHapus.className = "mini del";
    tblHapus.textContent = "âœ•";
    tblHapus.title = "HAPUS";
    grab.appendChild(tblWarna);
    grab.appendChild(tblHapus);

    const isi = document.createElement("div");
    isi.className = "body";
    isi.contentEditable = "true";
    isi.dataset.ph = "TULIS IDEâ€¦";

    const sudut = document.createElement("div");
    sudut.className = "sh";
    sudut.title = "BESARKAN / KECILKAN";

    el.appendChild(grab);
    el.appendChild(isi);
    el.appendChild(sudut);

    let idx = 0;
    tblWarna.addEventListener("click", (ev) => {
      ev.stopPropagation();
      idx = (idx + 1) % 3;
      el.classList.remove("blue", "paper");
      if (WARNA_STICKY[idx]) el.classList.add(WARNA_STICKY[idx]);
    });

    tblHapus.addEventListener("click", (ev) => {
      ev.stopPropagation();
      catatRiwayat({ k: "del", el, next: el.nextSibling });
      el.remove();
      toast("STICKY DICOPOT.");
    });
    sudut.addEventListener("pointerdown", (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      const wr = wrap.getBoundingClientRect();
      const startX = ev.clientX;
      const lebarAwal = el.getBoundingClientRect().width / wr.width * 100;
      const fontAwal = parseFloat(getComputedStyle(el).fontSize);
      const dari = { w: lebarAwal, fs: fontAwal };

      const gerak = (mv) => {
        const lebar = Math.min(95, Math.max(12, lebarAwal + (mv.clientX - startX) / wr.width * 100));
        el.style.width = lebar + "%";
        el.style.fontSize = Math.min(30, Math.max(11, fontAwal * lebar / lebarAwal)) + "px";
      };
      const lepas = () => {
        document.removeEventListener("pointermove", gerak);
        document.removeEventListener("pointerup", lepas);
        catatRiwayat({
          k: "scale",
          el,
          from: dari,
          to: { w: parseFloat(el.style.width), fs: parseFloat(el.style.fontSize) }
        });
      };
      document.addEventListener("pointermove", gerak);
      document.addEventListener("pointerup", lepas);
    });

    el.addEventListener("pointerdown", (ev) => {
      if (ev.target.closest("button") || ev.target.closest(".body") || ev.target.closest(".sh")) return;
      dragLangsung(ev, el);
    });

    isi.focus();
  }

  layer.appendChild(el);
  catatRiwayat({ k: "add", el });
  toast(jenis === "text" ? "TEKS DIBUAT. KETIK, TARIK BUAT PINDAH." : "STICKY DITEMPEL. GESER LEWAT BAR ATASNYA.");
}
function dragLangsung(e, el) {
  e.preventDefault();
  const wr = wrap.getBoundingClientRect();
  const sx = e.clientX, sy = e.clientY;
  const dari = { l: parseFloat(el.style.left), t: parseFloat(el.style.top) };

  const gerak = (ev) => {
    el.style.left = Math.min(92, Math.max(0, dari.l + (ev.clientX - sx) / wr.width * 100)) + "%";
    el.style.top = Math.min(94, Math.max(0, dari.t + (ev.clientY - sy) / wr.height * 100)) + "%";
  };
  const lepas = () => {
    document.removeEventListener("pointermove", gerak);
    document.removeEventListener("pointerup", lepas);
    catatRiwayat({ k: "move", el, from: dari, to: { l: parseFloat(el.style.left), t: parseFloat(el.style.top) } });
  };
  document.addEventListener("pointermove", gerak);
  document.addEventListener("pointerup", lepas);
}

function dragKalauGeser(e, el) {
  const sx = e.clientX, sy = e.clientY;
  let jalan = false;
  const dari = { l: parseFloat(el.style.left), t: parseFloat(el.style.top) };

  const gerak = (ev) => {
    if (!jalan && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
    jalan = true;
    ev.preventDefault();
    const wr = wrap.getBoundingClientRect();
    el.style.left = Math.min(92, Math.max(0, dari.l + (ev.clientX - sx) / wr.width * 100)) + "%";
    el.style.top = Math.min(94, Math.max(0, dari.t + (ev.clientY - sy) / wr.height * 100)) + "%";
  };
  const lepas = () => {
    document.removeEventListener("pointermove", gerak);
    document.removeEventListener("pointerup", lepas);
    if (jalan) {
      catatRiwayat({ k: "move", el, from: dari, to: { l: parseFloat(el.style.left), t: parseFloat(el.style.top) } });
    }
  };
  document.addEventListener("pointermove", gerak);
  document.addEventListener("pointerup", lepas);
}

function undoBoard() {
  const a = riwayat.pop();
  if (!a) { toast("NGGAK ADA YANG BISA DIBATALKAN."); return; }

  if (a.k === "stroke") {
    coretan.pop();
    gambarUlang();
  } else if (a.k === "add") {
    a.el.remove();
  } else if (a.k === "del") {
    layer.insertBefore(a.el, a.next);
  } else if (a.k === "move") {
    a.el.style.left = a.from.l + "%";
    a.el.style.top = a.from.t + "%";
  } else if (a.k === "scale") {
    a.el.style.width = a.from.w + "%";
    a.el.style.fontSize = a.from.fs + "px";
  } else if (a.k === "clear") {
    coretan = a.strokes;
    gambarUlang();
    a.nodes.forEach((n) => layer.appendChild(n));
  }
  toast("DIBATALKAN.");
}

$("boardClear").addEventListener("click", () => {
  if (!confirm("HAPUS SEMUA GAMBAR + STICKY DI PAPAN?")) return;
  catatRiwayat({ k: "clear", strokes: coretan, nodes: [...layer.children] });
  coretan = [];
  gambarUlang();
  layer.innerHTML = "";
  toast("PAPAN DIBERSIHKAN.");
});

let terakhirDiedit = null;
wrap.addEventListener("focusin", (e) => {
  if (e.target.contentEditable === "true") terakhirDiedit = e.target;
});

function targetFormat() {
  const a = document.activeElement;
  if (a && a.contentEditable === "true" && wrap.contains(a)) return a;
  return terakhirDiedit && wrap.contains(terakhirDiedit) ? terakhirDiedit : null;
}

const FONT = {
  inter: "Inter,sans-serif",
  arial: "Arial,sans-serif",
  georgia: "Georgia,serif",
  times: "'Times New Roman',serif",
  courier: "'Courier New',monospace",
  verdana: "Verdana,sans-serif",
  trebuchet: "'Trebuchet MS',sans-serif"
};

$("fmtFont").addEventListener("change", () => {
  const t = targetFormat();
  const v = $("fmtFont").value;
  if (!t || !v) return;
  t.style.fontFamily = FONT[v];
  toast("FONT DIGANTI.");
});

function tutupPop() {
  $("fmtPop").classList.add("hidden");
  $("fmtWarnaBtn").setAttribute("aria-expanded", "false");
}
$("fmtWarnaBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  const buka = $("fmtPop").classList.contains("hidden");
  tutupPop();
  if (buka) {
    $("fmtPop").classList.remove("hidden");
    $("fmtWarnaBtn").setAttribute("aria-expanded", "true");
  }
});
document.addEventListener("pointerdown", (e) => {
  if (!$("fmtPop").classList.contains("hidden") && !e.target.closest(".pop")) tutupPop();
});
document.querySelectorAll("#fmtPop .sw").forEach((s) => {
  s.addEventListener("click", () => {
    const t = targetFormat();
    if (!t) { toast("KLIK DULU TEKS DI PAPAN."); return; }
    t.style.color = s.dataset.warna;
    tutupPop();
    toast("WARNA TEKS DIGANTI.");
  });
});
$("fmtCustom").addEventListener("input", () => {
  const t = targetFormat();
  if (!t) { toast("KLIK DULU TEKS DI PAPAN."); return; }
  t.style.color = $("fmtCustom").value;
});

function ubahUkuran(selisih) {
  const t = targetFormat();
  if (!t) { toast("KLIK DULU TEKS DI PAPAN."); return; }
  const skrg = parseFloat(getComputedStyle(t).fontSize);
  t.style.fontSize = Math.min(40, Math.max(10, skrg + selisih)) + "px";
  toast("UKURAN HURUF DIGANTI.");
}
$("fmtInc").addEventListener("click", () => ubahUkuran(2));
$("fmtDec").addEventListener("click", () => ubahUkuran(-2));

// B / I / U: kalau udah aktif dimatiin, kalau belum dinyalain
function tekan(id, nyala) {
  $(id).setAttribute("aria-pressed", nyala ? "true" : "false");
}
function segarkanFmt() {
  const t = targetFormat();
  tekan("fmtB", !!t && t.style.fontWeight === "800");
  tekan("fmtI", !!t && t.style.fontStyle === "italic");
  tekan("fmtU", !!t && t.style.textDecoration === "underline");
}
wrap.addEventListener("focusin", () => setTimeout(segarkanFmt, 0));
function toggleGaya(nama, prop, nyala, mati) {
  const t = targetFormat();
  if (!t) { toast("KLIK DULU TEKS DI PAPAN."); return; }
  t.style[prop] = t.style[prop] === nyala ? mati : nyala;
  segarkanFmt();
  toast(nama + " DIGANTI.");
}
$("fmtB").addEventListener("click", () => toggleGaya("BOLD", "fontWeight", "800", "400"));
$("fmtI").addEventListener("click", () => toggleGaya("ITALIC", "fontStyle", "italic", "normal"));
$("fmtU").addEventListener("click", () => toggleGaya("UNDERLINE", "textDecoration", "underline", "none"));


const teksLoader = ["MEMUATâ€¦", "MENYIAPKAN JADWALâ€¦", "SELESAIâ€¦"];
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

function validasi(tampilkan = true) {
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

function setLoading(nyala) {
  $("loading").classList.toggle("hidden", !nyala);
  if (nyala) {
    $("empty").classList.add("hidden");
    daftar.innerHTML = "";
  }
}


function renderSemua() {
  gambarMinggu();
  gambarTimeline();
  gambarKalender();
  gambarPengingat();
  render();
}

function render() {
  const tampil = urutkan(tugas.filter((t) => {
    if (filter === "semua") return true;
    return filter === "selesai" ? t.done : !t.done;
  }));

  daftar.innerHTML = "";
  $("empty").classList.toggle("hidden", tugas.length > 0);

  if (tugas.length) {
    if (!tampil.length) {
      daftar.innerHTML = `<li class="task"><div class="t-main"><div class="t-name">TIDAK ADA DI FILTER INI.</div><div class="t-meta">GANTI FILTER KE SEMUA.</div></div></li>`;
    }

    tampil.forEach((t) => {
      const li = document.createElement("li");
      li.className = "task" + (t.done ? " done" : "");
      const telat = !t.done && new Date(t.deadline + "T00:00:00") < hariIni;
      if (t.id === idBaru) {
        idBaru = null;
        animMasuk(li, 12);
      }
      const kelasPrioritas = t.prioritas.replace(/\s/g, "");

      li.innerHTML = `<input type="checkbox" class="t-check" ${t.done ? "checked" : ""} title="SELESAI?" />
        <div class="t-main"><div class="t-name"></div>
        <div class="t-meta"><span class="badge">${t.matkul}</span><span class="badge ${kelasPrioritas}">${t.prioritas}</span><span class="badge ${telat ? "overdue" : ""}">${tglPendek(t.deadline)}${telat ? " - TERLEWAT" : ""}</span></div></div>
        <div class="t-actions"><button class="btn-del" title="HAPUS">âœ•</button></div>`;


      li.querySelector(".t-name").textContent = t.nama.toUpperCase();
      // KOMPATIBEL MUNDUR: tugas lama tanpa ket tetap kebaca
      if ((t.ket || "").trim()) {
        const dd = document.createElement("div");
        dd.className = "t-desc";
        dd.textContent = t.ket;
        li.querySelector(".t-main").insertBefore(dd, li.querySelector(".t-meta"));
      }

      li.querySelector(".t-check").addEventListener("click", () => {
        t.done = !t.done;
        if (t.done) bunyi();
        toast(t.done ? "TUGAS SELESAI." : "TUGAS DIAKTIFKAN KEMBALI.");
        renderSemua();
      });

      li.querySelector(".btn-del").addEventListener("click", () => {
        hapusTugas(t.id);        toast("TUGAS DIHAPUS.");
        renderSemua();
      });

      li.addEventListener("mouseover", () => li.classList.add("hovered"));
      li.addEventListener("mouseout", () => li.classList.remove("hovered"));

      daftar.appendChild(li);
    });
  }

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
