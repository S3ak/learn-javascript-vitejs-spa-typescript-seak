import type { AppState, Product, ProductResponse } from "../types";
import AppButton from "../components/app-button/AppButton";
import ProductCard from "../components/product-card/ProductCard";
import { get } from "../services/api";

export default async function ProductsPage(state: AppState) {
  let products = state.products;

  try {
    const jsonResponse: ProductResponse = await get("/products");

    products = jsonResponse.products;

    if (products.length === 0) {
      return `<div>There are no products</div>`;
    }
  } catch (error) {
    return errorTemplate;
  }

  return renderProductsTemplate(products);
}

function renderProductsTemplate(products: Product[] = []) {
  return `
   <div class="page-container">
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Search products..." />
        </div>
        
        <div class="products-header">
          <h1>Our Products</h1>
          <div>${AppButton({
            text: "Look at all the things I can't afford",
          })}</div>
          <p class="products-count">${products.length} products available</p>
        </div>

        <div class="products-grid">
          ${products.map((product) => ProductCard({ product })).join("")}
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
