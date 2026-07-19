const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

const PROFILE_MENU_BUTTON = '//div[@class="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]';
const CONSOLE_OPTION = '//ul[contains(@class, "op-dropdown-content")]//li/span[i[@class="fa-light fa-id-card"] and contains(normalize-space(.), "Console")]';
const PROFILE_NAME = '//div[@id="root"]//p[@class="text-[14px] font-bold text-base-content"]';
const PROFILE_DOMAIN = '//div[@id="root"]//p[@class="cursor-pointer text-[12px] text-base-content mt-2"]';
const UPGRADE_BUTTON = '#renderList button:has-text("Upgrade now")';

async function openConsoleGeneral(page) {
  await page.locator(PROFILE_MENU_BUTTON).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator(CONSOLE_OPTION).click();
  const page1 = await page1Promise;
  const generalMenuItem = page1.locator('span:has-text("General")').first();
  await expect(generalMenuItem).toBeVisible({ timeout: 60000 });
  await generalMenuItem.click();
  await expect(page1.locator('#renderList')).toBeVisible({ timeout: 60000 });
  return page1;
}

function consoleSettingToggle(page, settingName) {
  return page
    .locator('#renderList')
    .locator(`xpath=.//label[contains(normalize-space(.), "${settingName}")]/following-sibling::div//input[@type="checkbox"]`);
}

async function openPreferences(page) {
  await page.getByRole('button', { name: /Settings/i }).click();
  await page.getByRole('menuitem', { name: /Preferences/i }).click();
  await expect(page.getByRole('heading', { name: /OpenSign™ Preferences ?/i })).toBeVisible({ timeout: 60000 });
}

async function openEmailPreferences(page) {
  const emailTab = page.getByRole('tab', { name: /Email/i });
  await expect(emailTab).toBeVisible({ timeout: 60000 });
  await emailTab.click();
  await expect(emailTab).toHaveAttribute('aria-selected', 'true', { timeout: 60000 });
  await expect(page.getByRole('tabpanel')).toBeVisible({ timeout: 60000 });
}

test.describe('Console app - General page', () => {
  test('Verify that a free user cannot access the General page and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();

    const page1 = await openConsoleGeneral(page);
    await expect(page1.locator(PROFILE_NAME)).toContainText('Mathew Wade', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('qikAi.com');
    await expect(page1.locator('#renderList')).toContainText(/General/i);
    await expect(page1.locator(UPGRADE_BUTTON)).toContainText(/Upgrade/i);
  });

  test('Verify that signature type selection in Console reflects in Preferences.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page).toHaveURL(/.*dashboard/);

    const page1 = await openConsoleGeneral(page);
    await expect(page1.locator('#renderList')).toContainText(/Enabled Signature Types/i);
    await expect(page1.locator('#renderList')).toContainText(/draw/i);
    await expect(page1.locator('#renderList')).toContainText(/typed/i);
    await expect(page1.locator('#renderList')).toContainText(/upload/i);
    await expect(page1.locator('#renderList')).toContainText(/default/i);

    const typedOptionLabel = page1.locator('label[for="checkbox-typed"]');
    const typedOptionCheckbox = page1.locator('#checkbox-typed');
    await expect(typedOptionLabel).toBeVisible({ timeout: 60000 });
    if (await typedOptionCheckbox.isChecked()) {
      await typedOptionLabel.click();
    }
    await page1.getByRole('button', { name: /Save/i }).click();

    await page1.close();
    await openPreferences(page);

    const preferencesPanel = page.locator('#root');
    await expect(preferencesPanel).toContainText(/Allowed signature types/i);
    await expect(preferencesPanel).toContainText(/draw/i);
    await expect(preferencesPanel).toContainText(/upload/i);
    await expect(preferencesPanel).toContainText(/default/i);
    await expect(preferencesPanel).not.toContainText(/typed/i);
  });

  test('Verify that Team plan user can access the General page and save settings.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
await expect(page).toHaveURL(/.*dashboard/);
    const page1 = await openConsoleGeneral(page);
    await expect(page1.locator('#renderList')).toContainText(/General/i);
    await expect(page1.getByRole('checkbox', { name: 'draw' })).toBeChecked();
   await expect(page1.getByRole('checkbox', { name: 'typed' })).toBeChecked();
   await expect(page1.getByRole('checkbox', { name: 'upload' })).toBeChecked();
   await expect(page1.getByRole('checkbox', { name: 'default' })).toBeChecked();
    await page1.getByRole('checkbox', { name: 'typed' }).uncheck();
  await page1.getByRole('button', { name: 'Save' }).click();
    /*
    await expect(page1.locator('#renderList')).toContainText(/Allow indexing of public profile by search engines/i);
      await page1.locator('.op-toggle').first().uncheck();
    await expect(page1.locator('#renderList')).toContainText(/Allow email template customization for users individually/i);
      await page1.locator('div:nth-child(3) > .flex > .mt-3 > .op-toggle').uncheck();
    await expect(page1.locator('#renderList')).toContainText(/Disable individual user smtp settings/i);
     await page1.locator('div:nth-child(4) > .flex > .mt-3 > .op-toggle').uncheck();
    await expect(page1.locator('#renderList')).toContainText(/Hide live chat widget for signers/i);
    await page1.locator('div:nth-child(5) > .flex > .mt-3 > .op-toggle').uncheck();  */ 
    await page1.close();
    await openPreferences(page);
    await expect(page.locator('#renderList')).toContainText(/Allowed signature types/i);
await expect(page.getByRole('checkbox', { name: 'draw' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'typed' })).not.toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'upload' })).toBeChecked();
 await expect(page.getByRole('checkbox', { name: 'default' })).toBeChecked();
  const page1 = await openConsoleGeneral(page);
  await page1.getByRole('checkbox', { name: 'typed' }).isChecked();
  await page1.getByRole('button', { name: 'Save' }).click();
  /* 
  // await expect(page.locator('#panel-0')).toContainText('OpenSign™ default SMTP');
 await openEmailPreferences(page);
  await expect(page.locator('#panel-2')).toContainText('To let individual users customize their own email templates, navigate to Console → General.');
    //go back to general page reset all te settings to default and save it
     await page.getByText('Console → General.').click();
      await expect(page.getByText('GeneralEnabled Signature')).toBeVisible();
       await page.getByRole('checkbox', { name: 'typed' }).check();  
await page1.locator('.op-toggle').first().check();
  await page1.locator('div:nth-child(3) > .flex > .mt-3 > .op-toggle').check();
  await page1.locator('div:nth-child(4) > .flex > .mt-3 > .op-toggle').check();
  await page1.locator('div:nth-child(5) > .flex > .mt-3 > .op-toggle').check();
  await page.getByRole('button', { name: 'Save' }).click();
  */
  });

  test('Verify that professional plan users cannot access the General page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await expect(page).toHaveURL(/.*dashboard/);

    const page1 = await openConsoleGeneral(page);
    await expect(page1.locator('#renderList')).toContainText(/General/i);
    await expect(page1.locator(UPGRADE_BUTTON)).toContainText(/Upgrade/i);
  });
});
