// Shortcuts
const $ = (s) => document.querySelector(s);

// Elements
const gate = $("#gate"),
  surat = $("#surat"),
  letterText = $("#letterText"),
  dear = $("#dear");
const btnMulai = $("#btnMulai"),
  btnBukaKue = $("#btnBukaKue");
const countdown = $("#countdown"),
  countNumber = $("#countNumber");
const stage = $("#stage"),
  judul = $("#judul"),
  ucapan = $("#ucapan");
const bucin = $("#bucin"),
  loverName = $("#loverName"),
  yesBtn = $("#yesBtn"),
  noBtn = $("#noBtn");
const sticker = $("#sticker");

// Stickers (maskulin minimalis)
const stickers = [
  "https://cdn.jsdelivr.net/gh/mhyfritz/cdn-mini/stickers/bear-navy.png",
  "https://cdn.jsdelivr.net/gh/mhyfritz/cdn-mini/stickers/dino-navy.png",
];

// ===== Background stars =====
(function stars() {
  const c = document.getElementById("bg-stars");
  const ctx = c.getContext("2d");
  let w, h, parts;
  function resize() {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    parts = Array.from(
      { length: Math.min(150, ((w * h) / 26000) | 0) },
      () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        s: Math.random() * 0.6 + 0.2,
        a: Math.random() * 0.5 + 0.2,
      })
    );
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    parts.forEach((p) => {
      p.y += p.s;
      if (p.y > h) {
        p.y = -10;
        p.x = Math.random() * w;
      }
      ctx.globalAlpha = p.a;
      ctx.fillStyle = "#9fd0ff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  addEventListener("resize", resize);
  resize();
  tick();
})();

// ===== Fireworks (background) =====
(function fireworks() {
  const c = document.getElementById("fireworks");
  const g = c.getContext("2d");
  let W, H;
  function rs() {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
  }
  rs();
  addEventListener("resize", rs);
  let sparks = [];
  function burst() {
    const x = Math.random() * W * 0.8 + W * 0.1;
    const y = Math.random() * H * 0.3 + H * 0.1;
    const n = 24 + ((Math.random() * 20) | 0);
    for (let i = 0; i < n; i++) {
      const ang = (Math.PI * 2 * i) / n;
      sparks.push({
        x,
        y,
        vx: Math.cos(ang) * (1 + Math.random() * 2.6),
        vy: Math.sin(ang) * (1 + Math.random() * 2.6),
        life: 60 + Math.random() * 30,
        c: `hsl(${200 + Math.random() * 80}, 80%, 60%)`,
      });
    }
  }
  setInterval(burst, 2200);
  (function loop() {
    g.clearRect(0, 0, W, H);
    sparks.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.02;
      s.life--;
      g.globalAlpha = Math.max(0, s.life / 90);
      g.fillStyle = s.c;
      g.beginPath();
      g.arc(s.x, s.y, 2, 0, Math.PI * 2);
      g.fill();
    });
    sparks = sparks.filter((s) => s.life > 0);
    requestAnimationFrame(loop);
  })();
})();

// ===== Typewriter for letter =====
function typeWriter(el, text, speed = 22) {
  el.textContent = "";
  let i = 0;
  (function w() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(w, text[i - 1] === " " ? speed / 2 : speed);
    }
  })();
}

// ===== Flow =====
btnMulai.addEventListener("click", () => {
  const nama = $("#nama").value.trim();
  if (!nama) {
    alert("Masukkan nama dulu ya!");
    return;
  }
  gate.classList.add("hidden");
  surat.classList.remove("hidden");
  dear.textContent = `Untuk ${nama},`;
  const teksSurat = `Ada malam-malam yang lewat tanpa suara, tapi malam ini berbeda—langit seakan
turut merayakan keberadaanmu. Terima kasih sudah tumbuh setangguh ini,
setulus itu, dan sebijak yang kubanggakan.

Jika lelah datang, istirahatlah; biar aku jadi tempat yang kau pulangi.
Kalau ragumu berbisik, biar suaraku yang mengingatkan: kamu layak atas
segala hal baik yang kamu semogakan. Semoga langkahmu tenang, rezekimu lapang,
dan hatimu selalu ditinggali bahagia.`;
  typeWriter(letterText, teksSurat, 18);
});

