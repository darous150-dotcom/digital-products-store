const products = [
  {
    id: "social-kit",
    name: "Social Media Kit",
    category: "Template",
    price: 29,
    emoji: "📱",
    description: "Pack complet de visuels, stories, reels et mockups pour booster votre présence sociale."
  },
  {
    id: "funnel-system",
    name: "Funnel System",
    category: "Outil",
    price: 59,
    emoji: "🧠",
    description: "Modèle de tunnel de vente prêt à personnaliser pour générer plus de conversions."
  },
  {
    id: "branding-pack",
    name: "Branding Pack",
    category: "Bundle",
    price: 79,
    emoji: "🎨",
    description: "Palette, guides de style, logo, templates et fichiers premium pour votre marque."
  },
  {
    id: "course-growth",
    name: "Course Growth",
    category: "Cours",
    price: 89,
    emoji: "🎓",
    description: "Découvrez les meilleures stratégies pour transformer vos connaissances en offre digitale."
  },
  {
    id: "shop-setup",
    name: "Shop Setup",
    category: "Template",
    price: 39,
    emoji: "🛍️",
    description: "Interface prête à vendre, structure SEO, sections de marque et parcours d’achat."
  },
  {
    id: "automation-flow",
    name: "Automation Flow",
    category: "Outil",
    price: 69,
    emoji: "⚙️",
    description: "Workflow d'automatisation pour votre boutique et votre marketing digital."
  }
];

const cart = JSON.parse(localStorage.getItem("novakit-cart") || "[]");

function formatPrice(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product">
          <div class="thumb">${product.emoji}</div>
          <div class="product-body">
            <div class="meta">
              <span class="tag">${product.category}</span>
              <span>Instant</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
              <div class="price">${product.price}<small>€</small></div>
              <button class="buy-btn add-to-cart" type="button" data-id="${product.id}">Ajouter</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function saveCart() {
  localStorage.setItem("novakit-cart", JSON.stringify(cart));
}

function getCartItem(productId) {
  return cart.find((item) => item.id === productId);
}

function addToCart(productId) {
  const found = getCartItem(productId);
  if (found) {
    found.quantity += 1;
  } else {
    const product = products.find((p) => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartUI();
  openCart();
}

function updateCartUI() {
  const cartItemsEl = document.getElementById("cartItems");
  const countEl = document.getElementById("cartCount");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("totalPrice");

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty">Aucun produit dans le panier.</div>';
    countEl.textContent = "0";
    subtotalEl.textContent = "0,00 €";
    totalEl.textContent = "0,00 €";
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  countEl.textContent = String(totalItems);

  cartItemsEl.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-thumb">${item.emoji}</div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <small>${item.quantity} x ${formatPrice(item.price)}</small>
          </div>
          <button class="remove-item" type="button" data-id="${item.id}" title="Supprimer">×</button>
        </div>
      `
    )
    .join("");

  subtotalEl.textContent = formatPrice(totalPrice);
  totalEl.textContent = formatPrice(totalPrice);
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
}

document.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("add-to-cart")) {
    addToCart(target.dataset.id);
  }

  if (target.classList.contains("remove-item")) {
    const productId = target.dataset.id;
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
      saveCart();
      updateCartUI();
    }
  }

  if (target.id === "openCartBtn") {
    openCart();
  }

  if (target.id === "closeCartBtn" || target.closest("#closeCartBtn")) {
    closeCart();
  }

  if (target.id === "checkoutBtn") {
    if (cart.length === 0) {
      alert("Ajoutez au moins un produit avant de commander.");
      return;
    }
    alert("Paiement validé — vos produits numériques sont disponibles.");
  }
});

renderProducts();
updateCartUI();
