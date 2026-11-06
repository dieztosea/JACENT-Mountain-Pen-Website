
var allPens  = [];
var filtered = [];

function loadPens() {
  // pens-data.js
  if (typeof PENS_DATA === 'undefined' || PENS_DATA.length === 0) {
    document.getElementById('products-grid').innerHTML =
      '<p class="no-results">Unable to load products. Please ensure pens-data.js is loaded.</p>';
    return;
  }

  allPens  = PENS_DATA;
  filtered = allPens.slice(); 
  renderProducts(filtered);
  buildFilters();
}

function renderProducts(pens) {
  var grid    = document.getElementById('products-grid');
  var countEl = document.getElementById('product-count');

  if (countEl !== null) {
    countEl.textContent = pens.length;
  }

  // no result msg
  if (pens.length === 0) {
    grid.innerHTML =
      '<div class="no-results">' +
        '<i class="ri-search-line"></i>' +
        '<p>No pens match your filters.</p>' +
        '<button class="btn btn-gold-outline" style="margin-top:1rem" onclick="clearFilters()">' +
          'Clear Filters' +
        '</button>' +
      '</div>';
    return;
  }

  //pen cards
  var html = '';
  for (var i = 0; i < pens.length; i++) {
    html += createPenCard(pens[i]);
  }
  grid.innerHTML = html;
}


function createPenCard(pen) {
  var brand = BRAND_COLORS[pen.brand];
  if (!brand) {
    brand = { bg: '#1a1a2e', accent: '#c9a84c', emoji: '🖊️' };
  }

  var stars = getStars(pen.rating);

  //featured brands
  var featuredBadge = '';
  if (pen.featured) {
    featuredBadge = '<div class="product-card-badge">Featured</div>';
  }

  var imageSection = '';
  if (pen.image) {
    imageSection =
      '<div class="product-card-image product-card-image-photo">' +
        featuredBadge +
        '<img src="' + pen.image + '" alt="' + pen.name + '" class="product-card-photo">' +
      '</div>';
  } else {
    imageSection =
      '<div class="product-card-image" style="background: linear-gradient(135deg, ' + brand.bg + ', ' + brand.bg + 'dd)">' +
        featuredBadge +
        '<div class="pen-visual" style="font-size:3.5rem">' + brand.emoji + '</div>' +
      '</div>';
  }

  var card =
    '<div class="product-card" data-id="' + pen.id + '" onclick="openPenDetail(' + pen.id + ')">' +
      imageSection +
      '<div class="product-card-body">' +
        '<div class="product-brand">' + pen.brand + '</div>' +
        '<div class="product-name">' + pen.name + '</div>' +
        '<div class="product-rating">' +
          '<span class="stars">' + stars + '</span>' +
          '<span class="rating-num">' + pen.rating + '</span>' +
        '</div>' +
        '<div class="product-meta">' +
          '<div class="meta-item">' +
            '<span class="meta-label">Nib</span>' +
            '<span class="meta-value">' + pen.nib + '</span>' +
          '</div>' +
          '<div class="meta-item">' +
            '<span class="meta-label">Fill</span>' +
            '<span class="meta-value">' + pen.fill + '</span>' +
          '</div>' +
          '<div class="meta-item" style="grid-column:1/-1">' +
            '<span class="meta-label">Material</span>' +
            '<span class="meta-value">' + pen.material + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="product-footer">' +
          '<span class="product-price">' + pen.priceDisplay + '</span>' +
          '<button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(' + pen.id + ')">' +
            'Add to Cart' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  return card;
}


function buildFilters() {
  var brands = [];
  var nibs   = [];
  var fills  = [];

  for (var i = 0; i < allPens.length; i++) {
    var pen = allPens[i];

    // add brands
    if (brands.indexOf(pen.brand) === -1) {
      brands.push(pen.brand);
    }
    // add nib
    if (nibs.indexOf(pen.nib) === -1) {
      nibs.push(pen.nib);
    }
    // add fill
    if (fills.indexOf(pen.fill) === -1) {
      fills.push(pen.fill);
    }
  }

  brands.sort();
  fills.sort();

  // order
  var nibOrder = ['Extra Fine', 'Fine', 'Medium', 'Broad'];
  var nibsSorted = [];
  for (var i = 0; i < nibOrder.length; i++) {
    if (nibs.indexOf(nibOrder[i]) !== -1) {
      nibsSorted.push(nibOrder[i]);
    }
  }

  buildCheckboxGroup('filter-brands', brands);
  buildCheckboxGroup('filter-nibs',   nibsSorted);
  buildCheckboxGroup('filter-fills',  fills);
}

