const MENU_ITEMS = [
  {
    id: "thali-01",
    name: "Maharaja Indian Thali",
    category: "royal-classics",
    price: 280,
    tags: ["chef", "jain"],
    image: "images/indian_thali.jpg",
    badge: "Royal Banquet",
    description: "Paneer Butter Masala, Dal Makhani, Seasonal Vegetables, Jeera Pulao, Butter Naan, Gulab Jamun & Sweet Lassi."
  },
  {
    id: "chaap-02",
    name: "Malai Chaap",
    category: "royal-classics",
    price: 180,
    tags: ["mild"],
    image: "images/malai_chaap.jpg",
    badge: "Tandoor Special",
    description: "Char-grilled soya skewers marinated in rich clotted cream, cashew nut paste, green cardamom and micro-greens."
  },
  {
    id: "chole-03",
    name: "Chole Bhature",
    category: "royal-classics",
    price: 120,
    tags: ["spicy"],
    image: "images/chole_bhature.jpg",
    badge: "Old Delhi Heritage",
    description: "Pillowy puffed bhature paired with slow-simmered dark chana masala, mango pickle and pickled ginger juliennes."
  },
  {
    id: "golgappe-04",
    name: "Golgappe",
    category: "street-specials",
    price: 80,
    tags: ["spicy", "jain"],
    image: "images/golgappe.jpg",
    badge: "Street Artisan",
    description: "Crisp artisanal semolina puris filled with spiced potato sprouts, sweet date chutney & chilled digestive mint water."
  },
  {
    id: "momos-05",
    name: "Steamed Vegetable Momos",
    category: "street-specials",
    price: 110,
    tags: ["spicy"],
    image: "images/momos.jpg",
    badge: "Himalayan Classic",
    description: "Delicate thin-skinned dumplings packed with garden-fresh greens and mountain herbs, served with fiery roasted tomato dip."
  },
  {
    id: "hakka-06",
    name: "Wok-Tossed Hakka Noodles",
    category: "asian-gourmet",
    price: 150,
    tags: ["chef"],
    image: "images/hakka_noodles.jpg",
    badge: "Gourmet Asian",
    description: "Handcrafted wheat noodles tossed over high flame with crunchy bell peppers, roasted garlic, spring onion & pure sesame oil."
  },
  {
    id: "ramen-07",
    name: "Artisan Vegetarian Ramen",
    category: "asian-gourmet",
    price: 190,
    tags: ["chef"],
    image: "images/ramen.jpg",
    badge: "Signature Bowl",
    description: "Slow-simmered rich vegetarian miso-shiitake broth with hand-pulled noodles, braised tofu, bok choy and wood ear mushrooms."
  },
  {
    id: "dosa-08",
    name: "Mysore Masala Dosa",
    category: "south-indian",
    price: 135,
    tags: ["spicy", "jain"],
    image: "images/masala_dosa.jpg",
    badge: "Crispy Delight",
    description: "Golden crispy fermented crepe layered with fiery red chili paste and spiced potato mash, served with coconut chutney and sambar."
  },
  {
    id: "gulab-09",
    name: "Shahi Gulab Jamun",
    category: "desserts",
    price: 70,
    tags: ["mild", "jain"],
    image: "images/gulab_jamun.jpg",
    badge: "Sweet Legacy",
    description: "Handcrafted khoya dumplings fried golden in pure desi ghee and soaked in warm Kashmiri saffron and Damask rose syrup."
  },
  {
    id: "rasmalai-10",
    name: "Kesar Pista Rasmalai",
    category: "desserts",
    price: 90,
    tags: ["mild", "jain"],
    image: "images/rasmalai.jpg",
    badge: "Royal Sweet",
    description: "Velvety chenna patties gently poached in thickened saffron milk, lavishly garnished with Persian pistachios and silver leaf."
  },
  {
    id: "sundae-11",
    name: "Belgian Hot Fudge Sundae",
    category: "desserts",
    price: 140,
    tags: ["mild"],
    image: "images/sundae.jpg",
    badge: "Lounge Dessert",
    description: "Artisanal Madagascar vanilla bean gelato drenched in warm 70% dark Belgian cocoa fudge, roasted almonds and cherries."
  },
  {
    id: "shake-12",
    name: "Mahabaleshwar Strawberry Shake",
    category: "beverages",
    price: 130,
    tags: ["mild", "jain"],
    image: "images/strawberry_shake.jpg",
    badge: "Chilled Refreshment",
    description: "Freshly churned farm strawberry puree with organic milk, double cream crown and imported white chocolate shavings."
  },
  {
    id: "coffee-13",
    name: "Imperial Saffron Cold Brew",
    category: "beverages",
    price: 110,
    tags: ["chef"],
    image: "images/iced_coffee.jpg",
    badge: "Barista Special",
    description: "18-hour cold brew made from single-estate Chikmagalur Arabica beans infused with royal saffron essence and condensed milk."
  },
  {
    id: "chef-14",
    name: "The Royal Platter Special",
    category: "royal-classics",
    price: 450,
    tags: ["chef"],
    image: "images/hero_dish.jpg",
    badge: "Executive Masterpiece",
    description: "Curated chef selection showcasing tandoori delicacies, saffron rice pilaf, artisan stuffed kulcha, and signature dessert duo."
  }
];

