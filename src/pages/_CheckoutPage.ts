import { store } from "../services/store/store";
import { router } from "../router";

export class CheckoutPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.className = "checkout-page";
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    const state = store.getState();
    const cartItems = state.cart;
    const total = store.getCartTotal();

    if (cartItems.length === 0) {
      this.renderEmptyCart();
      return;
    }

    this.element.innerHTML = `
      <div class="page-container">
        <div class="checkout-container">
          <div class="checkout-main">
            <h1>Checkout</h1>
            
            <div class="checkout-section">
              <h2>Order Summary</h2>
              <div class="order-items">
                ${cartItems
                  .map((item) => {
                    const discountedPrice =
                      item.product.price *
                      (1 - item.product.discountPercentage / 100);
                    const itemTotal = discountedPrice * item.quantity;

                    return `
                    <div class="order-item">
                      <img src="${item.product.thumbnail}" alt="${
                      item.product.title
                    }" class="item-image" />
                      <div class="item-details">
                        <h4>${item.product.title}</h4>
                        <p class="item-brand">${item.product.brand}</p>
                        <div class="item-quantity">
                          <button class="quantity-btn minus" data-product-id="${
                            item.product.id
                          }">-</button>
                          <span class="quantity">${item.quantity}</span>
                          <button class="quantity-btn plus" data-product-id="${
                            item.product.id
                          }">+</button>
                        </div>
                      </div>
                      <div class="item-pricing">
                        <span class="item-price">$${discountedPrice.toFixed(
                          2
                        )}</span>
                        <span class="item-total">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-item" data-product-id="${
                          item.product.id
                        }">Remove</button>
                      </div>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
              
              <div class="order-total">
                <div class="total-row">
                  <span>Subtotal:</span>
                  <span>$${total.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Shipping:</span>
                  <span>$9.99</span>
                </div>
                <div class="total-row">
                  <span>Tax:</span>
                  <span>$${(total * 0.08).toFixed(2)}</span>
                </div>
                <div class="total-row final-total">
                  <span>Total:</span>
                  <span>$${(total + 9.99 + total * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="checkout-section">
              <h2>Shipping Information</h2>
              <form class="shipping-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" id="address" name="address" required 
                         placeholder="123 Main Street" />
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" id="city" name="city" required />
                  </div>
                  <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" id="state" name="state" required />
                  </div>
                  <div class="form-group">
                    <label for="zipCode">ZIP Code</label>
                    <input type="text" id="zipCode" name="zipCode" required />
                  </div>
                </div>
              </form>
            </div>

            <div class="checkout-section">
              <h2>Payment Information</h2>
              <form class="payment-form">
                <div class="form-group">
                  <label for="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" name="cardNumber" required 
                         placeholder="1234 5678 9012 3456" maxlength="19" />
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" name="expiryDate" required 
                           placeholder="MM/YY" maxlength="5" />
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" required 
                           placeholder="123" maxlength="4" />
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="cardName">Name on Card</label>
                  <input type="text" id="cardName" name="cardName" required 
                         placeholder="John Doe" />
                </div>
              </form>
            </div>

            <div class="checkout-actions">
              <button class="btn btn-secondary continue-shopping" data-route="products">
                Continue Shopping
              </button>
              <button class="btn btn-primary place-order">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderEmptyCart(): void {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to proceed with checkout</p>
          <button class="btn btn-primary" data-route="products">
            Continue Shopping
          </button>
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    this.element.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const route = target.getAttribute("data-route");
      const productId = target.getAttribute("data-product-id");

      if (route) {
        e.preventDefault();
        router.navigate(route);
      }

      if (target.classList.contains("quantity-btn") && productId) {
        const id = parseInt(productId);
        const currentItem = store
          .getState()
          .cart.find((item) => item.product.id === id);

        if (currentItem) {
          if (target.classList.contains("minus")) {
            store.updateCartQuantity(id, currentItem.quantity - 1);
          } else if (target.classList.contains("plus")) {
            store.updateCartQuantity(id, currentItem.quantity + 1);
          }
          this.render();
        }
      }

      if (target.classList.contains("remove-item") && productId) {
        store.removeFromCart(parseInt(productId));
        this.render();
      }

      if (target.classList.contains("place-order")) {
        e.preventDefault();
        this.processOrder();
      }
    });

    // Format card number input
    const cardNumberInput = this.element.querySelector(
      "#cardNumber"
    ) as HTMLInputElement;
    cardNumberInput?.addEventListener("input", (e) => {
      const input = e.target as HTMLInputElement;
      let value = input.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
      const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
      input.value = formattedValue;
    });

    // Format expiry date input
    const expiryInput = this.element.querySelector(
      "#expiryDate"
    ) as HTMLInputElement;
    expiryInput?.addEventListener("input", (e) => {
      const input = e.target as HTMLInputElement;
      let value = input.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      input.value = value;
    });
  }

  private async processOrder(): void {
    try {
      // Simulate order processing
      const placeOrderBtn = this.element.querySelector(
        ".place-order"
      ) as HTMLButtonElement;
      placeOrderBtn.disabled = true;
      placeOrderBtn.textContent = "Processing...";

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and show success
      store.clearCart();

      this.element.innerHTML = `
        <div class="page-container">
          <div class="order-success">
            <div class="success-icon">✅</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <div class="success-actions">
              <button class="btn btn-primary" data-route="products">Continue Shopping</button>
              <button class="btn btn-secondary" data-route="profile">View Orders</button>
            </div>
          </div>
        </div>
      `;

      this.setupEventListeners();
    } catch (error) {
      alert("Failed to process order. Please try again.");
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
