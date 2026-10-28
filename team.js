// ==========================================
// TEAM MEMBER LIGHTBOX PREVIEW INTERACTION
// ==========================================

const cards = document.querySelectorAll('.team-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const nameEl = card.querySelector('h3');
    const roleEl = card.querySelector('p');

    const name = nameEl ? nameEl.textContent : 'Team Member';
    const role = roleEl ? roleEl.textContent : 'Contributor';
    const imgSrc = img ? img.src : '';

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        <img src="${imgSrc}" alt="${name}">
        <h3>${name}</h3>
        <p class="modal-role">${role}</p>
      </div>
    `;

    // Close on close button click
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    // Close when clicking outside modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key press
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeydown);

    function closeModal() {
      document.removeEventListener('keydown', handleKeydown);
      modal.remove();
    }

    document.body.appendChild(modal);
  });
});