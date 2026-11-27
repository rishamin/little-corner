
/* ========================================
   SENSORY CHECK-IN
   Little One's Haven
======================================== */


/* ----------------------------------------
   ELEMENTS
---------------------------------------- */

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultsScreen = document.getElementById("results-screen");

const modeButtons = document.querySelectorAll("[data-mode]");

const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");

const progressTrack = document.getElementById("progress-track");
const progressFill = document.getElementById("progress-fill");

const backButton = document.getElementById("back-button");
const skipButton = document.getElementById("skip-button");
const finishEarlyButton = document.getElementById("finish-early-button");

const resultsList = document.getElementById("results-list");
const moreButton = document.getElementById("more-button");
const moreResults = document.getElementById("more-results");

const breatheButton = document.getElementById("breathe-button");
const restartButton = document.getElementById("restart-button");

const breathingPanel = document.getElementById("breathing-panel");
const breathingCircle = document.getElementById("breathing-circle");
const breathingText = document.getElementById("breathing-text");
const stopBreathingButton = document.getElementById("stop-breathing-button");


/* ----------------------------------------
   STATE
---------------------------------------- */

let currentMode = null;
let answers = {};
let route = [];
let currentIndex = 0;

let breathingInterval = null;
let breathingStep = 0;


/* ----------------------------------------
   QUESTION DATA
---------------------------------------- */

