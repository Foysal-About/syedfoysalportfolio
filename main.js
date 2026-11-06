const root = document.documentElement;

// theme toggle; storage can throw in private mode
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// letter-by-letter rise for the big name
const name = document.querySelector('.hero-name');
name.innerHTML = '<span class="hero-name-clip">' + [...name.textContent]
  .map((c, i) => `<span class="ch" style="animation-delay:${i * 45}ms">${c === ' ' ? '&nbsp;' : c}</span>`)
  .join('') + '</span>';
name.setAttribute('aria-label', 'Syed Foysal');

// scale the name so it spans the full hero width
const clip = name.firstChild;
const fit = () => {
  name.style.fontSize = '100px';
  name.style.fontSize = `${70 * name.clientWidth / clip.scrollWidth}px`;  // 70% of width keeps the name prominent, not overpowering
};
fit();
document.fonts.ready.then(fit);
addEventListener('resize', fit);

// nav background after scrolling
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

// reveal on scroll
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// hero ribbons follow the mouse a little
const hero = document.querySelector('.hero');
hero.addEventListener('pointermove', e => {
  const x = (e.clientX / innerWidth - 0.5) * 40, y = (e.clientY / innerHeight - 0.5) * 40;
  hero.querySelectorAll('.ribbon').forEach((r, i) => {
    r.style.setProperty('--mx', `${x * (i ? -1 : 1)}px`);
    r.style.setProperty('--my', `${y * (i ? -1 : 1)}px`);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
