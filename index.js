// dish image preview modal
const cards = document.querySelectorAll('.culinary-card');

cards.forEach(card => {
  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('h3').textContent;
    const price = card.querySelector('.price').textContent;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn">&times;</button>
        <img src="${img.src}" alt="${title}">
        <h3>${title}</h3>
        <span class="modal-price">${price}</span>
      </div>
    `;

    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  });
});
