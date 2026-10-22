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
  const stage = document.querySelector('.portrait-deck');
  if (!stage) return;
  const cards = [...stage.querySelectorAll('.thesis-card')];
  const button = stage.querySelector('.deck-pause');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, paused = false, hovered = false, visible = true;
  function schedule() {
    clearTimeout(timer);
    timer = null;
    if (paused || hovered || !visible || document.hidden || reduced.matches) return;
    timer = setTimeout(() => {
      cards[index].classList.remove('is-active');
      index = (index + 1) % cards.length;
      cards[index].classList.add('is-active');
      schedule();
    }, 2500);
  }
  stage.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
  stage.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  button.addEventListener('click', () => {
    paused = !paused;
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Включить смену карточек' : 'Остановить смену карточек');
    button.textContent = paused ? '▷' : 'Ⅱ';
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, { threshold: 0.1 }).observe(stage);
  }
  button.hidden = false;
  schedule();
})();
