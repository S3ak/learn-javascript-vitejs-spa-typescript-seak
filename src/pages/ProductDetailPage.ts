import { ApiService } from '../services/api';
import { store } from '../store';
import { router } from '../router';
import { Product } from '../types';

export class ProductDetailPage {
  private element: HTMLElement;
  private currentImageIndex = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'product-detail-page';
    this.loadProduct();
  }

  private async loadProduct(): Promise<void> {
    const productId = router.getCurrentProductId();
    
    if (!productId) {
      router.navigate('products');
      return;
    }

    try {
      this.renderLoading();
      const product = await ApiService.getProduct(productId);
      store.setSelectedProduct(product);
      this.render();
    } catch (error) {
      this.renderError();
    }
  }

  private renderLoading(): void {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    `;
  }

  private renderError(): void {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="error">
          <p>Failed to load product details.</p>
          <button class="btn btn-primary back-btn">Back to Products</button>
        </div>
      </div>
    `;
    
    this.element.querySelector('.back-btn')?.addEventListener('click', () => {
      router.navigate('products');
    });
  }

  private render(): void {
    const product = store.getState().selectedProduct;
    
    if (!product) {
      this.renderError();
      return;
    }

    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    
    this.element.innerHTML = `
      <div class="page-container">
        <div class="breadcrumb">
          <button class="breadcrumb-link" data-route="products">Products</button>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">${product.title}</span>
        </div>

        <div class="product-detail">
          <div class="product-gallery">
            <div class="main-image">
              <img src="${product.images[this.currentImageIndex] || product.thumbnail}" 
                   alt="${product.title}" class="product-main-img" />
            </div>
            
            ${product.images.length > 1 ? `
              <div class="image-thumbnails">
                ${product.images.map((image, index) => `
                  <button class="thumbnail ${index === this.currentImageIndex ? 'active' : ''}" 
                          data-index="${index}">
                    <img src="${image}" alt="Product view ${index + 1}" />
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div class="product-details">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-brand">${product.brand}</span>
            </div>
            
            <h1 class="product-title">${product.title}</h1>
            
            <div class="product-rating">
              <div class="stars">
                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span class="rating-value">${product.rating}/5</span>
            </div>

            <div class="product-pricing">
              ${product.discountPercentage > 0 ? `
                <span class="original-price">$${product.price.toFixed(2)}</span>
                <span class="discount-percentage">-${Math.round(product.discountPercentage)}%</span>
              ` : ''}
              <span class="current-price">$${discountedPrice.toFixed(2)}</span>
            </div>

            <div class="product-description">
              <h3>Description</h3>
              <p>${product.description}</p>
            </div>

            <div class="product-stock">
              <span class="stock-label">Stock:</span>
              <span class="stock-value ${product.stock < 10 ? 'low-stock' : ''}">${product.stock} available</span>
            </div>

            <div class="product-actions">
              <div class="quantity-selector">
                <button class="quantity-btn minus">-</button>
                <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" />
                <button class="quantity-btn plus">+</button>
              </div>
              
              <button class="btn btn-primary add-to-cart-btn" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Breadcrumb navigation
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const route = target.getAttribute('data-route');
      
      if (route) {
        e.preventDefault();
        router.navigate(route);
      }
    });

    // Image gallery
    this.element.querySelectorAll('.thumbnail').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
        this.currentImageIndex = index;
        this.updateMainImage();
      });
    });

    // Quantity controls
    const quantityInput = this.element.querySelector('.quantity-input') as HTMLInputElement;
    const minusBtn = this.element.querySelector('.quantity-btn.minus');
    const plusBtn = this.element.querySelector('.quantity-btn.plus');

    minusBtn?.addEventListener('click', () => {
      const current = parseInt(quantityInput.value);
      if (current > 1) {
        quantityInput.value = (current - 1).toString();
      }
    });

    plusBtn?.addEventListener('click', () => {
      const current = parseInt(quantityInput.value);
      const product = store.getState().selectedProduct;
      if (product && current < product.stock) {
        quantityInput.value = (current + 1).toString();
      }
    });

    // Add to cart
    const addToCartBtn = this.element.querySelector('.add-to-cart-btn');
    addToCartBtn?.addEventListener('click', () => {
      const product = store.getState().selectedProduct;
      const quantity = parseInt(quantityInput.value);
      
      if (product && quantity > 0) {
        store.addToCart(product, quantity);
        this.showAddedToCartFeedback(addToCartBtn as HTMLElement);
      }
    });
  }

  private updateMainImage(): void {
    const product = store.getState().selectedProduct;
    if (!product) return;

    const mainImg = this.element.querySelector('.product-main-img') as HTMLImageElement;
    const thumbnails = this.element.querySelectorAll('.thumbnail');
    
    if (mainImg) {
      mainImg.src = product.images[this.currentImageIndex] || product.thumbnail;
    }
    
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentImageIndex);
    });
  }

  private showAddedToCartFeedback(button: HTMLElement): void {
    const originalText = button.textContent;
    button.textContent = 'Added to Cart!';
    button.classList.add('added');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('added');
    }, 2000);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}