// group for checkbox
function buildCheckboxGroup(containerId, values) {
  var container = document.getElementById(containerId);
  if (container === null) return;

  var html = '';
  for (var i = 0; i < values.length; i++) {
    var val = values[i];
    var safeId = 'filter-' + val.replace(/\s+/g, '-').replace(/\//g, '-');

    html +=
      '<div class="filter-item">' +
        '<input type="checkbox" id="' + safeId + '" value="' + val + '" onchange="applyFilters()">' +
        '<label for="' + safeId + '">' + val + '</label>' +
      '</div>';
  }

  container.innerHTML = html;
}

// clear options
function clearFilterGroup(containerId) {
  var container = document.getElementById(containerId);
  if (container === null) return;

  var checkboxes = container.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  applyFilters();
}

// apply active filters
function applyFilters() {
  var checkedBrands = getCheckedValues('filter-brands');
  var checkedNibs   = getCheckedValues('filter-nibs');
  var checkedFills  = getCheckedValues('filter-fills');

  var sortSelect = document.getElementById('sort-select');
  var sortVal    = sortSelect ? sortSelect.value : 'featured';

  filtered = [];
  for (var i = 0; i < allPens.length; i++) {
    var pen = allPens[i];

    var brandOk = checkedBrands.length === 0 || checkedBrands.indexOf(pen.brand) !== -1;
    var nibOk   = checkedNibs.length   === 0 || checkedNibs.indexOf(pen.nib)     !== -1;
    var fillOk  = checkedFills.length  === 0 || checkedFills.indexOf(pen.fill)   !== -1;

    if (brandOk && nibOk && fillOk) {
      filtered.push(pen);
    }
  }

  sortPens(sortVal);
  renderProducts(filtered);

  // addded: filter chips
  var allActive = [];
  for (var i = 0; i < checkedBrands.length; i++) allActive.push(checkedBrands[i]);
  for (var i = 0; i < checkedNibs.length; i++)   allActive.push(checkedNibs[i]);
  for (var i = 0; i < checkedFills.length; i++)  allActive.push(checkedFills[i]);

  updateActiveChips(allActive);
  updateSectionClearBtns();
}

function updateSectionClearBtns() {
  var sections = [
    { groupId: 'filter-brands', clearId: 'clear-brands' },
    { groupId: 'filter-nibs',   clearId: 'clear-nibs'   },
    { groupId: 'filter-fills',  clearId: 'clear-fills'  }
  ];

  for (var i = 0; i < sections.length; i++) {
    var btn     = document.getElementById(sections[i].clearId);
    var checked = getCheckedValues(sections[i].groupId);

    if (btn !== null) {
      btn.style.display = checked.length > 0 ? 'inline' : 'none';
    }
  }
}

// filter chips is shown
function updateActiveChips(allActive) {
  var bar = document.getElementById('active-filters-bar');
  if (bar === null) return;

  if (allActive.length === 0) {
    bar.innerHTML = '';
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'flex';

  var html = '';
  for (var i = 0; i < allActive.length; i++) {
    var val = allActive[i];
    var safeVal = val.replace(/'/g, "\\'");
    html +=
      '<span class="filter-chip">' +
        val +
        '<button onclick="removeFilterChip(\'' + safeVal + '\')">✕</button>' +
      '</span>';
  }
  html += '<button class="filter-chip-clear-all" onclick="clearFilters()">Clear all</button>';

  bar.innerHTML = html;
}

// remove filter chips
function removeFilterChip(val) {
  var checkbox = document.querySelector(
    '#filter-brands input[value="' + val + '"],' +
    '#filter-nibs input[value="' + val + '"],' +
    '#filter-fills input[value="' + val + '"]'
  );

  if (checkbox !== null) {
    checkbox.checked = false;
  }

  applyFilters();
}

function getCheckedValues(containerId) {
  var container = document.getElementById(containerId);
  if (container === null) return [];

  var checked = [];
  var checkboxes = container.querySelectorAll('input:checked');
  for (var i = 0; i < checkboxes.length; i++) {
    checked.push(checkboxes[i].value);
  }
  return checked;
}

function sortPens(sortVal) {
  if (sortVal === 'price-asc') {
    filtered.sort(function(a, b) { return a.price - b.price; }); // cheapest

  } else if (sortVal === 'price-desc') {
    filtered.sort(function(a, b) { return b.price - a.price; }); // expensive

  } else if (sortVal === 'rating') {
    filtered.sort(function(a, b) { return b.rating - a.rating; }); // highest rate

  } else if (sortVal === 'name') {
    filtered.sort(function(a, b) { return a.fullName.localeCompare(b.fullName); }); // alphabetically

  } else {
    // added: featured (default)
    filtered.sort(function(a, b) {
      var aFeatured = a.featured ? 1 : 0;
      var bFeatured = b.featured ? 1 : 0;
      return bFeatured - aFeatured;
    });
  }
}

// clear all
function clearFilters() {
  var checkboxes = document.querySelectorAll('.filter-item input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  filtered = allPens.slice();
  renderProducts(filtered);
}


function openPenDetail(id) {
  var pen = null;
  for (var i = 0; i < allPens.length; i++) {
    if (allPens[i].id === id) {
      pen = allPens[i];
      break;
    }
  }
  if (pen === null) return;

  var brand = BRAND_COLORS[pen.brand];
  if (!brand) {
    brand = { bg: '#1a1a2e', accent: '#c9a84c', emoji: '🖊️' };
  }

  var stars = getStars(pen.rating);

  // adjusted
  var modal = document.createElement('div');
  modal.id = 'pen-modal';
  modal.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:3000;' +
    'display:flex;align-items:center;justify-content:center;padding:2rem;' +
    'animation:fadeIn 0.2s ease;';

  modal.innerHTML =
    '<div style="background:var(--white);border-radius:var(--radius-lg);max-width:640px;width:100%;overflow:hidden;box-shadow:var(--shadow-lg);">' +
      '<div class="modal-image-wrap" style="height:220px;background:linear-gradient(135deg,' + brand.bg + ',' + brand.bg + 'dd);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">' +
        (pen.image
          ? '<img src="' + pen.image + '" alt="' + pen.name + '" style="width:100%;height:100%;object-fit:cover;display:block;">'
          : '<span style="font-size:6rem;filter:drop-shadow(0 8px 16px rgba(0,0,0,0.5))">' + brand.emoji + '</span>'
        ) +
        '<button onclick="document.getElementById(\'pen-modal\').remove()" ' +
          'style="position:absolute;top:1rem;right:1rem;background:rgba(0,0,0,0.3);border:none;color:white;width:36px;height:36px;border-radius:50%;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">' +
          '✕' +
        '</button>' +
      '</div>' +
      '<div style="padding:2rem">' +
        '<div style="font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold-dark);margin-bottom:0.4rem">' + pen.brand + '</div>' +
        '<h2 style="font-family:var(--font-serif);font-size:1.8rem;font-weight:600;color:var(--navy);margin-bottom:0.5rem">' + pen.name + '</h2>' +
        '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">' +
          '<span style="color:var(--gold);font-size:1rem">' + stars + '</span>' +
          '<span style="font-size:0.85rem;color:var(--gray)">' + pen.rating + ' / 5.0</span>' +
        '</div>' +
        '<p style="font-size:0.9rem;color:var(--gray);line-height:1.7;margin-bottom:1.5rem">' + pen.description + '</p>' +
        // Specs grid
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;background:var(--cream);border-radius:var(--radius-sm);padding:1.25rem;margin-bottom:1.5rem">' +
          '<div>' +
            '<div style="font-size:0.65rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem">Nib Size</div>' +
            '<div style="font-weight:600;color:var(--navy);font-size:0.9rem">' + pen.nib + '</div>' +
          '</div>' +
          '<div>' +
            '<div style="font-size:0.65rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem">Fill System</div>' +
            '<div style="font-weight:600;color:var(--navy);font-size:0.9rem">' + pen.fill + '</div>' +
          '</div>' +
          '<div>' +
            '<div style="font-size:0.65rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem">Material</div>' +
            '<div style="font-weight:600;color:var(--navy);font-size:0.9rem">' + pen.material + '</div>' +
          '</div>' +
        '</div>' +
        // price and add to cart
        '<div style="display:flex;align-items:center;justify-content:space-between">' +
          '<div style="font-family:var(--font-serif);font-size:2rem;font-weight:700;color:var(--navy)">' + pen.priceDisplay + '</div>' +
          '<button class="btn-add-cart" style="padding:0.75rem 2rem;font-size:0.85rem" ' +
            'onclick="addToCart(' + pen.id + '); document.getElementById(\'pen-modal\').remove()">' +
            'Add to Cart' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(modal);

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}


function addToCart(id) {
  var pen = null;
  for (var i = 0; i < allPens.length; i++) {
    if (allPens[i].id === id) {
      pen = allPens[i];
      break;
    }
  }
  if (pen !== null) {
    CartManager.add(pen);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  loadPens();
});
