const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Storage page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Wade');
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');
  await expect(page1.locator('#renderList')).toContainText('Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.');
  await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
  await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`
    - paragraph: Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.
    - button "Upgrade to team plan"
    `);
});

test('Verify that Professional plan user cannot access the Storage page in the console application and is prompted to upgrade Team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Mathew Steven');
await expect(page1.locator('#root')).toContainText('OpenSign Lab');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#root')).toContainText('PRO');
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');
  await expect(page1.locator('#renderList')).toContainText('Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.');
  await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
  await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`
    - paragraph: Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.
    - button "Upgrade to team plan"
    `);
});
test('Verify that Team plan user cannot access the Storage page in the console application.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pravin Testing account');
await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#root')).toContainText('Pravin Testing account');
    await expect(page1.locator('#root')).toContainText('TEAM');
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');
  
    
});});

 