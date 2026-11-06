var cartItems = JSON.parse(localStorage.getItem('jacent-cart') || '[]');

// save the cart to browser storage
function saveCart() {
  localStorage.setItem('jacent-cart', JSON.stringify(cartItems));
}

//add to cart
function addItemToCart(pen) {
  // If user is not logged in, send them to login page first
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    sessionStorage.setItem('jacent-redirect', 'cart.html');
    sessionStorage.setItem('jacent-pending-add', pen.id);
    window.location.href = 'login.html';
    return;
  }

  // if pen is in the cart
  var existingItem = null;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === pen.id) {
      existingItem = cartItems[i];
      break;
    }
  }

  if (existingItem === null) {
    // if pen is not in the cart
    var newItem = {
      id: pen.id,
      name: pen.name,
      brand: pen.brand,
      price: pen.price,
      nib: pen.nib,
      qty: 1
    };
    cartItems.push(newItem);
  } else {
    // if pen is in the cart, qty++
    existingItem.qty = existingItem.qty + 1;
  }

  saveCart();
  updateCartBadge();
  renderCartPage();
  showToast(pen.name + ' added to cart');
}

// remove pen by id
function removeItemFromCart(id) {
  var newCart = [];
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id !== id) {
      newCart.push(cartItems[i]);
    }
  }
  cartItems = newCart;
  saveCart();
  updateCartBadge();
  renderCartPage();
}

// qty++, qty--
function changeItemQty(id, delta) {
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === id) {
      cartItems[i].qty = cartItems[i].qty + delta;
      if (cartItems[i].qty < 1) {
        cartItems[i].qty = 1;
      }
      break;
    }
  }
  saveCart();
  updateCartBadge();
  renderCartPage();
}

// total price
function getCartTotal() {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total = total + (cartItems[i].price * cartItems[i].qty);
  }
  return total;
}

// tital qty
function getCartCount() {
  var count = 0;
  for (var i = 0; i < cartItems.length; i++) {
    count = count + cartItems[i].qty;
  }
  return count;
}

var CartManager = {
  add: addItemToCart,
  remove: removeItemFromCart,
  updateQty: changeItemQty,
  total: getCartTotal,
  count: getCartCount,
  getItems: function() { return cartItems; }
};

window.CartManager = CartManager;

function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (navbar === null) return; 

  // added scroll listener to change navbar style on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  var links = navbar.querySelectorAll('.nav-links a');
  var currentPage = location.pathname.split('/').pop();
  if (currentPage === '') {
    currentPage = 'index.html';
  }

  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === currentPage) {
      links[i].classList.add('active');
    }
  }

  // shows status
  if (typeof Auth !== 'undefined') {
    Auth.renderNavAuth();
  }
}


