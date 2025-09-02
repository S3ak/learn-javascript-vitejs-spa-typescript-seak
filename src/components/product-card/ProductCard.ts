import type { Product } from "../../types";

export default function ProductCard({ product }: { product: Product }) {
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
