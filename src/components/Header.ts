const state = {
  currentPage: 'Home',
  auth: {
    isAuthenticated: true,
    user: {
      firstName: 'Seak',
    },
  },
};

const cartCount = 0;

export const headerTemplate = `
      <nav class="nav">
        <div class="nav-brand">
          <button class="nav-link brand" data-route="products">
            <span class="brand-icon">🛍️</span>
            ShopHub
          </button>
        </div>
        
        <div class="nav-links">
          <button class="nav-link ${
            state.currentPage === 'products' ? 'active' : ''
          }" data-route="products">
            Products
          </button>
          <button class="nav-link ${
            state.currentPage === 'contact' ? 'active' : ''
          }" data-route="contact">
            Contact
          </button>
        </div>

        <div class="nav-actions">
          <button class="cart-btn" data-route="checkout">
            <span class="cart-icon">🛒</span>
            ${
              cartCount > 0
                ? `<span class="cart-count">${cartCount}</span>`
                : ''
            }
          </button>
          
          ${
            state.auth.isAuthenticated
              ? `
            <div class="user-menu">
              <button class="nav-link" data-route="profile">
                <span class="user-avatar">👤</span>
                ${state.auth.user?.firstName || 'User'}
              </button>
              <button class="logout-btn">Logout</button>
            </div>
          `
              : `
            <button class="nav-link" data-route="signin">Sign In</button>
            <button class="nav-link register-btn" data-route="register">Register</button>
          `
          }
        </div>
      </nav>
    `;
