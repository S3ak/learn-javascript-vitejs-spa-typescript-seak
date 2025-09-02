import { renderRoute } from "../../router";
import { state } from "./store";

export function UPDATE_ITEMS() {
  state.numberOfItems++;
  renderRoute(); // The magic! Re-render the current page.
}

// We'll pass our router instance here so actions can trigger re-renders.
export function login(user) {
  state.auth.isLoggedIn = true;
  state.auth.user = user;
  renderRoute(); // The magic! Re-render the current page.
}

export function logout() {
  state.auth.isLoggedIn = false;
  state.auth.user = null;
  renderRoute(); // Re-render again.
}