const questions = [

  /* ======================================
     QUICK CHECK
  ====================================== */

  {
    id: "Q1",
    modes: ["quick", "slow"],
    text: "Is it too loud or noisy right now?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Find the quietest place you can reach. If possible, reduce the noise around you.",
        priority: 2
      },
      {
        label: "A little",
        value: "little",
        rec: "Try reducing the noise a little. Earplugs or headphones might help.",
        priority: 2
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Try spending a moment somewhere quieter and notice whether it helps.",
        priority: 2
      }
    ]
  },

  {
    id: "Q1a",
    modes: ["slow"],
    when: a => ["yes", "little"].includes(a.Q1),
    text: "Can you move somewhere quieter or turn the noise down?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Go to the quietest spot you can reach. Give your ears a little break.",
        priority: 2
      },
      {
        label: "Not really",
        value: "no"
      }
    ]
  },

  {
    id: "Q1b",
    modes: ["slow"],
    when: a => a.Q1a === "no",
    text: "Do you have headphones, earplugs, or something soft for your ears?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Put them on if they feel comfortable. You don't have to block out every sound.",
        priority: 2
      },
      {
        label: "No",
        value: "no",
        rec: "If comfortable, gently cover your ears with your hands or a soft sleeve. You can also move away from the loudest source.",
        priority: 2
      }
    ]
  },

  {
    id: "Q2",
    modes: ["quick", "slow"],
    text: "Is the light too bright or is there too much to look at?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Dim the lights, lower your screen brightness, or turn away from the busiest part of the room.",
        priority: 2
      },
      {
        label: "A little",
        value: "little",
        rec: "Give your eyes a little rest. Look somewhere calm or close your eyes for a moment.",
        priority: 2
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Try looking at something simple and still for a few seconds.",
        priority: 2
      }
    ]
  },

  {
    id: "Q2a",
    modes: ["slow"],
    when: a => ["yes", "little"].includes(a.Q2),
    text: "Can you dim the light or turn away from the screen?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Dim the light or lower your screen brightness. Give your eyes some space.",
        priority: 2
      },
      {
        label: "No",
        value: "no"
      }
    ]
  },

  {
    id: "Q2b",
    modes: ["slow"],
    when: a => a.Q2a === "no",
    text: "Do you have sunglasses, a hat, or a hood?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Put them on if they make the light easier to tolerate.",
        priority: 2
      },
      {
        label: "No",
        value: "no",
        rec: "Turn your gaze away from the brightest area. If comfortable, close your eyes for a few seconds.",
        priority: 2
      }
    ]
  },

  {
    id: "Q3",
    modes: ["quick"],
    text: "Are you feeling any pain or physical discomfort?",
    options: [
      {
        label: "No",
        value: "no"
      },
      {
        label: "A little",
        value: "little",
        rec: "Adjust your position and give the uncomfortable area some rest.",
        priority: 3
      },
      {
        label: "Quite a lot",
        value: "a_lot"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Notice whether anything feels tense, sore, uncomfortable, or unusual.",
        priority: 3
      }
    ]
  },

  {
    id: "Q3a",
    modes: ["quick"],
    when: a => a.Q3 === "a_lot",
    text: "Is the pain sudden, unusually severe, or accompanied by chest pain, trouble breathing, faintness, or confusion?",
    options: [
      {
        label: "Yes",
        value: "yes",
        safety: true,
        rec: "Please seek urgent medical help now. Contact your local emergency number or ask someone nearby to help."
      },
      {
        label: "No",
        value: "no",
        rec: "Rest and avoid pushing yourself. If the pain is new, persistent, or keeps returning, consider contacting a healthcare professional.",
        priority: 1
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "If you're unsure how serious it is, it's safer to ask someone for medical help.",
        priority: 1
      }
    ]
  },

  {
    id: "Q4",
    modes: ["quick"],
    text: "Have you had something to drink in the last 2 hours?",
    options: [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "No",
        value: "no",
        rec: "Have a few small sips of water or another drink you enjoy.",
        priority: 3
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "A few small sips might be a good place to start.",
        priority: 3
      }
    ]
  },


  /* ======================================
     SLOW CHECK: BODY AND ENVIRONMENT
  ====================================== */

  {
    id: "A3",
    modes: ["slow"],
    text: "Is something uncomfortable on your body? Clothes, tags, shoes, temperature, or touch?",
    options: [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Take a moment to notice your clothes, temperature, and physical surroundings.",
        priority: 3
      }
    ]
  },

  {
    id: "A3a",
    modes: ["slow"],
    when: a => a.A3 === "yes",
    text: "What feels uncomfortable?",
    options: [
      {
        label: "Scratchy or tight clothes",
        value: "clothes",
        rec: "Loosen it, change it, or put something soft between it and your skin.",
        priority: 2
      },
      {
        label: "Too hot",
        value: "hot",
        rec: "Remove a layer if possible, find some fresh air, or cool your wrists with water.",
        priority: 2
      },
      {
        label: "Too cold",
        value: "cold",
        rec: "Try a warm layer, a blanket, or a warm drink.",
        priority: 2
      },
      {
        label: "Uncomfortable touch or pressure",
        value: "touch",
        rec: "Move away from the source of discomfort. Give your body some space.",
        priority: 2
      },
      {
        label: "Something else",
        value: "other",
        rec: "Change one small thing you can reach. Just one.",
        priority: 2
      }
    ]
  },

  {
    id: "A4",
    modes: ["slow"],
    text: "Are there too many people, movements, or smells around you?",
    options: [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "A little",
        value: "little"
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Notice whether the space around you feels busy, crowded, or overwhelming.",
        priority: 2
      }
    ]
  },

  {
    id: "A4a",
    modes: ["slow"],
    when: a => ["yes", "little"].includes(a.A4),
    text: "What feels most overwhelming?",
    options: [
      {
        label: "Too many people",
        value: "people",
        rec: "Try finding a little more personal space. Even a few steps away can help.",
        priority: 2
      },
      {
        label: "Too much movement",
        value: "movement",
        rec: "Turn away from the busiest area. Find something still and simple to look at.",
        priority: 2
      },
      {
        label: "Strong or unpleasant smells",
        value: "smells",
        rec: "Move away from the source if possible. Fresh air or a familiar comfortable mask might help.",
        priority: 2
      },
      {
        label: "A combination of these",
        value: "combination",
        rec: "Step away from the busiest area if you can. Reduce just one source of stimulation first.",
        priority: 2
      }
    ]
  },

  {
    id: "A4b",
    modes: ["slow"],
    when: a => ["yes", "little"].includes(a.A4),
    text: "Can you step away for a few minutes?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Step into a quieter room, hallway, or another comfortable place.",
        priority: 2
      },
      {
        label: "No",
        value: "no"
      }
    ]
  },

  {
    id: "A4c",
    modes: ["slow"],
    when: a => a.A4b === "no",
    text: "Is there someone safe you can tell that you need a minute?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "You can simply say: I'm feeling overwhelmed. I need a little quiet.",
        priority: 2
      },
      {
        label: "No",
        value: "no",
        rec: "Look at something still and distant. Let yourself have a little space, even if you can't leave.",
        priority: 2
      }
    ]
  },


  /* ======================================
     SLOW CHECK: BODY NEEDS
  ====================================== */

