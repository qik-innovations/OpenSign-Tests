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
    if (title === 'Organizations - OpenSign™') {
      console.log('Page title is correct: Organizations - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Organizations - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Organizations');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
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
  await expect.poll(async () => await consolePage.title()).toBe('Organizations - OpenSign™');

  // Step 5: Create a new organization
  await consolePage.locator('#renderList i').nth(1).click();
  await expect(consolePage.getByRole('heading')).toContainText('Add Organization');
  await expect(consolePage.locator('label')).toContainText('Name *');

  // Verify reset functionality
  await consolePage.getByRole('textbox').fill('Demo organization');
  await consolePage.getByText('Reset').click();
  await expect(consolePage.getByRole('textbox')).toHaveValue('');

  // Generate unique organization name
  const orgName = `Demo organization ${Math.floor(Math.random() * 1000)}`;
  await consolePage.getByRole('textbox').fill(orgName);
  await consolePage.getByRole('button', { name: 'Submit' }).click();

  // Step 6: Verify organization is listed
  await expect(consolePage.locator('thead')).toContainText(['Sr.NoNameIsActive']);
  await expect(consolePage.getByRole('row', { name: orgName }).getByRole('checkbox')).toBeVisible();

  // Step 7: Deactivate organization
 await consolePage.getByRole('row', { name: orgName }).getByRole('checkbox').click({ force: true });
  await expect(consolePage.getByRole('heading')).toContainText('Organization status');
  await expect(consolePage.locator('#selectSignerModal')).toContainText('Are you sure you want to deactivate this Organization?');
  await consolePage.getByRole('button', { name: 'Yes' }).click();
});

});