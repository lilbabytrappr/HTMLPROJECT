// ---------------- STATE ----------------
let currentStage = 0;
let currentLine = 0;
let idleTimer;
let userName = "";

// ---------------- DIALOGUE ----------------
const stages = [
  {
    name: "friendly",
    lines: [
      "hi :)",
      "i’m so glad you’re here",
      "what’s your name?"
    ],
    delay: 3000
  },
  {
    name: "observing",
    lines: [
      "what's wrong?",
      "are you still there?"
    ],
    delay: 7000
  },
  {
    name: "attached",
    lines: [
      "come back",
      "You're making me sad",
    ],
    delay: 9000
  }
];

// ---------------- TITLE SCREEN ----------------
function showTitle() {
  document.getElementById("app").innerHTML = `
    <img src="Gallery/openinggif.gif">
    <button onclick="start()">Start</button>
  `;
}

// ---------------- START EXPERIENCE ----------------
function start() {
  currentStage = 0;
  currentLine = 0;
  userName = "";

  document.getElementById("app").innerHTML = `
    <img src="Gallery/yourgif.gif">

    <input id="input" placeholder="type something..." />
    <button onclick="respond()">enter</button>

    <div id="response"></div>

    <!-- FAKE PERMISSION POPUP -->
    <div id="fakePrompt" class="hidden">
      <p>Allow access to camera and microphone?</p>
      <button onclick="acceptAccess()">Allow</button>
      <button onclick="denyAccess()">Block</button>
    </div>
  `;

  const input = document.getElementById("input");

  // 🧠 Idle detection
  input.addEventListener("input", () => {
    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {
      showLine("you stopped typing");
      glitchOnce();
    }, 4000);
  });

  // ⏱️ Show fake permission popup
  setTimeout(() => {
    const prompt = document.getElementById("fakePrompt");
    if (prompt) prompt.classList.remove("hidden");
  }, 8000);

  // ▶️ Start dialogue
  nextLine();
}

// ---------------- DIALOGUE FLOW ----------------
function nextLine() {
  if (currentStage >= stages.length) return;

  const stage = stages[currentStage];
  const line = stage.lines[currentLine];

  showLine(line);

  currentLine++;

  if (currentLine >= stage.lines.length) {
    currentStage++;
    currentLine = 0;
  }

  if (currentStage < stages.length) {
    setTimeout(nextLine, stage.delay);
  }
}

// ---------------- USER INPUT ----------------
function respond() {
  const inputEl = document.getElementById("input");
  if (!inputEl) return;

  const value = inputEl.value.toLowerCase().trim();

  if (!value) return;

  // First input becomes their "name"
  if (!userName) {
    userName = value;
    showLine(`that’s a nice name, ${userName}`);
    inputEl.value = "";
    return;
  }

  if (value.includes("hello")) {
    showLine("you already said that");
    glitchOnce();
  } 
  else if (value.includes("help")) {
    showLine("no one is coming");
    glitchOnce();
  } 
  else if (value.includes("bye")) {
    showLine("you can’t leave yet");
    glitchOnce();
  }
  else {
    showLine("…");
  }

  inputEl.value = "";
}

// ---------------- DISPLAY ----------------
function showLine(text) {
  const el = document.getElementById("response");
  if (el) el.innerText = text;
}

// ---------------- GLITCH EFFECT ----------------
function glitchOnce() {
  const el = document.getElementById("response");
  const img = document.querySelector("img");

  if (!el || !img) return;

  el.classList.add("glitch");
  img.classList.add("glitch");

  setTimeout(() => {
    el.classList.remove("glitch");
    img.classList.remove("glitch");
  }, 300);
}

// ---------------- FAKE PERMISSION ----------------
function acceptAccess() {
  showLine("thank you");
  glitchOnce();

  setTimeout(() => {
    showLine("that’s better");
  }, 1500);

  hidePrompt();
}

function denyAccess() {
  showLine("that’s okay");

  setTimeout(() => {
    showLine("i can still see you");
    glitchOnce();
  }, 2000);

  hidePrompt();
}

function hidePrompt() {
  const prompt = document.getElementById("fakePrompt");
  if (prompt) prompt.classList.add("hidden");
}

// ---------------- INIT ----------------
showTitle();