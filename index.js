// The Saffron Plate — Menu Interactive Filtering, Live Search & Detail Lightbox
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const searchInput = document.getElementById('menu-search-input');
  const clearSearchBtn = document.getElementById('search-clear-btn');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resultCount = document.getElementById('filter-result-count');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const emptyResetBtn = document.getElementById('empty-reset-btn');
  const noResultsState = document.getElementById('no-results-state');
  const cards = document.querySelectorAll('.culinary-card');

  let activeCategory = 'all';
  let searchQuery = '';

  // Dynamically calculate and display dish counts per category
  function updateCategoryCounts() {
    filterTabs.forEach(tab => {
      const category = tab.getAttribute('data-category');
      const countSpan = tab.querySelector('.tab-count');
      if (countSpan) {
        if (category === 'all') {
          countSpan.textContent = cards.length;
        } else {
          let count = 0;
          cards.forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ');
            if (categories.includes(category)) count++;
          });
          countSpan.textContent = count;
        }
      }
    });
  }

  // Filter & Search Execution
  function applyFilters() {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
      const badge = card.querySelector('.card-category-badge')?.textContent.toLowerCase() || '';
      const categories = (card.getAttribute('data-category') || '').split(' ');

      const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
      const matchesSearch = !query || title.includes(query) || desc.includes(query) || badge.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInCard 0.35s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Result Count text & Empty State visibility
    if (visibleCount === 0) {
      if (noResultsState) noResultsState.style.display = 'block';
      if (resultCount) {
        resultCount.textContent = query
          ? `No results found for "${searchQuery.trim()}"`
          : 'No delicacies found in this category';
      }
    } else {
      if (noResultsState) noResultsState.style.display = 'none';
      if (resultCount) {
        const itemWord = visibleCount === 1 ? 'delicacy' : 'delicacies';
        if (query && activeCategory !== 'all') {
          const tabLabel = document.querySelector(`.filter-tab[data-category="${activeCategory}"] .tab-label`)?.textContent || activeCategory;
          resultCount.textContent = `Showing ${visibleCount} ${itemWord} in ${tabLabel} matching "${searchQuery.trim()}"`;
        } else if (query) {
          resultCount.textContent = `Showing ${visibleCount} ${itemWord} matching "${searchQuery.trim()}"`;
        } else if (activeCategory !== 'all') {
          const tabLabel = document.querySelector(`.filter-tab[data-category="${activeCategory}"] .tab-label`)?.textContent || activeCategory;
          resultCount.textContent = `Showing ${visibleCount} ${itemWord} in ${tabLabel}`;
        } else {
          resultCount.textContent = `Showing all ${visibleCount} delicacies`;
        }
      }
    }

    // Toggle reset buttons & clear search button
    const hasFilterActive = activeCategory !== 'all' || query.length > 0;
    if (resetFilterBtn) {
      resetFilterBtn.style.display = hasFilterActive ? 'inline-block' : 'none';
    }
    if (clearSearchBtn) {
      clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
    }
  }

  // Event: Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Event: Clear Search Button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchQuery = '';
      applyFilters();
    });
  }

  // Event: Category Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      applyFilters();
    });
  });

  // Reset all filters and search input
  function resetAllFilters() {
    activeCategory = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    filterTabs.forEach(tab => {
      if (tab.getAttribute('data-category') === 'all') {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    applyFilters();
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', resetAllFilters);
  }
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', resetAllFilters);
  }

  // Dish Image & Detail Preview Lightbox
  cards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;

      const img = card.querySelector('img');
      const title = card.querySelector('h3')?.textContent || '';
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

      const closeBtn = modal.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', () => modal.remove());

      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });

      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          modal.remove();
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      document.body.appendChild(modal);
    });
  });

  // Initialize on page load
  updateCategoryCounts();
  applyFilters();
});