let cart = [];
try {
  const savedCart = localStorage.getItem("saffron_order_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  cart = [];
}

let activeCategory = "all";
let activeDietTag = null;
let searchQuery = "";
let discountAmount = 0;
let appliedPromoCode = "";

const menuGridEl = document.getElementById("menu-items-grid");
const noResultsEl = document.getElementById("no-results-box");
const resultsCountEl = document.getElementById("results-count");
const categoryTitleEl = document.getElementById("current-category-title");
const searchInput = document.getElementById("menu-search-input");
const searchClearBtn = document.getElementById("search-clear-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const emptyCartBrowseBtn = document.getElementById("empty-cart-browse-btn");
const cartItemsListEl = document.getElementById("cart-items-list");
const cartEmptyStateEl = document.getElementById("cart-empty-state");
const cartCounterEl = document.getElementById("cart-counter");
const cartQuickTotalEl = document.getElementById("cart-quick-total");
const cartSummarySubtitleEl = document.getElementById("cart-summary-subtitle");
const billSubtotalEl = document.getElementById("bill-subtotal");
const billDiscountEl = document.getElementById("bill-discount");
const billDeliveryEl = document.getElementById("bill-delivery");
const billTaxEl = document.getElementById("bill-tax");
const billTotalEl = document.getElementById("bill-total");
const rowDiscountEl = document.getElementById("row-discount");
const promoCodeInput = document.getElementById("promo-code-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const promoFeedbackMsg = document.getElementById("promo-feedback-msg");
const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const checkoutForm = document.getElementById("checkout-form");
const modalPayableAmount = document.getElementById("modal-payable-amount");
const orderSuccessModal = document.getElementById("order-success-modal");
const continueShoppingBtn = document.getElementById("continue-shopping-btn");
const toastNotifyEl = document.getElementById("toast-notify");

function saveCart() {
  try {
    localStorage.setItem("saffron_order_cart", JSON.stringify(cart));
  } catch (e) {}
}

function showToast(message) {
  toastNotifyEl.textContent = message;
  toastNotifyEl.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toastNotifyEl.classList.remove("show");
  }, 2800);
}

function getFilteredMenu() {
  return MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesDiet = !activeDietTag || (item.tags && item.tags.includes(activeDietTag));
    const term = searchQuery.toLowerCase().trim();
    const matchesSearch = !term ||
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.badge.toLowerCase().includes(term);
    return matchesCategory && matchesDiet && matchesSearch;
  });
}

