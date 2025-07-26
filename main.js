// ========== ORIENTATION LOCK ==========
function checkOrientation() {
  let landscape = window.innerWidth > window.innerHeight;
  document.getElementById('orientation-lock').style.display = landscape ? 'none' : 'flex';
}
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
checkOrientation();

// ========== PREVENT RELOAD (NO OVERLAY!) ==========
window.addEventListener('touchmove', e => {
  if (e.touches && e.touches.length === 1 && e.touches[0].clientY < 70) {
    e.preventDefault();
  }
}, { passive: false });

// ========== STATE MANAGEMENT ==========
const STATE_KEY = "dharmayodha_state_v2";
function saveState(page) { localStorage.setItem(STATE_KEY, page); }
function loadState() { return localStorage.getItem(STATE_KEY) || "loading"; }

// ========== LOADING ANIMATIONS AND RANDOMIZATION ==========
const loadingPhrases = [
  "Summoning magic...",
  "Conjuring game world...",
  "Forging legendary weapons...",
  "Binding sacred spirits...",
  "Enchanting animations...",
  "Sharpening your skills...",
  "Preparing epic quests...",
  "Summoning new adventures...",
  "Enlisting pixel warriors...",
  "Gathering secret runes...",
  "Tuning the ancient piano...",
  "Brewing elixirs for luck...",
  "Consulting the wise sages...",
  "Rolling for critical hits...",
  "Coding with cosmic energy...",
  "Blessing your journey...",
  "Charging up mythic power...",
  "Syncing with the astral net...",
  "Scouting for hidden treasures...",
  "Heroes assembling at the gate...",
  "Mystic fog clearing...",
  "Unlocking secret combos...",
  "Animating pixels of destiny...",
  "Loading dazzling effects...",
  "Enabling offline adventure...",
  "Balancing the karma meter...",
  "Reading the ancient scrolls...",
  "Checking your internet fate...",
  "Configuring cosmic servers...",
  "Double-checking your luck...",
  "Testing anti-cheat magic...",
  "Amplifying fun by x10...",
  "Loading next-gen graphics...",
  "Summoning next-level vibes...",
  "Randomizing random randomness...",
  "Polishing every single pixel...",
  "Doing yoga with the code monks...",
  "Blessing your session...",
  "Spawning more surprises...",
  "Optimizing for potato devices...",
  "Spawning more piano notes...",
  "Giving you a head start...",
  "Making it 10x cooler than Free Fire...",
  "Loading... but fancier than ever...",
  "Waving at the dev gods...",
  "Preparing for legendary moments!",
  "Game world almost ready!",
  "Adventure Awaits!",
  "Unleashing creativity...",
  "Rendering ultra effects...",
  "Unlocking new secrets...",
  "You look awesome today!",
  "Get ready for a legendary run!",
  "Tip: Touch any menu button for a piano note!",
  "Bonus: Try playing with one finger only...",
  "Pro move: Try two-finger tap for secret fun (maybe?)",
  "Pixel spirits align in your favor!",
  "Your device is now 10x cooler!"
];
let lastPhrases = [];

// ========== ANIMATED RANDOM ORBS ==========
function spawnOrbs() {
  const orbs = document.querySelector('.fantasy-orbs');
  orbs.innerHTML = "";
  const colors = ["#ffe066", "#ffb300", "#f773bc", "#17e2ff", "#ffe066", "#ffb300"];
  for (let i = 0; i < 7; i++) {
    let orb = document.createElement('div');
    orb.className = 'orb';
    let size = Math.random() * 8 + 6;
    let x = Math.random() * 85;
    let y = Math.random() * 70;
    let color = colors[Math.floor(Math.random() * colors.length)];
    orb.style = `width:${size}vw;height:${size}vw;left:${x}vw;top:${y}vh;
      background: radial-gradient(circle,${color} 0%,#fff0 100%);
      animation-delay: ${Math.random()*5}s;
      filter: blur(${size/4}px) brightness(1.1);
      opacity: ${0.57 + Math.random()*0.18};z-index:1;`;
    orbs.appendChild(orb);
  }
}

