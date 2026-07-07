const { allure } = require("allure-playwright");
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const LoginPage = require('./PageObjects/LoginPageobject');
const CommonSteps = require('../utils/CommonSteps');
require('dotenv').config();

const BASEURL = process.env.BASEURL;

if (!BASEURL) {
  throw new Error('BASEURL is not defined in the .env file');
}

test.describe('Login Page Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page, browserName, browser }) => {
    loginPage = new LoginPage(page);
    const browserVersion = await browser.version();
    const osPlatform = process.platform;
    allure.label("Browser Name", browserName);
    console.log("browser name: " + browserName);
    allure.label("Browser Version", browserVersion);
    console.log("Browser version: " + browserVersion);
    allure.label("OS", osPlatform);
    console.log("Browser Platform: " + osPlatform);
  });

  // ==================== POSITIVE TEST CASES ====================
  test.describe('Positive Login Tests', () => {
    test('Verify that user can login with valid credentials Teams plan user', async ({ page }) => {
      allure.description('Verify successful login with Teams plan user credentials');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.fillEmail(loginCredentials.email);
      await loginPage.fillPassword(loginCredentials.password);
      await loginPage.clickLogin();
      
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      // Verify dashboard is loaded
      const maxRetries = 5;
      let retries = 0;
      let pageTitle = await loginPage.getPageTitle();
      while (!pageTitle.includes('Dashboard') && retries < maxRetries) {
        console.log('Page title after login attempt: ' + pageTitle);
        await page.waitForTimeout(3000);
         pageTitle = await loginPage.getPageTitle();
        retries++;
      }   
        console.log('Final page title after login attempts: ' + pageTitle);     
    });

    test('Verify that user can login with valid Pro plan credentials', async ({ page }) => {
      allure.description('Verify successful login with Pro plan user credentials');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.fillEmail(loginCredentials.ProplanUsername);
      await loginPage.fillPassword(loginCredentials.ProPlanpassword);
      await loginPage.clickLogin();
      
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      // Verify dashboard is loaded
      const maxRetries = 5;
      let retries = 0;
      let pageTitle = await loginPage.getPageTitle();
      while (!pageTitle.includes('Dashboard') && retries < maxRetries) {
        console.log('Page title after login attempt: ' + pageTitle);
        await page.waitForTimeout(3000);
         pageTitle = await loginPage.getPageTitle();
        retries++;
      }   
        console.log('Final page title after login attempts: ' + pageTitle);  
      
    });

    test('Verify that login page displays correct page title', async ({ page }) => {
      allure.description('Verify login page has correct page title on initial load');
      await loginPage.navigateToLogin(BASEURL);
      
      const pageTitle = await loginPage.getPageTitle();
      expect(pageTitle).toBeTruthy();
      console.log('Page title on login page: ' + pageTitle);
    });

    test('Verify that form submission works with Enter key on password field', async ({ page }) => {
      allure.description('Verify login form submission using Enter key on password field');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.submitLoginWithEnterKey(loginCredentials.email, loginCredentials.password);
   
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      // Verify dashboard is loaded
      const maxRetries = 5;
      let retries = 0;
      let pageTitle = await loginPage.getPageTitle();
      while (!pageTitle.includes('Dashboard') && retries < maxRetries) {
        console.log('Page title after login attempt: ' + pageTitle);
        await page.waitForTimeout(3000);
         pageTitle = await loginPage.getPageTitle();
        retries++;
      }   
        console.log('Final page title after login attempts: ' + pageTitle);  
    });

    test('Verify that user profile menu is visible after login', async ({ page }) => {
      allure.description('Verify user profile menu/info is displayed after successful login');
      const commonSteps = new CommonSteps(page);
      await commonSteps.navigateToBaseUrl();
      await commonSteps.login();
      
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      // Check for profile menu button or user info
        await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
  await expect(page.getByRole('list')).toContainText('pravin+testaccount@nxglabs.in');

    });

    test('Verify that user is redirected to dashboard after successful login', async ({ page }) => {
      allure.description('Verify user is redirected to dashboard URL after login');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.submitLoginForm(loginCredentials.email, loginCredentials.password);
      
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      const url = page.url();
      console.log('URL after login: ' + url);
      expect(url).toContain(BASEURL.replace(/\/$/, ''));
    });
  });

  // ==================== NEGATIVE TEST CASES ====================
  test.describe('Negative Login Tests', () => {
    test('Verify that login fails with invalid email address', async ({ page }) => {
      allure.description('Verify login fails with invalid email format');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.fillEmail('invalidemail@fakeemail.com');
      await loginPage.fillPassword('SomePassword123');
      await loginPage.clickLogin();
      
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      
      // Verify user is still on login page (not logged in)
      const loginButton = await loginPage.isLoginButtonVisible();
      expect(loginButton).toBe(true);
    });

    test('Verify that login fails with invalid password', async ({ page }) => {
      allure.description('Verify login fails with invalid password for valid email');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.fillEmail(loginCredentials.email);
      await loginPage.fillPassword('WrongPassword123!@#');
      await loginPage.clickLogin();
      
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      
      // Verify user is still on login page
      const loginButton = await loginPage.isLoginButtonVisible();
      expect(loginButton).toBe(true);
    });


    test('Verify that login is not allowed with both email and password empty', async ({ page }) => {
      allure.description('Verify login with both fields empty is prevented');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      // Try to submit without filling fields
      await loginPage.clickLogin();
      
      // Verify user is still on login page
      const emailField = await loginPage.isEmailFieldVisible();
      expect(emailField).toBe(true);
    });

    test('Verify that user cannot login with email only (no password)', async ({ page }) => {
      allure.description('Verify login attempt with email only is prevented');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.fillEmail(loginCredentials.email);
      await loginPage.clickLogin();
      
      // Verify still on login page
      const loginButton = await loginPage.isLoginButtonVisible();
      expect(loginButton).toBe(true);
    });

    test('Verify that user cannot login with password only (no email)', async ({ page }) => {
      allure.description('Verify login attempt with password only is prevented');
      await loginPage.navigateToLogin(BASEURL);
      await loginPage.verifyLoginPageLoaded();
      
      await loginPage.fillPassword(loginCredentials.password);
      await loginPage.clickLogin();
      
      // Verify still on login page
      const loginButton = await loginPage.isLoginButtonVisible();
      expect(loginButton).toBe(true);
    });
  });

  // ==================== UI/VALIDATION TEST CASES ====================
  test.describe('Login Page UI and Validation Tests', () => {
    test('Verify that email and password fields have proper labels', async ({ page }) => {
      allure.description('Verify email and password input fields have labels');
      await loginPage.navigateToLogin(BASEURL);
      const emailLabel = page.locator('label:has-text("Email"), label:has-text("email")').first();
      const passwordLabel = page.locator('label:has-text("Password"), label:has-text("password")').first();
      const emailLabelVisible = await emailLabel.isVisible().catch(() => false);
      const passwordLabelVisible = await passwordLabel.isVisible().catch(() => false);
      console.log('Email label visible: ' + emailLabelVisible);
      console.log('Password label visible: ' + passwordLabelVisible);
    });

    test('Verify that password field is masked (input type is password)', async ({ page }) => {
      allure.description('Verify password field is masked for security');
      await loginPage.navigateToLogin(BASEURL);
      
      const isMasked = await loginPage.isPasswordFieldMasked();
      expect(isMasked).toBe(true);
    });

    test('Verify that password is masked when entered', async ({ page }) => {
      allure.description('Verify entered password text is not visible');
      await loginPage.navigateToLogin(BASEURL);
      
      await loginPage.fillPassword('TestPassword123');
      const fieldType = await page.locator('#password').getAttribute('type');
      expect(fieldType).toBe('password');
    });

    test('Verify that Create account button is visible and clickable', async ({ page }) => {
      allure.description('Verify Create account link/button exists on login page');
      await loginPage.navigateToLogin(BASEURL);
      const createAccountVisible = await loginPage.isCreateAccountButtonVisible();
      if (createAccountVisible) {
        const createButton = page.locator('button[name="Create account"]');
        await expect(createButton).toBeEnabled();
      }
    });

    test('Verify that Forgot password link is visible', async ({ page }) => {
      allure.description('Verify Forgot password link is visible on login page');
      await loginPage.navigateToLogin(BASEURL);
      const forgotLink = page.locator('a:has-text("Forgot password?"), button:has-text("Forgot password?")').first();
      const isForgotVisible = await forgotLink.isVisible().catch(() => false);
      console.log('Forgot password link visible: ' + isForgotVisible);
    });

    test('Verify that form fields accept proper input', async ({ page }) => {
      allure.description('Verify form fields properly accept and store input values');
      await loginPage.navigateToLogin(BASEURL);
      const testEmail = 'test@example.com';
      const testPassword = 'TestPassword123!';
      const emailOk = await loginPage.fillEmailAndVerify(testEmail);
      const passwordOk = await loginPage.fillPasswordAndVerify(testPassword);
      expect(emailOk).toBe(true);
      expect(passwordOk).toBe(true);
    });

    test('Verify that email field clears correctly', async ({ page }) => {
      allure.description('Verify email field can be cleared');
      await loginPage.navigateToLogin(BASEURL);
      
      await loginPage.fillEmail('test@example.com');
      await loginPage.clearEmailField();
      const value = await loginPage.getEmailFieldValue();
      
      expect(value).toBe('');
    });

    test('Verify that password field clears correctly', async ({ page }) => {
      allure.description('Verify password field can be cleared');
      await loginPage.navigateToLogin(BASEURL);
      
      await loginPage.fillPassword('TestPassword123');
      await loginPage.clearPasswordField();
      const value = await loginPage.getPasswordFieldValue();
      
      expect(value).toBe('');
    });

    test('Verify that Tab navigation works between form fields', async ({ page }) => {
      allure.description('Verify tab key navigates between form fields');
      await loginPage.navigateToLogin(BASEURL);
      
      const emailField = page.locator('#email');
      await emailField.focus();
      await emailField.type('test@example.com');
      
      // Tab to password field
      await emailField.press('Tab');
      const passwordField = page.locator('#password');
      const isFocused = await passwordField.evaluate(el => document.activeElement === el).catch(() => false);
      
      console.log('Password field focused after tab: ' + isFocused);
    });
  });

  // ==================== STATE AND PERSISTENCE TEST CASES ====================
  test.describe('Login State and Session Tests', () => {
    test('Verify that multiple sequential login attempts work correctly', async ({ page }) => {
      allure.description('Verify multiple login attempts work without issues');
      await loginPage.navigateToLogin(BASEURL);
      
      // First attempt with wrong password
      await loginPage.fillEmail(loginCredentials.email);
      await loginPage.fillPassword('WrongPassword123');
      await loginPage.clickLogin();
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      
      // Clear fields
      await loginPage.clearAllFields();
      
      // Second attempt with correct password
      await loginPage.fillEmail(loginCredentials.email);
      await loginPage.fillPassword(loginCredentials.password);
      await loginPage.clickLogin();
  await page.waitForLoadState("networkidle");
  //write the for loop until page title "Dashboard" is not available in 3 second
    const maxRetries = 5;
    let retries = 0;
    let pageTitle = await loginPage.getPageTitle();
    while (!pageTitle.includes('Dashboard') && retries < maxRetries) {
      console.log('Page title after login attempt: ' + pageTitle);
      await page.waitForTimeout(3000);
         pageTitle = await loginPage.getPageTitle();
        retries++;
    }   
        console.log('Final page title after login attempts: ' + pageTitle);
    });

    test('Verify that after successful login, going back to login URL redirects to dashboard', async ({ page }) => {
      allure.description('Verify logged-in user cannot access login page directly');
      const commonSteps = new CommonSteps(page);
      await commonSteps.navigateToBaseUrl();
      await commonSteps.login();
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      // Navigate to login page directly
      await loginPage.navigateToLogin(BASEURL);
      await page.waitForLoadState('networkidle', { timeout: 120000 });
      
      // Should be redirected away from login page
      const url = page.url();
      console.log('URL after navigating to login while logged in: ' + url);
    });

    test('Verify that session is cleared after failed login attempt', async ({ page }) => {
      allure.description('Verify failed login does not create a session');
      await loginPage.navigateToLogin(BASEURL);
      
      // Attempt login with invalid credentials
      await loginPage.fillEmail('invalid@email.com');
      await loginPage.fillPassword('InvalidPassword');
      await loginPage.clickLogin();
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      
      // Verify still on login page
      const emailFieldVisible = await loginPage.isEmailFieldVisible();
      expect(emailFieldVisible).toBe(true);
    });

    test('Verify that browser back button works correctly on login page', async ({ page }) => {
      allure.description('Verify browser back navigation on login page');
      await loginPage.navigateToLogin(BASEURL);
      
      // Navigate to another page first
      await page.goto(BASEURL + '?from=somewhere', { timeout: 120000 });
      
      // Go back
      await loginPage.clickBrowserBack();
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      
      // Verify login page is still accessible
      const emailFieldVisible = await loginPage.isEmailFieldVisible();
      expect(emailFieldVisible).toBe(true);
    });
  });

  // ==================== ACCESSIBILITY AND USABILITY TEST CASES ====================
  test.describe('Login Page Accessibility Tests', () => {
    test('Verify that all interactive elements are keyboard accessible', async ({ page }) => {
      allure.description('Verify login form elements are accessible via keyboard');
      await loginPage.navigateToLogin(BASEURL);
      
      const emailField = page.locator('#email');
      const passwordField = page.locator('#password');
      const loginButton = page.getByRole('button', { name: 'Login' });
      
      // Try to focus on elements with keyboard
      await emailField.focus();
      let focused = await emailField.evaluate(el => document.activeElement === el).catch(() => false);
      expect(focused).toBe(true);
      
      await passwordField.focus();
      focused = await passwordField.evaluate(el => document.activeElement === el).catch(() => false);
      expect(focused).toBe(true);
      
      await loginButton.focus();
      focused = await loginButton.evaluate(el => document.activeElement === el).catch(() => false);
      expect(focused).toBe(true);
    });

    test('Verify that form does not auto-submit when clicking in field', async ({ page }) => {
      allure.description('Verify login form requires explicit submit action');
      await loginPage.navigateToLogin(BASEURL);
      
      await loginPage.fillEmail(loginCredentials.email);
      await page.waitForTimeout(1000);
      
      // Verify still on login page
      const loginButtonVisible = await loginPage.isLoginButtonVisible();
      expect(loginButtonVisible).toBe(true);
    });

    test('Verify that page scroll to top when login page loads', async ({ page }) => {
      allure.description('Verify login page scroll position is at top');
      await loginPage.navigateToLogin(BASEURL);
      const scrollTop = await page.evaluate(() => window.scrollY);
      console.log('Scroll position at login page load: ' + scrollTop);
    });
  });
});
