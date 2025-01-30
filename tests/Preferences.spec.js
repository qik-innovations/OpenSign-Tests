const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('./utils/CommonSteps');
test.describe('WebHook', () => {
test('Verify that New free user can save the general preferences.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'Preferences' }).click();

    const title = await page.title();
    if (title === 'Preferences - OpenSign™') {
      console.log('Page title is correct: Preferences - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Preferences - OpenSign™", Got: "${title}"`);
    }
    await expect(page.getByRole('heading', { name: 'OpenSign™ Preferences ?' })).toBeVisible();
  await page.getByText('General').click();
  await expect(page.getByText('Allowed signature types')).toBeVisible();
  await page.getByText('draw').click();
  await expect(page.getByText('draw')).toBeVisible();
  await expect(page.getByText('type', { exact: true })).toBeVisible();
  await expect(page.getByText('upload')).toBeVisible();
  await expect(page.getByText('default')).toBeVisible();
  await expect(page.getByText('Notify on signaturesUpgrade')).toBeVisible();
  await expect(page.locator('#renderList').getByText('Upgrade now')).toBeVisible();
  const page3Promise = page.waitForEvent('popup');
  await page.locator('#renderList').getByText('Upgrade now').click();
  const page3 = await page3Promise;
  await expect(page.getByRole('heading', { name: 'Select your Timezone' })).toBeVisible();
  await page.locator('svg').click();
  await page.locator('#renderList div').filter({ hasText: 'Allowed signature' }).nth(2).click();
  await page.locator('.css-n9qnu9').click();
  await page.locator('#renderList div').filter({ hasText: 'Allowed signature' }).nth(2).click();
  await page.locator('svg').click();
  await page.getByRole('option', { name: '(GMT-6:00) Saskatchewan' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Saved successfully.').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Saved successfully.').click();
});
test('Verify that New free user can save the email preferences it will ask to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'Preferences' }).click();

    const title = await page.title();
    if (title === 'Preferences - OpenSign™') {
      console.log('Page title is correct: Preferences - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Preferences - OpenSign™", Got: "${title}"`);
    }
    await expect(page.getByRole('heading', { name: 'OpenSign™ Preferences ?' })).toBeVisible();
  await page.getByText('Email').click();
  await page.getByRole('button', { name: 'Upgrade now' }).nth(1).click();
});});
