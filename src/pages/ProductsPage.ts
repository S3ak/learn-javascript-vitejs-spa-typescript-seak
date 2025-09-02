import type { Product, ProductResponse } from "../types";
import { dummyProducts } from "../stubs/dummy-products";
import AppButton from "../components/app-button/AppButton";
import ProductCard from "../components/product-card/ProductCard";

const defaultState = {
  products: dummyProducts,
};

export default async function ProductsPage(state = defaultState) {
  let products;
  try {
    const response = await fetch("https://dummyjson.com/products");
    const jsonResponse: ProductResponse = await response.json();

    products = jsonResponse.products;
  } catch (error) {
    return `<div>Something went wrong</div>`;
  }

  const template = `
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

  return template;
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
            .map((product: Product) => ProductCard({ product }))
            .join("")}
        </div>
      </div>`;
};
