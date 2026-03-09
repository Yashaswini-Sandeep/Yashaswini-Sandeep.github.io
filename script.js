const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

let nodes = [];
let particles = [];
const nodeCount = 42;
const particleCount = 18;
const maxDistance = 170;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createNetwork();
}

function createNetwork() {
  nodes = [];
  particles = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2 + 1.5
    });
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.8 + 0.3,
      size: Math.random() * 2 + 1
    });
  }
}

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];

    a.x += a.vx;
    a.y += a.vy;

    if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
    if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        const alpha = 1 - dist / maxDistance;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(33, 212, 253, ${alpha * 0.16})`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach(node => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(170, 235, 255, 0.9)';
    ctx.shadowColor = 'rgba(33, 212, 253, 0.8)';
    ctx.shadowBlur = 10;
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.shadowBlur = 0;

  particles.forEach(p => {
    p.x += p.vx;
    if (p.x > canvas.width + 20) {
      p.x = -20;
      p.y = Math.random() * canvas.height;
    }

    ctx.beginPath();
    ctx.fillStyle = 'rgba(157, 92, 255, 0.75)';
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    const grad = ctx.createLinearGradient(p.x - 30, p.y, p.x + 5, p.y);
    grad.addColorStop(0, 'rgba(33, 212, 253, 0)');
    grad.addColorStop(1, 'rgba(33, 212, 253, 0.28)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(p.x - 24, p.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  requestAnimationFrame(drawNetwork);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawNetwork();

const navLinks = [...document.querySelectorAll('.links a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

function updateActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section, index) => {
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

const cards = [...document.querySelectorAll('.project-card')];
let idx = 0;

function renderCards(){
  cards.forEach((card, i) => {
    card.className = 'project-card';
    const pos = (i - idx + cards.length) % cards.length;
    if(pos === 0) card.classList.add('center');
    else if(pos === 1) card.classList.add('right');
    else if(pos === cards.length - 1) card.classList.add('left');
    else if(pos < cards.length / 2) card.classList.add('hidden-right');
    else card.classList.add('hidden-left');
  });
}

renderCards();

document.getElementById('next').addEventListener('click', () => {
  idx = (idx + 1) % cards.length;
  renderCards();
});

document.getElementById('prev').addEventListener('click', () => {
  idx = (idx - 1 + cards.length) % cards.length;
  renderCards();
});