import "./style.css";

// import { Header } from './components/Header';
// import { ProductsPage } from './pages/ProductsPage';
// import { ProductDetailPage } from './pages/ProductDetailPage';
// import { SignInPage } from './pages/SignInPage';
// import { RegisterPage } from './pages/RegisterPage';
// import { ProfilePage } from './pages/ProfilePage';
// import { CheckoutPage } from './pages/CheckoutPage';
// import { ContactPage } from './pages/ContactPage';

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

  if (path === "/") {
    contentContainer.innerHTML = "<h1>Welcome to the Home Page</h1>";
  } else if (path === "/products") {
    contentContainer.innerHTML = `<h1>Our Products</h1><p>Here are some of our finest products.</p>`;
  } else if (path === "/about") {
    contentContainer.innerHTML = `<h1>About Us</h1><p>The shop at the end of the universe.</p>`;
  }
}

// function isInputElement(target: EventTarget): target is HTMLInputElement {
//   return target instanceof HTMLInputElement;
// }
