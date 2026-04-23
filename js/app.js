const STORAGE_KEY = "furdeco-cart-v1";

const catalog = [
  {
    id: "linen-curve-chair",
    title: "Linen Curve Chair",
    price: 149,
    image: "./assets/website-skeleton-p/products/chair-furdeco.png",
    alt: "Linen Curve Chair",
    description: "Natural oak, soft linen finish, living room ready.",
  },
  {
    id: "amber-lounge-sofa",
    title: "Amber Lounge Sofa",
    price: 399,
    image: "./assets/website-skeleton-p/products/sofa-furdeco.png",
    alt: "Amber Lounge Sofa",
    description: "Warm beige sofa with relaxed support.",
  },
  {
    id: "oak-frame-table",
    title: "Oak Frame Table",
    price: 229,
    image: "./assets/website-skeleton-p/products/table-furdeco.png",
    alt: "Oak Frame Table",
    description: "Compact coffee table with a solid walnut tone.",
  },
  {
    id: "cloud-armchair",
    title: "Cloud Armchair",
    price: 219,
    image: "./assets/website-skeleton-p/products/chair2.0-furdeco.png",
    alt: "Cloud Armchair",
    description: "Soft lounge chair for reading corners.",
  },
  {
    id: "terra-sofa",
    title: "Terra Sofa",
    price: 499,
    image: "./assets/website-skeleton-p/products/sofa2.0-furdeco.png",
    alt: "Terra Sofa",
    description: "Modern sectional look with a clean silhouette.",
  },
  {
    id: "walnut-studio-table",
    title: "Walnut Studio Table",
    price: 179,
    image: "./assets/website-skeleton-p/products/table2.0-furdeco.png",
    alt: "Walnut Studio Table",
    description: "Minimal table for small spaces and work areas.",
  },
];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getCartCount(cart = readCart()) {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function getProductById(productId) {
  return catalog.find((product) => product.id === productId);
}

function showToast(message) {
  let toast = document.querySelector(".furdeco-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "furdeco-toast";
    toast.style.cssText = [
      "position:fixed",
      "right:20px",
      "bottom:20px",
      "z-index:9999",
      "background:#1f1f1f",
      "color:#fff",
      "padding:12px 16px",
      "border-radius:999px",
      "box-shadow:0 12px 30px rgba(0,0,0,.18)",
      "font-size:14px",
      "font-weight:600",
      "opacity:0",
      "transform:translateY(8px)",
      "transition:opacity .2s ease, transform .2s ease",
    ].join(";");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  window.clearTimeout(showToast.hideTimer);
  showToast.hideTimer = window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
  }, 1600);
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll(".cart-items a").forEach((anchor) => {
    if (anchor.textContent.toLowerCase().includes("cart")) {
      anchor.textContent = `Cart (${count})`;
    }
  });
}

function addToCart(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  const cart = readCart();
  cart[productId] = (cart[productId] || 0) + 1;
  writeCart(cart);
  updateCartBadges();
  renderCartPage();
  showToast(`${product.title} added to cart`);
}

function updateCartQuantity(productId, delta) {
  const cart = readCart();

  if (!cart[productId]) {
    return;
  }

  cart[productId] += delta;

  if (cart[productId] <= 0) {
    delete cart[productId];
  }

  writeCart(cart);
  updateCartBadges();
  renderCartPage();
}

function removeFromCart(productId) {
  const cart = readCart();

  if (!cart[productId]) {
    return;
  }

  delete cart[productId];
  writeCart(cart);
  updateCartBadges();
  renderCartPage();
  showToast("Product removed from cart");
}

function renderProductCard(product, withButton) {
  return `
    <article class="product-showcase" data-product-id="${product.id}">
      <img
        class="image-showcase-product"
        src="${product.image}"
        alt="${product.alt}"
      />
      <div class="product-description-primary">
        <p class="product-title">${product.title}</p>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
      <p class="product-description-secondary">${product.description}</p>
      ${
        withButton
          ? '<button class="add-to-cart-btn" type="button">Add to cart</button>'
          : ""
      }
    </article>
  `;
}

