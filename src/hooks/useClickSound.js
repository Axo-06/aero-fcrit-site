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

  const bufferSize = ctx.sampleRate * 0.25;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(2000, now + 0.12);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.24);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.15, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  noise.start(now); noise.stop(now + 0.25);
}

export default function useClickSound() {
  return playPropellerClick;
}
