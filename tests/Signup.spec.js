// @ts-check
const { test, expect } = require('@playwright/test');

const locators = {
  createAccountButton: 'button[name="Create account"]',
  nameInput: 'input[type="text"]',
  emailInput: '#email',
  phoneInput: 'input[type="tel"]',
  companyInput: '//input[4]',
  jobTitleInput: '//input[5]',
  passwordInput: 'input[name="password"]',
  termsCheckbox: 'input[id="termsandcondition"]',
  registerButton: '//button[contains(.,\'Register\')]',
  freePlanButton: 'li:has-text("OPENSIGN™ FREEFreeBilled") button',
  professionalPlanButton: 'li:has-text("OPENSIGN™ PROFESSIONAL$9.99/") button',
  proceedButton: "//span[@class='btn-txt' and text()='Proceed']",
  addressField: '//input[@id=\'billing_street\']',
  cityField: '//input[@id=\'billing_city\']',
  zipCodeField: '//input[@id=\'billing_zip\']',
 
  sameAsBillingCheckbox: 'input[name="sameasbillingaddress"]',
  reviewOrderButton: '//button[@class=\'btn-txt\' and text() =\'Review Order\']',
};

const fillSignupForm = async (page, { name, email, phone, company, jobTitle, password }) => {
  await page.locator(locators.nameInput).first().fill(name);
  await page.locator(locators.emailInput).fill(email);
  await page.locator(locators.phoneInput).fill(phone);
  await page.locator(locators.companyInput).fill(company);
  await page.locator(locators.jobTitleInput).fill(jobTitle);
  await page.locator(locators.passwordInput).fill(password);
  await page.locator(locators.termsCheckbox).click();
};

test('Verify that user can sign up with a free subscription', async ({ page }) => {
  await page.goto('https://staging-app.opensignlabs.com/');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();

  const email = `pravin+${Math.random()}@nxglabs.in`;
  await fillSignupForm(page, {
    name: 'Mathew Wade',
    email,
    phone: '8238988998',
    company: 'qikAi.com',
    jobTitle: 'HrExecative',
    password: 'Nxglabs@123',
  });

  await page.locator(locators.registerButton).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible();
  await page.locator(locators.freePlanButton).click();
  await page.getByLabel('Close').click();

  const title = await page.title();
  expect(title).toBe('Dashboard - OpenSign™');
});

test('Verify that user can sign up with a professional plan', async ({ page }) => {
  await page.goto('https://staging-app.opensignlabs.com/');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();

  const email = `pravin+${Math.random()}@nxglabs.in`;
  await fillSignupForm(page, {
    name: 'Mathew Wade',
    email,
    phone: '8238988998',
    company: 'qikAi.com',
    jobTitle: 'HrExecative',
    password: 'Nxglabs@123',
  });

  await page.locator(locators.registerButton).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ PROFESSIONAL' })).toBeVisible();
  await page.locator(locators.professionalPlanButton).click();
  await page.locator(locators.proceedButton).click();
  await page.locator(locators.proceedButton).click();
  // Fill address details
  await page.getByLabel('Address', { exact: true }).fill('120 wood street');
  await page.getByLabel('City').fill('San Francisco');
  await page.getByLabel('ZIP Code').fill('34554');
 // await page.locator(locators.sameAsBillingCheckbox).click();
 // await page.locator(locators.reviewOrderButton).click();

  // Final navigation or validations
  //const title = await page.title();
 // expect(title).toBe('Dashboard - OpenSign™');
});

test('Verify that users cannot sign up with an already registered email address.', async ({ page }) => {
  await page.goto('https://staging-app.opensignlabs.com/');
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
    expect(dialog.message()).toBe('User already exists with this username!');
    await dialog.accept();
  });
/wait
  await page.locator(locators.registerButton).click();
});
