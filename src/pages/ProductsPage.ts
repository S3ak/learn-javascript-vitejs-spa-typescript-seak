import type { Product } from "../types";
import { dummyProducts } from "../stubs/dummy-products";

const defaultState = {
  products: dummyProducts,
};

export default function ProductsPage(state = defaultState) {
  const template = `
   <div class="page-container">
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Search products..." />
        </div>
        
        <div class="products-header">
          <h1>Our Products</h1>
          <p class="products-count">${
            state.products.length
          } products available</p>
        </div>

        <div class="products-grid">
          ${state.products
            .map((product) => renderProductCard(product))
            .join("")}
        </div>
      </div>
    `;

  return template;
}

function renderProductCard(product: Product) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.thumbnail}" alt="${
    product.title
  }" loading="lazy" />
          ${
            product.discountPercentage > 0
              ? `
            <div class="discount-badge">-${Math.round(
              product.discountPercentage
            )}%</div>
          `
              : ""
          }
        </div>
        
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-brand">${product.brand}</p>
          <div class="product-rating">
            ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(
    5 - Math.floor(product.rating)
  )}
            <span class="rating-value">${product.rating}</span>
          </div>
          
          <div class="product-pricing">
            ${
              product.discountPercentage > 0
                ? `
              <span class="original-price">$${product.price.toFixed(2)}</span>
            `
                : ""
            }
            <span class="current-price">$${discountedPrice.toFixed(2)}</span>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-product-id="${
              product.id
            }">
              Add to Cart
            </button>
            <button class="btn btn-secondary view-details" data-product-id="${
              product.id
            }">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
}

const loadingTemplate = `
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

const errorTemplate = `
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

const baseTemplate = (state) => {
  return `<div class="page-container">
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Search products..." />
        </div>
        
        <div class="products-header">
          <h1>Our Products</h1>
          <p class="products-count">${
            state.products.length
          } products available</p>
        </div>

        <div class="products-grid">
          ${state.products
            .map((product: Product) => renderProductCard(product))
            .join("")}
        </div>
      </div>`;
};
