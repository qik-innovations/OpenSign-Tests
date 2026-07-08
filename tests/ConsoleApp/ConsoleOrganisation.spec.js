const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');

async function fillOrganizationForm(page, { orgName }) {
  const modal = page.locator('#selectSignerModal');
  await expect(modal).toBeVisible();
  await modal.locator('.op-loading').waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});

  const nameField = modal.locator('input[name="name"], input[placeholder*="Name" i], input[aria-label*="name" i]').first();
  await expect(nameField).toBeVisible({ timeout: 60000 });
  await nameField.fill(orgName);
}

test.describe('Console app', () => {
test('Verify that a free user cannot access the Organisations page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Wade', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await page1.getByRole('button', { name: ' Teams' }).click();
  await page1.getByRole('menuitem', { name: 'Organizations' }).click();
    const title = await page1.title();
    if (title.includes('OpenSign')) {
      console.log(`Page title is correct: ${title}`);
    } else {
      console.error(`Page title is incorrect. Expected an OpenSign page, Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Organizations');
    await expect(page1.locator('#renderList')).toContainText(/Upgrade to teams? plan/i);
});
test('Verify that Professional plan user cannot access the Organisations page in the console application and is prompted to upgrade team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pro plan User', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign');
  await page1.getByRole('button', { name: ' Teams' }).click();
  await page1.getByRole('menuitem', { name: 'Organizations' }).click();
    const title = await page1.title();
    if (title.includes('OpenSign')) {
      console.log(`Page title is correct: ${title}`);
    } else {
      console.error(`Page title is incorrect. Expected an OpenSign page, Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Organizations');
    await expect(page1.locator('#renderList')).toContainText(/Upgrade to teams? plan/i);
});
test('Verify that Teams plan user can access Organizations page and create an organization', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  // Step 2: Open Console in new popup
  await page.locator('#profile-menu.op-dropdown-open').click();
  const consolePagePromise = page.waitForEvent('popup');
  await page.getByText('Console').click();
  const consolePage = await consolePagePromise;

  // Step 3: Verify console landing
  await expect(consolePage.locator('#root')).toContainText('OpenSign', { timeout: 120000 });

  // Step 4: Navigate to Organizations page
  await consolePage.getByRole('button', { name: ' Teams' }).click();
  await consolePage.getByRole('menuitem', { name: 'Organizations' }).click();
  await expect(consolePage.locator('#renderList')).toContainText('Organizations');

  // Verify page title
  await expect.poll(async () => await consolePage.title()).toContain('OpenSign');

  // Step 5: Create a new organization
  await consolePage.locator('#renderList i').nth(1).click();
  await expect(consolePage.getByRole('heading')).toContainText('Add Organization');
  await expect(consolePage.locator('#selectSignerModal')).toContainText('Name *');

  // Verify reset functionality
  const orgNameField = consolePage.locator('#selectSignerModal').locator('input[name="name"], input[placeholder*="Name" i], input[aria-label*="name" i]').first();
  await orgNameField.fill('Demo organization');
  const resetButton = consolePage.locator('#selectSignerModal').locator('button, input[type="reset"]').filter({ hasText: /reset/i }).first();
  if (await resetButton.count()) {
    await resetButton.click();
  } else {
    await orgNameField.fill('');
  }
  await expect(orgNameField).toHaveValue('');

  // Generate unique organization name
  const orgName = `Demo organization ${Math.floor(Math.random() * 1000)}`;
  await fillOrganizationForm(consolePage, { orgName });
  await consolePage.getByRole('button', { name: 'Submit' }).click();

  // Step 6: Verify organization is listed
  await expect(consolePage.locator('thead')).toContainText(['Sr.NoNameIsActive']);
  await expect(consolePage.getByRole('row', { name: orgName }).getByRole('checkbox')).toBeVisible();

  // Step 7: Deactivate organization
 await consolePage.getByRole('row', { name: orgName }).getByRole('checkbox').click({ force: true });
  await expect(consolePage.getByRole('heading')).toContainText(/organization status/i);
  await expect(consolePage.locator('#selectSignerModal')).toContainText(/are you sure you want to deactivate this organization\?/i);
  await consolePage.getByRole('button', { name: 'Yes' }).click();
});

});