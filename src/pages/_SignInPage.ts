import { ApiService } from "../services/api";
import { store } from "../services/store/store";
import { router } from "../router";

export class SignInPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.className = "signin-page";
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue shopping</p>
          </div>

          <form class="auth-form" id="signin-form">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required 
                     placeholder="Enter your username" value="kminchelle" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required 
                     placeholder="Enter your password" value="0lelplR" />
            </div>

            <button type="submit" class="btn btn-primary auth-submit">
              Sign In
            </button>

            <div class="auth-error" style="display: none;"></div>
          </form>

          <div class="auth-footer">
            <p>Don't have an account? 
              <button class="link-btn" data-route="register">Create one here</button>
            </p>
          </div>

          <div class="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Username:</strong> kminchelle</p>
            <p><strong>Password:</strong> 0lelplR</p>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    const form = this.element.querySelector("#signin-form") as HTMLFormElement;
    const errorDiv = this.element.querySelector(".auth-error") as HTMLElement;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      try {
        this.setLoading(true);
        this.hideError();

        const { user, token } = await ApiService.login(username, password);
        store.login(user, token);
        router.navigate("products");
      } catch (error) {
        this.showError("Invalid username or password. Please try again.");
      } finally {
        this.setLoading(false);
      }
    });

    // Navigation
    this.element.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const route = target.getAttribute("data-route");

      if (route) {
        e.preventDefault();
        router.navigate(route);
      }
    });
  }

  private setLoading(loading: boolean): void {
    const submitBtn = this.element.querySelector(
      ".auth-submit"
    ) as HTMLButtonElement;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? "Signing In..." : "Sign In";
  }

  private showError(message: string): void {
    const errorDiv = this.element.querySelector(".auth-error") as HTMLElement;
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }

  private hideError(): void {
    const errorDiv = this.element.querySelector(".auth-error") as HTMLElement;
    errorDiv.style.display = "none";
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
