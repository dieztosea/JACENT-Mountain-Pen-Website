var ACCOUNTS_KEY = 'jacent-accounts';
var SESSION_KEY  = 'jacent-session';


// get saved acc
function getAllAccounts() {
  var stored = localStorage.getItem(ACCOUNTS_KEY);
  if (stored === null) {
    return {}; 
  }
  return JSON.parse(stored);
}

// savs acc
function saveAllAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}


function getSession() {
  var stored = localStorage.getItem(SESSION_KEY);
  if (stored === null) {
    return null;
  }
  return JSON.parse(stored);
}

// check is logged in
function isLoggedIn() {
  return getSession() !== null;
}

// saves status of logged in user
function setSession(email, name) {
  var session = {
    email: email,
    name: name,
    loggedInAt: Date.now()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// log out 
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

function register(email, password, name) {
  var accounts = getAllAccounts();
  var emailLower = email.toLowerCase();

  // if acc exists, error
  if (accounts[emailLower]) {
    return { ok: false, error: 'An account with this email already exists.' };
  }

  // create acc, save, and log in
  accounts[emailLower] = {
    email: emailLower,
    password: password,   
    name: name || email.split('@')[0], 
    createdAt: Date.now()
  };

  saveAllAccounts(accounts);
  setSession(emailLower, accounts[emailLower].name);

  return { ok: true };
}

function login(email, password) {
  var accounts = getAllAccounts();
  var emailLower = email.toLowerCase();
  var user = accounts[emailLower];

  // if acc exists, error
  if (!user) {
    return { ok: false, error: 'No account found with that email.' };
  }

  // if pass is wrong, error
  if (user.password !== password) {
    return { ok: false, error: 'Incorrect password.' };
  }

  setSession(emailLower, user.name);
  return { ok: true };
}

// redirect to last page
function requireAuth(redirectTo) {
  if (!isLoggedIn()) {
    var destination = redirectTo || window.location.href;
    sessionStorage.setItem('jacent-redirect', destination);
    window.location.replace('login.html');
    return false;
  }
  return true;
}

function redirectAfterAuth(fallback) {
  var destination = sessionStorage.getItem('jacent-redirect');
  if (destination === null) {
    destination = fallback || 'index.html';
  }
  sessionStorage.removeItem('jacent-redirect');
  window.location.replace(destination);
}


function renderNavAuth() {
  var slot = document.getElementById('nav-auth-slot');
  if (slot === null) return;

  var session = getSession();

  if (session !== null) {
    // user;s dropdown
    var nameOrEmail = session.name || session.email;
    var initial = nameOrEmail.charAt(0).toUpperCase();
    var displayName = session.name || session.email.split('@')[0];

    slot.innerHTML =
      '<div class="nav-user-pill" id="nav-user-pill">' +
        '<div class="nav-user-avatar">' + initial + '</div>' +
        '<span class="nav-user-name">' + displayName + '</span>' +
        '<i class="ri-arrow-down-s-line nav-user-chevron"></i>' +
      '</div>' +
      '<div class="nav-user-dropdown" id="nav-user-dropdown">' +
        '<div class="nav-dropdown-email">' + session.email + '</div>' +
        '<div class="nav-dropdown-divider"></div>' +
        '<a href="cart.html" class="nav-dropdown-item">' +
          '<i class="ri-shopping-bag-line"></i> Your Cart' +
        '</a>' +
        '<div class="nav-dropdown-divider"></div>' +
        '<button class="nav-dropdown-item nav-dropdown-logout" onclick="Auth.logout()">' +
          '<i class="ri-logout-box-r-line"></i> Log Out' +
        '</button>' +
      '</div>';

    var pill     = document.getElementById('nav-user-pill');
    var dropdown = document.getElementById('nav-user-dropdown');

    pill.addEventListener('click', function(e) {
      e.stopPropagation(); 
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', function() {
      dropdown.classList.remove('open');
    });

  } else {
    slot.innerHTML =
      '<a href="login.html" class="nav-auth-link">Log In</a>' +
      '<a href="signup.html" class="nav-auth-link nav-auth-link-signup">Sign Up</a>';
  }
}


var Auth = {
  isLoggedIn: isLoggedIn,
  getSession: getSession,
  login: login,
  register: register,
  logout: logout,
  requireAuth: requireAuth,
  redirectAfterAuth: redirectAfterAuth,
  renderNavAuth: renderNavAuth
};

window.Auth = Auth;
