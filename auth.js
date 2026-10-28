// ==========================================
// GUEST SIGN-IN / AUTHENTICATION VALIDATION
// ==========================================

const form = document.querySelector('.auth-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    // Clear previous feedback message & input errors
    const oldMsg = form.querySelector('.form-msg');
    if (oldMsg) oldMsg.remove();

    [emailInput, passwordInput].forEach(inp => inp && inp.classList.remove('input-error'));

    const status = document.createElement('div');

    // Validation: Required fields
    if (!email || !password) {
      status.className = 'form-msg error';
      status.textContent = 'Please enter both your email and password.';
      if (!email && emailInput) emailInput.classList.add('input-error');
      if (!password && passwordInput) passwordInput.classList.add('input-error');
      form.appendChild(status);
      return;
    }

    // Validation: Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.className = 'form-msg error';
      status.textContent = 'Please enter a valid email address.';
      if (emailInput) emailInput.classList.add('input-error');
      form.appendChild(status);
      return;
    }

    // Validation: Password length check (minimum 6 characters)
    if (password.length < 6) {
      status.className = 'form-msg error';
      status.textContent = 'Password must be at least 6 characters long.';
      if (passwordInput) passwordInput.classList.add('input-error');
      form.appendChild(status);
      return;
    }

    // Simulated Authentication Success
    localStorage.setItem('saffron_current_user', JSON.stringify({ email, loggedInAt: new Date().toISOString() }));

    status.className = 'form-msg success';
    status.innerHTML = `
      <strong>Welcome back!</strong><br>
      Signing in as <code>${email}</code>...
    `;
    form.appendChild(status);

    setTimeout(() => {
      form.reset();
    }, 1500);
  });
}
