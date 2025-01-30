const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('./utils/CommonSteps');
test.describe('API Token', () => {
test('Verify that free user cannot generate the live api token.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'API token' }).click();

    const title = await page.title();
    if (title === 'API Token - OpenSign™') {
      console.log('Page title is correct: API Token - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "API Token - OpenSign™", Got: "${title}"`);
    }
    await page.getByRole('button', { name: 'Generate live token' }).click();
    await page.getByText('Unlock premium features').click();
    await page.getByRole('heading', { name: 'Upgrade to Paid Plan' }).click();
    await page.getByText('Upgrade now to generate').click();
    await page.getByLabel('Close').click();
   
    await page.getByText('Premium credits available:').click();
    await page.getByRole('button', { name: 'Buy premium credits' }).click();
    await page.getByLabel('Close').click();

});
test('Verify that free user can generate the sanbox test token.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
  
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'API token' }).click();

    const title = await page.title();
    if (title === 'API Token - OpenSign™') {
      console.log('Page title is correct: API Token - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "API Token - OpenSign™", Got: "${title}"`);
    }
    await page.getByRole('button', { name: 'Generate test token' }).click();
    await expect(page.locator("//span[@class='cursor-pointer' and contains(text(),'test.')]")).toBeVisible();
});});