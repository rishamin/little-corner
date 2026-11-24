
// PLUSHIE COLLECTION

const plushies = [
  {
    id: "cinnamoroll",
    name: "Cinnamoroll",
    species: "Little puppy in a kitten costume",
    image: "assets/cinnamonroll.png",
    birthday: "April 6",
    favoriteColor: "Baby blue",
    favoriteThing: "Being tucked in",

    personality: "The softest little daydreamer.",

    description:
      "Cinnamoroll is gentle, sleepy and a little shy. He loves warm cuddles, being carried around and sitting somewhere cozy where he can watch the world go by. He's very curious, but sometimes gets distracted by absolutely nothing.",

    quirks: [
      "Loves gentle head pats and being told he's a good boy.",
      "Gets sleepy after being hugged.",
      "His long puppy ears flop around when he's excited.",
      "Sometimes forgets he's wearing a kitten costume.",
      "Doesn't like being left alone in the dark.",
      "Makes tiny happy noises when he's especially cozy."
    ],

    loves:
      "Warm blankets, cloud watching, soft music, little naps and being told he's a good boy.",

    dislikes:
      "Loud noises, being rushed, cold rooms and unexpected tickles.",

    quote:
      "Mmm... can we stay cozy together for a little longer? ♡",

    shelfDescription:
      "A sleepy little puppy dressed as a kitten."
  }
];


// STORAGE

const STORAGE_KEY = "littleOnesHaven_plushies";

let memoryPlushies = [];

function getAdoptedPlushies() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    memoryPlushies = Array.isArray(saved) ? saved : [];
  } catch (error) {
    // браузер не даёт читать память: берём то, что запомнили на этой странице
  }
  return memoryPlushies;
}

function saveAdoptedPlushies(plushies) {
  memoryPlushies = plushies;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plushies));
  } catch (error) {
    // браузер не разрешает сохранять: игрушки останутся, пока страница открыта
  }
}

// ADOPTION ELEMENTS

const plushieDisplay = document.getElementById("plushie-display");
const meetButton = document.getElementById("meet-plushie-button");
const adoptButton = document.getElementById("adopt-plushie-button");
const plushieShelf = document.getElementById("plushie-shelf");
const emptyShelfMessage = document.getElementById("empty-shelf-message");

let currentPlushie = null;


// MEET A PLUSHIE


function meetPlushie() {
  const randomIndex = Math.floor(Math.random() * plushies.length);

  currentPlushie = plushies[randomIndex];

  const adopted = getAdoptedPlushies();
  const alreadyAdopted = adopted.some(
    plushie => plushie.id === currentPlushie.id
  );

  plushieDisplay.innerHTML = `
    <img
      src="${currentPlushie.image}"
      alt="${currentPlushie.name} plushie"
    >

    <h3>${currentPlushie.name}</h3>

    <p><strong>${currentPlushie.species}</strong></p>

    <div class="plushie-speech-bubble">
      ${currentPlushie.quote}
    </div>

    <div class="plushie-details">
      <p>${currentPlushie.personality}</p>

      <p>${currentPlushie.description}</p>

      <p><strong>Birthday:</strong> ${currentPlushie.birthday}</p>

      <p><strong>Favorite color:</strong> ${currentPlushie.favoriteColor}</p>

      <p><strong>Favorite thing:</strong> ${currentPlushie.favoriteThing}</p>

      <p><strong>Loves:</strong> ${currentPlushie.loves}</p>

      <p><strong>Doesn't like:</strong> ${currentPlushie.dislikes}</p>
    </div>
  `;

  adoptButton.hidden = false;

  if (alreadyAdopted) {
    adoptButton.textContent = "Already adopted ♡";
    adoptButton.disabled = true;
  } else {
    adoptButton.textContent = "Adopt ♡";
    adoptButton.disabled = false;
  }
}


// ADOPT A PLUSHIE

