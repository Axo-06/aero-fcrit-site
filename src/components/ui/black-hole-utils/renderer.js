// Lightweight canvas2D "black hole" renderer: an accretion-disk of particles
// spiraling into a central event horizon, with a soft gravitational-lensing glow.

export function createRenderer({ canvas }) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let rafId = null;
  let disposed = false;

  const PARTICLE_COUNT = 260;
  const particles = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || canvas.clientWidth || 300;
    height = rect.height || canvas.clientHeight || 300;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initParticles() {
    particles.length = 0;
    const maxDim = Math.max(width, height);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = rand(0, Math.PI * 2);
      const radius = rand(maxDim * 0.12, maxDim * 0.5);
      particles.push({
        angle,
        radius,
        speed: rand(0.15, 0.6) / (radius / maxDim + 0.05) * 0.01,
        size: rand(0.6, 2.2),
        hueShift: rand(0, 1),
        trail: rand(2, 6),
      });
    }
  }

  function drawBackground() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);
  }

  function drawEventHorizon(cx, cy, coreRadius) {
    // Outer glow (gravitational lensing halo)
    const glow = ctx.createRadialGradient(
      cx, cy, coreRadius * 0.9,
      cx, cy, coreRadius * 4.2
    );
    glow.addColorStop(0, "rgba(255,190,120,0.35)");
    glow.addColorStop(0.35, "rgba(255,140,60,0.12)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, coreRadius * 4.2, 0, Math.PI * 2);
    ctx.fill();

    // Photon ring
    ctx.beginPath();
    ctx.arc(cx, cy, coreRadius * 1.08, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,225,190,0.55)";
    ctx.lineWidth = Math.max(1, coreRadius * 0.03);
    ctx.stroke();

    // Solid black core
    ctx.beginPath();
    ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
  }

  function drawParticles(cx, cy, coreRadius, dt) {
    ctx.globalCompositeOperation = "lighter";
    for (const p of particles) {
      p.angle += p.speed * dt;
      p.radius -= (p.speed * dt) * (coreRadius * 0.4);

      if (p.radius < coreRadius * 0.95) {
        const maxDim = Math.max(width, height);
        p.radius = rand(maxDim * 0.35, maxDim * 0.5);
        p.angle = rand(0, Math.PI * 2);
      }

      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * p.radius * 0.45; // flattened disk

      const t = p.hueShift;
      const r = 255;
      const g = 150 + t * 90;
      const b = 60 + t * 140;

      const tailAngle = p.angle - p.speed * p.trail * 6;
      const tx = cx + Math.cos(tailAngle) * p.radius;
      const ty = cy + Math.sin(tailAngle) * p.radius * 0.45;

      const grad = ctx.createLinearGradient(tx, ty, x, y);
      grad.addColorStop(0, `rgba(${r},${g|0},${b|0},0)`);
      grad.addColorStop(1, `rgba(${r},${g|0},${b|0},0.9)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = p.size;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  let lastTime = performance.now();

  function frame(now) {
    if (disposed) return;
    const dt = Math.min(2.5, (now - lastTime) / 16.67);
    lastTime = now;

    const cx = width / 2;
    const cy = height / 2;
    const coreRadius = Math.max(8, Math.min(width, height) * 0.09);

    drawBackground();
    drawParticles(cx, cy, coreRadius, dt);
    drawEventHorizon(cx, cy, coreRadius);

    rafId = requestAnimationFrame(frame);
  }

  function start() {
    resize();
    initParticles();
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  const onResize = () => {
    resize();
    initParticles();
  };
  window.addEventListener("resize", onResize);

  const ready = new Promise((resolve) => {
    start();
    resolve();
  });

  function dispose() {
    disposed = true;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return { ready, dispose };
}
