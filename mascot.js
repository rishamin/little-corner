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
let mascotTimer;
let lastSound = -1;

if (mascotButton && mascotMessage) {
  mascotButton.addEventListener("click", () => {
    let i;
    do {
      i = Math.floor(Math.random() * kittenSounds.length);
    } while (i === lastSound);
    lastSound = i;

    mascotMessage.textContent = kittenSounds[i];
    mascotMessage.hidden = false;

    clearTimeout(mascotTimer);
    mascotTimer = setTimeout(() => {
      mascotMessage.hidden = true;
    }, 2500);
  });
}
