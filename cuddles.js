/* 🩷 HOLD MY HAND */

const handButton = document.getElementById("hand-button");
const handText = document.getElementById("hand-text");

// Через сколько миллисекунд после нажатия что появляется
const handStages = [
  { after: 0,     text: "I'm here. I've got your hand.",                        warm: "" },
  { after: 2500,  text: "There you go, little one. Nice and slow.",              warm: "warm-1" },
  { after: 6000,  text: "Feel how warm that is? You're safe with me.",           warm: "warm-2" },
  { after: 10000, text: "You don't have to say anything. I'm not going anywhere. ♡", warm: "warm-3" }
];

const handIdleText = "Press and hold, little one.";

let handTimers = [];
let handBeat = null;
let handHolding = false;

function holdHand() {
  if (handHolding) return;
  handHolding = true;

  handButton.classList.add("holding");

  handStages.forEach((stage) => {
    handTimers.push(
      setTimeout(() => {
        handText.textContent = stage.text;
        handButton.classList.remove("warm-1", "warm-2", "warm-3");
        if (stage.warm) handButton.classList.add(stage.warm);
      }, stage.after)
    );
  });

  // Каждое «сердцебиение»: сердечко всплывает, телефон чуть вибрирует
  handBeat = setInterval(() => {
    if (typeof floatHeart === "function") {
      const box = handButton.getBoundingClientRect();
      floatHeart(box.left + box.width / 2 + (Math.random() * 80 - 40), box.top + 10);
    }

    if (navigator.vibrate) navigator.vibrate([40, 120, 40]);
  }, 1100);
}

function releaseHand() {
  if (!handHolding) return;
  handHolding = false;

  handTimers.forEach(clearTimeout);
  handTimers = [];
  clearInterval(handBeat);

  if (navigator.vibrate) navigator.vibrate(0);

  handButton.classList.remove("holding", "warm-1", "warm-2", "warm-3");
  handText.textContent = "Come back whenever you need a hand to hold ♡";
}

if (handButton && handText) {
  handButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    try {
      handButton.setPointerCapture(event.pointerId);
    } catch (error) {}

    holdHand();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach((name) => {
    handButton.addEventListener(name, releaseHand);
  });

  handButton.addEventListener("contextmenu", (event) => event.preventDefault());

  handButton.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      holdHand();
    }
  });

  handButton.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") releaseHand();
  });

  handButton.addEventListener("blur", releaseHand);
}

// Вызывается, когда выбрали другую карточку
function stopTenderness() {
  if (!handButton || !handText) return;
  releaseHand();
  handText.textContent = handIdleText;
}


/* 🐈 SLEEPING KITTEN */

const napButton = document.getElementById("kitten-nap");
const napKitten = document.getElementById("nap-kitten");
const napText = document.getElementById("nap-text");

const napWakeMessages = [
  "mew? Oh, hi. I'm right here ♡",
  "mrrp… I was only resting my eyes.",
  "prrr… you're not alone, little one.",
  "mew! I'll stay right next to you.",
  "*yawn* I'm here. I'm not going anywhere ♡"
];

const napIdleText = "Someone is napping right next to you. Shh…";
const napSleepText = "…zzz. Still here, just napping ♡";

let napIndex = 0;
let napTimer = null;

function napToSleep(message) {
  clearTimeout(napTimer);
  napButton.classList.remove("awake");
  napKitten.src = "assets/kitten-sleep.png";
  napText.textContent = message;
}

if (napButton && napKitten && napText) {
  napButton.addEventListener("click", () => {
    napButton.classList.add("awake");
    napKitten.src = "assets/kitten-awake.png";
    napText.textContent = napWakeMessages[napIndex];
    napIndex = (napIndex + 1) % napWakeMessages.length;

    if (typeof floatHeart === "function") {
      const box = napButton.getBoundingClientRect();
      floatHeart(box.left + box.width / 2, box.top + 20);
    }

    clearTimeout(napTimer);
    napTimer = setTimeout(() => napToSleep(napSleepText), 4000);
  });
}

// Вызывается, когда выбрали другую карточку
function stopCompany() {
  if (!napButton || !napKitten || !napText) return;
  napToSleep(napIdleText);
}
