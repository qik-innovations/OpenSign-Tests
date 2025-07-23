const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

// XPath Selectors
const PROFILE_MENU_BUTTON = '//div[@class="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]';
const CONSOLE_OPTION = '//ul[contains(@class, "op-dropdown-content")]//li/span[i[@class="fa-light fa-id-card"] and contains(normalize-space(.), "Console")]';
const PROFILE_NAME = '//div[@id="root"]//p[@class="text-[14px] font-bold text-base-content"]';
const PROFILE_DOMAIN = '//div[@id="root"]//p[@class="cursor-pointer text-[12px] text-base-content mt-2"]';
const PLAN_BADGE = '//div[@id="profile-menu"]//div[@class="cursor-pointer"]//div[1]';
const UPGRADE_ENTERPRISE_BUTTON = '//button[@class="op-btn op-btn-accent shadow-lg"]';
const ROOT_SELECTOR = '#root';
const RENDER_LIST_SELECTOR = '#renderList';

test.describe('Console app - Mail Page Access Validation', () => {

  test('Free user is prompted to upgrade when accessing the Mail page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;
    await expect(page1.locator(PROFILE_NAME)).toContainText('Mathew Wade', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('qikAi.com');
    await page1.getByRole('menuitem', { name: 'Mail' }).click();
    const title = await page1.title();
    if (title === 'OpenSign™ Email Settings - OpenSign™') {
      console.log('Page title is correct: OpenSign™ Email Settings - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OpenSign™ Email Settings - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator(RENDER_LIST_SELECTOR)).toContainText('Upgrade now');
    await expect(page1.locator(RENDER_LIST_SELECTOR)).toMatchAriaSnapshot('- button "Upgrade now"');
  });

  test('Profession plan user can access the Email page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Pro plan User', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('OpenSign');

    await page1.getByRole('menuitem', { name: 'Mail' }).click();

    const title = await page1.title();
    if (title === 'OpenSign™ Email Settings - OpenSign™') {
      console.log('Page title is correct: OpenSign™ Email Settings - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OpenSign™ Email Settings - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(ROOT_SELECTOR)).toContainText('PRO');
    await expect(page1.getByRole('heading')).toContainText('OpenSign™ Email Settings');
    await expect(page1.locator(RENDER_LIST_SELECTOR)).toContainText('OpenSign™ default SMTP');
  });

  test('Team plan user can access the Email page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Pravin Testing account', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('OpenSign pvt ltd');

    await page1.getByRole('menuitem', { name: 'Mail' }).click();

    const title = await page1.title();
    if (title === 'OpenSign™ Email Settings - OpenSign™') {
      console.log('Page title is correct: OpenSign™ Email Settings - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OpenSign™ Email Settings - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(ROOT_SELECTOR)).toContainText('Pravin Testing account');
    await expect(page1.locator(ROOT_SELECTOR)).toContainText('TEAM');
    await expect(page1.getByRole('heading')).toContainText('OpenSign™ Email Settings');
    await expect(page1.locator(RENDER_LIST_SELECTOR)).toContainText('OpenSign™ default SMTP');
  });

});