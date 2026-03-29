// ===== LED BACKGROUND =====
function initLED() {
  const canvas = document.getElementById('led-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let leds = [];
  const COLORS = ['#ff0033','#00d4ff','#39ff14','#bf00ff','#ff6600','#ff006e','#ffff00','#00ffcc','#ff3399','#33ffff'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
    buildLEDs();
  }

  function buildLEDs() {
    leds = [];
    const sp = 36;
    const cols = Math.ceil(canvas.width / sp);
    const rows = Math.ceil(canvas.height / sp);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        leds.push({
          x: c * sp + sp / 2,
          y: r * sp + sp / 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.018,
          active: Math.random() > 0.62
        });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leds.forEach(l => {
      if (!l.active) return;
      l.phase += l.speed;
      const b = (Math.sin(l.phase) + 1) / 2;
      if (b < 0.05) return;
      // Dot
      ctx.beginPath();
      ctx.arc(l.x, l.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = l.color;
      ctx.globalAlpha = b * 0.8;
      ctx.fill();
      // Glow
      if (b > 0.5) {
        const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, 8);
        g.addColorStop(0, l.color + '66');
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(l.x, l.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.globalAlpha = b * 0.5;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  // Random toggling
  setInterval(() => {
    const i = Math.floor(Math.random() * leds.length);
    leds[i].active = !leds[i].active;
    if (leds[i].active) leds[i].color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }, 60);
  requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', initLED);
