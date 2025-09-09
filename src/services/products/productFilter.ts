import type { Product } from "../../types";

/**
 * This function filters a list of products by price
 * @author Monde Sineke
 * @param {Array} products list of products
 * @param {Number} min the minimum price
 * @param {Number} max the maxmium price
 * @returns {Array} a list of products that are filtered
 * @example
 *
  
 * ```
const filteredProducts = filterByPrice([  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 }], 100, 300);
   ``` 
 */
export function filterByPrice(products: Product[] = [], min = 0, max = 0) {
  return products.filter((p) => p.price >= min && p.price <= max);
}
