// useClickSound.js
// Synthesizes UI sounds with the Web Audio API on demand — no external
// audio files, so no asset weight and nothing to license.
//
// - playPropellerClick(): short click feedback for nav links/buttons
// - playTakeoffChime(): longer ~2s "reward" chime for genuine milestone
//   moments (e.g. a successful form submission), not tied to every click

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
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Quick descending sweep + fast decay reads as a short prop "thwip"
  // rather than a generic UI beep.
  osc.type = "triangle";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.09);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.1, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}

// Generates a short synthetic reverb impulse response — gives the chime
// some air instead of sounding dry/flat, with no audio file needed.
function createReverbImpulse(ctx, duration = 2.2, decay = 3.5) {
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * duration);
  const impulse = ctx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

// A longer, deliberately "designed" reward chime — a rising left-to-right
// panned whoosh underneath a warm ascending arpeggio (G4-C5-E5-G5) that
// resolves, plus a soft reverb tail and a high shimmer on the resolve.
// Meant for genuine milestone moments (e.g. a successful form submit),
// not for regular click feedback — must be triggered by a real user
// gesture, since browsers block audio otherwise.
export function playTakeoffChime() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  reverb.buffer = createReverbImpulse(ctx);
  const reverbSend = ctx.createGain();
  reverbSend.gain.value = 0.35;
  reverb.connect(reverbSend);
  reverbSend.connect(master);

  // 1) Rising whoosh underlay, panned left -> right like a flyover
  const noiseDuration = 1.6;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * noiseDuration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.Q.value = 0.9;
  noiseFilter.frequency.setValueAtTime(200, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(3200, now + 1.1);
  noiseFilter.frequency.exponentialRampToValueAtTime(600, now + 1.6);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.09, now + 0.5);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  if (panner) {
    panner.pan.setValueAtTime(-0.6, now);
    panner.pan.linearRampToValueAtTime(0.6, now + 1.6);
  }

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  const noiseOut = panner || noiseGain;
  if (panner) noiseGain.connect(panner);
  noiseOut.connect(master);
  noiseOut.connect(reverb);

  // 2) Ascending arpeggio that resolves - G4, C5, E5, G5
  const notes = [
    { freq: 392.0, time: 0.05, dur: 0.5 },
    { freq: 523.25, time: 0.28, dur: 0.55 },
    { freq: 659.25, time: 0.5, dur: 0.6 },
    { freq: 784.0, time: 0.72, dur: 0.9 },
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const octave = ctx.createOscillator();
    const octaveGain = ctx.createGain();
    const noteGain = ctx.createGain();

    osc.type = "sine";
    octave.type = "triangle";
    osc.frequency.value = freq;
    octave.frequency.value = freq * 2;
    octaveGain.gain.value = 0.25;

    const t0 = now + time;
    noteGain.gain.setValueAtTime(0.0001, t0);
    noteGain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(noteGain);
    octave.connect(octaveGain);
    octaveGain.connect(noteGain);
    noteGain.connect(master);
    noteGain.connect(reverb);

    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
    octave.start(t0);
    octave.stop(t0 + dur + 0.05);
  });

  // 3) Shimmer on the resolve
  const t0 = now + 0.95;
  const sparkle = ctx.createOscillator();
  const sparkleGain = ctx.createGain();
  sparkle.type = "sine";
  sparkle.frequency.setValueAtTime(1568, t0); // G6
  sparkleGain.gain.setValueAtTime(0.0001, t0);
  sparkleGain.gain.exponentialRampToValueAtTime(0.05, t0 + 0.05);
  sparkleGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
  sparkle.connect(sparkleGain);
  sparkleGain.connect(master);
  sparkleGain.connect(reverb);
  sparkle.start(t0);
  sparkle.stop(t0 + 1.0);

  noise.start(now);
  noise.stop(now + noiseDuration);
}

export default function useClickSound() {
  return playPropellerClick;
}