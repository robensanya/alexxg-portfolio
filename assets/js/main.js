(() => {
  'use strict';
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-category]'));
  const status = document.querySelector('#filter-status');
  buttons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    status.textContent = `Показано проектов: ${count}`;
  }));
})();

(() => {
  const stage = document.querySelector('.hero-collage');
  if (!stage) return;
  const chips = [...stage.querySelectorAll('.portrait-chip')];
  const controls = stage.querySelector('.collage-controls');
  const status = stage.querySelector('#collage-status');
  const motion = stage.querySelector('.collage-motion');
  let active = null;
  const clamp = (value, max) => Math.max(0, Math.min(Math.max(0, max), value));
  function place(chip, x, y) {
    chip.classList.add('is-placed');
    chip.style.left = clamp(x, stage.clientWidth - chip.offsetWidth) + 'px';
    chip.style.top = clamp(y, stage.clientHeight - chip.offsetHeight) + 'px';
    chip.style.right = 'auto';
    chip.style.bottom = 'auto';
  }
  function finish() {
    if (!active) return;
    const { chip, id } = active;
    active = null;
    chip.classList.remove('is-dragging');
    if (chip.hasPointerCapture(id)) chip.releasePointerCapture(id);
  }
  function reset() {
    finish();
    chips.forEach(chip => { chip.removeAttribute('style'); chip.classList.remove('is-placed'); });
  }
  chips.forEach(chip => {
    chip.addEventListener('pointerdown', event => {
      if (active || !event.isPrimary || event.button !== 0) return;
      const box = chip.getBoundingClientRect();
      const parent = stage.getBoundingClientRect();
      place(chip, box.left - parent.left, box.top - parent.top);
      active = { chip, id: event.pointerId, dx: event.clientX - box.left, dy: event.clientY - box.top };
      chip.classList.add('is-dragging');
      chip.setPointerCapture(event.pointerId);
    });
    chip.addEventListener('pointermove', event => {
      if (!active || active.chip !== chip || active.id !== event.pointerId) return;
      const box = stage.getBoundingClientRect();
      place(chip, event.clientX - box.left - active.dx, event.clientY - box.top - active.dy);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(name => chip.addEventListener(name, () => {
      if (active && active.chip === chip) finish();
    }));
    chip.addEventListener('keydown', event => {
      if (event.key === 'Escape') { reset(); status.textContent = 'Чипсы на исходных местах'; return; }
      const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (!directions[event.key]) return;
      event.preventDefault();
      const box = chip.getBoundingClientRect(), parent = stage.getBoundingClientRect();
      const [x, y] = directions[event.key], step = event.shiftKey ? 20 : 8;
      place(chip, box.left - parent.left + x * step, box.top - parent.top + y * step);
    });
  });
  stage.querySelector('.collage-reset').addEventListener('click', () => {
    reset(); status.textContent = 'Чипсы на исходных местах';
  });
  motion.addEventListener('click', () => {
    const paused = stage.classList.toggle('motion-paused');
    motion.setAttribute('aria-pressed', String(paused));
    motion.setAttribute('aria-label', paused ? 'Включить покачивание чипсов' : 'Остановить покачивание чипсов');
    motion.textContent = paused ? '▷' : 'Ⅱ';
  });
  window.addEventListener('resize', reset);
  controls.hidden = false;
  stage.classList.add('is-interactive');
})();
