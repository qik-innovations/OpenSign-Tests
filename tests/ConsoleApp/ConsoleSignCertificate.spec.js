const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Signing certificate page in the console application and is prompted to upgrade.', async ({ page }) => {
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
  await page1.getByRole('menuitem', { name: 'Signing certificate' }).click();
    const title = await page1.title();
    if (title === 'Signing certificate - OpenSign™') {
      console.log('Page title is correct: Signing certificate - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Signing certificate - OpenSign™", Got: "${title}"`);
    }
    
  await expect(page1.getByRole('heading')).toContainText('Custom signing certificate');
  await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade to team plan"`);
  await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
  
});
test('Verify that Professional plan user cannot access the Signing certificate page in the console application and is prompted to upgrade Team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Mathew Steven', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign Lab');
  await page1.getByRole('menuitem', { name: 'Signing certificate' }).click();
    const title = await page1.title();
    if (title === 'Signing certificate - OpenSign™') {
      console.log('Page title is correct: Signing certificate - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Signing certificate - OpenSign™", Got: "${title}"`);
    }
    
  await expect(page1.getByRole('heading')).toContainText('Custom signing certificate');
  await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade to team plan"`);
  await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
  
});
test('Verify that Team plan user can access the Signing certificate page in the console application and can upload the pfx certificate.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pravin Testing account', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Signing certificate' }).click();
    const title = await page1.title();
    if (title === 'Signing certificate - OpenSign™') {
      console.log('Page title is correct: Signing certificate - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Signing certificate - OpenSign™", Got: "${title}"`);
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