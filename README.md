<div align="center">

# 👑 THE SAFFRON PLATE
### *Fine Dining & Royal Pure Vegetarian Kitchen*

**An ultra-luxurious, multi-page culinary web platform blending royal Indian culinary heritage with modern gastronomy interface aesthetics.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![JSON](https://img.shields.io/badge/Local_JSON_Export-000000?style=for-the-badge&logo=json&logoColor=white)](https://www.json.org/)

[Live Overview](#-overview) • [2nd Evaluation Parameters](#-web-project---2nd-evaluation-implementation-matrix) • [Interactive Features](#-interactive-features--javascript-architecture) • [Design System](#-design-system--tokens) • [Signature Menu](#-signature-menu-delicacies) • [File Structure](#-project-directory-structure) • [Demo & Testing](#-getting-started--examiner-testing-guide) • [Team](#-project-team)

---

</div>

## 🌟 Overview

**The Saffron Plate** is a web application developed for fine-dining hospitality. The platform represents an authentic Indian royal culinary experience through world-class digital gastronomy interfaces (drawing aesthetic inspiration from *LUMIÈRE* and high-end Michelin-starred portfolios).

Built with **semantic HTML5, vanilla CSS3 design tokens, and modular vanilla JavaScript (ES6+)**, the application emphasizes responsive typography, glassmorphism card surfaces, gold highlight accents, interactive culinary exploration, and pure client-side data persistence with local JSON file generation.

---

## 🎯 Web Project - 2nd Evaluation Implementation Matrix

The project fulfills all four mandatory parameters of the **2nd Evaluation Rubric** using pure client-side architecture (no Node.js or external API dependencies required at this stage):

| Evaluation Parameter | Academic Requirement | Implementation in The Saffron Plate | Key Files |
| :--- | :--- | :--- | :--- |
| **Parameter 1: Multi-Page Linking** | Additional pages to be implemented, fully interlinked with consistent navigation. | Built **6 distinct, fully interconnected pages** with synchronized navigation bars (overlay state, active page indicator, brand link, and full footer sitemap). | `index.html`, `about.html`, `reservation.html`, `team.html`, `contact.html`, `auth.html` |
| **Parameter 2: JavaScript Interactions** | Form validation, event handling, UX interactions, responsive animations. | Live keyword search, dynamic category tab filtering, real-time category counter badges, interactive lightbox modal previews, date picker bounds, input error shaking (`.input-error`). | `index.js`, `about.js`, `team.js`, `styles.css` |
| **Parameter 3: Form Submissions** | Robust form submission handling with real-time feedback and state management. | Forms intercept `submit` events (`e.preventDefault()`), validate inputs, present feedback alerts (`.form-msg.success` and `.form-msg.error`), and auto-reset on completion. | `reservation.js`, `contact.js`, `auth.js` |
| **Parameter 4: Saving Form Data to Local JSON** | Submitted form records saved to downloadable local JSON files on the computer. | Form submissions are stored and accumulated in `localStorage` and automatically downloaded as formatted `.json` files (`reservations.json` & `contacts.json`). Includes dedicated one-click export buttons and live record counters. | `reservation.js`, `contact.js`, `styles.css` |

---

## ⚡ Interactive Features & JavaScript Architecture

### 1. Menu Live Search & Category Filtering (`index.js`)
- **Real-Time Keyword Filtering**: Instant query evaluation across dish names and ingredient descriptions as the user types.
- **Category Filter Tabs**: One-click filtering across categories (*Royal Classics, Street Specials, Asian Gourmet, Desserts, Beverages*).
- **Dynamic Category Counts**: Automated counting of items per category badge (`.tab-count`).
- **Graceful Empty State**: If no dishes match the criteria, a custom `#no-results-state` card is displayed with an instant reset button.
- **Live Search Clear**: Interactive `×` clear icon that resets the query and restores full view with focus management.

### 2. Multi-Card Lightbox Preview Modals (`index.js`, `about.js`, `team.js`)
- High-resolution modal overlays when clicking any menu card, heritage story photo, or team contributor card.
- Displays dish image, category tag, full gastronomic description, and price.
- **Comprehensive Dismissal UX**:
  - Click on top-right close icon (`×`).
  - Click anywhere outside modal content (backdrop overlay).
  - Press keyboard `Escape` key (automatically cleans up event listener).

### 3. Smart Form Validation & Error Animations (`reservation.js`, `contact.js`, `auth.js`)
- **Past-Date Lock**: Reservation date input dynamically assigns `min` attribute to today's date (`new Date().toISOString().split('T')[0]`), preventing booking past dates.
- **Phone Number Validation**: Verifies phone inputs have at least 10 valid numeric digits (`/^\+?[0-9]{10,14}$/`).
- **Email Syntax Validation**: Validates RFC email format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- **Password Strength Check**: Validates guest sign-in password has a minimum of 6 characters.
- **Visual Feedback**: Erroneous input fields trigger an animated shake keyframe (`shakeError`) with crimson border styling (`.input-error`).

### 4. Client-Side Local JSON Storage & File Generator Engine
- **Storage Strategy**: Overcomes browser sandbox restrictions by accumulating entries in browser `localStorage` and serializing records with `JSON.stringify(data, null, 2)`.
- **Automatic File Download**: Form submission instantiates an in-memory `Blob` of type `application/json;charset=utf-8;` and invokes a virtual anchor download click.
- **On-Demand Export Button**: Evaluators can click the **"📥 Download All Saved (.JSON)"** button at any time to export the full cumulative database.
- **Live Counter**: UI badge displays the current count of stored submissions (e.g., `Saved in local storage: 3 reservations`).

---

## 📄 JSON Data Schemas

### A. Reservation Record (`reservations.json`)
```json
[
  {
    "id": "RES-1730114400000",
    "name": "Arjun Sharma",
    "phone": "+91 98765 43210",
    "guests": "4 Guests",
    "date": "2026-11-05",
    "time": "08:30 PM (Dinner)",
    "submittedAt": "28/10/2026, 8:00:00 pm"
  }
]
```

### B. Contact Inquiry Record (`contacts.json`)
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

## 🎨 Design System & Tokens

The visual language is structured around an ultra-luxury dark palette, royal saffron-gold metallic accents, and refined serif typography.

| Token / Color Name | Hex Code / Value | Sample | Architectural Purpose |
| :--- | :--- | :---: | :--- |
| `--bg-main` | `#171717` | `⬛` | Core viewport background canvas |
| `--bg-card` | `#211E1B` | `🟫` | Glassmorphic card surfaces, navigation, panels |
| `--heading` | `#F5EFE6` | `⬜` | High-contrast brand headers and title typography |
| `--body-text` | `#D8D0C4` | `🌫️` | Warm neutral body paragraphs and descriptive copy |
| `--gold` | `#C9A227` | `🟨` | Royal gold brand highlights, accents, borders, buttons |
| `--gold-light` | `#E0B93D` | `✨` | Interactive hover glows, focus indicators, active states |
| `--border` | `#4A4038` | `🤎` | Subtle card dividers and structural outline borders |
| `--radius-sm` | `4px` | — | Input elements, button edges, image rounding |
| `--radius-md` | `8px` | — | Card containers, modal windows, dialog surfaces |

### Typography Hierarchy
- **Brand & Section Headings**: [Cinzel](https://fonts.google.com/specimen/Cinzel) (Classical Roman Serif, `500`, `600`, `700`)
- **Editorial Subtitles & Quotes**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Display Italic, `400`, `500`)
- **Body & UI Controls**: [Jost](https://fonts.google.com/specimen/Jost) (Clean Geometric Sans-serif, `300`, `400`, `500`)

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

## 💻 Getting Started & Examiner Testing Guide

Follow these steps to run the application locally and verify all 2nd Evaluation criteria:

### 1. Repository Setup
```bash
# Clone the repository
git clone git@github.com:SHREYA-421/Restaurant-Ecommerce-Demo-Site.git

# Navigate into the project folder
cd Restaurant-Ecommerce-Demo-Site
```

### 2. Launch in Browser
- **Direct**: Double-click `index.html` to open in Google Chrome, Microsoft Edge, or Mozilla Firefox.
- **VS Code Live Server**: Right-click `index.html` and choose **Open with Live Server**.

### 3. Step-by-Step Feature Verification

#### A. Parameter 1: Page Interlinking
- Click every link in the top navigation bar and footer on every page.
- Verify that `index.html`, `about.html`, `reservation.html`, `team.html`, `contact.html`, and `auth.html` link to each other seamlessly.

#### B. Parameter 2: JavaScript Interactions & UX
- On `index.html`, test the **Live Search Bar**: Type `"Dosa"`, `"Ramen"`, or `"Chocolate"` — see instant matching.
- Click the **Category Tabs** (*Royal Classics, Desserts, Asian Gourmet*) — see instant filtering and counter updates.
- Click on any food card — verify the **Detail Lightbox Modal** opens. Dismiss it with the `×` button, by clicking outside, or by pressing `Escape`.
- On `team.html`, click any member card to preview their profile modal.

#### C. Parameter 3: Form Validation
- On `reservation.html`, click **Confirm Reservation** with empty fields: Observe the red input shaking animation (`.input-error`) and prompt.
- Enter an invalid phone number (e.g., fewer than 10 digits): Observe the validation message.
- On `contact.html`, enter an invalid email format (e.g., `user@domain` without TLD): Observe the regex error.

#### D. Parameter 4: Saving Data to Local JSON Files
- Fill out a valid reservation on `reservation.html` and submit.
- **Immediate Result**: Your browser will automatically trigger the download of **`reservations.json`**.
- Notice the live counter updates: `Saved in local storage: 1 reservation`.
- Click **"📥 Download All Saved Reservations (.JSON)"** at any time to re-export the complete JSON dataset.
- Repeat on `contact.html` to download and inspect **`contacts.json`**.

---

## 🚀 Future Roadmap: 3rd Evaluation Scope

The foundation built in this 2nd evaluation phase will seamlessly connect to the upcoming 3rd evaluation milestones:

1. **Node.js & Express Setup**: Transition from client-side `localStorage` to an Express HTTP server.
2. **RESTful Express APIs**: `POST /api/reservations` and `POST /api/contacts` to write form payloads directly into server-side JSON files using Node's `fs` module.
3. **External API Integrations**: Live weather/events data or currency conversion for international guests.
4. **MongoDB & Mongoose CRUD**: Full database schema modelling and CRUD management for menu delicacies, guest bookings, and contact inquiries.

---

## 👥 Project Team

| Contributor | Project Role & Focus Areas |
| :--- | :--- |
| **Shreya Chaudhary** | Project Lead, Repository Coordination, Styling & Interlinking |
| **Ashish Agrawal** | Menu Interactivity, Live Filtering & Search Architecture |
| **Vivek Yadav** | Form Engineering, Validation & Local JSON Storage Engine |
| **Khush Raghav** | UI/UX Prototyping, Component Aesthetics & Team Presentation |

---

<div align="center">

Crafted with Precision &amp; Heritage • **The Saffron Plate Pure Vegetarian Kitchen**  
*B.Tech Computer Science &amp; Engineering — Semester 3 Web Development Assessment*

</div>