// @ts-check
const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const { fetchOTP } = require('../utils/otpHelper.js');
const { gmailConfig } = require('../utils/mailConfigs.js');

const DEFAULT_PASSWORD = 'Nxglabs@123';
const DEFAULT_PHONE = '8238988998';
const TEST_CARD = {
  number: '4242424242424242',
  expiry: '0728',
  cvc: '709',
};

const locators = {
  nameInput: 'input[type="text"]',
  emailInput: '#email',
  phoneInput: 'input[type="tel"]',
  companyInput: '(//input)[4]',
  jobTitleInput: '(//input)[5]',
  passwordInput: 'input[name="password"]',
  termsCheckbox: '#termsandcondition',
  registerButton: '//button[contains(text(), "Register")]',
  proceedButton: "//span[@class='btn-txt' and text()='Proceed']",
  sendOtpButton: "//span[@class='btn-txt' and text()='Send OTP']",
  billingStreet: '#billing_street',
  billingCity: '#billing_city',
  billingZip: '#billing_zip',
  billingState: '[name="billing_state_code"]',
};

const planDefinitions = {
  free: {
    heading: 'OPENSIGN™ FREE',
    slug: 'freeplan',
    button: 'Get Started',
    badgeText: 'Upgrade now',
    cardText: [
      'Free',
      'Billed Yearly',
      'Free Unlimited E-signatures, Forever.',
      'Unlimited digital signatures',
      'Sign documents yourself',
      'Request signatures from others',
      'Unlimited templates',
      '14 field types',
      'Automatic e-signatures',
      'Completion certificates',
      'Send in order',
      'Organize docs in OpenSign™ Drive',
      'Document templates',
      'Import from Dropbox',
      'Contact book',
      'Document expiry support',
      'Decline document support',
      'Email notifications',
      'Public profiles',
    ],
  },
  professionalMonthly: {
    heading: 'OPENSIGN™ PROFESSIONAL',
    slug: 'pro-monthly',
    billingText: 'Billed Monthly',
    priceText: '₹999',
    badgeText: 'PRO',
    cardText: [
      'Exclusive Access to advanced features.',
      'Everything in OpenSign™ free',
      'Field validations',
      'Regular expression validations',
      'Organize docs in OpenSign™ Drive',
      'Webhooks',
      'Zapier integration',
      'API Access',
      'upto 240 API signatures',
      'Custom email templates',
      'Connect your own Gmail or SMTP account for sending emails',
      'Auto reminders',
      'Bulk send (upto 240 docs)',
      'Premium Public profile usernames',
      'Enforce email-based verification to confirm signer identity',
      'Embedded signing',
    ],
  },
  professionalYearly: {
    heading: 'OPENSIGN™ PROFESSIONAL',
    slug: 'pro-yearly',
    billingText: 'Billed Yearly',
    priceText: '₹9,999',
    badgeText: 'PRO',
    cardText: [
      'Exclusive Access to advanced features.',
      'Everything in OpenSign™ free',
      'Field validations',
      'Regular expression validations',
      'Organize docs in OpenSign™ Drive',
      'Webhooks',
      'Zapier integration',
      'API Access',
      'upto 240 API signatures',
      'Custom email templates',
      'Connect your own Gmail or SMTP account for sending emails',
      'Auto reminders',
      'Bulk send (upto 240 docs)',
      'Premium Public profile usernames',
      'Enforce email-based verification to confirm signer identity',
      'Embedded signing',
    ],
  },
  teamsMonthly: {
    heading: 'OPENSIGN™ TEAMS',
    slug: 'teams-monthly',
    billingText: 'Billed Monthly',
    priceText: '₹1,999',
    badgeText: 'PRO',
    cardText: [
      'Exclusive Access to advanced features.',
      'Everything in OpenSign™ professional',
      'upto 500 API signatures',
      'Bulk send (upto 500 docs)',
      'DocumentId removal from signed docs',
      'Teams and Organizations',
      'Share Templates with teams',
      'Share Templates with individuals',
      'BYOC - Store your documents in your own cloud storage',
      'Request Payments (coming soon)',
      'Mobile app (coming soon)',
    ],
  },
  teamsYearly: {
    heading: 'OPENSIGN™ TEAMS',
    slug: 'teams-yearly',
    billingText: 'Billed Yearly',
    priceText: '₹19,999',
    badgeText: 'PRO',
    cardText: [
      'Exclusive Access to advanced features.',
      'Everything in OpenSign™ professional',
      'upto 500 API signatures',
      'Bulk send (upto 500 docs)',
      'DocumentId removal from signed docs',
      'Teams and Organizations',
      'Share Templates with teams',
      'Share Templates with individuals',
      'BYOC - Store your documents in your own cloud storage',
      'Request Payments (coming soon)',
      'Mobile app (coming soon)',
    ],
  },
};

