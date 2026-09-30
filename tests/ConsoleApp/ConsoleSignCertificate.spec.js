const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');

const PROFILE_MENU_BUTTON = '//button[@type="button" and @aria-controls="profile-menu-list"]//i[contains(@class, "fa-angle-down")]';
const CONSOLE_OPTION = '//button[@type="button" and contains(., "Console")]//i[contains(@class,"fa-id-card")]';
const PROFILE_NAME = '//div[@id="root"]//p[@class="text-[14px] font-bold text-base-content"]';
test.describe('Console app', () => {
test('Verify that a free user cannot access the Signing certificate page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: 'Close Tour' }).click();
    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;
//verify the profile name on the profile

  await expect(page1.locator('#root')).toContainText('Mathew Wade', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await page1.getByRole('menuitem', { name: 'Signing certificate' }).click();
    const title = await page1.title();
    if (title.includes('OpenSign')) {
      console.log(`Page title is correct: ${title}`);
    } else {
      console.error(`Page title is incorrect. Expected an OpenSign page, Got: "${title}"`);
    }
    
  await expect(page1.getByRole('heading')).toContainText(/custom signing certificate/i);
  await expect(page1.locator('#renderList')).toContainText(/upgrade to .*plan/i);
  
});
test('Verify that Professional plan user cannot access the Signing certificate page in the console application and is prompted to upgrade Team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
     await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pro plan User', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign');
  await page1.getByRole('menuitem', { name: 'Signing certificate' }).click();
    const title = await page1.title();
    if (title.includes('OpenSign')) {
      console.log(`Page title is correct: ${title}`);
    } else {
      console.error(`Page title is incorrect. Expected an OpenSign page, Got: "${title}"`);
    }
    
  await expect(page1.getByRole('heading')).toContainText(/custom signing certificate/i);
  await expect(page1.locator('#renderList')).toContainText(/upgrade to .*plan/i);
  
});
test('Verify that Team plan user can access the Signing certificate page in the console application and can upload the pfx certificate.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
     await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pravin Testing account', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Signing certificate' }).click();
    const title = await page1.title();
    if (title.includes('OpenSign')) {
      console.log(`Page title is correct: ${title}`);
    } else {
      console.error(`Page title is incorrect. Expected an OpenSign page, Got: "${title}"`);
    }
     const fileChooserPromise = page1.waitForEvent('filechooser');
      await page1.locator('input[type="file"]').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '../TestData/fred.pfx'));
    await page1.getByPlaceholder('Enter password of pfx file').fill('apples');
    await page1.getByRole('button', { name: 'Save' }).click();
    await page1.getByRole('button', { name: 'Use default OpenSign™ certificate' }).click();
});
});