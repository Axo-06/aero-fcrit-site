// useClickSound.js
// Synthesizes a short "propeller whir" click sound with the Web Audio
// API on demand — no external audio file, so no asset weight and
// nothing to license.

let sharedContext;

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedContext) sharedContext = new AudioContextClass();
  return sharedContext;
}

export function playPropellerClick() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;

  // filtered noise "spool"
  const bufferSize = ctx.sampleRate * 0.18;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 4;
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(1800, now + 0.12);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  // low thump underneath
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = "sine";
  thump.frequency.setValueAtTime(90, now);
  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

  noise.connect(filter); filter.connect(noiseGain); noiseGain.connect(ctx.destination);
  thump.connect(thumpGain); thumpGain.connect(ctx.destination);

  noise.start(now); noise.stop(now + 0.18);
  thump.start(now); thump.stop(now + 0.1);
}

export default function useClickSound() {
  return playPropellerClick;
}
