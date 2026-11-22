const slides = [
  ['pad.webp', '发射场 · 起飞与喷水'],
  ['flight.webp', '在轨飞行 · 星舰与地球弧线'],
  ['preview.webp', '轨道视图 · 卫星部署'],
  ['entry.webp', '返回地球 · 再入辉光']
];
const photo = document.querySelector('#screen');
const toggle = document.querySelector('#play');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let playing = !motion.matches;
let timer;
function show(step) {
  current = (current + step + slides.length) % slides.length;
  const [src, label] = slides[current];
  photo.src = src;
  photo.alt = label;
  document.querySelector('#caption').textContent = label;
}
function schedule() {
  clearInterval(timer);
  toggle.textContent = playing ? '暂停轮播' : '播放轮播';
  if (playing && !document.hidden) timer = setInterval(() => show(1), 6000);
}
document.querySelector('#prev').onclick = () => { show(-1); schedule(); };
document.querySelector('#next').onclick = () => { show(1); schedule(); };
toggle.onclick = () => { playing = !playing; schedule(); };
document.addEventListener('visibilitychange', schedule);
motion.addEventListener('change', () => { playing = !motion.matches; schedule(); });
document.querySelector('.controls').hidden = false;
schedule();