function renderHomeCard(product) {
  return `
    <div class="product-card">
      <img class="product-bg-check" src="${product.image}" alt="${product.alt}" />
      <br />
      <br />
      <p class="product-title">${product.title}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
    </div>
  `;
}

function renderHomeProducts() {
  const showcases = document.querySelectorAll(
    ".products-showcase .furniture-showcase",
  );

  if (!showcases.length) {
    return;
  }

  const firstSectionProducts = [
    {
      image: "./assets/website-skeleton-p/products/chair-furdeco.png",
      alt: "Chair",
      title: "Chair BigMax",
      price: 199,
    },
    {
      image: "./assets/website-skeleton-p/products/sofa-furdeco.png",
      alt: "Sofa",
      title: "Sofa BigMax",
      price: 199,
    },
    {
      image: "./assets/website-skeleton-p/products/table-furdeco.png",
      alt: "Table",
      title: "Table BigMax",
      price: 199,
    },
  ];

  const secondSectionProducts = [
    {
      image: "./assets/website-skeleton-p/products/chair2.0-furdeco.png",
      alt: "Chair",
      title: "Chair BigMax",
      price: 199,
    },
    {
      image: "./assets/website-skeleton-p/products/sofa2.0-furdeco.png",
      alt: "Sofa",
      title: "Sofa BigMax",
      price: 199,
    },
    {
      image: "./assets/website-skeleton-p/products/table2.0-furdeco.png",
      alt: "Table",
      title: "Table BigMax",
      price: 199,
    },
  ];

  if (showcases[0]) {
    showcases[0].innerHTML = firstSectionProducts
      .map((product) => renderHomeCard(product))
      .join("");
  }

  if (showcases[1]) {
    showcases[1].innerHTML = secondSectionProducts
      .map((product) => renderHomeCard(product))
      .join("");
  }
}

function renderProductsPage() {
  const productsGrid = document.querySelector(".products-grid");

  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = catalog
    .map((product) => renderProductCard(product, true))
    .join("");

  productsGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn");

    if (!button) {
      return;
    }

    const card = button.closest("[data-product-id]");

    if (card) {
      addToCart(card.dataset.productId);
    }
  });
}

function renderCartPage() {
  const cartListPanel = document.querySelector(".cart-list-panel");
  const priceCard = document.querySelector(".price-card");

  if (!cartListPanel || !priceCard) {
    return;
  }

  const cart = readCart();
  const cartItems = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = getProductById(productId);
      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity,
      };
    })
    .filter(Boolean);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  cartListPanel.innerHTML = `
    <div class="panel-header">
      <label class="select-all">
        <input type="checkbox" ${itemCount ? "checked" : ""} disabled />
        <span>${itemCount}/${itemCount} items selected</span>
      </label>
      <div class="panel-links">
        <a href="#" data-action="clear-cart">Remove all</a>
      </div>
    </div>
    ${
      cartItems.length
        ? cartItems
            .map(
              (item) => `
                <article class="cart-item" data-product-id="${item.id}">
                  <label class="item-check">
                    <input type="checkbox" checked disabled />
                  </label>
                  <img src="${item.image}" alt="${item.alt}" class="item-image" />
                  <div class="item-content">
                    <div class="item-toprow">
                      <div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                      </div>
                      <button type="button" class="remove-btn" data-action="remove-item" aria-label="Remove item">×</button>
                    </div>
                    <div class="item-bottomrow">
                      <strong>${formatPrice(item.price * item.quantity)}</strong>
                      <div class="qty-control">
                        <button type="button" data-action="decrease">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="increase">+</button>
                      </div>
                    </div>
                  </div>
                </article>
              `,
            )
            .join("")
        : '<p class="cart-empty-state">Your cart is empty. Browse the products page to add something new.</p>'
    }
  `;

  priceCard.innerHTML = `
    <p class="item-count">${itemCount} item${itemCount === 1 ? "" : "s"} selected</p>
    <div class="price-row">
      <span>Subtotal</span>
      <strong>${formatPrice(subtotal)}</strong>
    </div>
    <div class="price-row muted">
      <span>Coupon discount</span>
      <strong>$0.00</strong>
    </div>
    <div class="price-row">
      <span>Delivery charges</span>
      <strong>Free delivery</strong>
    </div>
    <div class="price-total">
      <span>Total Amount</span>
      <strong>${formatPrice(subtotal)}</strong>
    </div>
  `;

  cartListPanel.onclick = (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;
    const cartItem = actionButton.closest("[data-product-id]");

    if (action === "clear-cart") {
      event.preventDefault();
      writeCart({});
      updateCartBadges();
      renderCartPage();
      showToast("Cart cleared");
      return;
    }

    if (!cartItem) {
      return;
    }

    if (action === "remove-item") {
      removeFromCart(cartItem.dataset.productId);
    }

    if (action === "increase") {
      updateCartQuantity(cartItem.dataset.productId, 1);
    }

    if (action === "decrease") {
      updateCartQuantity(cartItem.dataset.productId, -1);
    }
  };
}

