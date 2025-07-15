let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cartItems.length;
let totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

// Set initial values on page load
document.getElementById("cart-count").textContent = cartCount;
document.getElementById("cartTotal").textContent = totalPrice;
renderCartItems();

function addToCart() {
  const productCard = event.target.closest(".product-card");
  const productName = productCard.querySelector("h3").textContent;
  const productPrice = parseInt(productCard.querySelector("p").textContent.replace("₹", ""));

  // Add new item to cart array
  const item = { name: productName, price: productPrice };
  cartItems.push(item);

  // Save to localStorage
  updateCartStorage();

  // Re-render everything
  renderCartItems();
}

function renderCartItems() {
  const cartList = document.getElementById("cartItems");
  cartList.innerHTML = "";
  totalPrice = 0;

  cartItems.forEach((item, index) => {
    totalPrice += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button class="remove-btn" data-index="${index}">🗑️</button>
    `;
    cartList.appendChild(li);
  });

  cartCount = cartItems.length;
  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("cartTotal").textContent = totalPrice;
}

function updateCartStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Cart Popup Toggle
function openCart() {
  document.getElementById("cartPopup").style.display = "block";
}
function closeCart() {
  document.getElementById("cartPopup").style.display = "none";
}

// Remove from Cart
document.getElementById("cartItems").addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const index = event.target.dataset.index;
    cartItems.splice(index, 1);
    updateCartStorage();
    renderCartItems();
  }
});

// Filter Products
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Search Products
function searchProducts() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    if (name.includes(searchText)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}
// Theme Toggle
const themeBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "🌞";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  themeBtn.textContent = isDark ? "🌞" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
