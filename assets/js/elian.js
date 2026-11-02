(() => {
  const project = document.querySelector('#elian');
  if (!project) return;
  const tabs = [...project.querySelectorAll('[role=tab]')];
  const activate = tab => {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const keys = {ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1};
      if (!(event.key in keys)) return;
      event.preventDefault();
      const next = tabs[keys[event.key]];
      activate(next); next.focus();
    });
  });
  const dialog = document.querySelector('.elian-lightbox');
  project.querySelectorAll('.elian-image').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const img = dialog.querySelector('img');
    img.src = link.href; img.alt = link.querySelector('img').alt;
    dialog.showModal(); document.body.classList.add('elian-lightbox-open');
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
  dialog.addEventListener('close', () => document.body.classList.remove('elian-lightbox-open'));
})();
