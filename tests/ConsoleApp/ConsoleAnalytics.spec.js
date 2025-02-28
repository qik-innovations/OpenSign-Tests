const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Analytics page in the console application and is prompted to upgrade.', async ({ page }) => {
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
    const title = await page1.title();
    if (title === 'Analytics - OpenSign™') {
      console.log('Page title is correct: Analytics - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Analytics - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Upgrade now');
    await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade now"`);
});
test('Verify that Profession plan User can access the Analytics page in the console application.', async ({ page }) => {
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
  const title = await page1.title();
  if (title === 'Analytics - OpenSign™') {
    console.log('Page title is correct: Analytics - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Analytics - OpenSign™", Got: "${title}"`);
  }
  await expect(page1.locator('#root')).toContainText('PRO');
  await expect(page1.locator('#renderList')).toContainText('Documents signed');
  await expect(page1.locator('#renderList')).toContainText('Templates count');
  await expect(page1.locator('#renderList')).toContainText('Emails sent');
  await expect(page1.locator('.bg-\\[\\#2ed8b6\\]').first()).toBeVisible();
  await expect(page1.locator('.grid > div:nth-child(2)')).toBeVisible();
  await expect(page1.locator('.grid > div:nth-child(3)')).toBeVisible();
});
test('Verify that Teams plan User can access the Analytics page in the console application.', async ({ page }) => {
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
  const title = await page1.title();
  if (title === 'Analytics - OpenSign™') {
    console.log('Page title is correct: Analytics - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Analytics - OpenSign™", Got: "${title}"`);
  }
  await expect(page1.locator('#root')).toContainText('Pravin Testing account');
  await expect(page1.locator('#root')).toContainText('TEAM');
  await expect(page1.locator('#renderList')).toContainText('Documents signed');
  await expect(page1.locator('#renderList')).toContainText('Templates count');
  await expect(page1.locator('#renderList')).toContainText('Emails sent');
  await expect(page1.locator('.bg-\\[\\#2ed8b6\\]').first()).toBeVisible();
  await expect(page1.locator('.grid > div:nth-child(2)')).toBeVisible();
  await expect(page1.locator('.grid > div:nth-child(3)')).toBeVisible();
});

});