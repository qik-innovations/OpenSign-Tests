const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.emailField = '#email';
    this.passwordField = '#password';
    this.loginButton = 'button:has-text("Login")';
    this.createAccountButton = 'button[name="Create account"]';
    this.forgotPasswordLink = 'a:has-text("Forgot password?")';
    this.errorMessageLocator = '.error, [role="alert"], .alert-danger';
    this.pageHeading = 'h1, h2, .login-title';
    this.rememberMeCheckbox = 'input[type="checkbox"]';
  }

  // Navigation
  async navigateToLogin(baseUrl) {
    await this.page.goto(baseUrl, { timeout: 120000 });
  }

  // Form filling
  async fillEmail(email) {
    await this.page.locator(this.emailField).fill(email);
  }

  async fillPassword(password) {
    await this.page.locator(this.passwordField).fill(password);
  }

  async fillCredentials(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
  }

  // Form submission
  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async submitLoginForm(email, password) {
    await this.fillCredentials(email, password);
    await this.clickLogin();
  }

  async submitLoginWithEnterKey(email, password) {
    await this.fillCredentials(email, password);
    await this.page.locator(this.passwordField).press('Enter');
  }

  // Navigation clicks
  async clickCreateAccount() {
    await this.page.locator(this.createAccountButton).click();
  }

  async clickForgotPassword() {
    const forgotLink = this.page.locator('a:has-text("Forgot password?")');
    await forgotLink.click();
  }

  // Form state checks
  async isLoginButtonEnabled() {
    return await this.page.getByRole('button', { name: 'Login' }).isEnabled();
  }

  async isLoginButtonDisabled() {
    return !(await this.isLoginButtonEnabled());
  }

  async isPasswordFieldMasked() {
    const passwordField = this.page.locator(this.passwordField);
    const fieldType = await passwordField.getAttribute('type');
    return fieldType === 'password';
  }

  async getEmailFieldValue() {
    return await this.page.locator(this.emailField).inputValue();
  }

  async getPasswordFieldValue() {
    return await this.page.locator(this.passwordField).inputValue();
  }

  async clearEmailField() {
    await this.page.locator(this.emailField).clear();
  }

  async clearPasswordField() {
    await this.page.locator(this.passwordField).clear();
  }

  async clearAllFields() {
    await this.clearEmailField();
    await this.clearPasswordField();
  }

  // Visibility and presence checks
  async isEmailFieldVisible() {
    return await this.page.locator(this.emailField).isVisible();
  }

  async isPasswordFieldVisible() {
    return await this.page.locator(this.passwordField).isVisible();
  }

  async isLoginButtonVisible() {
    return await this.page.getByRole('button', { name: 'Login' }).isVisible();
  }

  async isCreateAccountButtonVisible() {
    return await this.page.locator(this.createAccountButton).isVisible();
  }

  async isForgotPasswordLinkVisible() {
    return await this.page.locator('a:has-text("Forgot password?")').isVisible();
  }

  async isEmailLabelVisible() {
    return await this.page.locator('label:has-text("Email")').isVisible();
  }

  async isPasswordLabelVisible() {
    return await this.page.locator('label:has-text("Password")').isVisible();
  }

  // Error handling
  async getErrorMessage() {
    try {
      const errorElements = await this.page.locator('[role="alert"], .error-message, .invalid-feedback').all();
      if (errorElements.length > 0) {
        return await errorElements[0].textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async hasErrorMessage() {
    const errorMsg = await this.getErrorMessage();
    return errorMsg !== null && errorMsg.trim().length > 0;
  }

  async verifyErrorMessageVisible(expectedMessage) {
    await expect(this.page.locator('[role="alert"], .error-message, .invalid-feedback').first()).toContainText(expectedMessage);
  }

  async waitForErrorMessage(timeout = 5000) {
    await this.page.waitForSelector('[role="alert"], .error-message, .invalid-feedback', { timeout });
  }

  // Page state verification
  async verifyLoginPageLoaded() {
    await expect(this.page.locator(this.emailField)).toBeVisible();
    await expect(this.page.locator(this.passwordField)).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async verifyAllLoginElementsPresent() {
    await this.verifyLoginPageLoaded();
    const createAccountBtn = await this.isCreateAccountButtonVisible();
    const forgotLink = await this.isForgotPasswordLinkVisible();
    return createAccountBtn || forgotLink;
  }

  // Wait methods
  async waitForLoginPageLoad(timeout = 120000) {
    await this.page.locator(this.emailField).waitFor({ state: 'visible', timeout });
  }

  async waitForNavigationAfterLogin(timeout = 120000) {
    await this.page.waitForURL(/.*dashboard|.*home|.*document/, { timeout });
  }

  async waitForErrorToAppear(timeout = 5000) {
    try {
      await this.page.waitForSelector('[role="alert"], .error-message, .invalid-feedback', { timeout });
      return true;
    } catch {
      return false;
    }
  }

  // Page title and URL checks
  async getPageTitle() {
    return await this.page.title();
  }

  async verifyPageTitleContains(text) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }

  // Placeholder checks
  async getEmailPlaceholder() {
    return await this.page.locator(this.emailField).getAttribute('placeholder');
  }

  async getPasswordPlaceholder() {
    return await this.page.locator(this.passwordField).getAttribute('placeholder');
  }

  // Input validation
  async fillEmailAndVerify(email) {
    await this.fillEmail(email);
    const value = await this.getEmailFieldValue();
    return value === email;
  }

  async fillPasswordAndVerify(password) {
    await this.fillPassword(password);
    const value = await this.getPasswordFieldValue();
    return value === password;
  }

  // Tab navigation
  async tabToNextField(fromField) {
    await this.page.locator(fromField).press('Tab');
  }

  async tabFromEmailToPassword() {
    await this.tabToNextField(this.emailField);
  }

  async tabFromPasswordToLogin() {
    await this.tabToNextField(this.passwordField);
  }

  // Browser back/forward navigation
  async clickBrowserBack() {
    await this.page.goBack();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async isOnLoginPage() {
    const url = await this.getCurrentUrl();
    return url.includes('login') || await this.isEmailFieldVisible();
  }
}

module.exports = LoginPage;
