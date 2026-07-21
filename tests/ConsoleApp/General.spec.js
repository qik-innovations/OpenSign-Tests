const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');
const PROFILE_MENU_BUTTON =
  '//div[@class="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]';
const CONSOLE_OPTION =
  '//ul[contains(@class, "op-dropdown-content")]//li/span[i[@class="fa-light fa-id-card"] and contains(normalize-space(.), "Console")]';
const PROFILE_NAME =
  '//div[@id="root"]//p[@class="text-[14px] font-bold text-base-content"]';
const PROFILE_DOMAIN =
  '//div[@id="root"]//p[@class="cursor-pointer text-[12px] text-base-content mt-2"]';
const UPGRADE_BUTTON = '#renderList button:has-text("Upgrade now")';

async function openConsoleGeneral(page) {
  await page.locator(PROFILE_MENU_BUTTON).click();

  const popupPromise = page.waitForEvent('popup');
  await page.locator(CONSOLE_OPTION).click();

  const consolePage = await popupPromise;
  const generalMenuItem = consolePage.locator('span:has-text("General")').first();

  await expect(generalMenuItem).toBeVisible({ timeout: 60000 });
  await generalMenuItem.click();
  await expect(consolePage.locator('#renderList')).toBeVisible({ timeout: 60000 });

  return consolePage;
}

async function openPreferences(page) {
  await page.getByRole('button', { name: /Settings/i }).click();
  await page.getByRole('menuitem', { name: /Preferences/i }).click();

  await expect(
    page.getByRole('heading', { name: /OpenSign.*Preferences/i })
  ).toBeVisible({ timeout: 60000 });
}

test.describe('Console app - General page', () => {
  // These tests modify the same account-level setting.
  test.describe.configure({ mode: 'serial' });

  test('Verify that a free user cannot access the General page and is prompted to upgrade.', async ({
    page,
  }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();

    const consolePage = await openConsoleGeneral(page);

    await expect(consolePage.locator(PROFILE_NAME)).toContainText('Mathew Wade', {
      timeout: 120000,
    });
    await expect(consolePage.locator(PROFILE_DOMAIN)).toContainText('qikAi.com');
    await expect(consolePage.locator('#renderList')).toContainText(/General/i);
    await expect(consolePage.locator(UPGRADE_BUTTON)).toContainText(/Upgrade/i);

    await consolePage.close();
  });

  test('Verify that signature type selection in Console reflects in Preferences.', async ({
    page,
  }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page).toHaveURL(/.*dashboard/);

    const consolePage = await openConsoleGeneral(page);

    await expect(consolePage.locator('#renderList')).toContainText(
      /Enabled Signature Types/i
    );
    await expect(consolePage.locator('#renderList')).toContainText(/draw/i);
    await expect(consolePage.locator('#renderList')).toContainText(/typed/i);
    await expect(consolePage.locator('#renderList')).toContainText(/upload/i);
    await expect(consolePage.locator('#renderList')).toContainText(/default/i);

    const typedOptionCheckbox = consolePage.locator('#checkbox-typed');

    await expect(typedOptionCheckbox).toBeVisible({ timeout: 60000 });

    if (await typedOptionCheckbox.isChecked()) {
      await typedOptionCheckbox.uncheck();
      await consolePage.getByRole('button', { name: /Save/i }).click();
    }

    await consolePage.close();

    await openPreferences(page);

    const preferencesPanel = page.locator('#root');

    await expect(preferencesPanel).toContainText(/Allowed signature types/i);
    await expect(preferencesPanel).toContainText(/draw/i);
    await expect(preferencesPanel).toContainText(/upload/i);
    await expect(preferencesPanel).toContainText(/default/i);
    await expect(preferencesPanel).not.toContainText(/typed/i);

    // Restore the account setting so later tests start clean.
    const restoredConsolePage = await openConsoleGeneral(page);
    const restoredTypedCheckbox = restoredConsolePage.locator('#checkbox-typed');

    await expect(restoredTypedCheckbox).not.toBeChecked();
    await restoredTypedCheckbox.check();
    await restoredConsolePage.getByRole('button', { name: /Save/i }).click();
    await restoredConsolePage.close();
  });

  test('Verify that a Team plan user can access the General page and update the individual email template setting.', async ({
    page,
  }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page).toHaveURL(/.*dashboard/);
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Preferences' }).click();
  await page.getByText('Email', { exact: true }).click();
  await expect(page.getByPlaceholder('{{sender_name}} has requested')).toHaveValue('{{sender_name}} has requested you to sign {{document_title}}');
  await expect(page.locator('#panel-2')).toContainText('Hi {{receiver_name}},We hope this email finds you well. {{sender_name}} has requested you to review and sign {{document_title}}.Your signature is crucial to proceed with the next steps as it signifies your agreement and authorization.Sign hereIf you have any questions or need further clarification regarding the document or the signing process, please contact the sender.ThanksTeam OpenSign™');
  await expect(page.getByPlaceholder('{{sender_name}}  has')).toHaveValue('Document {{document_title}} has been signed by all parties');
  await expect(page.locator('#panel-2')).toContainText('Hi {{sender_name}},All parties have successfully signed the document {{document_title}}. Kindly download the document from the attachment.ThanksTeam OpenSign™');
   const consolePage = await openConsoleGeneral(page);

await expect(consolePage.locator('#renderList')).toContainText(/General/i);
await expect(consolePage.locator('#console-general')).toContainText(
  'Allow email template customization for users individually'
);

const individualTemplateToggle = consolePage.locator(
  `xpath=//label[contains(normalize-space(.), 'Allow email template customization for users individually')]/following-sibling::div//input[@type='checkbox']`
);
await individualTemplateToggle.uncheck();
await expect(consolePage.getByText('Saved successfully.')).toBeVisible();

await consolePage.close();
  await page.goto('https://staging-app.opensignlabs.com/preferences');
  await page.getByText('Email', { exact: true }).click();
await expect(page.locator('#panel-2')).toContainText(
  'To let individual users customize their own email templates, navigate to Console → General.'
);

await page.getByText('Console → General.').click();
await expect(page.locator('#renderList')).toContainText('General');
await page.locator(`xpath=//label[contains(normalize-space(.), 'Allow email template customization for users individually')]/following-sibling::div//input[@type='checkbox']`).check();
await expect(page.getByText('Saved successfully.')).toBeVisible();
  });
