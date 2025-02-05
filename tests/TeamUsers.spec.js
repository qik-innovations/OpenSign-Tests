const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('./utils/CommonSteps');

test('Verify admin user can add the team user if user has teams plan.', async ({ page, browser }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  // Step 2: Navigate to Settings → Users
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();

  // Verify correct page title
  await expect(page).toHaveTitle('Users - OpenSign™');

  // Wait for users list to render
  await page.waitForSelector('#renderList i');

  // Click the second action icon (ensure it exists before clicking)
  const actionIcon = page.locator('#renderList i').nth(1);
  if (await actionIcon.count() > 0) {
    await actionIcon.click();

  console.log("Popup is loaded.");
  } else {
    console.log("Action icon not found, skipping...");
  }
 
  // Handle 'Proceed' button if it exists
  page.locator('//form//button[@class=\'op-btn op-btn-primary w-full\' and normalize-space(text())=\'Proceed\']').click();
  //console.log(await proceedButton.count()); // Log count to debug
  /*
  if (await proceedButton.count() > 0) {
      await proceedButton.click(); // Added 'await' before .click()
      console.log("Clicked 'Proceed' button");
  } else {
      console.log("'Proceed' button not found, skipping...");
  }*/

  // Step 3: Fill user details
  const email = `pravin+${Math.random()}@nxglabs.in`;
  await page.locator('input[name="name"]').waitFor({ timeout: 60000 });
  await page.locator('input[name="name"]').fill('Karl Vanderson');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('select[name="team"]').selectOption('L3UOmIjC6N');

  // Open role selection modal and choose "User"
  await page.locator('#selectSignerModal i').click();
  await page.locator('select[name="role"]').selectOption('User');

  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Verify user exists in the table
  await expect(page.getByRole('cell', { name: email })).toBeVisible();

  // Logout from admin user
  await page.getByRole('button', { name: '' }).nth(1).click();
  await page.getByText('Log Out').click();
  test.setTimeout(90000); //override the global timeout
  // Step 4: Log in as the newly created user
  //const userPage = await browser.newPage(); // Ensure a new page instance
 //await userPage.goto('https://staging-app.opensignlabs.com', { waitUntil: 'networkidle', timeout: 10000 });
await page.waitForSelector('input[name="email"]'); // Ensures login page is ready
  await page.locator('input[name="email"]').fill(email);
  await page.focus('input[name="password"]'); // Focus on password field
  await page.keyboard.press('Control+V'); // Assuming password was copied before
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 5: Verify successful login
 await expect(page.locator('//span[text()=\'Sign yourself\']')).toBeVisible();
});

test('Verify that a new free user cannot add a team user and is prompted to upgrade to the Teams plan.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();

  const title = await page.title();
  if (title === 'Users - OpenSign™') {
    console.log('Users - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Users - OpenSign™", Got: "${title}"`);
  }
  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
await page.getByText('Unlock the full power of').click();
await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();
await page.locator('//button[@class=\'op-btn op-btn-accent\' and text()=\'Upgrade now\']').click();});

test('Verify that pagination is functioning correctly in the Teams user table.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Users' }).click();
  const title = await page.title();
  if (title === 'Users - OpenSign™') {
    console.log('Users - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Users - OpenSign™", Got: "${title}"`);
  }
 
  //Check if Pagination Buttons Exist
  const isPaginationVisible = await page.getByRole('button', { name: 'Next' }).isVisible();
  //expect(isPaginationVisible).toBeTruthy();
  const isPaginationVisiblePrev = await page.getByRole('button', { name: 'Prev' }).isVisible();
  //expect(isPaginationVisiblePrev).toBeTruthy();
  const page1Data = await page.locator('table tbody tr').allTextContents();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('domcontentloaded');
  //const firstPageContent = await page.locator('//button[@class=\'op-btn-active op-join-item op-btn op-btn-sm\' and text()=\'2\']').first().textContent(); // Capture first item
const page2Data = await page.locator('table tbody tr').allTextContents();
expect(page2Data).not.toEqual(page1Data);// Ensure content changes
//Verify 'Previous' and 'Next' Buttons Work
await page.getByRole('button', { name: 'Prev' }).click();
await page.waitForLoadState('domcontentloaded');
const page1DataPrev = await page.locator('table tbody tr').allTextContents();
expect(page2Data).not.toEqual(page1DataPrev);// Ensure content changes

});