function renderCartPage() {
  var tableBody  = document.getElementById('cart-table-body');
  var subtotalEl = document.getElementById('cart-subtotal');
  var totalEl    = document.getElementById('cart-grand-total');
  var emptyMsg   = document.getElementById('cart-empty-msg');
  var cartTable  = document.getElementById('cart-table-wrap');

  if (tableBody === null) return;

  var brandColors = BRAND_BG_COLORS;

  if (cartItems.length === 0) {
    // if cart is empty
    if (emptyMsg)  emptyMsg.style.display  = 'block';
    if (cartTable) cartTable.style.display = 'none';
  } else {
    // cart has items
    if (emptyMsg)  emptyMsg.style.display  = 'none';
    if (cartTable) cartTable.style.display = 'block';

    // adjusted to row rendering
    var rows = '';
    for (var i = 0; i < cartItems.length; i++) {
      var item  = cartItems[i];
      var bg    = brandColors[item.brand] || '#1a1a2e';
      var letter = item.brand.charAt(0); // first letter of brand

      rows += '<tr class="cart-row" data-id="' + item.id + '">';
      rows +=   '<td class="cart-col-instrument">';
      rows +=     '<div class="cart-item-cell">';
      rows +=       '<div class="cart-item-thumb" style="background:' + bg + '18;border:1px solid ' + bg + '33">';
      rows +=         '<span class="cart-item-thumb-letter" style="color:' + bg + '">' + letter + '</span>';
      rows +=       '</div>';
      rows +=       '<div class="cart-item-details">';
      rows +=         '<div class="cart-item-brand-label">' + item.brand.toUpperCase() + '</div>';
      rows +=         '<div class="cart-item-title">' + item.name + '</div>';
      rows +=         '<div class="cart-item-sub">Nib: ' + item.nib + '</div>';
      rows +=       '</div>';
      rows +=     '</div>';
      rows +=   '</td>';
      rows +=   '<td class="cart-col-qty">';
      rows +=     '<div class="qty-control">';
      rows +=       '<button class="qty-btn" onclick="CartManager.updateQty(' + item.id + ', -1)">−</button>';
      rows +=       '<span class="qty-value">' + item.qty + '</span>';
      rows +=       '<button class="qty-btn" onclick="CartManager.updateQty(' + item.id + ', +1)">+</button>';
      rows +=     '</div>';
      rows +=   '</td>';
      rows +=   '<td class="cart-col-price">';
      rows +=     '<span class="cart-line-price">$' + (item.price * item.qty).toLocaleString() + '</span>';
      rows +=     '<button class="cart-delete-btn" onclick="CartManager.remove(' + item.id + ')" title="Remove">';
      rows +=       '<i class="ri-delete-bin-6-line"></i>';
      rows +=     '</button>';
      rows +=   '</td>';
      rows += '</tr>';
    }

    tableBody.innerHTML = rows;
  }

  // update totals
  var total = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = '$' + total.toLocaleString();
  if (totalEl)    totalEl.textContent    = '$' + total.toLocaleString();
}

function initCart() {
  var cartBtn = document.getElementById('cart-btn');

  if (cartBtn !== null) {
    cartBtn.addEventListener('click', function() {
      // if not logged in, go to login page first
      if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
        sessionStorage.setItem('jacent-redirect', 'cart.html');
        window.location.href = 'login.html';
        return;
      }
      window.location.href = 'cart.html';
    });
  }

  renderCartPage();
}

function showToast(message) {
  // added: remove existing toasts before showing new one
  var existingToast = document.querySelector('.toast');
  if (existingToast !== null) {
    existingToast.remove();
  }

  // create toast element
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<i class="ri-checkbox-circle-line"></i> ' + message;
  document.body.appendChild(toast);

  // shows with fade in(adjusted css)
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      toast.classList.add('show');
    });
  });

  // added design
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() {
      toast.remove();
    }, 400);
  }, 3000);
}

// added: scroll animations using IntersectionObserver
function initScrollAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target); 
      }
    }
  }, { threshold: 0.08 });

  var fadeElements = document.querySelectorAll('.fade-in');
  for (var i = 0; i < fadeElements.length; i++) {
    observer.observe(fadeElements[i]);
  }
}

function initHero() {
  
}


function getStars(rating) {
  var fullStars  = Math.floor(rating);   
  var hasHalf    = (rating % 1) >= 0.5;  
  var emptyStars = 5 - fullStars - (hasHalf ? 1 : 0); 

  var stars = '';
  for (var i = 0; i < fullStars; i++) {
    stars += '★';
  }
  if (hasHalf) {
    stars += '⯨'; 
  }

  for (var i = 0; i < emptyStars; i++) {
    stars += '☆';
  }

  return stars;
}


function updateCartBadge() {
  var badge = document.getElementById('cart-badge');
  if (badge === null) return;

  var count = getCartCount();
  badge.textContent = count;

  if (count > 0) {
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

var updateBadge = updateCartBadge;


document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initCart();
  initScrollAnimations();
  initHero();
  updateCartBadge();
});
