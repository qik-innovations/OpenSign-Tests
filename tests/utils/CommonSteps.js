const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
require('dotenv').config();
const BASEURL = process.env.BASEURL;
if (!BASEURL) {
  throw new Error('BASEURL is not defined in the .env file');
}

class CommonSteps {
  constructor(page) {
    this.page = page;
  }

  async navigateToBaseUrl() {
    await this.page.goto(BASEURL);
  }

  async login() {
    await this.page.locator('#email').fill(loginCredentials.email);
    await this.page.locator('#password').fill(loginCredentials.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyPageTitle(expectedTitle) {
    const title = await this.page.title();
    if (title === expectedTitle) {
      console.log(`Page title is correct: ${expectedTitle}`);
    } else {
      console.error(`Page title is incorrect. Expected: "${expectedTitle}", Got: "${title}"`);
    }
  }
}

module.exports = CommonSteps;