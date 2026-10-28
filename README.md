<div align="center">

# 👑 THE SAFFRON PLATE
### *Fine Dining & Pure Vegetarian Kitchen*

An ultra-luxurious, responsive web application for **The Saffron Plate**, a high-end vegetarian restaurant blending royal Indian culinary heritage with modern gastronomy aesthetics.

[Overview](#-overview) • [Evaluation Parameters](#-web-project---2nd-evaluation-implementation) • [Design System](#-design-system--color-palette) • [Project Structure](#-file-structure) • [Team](#-project-team)

---

</div>

## 🌟 Overview

**The Saffron Plate** offers an exquisite dining experience inspired by world-class gastronomy interfaces. Crafted with **semantic HTML5, vanilla CSS3, and modern vanilla JavaScript**, the application showcases interactive guest services—including dynamic image modals, comprehensive form validation, client-side data persistence, and automatic JSON file generation.

---

## 🎯 Web Project - 2nd Evaluation Implementation

This project addresses all four parameters of the **2nd Evaluation Rubric** using pure client-side web technologies (no external API or Node.js dependencies):

| Parameter | Description & Implementation |
| :--- | :--- |
| **1. Page Linking & Interconnection** | All 6 pages (`index.html`, `about.html`, `reservation.html`, `team.html`, `contact.html`, `auth.html`) are linked consistently across navigation headers and footer directories. |
| **2. JavaScript Interactions & UX** | Interactive image lightbox modals (`index.js`, `about.js`, `team.js`), dynamic minimum date constraints, input error shaking animations (`.input-error`), and live feedback alerts. |
| **3. Form Submission & Validation** | Validation across all forms: required fields, minimum phone digit length check, email syntax regex verification, password minimum length check, and double-submission protection. |
| **4. Local JSON File Saving** | Form submissions are stored and accumulated in `localStorage` and automatically exported as downloadable local JSON files (`reservations.json` & `contacts.json`). Each form also includes a dedicated **"Download All Saved (.JSON)"** button and live counter. |

---

## ✨ Key Design & Architectural Features

- 🌌 **Overlay Navigation Bar**: Transparent header overlaying the full-bleed hero backdrop image.
- 🖼️ **Interactive Lightbox Modals**: Click-to-preview modals on culinary dishes, restaurant heritage photos, and team member profile cards.
- 🍷 **Table Reservation Engine**: Date picker with automatic past-date blocking, guest count selection, time slots, and instant JSON ticket generation.
- 📬 **Guest Inquiries System**: Contact form with real-time email syntax validation and JSON export.
- 🔐 **Account Access Portal**: Guest sign-in validation and simulated session storage.
- 📜 **13 Signature Menu Delicacies**: High-resolution photography cards featuring classic Indian, Asian, South Indian, and dessert creations.
- 🎨 **Royal Indian Aesthetics**: Glassmorphism surfaces, gold accents, smooth micro-interactions, and refined typography.

---

## 🎨 Design System & Color Palette

The color scheme evokes royal Indian heritage, warm hospitality, and timeless luxury.

| Color Name | Hex Code | Visual Sample | Usage |
| :--- | :--- | :---: | :--- |
| **Main Background** | `#171717` | `⬛` | Page background canvas |
| **Card & Bar Surface** | `#211E1B` | `🟫` | Navbar, cards, reservation bar & footer |
| **Primary Heading** | `#F5EFE6` | `⬜` | Brand titles, section headers & quote text |
| **Body Paragraph** | `#D8D0C4` | `🌫️` | Descriptive text, subheadings & footer links |
| **Gold Highlight** | `#C9A227` | `🟨` | Buttons, prices, icons & borders |
| **Border Divider** | `#4A4038` | `🤎` | Card outlines & section dividers |
| **Gold Hover Glow** | `#E0B93D` | `✨` | Interactive hover states & callouts |

---

## 📁 File Structure

```
assessment/
├── index.html          # Main Homepage & Menu Showcase
├── index.js            # Culinary card modal preview interactions
├── styles.css          # Core Design System, Animations & Global Styles
├── about.html          # About Us & Restaurant Heritage
├── about.js            # Heritage gallery modal preview interactions
├── about.css           # About Page Styles
├── reservation.html    # Table Reservation Form & JSON Export UI
├── reservation.js      # Reservation validation, localStorage & JSON generator
├── reservation.css     # Reservation Page Styles
├── contact.html        # Contact & Inquiries Page & JSON Export UI
├── contact.js          # Contact validation, regex checking & JSON generator
├── contact.css         # Contact Page Styles
├── team.html           # Project Team Showcase Page
├── team.js             # Team member image preview interactions
├── team.css            # Team Page Styles
├── auth.html           # Guest Account Access / Sign In
├── auth.js             # Sign-in validation & session management
├── auth.css            # Auth Page Styles
├── README.md           # Project Documentation
└── images/             # High-Resolution Photography Assets
```

---

## 👥 Project Team

- **Vivek Yadav**
- **Ashish Agrawal**
- **Shreya Chaudhary**
- **Khush Raghav**

---

## 💻 Getting Started

To run and test this project locally:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:SHREYA-421/Restaurant-Ecommerce-Demo-Site.git
   ```
2. **Open the project folder**:
   ```bash
   cd Restaurant-Ecommerce-Demo-Site
   ```
3. **Launch in Browser**:
   - Double-click `index.html` to open in any web browser, or
   - Right-click `index.html` in VS Code and select **Open with Live Server**.

### Testing Evaluation Features:
- **Table Reservations**: Open `reservation.html`, fill out the form, and click **Confirm Reservation**. The browser will validate inputs, persist the data, and download `reservations.json`.
- **Contact Inquiries**: Open `contact.html`, enter a message, and click **Send Message** to export `contacts.json`.
- **Export History**: Use the **"📥 Download All Saved (.JSON)"** button on either form to download all previously saved submissions.

---

## ✒️ Typography & Fonts

- **Headings & Brand**: [Cinzel](https://fonts.google.com/specimen/Cinzel) (Serif)
- **Subtitles & Quotes**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Display Italic)
- **Body & UI Elements**: [Jost](https://fonts.google.com/specimen/Jost) (Clean Sans-serif)

---

<div align="center">

Crafted with Excellence &amp; Precision • **The Saffron Plate Pure Vegetarian Kitchen**

</div>