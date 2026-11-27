
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // LITTLE MODE
  // ========================================

  const littleModeToggle = document.getElementById("little-mode-toggle");
  const toggleLabel = littleModeToggle?.querySelector(".toggle-label");

  if (littleModeToggle) {
    littleModeToggle.addEventListener("click", () => {
      const isActive = document.body.classList.toggle("little-mode");

      littleModeToggle.setAttribute("aria-pressed", String(isActive));

      if (toggleLabel) {
        toggleLabel.textContent = isActive ? "Turn off" : "Turn on";
      }
    });
  }

/* Footer alternatives text */

.alternatives-little {
  display: none;
}

body.little-mode .alternatives-normal {
  display: none;
}

body.little-mode .alternatives-little {
  display: inline;
}


  // ========================================
  // KITTEN COMPANION
  // ========================================

  const kittenMessage = document.getElementById("kitten-message");
  const kittenButton = document.getElementById("kitten-interaction");

  const kittenMessages = [
    "I'm here with you. We can take our time.",
    "You're doing just fine, little one.",
    "Maybe we could get cosy for a bit?",
    "No rush. We can stay here together.",
    "You deserve a little gentleness.",
    "One tiny step is enough.",
    "It's okay to take a break."
  ];

  let kittenMessageIndex = 0;

  if (kittenButton && kittenMessage) {
    kittenButton.addEventListener("click", () => {
      kittenMessageIndex = (kittenMessageIndex + 1) % kittenMessages.length;

      kittenMessage.textContent = kittenMessages[kittenMessageIndex];

      kittenButton.textContent = "Give the kitten another pat";
    });
  }


  // ========================================
  // CARD INTERACTIONS
  // ========================================

  const cards = document.querySelectorAll(".flashback-card");

  const cardMessages = {
    1: "It's a memory, little one. You're here now.",
    2: "Look around. Notice where you are.",
    3: "You are allowed to have boundaries.",
    4: "Be gentle with yourself, sweetheart.",
    5: "Big feelings can become smaller.",
    6: "Grown-up you is here, too.",
    7: "Maybe it's time for a little rest.",
    8: "You deserve kindness.",
    9: "It's okay to let the tears come.",
    10: "You don't have to be alone.",
    11: "It's okay to need a quieter place.",
    12: "Your needs matter.",
    13: "Little by little is still progress."
  };

  cards.forEach((card) => {
    card.addEventListener("toggle", () => {

      if (!card.open || !kittenMessage) return;

      const step = card.dataset.step;
      const message = cardMessages[step];

      if (message) {
        kittenMessage.textContent = message;
      }
    });
  });


  // ========================================
  // FOOTER CARD
  // ========================================

  const alternativesCard = document.querySelector(".gentle-alternatives");

  if (alternativesCard && kittenMessage) {
    alternativesCard.addEventListener("toggle", () => {
      if (alternativesCard.open) {
        kittenMessage.textContent =
          "Let's be gentle with your body. You deserve care.";
      }
    });
  }

});
