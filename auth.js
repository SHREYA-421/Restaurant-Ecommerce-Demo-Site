// sign in form validation
const form = document.querySelector('.auth-form');
const authBtn = document.querySelector('.auth-btn');

authBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const oldMsg = form.querySelector('.form-msg');
  if (oldMsg) oldMsg.remove();

  const status = document.createElement('div');

  if (!email || !password) {
    status.className = 'form-msg error';
    status.textContent = 'Please enter both email and password.';
  } else {
    status.className = 'form-msg success';
    status.textContent = `Welcome back! Signing in as ${email}...`;
  }

  form.appendChild(status);
});
