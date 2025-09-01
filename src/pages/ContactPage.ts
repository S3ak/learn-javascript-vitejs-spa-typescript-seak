export class ContactPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'contact-page';
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="contact-container">
          <div class="contact-header">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div class="contact-content">
            <div class="contact-info">
              <h2>Get in Touch</h2>
              
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div class="contact-details">
                  <h4>Address</h4>
                  <p>123 Commerce Street<br>Business District<br>New York, NY 10001</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div class="contact-details">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div class="contact-details">
                  <h4>Email</h4>
                  <p>support@shophub.com</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">🕒</div>
                <div class="contact-details">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div class="contact-form-container">
              <h2>Send us a Message</h2>
              
              <form class="contact-form" id="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div class="form-group">
                  <label for="subject">Subject</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" rows="6" required 
                            placeholder="Please describe your inquiry in detail..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary submit-btn">
                  Send Message
                </button>

                <div class="form-message" style="display: none;"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    const form = this.element.querySelector('#contact-form') as HTMLFormElement;
    const messageDiv = this.element.querySelector('.form-message') as HTMLElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        this.setLoading(true);
        this.hideMessage();
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
      } catch (error) {
        this.showMessage('Failed to send message. Please try again.', 'error');
      } finally {
        this.setLoading(false);
      }
    });
  }

  private setLoading(loading: boolean): void {
    const submitBtn = this.element.querySelector('.submit-btn') as HTMLButtonElement;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Sending...' : 'Send Message';
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    const messageDiv = this.element.querySelector('.form-message') as HTMLElement;
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
  }

  private hideMessage(): void {
    const messageDiv = this.element.querySelector('.form-message') as HTMLElement;
    messageDiv.style.display = 'none';
  }

  getElement(): HTMLElement {
    return this.element;
  }
}