function renderMenu() {
  const items = getFilteredMenu();
  resultsCountEl.textContent = `${items.length} ${items.length === 1 ? "Item" : "Items"}`;

  if (items.length === 0) {
    menuGridEl.innerHTML = "";
    noResultsEl.hidden = false;
    return;
  }

  noResultsEl.hidden = true;
  menuGridEl.innerHTML = items.map(dish => {
    const cartItem = cart.find(c => c.id === dish.id);
    const inCartQty = cartItem ? cartItem.qty : 0;

    let buttonMarkup = "";
    if (inCartQty > 0) {
      buttonMarkup = `
        <div class="qty-control-group">
          <button class="qty-btn" type="button" data-action="decrement" data-id="${dish.id}" aria-label="Decrease">&minus;</button>
          <span class="qty-display">${inCartQty}</span>
          <button class="qty-btn" type="button" data-action="increment" data-id="${dish.id}" aria-label="Increase">&#43;</button>
        </div>
      `;
    } else {
      buttonMarkup = `
        <button class="add-cart-btn" type="button" data-action="add" data-id="${dish.id}">
          &#43; Add To Feast
        </button>
      `;
    }

    return `
      <article class="food-card" data-dish-id="${dish.id}">
        <div class="food-card-img-wrap">
          <img src="${dish.image}" alt="${dish.name}" class="food-card-img" loading="lazy">
          <span class="food-badge">${dish.badge}</span>
          <div class="food-veg-symbol" title="100% Pure Vegetarian"></div>
        </div>
        <div class="food-card-body">
          <span class="food-category-label">${dish.category.replace("-", " ")}</span>
          <h3 class="food-title">${dish.name}</h3>
          <p class="food-desc">${dish.description}</p>
          <div class="food-card-footer">
            <span class="food-price">&#8377;${dish.price}</span>
            <div class="food-action-slot">
              ${buttonMarkup}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCounterEl.textContent = totalCount;
  cartQuickTotalEl.textContent = `₹${subtotal}`;
  cartSummarySubtitleEl.textContent = `${totalCount} ${totalCount === 1 ? "item" : "items"} selected`;

  if (cart.length === 0) {
    cartEmptyStateEl.style.display = "block";
    cartItemsListEl.innerHTML = "";
    discountAmount = 0;
    appliedPromoCode = "";
    promoFeedbackMsg.textContent = "";
    promoFeedbackMsg.className = "promo-feedback";
    promoCodeInput.value = "";
    rowDiscountEl.hidden = true;
    proceedCheckoutBtn.disabled = true;
    proceedCheckoutBtn.style.opacity = "0.6";
  } else {
    cartEmptyStateEl.style.display = "none";
    proceedCheckoutBtn.disabled = false;
    proceedCheckoutBtn.style.opacity = "1";

    cartItemsListEl.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">&#8377;${item.price} &times; ${item.qty} = &#8377;${item.price * item.qty}</span>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control-group">
            <button class="qty-btn" type="button" data-action="cart-decrement" data-id="${item.id}">&minus;</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" type="button" data-action="cart-increment" data-id="${item.id}">&#43;</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  const deliveryFee = subtotal > 400 || subtotal === 0 ? 0 : 40;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxes = Math.round(taxableAmount * 0.05);
  const grandTotal = subtotal === 0 ? 0 : taxableAmount + deliveryFee + taxes;

  billSubtotalEl.textContent = `₹${subtotal}`;
  billDeliveryEl.textContent = subtotal === 0 ? "₹0" : (deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`);
  billTaxEl.textContent = `₹${taxes}`;
  billTotalEl.textContent = `₹${grandTotal}`;
  modalPayableAmount.textContent = `₹${grandTotal}`;

  if (discountAmount > 0) {
    rowDiscountEl.hidden = false;
    billDiscountEl.textContent = `-₹${discountAmount}`;
  } else {
    rowDiscountEl.hidden = true;
  }
}

function addToCart(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  const existing = cart.find(c => c.id === dishId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      qty: 1
    });
  }

  saveCart();
  renderCart();
  renderMenu();
  showToast(`Added ${dish.name} to order`);
}

function updateCartQty(dishId, delta) {
  const index = cart.findIndex(c => c.id === dishId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    showToast(`Removed ${removedName}`);
  }

  saveCart();
  renderCart();
  renderMenu();
}

function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function applyCoupon() {
  const code = promoCodeInput.value.trim().toUpperCase();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (subtotal === 0) {
    promoFeedbackMsg.textContent = "Please add items to your cart first.";
    promoFeedbackMsg.className = "promo-feedback error";
    return;
  }

  if (code === "SAFFRON20") {
    discountAmount = Math.round(subtotal * 0.20);
    appliedPromoCode = "SAFFRON20";
    promoFeedbackMsg.textContent = "20% Royal Discount Applied!";
    promoFeedbackMsg.className = "promo-feedback success";
    showToast("20% Discount unlocked!");
  } else if (code === "ROYAL50") {
    discountAmount = 50;
    appliedPromoCode = "ROYAL50";
    promoFeedbackMsg.textContent = "₹50 Saffron Credit Applied!";
    promoFeedbackMsg.className = "promo-feedback success";
    showToast("₹50 Discount unlocked!");
  } else {
    discountAmount = 0;
    appliedPromoCode = "";
    promoFeedbackMsg.textContent = "Invalid code. Try SAFFRON20 or ROYAL50.";
    promoFeedbackMsg.className = "promo-feedback error";
  }

  renderCart();
}

