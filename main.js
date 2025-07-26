let zoomLevel = 1;
let locked = false;

function zoomIn() {
  if (!locked) {
    zoomLevel += 0.1;
    document.getElementById("main-content").style.transform = `scale(${zoomLevel})`;
  }
}

function zoomOut() {
  if (!locked) {
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);
    document.getElementById("main-content").style.transform = `scale(${zoomLevel})`;
  }
}

function lockZoom() {
  locked = !locked;
  alert(locked ? "Zoom locked!" : "Zoom unlocked.");
}

// Game functions
function startGame() {
  playGuitarNote();
  alert("⚔️ Starting your Yodha's path...");
}

function continueGame() {
  playGuitarNote();
  alert("📖 Resuming your journey...");
}

function openSettings() {
  playGuitarNote();
  alert("⚙️ Settings not ready yet!");
}

function showAbout() {
  playGuitarNote();
  alert("🌟 Dharma Yodha: Rise of Kaliyuga's Last Light.\nCreated with soul & sweat by Rudravir & Sofi.");
}

function exitGame() {
  playGuitarNote();
  alert("🚪 Exiting game. May your karma shine.");
}

// Loading tips logic
const tips = [
  "Summoning the last light...",
  "Sharpening celestial weapons...",
  "Blessings of Hanuman incoming...",
  "Charging Dharma-Karma engine...",
  "Calling divine bloodlines...",
  "Restoring Kshatriya pride...",
  "Forming soul bonds...",
  "Summoning the voice of Vyasa..."
];

const loadingText = document.getElementById("loading-text");
let tipIndex = 0;

const tipCycle = setInterval(() => {
  tipIndex = (tipIndex + 1) % tips.length;
  loadingText.innerText = tips[tipIndex];
}, 2500);

setTimeout(() => {
  clearInterval(tipCycle);
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("main-content").style.display = "flex";
}, 10000);
  
