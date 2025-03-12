const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that professional user cannot access the OrgAdmins page in the console application and is prompted to upgrade team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Mathew Steven', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign Lab');
  await page1.getByRole('button', { name: ' Teams' }).click();
  await page1.getByRole('menuitem', { name: 'OrgAdmins' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('OrgAdmins');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan'); 
});
});