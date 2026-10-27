// story image preview
const images = document.querySelectorAll('.about-card img');

images.forEach(img => {
  img.style.cursor = 'pointer';

  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn">&times;</button>
        <img src="${img.src}" alt="${img.alt}">
        <h3>${img.alt}</h3>
      </div>
    `;

   const closeButton = modal.querySelector('.modal-close-btn');

closeButton.addEventListener('click', () => modal.remove());

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.remove();
  }
});
    document.body.appendChild(modal);
  });
});
