const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Branding page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Wade', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await page1.getByRole('menuitem', { name: 'Branding' }).click();
    const title = await page1.title();
    if (title === 'Branding - OpenSign™') {
      console.log('Page title is correct: Branding - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Branding - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Upgrade to enterprise plan');
    await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade to enterprise plan"`);
});
test('Verify that Profession plan User cannot access the Branding page in the console application and is promted to upgrade to enterprise plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
  //verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Steven', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('OpenSign Lab');
  await page1.getByRole('menuitem', { name: 'Branding' }).click();
    const title = await page1.title();
    if (title === 'Branding - OpenSign™') {
      console.log('Page title is correct: Branding - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Branding - OpenSign™", Got: "${title}"`);
    }
    
    await expect(page1.locator('#root')).toContainText('PRO');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to enterprise plan');
    await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade to enterprise plan"`);
  });
  test('Verify that Team plan User cannot access the Branding page in the console application and is promted to upgrade to enterprise plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
  //verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Pravin Testing account', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Branding' }).click();
    const title = await page1.title();
    if (title === 'Branding - OpenSign™') {
      console.log('Page title is correct: Branding - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Branding - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#root')).toContainText('Pravin Testing account', { timeout: 120000 });
    await expect(page1.locator('#root')).toContainText('TEAM');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to enterprise plan');
    await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade to enterprise plan"`);
  });
});