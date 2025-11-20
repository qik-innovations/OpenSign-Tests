const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that professional user cannot access the OrgAdmins page in the console application and is prompted to upgrade team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Mathew Steven', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign Lab');
  await page1.getByRole('button', { name: ' Teams' }).click();
  await page1.getByRole('menuitem', { name: 'OrgAdmins' }).click();
    const title = await page1.title();
    if (title === 'OrgAdmins - OpenSign™') {
      console.log('Page title is correct: OrgAdmins - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OrgAdmins - OpenSign™, Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('OrgAdmins');
    await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan'); 
});
test('Verify that Teams plan user can access OrgAdmins page and add OrgAdmin', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await test.step('Login as Teams Plan user', async () => {
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  });
let userName = '';
let email = '';
let password = '';
  // Step 2: Open Console (new popup)
 await page.locator('#profile-menu.op-dropdown-open').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Console').click();
  const page1 = await page1Promise;
  // Step 3: Verify profile info
  await test.step('Verify profile info', async () => {
    await expect(page1.locator('#root')).toContainText('Pravin Testing account', { timeout: 120000 });
    
  });

  // Step 4: Navigate to OrgAdmins page
  await test.step('Open OrgAdmins page', async () => {
    await page1.getByRole('button', { name: ' Teams' }).click();
    await page1.getByRole('menuitem', { name: 'OrgAdmins' }).click();
await expect(page1.locator('#renderList')).toContainText('OrgAdmins');
    const title = await page1.title();
    expect(title).toBe('OrgAdmins - OpenSign™');
    await expect(page1.locator('#renderList')).toContainText('OrgAdmins');
    await expect(page1.locator('#renderList')).toContainText('Buy more users');
    // Verify table headers
    for (const header of ['Sr.No', 'Name', 'Email', 'Organization', 'IsActive']) {
      await expect(page1.locator('thead')).toContainText(header);
    }
  });

  // Step 5: Buy more users
  await test.step('Buy more users flow', async () => {
    await page1.getByText('Buy more users').click();
    await expect(page1.getByRole('heading')).toContainText('Add Seats');
    await expect(page1.locator('form')).toContainText('Quantity of users *');
    await expect(page1.locator('form')).toContainText('Price (1 * 100)');
    await expect(page1.locator('form')).toContainText('INR 100');
    await page1.getByRole('button', { name: 'Proceed' }).click();
  });

  // Step 6: Add new OrgAdmin
  await test.step('Add new OrgAdmin', async () => {
    await page1.locator('#renderList i').nth(1).click();
    await expect(page1.getByRole('heading')).toContainText('Add user');
    //here genrate the randum name and email
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    console.log(randomNum);
   userName = `Karl Vanderson ${randomNum}`;
    console.log(userName);
    await page1.locator('input[name="name"]').fill(userName);
    //generate unique email
    email = 'karl' + randomNum + '@opensignlabs.com';
    console.log(email);
    await page1.locator('input[name="email"]').fill(email);
    await page1.locator('#selectSignerModal i').click();
    await page1.getByRole('textbox', { name: 'optional' }).fill('9823409343');
    // Copy password
    password = await page1.locator("//div[@class='break-all']").innerText();
    console.log('Generated password:', password?.trim());
     // Click the dropdown
await page1.locator('//select[@name="organization"]').click();

// Select by label (visible text)
await page1.locator('select[name="organization"]').selectOption({ label: 'OpenSign pvt ltd' });
    await page1.getByRole('button', { name: 'Submit' }).click();
  });

  // Step 7: Validate new OrgAdmin row
  await test.step('Validate OrgAdmin list', async () => {
    for (const header of ['Sr.No', 'Name', 'Email', 'Organization']) {
      await expect(page1.locator('thead')).toContainText(header);
    }
// Locate the row for the specific user
// Locate the first row in the table
const row = page1.getByRole('row').nth(1); // nth(0) is usually the header row, so nth(1) = first data row

// Assert that row contains the expected values
await expect(row).toContainText(userName);
await expect(row).toContainText(email);
await expect(row).toContainText('OpenSign pvt ltd');

// Assert that the checkbox inside the row is visible
const checkbox = row.getByRole('checkbox');
await expect(checkbox).toBeVisible();
 await page1.getByRole('button', { name: '' }).click();
  await page1.getByText('Log Out').click();
await page1.getByRole('heading', { name: 'Welcome back!' }).waitFor({ timeout: 120000 });
await page1.getByRole('textbox', { name: 'Email' }).fill(email);
await page1.getByRole('textbox', { name: 'Email' }).press('Tab');
await page1.getByRole('textbox', { name: 'Password' }).fill(password.trim());
await page1.getByRole('button', { name: 'Login' }).click();
  await expect(page1.getByRole('dialog')).toContainText('You have logged in successfully! Let\'s take a look.1');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('To upload documents for self-signing or to request others\' signatures, simply select the respective buttons.2');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('Clicking on this card will take you to the list of documents awaiting your review.3');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('Clicking on this card will take you to a list of documents awaiting signature.4');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('This is a list of documents that are waiting for your signature.5');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('This is a list of documents you\'ve sent to other parties for signature.6');
  await page1.getByRole('dialog').locator('div').click();
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('These are documents you have started but have not finalized for sending.7');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('dialog')).toContainText('You are ready to start using OpenSign™!⭐ Star us onGitHub');
  });

});
test('Verify that inactive orgAdmin cannot login.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await test.step('Login as Teams Plan user', async () => {
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  });
let userName = '';
let email = '';
let password = '';
  // Step 2: Open Console (new popup)
 await page.locator('#profile-menu.op-dropdown-open').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Console').click();
  const page1 = await page1Promise;
  // Step 3: Verify profile info
  await test.step('Verify profile info', async () => {
    await expect(page1.locator('#root')).toContainText('Pravin Testing account', { timeout: 120000 });
    
  });

  // Step 4: Navigate to OrgAdmins page
  await test.step('Open OrgAdmins page', async () => {
    await page1.getByRole('button', { name: ' Teams' }).click();
    await page1.getByRole('menuitem', { name: 'OrgAdmins' }).click();
await expect(page1.locator('#renderList')).toContainText('OrgAdmins');
    const title = await page1.title();
    expect(title).toBe('OrgAdmins - OpenSign™');
    
  });

  // Step 5: Buy more users
  await test.step('Buy more users flow', async () => {
    await page1.getByText('Buy more users').click();
    await expect(page1.getByRole('heading')).toContainText('Add Seats');
    await page1.getByRole('button', { name: 'Proceed' }).click();
  });

  // Step 6: Add new OrgAdmin
  await test.step('Add new OrgAdmin', async () => {
    await page1.locator('#renderList i').nth(1).click();
    await expect(page1.getByRole('heading')).toContainText('Add user');
    //here genrate the randum name and email
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    console.log(randomNum);
    userName = `Karl Vanderson ${randomNum}`;
    console.log(userName);
    await page1.locator('input[name="name"]').fill(userName);
    //generate unique email
    email = 'karl' + randomNum + '@opensignlabs.com';
    console.log(email);
    await page1.locator('input[name="email"]').fill(email);
    await page1.locator('#selectSignerModal i').click();
    await page1.getByRole('textbox', { name: 'optional' }).fill('9823409343');
    // Copy password
    password = await page1.locator("//div[@class='break-all']").innerText();
    console.log('Generated password:', password?.trim());
     // Click the dropdown
await page1.locator('//select[@name="organization"]').click();

// Select by label (visible text)
await page1.locator('select[name="organization"]').selectOption({ label: 'OpenSign pvt ltd' });
    await page1.getByRole('button', { name: 'Submit' }).click();
  });

  // Step 7: Validate new OrgAdmin row
  await test.step('Validate OrgAdmin list', async () => {
// Locate the first row in the table
const row = page1.getByRole('row').nth(1); // nth(0) is usually the header row, so nth(1) = first data row
// Assert that row contains the expected values
await expect(row).toContainText(userName);
await expect(row).toContainText(email);
await expect(row).toContainText('OpenSign pvt ltd');
// Assert that the checkbox inside the row is visible
const checkbox = row.getByRole('checkbox');
checkbox.click({ force: true });
await expect(page1.getByRole('heading')).toContainText('User status');
await expect(page1.locator('#selectSignerModal')).toContainText('Are you sure you want to deactivate this user?');
await page1.getByRole('button', { name: 'Yes' }).click();
 await page1.getByRole('button', { name: '' }).click();
  await page1.getByText('Log Out').click();
await page1.getByRole('heading', { name: 'Welcome back!' }).waitFor({ timeout: 120000 });
await page1.getByRole('textbox', { name: 'Email' }).fill(email);
await page1.getByRole('textbox', { name: 'Email' }).press('Tab');
await page1.getByRole('textbox', { name: 'Password' }).fill(password.trim());
await page1.getByRole('button', { name: 'Login' }).click();
await expect(page1.getByRole('region')).toContainText('You don\'t have access, please contact the admin.');
  });

});
});