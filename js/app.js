const PRODUCTS_API_URL = "./api/products.json";

async function fetchProductsFromApi() {
  try {
    const response = await fetch(PRODUCTS_API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Products API failed with status ${response.status}`);
    }

    const products = await response.json();
    window.furdecoProducts = Array.isArray(products) ? products : [];
  } catch (error) {
    window.furdecoProducts = [];
    console.warn("FurDeco: failed to fetch products API.", error);
  }
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
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, opacity 0.2s ease, visibility 0.2s ease;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(10px);
      }

      .scroll-top-btn.is-visible {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
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
  button.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M5 12L12 5L19 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  button.setAttribute("aria-label", "Scroll to top");
  button.className = "scroll-top-btn";

  const updateVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 420); // px
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(button);
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
}

async function init() {
  await fetchProductsFromApi();
  setupScrollTopButton();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
