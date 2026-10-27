// set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

// handle reservation
const form = document.querySelector('.res-form');
const resBtn = document.querySelector('.res-btn');

resBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const guests = document.getElementById('guests').value;
  const date = document.getElementById('date').value;

  const oldMsg = form.querySelector('.form-msg');
  if (oldMsg) oldMsg.remove();

  const status = document.createElement('div');

  if (!name || !phone || !date) {
    status.className = 'form-msg error';
    status.textContent = 'Please enter name, phone, and date.';
  } else {
    status.className = 'form-msg success';
    status.textContent = `Table booked for ${guests} on ${date}. See you, ${name}!`;
    form.reset();
  }

  form.appendChild(status);
});
