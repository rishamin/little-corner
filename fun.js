
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

function getAdoptedPlushies() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveAdoptedPlushies(plushies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plushies));
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
  const bubbleColors = [
    "rgba(255, 190, 220, 0.65)",
    "rgba(205, 190, 255, 0.65)",
    "rgba(180, 220, 255, 0.65)",
    "rgba(255, 220, 235, 0.7)",
    "rgba(210, 235, 255, 0.7)"
  ];

  function createBubble() {
    const bubble = document.createElement("button");

    bubble.type = "button";
    bubble.className = "floating-bubble";
    bubble.setAttribute("aria-label", "Pop bubble");

    const size = Math.floor(Math.random() * 42) + 24;
    const duration = Math.random() * 4 + 6;
    const left = Math.random() * 92 + 4;
    const drift = Math.floor(Math.random() * 90) - 45;
    const color = bubbleColors[
      Math.floor(Math.random() * bubbleColors.length)
    ];

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.setProperty("--bubble-duration", `${duration}s`);
    bubble.style.setProperty("--bubble-drift", `${drift}px`);
    bubble.style.setProperty("--bubble-tint", color);

    bubble.addEventListener("click", () => {
      if (bubble.classList.contains("popping")) return;

      bubble.classList.add("popping");

      setTimeout(() => {
        bubble.remove();
      }, 180);
    });

    bubble.addEventListener("animationend", (event) => {
      if (event.animationName === "bubble-float") {
        bubble.remove();
      }
    });

    bubblePlayground.appendChild(bubble);
  }

  // A little bunch of bubbles at the beginning
  for (let i = 0; i < 9; i++) {
    setTimeout(createBubble, i * 250);
  }

  // New bubbles keep appearing
  setInterval(() => {
    if (bubblePlayground.querySelectorAll(".floating-bubble").length < 18) {
      createBubble();
    }
  }, 700);
}
