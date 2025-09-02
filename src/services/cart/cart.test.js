import {
  calculateCartTotal,
  applyDiscount,
  addShippingCost,
  formatCurrency,
  calculateFinalPrice,
} from "./cart";
import { describe, it, expect } from "vitest";

describe("UNIT | Cart Service", () => {
  describe("Calculate Cart Total", () => {
    it(" of all items in cart", () => {
      const mockCart = [
        {
          id: 1,
          price: 100,
        },
        {
          id: 1,
          price: 150,
        },
      ];

      expect(calculateCartTotal(mockCart)).toBe(250);
    });
  });

  describe("calculates the discount", () => {
    it("when user is premium", async () => {
      const mockUser = {
        isPremium: true,
      };

      const mockTotal = 100;

      expect(applyDiscount(mockTotal, mockUser)).toBe(90);
    });

    it("when user is not premium", async () => {
      const mockUser = {
        isPremium: false,
      };

      const mockTotal = 100;

      expect(applyDiscount(mockTotal, mockUser)).toBe(100);
    });
  });

  describe("shipping cost", () => {
    it("adds shipping cost if total is less than 50", () => {
      expect(addShippingCost(40)).toBe(45);
      expect(addShippingCost(49.99)).toBe(54.99);
    });

    it("does not add shipping cost if total is 50 or more", () => {
      expect(addShippingCost(50)).toBe(50);
      expect(addShippingCost(100)).toBe(100);
    });

    it("returns 5 if called with no arguments", () => {
      expect(addShippingCost()).toBe(5);
    });
  });

  describe("Format currency", () => {
    it("with two decimal places by default", () => {
      expect(formatCurrency(10)).toBe("10.00");
      expect(formatCurrency(10.5)).toBe("10.50");
      expect(formatCurrency(10.567)).toBe("10.57");
      expect(formatCurrency(0)).toBe("0.00");
    });

    it("when called with no arguments", () => {
      expect(formatCurrency()).toBe("0.00");
    });

    it("when amounts are negative correctly", () => {
      expect(formatCurrency(-5)).toBe("-5.00");
      expect(formatCurrency(-5.678)).toBe("-5.68");
    });
  });

  describe("Controller | calculateFinalPrice", () => {
    it("for non-premium user with cart total >= 50 (no shipping, no discount)", () => {
      const cart = [
        { id: 1, price: 30 },
        { id: 2, price: 25 },
      ];
      const user = { isPremium: false };
      // total = 55, no discount, no shipping
      expect(calculateFinalPrice(cart, user)).toBe("Total: 55.00 NOK");
    });

    it("for non-premium user with cart total < 50 (shipping added, no discount)", () => {
      const cart = [
        { id: 1, price: 20 },
        { id: 2, price: 15 },
      ];
      const user = { isPremium: false };
      // total = 35, +5 shipping = 40
      expect(calculateFinalPrice(cart, user)).toBe("Total: 40.00 NOK");
    });

    it("for premium user with cart total >= 50 (discount, no shipping)", () => {
      const cart = [
        { id: 1, price: 60 },
        { id: 2, price: 40 },
      ];
      const user = { isPremium: true };
      // total = 100, discount = 90, no shipping
      expect(calculateFinalPrice(cart, user)).toBe("Total: 90.00 NOK");
    });

    it("for premium user with cart total < 50 (discount, shipping added)", () => {
      const cart = [
        { id: 1, price: 20 },
        { id: 2, price: 10 },
      ];
      const user = { isPremium: true };
      // total = 30, discount = 27, +5 shipping = 32
      expect(calculateFinalPrice(cart, user)).toBe("Total: 32.00 NOK");
    });

    it("for empty cart and non-premium user", () => {
      const cart = [];
      const user = { isPremium: false };
      // total = 0, +5 shipping = 5
      expect(calculateFinalPrice(cart, user)).toBe("Total: 5.00 NOK");
    });

    it("for empty cart and premium user", () => {
      const cart = [];
      const user = { isPremium: true };
      // total = 0, discount = 0, +5 shipping = 5
      expect(calculateFinalPrice(cart, user)).toBe("Total: 5.00 NOK");
    });
  });
});
