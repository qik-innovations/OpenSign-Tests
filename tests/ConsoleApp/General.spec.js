  const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
  test.describe('Console app', () => {
    test('Verify that a free user cannot access the General page and is prompted to upgrade.', async ({ page }) => {
        const commonSteps = new CommonSteps(page);
        await commonSteps.navigateToBaseUrl();
        await commonSteps.NewUserlogin();
        await page.locator(PROFILE_MENU_BUTTON).click();
        const page1Promise = page.waitForEvent('popup');
        await page.locator(CONSOLE_OPTION).click();
        const page1 = await page1Promise;
        await expect(page1.locator(PROFILE_NAME)).toContainText('Mathew Wade', { timeout: 120000 });
        await expect(page1.locator(PROFILE_DOMAIN)).toContainText('qikAi.com');
        const title = await page1.title();
        if (title === 'General - OpenSign™') {
          console.log('Page title is correct: General - OpenSign™');
        } else {
          console.error(`Page title is incorrect. Expected: "General - OpenSign™", Got: "${title}"`);
        }
        await expect(page1.locator(UPGRADE_BUTTON)).toContainText('Upgrade now');
      });
  test('Verify that signature type selection in Console reflects in Preferences.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and login
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await expect(page).toHaveURL(/.*dashboard/);

  // Step 2: Navigate to Console → General
await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click(); 
const page1Promise = page.waitForEvent('popup'); 
await page.getByText('Console').click(); 
const page1 = await page1Promise; 
await page1.getByRole('menuitem', { name: 'General' }).click(); 
const title = await page1.title(); 
if (title === 'General - OpenSign™') 
  { console.log('Page title is correct: General - OpenSign™'); }
 else { console.error(`Page title is incorrect. Expected: "General - OpenSign™", Got: "${title}"`); } await expect(page1.locator('#renderList')).toContainText('General');
  // Step 3: Verify General page loads with signature type options
  await expect(page1.locator('#renderList')).toContainText('draw');
  await expect(page1.locator('#renderList')).toContainText('typed');
  await expect(page1.locator('#renderList')).toContainText('upload');
  await expect(page1.locator('#renderList')).toContainText('default');

// Step 3: Locate the "typed" checkbox
const typedCheckbox = page1.locator('//div[div[normalize-space(text())="typed"]]//input[@type="checkbox"]');
// If it's not already checked, click it to check
if (!(await typedCheckbox.isChecked())) {
  await typedCheckbox.click();
  console.log('Typed checkbox was unchecked → now checked');
}
// Now click again to uncheck
await typedCheckbox.click();
console.log('Typed checkbox is now unchecked');
  // Step 4: Disable "typed" and save
  await page1.getByText('typed', { exact: true }).click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await expect(page1.locator('#renderList')).toContainText('Allow indexing of public profile by search engines');

  // Step 5: Navigate to Settings → Preferences
  await page1.close();
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Preferences' }).click();

  // Step 6: Verify updated signature types are reflected in Preferences
  const preferencesPanel = page.locator('#panel-general');
  await expect(preferencesPanel).toContainText('draw');
  await expect(preferencesPanel).toContainText('upload');
  await expect(preferencesPanel).toContainText('default');
  await expect(preferencesPanel).not.toContainText('typed');
  //await expect(preferencesPanel).not.toContainText('type');
});
 test('Verify that professional plan users cannot access the general page.', async ({ page }) => {
// Step 1: Navigate to Base URL and login
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.ProfessionPlanUserlogin();
   await expect(page).toHaveURL(/.*dashboard/);

  // Step 2: Navigate to Console → General
await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click(); 
const page1Promise = page.waitForEvent('popup'); 
await page.getByText('Console').click(); 
const page1 = await page1Promise; await page1.getByRole('menuitem', { name: 'General' }).click(); 
const title = await page1.title(); 
if (title === 'General - OpenSign™') 
  { console.log('Page title is correct: General - OpenSign™'); }
 else { console.error(`Page title is incorrect. Expected: "General - OpenSign™", Got: "${title}"`); } await expect(page1.locator('#renderList')).toContainText('General');
  await expect(page1.locator('#renderList')).toContainText('Upgrade now');
 });

  });