/**
 * hero.js
 * ─────────────────────────────────────────────────────────────
 * Animates the floating particle canvas on the hero's dark
 * right panel (#hero-particles).
 *
 * Particles:
 *   - Mostly white, 25% terracotta-tinted dots
 *   - Float slowly in random directions, wrap at edges
 *   - Density scales with canvas area
 *   - Re-seeds on window resize
 * ─────────────────────────────────────────────────────────────
 */

const canvas = document.getElementById('hero-particles');
if (!canvas) throw new Error('hero.js: #hero-particles canvas not found');

const ctx = canvas.getContext('2d');
let particles = [];

/** Resize canvas to match its container */
function resizeCanvas() {
  const parent = canvas.parentElement;
  canvas.width  = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
}

/** Seed a fresh set of particles based on current canvas size */
function seedParticles() {
  particles = [];
  const count = Math.max(30, Math.floor(canvas.width * canvas.height / 7000));

  for (let i = 0; i < count; i++) {
    particles.push({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      r:   Math.random() * 1.4 + 0.3,           // radius 0.3–1.7px
      vx:  (Math.random() - 0.5) * 0.25,         // gentle horizontal drift
      vy:  (Math.random() - 0.5) * 0.25,         // gentle vertical drift
      a:   Math.random() * 0.35 + 0.05,          // opacity 0.05–0.40
      col: Math.random() > 0.75 ? '#C4623A' : '#ffffff',
    });
  }
}

/** Draw one frame and schedule the next */
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.col;
    ctx.globalAlpha = p.a;
    ctx.fill();

    // Move particle and wrap at edges
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0)             p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0)             p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawFrame);
}

// Initialise
resizeCanvas();
seedParticles();
drawFrame();

window.addEventListener('resize', () => {
  resizeCanvas();
  seedParticles();
});
