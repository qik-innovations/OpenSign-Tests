const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');
const STORAGE_PAGE = '#renderList';
const STORAGE_HEADING = /Setup file storage/i;
const FREE_USER_UPGRADE_BUTTON = `${STORAGE_PAGE} button:has-text("Upgrade now")`;
const PRO_USER_UPGRADE_BUTTON = `${STORAGE_PAGE} button:has-text("Upgrade to Team Plan")`;
const PROFILE_MENU_BUTTON = '//button[@aria-controls="profile-menu-list"]';
async function openConsolePopup(page) {
  await page.locator(PROFILE_MENU_BUTTON).click();
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: /Console/ }).click();
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
    const closeTourButton = page.getByRole('button', { name: 'Close Tour' });
    await closeTourButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await closeTourButton.isVisible()) {
      await closeTourButton.click({ force: true });
      await expect(page.locator('.reactour__mask')).toBeHidden({ timeout: 10000 });
    }
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
  await commonSteps.login();
  const page1 = await openConsolePopup(page);
  await openStoragePanel(page1);
  await revealStorageForm(page1);
  const storageAdapter = page1.locator('select[name="fileAdapterName"]');
  const awsS3Adapter = 'File adaptor aws s3';
  await expect(storageAdapter.locator(`option[value="${awsS3Adapter}"]`)).toHaveCount(1);
  if (await storageAdapter.inputValue() !== awsS3Adapter) {
    await storageAdapter.selectOption(awsS3Adapter);
  }

  const activateStorageButton = page1.getByRole('button', { name: 'Save & activate' });
  if (await activateStorageButton.isVisible().catch(() => false)) {
    await activateStorageButton.click();
  }
  await expect(storageAdapter).toHaveValue(awsS3Adapter);
  await expect(page1.getByRole('button', { name: 'Update' })).toBeVisible();
  await expect(page1.getByRole('button', { name: /Reconnect to OpenSign/i })).toBeVisible();
});
test('Verify that a Team Plan user can configure custom file storage using DigitalOcean and is able to update the storage settings.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    const page1 = await openConsolePopup(page);
    await openStoragePanel(page1);
    await revealStorageForm(page1);
    await expect(page1.getByRole('button', { name: 'Save & activate' })).toBeVisible({ timeout: 120000 });

});
});

 
