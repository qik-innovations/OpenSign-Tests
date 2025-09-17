const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Preferences', () => {
  const ROOT_SELECTOR = '#root';
const RENDER_LIST_SELECTOR = '#renderList';
test('Verify that New free user can save the general preferences.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
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
  await expect(page.locator('//label[@title="Enabling this allows signers to draw signature" and text()="draw"]')).toBeVisible();
  await expect(page.locator('//label[@title="Enabling this allows signers to typed signature" and text()="type"]', { exact: true })).toBeVisible();
  await expect(page.locator('//label[@title="Enabling this allows signers to upload signature" and text()="upload"]')).toBeVisible();
  await expect(page.locator('//label[@title="Enabling this allows signers to default signature" and text()="default"]')).toBeVisible();
  await expect(page.getByText('Notify on signaturesUpgrade')).toBeVisible();
  await expect(page.locator('#renderList').getByText('Upgrade now')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Timezone' })).toBeVisible();
// Open the dropdown
await page.locator('.css-n9qnu9').click();
//await page.locator('//div[@class="css-w54w9q-singleValue"]').click();
// Click the desired option
await page.locator('//div[text()="(GMT+10:00) Canberra, Melbourne, Sydney"]').click();
  await page.locator('#renderList div').filter({ hasText: 'Allowed signature' }).nth(2).click();
  await page.locator('.css-n9qnu9').click();
  await page.locator('#renderList div').filter({ hasText: 'Allowed signature' }).nth(2).click();
  await page.locator('//select[@class="op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content w-full h-full text-[11px]"]').selectOption({ label: "MM/DD/YYYY" });
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Saved successfully.')).toBeVisible();
});

test('Verify that a new free user cannot save email preferences is prompted to upgrade', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
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
});
test('Free user is prompted to upgrade when accessing the Mail page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'Preferences' }).click();
    const title = await page.title();
    if (title === 'Preferences - OpenSign™') {
      console.log('Page title is correct: Preferences - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Preferences - OpenSign™", Got: "${title}"`);
    }
    await expect(page.getByRole('heading', { name: 'OpenSign™ Preferences ?' })).toBeVisible();
    await expect(page.locator(RENDER_LIST_SELECTOR)).toContainText('Upgrade now');
    await expect(page.locator(RENDER_LIST_SELECTOR)).toMatchAriaSnapshot('- button "Upgrade now"');
  });

  test('Profession plan user can access the Email page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'Preferences' }).click();
    const title = await page.title();
    if (title === 'Preferences - OpenSign™') {
      console.log('Page title is correct: Preferences - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Preferences - OpenSign™", Got: "${title}"`);
    }
    await expect(page.getByRole('heading', { name: 'OpenSign™ Preferences ?' })).toBeVisible();
    await expect(page.locator(ROOT_SELECTOR)).toContainText('PRO');
    await expect(page.getByRole('heading')).toContainText('OpenSign™ Email Settings');
    await expect(page.locator(RENDER_LIST_SELECTOR)).toContainText('OpenSign™ default SMTP');
  });

  test('Team plan user can access the Email page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'Preferences' }).click();
    const title = await page.title();
    if (title === 'Preferences - OpenSign™') {
      console.log('Page title is correct: Preferences - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Preferences - OpenSign™", Got: "${title}"`);
    }
    await expect(page.getByRole('heading', { name: 'OpenSign™ Preferences ?' })).toBeVisible();
    await expect(page.locator(ROOT_SELECTOR)).toContainText('Pravin Testing account');
    await expect(page.locator(ROOT_SELECTOR)).toContainText('TEAM');
    await expect(page.getByRole('heading')).toContainText('OpenSign™ Email Settings');
    await expect(page.locator(RENDER_LIST_SELECTOR)).toContainText('OpenSign™ default SMTP');
  });

});
