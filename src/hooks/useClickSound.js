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

  // noise "click" transient
  const bufferSize = ctx.sampleRate * 0.02;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 2500;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.25, now);

  // confirmation chirp right after
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900, now + 0.02);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
  oscGain.gain.setValueAtTime(0.0001, now + 0.02);
  oscGain.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(ctx.destination);
  osc.connect(oscGain); oscGain.connect(ctx.destination);

  noise.start(now); noise.stop(now + 0.02);
  osc.start(now + 0.02); osc.stop(now + 0.09);
}

export default function useClickSound() {
  return playPropellerClick;
}
