const slipButton = document.getElementById("slip-button");
const slipSign = document.getElementById("slip-sign");
const slipSeal = document.getElementById("slip-seal");
const tuckButton = document.getElementById("tuck-button");
const dimButton = document.getElementById("dim-button");
const restNote = document.getElementById("rest-note");


/* ✍️ Permission slip */

if (slipButton && slipSign && slipSeal) {
  slipButton.addEventListener("click", () => {
    slipSign.textContent = "Signed: your caregiver ♡";
    slipSign.classList.add("signed");
    slipSeal.classList.add("stamped");

    slipButton.textContent = "Signed ♡";
    slipButton.disabled = true;

    if (restNote) {
      restNote.textContent = "Official and approved. You're allowed to rest now, sweetheart.";
    }
  });
}


/* 🌙 Tuck me in: works while the button is held */

function setTucked(on) {
  document.body.classList.toggle("tucked", on);

  // котик шепчет
  const kittenWhisper = document.getElementById("mascot-message");

  if (kittenWhisper) {
    if (on) {
      kittenWhisper.textContent = "sleep tight ♡";
      kittenWhisper.hidden = false;
    } else {
      kittenWhisper.hidden = true;
    }
  }
}

if (tuckButton) {
  tuckButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    try {
      tuckButton.setPointerCapture(event.pointerId);
    } catch (error) {}

    setTucked(true);
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach((name) => {
    tuckButton.addEventListener(name, () => setTucked(false));
  });

  // чтобы долгое нажатие на телефоне не открывало меню
  tuckButton.addEventListener("contextmenu", (event) => event.preventDefault());

  // то же самое для клавиатуры: держишь пробел или Enter
  tuckButton.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setTucked(true);
    }
  });

  tuckButton.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") setTucked(false);
  });

  tuckButton.addEventListener("blur", () => setTucked(false));
}


/* 🕯 Dim the lights */

function setDim(on) {
  document.body.classList.toggle("dimmed", on);

  if (dimButton) {
    dimButton.textContent = on ? "☀️ Lights back on" : "🕯 Dim the lights";
  }
}

if (dimButton) {
  dimButton.addEventListener("click", () => {
    setDim(!document.body.classList.contains("dimmed"));
  });
}


/* Когда выбрали другую карточку: всё возвращаем как было */

function stopResting() {
  document.body.classList.remove("tucked");
  setDim(false);
}
