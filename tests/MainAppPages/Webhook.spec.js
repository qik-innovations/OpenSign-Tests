const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');

test.describe('WebHook', () => {
  test('Verify that free user cannot add the live webhook.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await commonSteps.closeTourIfVisible();
    await commonSteps.openSettingsMenuItem('Webhook');

    const title = await page.title();
    if (title === 'Webhook - OpenSign™') {
      console.log('Page title is correct: Webhook - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Webhook - OpenSign™", Got: "${title}"`);
    }

    await page.getByText('Live Webhook:').click();
    await page.locator("(//button[text()='Add webhook'])[1]").click();
    await page.getByText('Upgrade now to set webhook').click();
    await expect(page.getByText('Upgrade now to set webhook')).toBeVisible();
    await page.locator('button[aria-label="Close"]').nth(0).click();
  });

  test('Verify that free user can add the sandbox webhook.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await commonSteps.closeTourIfVisible();
    await commonSteps.openSettingsMenuItem('API token');

    const title = await page.title();
    if (title === 'API Token - OpenSign™') {
      console.log('Page title is correct: API Token - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "API Token - OpenSign™", Got: "${title}"`);
    }

    await page.locator('//button[normalize-space()="Generate test token" or normalize-space()="Regenerate test token"]').click();
    await expect(page.locator("//span[@class='cursor-pointer' and contains(text(),'test.')]")).toBeVisible();
    await commonSteps.openSettingsMenuItem('Webhook');

    const title1 = await page.title();
    if (title1 === 'Webhook - OpenSign™') {
      console.log('Page title is correct: Webhook - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Webhook - OpenSign™", Got: "${title1}"`);
    }

    await page.locator('div').filter({ hasText: /^Sandbox Webhook:/ }).getByRole('button', { name: 'Add webhook' }).click();
    await page.getByPlaceholder('Enter webhook url').click();
    await expect(page.getByRole('heading', { name: 'Add webhook' })).toBeVisible();
    await page.getByText('Sandbox Webhook', { exact: true }).click();
    await expect(page.getByText('Sandbox Webhook', { exact: true })).toBeVisible();
    await page.getByPlaceholder('Enter webhook url').click();
    await page.getByPlaceholder('Enter webhook url').fill('https://webhook-test.com/3bacfd06fe3044b818fa0858c7a5b7f0');
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator("//span[@id='token' and contains(text(),'https://webhook-test.com')]")).toBeVisible();
  });
});