const randomToken = () => Math.random().toString(36).slice(2, 10);
const uniqueEmail = (prefix = 'kelvinsjohnson24') => `${prefix}+${Date.now()}${randomToken()}@gmail.com`;
const uniqueNxgEmail = () => `pravin+${Date.now()}${randomToken()}@nxglabs.in`;

const signupData = (overrides = {}) => ({
  name: 'Mathew Wade',
  email: uniqueEmail(),
  phone: DEFAULT_PHONE,
  company: 'qikAi pvt ltd',
  jobTitle: 'Hr Executive',
  password: DEFAULT_PASSWORD,
  ...overrides,
});

async function openSignupPage(page) {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
}

async function fillSignupForm(page, { name, email, phone, company, jobTitle, password, acceptTerms = true }) {
  await page.locator(locators.nameInput).first().fill(name);
  await page.locator(locators.emailInput).fill(email);
  await page.locator(locators.phoneInput).fill(phone);
  await page.locator(locators.companyInput).fill(company);
  await page.locator(locators.jobTitleInput).fill(jobTitle);
  await page.locator(locators.passwordInput).fill(password);

  const terms = page.locator(locators.termsCheckbox);
  if (acceptTerms && !(await terms.isChecked())) {
    await terms.click();
  }
}

async function submitRegistration(page) {
  await page.locator(locators.registerButton).click();
}

function planCard(page, plan) {
  return page.locator('li', {
    has: page.getByRole('heading', { name: plan.heading }),
    hasText: plan.billingText,
  });
}

async function chooseBillingCadence(page, plan) {
  if (!plan.billingText) return;

  const cadence = plan.billingText.includes('Monthly') ? 'Monthly' : 'Yearly';
  const candidates = [
    page.getByRole('button', { name: new RegExp(cadence, 'i') }),
    page.getByRole('tab', { name: new RegExp(cadence, 'i') }),
    page.getByLabel(new RegExp(cadence, 'i')),
    page.getByText(new RegExp(`^${cadence}$`, 'i')),
  ];

  for (const candidate of candidates) {
    if (await candidate.first().isVisible().catch(() => false)) {
      await candidate.first().click();
      return;
    }
  }
}

async function expectPlanCardDetails(card, plan) {
  await expect(card).toBeVisible({ timeout: 120000 });
  if (plan.priceText) await expect(card).toContainText(plan.priceText);
  if (plan.billingText) await expect(card).toContainText(plan.billingText);

  for (const text of plan.cardText) {
    await expect(card).toContainText(text);
  }
}

async function selectFreePlan(page) {
  await expect(page.getByRole('heading', { name: planDefinitions.free.heading })).toBeVisible({ timeout: 120000 });
  for (const text of planDefinitions.free.cardText) {
    await expect(page.locator('#root')).toContainText(text);
  }

  const freeCard = page.locator('li', {
    has: page.getByRole('heading', { name: planDefinitions.free.heading }),
  });
  await freeCard.getByRole('button').click();
  await closeModalIfVisible(page);
  await expect(page.locator('//div[@id="profile-menu"]//parent::button[text()="Upgrade now"]')).toBeVisible();
}