{
  id: "B0",
  modes: ["slow"],
  text: "Have you had something to drink in the last 2 hours?",
  options: [
    {
      label: "Yes",
      value: "yes"
    },
    {
      label: "No",
      value: "no"
    },
    {
      label: "Not sure",
      value: "unsure"
    }
  ]
},

{
  id: "B0a",
  modes: ["slow"],
  when: a => ["no", "unsure"].includes(a.B0),
  text: "Do you have water or another drink with you?",
  options: [
    {
      label: "Yes",
      value: "yes",
      rec: "Have a few small sips of water or another drink you enjoy.",
      priority: 3
    },
    {
      label: "No",
      value: "no"
    }
  ]
},

{
  id: "B0b",
  modes: ["slow"],
  when: a => a.B0a === "no",
  text: "Can you get something to drink in the next few minutes?",
  options: [
    {
      label: "Yes",
      value: "yes",
      rec: "Get yourself a drink when you can. A few sips are enough to start.",
      priority: 3
    },
    {
      label: "No",
      value: "no",
      rec: "If possible, ask someone to bring you a drink.",
      priority: 3
    }
  ]
},

  {
    id: "B1",
    modes: ["slow"],
    text: "Have you eaten something in the last 5 hours?",
    options: [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure"
      }
    ]
  },

  {
    id: "B1a",
    modes: ["slow"],
    when: a => ["no", "unsure"].includes(a.B1),
    text: "Is there something familiar and easy to eat within reach?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Have something small and familiar. A few bites count.",
        priority: 3
      },
      {
        label: "No",
        value: "no"
      }
    ]
  },

  {
    id: "B1b",
    modes: ["slow"],
    when: a => a.B1a === "no",
    text: "Can someone bring you something, or is there a snack in your bag?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Ask someone or check your bag. Anything accessible and comfortable is okay.",
        priority: 3
      },
      {
        label: "No",
        value: "no",
        rec: "If possible, make a simple plan to get something to eat when you can.",
        priority: 3
      }
    ]
  },

  {
    id: "B2",
    modes: ["slow"],
    text: "Do you need the bathroom?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Take a bathroom break if you can. You deserve to be comfortable.",
        priority: 3
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Check in with your body. Would a bathroom break make you more comfortable?",
        priority: 3
      }
    ]
  },

  {
    id: "B3",
    modes: ["slow"],
    text: "How tired are you right now?",
    options: [
      {
        label: "Very tired",
        value: "very"
      },
      {
        label: "A little tired",
        value: "little",
        rec: "A short pause might help. You don't have to wait until you're exhausted.",
        priority: 3
      },
      {
        label: "Not really",
        value: "no"
      }
    ]
  },

  {
    id: "B3a",
    modes: ["slow"],
    when: a => a.B3 === "very",
    text: "Can you lie down or sit somewhere comfortable for 10 minutes?",
    options: [
      {
        label: "Yes",
        value: "yes",
        rec: "Do that first. The rest can wait for a little while.",
        priority: 3
      },
      {
        label: "No",
        value: "no",
        rec: "Rest your eyes for a moment, relax your shoulders, and let yourself pause where you are.",
        priority: 3
      }
    ]
  },

  {
    id: "B4",
    modes: ["slow"],
    text: "When did you last get a proper night's sleep?",
    options: [
      {
        label: "Last night",
        value: "last_night"
      },
      {
        label: "A couple of days ago",
        value: "days_ago",
        rec: "Your body may need some extra rest. Try to make room for recovery when possible.",
        priority: 3
      },
      {
        label: "I can't remember",
        value: "unknown",
        rec: "If you've been running on very little sleep, a quiet rest might be worth prioritizing.",
        priority: 3
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "If you've been running on very little sleep, a quiet rest might be worth prioritizing.",
        priority: 3
      }
    ]
  },

  {
    id: "B5",
    modes: ["slow"],
    text: "Do you feel pain or physical discomfort anywhere?",
    options: [
      {
        label: "No",
        value: "no"
      },
      {
        label: "A little",
        value: "little"
      },
      {
        label: "Quite a lot",
        value: "a_lot"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Notice whether anything feels sore, tense, or unusual.",
        priority: 3
      }
    ]
  },

  {
    id: "B5a",
    modes: ["slow"],
    when: a => a.B5 === "little",
    text: "Where does it hurt or feel uncomfortable?",
    options: [
      {
        label: "Head",
        value: "head",
        rec: "Try lowering the light and noise, resting your eyes, and drinking something if you need it.",
        priority: 3
      },
      {
        label: "Tummy",
        value: "tummy",
        rec: "Find a comfortable position. Gentle warmth may help if it feels pleasant.",
        priority: 3
      },
      {
        label: "Neck, shoulders, or back",
        value: "back",
        rec: "Let your shoulders relax. Try a gentle change of position or warmth if comfortable.",
        priority: 3
      },
      {
        label: "Somewhere else",
        value: "other",
        rec: "Change your position slowly and give that area some rest.",
        priority: 3
      }
    ]
  },

  {
    id: "B5b",
    modes: ["slow"],
    when: a => a.B5 === "a_lot",
    text: "Is the pain sudden, unusually severe, or accompanied by chest pain, trouble breathing, faintness, or confusion?",
    options: [
      {
        label: "Yes",
        value: "yes",
        safety: true,
        rec: "Please seek urgent medical help now. Contact your local emergency number or ask someone nearby to help."
      },
      {
        label: "No",
        value: "no",
        rec: "Rest and avoid pushing yourself. If the pain is new or keeps returning, consider contacting a healthcare professional.",
        priority: 1
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "If you're unsure how serious it is, ask someone for medical help.",
        priority: 1
      }
    ]
  },


  /* ======================================
     SLOW CHECK: EMOTIONAL NEEDS
  ====================================== */

  {
    id: "C1",
    modes: ["slow"],
    text: "Does it feel like too many things are asking for your attention?",
    options: [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "A little",
        value: "little"
      },
      {
        label: "No",
        value: "no"
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "Take a moment to notice what your attention keeps returning to.",
        priority: 4
      }
    ]
  },

  {
    id: "C1a",
    modes: ["slow"],
    when: a => ["yes", "little"].includes(a.C1),
    text: "Which one feels loudest right now?",
    options: [
      {
        label: "People",
        value: "people",
        rec: "Ask for a little time alone, if possible.",
        priority: 4
      },
      {
        label: "Messages and notifications",
        value: "messages",
        rec: "Try silent mode for a while. Not everything needs an immediate reply.",
        priority: 4
      },
      {
        label: "Tasks",
        value: "tasks",
        rec: "Write down what needs doing. Choose just one thing to focus on.",
        priority: 4
      },
      {
        label: "Thoughts in my head",
        value: "thoughts",
        rec: "Put your thoughts in the jar.",
        priority: 4,
        link: null
      },
      {
        label: "Everything at once",
        value: "everything",
        rec: "You don't need to sort it all out right now. Pick one thing you can temporarily put aside.",
        priority: 4
      }
    ]
  },

  {
    id: "C2",
    modes: ["slow"],
    text: "Right now, do you feel more…",
    options: [
      {
        label: "Wound up or anxious",
        value: "anxious",
        rec: "Try pushing your palms against a wall, shaking out your hands, or slowly breathing out.",
        priority: 4
      },
      {
        label: "Shut down or numb",
        value: "numb",
        rec: "Try something gentle for your senses: a familiar texture, a warm drink, or quiet music.",
        priority: 4
      },
      {
        label: "Teary or upset",
        value: "teary",
        rec: "It's okay to cry. You don't have to hold it in. A soft blanket or a comforting hug might help.",
        priority: 4
      },
      {
        label: "Just tired",
        value: "tired",
        rec: "Rest is a valid answer. You don't have to earn it.",
        priority: 4
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "You don't have to name what you're feeling. Just notice what might make this moment easier.",
        priority: 4
      }
    ]
  },

  {
    id: "C3",
    modes: ["slow"],
    text: "Would you rather be alone or have someone safe nearby?",
    options: [
      {
        label: "Alone",
        value: "alone",
        rec: "Give yourself some quiet space. You don't have to interact with anyone right now.",
        priority: 4
      },
      {
        label: "With someone",
        value: "company",
        rec: "You can tell them what would help: quiet, a hug, or just sitting nearby.",
        priority: 4
      },
      {
        label: "Not sure",
        value: "unsure",
        rec: "You don't have to decide immediately. You can take a little space and see how you feel.",
        priority: 4
      }
    ]
  },

  {
    id: "C4",
    modes: ["slow"],
    text: "Are you having thoughts of hurting yourself right now?",
    options: [
      {
        label: "No",
        value: "no"
      },
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "Not sure",
        value: "unsure"
      },
      {
        label: "Prefer not to answer",
        value: "skip"
      }
    ]
  },

  {
    id: "C4a",
    modes: ["slow"],
    when: a => ["yes", "unsure"].includes(a.C4),
    text: "Do you feel at risk of acting on these thoughts, or are you unsure you can keep yourself safe right now?",
    options: [
      {
        label: "Yes",
        value: "yes",
        safety: true,
        rec: "Your safety matters more than finishing this check-in. Please reach out to someone you trust and ask them to stay with you. Move away from anything you could use to hurt yourself. If you might act on these thoughts, contact your local emergency number or go to the nearest emergency department now."
      },
      {
        label: "No",
        value: "no",
        rec: "Thank you for telling me. You don't have to handle these thoughts alone. Consider reaching out to someone you trust or a mental health professional today.",
        priority: 1
      },
      {
        label: "Not sure",
        value: "unsure",
        safety: true,
        rec: "You don't have to figure this out alone. Please contact someone you trust and stay near them while you work out what you need."
      }
    ]
  }

];


