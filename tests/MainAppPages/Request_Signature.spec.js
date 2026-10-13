const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

test('Request signature scenario', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();
  await commonSteps.closeTourIfVisible();

  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(require('path').join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));

  await page.locator('.text-xs > div > .cursor-pointer').first().click();
  await page.getByLabel('Add yourself').check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Advanced options').click();
  await expect(page.locator('form')).toContainText('Auto reminder Upgrade now');
  await expect(page.locator('form')).toContainText('Enable OTP verification Upgrade now');

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByText('Upgrade now').nth(3).click()
  ]);

  await popup.waitForLoadState();
  await popup.goto('https://staging-app.opensignlabs.com/subscription');
  await expect(popup.locator('#root')).toContainText('OPENSIGN™ FREE');
  await page.bringToFront();

  const page2Promise = page.waitForEvent('popup');
  await page.locator('span').filter({ hasText: 'Enable OTP verification' }).locator('span').click();
  const page2 = await page2Promise;
  await expect(page2.locator('#root')).toContainText('OPENSIGN™ FREE');
  await page.bringToFront();

  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 });
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 });
});
