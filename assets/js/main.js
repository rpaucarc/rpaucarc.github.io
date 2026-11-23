const filters = document.querySelector('.filters');

if (filters) {
  const search = document.querySelector('#paper-search');
  const year = document.querySelector('#paper-year');
  const count = document.querySelector('#paper-count');
  const normalize = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const papers = Array.from(document.querySelectorAll('.papers li'), (item) => ({
    item,
    text: normalize(item.textContent),
  }));

  function applyFilters() {
    const terms = normalize(search.value).trim().split(/\s+/);
    let visible = 0;
    for (const { item, text } of papers) {
      const matchesYear = !year.value || item.dataset.year === year.value;
      item.hidden = !matchesYear || !terms.every((term) => text.includes(term));
      if (!item.hidden) visible += 1;
    }
    count.textContent = visible === 1 ? '1 publicación' : `${visible} publicaciones`;
  }

  filters.addEventListener('submit', (event) => event.preventDefault());
  search.addEventListener('input', applyFilters);
  year.addEventListener('change', applyFilters);
  filters.hidden = false;
  applyFilters();
}