/* ----------------------------------------
   BUILD THE ROUTE
---------------------------------------- */

function buildRoute() {
  return questions.filter(question => {
    if (!question.modes.includes(currentMode)) return false;

    if (question.when && !question.when(answers)) return false;

    return true;
  });
}


/* ----------------------------------------
   START CHECK-IN
---------------------------------------- */

function startCheck(mode) {
  currentMode = mode;
  answers = {};
  currentIndex = 0;

  route = buildRoute();

  startScreen.hidden = true;
  resultsScreen.hidden = true;
  questionScreen.hidden = false;

  renderQuestion();
}


/* ----------------------------------------
   RENDER QUESTION
---------------------------------------- */

function renderQuestion() {
  const question = route[currentIndex];

  if (!question) {
    showResults();
    return;
  }

  questionText.textContent = question.text;
  answerOptions.innerHTML = "";

  question.options.forEach(option => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-button";
    button.textContent = option.label;

    button.addEventListener("click", () => {
      selectAnswer(question.id, option.value);
    });

    answerOptions.appendChild(button);
  });

  const progress = Math.round(
    ((currentIndex + 1) / route.length) * 100
  );

  progressFill.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", progress);

  backButton.disabled = currentIndex === 0;
  backButton.style.visibility = currentIndex === 0 ? "hidden" : "visible";
}