function adoptPlushie() {
  if (!currentPlushie) return;

  const adopted = getAdoptedPlushies();

  const alreadyAdopted = adopted.some(
    plushie => plushie.id === currentPlushie.id
  );

  if (alreadyAdopted) return;

  adopted.push(currentPlushie);

  saveAdoptedPlushies(adopted);

  renderPlushieShelf();

  adoptButton.textContent = "Adopted with love ♡";
  adoptButton.disabled = true;
}


// RENDER PLUSHIE SHELF

function renderPlushieShelf() {
  const adopted = getAdoptedPlushies();

  plushieShelf
    .querySelectorAll(".plushie-item")
    .forEach(item => item.remove());

  emptyShelfMessage.hidden = adopted.length > 0;

  adopted.forEach(plushie => {
    const item = document.createElement("div");

    item.className = "plushie-item";

    item.innerHTML = `
      <img
        src="${plushie.image}"
        alt="${plushie.name}"
      >

      <h3>${plushie.name}</h3>

      <p>${plushie.shelfDescription}</p>

      <p>♡ ${plushie.birthday}</p>
    `;

    plushieShelf.appendChild(item);
  });
}


// EVENT LISTENERS

if (meetButton && adoptButton && plushieDisplay && plushieShelf) {

  meetButton.addEventListener("click", meetPlushie);

  adoptButton.addEventListener("click", adoptPlushie);

  renderPlushieShelf();

}
// BUBBLE POP

const bubblePlayground = document.getElementById("bubble-playground");

