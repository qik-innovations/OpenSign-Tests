const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');
test.describe('API Token', () => {
test('Verify that free user cannot generate the live api token.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'API token' }).click();

    const title = await page.title();
    if (title === 'API Token - OpenSign™') {
      console.log('Page title is correct: API Token - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "API Token - OpenSign™", Got: "${title}"`);
    }
    const generateLiveTokenButton = page.getByRole('button', {
      name: /^(Generate|Regenerate) live token$/i,
    });
    await expect(generateLiveTokenButton).toBeVisible();
    await generateLiveTokenButton.click();
    const unlockPremiumFeatures = page.getByText('Unlock premium features');
    await expect(unlockPremiumFeatures).toBeVisible();
    await unlockPremiumFeatures.click();
    await expect(page.getByRole('heading', { name: 'Upgrade to Paid Plan' })).toBeVisible();
    await expect(page.getByText('Upgrade now to generate')).toBeVisible();
    await expect(
      page.locator("//span[@class='cursor-pointer' and contains(text(),'live.')]")
    ).toHaveCount(0);
   

});
test('Verify that free user can generate the sanbox test token.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'API token' }).click();

    const title = await page.title();
    if (title === 'API Token - OpenSign™') {
      console.log('Page title is correct: API Token - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "API Token - OpenSign™", Got: "${title}"`);
    }
    await expect(page).toHaveTitle(/API Token\s+-\s+OpenSign/i);

    const generateTestTokenButton = page.getByRole('button', {
      name: /^(Generate|Regenerate) test token$/i,
    });
    await expect(generateTestTokenButton).toBeVisible();
    await generateTestTokenButton.click();

    const testToken = page.locator("//span[@class='cursor-pointer' and contains(text(),'test.')]");
    await expect(testToken).toBeVisible({ timeout: 30000 });
    await expect(testToken).toContainText(/test\./i);
    
});});
