<div align="center">

# 👑 THE SAFFRON PLATE
### *Fine Dining & Royal Pure Vegetarian Kitchen*

**An ultra-luxurious, responsive culinary web platform blending royal Indian culinary heritage with modern gastronomy interface aesthetics.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![JSON](https://img.shields.io/badge/Local_JSON_Export-000000?style=for-the-badge&logo=json&logoColor=white)](https://www.json.org/)
[![No External Dependencies](https://img.shields.io/badge/Dependencies-Zero_Vanilla-success?style=for-the-badge)](https://developer.mozilla.org/)

[About The Project](#-about-the-project) • [Key Features](#-key-features) • [Technical Architecture & Logics](#-technical-architecture--logics) • [Signature Menu](#-signature-menu-delicacies) • [Design System](#-design-system--tokens) • [Project Structure](#-project-directory-structure) • [Getting Started](#-getting-started) • [Contributors](#-project-contributors)

---

</div>

## 🌟 About The Project

**The Saffron Plate** is a high-end web platform designed for an exquisite, pure-vegetarian fine-dining restaurant. Inspired by royal Indian culinary traditions and world-class digital hospitality interfaces, the project delivers a refined gastronomic journey right inside the browser.

The website is crafted entirely with **semantic HTML5, modern vanilla CSS3 design tokens, and modular vanilla JavaScript (ES6+)**—with zero third-party framework overhead. It delivers instant performance, silky micro-interactions, responsive grids, rich imagery, and client-side data persistence with local JSON file generation.

---

## ✨ Key Features

### 🔍 1. Interactive Menu Explorer with Live Search & Tabs
- **Instant Keyword Search**: Filter dishes in real time by searching for dish names or ingredients (e.g. *"Dosa"*, *"Paneer"*, *"Ramen"*, *"Truffle"*).
- **Category Filter Tabs**: Explore culinary offerings categorized into *All Items*, *Royal Classics*, *Street Specials*, *Asian Gourmet*, *Desserts*, and *Beverages*.
- **Dynamic Category Count Badges**: Real-time counters showing the number of available items per category.
- **Live Search Clear**: An intuitive clear icon (`×`) resets the query and restores full view instantly.
- **Empty State Feedback**: If no dishes match the query, a dedicated empty-state banner appears with a one-click reset action.

### 🖼️ 2. High-Resolution Lightbox Modal Overlays
- Clicking on any culinary card, heritage gallery photo, or team profile opens a rich modal dialog.
- Displays full-bleed imagery, category tags, gastronomic descriptions, and pricing.
- **Full Dismissal UX**: Close by clicking the top-right `×` button, clicking the dark backdrop outside the modal, or simply pressing the keyboard `Escape` key.

### 🍷 3. Table Reservation Booking System
- Comprehensive booking form collecting guest details, phone number, party size, reservation date, and preferred dining time slot.
- **Dynamic Past-Date Lockout**: The date picker automatically disables past dates using the current client date as the minimum selectable date.
- **Input Validation**: Ensures all required fields are present with a valid phone number.
- **Instant JSON Ticket Generation**: Submitting the form automatically compiles the reservation into a local `reservations.json` file and downloads it to the user's computer.
- **On-Demand JSON Export**: Includes a dedicated button to export all accumulated reservations at any time.

### 📬 4. Guest Inquiries & Contact Portal
- Dedicated inquiries form with real-time email syntax verification (regex-based).
- Direct address, operating support hours, direct phone link, and email dispatch links.
- Automatically saves and exports submitted inquiries into a downloadable `contacts.json` file.

### 🔐 5. Guest Account Access (Sign In / Register)
- Clean, focused account portal with email format and minimum password length validation.
- Input error indicators with shake keyframe animations.
- Simulates guest authentication state with feedback notifications.

### 👥 6. Interactive Team Showcase
- Dedicated page highlighting the creators and contributors of The Saffron Plate.
- Hover animations with elevation effects, golden borders, and click-to-preview profile lightboxes.

---

## ⚡ Technical Architecture & Logics

The project is structured cleanly using standard web technologies without external package managers or bundlers:

```
┌─────────────────────────────────────────────────────────────┐
│                       USER INTERFACE                        │
│   index.html • about.html • reservation.html • contact.html │
│                 team.html • auth.html                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│       STYLE ARCHITECTURE     │ │      JAVASCRIPT LOGICS       │
│  styles.css (Global tokens)  │ │  index.js (Filter & Modal)   │
│  Page-specific CSS modules   │ │  reservation.js (JSON Store) │
│  Backdrop filters & glow     │ │  contact.js (Regex & Export) │
│  Keyframe error animations   │ │  auth.js (Validation)       │
│  Responsive flex/grid        │ │  team.js & about.js (Modals) │
└──────────────────────────────┘ └──────────────┬───────────────┘
                                                │
                                                ▼
                               ┌────────────────────────────────┐
                               │     CLIENT-SIDE PERSISTENCE    │
                               │   localStorage Data Stores     │
                               │   Blob API & URL.createObjectURL│
                               │   Direct JSON File Downloads   │
                               └────────────────────────────────┘
```

### 1. Menu Filtering & Search Logic (`index.js`)
The filtering logic runs on input events and tab clicks:
1. It retrieves the sanitized search string and active category.
2. Loops through each `.culinary-card` and checks:
   - Does the card's `data-category` match the active tab (or is `'all'` selected)?
   - Does the dish title or description contain the search string?
3. Matches are set to `display: flex`, while non-matches are hidden (`display: none`).
4. If no dishes match, the `#no-results-state` card is displayed.

### 2. Form Validation & UX Feedback (`reservation.js`, `contact.js`, `auth.js`)
Form submissions intercept the default submission event via `e.preventDefault()`:
- **Phone Validation**: Cleaned of spaces/dashes and validated against `/^\+?[0-9]{10,14}$/`.
- **Email Validation**: Checked against standard RFC email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- **Error Indication**: Invalid inputs receive the `.input-error` class, triggering a 0.35s CSS horizontal shake animation (`shakeError`) with crimson border styling.
- **Success Indication**: Valid entries produce a `.form-msg.success` banner with green accents and formatted confirmation details.

### 3. Local JSON File Generation Engine
Because client-side JavaScript operates inside a browser security sandbox without direct write access to system folders, the application leverages the **Web Blob API**:
```javascript
function downloadJsonFile(data, filename) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```
1. New submissions are appended to an array in `localStorage` (`saffron_reservations` and `saffron_contacts`), ensuring records persist even after page reloads.
2. The complete accumulated list is serialized and downloaded as a formatted `.json` file.
3. The UI counter badge (`#res-count` and `#contact-count`) updates dynamically to reflect the total stored records.

---

## 📄 JSON Data Formats

### `reservations.json`
```json
[
  {
    "id": "RES-1730114400000",
    "name": "Aarav Sharma",
    "phone": "+91 98765 43210",
    "guests": "4 Guests",
    "date": "2026-11-05",
    "time": "08:30 PM (Dinner)",
    "submittedAt": "28/10/2026, 8:00:00 pm"
  }
]
```

### `contacts.json`
```json
[
  {
    "id": "CNT-1730114400000",
    "name": "Priya Nair",
    "email": "priya.nair@example.com",
    "subject": "Private Banquet Booking",
    "message": "Inquiring about reserving the terrace dining garden for 25 guests.",
    "submittedAt": "28/10/2026, 8:05:00 pm"
  }
]
```

---

## 📜 Signature Menu Delicacies

| # | Category | Delicacy | Gastronomic Description | Price |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **Royal Classic / Street** | **Chole Bhature** | Pillowy fried bhature with slow-simmered dark chana masala, pickle & ginger juliennes | ₹120 |
| 2 | **Street Special** | **Golgappe** | Crisp semolina puris with spiced potato sprouts, sweet tamarind & chilled mint-coriander water | ₹80 |
| 3 | **Dessert / Royal** | **Gulab Jamun** | Handcrafted khoya dumplings infused with green cardamom, soaked in warm saffron syrup | ₹70 |
| 4 | **Asian Gourmet** | **Hakka Noodles** | Wok-tossed noodles with farm-fresh vegetables, roasted garlic & toasted sesame oil | ₹150 |
| 5 | **Luxury Dessert** | **Hot Fudge Sundae** | Vanilla bean gelato topped with warm dark chocolate fudge, roasted almonds & maraschino cherry | ₹140 |
| 6 | **Royal Classic** | **Maharaja Indian Thali** | Royal feast of Paneer Butter Masala, Dal Makhani, Mix Veg, Pulao, Butter Naan & Sweet Lassi | ₹280 |
| 7 | **Royal Classic** | **Malai Chaap** | Char-grilled soya skewers in rich cream, cashew paste, green cardamom & micro herbs | ₹180 |
| 8 | **South Indian** | **Masala Dosa** | Golden crispy fermented crepe filled with spiced potato masala, served with coconut chutney & sambar | ₹135 |
| 9 | **Asian Gourmet** | **Momos** | Steamed vegetable dumplings packed with aromatic herbs, served with fiery red chutney | ₹110 |
| 10 | **Asian Gourmet** | **Ramen** | Slow-simmered rich vegetarian miso broth with hand-pulled noodles, bok choy & wood ear mushrooms | ₹190 |
| 11 | **Signature Dessert** | **Rasmalai** | Delicate chenna discs gently simmered in saffron milk, garnished with pistachio slivers | ₹90 |
| 12 | **Cold Refreshment** | **Strawberry Shake** | Churned organic Mahabaleshwar strawberry shake topped with double cream & white chocolate curls | ₹130 |
| 13 | **Artisan Coffee** | **Iced Coffee** | Slow-dripped Arabica cold brew blended with sweetened cream, dark cocoa & roasted hazelnuts | ₹125 |

---

## 🎨 Design System & Tokens

The aesthetic identity is defined by a curated luxury color palette, refined serif headings, clean body typography, and subtle micro-interactions:

| Token | Hex Value | Visual | Architectural Usage |
| :--- | :--- | :---: | :--- |
| `--bg-main` | `#171717` | `⬛` | Page background canvas |
| `--bg-card` | `#211E1B` | `🟫` | Glassmorphic card surfaces, navigation, panels |
| `--heading` | `#F5EFE6` | `⬜` | High-contrast brand headers and title typography |
| `--body-text` | `#D8D0C4` | `🌫️` | Warm neutral body paragraphs and descriptive copy |
| `--gold` | `#C9A227` | `🟨` | Royal gold brand highlights, accents, borders, buttons |
| `--gold-light` | `#E0B93D` | `✨` | Interactive hover glows, focus indicators, active states |
| `--border` | `#4A4038` | `🤎` | Subtle card dividers and structural outline borders |
| `--radius-sm` | `4px` | — | Input elements, button edges, image rounding |
| `--radius-md` | `8px` | — | Card containers, modal windows, dialog surfaces |

### Typography Hierarchy
- **Brand & Headings**: [Cinzel](https://fonts.google.com/specimen/Cinzel) — Classical Roman Serif (`500`, `600`, `700`)
- **Quotes & Subtitles**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — Display Italic (`400`, `500`)
- **Body & Controls**: [Jost](https://fonts.google.com/specimen/Jost) — Clean Sans-serif (`300`, `400`, `500`)

---

## 📁 Project Directory Structure

```
assessment/
├── index.html          # Main Homepage, Hero Section & Interactive Menu Showcase
├── index.js            # Live search, category tab filter engine & dish modal lightbox
├── styles.css          # Design system tokens, layout grids, animations & feedback styles
├── about.html          # Restaurant Heritage, Culinary Philosophy & Ambiance
├── about.js            # Heritage gallery photo preview modal with Escape dismissal
├── about.css           # About page grid and story layout styling
├── reservation.html    # Table Reservation Form & JSON Export Interface
├── reservation.js      # Date locking, phone validation, localStorage & JSON generator
├── reservation.css     # Reservation page layout and responsive form styles
├── contact.html        # Guest Inquiries Form, Contact Details & Support Hours
├── contact.js          # Email regex validation, inquiry persistence & JSON export
├── contact.css         # Contact split-grid layout and inquiry form styles
├── team.html           # Project Contributors Showcase Page
├── team.js             # Team member modal lightbox with role details & key dismissal
├── team.css            # Team grid layout, hover elevation & image cover proportions
├── auth.html           # Guest Account Portal / Sign-In Interface
├── auth.js             # Form validation, email format checking & session management
├── auth.css            # Authentication card and input container styles
├── README.md           # Comprehensive Technical Documentation
└── images/             # 21 High-Resolution Photography Assets
    ├── ashish_agrawal.jpg
    ├── chef_portrait.jpg
    ├── chole_bhature.jpg
    ├── golgappe.jpg
    ├── gulab_jamun.jpg
    ├── hakka_noodles.jpg
    ├── hero_dish.jpg
    ├── iced_coffee.jpg
    ├── indian_thali.jpg
    ├── khush_raghav.jpg
    ├── malai_chaap.jpg
    ├── masala_dosa.jpg
    ├── momos.jpg
    ├── private_dining.jpg
    ├── ramen.jpg
    ├── rasmalai.jpg
    ├── shreya_chaudhary.jpg
    ├── strawberry_shake.jpg
    ├── sundae.jpg
    ├── terrace_dining.jpg
    └── vivek_yadav.jpg
```

---

## 💻 Getting Started

You can run the project locally on any operating system without installing any runtime or package managers.

### 1. Clone Repository
```bash
git clone git@github.com:SHREYA-421/Restaurant-Ecommerce-Demo-Site.git
cd Restaurant-Ecommerce-Demo-Site
```

### 2. Open in Browser
- **Direct**: Double click `index.html` to open directly in Google Chrome, Microsoft Edge, Safari, or Firefox.
- **VS Code Live Server**: Right-click `index.html` in VS Code and select **Open with Live Server**.

### 3. Exploring the Platform
1. **Explore the Menu**: Type into the search bar or switch category tabs to filter delicacies in real time.
2. **Preview Delicacies**: Click any dish card to view the lightbox modal with high-res photography and descriptions.
3. **Book a Table**: Visit the **Reservations** page, pick a date and party size, and confirm to see the automatic `reservations.json` download.
4. **Send an Inquiry**: Fill out the **Contact** page to test input validation and download `contacts.json`.
5. **Meet the Team**: Browse the **Our Team** page to preview contributor profiles.

---

## 👥 Project Contributors

| Contributor | Focus Areas |
| :--- | :--- |
| **Shreya Chaudhary** | Project Lead, Repository Architecture, Styling & Interlinking |
| **Ashish Agrawal** | Menu Interactivity, Live Filtering & Search Engine |
| **Vivek Yadav** | Form Engineering, Validation & Local JSON Storage Engine |
| **Khush Raghav** | UI/UX Prototyping, Component Aesthetics & Visual Assets |

---

<div align="center">

Crafted with Precision &amp; Heritage • **The Saffron Plate Pure Vegetarian Kitchen**

</div>