import { allure } from "allure-playwright";
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
require('dotenv').config();
const BASEURL = process.env.BASEURL;
const locators = {
  createAccountButton: 'button[name="Create account"]',
  nameInput: 'input[type="text"]',
  emailInput: '#email',
  phoneInput: 'input[type="tel"]',
  companyInput: '//input[4]',
  jobTitleInput: '//input[5]',
  passwordInput: 'input[name="password"]',
  termsCheckbox: 'input[id="termsandcondition"]',
  registerButton: '//button[contains(.,\'Register\')]',
  freePlanButton: 'li:has-text("OPENSIGN™ FREEFreeBilled") button',
  professionalPlanButton: 'li:has-text("OPENSIGN™ PROFESSIONAL$9.99/") button',
  proceedButton: "//span[@class='btn-txt' and text()='Proceed']",
  addressField: '//input[@id=\'billing_street\']',
  cityField: '//input[@id=\'billing_city\']',
  zipCodeField: '//input[@id=\'billing_zip\']',
 
  sameAsBillingCheckbox: 'input[name="sameasbillingaddress"]',
  reviewOrderButton: '//button[@class=\'btn-txt\' and text() =\'Review Order\']',
};

const fillSignupForm = async (page, { name, email, phone, company, jobTitle, password }) => {
  await page.locator(locators.nameInput).first().fill(name);
  await page.locator(locators.emailInput).fill(email);
  await page.locator(locators.phoneInput).fill(phone);
  await page.locator(locators.companyInput).fill(company);
  await page.locator(locators.jobTitleInput).fill(jobTitle);
  await page.locator(locators.passwordInput).fill(password);
  await page.locator(locators.termsCheckbox).click();
};

if (!BASEURL) {
  throw new Error('BASEURL is not defined in the .env file');
}
//get the browser name, version and OS details
test.beforeEach(async ({ browserName, browser }) => {
  const browserVersion = await browser.version();
  const osPlatform = process.platform;
  allure.label("Browser Name", browserName);
  console.log("browser name" + browserName);
  allure.label("Browser Version "+ browserVersion);
  console.log("Browser version" + browserVersion);
  allure.label("OS", osPlatform);
  console.log("Browser Platform"+ osPlatform);
});
class CommonSteps {
  constructor(page) {
    this.page = page;
  }

  async navigateToBaseUrl() {
  
    await this.page.goto(BASEURL,{ timeout: 120000 });
    
  }

  async login() {
    await this.page.locator('#email').fill(loginCredentials.email);
    await this.page.locator('#password').fill(loginCredentials.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  //this functions is created only loging for the user is in profession plan
  async ProfessionPlanUserlogin() {
    await this.page.locator('#email').fill(loginCredentials.ProplanUsername);
    await this.page.locator('#password').fill(loginCredentials.ProPlanpassword);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  //Here we are allowing free plan new user if global variable FreeplanUsername is empty.
  //  then it will redirected to sign up page to sign up with free plan
  //if global variable FreeplanUsername has value then new user will redirected only to login page
  async NewUserlogin() {
    
    if (!loginCredentials.FreeplanUsername) {
      console.log('FreeplanUsername is empty. Running signup test...');
      await this.signupTestFreeUser(this.page);
    }
    else{
console.log(`FreeplanUsername exists: ${loginCredentials.FreeplanUsername}`);
    await this.page.locator('#email').fill(loginCredentials.FreeplanUsername);
    
    await this.page.locator('#password').fill(loginCredentials.FreePlanpassword);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  }

  async verifyPageTitle(expectedTitle) {
    const title = await this.page.title();
    if (title === expectedTitle) {
      console.log(`Page title is correct: ${expectedTitle}`);
    } else {
      console.error(`Page title is incorrect. Expected: "${expectedTitle}", Got: "${title}"`);
    }
  }

//this method is signing up the user in free plan
  async signupTestFreeUser(page) {
    //await this.navigateToBaseUrl(); // Corrected reference
    await page.getByRole('button', { name: 'Create account' }).click({ timeout: 120000 });
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible({ timeout: 120000 });

    const email = `pravin+${Math.random()}@nxglabs.in`;
    loginCredentials.FreeplanUsername = email;
    loginCredentials.FreePlanpassword = 'Nxglabs@123';

    await fillSignupForm(page, {
      name: 'Mathew Wade',
      email,
      phone: '8238988998',
      company: 'qikAi.com',
      jobTitle: 'HrExecative',
      password: loginCredentials.FreePlanpassword,
    });

    await page.locator(locators.registerButton).click();
    await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 120000 });
    await page.locator(locators.freePlanButton).click();
    await page.getByLabel('Close').click();
    await expect(page.locator('//div[@id="profile-menu"]//parent::button[text()="Upgrade now"]')).toBeVisible();

    const title = await page.title();
    expect(title).toBe('Dashboard - OpenSign™');
    
    console.log(`✅ Signup successful. User: ${loginCredentials.FreeplanUsername}`);
  }
}

module.exports = CommonSteps;