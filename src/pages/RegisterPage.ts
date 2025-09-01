import { router } from '../router';

export class RegisterPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'register-page';
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>Create Account</h1>
            <p>Join us to start your shopping journey</p>
          </div>

          <form class="auth-form" id="register-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required 
                       placeholder="Enter your first name" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required 
                       placeholder="Enter your last name" />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required 
                     placeholder="Enter your email address" />
            </div>

            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required 
                     placeholder="Choose a username" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required 
                     placeholder="Create a strong password" />
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required 
                     placeholder="Confirm your password" />
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="terms" name="terms" required />
                <span class="checkmark"></span>
                I agree to the <a href="#" class="link">Terms of Service</a> and 
                <a href="#" class="link">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" class="btn btn-primary auth-submit">
              Create Account
            </button>

            <div class="auth-error" style="display: none;"></div>
          </form>

          <div class="auth-footer">
            <p>Already have an account? 
              <button class="link-btn" data-route="signin">Sign in here</button>
            </p>
          </div>

          <div class="demo-note">
            <p><strong>Note:</strong> This is a demo registration form. In a real application, 
            this would create an actual account.</p>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    const form = this.element.querySelector('#register-form') as HTMLFormElement;
    const errorDiv = this.element.querySelector('.auth-error') as HTMLElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password !== confirmPassword) {
        this.showError('Passwords do not match');
        return;
      }

      try {
        this.setLoading(true);
        this.hideError();
        
        // Simulate registration delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would call an API here
        this.showSuccess('Account created successfully! Please sign in.');
        
        setTimeout(() => {
          router.navigate('signin');
        }, 2000);
      } catch (error) {
        this.showError('Failed to create account. Please try again.');
      } finally {
        this.setLoading(false);
      }
    });

    // Navigation
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const route = target.getAttribute('data-route');
      
      if (route) {
        e.preventDefault();
        router.navigate(route);
      }
    });
  }

  private setLoading(loading: boolean): void {
    const submitBtn = this.element.querySelector('.auth-submit') as HTMLButtonElement;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Creating Account...' : 'Create Account';
  }

  private showError(message: string): void {
    const errorDiv = this.element.querySelector('.auth-error') as HTMLElement;
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.className = 'auth-error error';
  }

  private showSuccess(message: string): void {
    const errorDiv = this.element.querySelector('.auth-error') as HTMLElement;
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.className = 'auth-error success';
  }

  private hideError(): void {
    const errorDiv = this.element.querySelector('.auth-error') as HTMLElement;
    errorDiv.style.display = 'none';
  }

  getElement(): HTMLElement {
    return this.element;
  }
}