/* ----------------------------------------
   SELECT ANSWER
---------------------------------------- */

function selectAnswer(questionId, value) {
  answers[questionId] = value;

  const previousQuestion = route[currentIndex];

  route = buildRoute();

  // Remove answers to questions that are no longer relevant.
  const validIds = route.map(question => question.id);

  Object.keys(answers).forEach(id => {
    if (!validIds.includes(id)) {
      delete answers[id];
    }
  });

  const newIndex = route.findIndex(
    question => question.id === previousQuestion.id
  );

  currentIndex = newIndex + 1;

  if (currentIndex >= route.length) {
    showResults();
  } else {
    renderQuestion();
  }
}


/* ----------------------------------------
   BACK BUTTON
---------------------------------------- */

function goBack() {
  if (currentIndex <= 0) return;

  currentIndex--;
  renderQuestion();
}


/* ----------------------------------------
   SKIP BUTTON
---------------------------------------- */

function skipQuestion() {
  const question = route[currentIndex];

  if (!question) return;

  delete answers[question.id];

  route = buildRoute();

  const newIndex = route.findIndex(
    item => item.id === question.id
  );

  currentIndex = newIndex + 1;

  if (currentIndex >= route.length) {
    showResults();
  } else {
    renderQuestion();
  }
}


/* ----------------------------------------
   RESULTS
---------------------------------------- */

