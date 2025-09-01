import { ApiService } from '../services/api';
import { store } from '../store';
import { router } from '../router';
import { Product } from '../types';

export class ProductsPage {
  private element: HTMLElement;
  private searchTimeout: number | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'products-page';
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      this.renderLoading();
      const data = await ApiService.getProducts();
      store.setProducts(data.products);
      this.render();
    } catch (error) {
      this.renderError();
    }
  }

  private async searchProducts(query: string): Promise<void> {
    if (!query.trim()) {
      this.loadProducts();
      return;
    }

    try {
      this.renderLoading();
      const data = await ApiService.searchProducts(query);
      store.setProducts(data.products);
      this.render();
    } catch (error) {
      this.renderError();
    }
  }

  private renderLoading(): void {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Search products..." />
        </div>
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    `;
    this.setupSearchListener();
  }

  private renderError(): void {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Search products..." />
        </div>
        <div class="error">
          <p>Failed to load products. Please try again.</p>
          <button class="retry-btn">Retry</button>
        </div>
      </div>
    `;
    this.setupSearchListener();
    this.setupRetryListener();
  }

  private render(): void {
    const state = store.getState();
    
    this.element.innerHTML = `
      <div class="page-container">
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Search products..." />
        </div>
        
        <div class="products-header">
          <h1>Our Products</h1>
          <p class="products-count">${state.products.length} products available</p>
        </div>

        <div class="products-grid">
          ${state.products.map(product => this.renderProductCard(product)).join('')}
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  private renderProductCard(product: Product): string {
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.thumbnail}" alt="${product.title}" loading="lazy" />
          ${product.discountPercentage > 0 ? `
            <div class="discount-badge">-${Math.round(product.discountPercentage)}%</div>
          ` : ''}
        </div>
        
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-brand">${product.brand}</p>
          <div class="product-rating">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span class="rating-value">${product.rating}</span>
          </div>
          
          <div class="product-pricing">
            ${product.discountPercentage > 0 ? `
              <span class="original-price">$${product.price.toFixed(2)}</span>
            ` : ''}
            <span class="current-price">$${discountedPrice.toFixed(2)}</span>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
            <button class="btn btn-secondary view-details" data-product-id="${product.id}">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    this.setupSearchListener();

    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const productId = target.getAttribute('data-product-id');
      
      if (target.classList.contains('add-to-cart') && productId) {
        const product = store.getState().products.find(p => p.id === parseInt(productId));
        if (product) {
          store.addToCart(product);
          this.showAddedToCartFeedback(target);
        }
      }
      
      if (target.classList.contains('view-details') && productId) {
        router.navigate('product', parseInt(productId));
      }
    });
  }

  private setupSearchListener(): void {
    const searchInput = this.element.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = (e.target as HTMLInputElement).value;
        
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        
        this.searchTimeout = window.setTimeout(() => {
          this.searchProducts(query);
        }, 300);
      });
    }
  }

  private setupRetryListener(): void {
    const retryBtn = this.element.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.loadProducts();
      });
    }
  }

  private showAddedToCartFeedback(button: HTMLElement): void {
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.add('added');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('added');
    }, 1000);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}