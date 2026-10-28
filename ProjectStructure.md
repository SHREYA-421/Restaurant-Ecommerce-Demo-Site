# Project Structure

This document describes the directory layout of the **Restaurant‑Ecommerce‑Demo‑Site** project used for the 2nd Evaluation (frontend‑only).

```
assessment/
├── index.html            # Home page – menu preview & navigation bar
├── reservation.html      # Table reservation form page
├── contact.html          # Contact / enquiry form page
├── about.html            # Static About‑Us page
├── team.html             # Team bios page
├── auth.html             # Sign‑in / Register (static for now)
├── gallery.html          # *(optional)* Image gallery page
├── styles.css            # Global styles for the whole site
├── team.css              # Specific styles for the team page
├── auth.css              # Styles for the auth page
├── index.js              # Core JS for the homepage (search, filter, etc.)
├── reservation.js        # Reservation form handling (frontend only)
├── contact.js            # Contact form handling (frontend only)
├── utils.js              # Shared utilities – validation & JSON persistence
├── images/               # Image assets used throughout the site
└── README.md             # Project overview & 2nd‑evaluation notes
```

### Key Points
- All **HTML** files live at the root of the `assessment/` folder.
- JavaScript is modular and loaded as ES‑modules (`type="module"`).
- CSS files are separated per‑page to keep concerns isolated.
- `utils.js` contains reusable helpers for form validation and saving data as a downloadable JSON file *and* to `localStorage`.
- No server‑side code is required for the 2nd Evaluation – everything runs in the browser.

---

*Feel free to add more sub‑folders (e.g., `assets/` for fonts) if the project grows.*
