// contact form submit
const form = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.contact-submit-btn');

submitBtn.addEventListener('click', () => {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const oldMsg = form.querySelector('.form-msg');
  if (oldMsg) oldMsg.remove();

  const status = document.createElement('div');

  if (!name || !email || !message) {
    status.className = 'form-msg error';
    status.textContent = 'Please fill out all fields.';
  } else {
    status.className = 'form-msg success';
    status.textContent = Thank you, ${name}! Your message has been sent.;
    form.reset();
  }

  form.appendChild(status);
});
