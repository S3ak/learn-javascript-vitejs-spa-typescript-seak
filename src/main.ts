import "./style.css";
import { renderRoute } from "./router";
import { login, logout, UPDATE_ITEMS } from "./services/store/actions";

// Render initial content based on the current path
renderRoute(window.location.pathname);

const AppEl = document.getElementById("app-content");

// We need to listen to the browser changes
window.addEventListener("popstate", (event) => {
  // The 'event.state' object contains the state we pushed earlier.
  // If the state is null, it might be the initial page load.
  const path = event.state ? event.state.path : window.location.pathname;
  console.log(`Navigating to ${path} via popstate`);
  renderRoute(path);
});

if (AppEl) {
  AppEl.addEventListener("click", (event) => {
    const { id } = event.target as HTMLElement;

    switch (id) {
      case "js-login-button":
        // In a real app, this data would come from a login form as a payload
        login({ name: "Jane Doe" });
        break;
      case "js-logout-button":
        logout();
        break;
      case "js-demo-update":
        UPDATE_ITEMS();
        break;
      default:
        break;
    }
  });
}

// Need to check that the browser supports service workers
if ("serviceWorker" in navigator) {
  // Register our service worker file
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

/**
 * Add event listeners to our links
 */
const linkEls: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll("#js-primary-nav a");

if (linkEls) {
  linkEls.forEach((link) => link.addEventListener("click", navigate));
}

function navigate(event: MouseEvent) {
  event.preventDefault();
  let path: string | null;

  const el = event?.target as HTMLAnchorElement;

  path = el.getAttribute("href");

  if (typeof path === "string") {
    // Change the URL in the address bar
    history.pushState({ path: path }, "", path);

    // Update the content based on the path
    renderRoute(path);
  }
}
