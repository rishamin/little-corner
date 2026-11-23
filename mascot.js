const kittenSounds = [
  "meow! ♡",
  "mrrr...",
  "mew?",
  "miaow!",
  "prrr prrr ♡",
  "mrrp!",
  "meow meow!",
  "purrrrr...",
  "mew! ♡",
  "mrrrow?"
];

const mascotButton = document.getElementById("mascot-button");
const mascotMessage = document.getElementById("mascot-message");
const purrSound = new Audio("assets/purr.mp3");
purrSound.volume = 0.6;

let mascotTimer;
let purrTimer;
let idleTimer;
let lastSound = -1;
let clickTimes = [];

/* ♡ Сердечки */
function floatHeart(x, y) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const heart = document.createElement("span");
  heart.textContent = "♡";
  heart.setAttribute("aria-hidden", "true");
  heart.style.cssText =
    "position:fixed;pointer-events:none;z-index:200;color:#d99ab5;" +
    "left:" + x + "px;top:" + y + "px;" +
    "font-size:" + (18 + Math.random() * 10) + "px;" +
    "transform:translate(-50%, 0);opacity:1;" +
    "transition:transform 1s ease-out, opacity 1s ease-out;";
  document.body.appendChild(heart);

  heart.getBoundingClientRect(); // даём браузеру «запомнить» старт

  const drift = Math.random() * 60 - 30;
  heart.style.transform = "translate(calc(-50% + " + drift + "px), -80px)";
  heart.style.opacity = "0";

  setTimeout(() => heart.remove(), 1000);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("#hug-button, #mascot-button");
  if (!target) return;

  let x = event.clientX;
  let y = event.clientY;

  // если нажали с клавиатуры, координат нет: берём середину кнопки
  if (!x && !y) {
    const box = target.getBoundingClientRect();
    x = box.left + box.width / 2;
    y = box.top + box.height / 2;
  }

  floatHeart(x, y);
});

/* 🐈 Котик */
if (mascotButton && mascotMessage) {

  function showMascotMessage(text) {
    mascotMessage.textContent = text;
    mascotMessage.hidden = false;
    clearTimeout(mascotTimer);
    mascotTimer = setTimeout(() => {
      mascotMessage.hidden = true;
    }, 2500);
  }

  function purr() {
    mascotButton.classList.add("purring");
    showMascotMessage("purrrrr... ♡");

    purrSound.currentTime = 0;
    purrSound.play().catch(() => {}); // если файла нет, просто тишина

    clearTimeout(purrTimer);
    purrTimer = setTimeout(() => {
      mascotButton.classList.remove("purring");
      purrSound.pause();
    }, 4000);
  }

  mascotButton.addEventListener("click", () => {
    if (mascotButton.classList.contains("purring")) return;

    // считаем клики за последние 3 секунды
    const now = Date.now();
    clickTimes = clickTimes.filter((t) => now - t < 3000);
    clickTimes.push(now);

    if (clickTimes.length >= 5) {
      clickTimes = [];
      purr();
      return;
    }

    // обычное «мяу», но не одно и то же подряд
    let i;
    do {
      i = Math.floor(Math.random() * kittenSounds.length);
    } while (i === lastSound);
    lastSound = i;

    showMascotMessage(kittenSounds[i]);
  });

  /* Если долго ничего не нажимали, котик сам скажет «mew?» */
  function startIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => showMascotMessage("mew?"), 45000);
  }

  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((name) => {
    window.addEventListener(name, startIdleTimer, { passive: true });
  });

  startIdleTimer();
}
