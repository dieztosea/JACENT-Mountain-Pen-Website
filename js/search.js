
var SEARCH_BRAND_COLORS = BRAND_BG_COLORS;


function buildSearchOverlay() {
  if (document.getElementById('search-overlay') !== null) return;

  var el = document.createElement('div');
  el.id        = 'search-overlay';
  el.className = 'search-overlay';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Search');

  el.innerHTML =
    '<div class="search-overlay-inner">' +
      '<div class="search-overlay-label">Search Collection</div>' +
      '<div class="search-input-wrap">' +
        '<i class="ri-search-line"></i>' +
        '<input type="text" id="search-input" placeholder="Brand, pen name, nib…" autocomplete="off" spellcheck="false" aria-label="Search pens">' +
        '<button class="search-close-btn" id="search-close-btn" aria-label="Close search">' +
          '<i class="ri-close-line"></i>' +
        '</button>' +
      '</div>' +
      '<div class="search-results" id="search-results">' +
        '<div class="search-hint">Start typing to find your perfect pen</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(el);

  // added: close when click outside
  el.addEventListener('click', function(e) {
    if (e.target === el) {
      closeSearch();
    }
  });

  // close button
  document.getElementById('search-close-btn').addEventListener('click', closeSearch);

  //search input
  document.getElementById('search-input').addEventListener('input', function(e) {
    runSearch(e.target.value.trim());
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearch();
    }
  });
}


function openSearch() {
  buildSearchOverlay(); 

  document.getElementById('search-overlay').classList.add('open');
  document.body.style.overflow = 'hidden'; 

  // added, adjusted: clear input and show hint when opening
  setTimeout(function() {
    var input = document.getElementById('search-input');
    if (input !== null) {
      input.value = '';
      input.focus();
    }
    showSearchResults([]);
  }, 50);
}

function closeSearch() {
  var overlay = document.getElementById('search-overlay');
  if (overlay !== null) {
    overlay.classList.remove('open');
  }
  document.body.style.overflow = ''; 
}


function runSearch(term) {
  // suggestions
  if (term === '') {
    showSearchResults([]);
    return;
  }

  var lowerTerm = term.toLowerCase();

  // pens-data.js
  var data = [];
  if (typeof PENS_DATA !== 'undefined') {
    data = PENS_DATA;
  }

  var results = [];
  for (var i = 0; i < data.length; i++) {
    var pen = data[i];

    var matchesFullName   = pen.fullName.toLowerCase().indexOf(lowerTerm)   !== -1;
    var matchesBrand      = pen.brand.toLowerCase().indexOf(lowerTerm)      !== -1;
    var matchesName       = pen.name.toLowerCase().indexOf(lowerTerm)       !== -1;
    var matchesNib        = pen.nib.toLowerCase().indexOf(lowerTerm)        !== -1;
    var matchesFill       = pen.fill.toLowerCase().indexOf(lowerTerm)       !== -1;
    var matchesMaterial   = pen.material.toLowerCase().indexOf(lowerTerm)   !== -1;
    var matchesDesc       = pen.description.toLowerCase().indexOf(lowerTerm) !== -1;

    if (matchesFullName || matchesBrand || matchesName || matchesNib ||
        matchesFill || matchesMaterial || matchesDesc) {
      results.push(pen);
    }

    if (results.length >= 8) break;
  }

  showSearchResults(results, term);
}


function showSearchResults(results, term) {
  var container = document.getElementById('search-results');
  if (container === null) return;

  // shows hint
  if (!term) {
    container.innerHTML = '<div class="search-hint">Start typing to find your perfect pen</div>';
    return;
  }

  // not found
  if (results.length === 0) {
    container.innerHTML =
      '<div class="search-no-results">' +
        'No pens found for "<strong style="color:rgba(255,255,255,0.7)">' + escapeHTML(term) + '</strong>"' +
      '</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < results.length; i++) {
    var pen    = results[i];
    var bg     = SEARCH_BRAND_COLORS[pen.brand] || '#1a1a2e';
    var letter = pen.brand.charAt(0); 
    var href   = 'products.html?brand=' + encodeURIComponent(pen.brand);

    html +=
      '<a class="search-result-item" href="' + href + '" onclick="Search.close()">' +
        '<div class="search-result-thumb" style="background:' + bg + '22;border:1px solid ' + bg + '44">' +
          '<span style="font-family:var(--font-serif);font-weight:700;color:' + bg + ';font-size:1.1rem">' + letter + '</span>' +
        '</div>' +
        '<div class="search-result-info">' +
          '<div class="search-result-brand">' + escapeHTML(pen.brand) + '</div>' +
          '<div class="search-result-name">' + highlightMatch(pen.name, term) + '</div>' +
          '<div class="search-result-meta">' + escapeHTML(pen.nib) + ' nib · ' + escapeHTML(pen.fill) + '</div>' +
        '</div>' +
        '<div class="search-result-price">' + escapeHTML(pen.priceDisplay) + '</div>' +
      '</a>';
  }

  container.innerHTML = html;
}
 // adjusted
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


function highlightMatch(text, term) {
  var safe     = escapeHTML(text);
  var safeTerm = escapeHTML(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 

  return safe.replace(
    new RegExp('(' + safeTerm + ')', 'gi'),
    '<mark style="background:rgba(201,168,76,0.35);color:#fff;border-radius:2px">$1</mark>'
  );
}


var Search = {
  open:  openSearch,
  close: closeSearch,
  query: runSearch
};

window.Search = Search;


document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('search-btn');
  if (btn !== null) {
    btn.addEventListener('click', function() {
      Search.open();
    });
  }
});