test('Verify that a Team plan user can access the General page and update the individual user smtp setting.', async ({
    page,
  }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page).toHaveURL(/.*dashboard/);
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Preferences' }).click();
  await expect(page.locator('#panel-0')).toContainText('OpenSign™ default SMTP');
   const consolePage = await openConsoleGeneral(page);
await expect(consolePage.locator('#renderList')).toContainText(/General/i);
await expect(consolePage.locator('#console-general')).toContainText(
  'Disable individual user smtp settings'
);

const individualSmtpToggle = consolePage.locator(
  `xpath=//label[
    contains(normalize-space(.), 'Disable individual user smtp settings')
    or contains(normalize-space(.), 'Enable individual user smtp settings')
  ]/following-sibling::div//input[@type='checkbox']`
);

await individualSmtpToggle.uncheck({ force: true });
await expect(individualSmtpToggle).not.toBeChecked();
await expect(consolePage.getByText('Saved successfully.')).toBeVisible();
await consolePage.close();
  await page.goto('https://staging-app.opensignlabs.com/preferences');
await expect(
  page.locator(`xpath=//button[normalize-space(.)='OpenSign™ default SMTP']`)
).not.toBeVisible();
 const consolePage1 = await openConsoleGeneral(page);
await expect(consolePage1.locator('#renderList')).toContainText(/General/i);
await expect(consolePage1.locator('#console-general')).toContainText(
  'Enable individual user smtp settings'
);

const individualSmtpToggle1 = consolePage1.locator(
  `xpath=//label[
    contains(normalize-space(.), 'Disable individual user smtp settings')
    or contains(normalize-space(.), 'Enable individual user smtp settings')
  ]/following-sibling::div//input[@type='checkbox']`
);

await individualSmtpToggle1.check({ force: true });
await expect(consolePage1.getByText('Saved successfully.')).toBeVisible();
  });

  test('Verify that professional plan users cannot access the General page.', async ({
    page,
  }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await expect(page).toHaveURL(/.*dashboard/);

    const consolePage = await openConsoleGeneral(page);

    await expect(consolePage.locator('#renderList')).toContainText(/General/i);
    await expect(consolePage.locator(UPGRADE_BUTTON)).toContainText(/Upgrade/i);

    await consolePage.close();
  });
});