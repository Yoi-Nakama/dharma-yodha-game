window.onload = function () {
  // Fake loading for demo: fill bar over 4 seconds
  const progressBar = document.getElementById('progress-bar');
  const loadingText = document.getElementById('loading-text');
  let progress = 0;
  const duration = 4000; // 4 seconds
  const interval = 40;
  const steps = duration / interval;
  const stepAmount = 100 / steps;

  // Unmute sound if user interacts (some browsers block autoplay)
  document.body.addEventListener('click', function() {
    const fireAudio = document.getElementById('fire-audio');
    fireAudio.muted = false;
    fireAudio.play();
  });

  // Animate loading bar
  const loadingInterval = setInterval(() => {
    progress += stepAmount;
    if (progress >= 100) {
      progress = 100;
      loadingText.innerText = "Loading Complete!";
      clearInterval(loadingInterval);
      // TODO: transition to main menu or game page
    }
    progressBar.style.width = progress + "%";
  }, interval);
}
