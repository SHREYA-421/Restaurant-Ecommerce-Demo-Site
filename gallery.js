const GALLERY_ITEMS = [
  {
    id: "gal-01",
    title: "The Starlit Terrace",
    category: "terrace",
    categoryLabel: "Terrace Dining",
    image: "images/terrace_dining.jpg",
    description: "Panoramic open-air dining under velvet twilight skies. Candle-lit teak tables flanked by heated Italian marble flooring.",
    featured: true
  },
  {
    id: "gal-02",
    title: "The Maharaja Imperial Suite",
    category: "private",
    categoryLabel: "Private Suites",
    image: "images/private_dining.jpg",
    description: "Exclusive royal dining hall featuring hand-gilded arches, crystal chandeliers, acoustic seclusion, and dedicated butler service.",
    featured: true
  },
  {
    id: "gal-03",
    title: "Master Chef Vikramaditya",
    category: "artisan",
    categoryLabel: "Culinary Atelier",
    image: "images/chef_portrait.jpg",
    description: "Our visionary executive chef preserving ancestral Awadhi and Mewari royal court recipes with artisanal mastery.",
    featured: false
  },
  {
    id: "gal-04",
    title: "The Royal Saffron Crown",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/hero_dish.jpg",
    description: "A signature vegetarian centerpiece garnished with 24k edible gold vark, handpicked saffron threads, and infused oils.",
    featured: false
  },
  {
    id: "gal-05",
    title: "The Grand 12-Course Thali",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/indian_thali.jpg",
    description: "Traditional banquet served in pure hand-hammered kansa bronze tableware, presenting an imperial kaleidoscope of regional delicacies.",
    featured: false
  },
  {
    id: "gal-06",
    title: "Botanical Saffron Cold Brew Lounge",
    category: "artisan",
    categoryLabel: "Beverage Atelier",
    image: "images/iced_coffee.jpg",
    description: "Slow-dripped single origin Chikmagalur coffees infused with botanical syrups, saffron cream, and floral elixirs.",
    featured: false
  },
  {
    id: "gal-07",
    title: "Live Charcoal Tandoor Grill",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/malai_chaap.jpg",
    description: "Soya kebabs char-grilled over fragrant hardwood coal, steeped in clotted cream, cracked green cardamom, and cashew essence.",
    featured: false
  },
  {
    id: "gal-08",
    title: "Old Delhi Heritage Cauldron",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/chole_bhature.jpg",
    description: "Slow-simmered dark chana masala cooked in seasoned cast-iron cauldrons, accompanied by paper-crisp puffed bhature.",
    featured: false
  },
  {
    id: "gal-09",
    title: "Crisp Puris & Herb Digestive Waters",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/golgappe.jpg",
    description: "Artisanal street food elevated to high gastronomy, paired with mountain mint water and sun-dried sonth date reduction.",
    featured: false
  },
  {
    id: "gal-10",
    title: "Poached Chenna in Saffron Nectar",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/rasmalai.jpg",
    description: "Feather-light fresh cottage cheese medallions simmered in dense saffron-infused rabri, crowned with slivered pistachios.",
    featured: false
  },
  {
    id: "gal-11",
    title: "Shahi Khoya Rose Dumplings",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/gulab_jamun.jpg",
    description: "Golden fried dumplings soaked in floral rose water and cardamom nectar, served warm with silver leaf garnish.",
    featured: false
  },
  {
    id: "gal-12",
    title: "Belgian Cacao Gelato Lounge",
    category: "culinary",
    categoryLabel: "Culinary Plating",
    image: "images/sundae.jpg",
    description: "Madagascar vanilla bean gelato paired with warm single-origin Belgian chocolate fudge and roasted caramelized almonds.",
    featured: false
  }
];

let activeFilter = "all";
let currentLightboxIndex = 0;
let isZoomed = false;

