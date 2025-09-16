import { LAZY_LOAD_CLASSNAME, PLACEHOLDER_URL } from "../../constants";
import type { Product } from "../../types";

export default function ProductCard({ product }: { product: Product }) {
  const { discountPercentage, price, thumbnail, id, title, rating, brand } =
    product;
  const discountedPrice = price * (1 - discountPercentage / 100);

  return `
      <div class="product-card" data-product-id="${id}">
        <div class="product-image">
          <img data-src="${thumbnail}" src="${PLACEHOLDER_URL}" alt="${title}" loading="lazy" class="${LAZY_LOAD_CLASSNAME}" />
          ${
            discountPercentage > 0
              ? `
            <div class="discount-badge">-${Math.round(
              discountPercentage
            )}%</div>
          `
              : ""
          }
        </div>
        
        <div class="product-info">
          <h3 class="product-title">${title}</h3>
          <p class="product-brand">${brand}</p>
          <div class="product-rating">
            ${"★".repeat(Math.floor(rating))}${"☆".repeat(
    5 - Math.floor(rating)
  )}
            <span class="rating-value">${rating}</span>
          </div>
          
          <div class="product-pricing">
            ${
              discountPercentage > 0
                ? `
              <span class="original-price">$${price.toFixed(2)}</span>
            `
                : ""
            }
            <span class="current-price">$${discountedPrice.toFixed(2)}</span>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-product-id="${id}">
              Add to Cart
            </button>
            <button class="btn btn-secondary view-details" data-product-id="${id}">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
}