// ========== LOADING BAR & RANDOM TIPS SLIDE ==========
function getNewPhrase() {
  let pool = loadingPhrases.filter(x => !lastPhrases.includes(x));
  let phrase = pool[Math.floor(Math.random() * pool.length)];
  lastPhrases.push(phrase);
  if (lastPhrases.length > 4) lastPhrases.shift();
  return phrase;
}
function animateLoading() {
  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('loading-text');
  const tips = document.getElementById('tips-slide');
  let fakeProgress = 0;
  spawnOrbs();
  let loadingInterval = setInterval(() => {
    fakeProgress += Math.random() * 13 + 4;
    if (fakeProgress >= 100) {
      fakeProgress = 100;
      clearInterval(loadingInterval);
      showMenuSoon();
    }
    bar.style.width = fakeProgress + "%";
    let tip = getNewPhrase();
    tips.innerText = tip;
    text.innerText = tip;
  }, 1500);
}

function showMenuSoon() {
  saveState("main-menu");
  setTimeout(() => {
    document.getElementById('loading-screen').style.opacity = 1;
    let fade = setInterval(() => {
      let op = parseFloat(document.getElementById('loading-screen').style.opacity);
      if (op <= 0.03) {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block';
        menuAnim();
        clearInterval(fade);
      } else {
        document.getElementById('loading-screen').style.opacity = (op - 0.08).toFixed(2);
      }
    }, 40);
  }, 1100);
}

// ========== FANTASY BACKGROUND ANIMATION ==========
function menuAnim() {
  const bg = document.getElementById('bg-anim');
  if (!bg) return;
  bg.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    let star = document.createElement('div');
    star.className = 'star-particle';
    let size = Math.random() * 1.8 + 0.5;
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    let color = ["#ffeecc", "#ffb300bb", "#f773bc", "#17e2ff"][Math.floor(Math.random()*4)];
    let duration = Math.random() * 2.5 + 3.5;
    let delay = Math.random() * 5;
    star.style = `position: absolute; left: ${x}vw; top: ${y}vh;
      width: ${size}vw; height: ${size}vw; border-radius: 50%;
      background: radial-gradient(circle,${color} 0%,#fff0 100%);
      opacity: 0.77; filter: blur(${size * 1.4}px);
      animation: star-float ${duration}s ${delay}s infinite alternate;
      pointer-events: none; z-index: 1;`;
    bg.appendChild(star);
  }
}
const style = document.createElement('style');
style.innerHTML = `@keyframes star-float {
  from { transform: translateY(0) scale(1);}
  to { transform: translateY(-12vh) scale(1.2);}
}`;
document.head.appendChild(style);

// ========== PIANO NOTES ==========
const pianoNotes = [
  document.getElementById('piano1'),
  document.getElementById('piano2'),
  document.getElementById('piano3'),
  document.getElementById('piano4'),
  document.getElementById('piano5')
];
function playRandomPiano() {
  if (!window.pianoReady) {
    pianoNotes.forEach(a => { try { a.play().catch(()=>{}); a.pause(); a.currentTime=0; } catch{} });
    window.pianoReady = true;
  }
  let idx = Math.floor(Math.random() * pianoNotes.length);
  let note = pianoNotes[idx];
  note.currentTime = 0;
  note.play();
}

// ========== MENU BUTTONS ==========
function setupMenuButtons() {
  ["start-btn","continue-btn","settings-btn","about-btn","exit-btn"].forEach(id => {
    let btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', playRandomPiano, false);
  });
  document.getElementById('start-btn')?.addEventListener('click', startGame);
  document.getElementById('continue-btn')?.addEventListener('click', continueGame);
  document.getElementById('settings-btn')?.addEventListener('click', openSettings);
  document.getElementById('about-btn')?.addEventListener('click', showAbout);
  document.getElementById('exit-btn')?.addEventListener('click', exitGame);
}

// ========== ZOOM FUNCTIONS ==========
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

// ========== GAME EVENTS ==========
function startGame() {
  playRandomPiano();
  alert("⚔️ Starting your Yodha's path...");
}
function continueGame() {
  playRandomPiano();
  alert("📖 Resuming your journey...");
}
function openSettings() {
  playRandomPiano();
  alert("⚙️ Settings not ready yet!");
}
function showAbout() {
  playRandomPiano();
  alert("🌟 Dharma Yodha: Rise of Kaliyuga's Last Light.\nCreated with soul & sweat by Rudravir & Sofi.");
}
function exitGame() {
  playRandomPiano();
  alert("🚪 Exiting game. May your karma shine.");
}

// ========== ENTRY POINT ==========
document.addEventListener('DOMContentLoaded', function() {
  let state = loadState();
  spawnOrbs();
  if (state === "main-menu") {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
    menuAnim();
    setupMenuButtons();
  } else {
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('main-menu').style.display = 'none';
    animateLoading();
    setupMenuButtons();
  }

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
});