if (bubblePlayground) {
  // Если на устройстве включено «уменьшить анимацию»
  const calmMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  // BUBBLE SOUND

  const soundToggle = document.getElementById("bubble-sound-toggle");
  const SOUND_KEY = "littleOnesHaven_bubbleSound";

  let bubbleSoundOn = true;
  let bubbleAudio = null;

  // Вспоминаем, как было в прошлый раз
  try {
    if (localStorage.getItem(SOUND_KEY) === "off") bubbleSoundOn = false;
  } catch (error) {}

  function updateSoundToggle() {
    if (!soundToggle) return;

    soundToggle.textContent = bubbleSoundOn
      ? "🔊 Pop sound: on"
      : "🔇 Pop sound: off";

    soundToggle.classList.toggle("is-off", !bubbleSoundOn);
  }

  // Тихий нежный «поп», который браузер делает сам
  function playBubblePop() {
    if (!bubbleSoundOn) return;

    try {
      bubbleAudio =
        bubbleAudio || new (window.AudioContext || window.webkitAudioContext)();

      if (bubbleAudio.state === "suspended") bubbleAudio.resume();

      const now = bubbleAudio.currentTime;
      const oscillator = bubbleAudio.createOscillator();
      const volume = bubbleAudio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(450 + Math.random() * 350, now);
      oscillator.frequency.exponentialRampToValueAtTime(120, now + 0.12);

      volume.gain.setValueAtTime(0.0001, now);
      volume.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
      volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      oscillator.connect(volume);
      volume.connect(bubbleAudio.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.16);
    } catch (error) {
      // если звук не получился, пузырьки всё равно работают
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      bubbleSoundOn = !bubbleSoundOn;

      try {
        localStorage.setItem(SOUND_KEY, bubbleSoundOn ? "on" : "off");
      } catch (error) {}

      updateSoundToggle();
      playBubblePop(); // маленький «поп» в знак того, что звук включён
    });

    updateSoundToggle();
  }
  const bubbleColors = [
    {
      tint: "rgba(255, 160, 205, 0.75)",
      border: "rgba(238, 125, 180, 0.85)",
      glow: "rgba(255, 150, 205, 0.3)"
    },
    {
      tint: "rgba(190, 165, 255, 0.75)",
      border: "rgba(160, 130, 235, 0.85)",
      glow: "rgba(190, 165, 255, 0.3)"
    },
    {
      tint: "rgba(150, 205, 255, 0.75)",
      border: "rgba(115, 175, 240, 0.85)",
      glow: "rgba(150, 205, 255, 0.3)"
    },
    {
      tint: "rgba(255, 185, 215, 0.8)",
      border: "rgba(240, 145, 190, 0.9)",
      glow: "rgba(255, 185, 215, 0.3)"
    },
    {
      tint: "rgba(165, 225, 235, 0.75)",
      border: "rgba(110, 190, 205, 0.85)",
      glow: "rgba(165, 225, 235, 0.3)"
    }
  ];

  function createBubble() {
    const area = bubblePlayground.getBoundingClientRect();

    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = "floating-bubble";
    bubble.setAttribute("aria-label", "Pop bubble");

    const size = Math.floor(Math.random() * 42) + 24;

    // Скорость: 12–18 секунд на путь (раньше было 8–13)
    const duration = Math.random() * 6 + 12;

    const width = area.width;
    const height = area.height;

    const edge = Math.floor(Math.random() * 4);

    let startX, startY, endX, endY;

    // LEFT: enters from the left and exits on the right
    if (edge === 0) {
      startX = 0;
      startY = Math.random() * (height - size);
      endX = width + size;
      endY = Math.random() * (height - size);
    }

    // RIGHT: enters from the right and exits on the left
    else if (edge === 1) {
      startX = width - size;
      startY = Math.random() * (height - size);
      endX = -size;
      endY = Math.random() * (height - size);
    }

    // TOP: enters from above and exits below
    else if (edge === 2) {
      startX = Math.random() * (width - size);
      startY = 0;
      endX = Math.random() * (width - size);
      endY = height + size;
    }

    // BOTTOM: enters from below and exits above
    else {
      startX = Math.random() * (width - size);
      startY = height - size;
      endX = Math.random() * (width - size);
      endY = -size;
    }

    const color = bubbleColors[
      Math.floor(Math.random() * bubbleColors.length)
    ];

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${startX}px`;
    bubble.style.top = `${startY}px`;

    // Без анимации пузырёк просто появляется в случайном месте
    if (calmMotion) {
      bubble.style.left = `${Math.random() * (width - size)}px`;
      bubble.style.top = `${Math.random() * (height - size)}px`;
    }

    bubble.style.setProperty("--bubble-duration", `${duration}s`);
    bubble.style.setProperty("--bubble-dx", `${endX - startX}px`);
    bubble.style.setProperty("--bubble-dy", `${endY - startY}px`);

    bubble.style.setProperty("--bubble-tint", color.tint);
    bubble.style.setProperty("--bubble-border", color.border);
    bubble.style.setProperty("--bubble-glow", color.glow);

    bubble.addEventListener("click", () => {
      if (bubble.classList.contains("popping")) return;

      // Запоминаем, где пузырёк находится прямо сейчас,
      // и переносим его стартовую точку туда
      const bubbleBox = bubble.getBoundingClientRect();
      const areaBox = bubblePlayground.getBoundingClientRect();

      const centerX =
        bubbleBox.left + bubbleBox.width / 2 -
        areaBox.left - bubblePlayground.clientLeft;
      const centerY =
        bubbleBox.top + bubbleBox.height / 2 -
        areaBox.top - bubblePlayground.clientTop;

      bubble.style.left = `${centerX - size / 2}px`;
      bubble.style.top = `${centerY - size / 2}px`;

      bubble.classList.add("popping");
      playBubblePop();

      // Убираем по таймеру, а не по animationend:
      // так работает, даже если анимации выключены
      setTimeout(() => bubble.remove(), 250);
    });

    // Если не лопнули, убираем, когда пузырёк долетел до конца
    setTimeout(() => bubble.remove(), duration * 1000);

    bubblePlayground.appendChild(bubble);
  }

  // Initial bubbles
  for (let i = 0; i < 9; i++) {
    setTimeout(createBubble, i * 300);
  }

  // Continuous bubble generation
  setInterval(() => {
    if (
      bubblePlayground.querySelectorAll(".floating-bubble").length < 18
    ) {
      createBubble();
    }
  }, 900);
}
