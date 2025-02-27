// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');

// Locators defined for better readability
const locators = {
  createAccountButton: 'button[name="Create account"]',
  nameInput: 'input[type="text"]',
  emailInput: '#email',
  phoneInput: 'input[type="tel"]',
  companyInput: '(//input)[4]', // Corrected XPath index
  jobTitleInput: '(//input)[5]', // Corrected XPath index
  passwordInput: 'input[name="password"]',
  termsCheckbox: '#termsandcondition',
  registerButton: '//button[contains(text(), "Register")]',
  freePlanButton: 'li:has-text("OPENSIGN™ FREEFreeBilled") button',
  professionalPlanButton: 'li:has-text("OPENSIGN™ PROFESSIONAL$9.99/") button',
  TeamsPlanButton: 'li:has-text("OPENSIGN™ TEAMS$19.99/user/") button',
  proceedButton: "//span[@class='btn-txt' and text()='Proceed']",
  addressField: '#billing_street',
  cityField: '#billing_city',
  zipCodeField: '#billing_zip',
  sameAsBillingCheckbox: 'input[name="sameasbillingaddress"]',
  reviewOrderButton: '//button[contains(text(), "Review Order")]',
};

// Function to fill the signup form
const fillSignupForm = async (page, { name, email, phone, company, jobTitle, password }) => {
  await page.locator(locators.nameInput).first().fill(name);
  await page.locator(locators.emailInput).fill(email);
  await page.locator(locators.phoneInput).fill(phone);
  await page.locator(locators.companyInput).fill(company);
  await page.locator(locators.jobTitleInput).fill(jobTitle);
  await page.locator(locators.passwordInput).fill(password);
  await page.locator(locators.termsCheckbox).click();
};
test.describe('SignupPage', () => {
test('Verify that a user can sign up with a free subscription plan and validate the details in the user profile.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and start sign-up
  await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();

  // Generate a unique email
  const email = `pravin+${Math.random().toString(36).substring(2, 8)}@nxglabs.in`;
  loginCredentials.FreeplanUsername = email;
  loginCredentials.FreePlanpassword = 'Nxglabs@123';

  // Save updated global credentials to a JSON file
  const globalDataPath = path.join(__dirname, './TestData/GlobalVar/globalData.json');
  fs.writeFileSync(globalDataPath, JSON.stringify(loginCredentials, null, 2));

  console.log('✅ Updated Global Credentials:', loginCredentials);

  // Fill the signup form
  await fillSignupForm(page, {
    name: 'Mathew Wade',
    email: loginCredentials.FreeplanUsername,
    phone: '8238988998',
    company: 'qikAi.com',
    jobTitle: 'Hr Executive',
    password: loginCredentials.FreePlanpassword,

  });

  // Click register
  await page.locator(locators.registerButton).click();

  // Wait for confirmation page
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('FreeBilled YearlyFree Unlimited E-signatures, Forever.');
  await expect(page.locator('#root')).toContainText('Unlimited digital signaturesSign documents yourselfRequest signatures from othersUnlimited templates14 field typesAutomatic e-signaturesCompletion certificatesSend in orderOrganize docs in OpenSign™ DriveDocument templatesImport from DropboxContact bookDocument expiry supportDecline document supportEmail notificationsPublic profilesAnd much more');
  // Select the free plan
  await page.locator(locators.freePlanButton).click();
  await page.getByLabel('Close').click();

  // Ensure "Upgrade Now" button is visible
  await expect(page.locator('//div[@id="profile-menu"]//parent::button[text()="Upgrade now"]')).toBeVisible();

  // Verify title
  const title = await page.title();
  expect(title).toBe('Dashboard - OpenSign™');
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
  await page.getByLabel('Close').click();
  //here we are verifing the admin user details under profile section
  await expect(page.locator('#renderList')).toContainText('Admin');
  await expect(page.getByRole('list')).toContainText('Name:');
  await expect(page.getByRole('list')).toContainText('Mathew Wade');
  await expect(page.getByRole('list')).toContainText('Phone:');
  await expect(page.getByRole('list')).toContainText('8238988998');
  await expect(page.getByRole('list')).toContainText('Email :');
  await expect(page.getByRole('list')).toContainText(loginCredentials.FreeplanUsername);
  await expect(page.getByRole('list')).toContainText('Company:');
  await expect(page.getByRole('list')).toContainText('qikAi.com');
  await expect(page.getByRole('list')).toContainText('Job title:');
  await expect(page.getByRole('list')).toContainText('Hr Executive');
  await expect(page.getByRole('list')).toContainText('Is email verified:');
  await expect(page.getByRole('list')).toContainText('Not verified(verify)');
  await expect(page.getByRole('list')).toContainText('Public profile :');
  await expect(page.getByRole('list')).toContainText('Tagline :');
  await expect(page.getByRole('list')).toContainText('Disable documentId :');
  await expect(page.getByRole('list')).toContainText('Upgrade now');
  await expect(page.getByRole('list')).toContainText('Language:');
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('li').filter({ hasText: 'Name:' }).getByRole('textbox').fill('Mathew W Karl');
  await page.locator('li').filter({ hasText: 'Phone:' }).getByRole('textbox').fill('8806607524');
  await page.locator('li').filter({ hasText: 'Company:' }).getByRole('textbox').fill('OpenSign pvt. ltd');
  await page.locator('li').filter({ hasText: 'Job title:' }).getByRole('textbox').fill('Quality Analyst');
  await page.getByPlaceholder('enter user name').fill('Testing');
  await page.getByPlaceholder('enter tagline').fill('Seal the deal openly');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('heading')).toContainText('Upgrade to Plan');
  await expect(page.locator('#renderList')).toContainText('To have a username less than 8 character please subscribe');
  await expect(page.locator('#renderList')).toContainText('Upgrade now');
  await page.getByText('✕').click();
  const pubprofUsername = `pravin${Math.random().toString(36).substring(2, 8)}`;
  await page.getByPlaceholder('enter user name').fill(pubprofUsername);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#renderList')).toContainText('Admin');
  await expect(page.getByRole('list')).toContainText('Name:');
  await expect(page.getByRole('list')).toContainText('Mathew W Karl');
  await expect(page.getByRole('list')).toContainText('Phone:');
  await expect(page.getByRole('list')).toContainText('8806607524');
  await expect(page.getByRole('list')).toContainText('Email :');
  await expect(page.getByRole('list')).toContainText(loginCredentials.FreeplanUsername);
  await expect(page.getByRole('list')).toContainText('Company:');
  await expect(page.getByRole('list')).toContainText('OpenSign pvt. ltd');
  await expect(page.getByRole('list')).toContainText('Job title:');
  await expect(page.getByRole('list')).toContainText('Quality Analyst');
  await expect(page.getByRole('list')).toContainText('Is email verified:');
  await expect(page.getByRole('list')).toContainText('Not verified(verify)');
  await expect(page.getByRole('list')).toContainText('Public profile :');
  await expect(page.getByRole('list')).toContainText(pubprofUsername);
  await expect(page.getByRole('list')).toContainText('Tagline :');
  await expect(page.getByRole('list')).toContainText('Seal the deal openly');
  await expect(page.getByRole('list')).toContainText('Disable documentId :');
  await expect(page.getByRole('list')).toContainText('Upgrade now');
  await expect(page.getByRole('list')).toContainText('Language:');
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Billing').click();
  await expect(page.getByRole('heading')).toContainText('freeplan');
  await expect(page.locator('#renderList')).toContainText('Free');
  await expect(page.locator('#renderList')).toContainText('Free Unlimited E-signatures, Forever.');
 // await expect(page.getByRole('list')).toContainText('Unlimited digital signaturesSign documents yourselfRequest signatures from othersUnlimited templates14 field typesAutomatic e-signaturesCompletion certificatesSend in orderOrganize docs in OpenSign™ DriveDocument templatesImport from DropboxContact bookDocument expiry supportDecline document supportEmail notificationsPublic profilesAnd much more');
  await expect(page.locator('#renderList')).toContainText('active');
  for (let i = 0; i < 10; i++) { // Limit retries to prevent infinite loop
    await page.getByRole('button', { name: '' }).click();
    // Check if the target locator is visible
    const isVisible = await page.locator('//span[text()="Sent this month"]').isVisible();
    if (isVisible) {
        break; // Exit loop if the locator is found
    }
    await page.waitForTimeout(500); // Small delay before retrying (adjust if needed)
}
// Click the target locator after it's found
await page.locator('//span[text()="Sent this month"]').click();
  await expect(page.locator('#selectSignerModal')).toContainText('To maintain service quality and prevent spam, OpenSign allows up to 15 emails per month on the free plan. Upgrade now for unlimited email sending.');
  await expect(page.locator('#selectSignerModal')).toContainText('Tip: You can still sign unlimited documents by manually sharing the signing request link.Learn how.');
  await expect(page.locator('#selectSignerModal')).toContainText('Upgrade now');
  await page.locator('div').filter({ hasText: /^✕$/ }).click();
});

