// guitar_sound.js – Soft Romantic Guitar Note Generator

function playGuitarNote(frequency = 220, duration = 1.2) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Smooth pluck using custom waveform
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Add subtle vibrato effect for more emotion
  const vibrato = ctx.createOscillator();
  const vibratoGain = ctx.createGain();
  vibrato.frequency.value = 6; // 6 Hz = slow emotional vibrato
  vibratoGain.gain.value = 5; // Depth of vibrato
  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc.frequency);
  vibrato.start();

  // Warmth with gentle low-pass filter
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime);
  filter.Q.value = 1.5;

  // Soft fade-in and fade-out
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.03); // pluck rise
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration); // fade out

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
  vibrato.stop(ctx.currentTime + duration);
}

// Optional helper: play a sweet chord (like a romantic strum)
function playRomanticChord() {
  const base = 220; // A3
  playGuitarNote(base);
  setTimeout(() => playGuitarNote(base * Math.pow(2, 4 / 12)), 100); // C#4
  setTimeout(() => playGuitarNote(base * Math.pow(2, 7 / 12)), 200); // E4
}

// Integration example with UI (connect to main.js events or buttons)
document.addEventListener("DOMContentLoaded", () => {
  const guitarBtn = document.getElementById("play-guitar");
  if (guitarBtn) {
    guitarBtn.addEventListener("click", () => {
      playRomanticChord();
    });
  }
});
                                         
