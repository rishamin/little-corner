const breatheCircle = document.getElementById("breathe-circle");
const breatheText = document.getElementById("breathe-text");
const breatheToggle = document.getElementById("breathe-toggle");

// Сколько длится каждая часть (в миллисекундах) и что пишется
const breatheSteps = [
  { phase: "in",   text: "breathe in…",  ms: 4000 },
  { phase: "hold", text: "hold…",         ms: 2000 },
  { phase: "out",  text: "breathe out…",  ms: 6000 }
];

// Сколько кругов дышим, прежде чем мягко закончить
const breatheRounds = 5;

let breatheTimer = null;
let breatheRunning = false;

function runBreathStep(stepIndex, round) {
  const step = breatheSteps[stepIndex];

  breatheCircle.className = "breathe-circle " + step.phase;
  breatheText.textContent = step.text;

  breatheTimer = setTimeout(() => {
    const nextIndex = stepIndex + 1;

    if (nextIndex < breatheSteps.length) {
      runBreathStep(nextIndex, round);
    } else if (round + 1 < breatheRounds) {
      runBreathStep(0, round + 1);
    } else {
      stopBreathing("That was lovely, sweetheart ♡");
    }
  }, step.ms);
}

function stopBreathing(message) {
  if (!breatheCircle || !breatheText || !breatheToggle) return;

  clearTimeout(breatheTimer);
  breatheRunning = false;

  breatheCircle.className = "breathe-circle";
  breatheText.textContent = message || "breathe with me ♡";
  breatheToggle.textContent = "Start breathing together";
}

if (breatheCircle && breatheText && breatheToggle) {
  breatheToggle.addEventListener("click", () => {
    if (breatheRunning) {
      stopBreathing();
      return;
    }

    breatheRunning = true;
    breatheToggle.textContent = "That's enough for now ♡";
    runBreathStep(0, 0);
  });
}
