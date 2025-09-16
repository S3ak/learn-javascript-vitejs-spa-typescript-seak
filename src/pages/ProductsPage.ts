import type { AppState, Product, ProductResponse } from "../types";
import ProductCard from "../components/product-card/ProductCard";
import { get } from "../services/api";
import Search from "../components/search/Search";

export default async function ProductsPage(state: AppState) {
  let products = state.products;
  let numberOfItems = state.numberOfItems;

  try {
    const jsonResponse: ProductResponse = await get("/products");

    products = jsonResponse.products;

    if (products.length === 0) {
      return `<div>There are no products</div>`;
    }
  } catch (error) {
    return errorTemplate;
  }

  return renderProductsTemplate(products, numberOfItems);
}

function renderProductsTemplate(
  products: Product[] = [],
  numberOfItems: number
) {
  return `
   <div class="page-container">
      ${Search()}
      
      <div class="products-header">
        <strong>${numberOfItems}</strong>
        <button id="js-demo-update">UPDATE COUNT</button>
        <h1>Our Products</h1>
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
