// ==========================================
// CONTACT INQUIRIES LOGIC & LOCAL JSON SAVING
// ==========================================

const CONTACTS_STORAGE_KEY = 'saffron_contacts';

// 1. Helper: Retrieve saved inquiries from localStorage
function getSavedContacts() {
  try {
    return JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY)) || [];
  } catch (err) {
    console.error('Error reading contacts from localStorage:', err);
    return [];
  }
}

// 2. Helper: Save inquiries array to localStorage
function saveContacts(list) {
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(list, null, 2));
  updateContactCountDisplay();
}

// 3. Helper: Trigger client-side download of a .json file
function downloadJsonFile(data, filename = 'contacts.json') {
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

// 4. Helper: Update total count badge on the UI
function updateContactCountDisplay() {
  const countBadge = document.getElementById('contact-count');
  if (countBadge) {
    const total = getSavedContacts().length;
    countBadge.textContent = `Saved in local storage: ${total} inquir${total === 1 ? 'y' : 'ies'}`;
  }
}

// Initialize count on page load
updateContactCountDisplay();

// 5. Handle Form Submission & Validation
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'General Inquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    // Clear previous status message
    const oldMsg = form.querySelector('.form-msg');
    if (oldMsg) oldMsg.remove();

    // Reset input error styling
    [nameInput, emailInput, messageInput].forEach(inp => inp && inp.classList.remove('input-error'));

    const status = document.createElement('div');

    // Validation: Required fields check
    if (!name || !email || !message) {
      status.className = 'form-msg error';
      status.textContent = 'Please fill out all required fields (Name, Email, and Message).';
      if (!name && nameInput) nameInput.classList.add('input-error');
      if (!email && emailInput) emailInput.classList.add('input-error');
      if (!message && messageInput) messageInput.classList.add('input-error');
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

    // Build new contact inquiry record
    const newContact = {
      id: `CNT-${Date.now()}`,
      name: name,
      email: email,
      subject: subject || 'General Inquiry',
      message: message,
      submittedAt: new Date().toLocaleString()
    };

    // Save record to localStorage
    const allContacts = getSavedContacts();
    allContacts.push(newContact);
    saveContacts(allContacts);

    // Save/Download to local JSON file
    downloadJsonFile(allContacts, 'contacts.json');

    // Display Success Feedback
    status.className = 'form-msg success';
    status.innerHTML = `
      <strong>Message Sent Successfully!</strong><br>
      Thank you, ${name}. Our team will review your message promptly.<br>
      <small>✅ Saved and exported to <code>contacts.json</code></small>
    `;
    form.appendChild(status);
    form.reset();
  });
}

// 6. Dedicated "Download All Saved Inquiries" button handler
const exportBtn = document.getElementById('export-contact-json');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const list = getSavedContacts();

    const oldMsg = form ? form.querySelector('.form-msg') : null;
    if (oldMsg) oldMsg.remove();

    if (list.length === 0) {
      const status = document.createElement('div');
      status.className = 'form-msg error';
      status.textContent = 'No inquiries saved yet. Please submit a message first!';
      if (form) form.appendChild(status);
      return;
    }

    downloadJsonFile(list, 'contacts.json');

    const status = document.createElement('div');
    status.className = 'form-msg success';
    status.textContent = `Downloaded contacts.json containing ${list.length} record(s).`;
    if (form) form.appendChild(status);
  });
}