test('Verify that a user can sign up with a professional plan and validate the details in the user profile.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  const email = `pravin+${Math.random()}@nxglabs.in`;
  await fillSignupForm(page, {
    name: 'Mathew Wade',
    email,
    phone: '8238988998',
    company: 'qikAi pvt ltd',
    jobTitle: 'Hr Execative',
    password: 'Nxglabs@123',
  });

  await page.locator(locators.registerButton).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ PROFESSIONAL' })).toBeVisible();
 await expect(page.locator('#root')).toContainText('$9.99/monthBilled YearlyExclusive Access to advanced features.');
  await expect(page.locator('#root')).toContainText('Everything in OpenSign™ freeField validationsRegular expression validationsOrganize docs in OpenSign™ DriveWebhooksZapier integrationAPI Accessupto 240 API signaturesCustom email templatesConnect your own Gmail or SMTP account for sending emailsAuto remindersBulk send (upto 240 docs)Premium Public profile usernamesEnforce email-based verification to confirm signer identityEmbedded signing');
  
  await page.locator(locators.professionalPlanButton).click();
  await page.locator(locators.proceedButton).click();
  await page.locator(locators.proceedButton).click();
  // Fill address details
  await page.getByLabel('Address', { exact: true }).fill('120 wood street');
  await page.getByLabel('City').fill('San Francisco');
  await page.getByLabel('ZIP Code').fill('34554');
  await page.getByRole('button', { name: 'Review Order' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  const allFrames = page.frames();
  console.log(`Total iframes found: ${allFrames.length}`);
// Locate the iframe and switch to its content
// Switch to the iframe by index number (e.g., the second iframe)
const index = 3; // Change this to the desired index
const iframe = allFrames[index];
await iframe.click('//input[@name=\'cardnumber\']');
await iframe.fill('//input[@name=\'cardnumber\']', '4242424242424242'); 
const indexExpDateFrame = 4; 
  const iframesExpDate = allFrames[indexExpDateFrame];
  await iframesExpDate.click('//input[@name=\'exp-date\']');
  await iframesExpDate.fill('//input[@name=\'exp-date\']', '0728'); 

  const indexcvvFrame= 5;
  const iframecvvFrame = allFrames[indexcvvFrame];
  await iframecvvFrame.click('//input[@name=\'cvc\']');
  await iframecvvFrame.fill('//input[@name=\'cvc\']', '709'); 
  await page.getByRole('button', { name: 'Pay $' }).click();
  test.setTimeout(280 * 1000);

 await page.getByLabel('Close').click();
 await page.locator('//div[@id=\'profile-menu\']//parent::div[text()=\'PRO\']').isVisible();
 await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
  await page.getByLabel('Close').click();
 
//here we are verifing the admin user details under profile section
await expect(page.locator('#renderList')).toContainText('Admin');
await expect(page.getByRole('list')).toContainText('Name:');
await expect(page.getByRole('list')).toContainText('Mathew Wade');
await expect(page.getByRole('list')).toContainText('Phone:');
await expect(page.getByRole('list')).toContainText('8238988998');
await expect(page.getByRole('list')).toContainText('Email :');
await expect(page.getByRole('list')).toContainText(email);
await expect(page.getByRole('list')).toContainText('Company:');
await expect(page.getByRole('list')).toContainText('qikAi pvt ltd');
await expect(page.getByRole('list')).toContainText('Job title:');
await expect(page.getByRole('list')).toContainText('Hr Execative');
await expect(page.getByRole('list')).toContainText('Is email verified:');
await expect(page.getByRole('list')).toContainText('Not verified(verify)');
await expect(page.getByRole('list')).toContainText('Public profile :');
await expect(page.getByRole('list')).toContainText('Tagline :');
await expect(page.getByRole('list')).toContainText('Disable documentId :');
await expect(page.getByRole('list')).toContainText('Upgrade now');
await expect(page.getByRole('list')).toContainText('Language:');
await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('li').filter({ hasText: 'Name:' }).getByRole('textbox').fill('Mathew W Karl');
  await page.locator('li').filter({ hasText: 'Phone:' }).getByRole('textbox').fill('8806607524');
  await page.locator('li').filter({ hasText: 'Company:' }).getByRole('textbox').fill('OpenSign pvt. ltd');
  await page.locator('li').filter({ hasText: 'Job title:' }).getByRole('textbox').fill('Quality Analyst');
  const PropubprofUsername = `pravin${Math.random().toString(16).substring(2, 8)}`;
  await page.getByPlaceholder('enter user name').fill(PropubprofUsername);
  await page.getByPlaceholder('enter tagline').fill('Seal the deal openly');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#renderList')).toContainText('Admin');
  await expect(page.getByRole('list')).toContainText('Name:');
  await expect(page.getByRole('list')).toContainText('Mathew W Karl');
  await expect(page.getByRole('list')).toContainText('Phone:');
  await expect(page.getByRole('list')).toContainText('8806607524');
  await expect(page.getByRole('list')).toContainText('Email :');
  await expect(page.getByRole('list')).toContainText(loginCredentials.FreeplanUsername);
  await expect(page.getByRole('list')).toContainText('Company:');
  await expect(page.getByRole('list')).toContainText('OpenSign pvt. ltd');
  await expect(page.getByRole('list')).toContainText('Job title:');
  await expect(page.getByRole('list')).toContainText('Quality Analyst');
  await expect(page.getByRole('list')).toContainText('Is email verified:');
  await expect(page.getByRole('list')).toContainText('Not verified(verify)');
  await expect(page.getByRole('list')).toContainText('Public profile :');
  await expect(page.getByRole('list')).toContainText(PropubprofUsername);
  await expect(page.getByRole('list')).toContainText('Tagline :');
  await expect(page.getByRole('list')).toContainText('Seal the deal openly');
  await expect(page.getByRole('list')).toContainText('Disable documentId :');
  await expect(page.getByRole('list')).toContainText('Upgrade now');
  await expect(page.getByRole('list')).toContainText('Language:');
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Billing').click();
  await expect(page.getByRole('heading')).toContainText('pro-yearly');
  await expect(page.locator('#renderList')).toContainText('Billed Yearly');
  await expect(page.locator('#renderList')).toContainText('Exclusive Access to advanced features.');
  await expect(page.locator('#renderList')).toContainText('active');
 // Get date from the locator
 const text = await page.locator('//span[@class="op-text-primary font-medium"]').textContent();   
    if (!text) {
        throw new Error('No date text found in the locator');
    }
    // Parse text to a Date object (handle different date formats if necessary)
    let date = new Date(text.trim());
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${text}`);
    }
    // Format the date as YYYY-MM-DD
    let BillingformattedDate = date.toISOString().split('T')[0];
    console.log('Formatted Date:', BillingformattedDate);
    let currentDate = new Date();
  // Add one year
  let nextYearDate = new Date();
  nextYearDate.setFullYear(currentDate.getFullYear() + 1);
  // Format the date as YYYY-MM-DD (or any format you need)
  let formattedDate = nextYearDate.toISOString().split('T')[0];
  console.log('Date after one year:', formattedDate);
  expect(formattedDate).toBe(BillingformattedDate); 
});
test('Verify that a user can sign up with a Teams plan and validate the details in the user profile.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  const email = `pravin+${Math.random()}@nxglabs.in`;
  await fillSignupForm(page, {
    name: 'Mathew Wade',
    email,
    phone: '8238988998',
    company: 'qikAi pvt ltd',
    jobTitle: 'Hr Execative',
    password: 'Nxglabs@123',
  });

  await page.locator(locators.registerButton).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ TEAMS' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('$19.99/user/monthBilled YearlyExclusive Access to advanced features.');
  await expect(page.locator('#root')).toContainText('Everything in OpenSign™ professionalupto 500 API signaturesTeams and OrganizationsShare Templates with teamsShare Templates with individualsBYOC - Store your documents in your own cloud storageDocumentId removal from signed docsBulk send (upto 500 docs)Request Payments (coming soon)Mobile app (coming soon)');
  await page.locator(locators.TeamsPlanButton).click();
  await page.locator(locators.proceedButton).click();
  await page.locator(locators.proceedButton).click();
  // Fill address details
  await page.getByLabel('Address', { exact: true }).fill('120 wood street');
  await page.getByLabel('City').fill('San Francisco');
  await page.getByLabel('ZIP Code').fill('34554');
  await page.getByRole('button', { name: 'Review Order' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  const allFrames = page.frames();
  console.log(`Total iframes found: ${allFrames.length}`);
// Locate the iframe and switch to its content
// Switch to the iframe by index number (e.g., the second iframe)
const index = 3; // Change this to the desired index
const iframe = allFrames[index];
await iframe.click('//input[@name=\'cardnumber\']');
await iframe.fill('//input[@name=\'cardnumber\']', '4242424242424242'); 
const indexExpDateFrame = 4; 
  const iframesExpDate = allFrames[indexExpDateFrame];
  await iframesExpDate.click('//input[@name=\'exp-date\']');
  await iframesExpDate.fill('//input[@name=\'exp-date\']', '0728'); 

  const indexcvvFrame= 5;
  const iframecvvFrame = allFrames[indexcvvFrame];
  await iframecvvFrame.click('//input[@name=\'cvc\']');
  await iframecvvFrame.fill('//input[@name=\'cvc\']', '709'); 
  await page.getByRole('button', { name: 'Pay Rs.100.00' }).click();
  test.setTimeout(280 * 1000);

 await page.getByLabel('Close').click();
 await page.locator('//div[@id=\'profile-menu\']//parent::div[text()=\'PRO\']').isVisible();
 await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
  await page.getByLabel('Close').click();
 
//here we are verifing the admin user details under profile section
await expect(page.locator('#renderList')).toContainText('Admin');
await expect(page.getByRole('list')).toContainText('Name:');
await expect(page.getByRole('list')).toContainText('Mathew Wade');
await expect(page.getByRole('list')).toContainText('Phone:');
await expect(page.getByRole('list')).toContainText('8238988998');
await expect(page.getByRole('list')).toContainText('Email :');
await expect(page.getByRole('list')).toContainText(email);
await expect(page.getByRole('list')).toContainText('Company:');
await expect(page.getByRole('list')).toContainText('qikAi pvt ltd');
await expect(page.getByRole('list')).toContainText('Job title:');
await expect(page.getByRole('list')).toContainText('Hr Execative');
await expect(page.getByRole('list')).toContainText('Is email verified:');
await expect(page.getByRole('list')).toContainText('Not verified(verify)');
await expect(page.getByRole('list')).toContainText('Public profile :');
await expect(page.getByRole('list')).toContainText('Tagline :');
await expect(page.getByRole('list')).toContainText('Disable documentId :');
const elementCount = await page.getByRole('list').filter({ hasText: 'Upgrade now' }).count();
expect(elementCount).toBe(0);
await expect(page.getByRole('list')).toContainText('Language:');
await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('li').filter({ hasText: 'Name:' }).getByRole('textbox').fill('Mathew W Karl');
  await page.locator('li').filter({ hasText: 'Phone:' }).getByRole('textbox').fill('8806607524');
  await page.locator('li').filter({ hasText: 'Company:' }).getByRole('textbox').fill('OpenSign pvt. ltd');
  await page.locator('li').filter({ hasText: 'Job title:' }).getByRole('textbox').fill('Quality Analyst');
  const PropubprofUsername = `pravin${Math.random().toString(16).substring(2, 8)}`;
  await page.getByPlaceholder('enter user name').fill(PropubprofUsername);
  await page.getByPlaceholder('enter tagline').fill('Seal the deal openly');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#renderList')).toContainText('Admin');
  await expect(page.getByRole('list')).toContainText('Name:');
  await expect(page.getByRole('list')).toContainText('Mathew W Karl');
  await expect(page.getByRole('list')).toContainText('Phone:');
  await expect(page.getByRole('list')).toContainText('8806607524');
  await expect(page.getByRole('list')).toContainText('Email :');
  await expect(page.getByRole('list')).toContainText(loginCredentials.FreeplanUsername);
  await expect(page.getByRole('list')).toContainText('Company:');
  await expect(page.getByRole('list')).toContainText('OpenSign pvt. ltd');
  await expect(page.getByRole('list')).toContainText('Job title:');
  await expect(page.getByRole('list')).toContainText('Quality Analyst');
  await expect(page.getByRole('list')).toContainText('Is email verified:');
  await expect(page.getByRole('list')).toContainText('Not verified(verify)');
  await expect(page.getByRole('list')).toContainText('Public profile :');
  await expect(page.getByRole('list')).toContainText(PropubprofUsername);
  await expect(page.getByRole('list')).toContainText('Tagline :');
  await expect(page.getByRole('list')).toContainText('Seal the deal openly');
  await expect(page.getByRole('list')).toContainText('Disable documentId :');
  const elementCount1 = await page.getByRole('list').filter({ hasText: 'Upgrade now' }).count();
  expect(elementCount1).toBe(0);
  await expect(page.getByRole('list')).toContainText('Language:');
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Billing').click();
  await expect(page.getByRole('heading')).toContainText('teams-yearly');
  await expect(page.locator('#renderList')).toContainText('Billed Yearly');
  await expect(page.locator('#renderList')).toContainText('Exclusive Access to advanced features.');
  await expect(page.locator('#renderList')).toContainText('active');
 // Get date from the locator
 const text = await page.locator('//span[@class="op-text-primary font-medium"]').textContent();   
    if (!text) {
        throw new Error('No date text found in the locator');
    }
    // Parse text to a Date object (handle different date formats if necessary)
    let date = new Date(text.trim());
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${text}`);
    }
    // Format the date as YYYY-MM-DD
    let BillingformattedDate = date.toISOString().split('T')[0];
    console.log('Formatted Date:', BillingformattedDate);
    let currentDate = new Date();
  // Add one year
  let nextYearDate = new Date();
  nextYearDate.setFullYear(currentDate.getFullYear() + 1);
  // Format the date as YYYY-MM-DD (or any format you need)
  let formattedDate = nextYearDate.toISOString().split('T')[0];
  console.log('Date after one year:', formattedDate);
  expect(formattedDate).toBe(BillingformattedDate); 
});

test('Verify that users cannot sign up with an already registered email address.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  await fillSignupForm(page, {
    name: 'Mathew Lowrence',
    email: 'pravin+y4@nxglabs.in',
    phone: '8888778888',
    company: 'Qik Class Pvt. Ltd',
    jobTitle: 'Manager',
    password: 'Nsg@12345',
  });
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Verification mail has been sent to your E-mail!');
    await dialog.accept();
  });
  await page.locator(locators.registerButton).click();
});
});