menuGridEl.addEventListener("click", e => {
  const target = e.target.closest("button");
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "add" || action === "increment") {
    addToCart(id);
  } else if (action === "decrement") {
    updateCartQty(id, -1);
  }
});

cartItemsListEl.addEventListener("click", e => {
  const target = e.target.closest("button");
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "cart-increment") {
    updateCartQty(id, 1);
  } else if (action === "cart-decrement") {
    updateCartQty(id, -1);
  }
});

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
emptyCartBrowseBtn.addEventListener("click", () => {
  closeCart();
  window.scrollTo({ top: 300, behavior: "smooth" });
});

applyPromoBtn.addEventListener("click", applyCoupon);
promoCodeInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    applyCoupon();
  }
});

document.querySelectorAll(".cat-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    activeCategory = pill.dataset.category;
    categoryTitleEl.textContent = pill.textContent;
    renderMenu();
  });
});

document.querySelectorAll(".diet-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const selected = tag.dataset.tag;
    if (activeDietTag === selected) {
      tag.classList.remove("active");
      activeDietTag = null;
    } else {
      document.querySelectorAll(".diet-tag").forEach(t => t.classList.remove("active"));
      tag.classList.add("active");
      activeDietTag = selected;
    }
    renderMenu();
  });
});

searchInput.addEventListener("input", e => {
  searchQuery = e.target.value;
  const parent = searchInput.parentElement;
  if (searchQuery.length > 0) {
    parent.classList.add("has-text");
  } else {
    parent.classList.remove("has-text");
  }
  renderMenu();
});

searchClearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  searchInput.parentElement.classList.remove("has-text");
  renderMenu();
  searchInput.focus();
});

document.getElementById("reset-filters-btn").addEventListener("click", () => {
  activeCategory = "all";
  activeDietTag = null;
  searchQuery = "";
  searchInput.value = "";
  searchInput.parentElement.classList.remove("has-text");
  document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
  document.querySelector('.cat-pill[data-category="all"]').classList.add("active");
  document.querySelectorAll(".diet-tag").forEach(t => t.classList.remove("active"));
  categoryTitleEl.textContent = "All Delicacies";
  renderMenu();
});

const deliveryBtn = document.getElementById("btn-delivery");
const pickupBtn = document.getElementById("btn-pickup");
const locationLabel = document.getElementById("delivery-location-label");

deliveryBtn.addEventListener("click", () => {
  deliveryBtn.classList.add("active");
  pickupBtn.classList.remove("active");
  locationLabel.textContent = "Delivering to: Greater Kailash II, New Delhi";
});

pickupBtn.addEventListener("click", () => {
  pickupBtn.classList.add("active");
  deliveryBtn.classList.remove("active");
  locationLabel.textContent = "Pickup: The Saffron Plate Flagship, M-Block Market, GK-II";
});

document.getElementById("change-address-btn").addEventListener("click", () => {
  const newAddr = prompt("Enter delivery address or landmark in Delhi NCR:", "Greater Kailash II, New Delhi");
  if (newAddr && newAddr.trim()) {
    locationLabel.textContent = `Delivering to: ${newAddr.trim()}`;
    const custAddrInput = document.getElementById("cust-address");
    if (custAddrInput) custAddrInput.value = newAddr.trim();
  }
});

proceedCheckoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCart();
  checkoutModal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  checkoutModal.close();
});

document.querySelectorAll(".payment-radio-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".payment-radio-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  });
});

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("cust-name").value;
  const address = document.getElementById("cust-address").value;
  const payable = modalPayableAmount.textContent;
  const randomRef = "#SP-" + Math.floor(10000 + Math.random() * 90000);

  checkoutModal.close();

  document.getElementById("order-ref-code").textContent = randomRef;
  document.getElementById("confirmed-name").textContent = name;
  document.getElementById("confirmed-address").textContent = address;
  document.getElementById("confirmed-total").textContent = payable;

  cart = [];
  discountAmount = 0;
  appliedPromoCode = "";
  saveCart();
  renderCart();
  renderMenu();

  orderSuccessModal.showModal();
});

continueShoppingBtn.addEventListener("click", () => {
  orderSuccessModal.close();
  window.scrollTo({ top: 300, behavior: "smooth" });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (cartDrawer.classList.contains("open")) {
      closeCart();
    }
  }
});

renderMenu();
renderCart();
