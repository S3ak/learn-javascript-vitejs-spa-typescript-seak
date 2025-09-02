import { filterByPrice } from "./productFilter";
import { describe, expect, it } from "vitest";

describe("UNIT | Product Filter", () => {
  it("should return products within the specified price range", () => {
    const sampleProducts = [
      { id: 1, name: "Laptop", price: 1200 },
      { id: 2, name: "Mouse", price: 25 },
      { id: 3, name: "Keyboard", price: 75 },
      { id: 4, name: "Monitor", price: 300 },
      { id: 5, name: "Webcam", price: 150 },
    ];

    const result = filterByPrice(sampleProducts, 100, 400);
    const monitor = { id: 4, name: "Monitor", price: 300 };

    expect(result)
      .toHaveLength(2)
      .toContainEqual(monitor)
      .not.toContainEqual("Laptop");
    result.map((item) => {
      expect(item.price).toBeGreaterThanOrEqual(100).toBeLessThanOrEqual(400);
    });
  });
});
