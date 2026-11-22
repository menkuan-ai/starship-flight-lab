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

const engineeringDialog = document.querySelector('#engineering-viewer');
if (engineeringDialog?.showModal) {
  const links = [...document.querySelectorAll('.engineering-image')];
  const image = engineeringDialog.querySelector('img');
  const title = engineeringDialog.querySelector('#engineering-caption');
  let selected;
  let opener;
  function selectImage(index) {
    selected = (index + links.length) % links.length;
    const link = links[selected];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    title.textContent = link.closest('figure').querySelector('figcaption strong').textContent;
  }
  links.forEach((link, index) => link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    opener = link;
    selectImage(index);
    engineeringDialog.showModal();
  }));
  engineeringDialog.querySelector('.engineering-close').onclick = () => engineeringDialog.close();
  engineeringDialog.querySelectorAll('[data-offset]').forEach(button => {
    button.onclick = () => selectImage(selected + Number(button.dataset.offset));
  });
  engineeringDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectImage(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  engineeringDialog.addEventListener('close', () => opener?.focus());
}
