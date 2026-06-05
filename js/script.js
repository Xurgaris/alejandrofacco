// Header scroll
const hdr = document.querySelector('header');
window.addEventListener('scroll', () => {
  const s = window.scrollY > 60;
  hdr.style.background = s ? 'oklch(0.09 0.01 20 / 0.95)' : 'oklch(0.13 0.01 20 / 0.75)';
}, {passive:true});

// Areas
const areas = [
  {n:'01',t:'Direito Trabalhista'},
  {n:'02',t:'Previdenciário · INSS'},
  {n:'03',t:'Consultoria Jurídica'},
];
let cur = 0;
const btns = document.querySelectorAll('.area-item');
const imgs = document.querySelectorAll('.a-img');
const aiN  = document.getElementById('aiN');
const aiT  = document.getElementById('aiT');

function setArea(i) {
  cur = i;
  btns.forEach((b,j) => {
    b.classList.toggle('active',  j===i);
    b.classList.toggle('inactive',j!==i);
  });
  imgs.forEach((im,j) => {
    im.classList.toggle('visible',j===i);
    im.classList.toggle('hidden', j!==i);
  });
  aiN.textContent = areas[i].n + ' · Especialidade';
  aiT.textContent = areas[i].t;
}
btns.forEach((b,i) => {
  b.addEventListener('click',      () => setArea(i));
  b.addEventListener('mouseenter', () => setArea(i));
});
setInterval(() => setArea((cur+1)%3), 5000);

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
      obs.unobserve(e.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.obs-reveal').forEach(el => {
  el.style.opacity='0';
  el.style.transform='translateY(28px)';
  el.style.transition='opacity .85s ease, transform .85s ease';
  obs.observe(el);
});
