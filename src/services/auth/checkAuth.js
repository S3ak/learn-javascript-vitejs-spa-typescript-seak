import { load } from "../storage/storage.js";

/**
 * Checks if the user is currently logged in by verifying the presence of an access token.
 *
 * @returns {boolean} Returns true if an access token exists, indicating the user is logged in; otherwise, false.
 */
export function isUserLoggedIn() {
  const token = load("accessToken");
  return !!token; // The !! converts a value to a strict boolean
}