async function selectPaidPlan(page, plan) {
  await chooseBillingCadence(page, plan);
  const card = planCard(page, plan);
  await expectPlanCardDetails(card, plan);
  await card.getByRole('button', { name: 'Subscribe' }).click();
  await page.locator(locators.proceedButton).click();
}

async function completeOtpVerification(page, email) {
  await page.locator(locators.sendOtpButton).click();
  const otp = await fetchOTP({
    ...gmailConfig,
    otpRegex: /(\d{6})/,
    expectedTo: email,
  });

  for (let i = 0; i < otp.length; i++) {
    await page.locator(`(//input[@type='tel' and @maxlength='1'])[${i + 1}]`).fill(otp[i]);
  }

  await page.getByRole('button', { name: 'Proceed' }).click();
}

async function fillBillingAddress(page) {
  await page.locator(locators.billingStreet).fill('120 wood street');
  await page.selectOption(locators.billingState, { label: 'California' });
  await page.locator(locators.billingCity).fill('San Francisco');
  await page.locator(locators.billingZip).fill('34554');
  await page.getByRole('button', { name: 'Review Order' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
}

async function payByStripeTestCard(page) {
  await page.waitForSelector('iframe');

  const cardNumberFrame = page.frameLocator("iframe[title*='card number']");
  await cardNumberFrame.locator("input[name='cardnumber']").fill(TEST_CARD.number);

  const expFrame = page.frameLocator("iframe[title*='expiration']");
  await expFrame.locator("input[name='exp-date'], input[name='expdate']").fill(TEST_CARD.expiry);

  const cvcFrame = page.frameLocator("iframe[title*='CVC'], iframe[title*='security']");
  await cvcFrame.locator("input[name='cvc']").fill(TEST_CARD.cvc);

  await page.getByRole('button', { name: /Pay/i }).click();
}

async function completePaidCheckout(page, email, plan) {
  await selectPaidPlan(page, plan);
  await completeOtpVerification(page, email);
  await fillBillingAddress(page);
  await payByStripeTestCard(page);
  await closeModalIfVisible(page);
  await expect(page.locator(`//div[@id="profile-menu"]//parent::div[text()="${plan.badgeText}"]`)).toBeVisible({
    timeout: 120000,
  });
}

async function closeModalIfVisible(page) {
  const closeByLabel = page.getByLabel('Close');
  if (await closeByLabel.isVisible().catch(() => false)) {
    await closeByLabel.click();
    return;
  }

  const closeByText = page.getByText('✕');
  if (await closeByText.isVisible().catch(() => false)) {
    await closeByText.click();
  }
}

async function openProfile(page) {
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
}

async function openBilling(page) {
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Billing').click();
}

async function expectProfileDetails(page, data, { username, tagline, shouldShowUpgrade = true } = {}) {
  const list = page.getByRole('list');
  await expect(page.locator('#renderList')).toContainText('Admin');
  await expect(list).toContainText('Name:');
  await expect(list).toContainText(data.name);
  await expect(list).toContainText('Phone:');
  await expect(list).toContainText(data.phone);
  await expect(list).toContainText('Email :');
  await expect(list).toContainText(data.email);
  await expect(list).toContainText('Company:');
  await expect(list).toContainText(data.company);
  await expect(list).toContainText('Job title:');
  await expect(list).toContainText(data.jobTitle);
  await expect(list).toContainText('Is email verified:');
  await expect(list).toContainText('Not verified (Verify)');
  await expect(list).toContainText('Public profile :');
  await expect(list).toContainText('Tagline :');
  await expect(list).toContainText('Disable documentId :');
  await expect(list).toContainText('Language:');

  if (username) await expect(list).toContainText(username);
  if (tagline) await expect(list).toContainText(tagline);

  if (shouldShowUpgrade) {
    await expect(list).toContainText('Upgrade now');
  } else {
    await expect(list).not.toContainText('Upgrade now');
  }
}

async function editProfile(page, overrides = {}) {
  const updated = {
    name: 'Mathew W Karl',
    phone: '8806607524',
    company: 'OpenSign pvt. ltd',
    jobTitle: 'Quality Analyst',
    username: `pravin${randomToken()}`,
    tagline: 'Seal the deal openly',
    ...overrides,
  };

  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('li').filter({ hasText: 'Name:' }).getByRole('textbox').fill(updated.name);
  await page.locator('li').filter({ hasText: 'Phone:' }).getByRole('textbox').fill(updated.phone);
  await page.locator('li').filter({ hasText: 'Company:' }).getByRole('textbox').fill(updated.company);
  await page.locator('li').filter({ hasText: 'Job title:' }).getByRole('textbox').fill(updated.jobTitle);
  await page.getByPlaceholder('enter user name').fill(updated.username);
  await page.getByPlaceholder('enter tagline').fill(updated.tagline);
  await page.getByRole('button', { name: 'Save' }).click();

  return updated;
}
async function editProfilewithoutEditbuttonClick(page, overrides = {}) {
  const updated = {
    name: 'Mathew W Karl',
    phone: '8806607524',
    company: 'OpenSign pvt. ltd',
    jobTitle: 'Quality Analyst',
    username: `pravin${randomToken()}`,
    tagline: 'Seal the deal openly',
    ...overrides,
  };
  await page.locator('li').filter({ hasText: 'Name:' }).getByRole('textbox').fill(updated.name);
  await page.locator('li').filter({ hasText: 'Phone:' }).getByRole('textbox').fill(updated.phone);
  await page.locator('li').filter({ hasText: 'Company:' }).getByRole('textbox').fill(updated.company);
  await page.locator('li').filter({ hasText: 'Job title:' }).getByRole('textbox').fill(updated.jobTitle);
  await page.getByPlaceholder('enter user name').fill(updated.username);
  await page.getByPlaceholder('enter tagline').fill(updated.tagline);
  await page.getByRole('button', { name: 'Save' }).click();

  return updated;
}

async function expectBillingDetails(page, plan) {
  await expect(page.getByRole('heading')).toContainText(plan.slug);
  await expect(page.locator('#renderList')).toContainText(plan.billingText || 'Free');
  await expect(page.locator('#renderList')).toContainText('active');
}

async function expectNextBillingDate(page, monthsToAdd) {
  const text = await page.locator('//span[@class="op-text-primary font-medium"]').textContent();
  if (!text) throw new Error('No billing date found');

  const actualDate = new Date(text.trim());
  if (Number.isNaN(actualDate.getTime())) throw new Error(`Invalid billing date format: ${text}`);

  const expectedDate = new Date();
  expectedDate.setMonth(expectedDate.getMonth() + monthsToAdd);

  expect(actualDate.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);
}

async function expectSubscriptionInvoiceEmail(email) {
  const invoiceText = await fetchOTP({
    ...gmailConfig,
    otpRegex: /(invoice|receipt|subscription|payment successful)/i,
    expectedTo: email,
  });

  expect(invoiceText.toLowerCase()).toMatch(/invoice|receipt|subscription|payment successful/);
}

async function registerNewUser(page, data) {
  await openSignupPage(page);
  await fillSignupForm(page, data);
  await submitRegistration(page);
}

test.describe('SignupPage', () => {
  test('Reg_TC-01 Verify all page-level and field-level validations on the new user registration form.', async ({ page }) => {
    await openSignupPage(page);

    await submitRegistration(page);
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
    await expect(page.locator(locators.emailInput)).toBeVisible();
    await expect(page.locator(locators.passwordInput)).toBeVisible();
    await expect(page.locator(locators.termsCheckbox)).toBeVisible();

    await fillSignupForm(page, signupData({
      name: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      password: '',
      acceptTerms: false,
    }), { acceptTerms: false });

    await submitRegistration(page);
    await expect(page.locator('#root')).toContainText(/required|valid|terms|condition/i);

    await page.locator(locators.phoneInput).fill('abc');
    await page.locator(locators.passwordInput).fill('123');
    await submitRegistration(page);
    await expect(page.locator('#root')).toContainText(/phone|password|valid|minimum|required/i);
  });

  test('Reg_TC-02 Verify error message for incorrect email on register.', async ({ page }) => {
    await openSignupPage(page);
    await fillSignupForm(page, signupData({ email: 'incorrect-email' }));
    await submitRegistration(page);
    await expect(page.locator('#root')).toContainText(/valid email|invalid email|email/i);
  });

  test('Reg_TC-03 Verify that a new user can successfully create an account using the Free Plan.', async ({ page }) => {
    const data = signupData({
      email: uniqueNxgEmail(),
      company: 'qikAi.com',
    });
    loginCredentials.FreeplanUsername = data.email;
    loginCredentials.FreePlanpassword = data.password;

    await registerNewUser(page, data);
    await selectFreePlan(page);
    await expect(page).toHaveTitle('Dashboard - OpenSign™');
 await page.getByRole('button', { name: 'Close Tour' }).click();
    await openProfile(page);
    await expectProfileDetails(page, data);

    const tooShortUsername = 'Testing';
    await editProfile(page, { username: tooShortUsername });
    await expect(page.getByRole('heading')).toContainText('Upgrade to Plan');
    await expect(page.locator('#renderList')).toContainText('To have a username less than 8 character please subscribe');
    await expect(page.locator('#renderList')).toContainText('Upgrade now');
    await closeModalIfVisible(page);
 const longUsername = 'DemoTestname';
const updated = await editProfilewithoutEditbuttonClick(page, { username: longUsername })
    await expectProfileDetails(
      page,
      { ...data, ...updated },
      { username: updated.username, tagline: updated.tagline },
    );

    await openBilling(page);
    await expectBillingDetails(page, planDefinitions.free);

    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: '' }).click();
      if (await page.locator('//span[text()="Sent this month"]').isVisible()) break;
      await page.waitForTimeout(500);
    }

    await page.locator('//span[text()="Sent this month"]').click();
    await expect(page.locator('#selectSignerModal')).toContainText('To maintain service quality and prevent spam, OpenSign allows up to 15 emails per month on the free plan.');
    await expect(page.locator('#selectSignerModal')).toContainText('Tip: You can still sign unlimited documents by manually sharing the signing request link.');
    await expect(page.locator('#selectSignerModal')).toContainText('Upgrade now');
    await page.locator('div').filter({ hasText: /^✕$/ }).click();
  });

  test('Reg_TC-04 Verify that a user cannot register using an already existing email address.', async ({ page }) => {
    await openSignupPage(page);
    await fillSignupForm(page, signupData({
      name: 'Mathew Lowrence',
      email: 'pravin+y4@nxglabs.in',
      phone: '8888778888',
      company: 'Qik Class Pvt. Ltd',
      jobTitle: 'Manager',
      password: 'Nsg@12345',
    }));
    await submitRegistration(page);
    await expect(page.locator('#root')).toContainText('User already registered.');
  });

  test('Reg_TC-05 Verify Professional Monthly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();

    await registerNewUser(page, data);
    // ---------- Step 2: Select Professional Plan ----------
  const professionalCard = page.locator('li', {
    has: page.getByRole('heading', { name: 'OPENSIGN™ PROFESSIONAL' }),
  });

  await expect(professionalCard).toBeVisible({ timeout: 120000 });
await expect(professionalCard).toContainText('₹9,999');
await expect(professionalCard).toContainText('Billed Yearly');
await expect(professionalCard).toContainText('Exclusive Access to advanced features.');
await expect(professionalCard).toContainText('API Access');
await expect(professionalCard).toContainText('Bulk send (upto 240 docs)');
await expect(professionalCard).toContainText('Embedded signing');

// Added feature validations
await expect(professionalCard).toContainText('Everything in OpenSign™ free');
await expect(professionalCard).toContainText('Field validations');
await expect(professionalCard).toContainText('Regular expression validations');
await expect(professionalCard).toContainText('Organize docs in OpenSign™ Drive');
await expect(professionalCard).toContainText('Webhooks');
await expect(professionalCard).toContainText('Zapier integration');
await expect(professionalCard).toContainText('API Access');
await expect(professionalCard).toContainText('upto 240 API signatures');
await expect(professionalCard).toContainText('Custom email templates');
await expect(professionalCard).toContainText('Connect your own Gmail or SMTP account for sending emails');
await expect(professionalCard).toContainText('Auto reminders');
await expect(professionalCard).toContainText('Bulk send (upto 240 docs)');
await expect(professionalCard).toContainText('Premium Public profile usernames');
await expect(professionalCard).toContainText('Enforce email-based verification to confirm signer identity');
await expect(professionalCard).toContainText('Embedded signing');

  await professionalCard.getByRole('button', { name: 'Subscribe' }).click();
  await page.locator(locators.proceedButton).click();

  // ---------- Step 3: OTP Verification ----------
  await page.locator(locators.sendOtpButton).click();
  console.log('Waiting for OTP...');

  const otp = await fetchOTP({
    ...gmailConfig,
    otpRegex: /(\d{6})/,
    expectedTo: data.email // Ensure we only process OTP emails sent to our generated address
  });

  console.log('OTP Received:', otp);

  for (let i = 0; i < otp.length; i++) {
    await page.locator(`(//input[@type='tel' and @maxlength='1'])[${i + 1}]`).fill(otp[i]);
  }

  //await page.locator(locators.Verify_now_Button).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  // ---------- Step 4: Fill Address ----------

await page.locator('#billing_street').fill('120 wood street');
await page.selectOption('[name="billing_state_code"]', { label: 'California' });
  await page.locator('#billing_city').fill('San Francisco');
  await page.locator('#billing_zip').fill('34554');

  await page.getByRole('button', { name: 'Review Order' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  // ---------- Step 5: Enter Card Details ----------
 // Wait for Stripe iframes to load
await page.waitForSelector("iframe");

// ---- Card Number ----
const cardNumberFrame = page
  .frameLocator("iframe[title*='card number']");

await cardNumberFrame
  .locator("input[name='cardnumber']")
  .click();

await cardNumberFrame
  .locator("input[name='cardnumber']")
  .type("4242424242424242", { delay: 400 });


// ---- Expiry Date ----
const expFrame = page
  .frameLocator("iframe[title*='expiration']");

await expFrame
  .locator("input[name='exp-date'], input[name='expdate']")
  .click();

await expFrame
  .locator("input[name='exp-date'], input[name='expdate']")
  .type("0728", { delay: 100 });

// ---- CVC ----
const cvcFrame = page
  .frameLocator("iframe[title*='CVC'], iframe[title*='security']");

await cvcFrame
  .locator("input[name='cvc']")
  .click();

await cvcFrame
  .locator("input[name='cvc']")
  .type("709", { delay: 100 });


// ---- Pay Button ----
await page.getByRole("button", { name: /Pay/i }).click();

  // ---------- Step 6: Open Profile ----------
  await page.getByLabel('Close').click();
  await expect(page.locator('//div[@id="profile-menu"]//parent::div[text()="PRO"]')).toBeVisible();

  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();

  // ---------- Step 7: Verify Profile Details ----------
  await expect(page.locator('#renderList')).toContainText('Admin');
  await expect(page.getByRole('list')).toContainText('Mathew Wade');
  await expect(page.getByRole('list')).toContainText('8238988998');
  await expect(page.getByRole('list')).toContainText(data.email);
  await expect(page.getByRole('list')).toContainText('qikAi pvt ltd');
  await expect(page.getByRole('list')).toContainText('Hr Execative');

  // ---------- Step 8: Edit Profile ----------
  await page.getByRole('button', { name: 'Edit' }).click();

  await page.locator('li').filter({ hasText: 'Name:' }).getByRole('textbox').fill('Mathew W Karl');
  await page.locator('li').filter({ hasText: 'Phone:' }).getByRole('textbox').fill('8806607524');
  await page.locator('li').filter({ hasText: 'Company:' }).getByRole('textbox').fill('OpenSign pvt. ltd');
  await page.locator('li').filter({ hasText: 'Job title:' }).getByRole('textbox').fill('Quality Analyst');

  const username = `pravin${Math.random().toString(16).slice(2, 8)}`;

  await page.getByPlaceholder('enter user name').fill(username);
  await page.getByPlaceholder('enter tagline').fill('Seal the deal openly');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('list')).toContainText('Mathew W Karl');
  await expect(page.getByRole('list')).toContainText('OpenSign pvt. ltd');
  await expect(page.getByRole('list')).toContainText('Quality Analyst');
  await expect(page.getByRole('list')).toContainText(username);

  // ---------- Step 9: Billing Verification ----------
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Billing').click();

  await expect(page.getByRole('heading')).toContainText('pro-yearly');
  await expect(page.locator('#renderList')).toContainText('Billed Yearly');
  await expect(page.locator('#renderList')).toContainText('active');

  // ---------- Step 10: Verify Billing Date ----------
  const text = await page.locator('//span[@class="op-text-primary font-medium"]').textContent();
  if (!text) throw new Error('No billing date found');

  const billingDate = new Date(text.trim());
  const billingFormatted = billingDate.toISOString().split('T')[0];

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const expectedDate = nextYear.toISOString().split('T')[0];

  expect(expectedDate).toBe(billingFormatted);

  });

  test('Reg_TC-06 Verify Professional Yearly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();

    await registerNewUser(page, data);
    await completePaidCheckout(page, data.email, planDefinitions.professionalYearly);
    await expectSubscriptionInvoiceEmail(data.email);

    await openProfile(page);
    await expectProfileDetails(page, data, { shouldShowUpgrade: false });
    const updated = await editProfile(page);
    await expectProfileDetails(page, { ...data, ...updated }, {
      username: updated.username,
      tagline: updated.tagline,
      shouldShowUpgrade: false,
    });

    await openBilling(page);
    await expectBillingDetails(page, planDefinitions.professionalYearly);
    await expectNextBillingDate(page, 12);
  });

  test('Reg_TC-07 Verify Teams Monthly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();

    await registerNewUser(page, data);
    await completePaidCheckout(page, data.email, planDefinitions.teamsMonthly);
    await expectSubscriptionInvoiceEmail(data.email);

    await openProfile(page);
    await expectProfileDetails(page, data, { shouldShowUpgrade: false });
    const updated = await editProfile(page);
    await expectProfileDetails(page, { ...data, ...updated }, {
      username: updated.username,
      tagline: updated.tagline,
      shouldShowUpgrade: false,
    });

    await openBilling(page);
    await expectBillingDetails(page, planDefinitions.teamsMonthly);
    await expectNextBillingDate(page, 1);
  });

  test('Reg_TC-08 Verify Teams Yearly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();

    await registerNewUser(page, data);
    await completePaidCheckout(page, data.email, planDefinitions.teamsYearly);
    await expectSubscriptionInvoiceEmail(data.email);

    await openProfile(page);
    await expectProfileDetails(page, data, { shouldShowUpgrade: false });
    const updated = await editProfile(page);
    await expectProfileDetails(page, { ...data, ...updated }, {
      username: updated.username,
      tagline: updated.tagline,
      shouldShowUpgrade: false,
    });

    await openBilling(page);
    await expectBillingDetails(page, planDefinitions.teamsYearly);
    await expectNextBillingDate(page, 12);
  });

  test('Reg_TC-09 Verify logout from EU-Subscription page redirects to EU-Login page.', async ({ page }) => {
    const data = signupData();

    await registerNewUser(page, data);
    await expect(page.getByRole('heading', { name: /OPENSIGN™/ })).toBeVisible({ timeout: 120000 });
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('Logout').click();

    await expect(page).toHaveURL(/login/i);
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
  });

  test.skip('Reg_TC-10 Verify signer-added user receives verification link while registering organization.', async () => {
    // Prerequisite: create/request a document signature for an email that is not registered.
    // Then open the verification link from that email and assert that Register sends a verification link.
  });

  test.skip('Reg_TC-11 Verify signer-added user can verify email, log in, and create a new organization.', async () => {
    // Prerequisite: reuse the signer-added user from Reg_TC-10, open the verification link,
    // log in, create organization, and validate that the organization is available after login.
  });
});