$("#btnBukaKue").addEventListener("click", () => {
  surat.classList.add("hidden");
  countdown.classList.remove("hidden");
  let c = 3;
  countNumber.textContent = c;
  const t = setInterval(() => {
    c--;
    if (c > 0) {
      countNumber.textContent = c;
      countNumber.style.animation = "none";
      void countNumber.offsetWidth;
      countNumber.style.animation = "";
    } else {
      clearInterval(t);
      countdown.classList.add("hidden");
      showStage();
    }
  }, 1000);
});

function showStage() {
  stage.classList.remove("hidden");
  sticker.src = stickers[Math.floor(Math.random() * stickers.length)];
  const nama = $("#nama").value.trim();
  judul.textContent = `Selamat Ulang Tahun, ${nama}! 🎂`;

  ucapan.innerText = `Di antara riuhnya dunia yang sering lupa pelan, izinkan aku mengabadikanmu
dalam kalimat yang paling jujur: kehadiranmu membuat hidup terasa pulang.
Kau seperti kota yang lampunya tidak pernah padam—hangat, teduh, dan
selalu membuat rindu ingin kembali.

Semoga tahun ini menghadirkan keberanian untuk mengejar yang kamu yakini,
ketenangan untuk menerima yang belum sempat, dan rasa syukur untuk
segala yang sudah singgah. Semoga tubuhmu sehat, hatimu selamat,
dan langkahmu diarahkan menuju hal-hal yang memeluk jiwa.

Jika suatu hari dunia terasa berat, biarkan aku jadi bahumu;
jika hujan turun terlalu deras, biarkan aku jadi payung kecil yang setia.
Hari ini, nyala lilin di atas kue bukan hanya simbol selebrasi—
ia adalah janji bahwa harapan tidak akan padam, dan bahwa kamu
selalu pantas dicintai dengan cara yang sederhana, namun tak pernah
kurang dalam. Panjang umur, banyak rezeki, dan bahagia sampai lupa
caranya sedih.`;

  loverName.textContent = nama;
  setTimeout(() => bucin.classList.remove("hidden"), 1000);
}

// ===== "No" evasive button =====
let dodge = 0;
noBtn.addEventListener("mouseover", () => {
  dodge++;
  const r = 120,
    x = Math.random() * r - r / 2,
    y = Math.random() * r - r / 2;
  noBtn.style.transform = `translate(${x}px,${y}px)`;
  if (dodge > 2) noBtn.style.pointerEvents = "none";
});
noBtn.addEventListener("click", (e) => e.preventDefault());

// ===== YES + Confetti =====
yesBtn.addEventListener("click", () => {
  launchConfetti();
  setTimeout(() => {
    alert(
      "Yee! 💙 Aku juga mencintaimu selamanya.\nTerima kasih sudah lahir dan tumbuh sehebat ini."
    );
  }, 300);
});

// Simple confetti
function launchConfetti() {
  const c = document.getElementById("confettiCanvas"),
    ctx = c.getContext("2d");
  let W = (c.width = innerWidth),
    H = (c.height = innerHeight);
  const colors = ["#5ab0ff", "#a0d3ff", "#ffd166", "#06d6a0", "#ef476f"];
  let pcs = Array.from({ length: 180 }, () => ({
    x: Math.random() * W,
    y: -20 - Math.random() * H,
    w: 8 + Math.random() * 6,
    h: 10 + Math.random() * 10,
    c: colors[(Math.random() * colors.length) | 0],
    r: Math.random() * 360,
    s: 2 + Math.random() * 3,
    vr: -3 + Math.random() * 6,
  }));
  let run = true,
    start = performance.now();
  (function draw(t) {
    if (!run) return;
    ctx.clearRect(0, 0, W, H);
    pcs.forEach((p) => {
      p.y += p.s;
      p.r += p.vr;
      if (p.y > H + 30) {
        p.y = -20;
        p.x = Math.random() * W;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.r * Math.PI) / 180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (t - start < 4200) requestAnimationFrame(draw);
    else run = false;
  })(start);
  addEventListener(
    "resize",
    () => {
      W = c.width = innerWidth;
      H = c.height = innerHeight;
    },
    { once: true }
  );
}