function setupContactForm() {
  const contactForm = document.querySelector(".contact-form-card");

  if (!contactForm) {
    return;
  }

  let formStatus = contactForm.querySelector(".form-status");

  if (!formStatus) {
    formStatus = document.createElement("p");
    formStatus.className = "form-status";
    formStatus.setAttribute("aria-live", "polite");
    formStatus.style.marginTop = "12px";
    formStatus.style.fontWeight = "600";
    contactForm.insertBefore(
      formStatus,
      contactForm.querySelector(".terms-copy"),
    );
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = contactForm.elements["first-name"].value.trim();
    const lastName = contactForm.elements["last-name"].value.trim();
    const email = contactForm.elements.email.value.trim();
    const phone = contactForm.elements.phone.value.trim();
    const message = contactForm.elements.message.value.trim();

    if (!firstName || !lastName || !email || !phone || !message) {
      formStatus.textContent = "Please complete all fields before submitting.";
      formStatus.style.color = "#a94442";
      return;
    }

    if (!email.includes("@")) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "#a94442";
      return;
    }

    contactForm.reset();
    formStatus.textContent = "Thanks. Your message was sent successfully.";
    formStatus.style.color = "#1f6f43";
  });
}

function setupScrollTopButton() {
  if (!document.getElementById("scroll-top-styles")) {
    const style = document.createElement("style");
    style.id = "scroll-top-styles";
    style.textContent = `
      .scroll-top-btn {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 9999;
        width: 54px;
        height: 54px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 50%;
        background: linear-gradient(145deg, rgba(31, 31, 31, 0.96), rgba(89, 68, 54, 0.94));
        color: #fff;
        box-shadow: 0 16px 34px rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(10px);
        cursor: pointer;
        display: grid;
        place-items: center;
        font-size: 1.15rem;
        font-weight: 800;
        line-height: 1;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
      }

      .scroll-top-btn:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 20px 38px rgba(0, 0, 0, 0.22);
        filter: brightness(1.05);
      }

      .scroll-top-btn:focus-visible {
        outline: 3px solid rgba(255, 255, 255, 0.35);
        outline-offset: 3px;
      }
    `;
    document.head.appendChild(style);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "↑";
  button.setAttribute("aria-label", "Scroll to top");
  button.className = "scroll-top-btn";

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(button);
}

function init() {
  updateCartBadges();
  renderHomeProducts();
  renderProductsPage();
  renderCartPage();
  setupContactForm();
  setupScrollTopButton();
}

document.addEventListener("DOMContentLoaded", init);
