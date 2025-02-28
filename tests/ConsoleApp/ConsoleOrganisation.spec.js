const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Organisations page in the console application and is prompted to upgrade.', async ({ page }) => {
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
  await page1.getByRole('button', { name: ' Teams' }).click();
  await page1.getByRole('menuitem', { name: 'Organizations' }).click();
    const title = await page1.title();
    if (title === 'Organizations - OpenSign™') {
      console.log('Page title is correct: Organizations - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Organizations - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Organizations');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
});
test('Verify that Professional plan user cannot access the Organisations page in the console application and is prompted to upgrade team plan.', async ({ page }) => {
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
  await page1.getByRole('button', { name: ' Teams' }).click();
  await page1.getByRole('menuitem', { name: 'Organizations' }).click();
    const title = await page1.title();
    if (title === 'Organizations - OpenSign™') {
      console.log('Page title is correct: Organizations - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Organizations - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Organizations');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
});
});