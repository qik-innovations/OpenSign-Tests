const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');

// XPath Selectors
const PROFILE_MENU_BUTTON = '//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]';
const CONSOLE_OPTION = '//ul[contains(@class, "op-dropdown-content")]//li/span[i[@class="fa-light fa-id-card"] and contains(normalize-space(.), "Console")]';
const PROFILE_NAME = '//div[@id="root"]//p[@class="text-[14px] font-bold text-base-content"]';
const PROFILE_DOMAIN = '//div[@id="root"]//p[@class="cursor-pointer text-[12px] text-base-content mt-2"]';
const UPGRADE_BUTTON = '//div[@class="relative"]//button[@class="op-btn op-btn-accent shadow-lg"]';
const PLAN_BADGE = '//div[@id="profile-menu"]//div[@class="cursor-pointer"]//div[1]';
const DOCUMENTS_SIGNED = '//div[text()="Documents signed"]';
const TEMPLATES_COUNT = '//div[text()="Templates count"]';
const EMAILS_SENT = '//div[text()="Emails sent"]';
const STORAGE_USED = '//div[text()="Storage used"]';
const GREEN_CHART = '.bg-\\[\\#2ed8b6\\]';
const GRID_SECOND = '.grid > div:nth-child(2)';
const GRID_THIRD = '.grid > div:nth-child(3)';

test.describe('Console analytics', () => {

  test('Verify that a free user cannot access the Analytics page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Mathew Wade', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('qikAi.com');

    const title = await page1.title();
    if (title === 'Analytics - OpenSign™') {
      console.log('Page title is correct: Analytics - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Analytics - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(UPGRADE_BUTTON)).toContainText('Upgrade now');
  });

  test('Verify that Profession plan User can access the Analytics page in the console application.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Pro plan User', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('OpenSign');

    const title = await page1.title();
    if (title === 'Analytics - OpenSign™') {
      console.log('Page title is correct: Analytics - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Analytics - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(PLAN_BADGE)).toContainText('PRO');
    await expect(page1.locator(DOCUMENTS_SIGNED)).toContainText('Documents signed');
    await expect(page1.locator(TEMPLATES_COUNT)).toContainText('Templates count');
    await expect(page1.locator(EMAILS_SENT)).toContainText('Emails sent');
    await expect(page1.locator(GREEN_CHART).first()).toBeVisible();
    await expect(page1.locator(GRID_SECOND)).toBeVisible();
    await expect(page1.locator(GRID_THIRD)).toBeVisible();
  });

  test('Verify that Teams plan User can access the Analytics page in the console application.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);

    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();

    await page.locator(PROFILE_MENU_BUTTON).click();
    const page1Promise = page.waitForEvent('popup');
    await page.locator(CONSOLE_OPTION).click();
    const page1 = await page1Promise;

    await expect(page1.locator(PROFILE_NAME)).toContainText('Pravin Testing account', { timeout: 120000 });
    await expect(page1.locator(PROFILE_DOMAIN)).toContainText('OpenSign pvt ltd');

    const title = await page1.title();
    if (title === 'Analytics - OpenSign™') {
      console.log('Page title is correct: Analytics - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Analytics - OpenSign™", Got: "${title}"`);
    }

    await expect(page1.locator(PLAN_BADGE)).toContainText('TEAM');
    await expect(page1.locator(DOCUMENTS_SIGNED)).toContainText('Documents signed');
    await expect(page1.locator(TEMPLATES_COUNT)).toContainText('Templates count');
    await expect(page1.locator(EMAILS_SENT)).toContainText('Emails sent');
    await expect(page1.locator(STORAGE_USED)).toContainText('Storage used', { timeout: 120000 });
    await expect(page1.locator(GREEN_CHART).first()).toBeVisible();
    await expect(page1.locator(GRID_SECOND)).toBeVisible();
    await expect(page1.locator(GRID_THIRD)).toBeVisible();
  });

});