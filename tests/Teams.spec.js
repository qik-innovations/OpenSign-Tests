const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('./utils/CommonSteps');
test('Verify that a new free user cannot add teams and is prompted to upgrade to a Teams plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
  
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'Teams' }).click();

    const title = await page.title();
    if (title === 'Teams - OpenSign™') {
      console.log('Teams - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Teams - OpenSign™", Got: "${title}"`);
    }
    await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();
  await page.locator('//button[@class=\'op-btn op-btn-accent\' and text()=\'Upgrade now\']').click();});