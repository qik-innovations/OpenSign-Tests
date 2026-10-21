const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

const PROFILE_MENU_BUTTON = '//button[@aria-controls="profile-menu-list"]';

test('Verify admin user can add a team user if user has a Teams plan', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await commonSteps.closeTourIfVisible();

  await commonSteps.openSettingsMenuItem('Users');

  await page.waitForSelector('#renderList i');

  const actionIcon = page.locator('#renderList i').nth(1);
  if (await actionIcon.count() > 0) {
    await actionIcon.click();
    console.log('Popup is loaded.');
  } else {
    console.log('Action icon not found, skipping...');
  }

  const proceedButton = page.getByRole('button', { name: 'Proceed' });

  try {
    await expect(proceedButton).toBeVisible({ timeout: 90000 });
    await proceedButton.click();
  } catch {
    console.log("'Proceed' button did not appear.");
  }

  const email = `pravin+${Math.random()}@nxglabs.in`;
  await page.locator('input[name="name"]').waitFor({ timeout: 180000 });
  await page.locator('input[name="name"]').fill('Karl Vanderson');
  await page.locator('input[name="email"]').fill(email);

  const randomPass = await page.locator("//div[@class='break-all']").textContent();
  console.log(`Generated password: ${randomPass}`);

  await page.locator('select[name="team"]').selectOption('L3UOmIjC6N');
  await page.locator('#selectSignerModal i').click();
  await page.locator('select[name="role"]').selectOption('User');

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('cell', { name: email })).toBeVisible();

  await page.locator("//div[@id='profile-menu']//div[contains(@class,'op-btn-ghost')]").click();
  await page.getByText('Log Out').click();

  await page.waitForSelector('input[name="email"]');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(randomPass);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByLabel('Close').click();
  await expect(page.locator("//span[text()='Sign yourself']")).toBeVisible();
});

test('Verify free user cannot add a team user and is prompted to upgrade', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Users');

  const title = await page.title();
  expect(title).toBe('Users - OpenSign™');

  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();

  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});

test('Verify professional plan user cannot add a team user and is prompted to upgrade', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.ProfessionPlanUserlogin();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Users');

  const title = await page.title();
  expect(title).toBe('Users - OpenSign™');

  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();

  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});

test('Verify pagination works correctly in Teams user table', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Users');

  const title = await page.title();
  expect(title).toBe('Users - OpenSign™');

  const page1Data = await page.locator('table tbody tr').allTextContents();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('domcontentloaded');

  const page2Data = await page.locator('table tbody tr').allTextContents();
  expect(page2Data).not.toEqual(page1Data);

  await page.getByRole('button', { name: 'Prev' }).click();
  await page.waitForLoadState('domcontentloaded');

  const page1DataPrev = await page.locator('table tbody tr').allTextContents();
  expect(page1DataPrev).not.toEqual(page2Data);
});

