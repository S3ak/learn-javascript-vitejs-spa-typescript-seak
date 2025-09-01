import { store } from '../store';
import { router } from '../router';

export class ProfilePage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'profile-page';
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    const state = store.getState();
    
    if (!state.auth.isAuthenticated || !state.auth.user) {
      router.navigate('signin');
      return;
    }

    const user = state.auth.user;
    const orderHistory = this.generateMockOrderHistory();

    this.element.innerHTML = `
      <div class="page-container">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="${user.image}" alt="${user.firstName} ${user.lastName}" />
          </div>
          <div class="profile-info">
            <h1>${user.firstName} ${user.lastName}</h1>
            <p class="profile-username">@${user.username}</p>
            <p class="profile-email">${user.email}</p>
          </div>
        </div>

        <div class="profile-content">
          <div class="profile-section">
            <h2>Account Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>First Name</label>
                <span>${user.firstName}</span>
              </div>
              <div class="info-item">
                <label>Last Name</label>
                <span>${user.lastName}</span>
              </div>
              <div class="info-item">
                <label>Email</label>
                <span>${user.email}</span>
              </div>
              <div class="info-item">
                <label>Phone</label>
                <span>${user.phone}</span>
              </div>
            </div>
            <button class="btn btn-secondary edit-profile-btn">Edit Profile</button>
          </div>

          <div class="profile-section">
            <h2>Order History</h2>
            <div class="order-history">
              ${orderHistory.map(order => `
                <div class="order-item">
                  <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${order.date}</span>
                    <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
                  </div>
                  <div class="order-details">
                    <span class="order-items">${order.items} items</span>
                    <span class="order-total">$${order.total.toFixed(2)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="profile-section">
            <h2>Account Actions</h2>
            <div class="action-buttons">
              <button class="btn btn-secondary change-password-btn">Change Password</button>
              <button class="btn btn-danger logout-btn">Logout</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private generateMockOrderHistory() {
    return [
      {
        id: '12345',
        date: '2024-12-15',
        status: 'Delivered',
        items: 3,
        total: 89.97
      },
      {
        id: '12344',
        date: '2024-12-10',
        status: 'Shipped',
        items: 1,
        total: 29.99
      },
      {
        id: '12343',
        date: '2024-12-05',
        status: 'Processing',
        items: 2,
        total: 159.98
      }
    ];
  }

  private setupEventListeners(): void {
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('logout-btn')) {
        e.preventDefault();
        store.logout();
        router.navigate('products');
      }
      
      if (target.classList.contains('edit-profile-btn')) {
        e.preventDefault();
        alert('Profile editing would be implemented in a real application');
      }
      
      if (target.classList.contains('change-password-btn')) {
        e.preventDefault();
        alert('Password change would be implemented in a real application');
      }
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }
}