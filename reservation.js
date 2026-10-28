// ==========================================
// TABLE RESERVATION LOGIC & LOCAL JSON SAVING
// ==========================================

const STORAGE_KEY = 'saffron_reservations';

// 1. Set minimum reservation date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

// 2. Helper: Retrieve saved reservations from localStorage
function getSavedReservations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (err) {
    console.error('Error reading reservations from localStorage:', err);
    return [];
  }
}

// 3. Helper: Save reservations array to localStorage
function saveReservations(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list, null, 2));
  updateCountDisplay();
}

// 4. Helper: Trigger client-side download of a .json file
function downloadJsonFile(data, filename = 'reservations.json') {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = filename;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}

// 5. Helper: Update total count badge on the UI
function updateCountDisplay() {
  const countBadge = document.getElementById('res-count');
  if (countBadge) {
    const total = getSavedReservations().length;
    countBadge.textContent = `Saved in local storage: ${total} reservation${total === 1 ? '' : 's'}`;
  }
}

// Initialize count on page load
updateCountDisplay();

// 6. Handle Form Submission & Validation
const form = document.querySelector('.res-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const guestsInput = document.getElementById('guests');
    const timeInput = document.getElementById('time');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const guests = guestsInput ? guestsInput.value : '2 Guests';
    const date = dateInput ? dateInput.value : '';
    const time = timeInput ? timeInput.value : '';

    // Clear previous status message
    const oldMsg = form.querySelector('.form-msg');
    if (oldMsg) oldMsg.remove();

    // Reset input error styling
    [nameInput, phoneInput, dateInput].forEach(inp => inp && inp.classList.remove('input-error'));

    const status = document.createElement('div');

    // Validation: Required fields check
    if (!name || !phone || !date) {
      status.className = 'form-msg error';
      status.textContent = 'Please fill out all required fields (Name, Phone, and Date).';
      if (!name && nameInput) nameInput.classList.add('input-error');
      if (!phone && phoneInput) phoneInput.classList.add('input-error');
      if (!date && dateInput) dateInput.classList.add('input-error');
      form.appendChild(status);
      return;
    }

    // Validation: Phone format check (minimum 10 digits)
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      status.className = 'form-msg error';
      status.textContent = 'Please enter a valid phone number (at least 10 digits).';
      if (phoneInput) phoneInput.classList.add('input-error');
      form.appendChild(status);
      return;
    }

    // Build new reservation record
    const newReservation = {
      id: `RES-${Date.now()}`,
      name: name,
      phone: phone,
      guests: guests,
      date: date,
      time: time,
      submittedAt: new Date().toLocaleString()
    };

    // Save record to localStorage
    const allReservations = getSavedReservations();
    allReservations.push(newReservation);
    saveReservations(allReservations);

    // Save/Download to local JSON file
    downloadJsonFile(allReservations, 'reservations.json');

    // Display Success Feedback
    status.className = 'form-msg success';
    status.innerHTML = `
      <strong>Reservation Confirmed!</strong><br>
      Table for ${guests} on ${date} at ${time}. See you, ${name}!<br>
      <small>✅ Saved and exported to <code>reservations.json</code></small>
    `;
    form.appendChild(status);
    form.reset();
  });
}

// 7. Dedicated "Download All Saved Reservations" button handler
const exportBtn = document.getElementById('export-res-json');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const list = getSavedReservations();

    const oldMsg = form ? form.querySelector('.form-msg') : null;
    if (oldMsg) oldMsg.remove();

    if (list.length === 0) {
      const status = document.createElement('div');
      status.className = 'form-msg error';
      status.textContent = 'No reservations saved yet. Please submit a reservation first!';
      if (form) form.appendChild(status);
      return;
    }

    downloadJsonFile(list, 'reservations.json');

    const status = document.createElement('div');
    status.className = 'form-msg success';
    status.textContent = `Downloaded reservations.json containing ${list.length} record(s).`;
    if (form) form.appendChild(status);
  });
}