const galleryGridEl = document.getElementById("gallery-grid");
const galleryFiltersEl = document.getElementById("gallery-filters");
const galleryCounterLabel = document.getElementById("gallery-counter-label");
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxMainImg = document.getElementById("lightbox-main-img");
const lightboxIndexCounter = document.getElementById("lightbox-index-counter");
const lightboxCatBadge = document.getElementById("lightbox-cat-badge");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
const lightboxPrevBtn = document.getElementById("lightbox-prev-btn");
const lightboxNextBtn = document.getElementById("lightbox-next-btn");
const lightboxZoomBtn = document.getElementById("lightbox-zoom-btn");

function getFilteredItems() {
  if (activeFilter === "all") {
    return GALLERY_ITEMS;
  }
  return GALLERY_ITEMS.filter(item => item.category === activeFilter);
}

function renderGallery() {
  const items = getFilteredItems();
  galleryCounterLabel.textContent = `Showing ${items.length} ${items.length === 1 ? "Photograph" : "Photographs"}`;

  galleryGridEl.innerHTML = items.map((item, index) => {
    const wideClass = item.featured ? "featured-wide" : "";
    return `
      <article class="gallery-card ${wideClass}" data-id="${item.id}" data-index="${index}">
        <img src="${item.image}" alt="${item.title}" class="gallery-card-img" loading="lazy">
        <div class="gallery-card-overlay">
          <span class="gallery-badge">${item.categoryLabel}</span>
          <div class="gallery-card-info">
            <div class="gallery-text">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
            <div class="gallery-zoom-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function openLightbox(index) {
  const items = getFilteredItems();
  if (index < 0 || index >= items.length) return;

  currentLightboxIndex = index;
  const currentItem = items[currentLightboxIndex];

  lightboxMainImg.src = currentItem.image;
  lightboxMainImg.alt = currentItem.title;
  lightboxIndexCounter.textContent = `${currentLightboxIndex + 1} / ${items.length}`;
  lightboxCatBadge.textContent = currentItem.categoryLabel;
  lightboxTitle.textContent = currentItem.title;
  lightboxDesc.textContent = currentItem.description;

  isZoomed = false;
  lightboxMainImg.classList.remove("zoomed");

  lightboxModal.showModal();
}

function closeLightbox() {
  lightboxModal.close();
  isZoomed = false;
  lightboxMainImg.classList.remove("zoomed");
}

function showPrevImage() {
  const items = getFilteredItems();
  currentLightboxIndex = (currentLightboxIndex - 1 + items.length) % items.length;
  openLightbox(currentLightboxIndex);
}

function showNextImage() {
  const items = getFilteredItems();
  currentLightboxIndex = (currentLightboxIndex + 1) % items.length;
  openLightbox(currentLightboxIndex);
}

function toggleZoom() {
  isZoomed = !isZoomed;
  if (isZoomed) {
    lightboxMainImg.classList.add("zoomed");
  } else {
    lightboxMainImg.classList.remove("zoomed");
  }
}

galleryFiltersEl.addEventListener("click", e => {
  const btn = e.target.closest(".gallery-pill");
  if (!btn) return;

  document.querySelectorAll(".gallery-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderGallery();
});

galleryGridEl.addEventListener("click", e => {
  const card = e.target.closest(".gallery-card");
  if (!card) return;

  const index = parseInt(card.dataset.index, 10);
  openLightbox(index);
});

lightboxCloseBtn.addEventListener("click", closeLightbox);
lightboxPrevBtn.addEventListener("click", showPrevImage);
lightboxNextBtn.addEventListener("click", showNextImage);
lightboxZoomBtn.addEventListener("click", toggleZoom);

lightboxModal.addEventListener("click", e => {
  if (e.target === lightboxModal) {
    closeLightbox();
  }
});

document.addEventListener("keydown", e => {
  if (!lightboxModal.open) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    showPrevImage();
  } else if (e.key === "ArrowRight") {
    showNextImage();
  }
});

renderGallery();
