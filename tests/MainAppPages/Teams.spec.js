const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');
const exp = require('constants');

// Test for Free user
test('Verify that a new free user cannot add a team and is prompted to upgrade to a Teams plan.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();

  // Step 2: Go to Settings → Teams
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Teams' }).click();

  // Step 3: Verify title
  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');

  // Step 4: Verify upgrade prompt
  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();

  // Step 5: Click Upgrade Now button
  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});
// Test for Free user
test('Verify that professional plan user cannot add a team and is prompted to upgrade to a Teams plan.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.ProfessionPlanUserlogin();

  // Step 2: Go to Settings → Teams
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Teams' }).click();

  // Step 3: Verify title
  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');

  // Step 4: Verify upgrade prompt
  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();

  // Step 5: Click Upgrade Now button
  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});
// Test for Teams plan user
test('Verify that a Teams plan user can add a team and add the user under the newly created team.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  // Step 2: Go to Settings → Teams
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Teams' }).click();
//here add the wait to load the teams page
  await page.waitForSelector('#renderList i');
  // Step 3: Verify page title
  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');

  // Step 4: Verify Teams page heading
  await expect(page.locator("//div[@class='font-light' and normalize-space(text())='Teams']")).toBeVisible();

  // Step 5: Click Add Team button
  await page.locator("//div[@class='cursor-pointer'][i[contains(@class,'fa-square-plus')]]").click();
  await expect(page.getByRole('heading', { name: 'Add team' })).toBeVisible();

  // Step 6: Fill team details
  const teamName = `Test Team ${Date.now()}`;
  await page.locator('input[name="name"]').fill(teamName);

  // Select parent team
  await page
    .locator("//label[normalize-space(text())='Parent team']/following-sibling::select[@name='team']")
    .selectOption({ label: 'All Users' });

  // Step 7: Submit form
  await page.locator("//button[@type='submit' and contains(@class,'op-btn-primary')]").click();

  // Step 8: Verify success toast
  await expect(page.getByText('Team created successfully.')).toBeVisible();

  // Step 9: Verify team appears in the team list
  const teamRow = page.locator('table tbody tr', { hasText: teamName });
  await expect(teamRow).toBeVisible();
// Locate the toggle inside the row
const toggle = teamRow.locator('input[type="checkbox"].op-toggle');

// Ensure it is checked (enabled)
if (!(await toggle.isChecked())) {
  await toggle.check();
}
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

  await page.locator('select[name="team"]').selectOption(teamName);
  await page.locator('#selectSignerModal i').click();
  await page.locator('select[name="role"]').selectOption('User');

  // Step 6: Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify user exists in the table
  await expect(page.getByRole('cell', { name: email })).toBeVisible();
  await expect(page.getByRole('cell', { name: teamName })).toBeVisible();
});
//write test to check pagination in teams page
test('Verify pagination works in Teams page when multiple teams are present', async ({ page }) => {
  const commonSteps = new CommonSteps(page);  
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();  
  // Step 2: Go to Settings → Teams
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Teams' }).click();
  //here add the wait to load the teams page
  await page.waitForSelector('#renderList i');
  // Step 3: Verify page title
  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');  
  // Step 4: Check if pagination controls are visible
  const pagination = page.locator('.pagination');
  if (await pagination.count() > 0) {
    console.log("Pagination controls are visible.");  
    // Step 5: Click on the next page button
    const nextPageButton = pagination.locator('button', { hasText: 'Next' });
    if (await nextPageButton.isEnabled()) {
      await nextPageButton.click();
      console.log("Navigated to the next page."); 
      // Optionally, verify that the page number has changed or new teams are displayed
      const currentPage = pagination.locator('.current-page');
      await expect(currentPage).toHaveText('2'); // Assuming we navigated to page 2
    } else {
      console.log("Next page button is disabled, only one page of teams exists.");
    } 
  } else {
    console.log("Pagination controls are not visible, likely only one page of teams exists.");
  } 
});
test('Verify that a Teams plan user can disable and enable a team from the Teams list.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  // Step 2: Go to Settings → Teams
  await page.getByRole('button', { name: ' Settings' }).click();
  await page.getByRole('menuitem', { name: 'Teams' }).click();
//here add the wait to load the teams page
  await page.waitForSelector('#renderList i');
  // Step 3: Verify page title
  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');
  // Step 4: Verify Teams page heading
  await expect(page.locator("//div[@class='font-light' and normalize-space(text())='Teams']")).toBeVisible();
  // Step 5: Locate the first team in the list
const firstTeamRow = page.locator('table tbody tr').first();
const teamName = await firstTeamRow.locator('td').first().textContent();
console.log(`Toggling team: ${teamName}`);

// Locate the toggle container (label wrapping the input)
const toggleLabel = firstTeamRow.locator('td label.cursor-pointer');

// Step 6: Disable the team if it's enabled
if (await firstTeamRow.locator('input[type="checkbox"].op-toggle').isChecked()) {
  await toggleLabel.click(); // click the label instead of uncheck()
  console.log(`Disabled team: ${teamName}`);

  // Click Yes in dialog
  await page.locator('//div[@class="flex items-center mt-3 gap-2 text-white"]//button[text()="Yes"]').click();

  // Verify success toast
  await expect(page.getByText('Team disabled')).toBeVisible();

  // Optionally, verify the toggle is now unchecked
  await expect(firstTeamRow.locator('input[type="checkbox"].op-toggle')).not.toBeChecked();
} else {
  console.log(`Team: ${teamName} is already disabled.`);
}

// Step 7: Enable the team again if disabled
if (!(await firstTeamRow.locator('input[type="checkbox"].op-toggle').isChecked())) {
  await toggleLabel.click(); // click the label to enable
  console.log(`Enabled team: ${teamName}`);
 // Click Yes in dialog
  await page.locator('//div[@class="flex items-center mt-3 gap-2 text-white"]//button[text()="Yes"]').click();

  // Verify success toast
  await expect(page.getByText('team-enabled')).toBeVisible();

  // Optionally, verify the toggle is now checked
  await expect(firstTeamRow.locator('input[type="checkbox"].op-toggle')).toBeChecked();
} else {
  console.log(`Team: ${teamName} is already enabled.`);
}
});
