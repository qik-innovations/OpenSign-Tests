const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

test('Verify that a new free user cannot save email preferences is prompted to upgrade', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Preferences');

  const title = await page.title();
  if (title === 'OpenSign™ Preferences') {
    console.log('Page title is correct: OpenSign™ Preferences');
  } else {
    console.error(`Page title is incorrect. Expected: "OpenSign™ Preferences", Got: "${title}"`);
  }

  await expect(page.getByRole('heading', { name: 'OpenSign™ Preferences' })).toBeVisible();
  await page.getByText('General').click();
  await expect(page.getByText('Allowed signature types')).toBeVisible();
  await page.getByText('draw').click();
  await expect(page.locator('//label[@title="Enabling this allows signers to draw signature" and text()="draw"]')).toBeVisible();
  await expect(page.locator('//label[@title="Enabling this allows signers to typed signature" and text()="type"]', { exact: true })).toBeVisible();
  await expect(page.locator('//label[@title="Enabling this allows signers to upload signature" and text()="upload"]')).toBeVisible();
  await expect(page.locator('//label[@title="Enabling this allows signers to default signature" and text()="default"]')).toBeVisible();
  await expect(page.getByText('Notify on signaturesUpgrade')).toBeVisible();
  await expect(page.locator('//label[contains(., "Notify on signatures")]//span[normalize-space(.)="Upgrade now"]').getByText('Upgrade now')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Timezone' })).toBeVisible();
  await page.locator('.css-n9qnu9').click();
  await page.locator('//div[text()="(GMT+10:00) Canberra, Melbourne, Sydney"]').click();
  await page.locator('#renderList div').filter({ hasText: 'Allowed signature' }).nth(2).click();
  await page.locator('.css-n9qnu9').click();
  await page.locator('#renderList div').filter({ hasText: 'Allowed signature' }).nth(2).click();
  await page.locator("//label[text()='Date format']/following-sibling::select").selectOption({ label: 'MM/DD/YYYY' });
  await page.locator("//label[text()='Document download filename format']/following-sibling::select").selectOption({ label: 'document Name - name@domain.com.pdf' });
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Saved successfully.')).toBeVisible();
});
