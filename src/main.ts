import "./style.css";
import { dummyProducts } from "./stubs/dummy-products";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

const PATHS = {
  home: {
    url: "/",
    component: HomePage,
  },
  products: {
    url: "/products",
    component: ProductsPage,
  },
  about: {
    url: "/about",
    component: AboutPage,
  },
  profile: {
    url: "/profile",
    component: ProfilePage,
  },
} as const;

// Render initial content based on the current path
renderContent(window.location.pathname);

// We need to listen to the browser changes
window.addEventListener("popstate", (event) => {
  // The 'event.state' object contains the state we pushed earlier.
  // If the state is null, it might be the initial page load.
  const path = event.state ? event.state.path : window.location.pathname;
  console.log(`Navigating to ${path} via popstate`);
  renderContent(path);
});

/**
 * Add event listeners to our links
 */
const linkEls: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll("#js-primary-nav a");

if (linkEls) {
  linkEls.forEach((link) => {
    link.addEventListener("click", navigate);
  });
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
    renderContent(path);
  }
}

function renderContent(path = "") {
  // Get the element where content will be rendered
  const contentContainer = document.getElementById("app-content");

  if (!path || !contentContainer) return;

  // Find the matching route by path
  const route = Object.values(PATHS).find((route) => route.url === path);

  let html = "";

  if (route) {
    // Pass dummyState only to ProductsPage, pass nothing to others
    html = route.component();
  } else {
    html = NotFoundPage();
  }

  contentContainer.innerHTML = html;
}

// function isInputElement(target: EventTarget): target is HTMLInputElement {
//   return target instanceof HTMLInputElement;
// }
