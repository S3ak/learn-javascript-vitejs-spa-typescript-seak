import { describe, it, expect, vitest } from "vitest";
import { isUserLoggedIn } from "./checkAuth";
import { load } from "../storage/storage";

vitest.mock("../storage/storage.js");

describe("CheckAuth", async () => {
  it("should return true if an access token exists", () => {
    load.mockReturnValue("a-fake-token-string");

    const result = isUserLoggedIn();

    expect(result).toBe(true);
    expect(load).toHaveBeenCalledWith("accessToken");
  });

  it("should return false if no access token exists", () => {
    load.mockReturnValue(null);

    const result = isUserLoggedIn();

    expect(result).toBe(false);
  });
});
