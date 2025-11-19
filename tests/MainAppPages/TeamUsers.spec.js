const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

test('Verify admin user can add a team user if user has a Teams plan', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in as Admin
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  // Step 2: Navigate to Settings → Users
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();

  // Wait for users list to render
  await page.waitForSelector('#renderList i');

  // Step 3: Click the second action icon if available
  const actionIcon = page.locator('#renderList i').nth(1);
  if (await actionIcon.count() > 0) {
    await actionIcon.click();
    console.log("Popup is loaded.");
  } else {
    console.log("Action icon not found, skipping...");
  }

  // Step 4: Handle 'Proceed' button if present
  const proceedButton = page.locator("//form//button[@class='op-btn op-btn-primary w-full' and normalize-space(text())='Proceed']");
  if (await proceedButton.count() > 0) {
    await proceedButton.click();
    console.log("Clicked 'Proceed' button");
  }

  // Step 5: Fill new user details
  const email = `pravin+${Math.random()}@nxglabs.in`;
  await page.locator('input[name="name"]').waitFor({ timeout: 180000 });
  await page.locator('input[name="name"]').fill('Karl Vanderson');
  await page.locator('input[name="email"]').fill(email);

  const randomPass = await page.locator("//div[@class='break-all']").textContent();
  console.log(`Generated password: ${randomPass}`);

  await page.locator('select[name="team"]').selectOption('L3UOmIjC6N');
  await page.locator('#selectSignerModal i').click();
  await page.locator('select[name="role"]').selectOption('User');

  // Step 6: Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify user exists in the table
  await expect(page.getByRole('cell', { name: email })).toBeVisible();

  // Step 7: Logout from admin account
await page.locator("//div[@id='profile-menu']//div[contains(@class,'op-btn-ghost')]").click();
  await page.getByText('Log Out').click();

  // Step 8: Login as newly created user
  await page.waitForSelector('input[name="email"]');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(randomPass);
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 9: Verify successful login
  await page.getByLabel('Close').click();
  await expect(page.locator("//span[text()='Sign yourself']")).toBeVisible();
});

test('Verify free user cannot add a team user and is prompted to upgrade', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in as Free user
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();

  // Step 2: Navigate to Settings → Users
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();

  // Verify correct page title
  const title = await page.title();
  expect(title).toBe('Users - OpenSign™');

  // Step 3: Verify upgrade prompt
  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();

  // Click Upgrade Now
  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});
test('Verify professional plan user cannot add a team user and is prompted to upgrade', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in as Free user
  await commonSteps.navigateToBaseUrl();
  await commonSteps.ProfessionPlanUserlogin();

  // Step 2: Navigate to Settings → Users
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();

  // Verify correct page title
  const title = await page.title();
  expect(title).toBe('Users - OpenSign™');

  // Step 3: Verify upgrade prompt
  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();

  // Click Upgrade Now
  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});
test('Verify pagination works correctly in Teams user table', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  // Step 2: Navigate to Settings → Users
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();

  // Verify correct page title
  const title = await page.title();
  expect(title).toBe('Users - OpenSign™');

  // Step 3: Capture data from Page 1
  const page1Data = await page.locator('table tbody tr').allTextContents();

  // Go to Page 2
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('domcontentloaded');

  const page2Data = await page.locator('table tbody tr').allTextContents();
  expect(page2Data).not.toEqual(page1Data); // Ensure content changed

  // Step 4: Navigate back to Page 1
  await page.getByRole('button', { name: 'Prev' }).click();
  await page.waitForLoadState('domcontentloaded');

  const page1DataPrev = await page.locator('table tbody tr').allTextContents();
  expect(page1DataPrev).not.toEqual(page2Data); // Ensure content changed
});
