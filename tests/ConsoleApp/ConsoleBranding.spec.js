const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

// XPath Selectors
const PROFILE_MENU_BUTTON = '//div[@class="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]';
const CONSOLE_OPTION = '//div[@id="profile-menu"]//span[text()=" Console"]';
const PROFILE_NAME = '//div[@id="root"]//p[@class="text-[14px] font-bold text-base-content"]';
const PROFILE_DOMAIN = '//div[@id="root"]//p[@class="cursor-pointer text-[12px] text-base-content mt-2"]';
const PLAN_BADGE = '//div[@id="profile-menu"]//div[@class="cursor-pointer"]//div[1]';
const UPGRADE_ENTERPRISE_BUTTON = '//button[@class="op-btn op-btn-accent shadow-lg"]';

test.describe('Console app - Branding Access Validation', () => {

  test('Free user is prompted to upgrade when accessing the Branding page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Mathew Wade', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('qikAi.com', { timeout: 120000 });

    await page1.getByRole('menuitem', { name: 'Branding' }).click({ timeout: 120000 });

    const title = await page1.title();
    if (title === 'Branding - OpenSign™') {
      console.log('Page title is correct: Branding - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Branding - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(UPGRADE_ENTERPRISE_BUTTON)).toContainText('Upgrade to enterprise plan', { timeout: 120000 });
  });

  test('Profession plan user is prompted to upgrade when accessing the Branding page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Mathew Steven', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('OpenSign Lab', { timeout: 120000 });

    await page1.getByRole('menuitem', { name: 'Branding' }).click({ timeout: 120000 });

    const title = await page1.title();
    if (title === 'Branding - OpenSign™') {
      console.log('Page title is correct: Branding - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Branding - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(PLAN_BADGE)).toContainText('PRO', { timeout: 120000 });
    await expect(page1.locator(UPGRADE_ENTERPRISE_BUTTON)).toContainText('Upgrade to enterprise plan', { timeout: 120000 });
  });

  test('Team plan user is prompted to upgrade when accessing the Branding page.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Pravin Testing account', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('OpenSign pvt ltd', { timeout: 120000 });

    await page1.getByRole('menuitem', { name: 'Branding' }).click({ timeout: 120000 });

    const title = await page1.title();
    if (title === 'Branding - OpenSign™') {
      console.log('Page title is correct: Branding - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Branding - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(PLAN_BADGE)).toContainText('TEAM', { timeout: 120000 });
    await expect(page1.locator(UPGRADE_ENTERPRISE_BUTTON)).toContainText('Upgrade to enterprise plan', { timeout: 120000 });
  });

});