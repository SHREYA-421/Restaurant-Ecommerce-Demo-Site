// team member image preview
const cards = document.querySelectorAll('.team-card');

cards.forEach(card => {
  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const name = card.querySelector('h3').textContent;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn">&times;</button>
        <img src="${img.src}" alt="${name}">
        <h3>${name}</h3>
      </div>
    `;

    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  });
});