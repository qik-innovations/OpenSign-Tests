const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('./utils/CommonSteps');
test.describe('My signature', () => {
test('Verify that New user can draw and save the signature on the my signature page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'My signature' }).click();

    const title = await page.title();
    if (title === 'Teams - OpenSign™') {
      console.log('Page title is correct: Teams - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Teams - OpenSign™", Got: "${title}"`);
    }

    await page.locator('//canvas[@class=\'signatureCanvas border-[2px] border-[#888] rounded-box\']').click({
        position: {
          x: 150,
          y: 84
        }
      });
      await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(150, 105)
await page.mouse.up();
      await page.locator('//canvas[@class=\'intialSignature rounded-box\']').click({
        position: {
          x: 98,
          y: 96
        }
      });
      await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(98, 120)
await page.mouse.up();
await page.locator('//button[@class=\'op-btn op-btn-primary\' and text()= \'Save\']').click();
 test.setTimeout(60 * 1000);
await expect(page.getByText('Signature saved successfully.')).toBeVisible();
});
test('Verify that New user can upload and save the signature on the my signature page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    test.setTimeout(60 * 1000);
    await page.getByRole('button', { name: ' Settings' }).click();
    await page.getByRole('menuitem', { name: 'My signature' }).click();

    const title = await page.title();
    if (title === 'Teams - OpenSign™') {
      console.log('Page title is correct: Teams - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Teams - OpenSign™", Got: "${title}"`);
    }
     const fileChooserPromise1 = page.waitForEvent('filechooser');
     await page.locator('//div[@class=\'op-link\' and text()=\'Upload\']').click();
     const fileChooser1 = await fileChooserPromise1;
     await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/signature.png'));
     const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.locator('//div[@class=\'op-link text-sm md:text-base mr-1\' and text()=\'Upload\']').click();
    const fileChooser2 = await fileChooserPromise2;
     await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/initial.png'));
await page.locator('//button[@class=\'op-btn op-btn-primary\' and text()= \'Save\']').click();
 test.setTimeout(60 * 1000);
await expect(page.getByText('Signature saved successfully.')).toBeVisible();
});
});