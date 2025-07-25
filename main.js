// Prevent accidental reload by intercepting touch events (for mobile browsers)
let preventReload = true;
window.addEventListener('touchmove', function(e) {
  if (preventReload && e.touches[0] && e.touches[0].clientY < 80) {
    e.preventDefault();
    document.getElementById('reload-lock').style.display = 'flex';
  }
}, { passive: false });

// Device orientation lock logic
function checkOrientation() {
  let landscape = window.innerWidth > window.innerHeight;
  document.getElementById('orientation-lock').style.display = landscape ? 'none' : 'flex';
}
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
checkOrientation();

// Fantasy loading text cycles
const loadingPhrases = [
  "Summoning magic...",
  "Conjuring game world...",
  "Forging legendary weapons...",
  "Binding sacred spirits...",
  "Enchanting animations...",
  "Preparing your adventure...",
  "Almost ready!"
];

// Asset loading simulation and real asset loading structure (expand as needed)
const assetsToLoad = [
  "Picsart_25-07-25_16-45-16-611.png"
  // Add more asset URLs here for real preloading!
];
let loadedAssets = 0;

// Preload images and update progress
function preloadAssets(onProgress, onComplete) {
  if (assetsToLoad.length === 0) { onProgress(100); onComplete(); return; }
  assetsToLoad.forEach(url => {
    const img = new Image();
    img.onload = img.onerror = function() {
      loadedAssets++;
      let percent = Math.round((loadedAssets / assetsToLoad.length) * 100);
      onProgress(percent);
      if (loadedAssets === assetsToLoad.length) onComplete();
    }
    img.src = url;
  });
}

// Animate loading bar & text
function animateLoading() {
  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('loading-text');
  let phraseIndex = 0;
  let progress = 0;
  let phase = 0;

  function nextPhrase() {
    text.innerText = loadingPhrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
  }

  // Animate loading bar based on real asset loading
  preloadAssets(
    percent => {
      bar.style.width = percent + "%";
      if (percent > 10 && phase === 0) { nextPhrase(); phase++; }
      else if (percent > 45 && phase === 1) { nextPhrase(); phase++; }
      else if (percent > 75 && phase === 2) { nextPhrase(); phase++; }
      else if (percent > 95 && phase === 3) { nextPhrase(); phase++; }
    },
    () => {
      bar.style.width = "100%";
      text.innerText = "Adventure Awaits!";
      setTimeout(showMainMenu, 1000);
    }
  );

  // Cycle phrases even if slow network
  setInterval(nextPhrase, 2600);
}

// Fade from loading to main menu
function showMainMenu() {
  document.getElementById('loading-screen').style.opacity = 1;
  let fade = setInterval(() => {
    let op = parseFloat(document.getElementById('loading-screen').style.opacity);
    if (op <= 0.01) {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('main-menu').style.display = 'block';
      menuAnim();
      clearInterval(fade);
    } else {
      document.getElementById('loading-screen').style.opacity = (op - 0.08).toFixed(2);
    }
  }, 40);
}

// Fantasy background animation (particles, shimmer, etc.)
function menuAnim() {
  const bg = document.getElementById('bg-anim');
  if (!bg) return;
  bg.innerHTML = "";
  // Fantasy particles
  for (let i = 0; i < 34; i++) {
    let star = document.createElement('div');
    star.className = 'star-particle';
    let size = Math.random() * 1.8 + 0.5;
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    let duration = Math.random() * 2.5 + 2.5;
    let delay = Math.random() * 5;
    star.style = `
      position: absolute; left: ${x}vw; top: ${y}vh;
      width: ${size}vw; height: ${size}vw;
      border-radius: 50%;
      background: radial-gradient(circle,#ffeecc 0%,#ffb300bb 60%,#fff0 100%);
      opacity: 0.7;
      filter: blur(${size * 1.4}px);
      animation: star-float ${duration}s ${delay}s infinite alternate;
      pointer-events: none;
      z-index: 1;
    `;
    bg.appendChild(star);
  }
}
document.addEventListener('DOMContentLoaded', function() {
  // Prevent accidental reloads on mobile
  document.body.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });
  animateLoading();
});

// Menu button events (expand with your game logic)
document.getElementById('start-btn')?.addEventListener('click', () => {
  alert("Start Game coming soon! (Connect to your game/scene logic here)");
});
document.getElementById('continue-btn')?.addEventListener('click', () => {
  alert("Continue feature coming soon!");
});
document.getElementById('settings-btn')?.addEventListener('click', () => {
  alert("Settings coming soon!");
});
document.getElementById('about-btn')?.addEventListener('click', () => {
  alert("Dharma Yodha — a fantasy adventure by Yoi-Nakama. (Expand this about page!)");
});
document.getElementById('exit-btn')?.addEventListener('click', () => {
  alert("Exit: On web, you can just close the tab or go back.");
});

// CSS animation for particles
const style = document.createElement('style');
style.innerHTML = `
@keyframes star-float {
  from { transform: translateY(0) scale(1);}
  to { transform: translateY(-12vh) scale(1.2);}
}
`;
document.head.appendChild(style);
