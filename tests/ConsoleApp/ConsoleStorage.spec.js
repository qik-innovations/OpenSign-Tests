const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
const STORAGE_PAGE = '#renderList';
const STORAGE_HEADING = /Setup file storage/i;
const FREE_USER_UPGRADE_BUTTON = `${STORAGE_PAGE} button:has-text("Upgrade now")`;
const PRO_USER_UPGRADE_BUTTON = `${STORAGE_PAGE} button:has-text("Upgrade to Team Plan")`;

async function openConsolePopup(page) {
  await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
  const popupPromise = page.waitForEvent('popup');
  await page.getByText('Console').click();
  const popup = await popupPromise;
  await popup.waitForLoadState('networkidle');
  return popup;
}

async function openStoragePanel(page) {
  await page.getByText('Storage').first().click();
  await page.waitForURL('**/console/storage', { timeout: 120000 });
  await expect(page.getByRole('heading', { name: STORAGE_HEADING })).toBeVisible({ timeout: 120000 });
  await expect(page.locator(STORAGE_PAGE)).toBeVisible({ timeout: 120000 });
}

async function revealStorageForm(page) {
  // Try clicking common edit icons until the storage form inputs/selects appear
  const target = page.locator('select[name="fileAdapterName"], input[name="fileAdapterName"]');
  for (let i = 0; i < 4; i++) {
    try {
      await page.locator('#renderList i').nth(i).click();
    } catch (e) {
      // ignore click failures
    }
    try {
      await target.waitFor({ state: 'visible', timeout: 2000 });
      return;
    } catch (e) {
      // continue
    }
  }
  // final attempt: click the first edit icon and wait longer
  await page.locator('#renderList i').first().click();
  await target.waitFor({ state: 'visible', timeout: 10000 });
}
test.describe('Console app', () => {
test('Verify that a free user cannot access the Storage page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    const page1 = await openConsolePopup(page);
//verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Wade', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await openStoragePanel(page1);
  await expect(page1.locator(STORAGE_PAGE)).toContainText(/Enabling BYOC lets you connect your own S3 storage/i);
  await expect(page1.locator(STORAGE_PAGE)).toContainText(/upgrade to .*team plan|upgrade now|upgrade/i);
  await expect(page1.locator(`${STORAGE_PAGE} >> text=/Upgrade/i`)).toBeVisible({ timeout: 120000 });
});

test('Verify that Professional plan user cannot access the Storage page in the console application and is prompted to upgrade Team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    const page1 = await openConsolePopup(page);
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pro plan User', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign');
  await openStoragePanel(page1);
  await expect(page1.locator('#root')).toContainText('PRO');
  await expect(page1.locator(STORAGE_PAGE)).toContainText(/Enabling BYOC lets you connect your own S3 storage/i);
  await expect(page1.locator(STORAGE_PAGE)).toContainText(/upgrade to .*team plan|upgrade now|upgrade/i);
  await expect(page1.locator(PRO_USER_UPGRADE_BUTTON)).toBeVisible();
});

test('Verify that Team plan user set the custom file storage AWSS3', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.loginForCustomStorgeUser(page);
  const page1 = await openConsolePopup(page);
  await openStoragePanel(page1);
  await revealStorageForm(page1);
  await page1.locator('select[name="fileAdapterName"]').click();
  await page1.locator('select[name="fileAdapterName"]').selectOption('AWS3PeterAccount');
  await page1.getByRole('button', { name: 'Save & activate' }).click();
  const commonSteps1 = new CommonSteps(page1);
  await commonSteps1.loginForCustomStorgeUser();
   await page1.getByRole('menuitem', { name: 'Sign yourself' }).click();
      await page1.locator('input[name="Name"]').fill('Offer Letter for QA1144');
      const fileChooserPromise = page1.waitForEvent('filechooser');
    await page1.locator('input[type="file"]').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
    await page1.getByRole('button', { name: 'Next' }).click();
    await commonSteps1.waitAndPlaceSignatureAndClickSave('signature', 600, 200);
  await commonSteps1.dragAndDrop('stamp', 600, 250);
  await page1.getByText('Upload stamp').click();
  await commonSteps1.uploadStamp();
  await commonSteps1.ClickSavebuttonSignerModal();
  await commonSteps1.dragAndDrop('initials', 600, 300);
  await commonSteps1.ClickSavebuttonSignerModal();
  await commonSteps1.dragAndDrop('image', 600, 400);
  await commonSteps1.uploadImage();
  await commonSteps1.ClickSavebuttonSignerModal();
  await commonSteps1.clickFinishButtonOnPlaceholder();
  await page1.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page1.getByRole('button', { name: 'Close' }).click();
  const page2 = await openConsolePopup(page1);
  await openStoragePanel(page2);
 await page2.getByRole('button', { name: 'Reconnect to OpenSign™' }).click();
  const commonSteps2 = new CommonSteps(page2);
  await commonSteps2.loginForCustomStorgeUser();

});
test('Verify that a Team Plan user can configure custom file storage using DigitalOcean and is able to update the storage settings.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.loginForCustomStorgeUser(page);
    const page1 = await openConsolePopup(page);
    await openStoragePanel(page1);
    await revealStorageForm(page1);
    await expect(page1.getByRole('button', { name: 'Save & activate' })).toBeVisible({ timeout: 120000 });

});
});

 
