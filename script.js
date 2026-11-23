const messages = [
  "You don't have to earn gentleness, sweetheart. You deserve care on the easy days and the difficult ones, too.",
  "It's okay if all you can manage right now is getting comfortable. That is enough for this moment, little one.",
  "You are not in trouble for having feelings. We can make room for them together.",
  "You can take your time, darling. There is no timer running here.",
  "Being overwhelmed doesn't mean you're doing anything wrong. It means things feel like a lot, and we can slow down.",
  "I'm proud of you for making it here. You don't need to show me anything else."
];

const needMessages = {
  comfort: "Come here, sweetheart. Imagine a warm blanket around your shoulders and a little pause from everything demanding your attention. You don't need to explain why you need comfort. You can simply need it.",
  overwhelmed: "Let's make the world smaller for a moment. We only need to think about this room, this breath, and the next tiny thing. You don't have to solve the whole day right now. I'll stay with you while you settle.",
  tired: "Then rest, little one. If you can, get somewhere comfortable, loosen anything that feels annoying, and let your body be still for a bit. Nothing needs to be achieved before you're allowed to rest.",
  play: "A playful mood? I was hoping you'd say that. Pick a song, doodle a silly little creature, or find the softest thing nearby. We can have a tiny bit of fun without making it into a project."
};

const careMessage = document.querySelector("#care-message");
const needResponse = document.querySelector("#need-response");
const needResponseText = document.querySelector("#need-response-text");
let lastMessageIndex = 0;

document.querySelector("#new-message").addEventListener("click", () => {
  let nextIndex = Math.floor(Math.random() * messages.length);
  if (messages.length > 1 && nextIndex === lastMessageIndex) nextIndex = (nextIndex + 1) % messages.length;
  lastMessageIndex = nextIndex;
  careMessage.textContent = messages[nextIndex];
});

document.querySelectorAll(".need-card").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".need-card").forEach((card) => {
      card.classList.remove("selected");
      card.setAttribute("aria-pressed", "false");
    });
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    needResponseText.textContent = needMessages[button.dataset.need];
    needResponse.hidden = false;
  });
});

document.querySelector("#cozy-button").addEventListener("click", () => {
  document.querySelector("#welcome-response").textContent = "That's it. Get comfy, sweetheart. There's no rush. ♡";
  document.querySelector("#cozy-button").textContent = "All cozy ♡";
});
