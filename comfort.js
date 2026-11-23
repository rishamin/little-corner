
const hugMessages = [
  "Come here, sweetheart. I'm wrapping you in the biggest, warmest hug. ♡",
  "There we go, little one. You can rest your head and relax.",
  "A soft squeeze, a gentle pat, and all the time you need.",
  "You're safe to slow down. I've got you, darling.",
  "Let's stay cuddled up for just a little while. No rush."
];

const kindMessages = [
  "You don't have to earn love by being useful.",
  "I'm proud of you for making it through today, sweetheart.",
  "You are allowed to need help. That's part of being human.",
  "A difficult moment doesn't make you a difficult person.",
  "You can start again tomorrow. Today can simply be enough.",
  "You deserve gentleness, even when things don't go according to plan.",
  "You don't need to explain why you're tired.",
  "I'm not disappointed in you, darling. Not even a little.",
  "You can be messy, uncertain, quiet, or sad. You're still worthy of care."
];

const groundingSteps = [
  "Find one thing around you that feels soft.",
  "Notice one colour you find pretty.",
  "Can you feel where your body is supported?",
  "Listen for one quiet sound nearby.",
  "Take a small, comfortable breath. No need to force it.",
  "Notice one thing that tells you you're here, right now."
];

const needs = {
  rest: "Then rest, sweetheart. The unfinished things can wait. You don't need to turn every quiet moment into a task. Get comfortable. I'll stay right here. ♡",

  overwhelmed: "Let's make the world a little smaller for now. You don't have to solve everything at once. One moment, one breath, one tiny thing at a time.",

  sad: "Oh, little one. You don't have to hide those feelings from me. It's okay to feel small and need tenderness. You're not doing anything wrong.",

  lonely: "I'm here with you, darling. You don't have to fill the silence or find the right words. We can just sit together for a little while."
};

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

document.getElementById("hug-button").addEventListener("click", () => {
  document.getElementById("hug-message").textContent =
    randomItem(hugMessages);
});

document.getElementById("message-button").addEventListener("click", () => {
  document.getElementById("kind-message").textContent =
    randomItem(kindMessages);
});

document.querySelectorAll(".need-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".need-card").forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    const need = card.dataset.need;
    const response = document.getElementById("need-response");

    document.getElementById("need-response-text").textContent =
      needs[need];

    response.hidden = false;
  });
});

let groundingIndex = 0;

document.getElementById("grounding-button").addEventListener("click", () => {
  groundingIndex = (groundingIndex + 1) % groundingSteps.length;

  document.getElementById("grounding-prompt").textContent =
    groundingSteps[groundingIndex];
});

document.getElementById("quiet-button").addEventListener("click", () => {
  const message = document.getElementById("quiet-message");

  message.hidden = !message.hidden;

  document.getElementById("quiet-button").textContent =
    message.hidden ? "Stay with me ♡" : "I'm staying ♡";
});