function getRecommendations() {
  const recommendations = [];

  route.forEach(question => {
    const selectedValue = answers[question.id];

    if (!selectedValue) return;

    // Q2a уточняет Q2, поэтому в slow-режиме
    // используем рекомендацию Q2a вместо рекомендации Q2.
    if (
      currentMode === "slow" &&
      question.id === "Q2" &&
      answers.Q2a
    ) {
      return;
    }

    const option = question.options.find(
      item => item.value === selectedValue
    );

    if (!option || !option.rec) return;

    recommendations.push({
      text: option.rec,
      priority: option.priority ?? 4,
      safety: Boolean(option.safety)
    });
  });

  // Remove duplicate recommendations.
  const unique = recommendations.filter((item, index, self) =>
    index === self.findIndex(other => other.text === item.text)
  );

  return unique.sort((a, b) => a.priority - b.priority);
}


function createResultItem(item, index) {
  const container = document.createElement("div");
  container.className = "result-item";

  if (item.safety) {
    container.classList.add("safety-result");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "result-check";
  checkbox.setAttribute("aria-label", "Mark recommendation as completed");

  const text = document.createElement("span");
  text.className = "result-text";
  text.textContent = item.text;

  checkbox.addEventListener("change", () => {
    container.classList.toggle("completed", checkbox.checked);
  });

  container.appendChild(checkbox);
  container.appendChild(text);

  return container;
}



function showResults() {
  stopBreathing();

  questionScreen.hidden = true;
  startScreen.hidden = true;
  resultsScreen.hidden = false;

  resultsList.innerHTML = "";
  moreResults.innerHTML = "";

  const recommendations = getRecommendations();

  const safetyRecommendations = recommendations.filter(item => item.safety);
  const ordinaryRecommendations = recommendations.filter(item => !item.safety);

  if (safetyRecommendations.length > 0) {
    safetyRecommendations.forEach((item, index) => {
      resultsList.appendChild(createResultItem(item, index));
    });

    const safetyNote = document.createElement("p");
    safetyNote.className = "safety-note";
    safetyNote.textContent = "Please focus on your safety first. The other suggestions can wait.";

    resultsList.appendChild(safetyNote);

    ordinaryRecommendations.forEach((item, index) => {
      moreResults.appendChild(createResultItem(item, index));
    });

  } else if (recommendations.length === 0) {
    const image = document.createElement("img");
    image.src = "assets/good-job.png";
    image.alt = "A little celebration for taking care of yourself";
    image.className = "all-clear-image";

    const message = document.createElement("p");
    message.className = "all-clear-message";
    message.textContent = "Everything seems okay right now. Nothing specific needs your attention. ♡";

    resultsList.appendChild(image);
    resultsList.appendChild(message);

  } else {
    recommendations.slice(0, 4).forEach((item, index) => {
      resultsList.appendChild(createResultItem(item, index));
    });

    recommendations.slice(4).forEach((item, index) => {
      moreResults.appendChild(createResultItem(item, index));
    });
  }

  moreButton.hidden = moreResults.children.length === 0;
  moreResults.hidden = true;
  moreButton.textContent = "More small things";

  breathingPanel.hidden = true;
  progressFill.style.width = "100%";
}


/* ----------------------------------------
   MORE RECOMMENDATIONS
---------------------------------------- */

moreButton.addEventListener("click", () => {
  const isHidden = moreResults.hidden;

  moreResults.hidden = !isHidden;

  moreButton.textContent = isHidden
    ? "Show fewer things"
    : "More small things";
});


/* ----------------------------------------
   BREATHING TOOL
---------------------------------------- */

const breathingStages = [
  {
    text: "Breathe in gently…",
    duration: 4000
  },
  {
    text: "And slowly breathe out…",
    duration: 6000
  }
];

function runBreathingStep() {
  const stage = breathingStages[breathingStep];

  breathingText.textContent = stage.text;

  breathingCircle.style.animation = "none";
  breathingCircle.offsetHeight;

  breathingCircle.style.animation =
    breathingStep === 0
      ? "breathe-in 4s ease-in-out forwards"
      : "breathe-out 6s ease-in-out forwards";

  breathingInterval = setTimeout(() => {
    breathingStep = (breathingStep + 1) % breathingStages.length;
    runBreathingStep();
  }, stage.duration);
}


function startBreathing() {
  breathingPanel.hidden = false;
  breathingStep = 0;
  runBreathingStep();
}


function stopBreathing() {
  clearTimeout(breathingInterval);
  breathingInterval = null;

  breathingPanel.hidden = true;
  breathingCircle.style.animation = "none";
}


breatheButton.addEventListener("click", () => {
  if (breathingPanel.hidden) {
    startBreathing();
    breathingPanel.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else {
    stopBreathing();
  }
});

stopBreathingButton.addEventListener("click", stopBreathing);


/* ----------------------------------------
   FINISH EARLY
---------------------------------------- */

finishEarlyButton.addEventListener("click", showResults);


/* ----------------------------------------
   NAVIGATION
---------------------------------------- */

backButton.addEventListener("click", goBack);
skipButton.addEventListener("click", skipQuestion);


/* ----------------------------------------
   MODE BUTTONS
---------------------------------------- */

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    startCheck(button.dataset.mode);
  });
});


/* ----------------------------------------
   RESTART
---------------------------------------- */

function restartCheck() {
  stopBreathing();

  currentMode = null;
  answers = {};
  route = [];
  currentIndex = 0;

  progressFill.style.width = "0%";
  progressTrack.setAttribute("aria-valuenow", "0");

  resultsList.innerHTML = "";
  moreResults.innerHTML = "";
  moreResults.hidden = true;
  moreButton.hidden = true;

  questionScreen.hidden = true;
  resultsScreen.hidden = true;
  startScreen.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

restartButton.addEventListener("click", restartCheck);


/* ----------------------------------------
   INITIAL STATE
---------------------------------------- */

startScreen.hidden = false;
questionScreen.hidden = true;
resultsScreen.hidden = true;
breathingPanel.hidden = true;
moreResults.hidden = true;
moreButton.hidden = true;
