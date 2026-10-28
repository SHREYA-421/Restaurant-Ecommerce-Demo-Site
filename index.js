// ==========================================
// THE SAFFRON PLATE — MENU FILTER & LIGHTBOX
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const searchInput = document.getElementById('menu-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resultCount = document.getElementById('filter-result-count');
  const resetBtn = document.getElementById('reset-filter-btn');
  const emptyResetBtn = document.getElementById('empty-reset-btn');
  const noResults = document.getElementById('no-results-state');
  const cards = document.querySelectorAll('.culinary-card');

  let activeCategory = 'all';

  // 1. Calculate category counts
  filterTabs.forEach(tab => {
    const cat = tab.dataset.category;
    const badge = tab.querySelector('.tab-count');
    if (badge) {
      badge.textContent = cat === 'all'
        ? cards.length
        : [...cards].filter(c => (c.dataset.category || '').includes(cat)).length;
    }
  });

  // 2. Filter & Search Function
  function filterMenu() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    cards.forEach(card => {
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
      const categories = (card.getAttribute('data-category') || '').split(' ');

      const matchesCat = activeCategory === 'all' || categories.includes(activeCategory);
      const matchesSearch = !query || title.includes(query) || desc.includes(query);

      const isVisible = matchesCat && matchesSearch;
      card.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount++;
    });

    // Update Result Text & Empty State
    if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    if (resultCount) {
      resultCount.textContent = visibleCount === 0
        ? (query ? `No delicacies found matching "${query}"` : 'No delicacies in this category')
        : `Showing ${visibleCount} delicac${visibleCount === 1 ? 'y' : 'ies'}`;
    }

    // Toggle reset & clear buttons
    const hasActiveFilter = activeCategory !== 'all' || query.length > 0;
    if (resetBtn) resetBtn.style.display = hasActiveFilter ? 'inline-block' : 'none';
    if (clearBtn) clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
  }

  // 3. Search Events
  if (searchInput) searchInput.addEventListener('input', filterMenu);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      filterMenu();
    });
  }

  // 4. Category Tab Events
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category || 'all';
      filterMenu();
    });
  });

  // 5. Reset All Filters
  function resetAll() {
    activeCategory = 'all';
    if (searchInput) searchInput.value = '';
    filterTabs.forEach(t => t.classList.toggle('active', t.dataset.category === 'all'));
    filterMenu();
  }

  if (resetBtn) resetBtn.addEventListener('click', resetAll);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAll);

  // 6. Dish Lightbox Modal Preview
  cards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;

      const img = card.querySelector('img');
      const title = card.querySelector('h3')?.textContent || 'Delicacy';
      const price = card.querySelector('.price')?.textContent || '';
      const desc = card.querySelector('p')?.textContent || '';
      const badge = card.querySelector('.card-category-badge')?.textContent || '';

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close-btn" aria-label="Close modal">&times;</button>
          <img src="${img.src}" alt="${title}">
          ${badge ? `<div style="text-align:center;"><span class="card-category-badge">${badge}</span></div>` : ''}
          <h3>${title}</h3>
          <p>${desc}</p>
          <span class="modal-price">${price}</span>
        </div>
      `;

      const closeModal = () => {
        document.removeEventListener('keydown', onEsc);
        modal.remove();
      };

      const onEsc = (ev) => {
        if (ev.key === 'Escape') closeModal();
      };

      document.addEventListener('keydown', onEsc);
      modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeModal();
      });

      document.body.appendChild(modal);
    });
  });

  // Initial Filter Execution
  filterMenu();
});
