// ─── Custom cursor
const cur = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, .project-card, .skill-card, button').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

// ─── Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── Typewriter
const roles = [
  'Full-Stack Developer',
  'Systems Architect',
  'Open Source Builder',
  'API Designer',
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = roles[ri];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 50 : 90);
}
setTimeout(type, 1800);

// ─── Scroll reveals
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Animate code preview
const lines = [
  `const pipeline = createPipeline({`,
  `  source: 'kafka://events',`,
  `  transform: normalize,`,
  `  sink: 'clickhouse',`,
  `  throughput: '2M/day'`,
  `});`,
  ``,
  `await pipeline.start();`,
  `// ✓ Processing 2,341 eps`,
];
let lIdx = 0;
const codeEl = document.getElementById('code-preview');
if (codeEl) {
  codeEl.innerHTML = '';
  setInterval(() => {
    if (lIdx < lines.length) {
      const span = document.createElement('span');
      span.textContent = lines[lIdx];
      codeEl.appendChild(span);
      codeEl.appendChild(document.createElement('br'));
      lIdx++;
    } else {
      lIdx = 0;
      codeEl.innerHTML = '';
    }
  }, 400);
}
