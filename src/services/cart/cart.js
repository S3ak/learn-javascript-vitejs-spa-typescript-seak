const MINIMUM_SHIPPING_AMOUNT = 50;
const SHIPPING_COST = 5;

export function calculateCartTotal(cart = []) {
  return cart.reduce((total, product) => total + product.price, 0);
}

export function applyDiscount(total = 0, user) {
  if (!user.isPremium) return total;
  const DISCOUNT_PERCENT = 0.9;

  return (total = total * DISCOUNT_PERCENT);
}

export function addShippingCost(total = 0) {
  if (total < MINIMUM_SHIPPING_AMOUNT) {
    return (total += SHIPPING_COST); // 5 is shipping cost
  }

  return total;
}

export function formatCurrency(amount = 0) {
  const MAX_DECIMALS = 2;
  return amount.toFixed(MAX_DECIMALS).toString();
}

export function calculateFinalPrice(cart = [], user) {
  let total = calculateCartTotal(cart);
  total = applyDiscount(total, user);
  total = addShippingCost(total);

  return `Total: ${formatCurrency(total)} NOK`;
}
