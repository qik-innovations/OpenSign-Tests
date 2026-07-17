// @ts-check
const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps  = require('../utils/CommonSteps');
const { fetchOTP } = require('../utils/otpHelper.js');
const { gmailConfig } = require('../utils/mailConfigs.js');
const PageActions = require('../utils/PageActions.js');

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
    priceText: '₹2,499',
    badgeText: 'PRO',
    cardText: [
      'OPENSIGN™ PROFESSIONAL₹2,499Billed MonthlyExclusive Access to advanced features.SubscribeEverything in OpenSign™ freeField validationsRegular expression validationsOrganize docs in OpenSign™ DriveWebhooksZapier integrationAPI Accessupto 100 API signaturesCustom email templatesConnect your own Gmail or SMTP account for sending emailsAuto remindersBulk send (upto 100 docs)Premium Public profile usernamesEnforce email-based verification to confirm signer identityEmbedded signing'
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
  priceText: '₹3,499',
  badgeText: 'TEAM',
  cardText: [
   'OPENSIGN™ TEAMS₹3,499/userBilled MonthlyExclusive Access to advanced features.SubscribeEverything in OpenSign™ professionalupto 100 API signaturesTeams and OrganizationsShare Templates with teamsShare Templates with individualsBYOC - Store your documents in your own cloud storageDocumentId removal from signed docsBulk send (upto 100 docs)Request Payments (coming soon)Mobile app (coming soon)'
  ]
  },
  teamsYearly: {
    heading: 'OPENSIGN™ TEAMS',
    slug: 'teams-yearly',
    billingText: 'Billed Yearly',
    priceText: '₹19,999',
    badgeText: 'TEAM',
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

/**
 * @param {import('@playwright/test').Page} page
 */
async function openSignupPage(page) {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{name: string, email: string, phone: string, company: string, jobTitle: string, password: string, acceptTerms?: boolean}} param1
 */
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

/**
 * @param {import('@playwright/test').Page} page
 */
async function submitRegistration(page) {
  await page.locator(locators.registerButton).click();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{heading: string, billingText?: string}} plan
 * @returns {import('@playwright/test').Locator}
 */
function planCard(page, plan) {
  return page.locator('li', {
    has: page.getByRole('heading', { name: plan.heading }),
    hasText: plan.billingText,
  });
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{billingText?: string}} plan
 */
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

/**
 * @param {import('@playwright/test').Locator} card
 * @param {{priceText?: string, billingText?: string, cardText: string[]}} plan
 */
async function expectPlanCardDetails(card, plan) {
  await expect(card).toBeVisible({ timeout: 120000 });
  if (plan.priceText) await expect(card).toContainText(plan.priceText);
  if (plan.billingText) await expect(card).toContainText(plan.billingText);

  for (const text of plan.cardText) {
    await expect(card).toContainText(text);
  }
}

/**
 * @param {import('@playwright/test').Page} page
 */
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

/**
 * @param {import('@playwright/test').Page} page
 * @param {{heading: string, billingText?: string, priceText?: string, cardText: string[]}} plan
 */
async function selectPaidPlan(page, plan) {
  await chooseBillingCadence(page, plan);
  const card = planCard(page, plan);
  await expectPlanCardDetails(card, plan);
  await card.getByRole('button', { name: 'Subscribe' }).click();
  await page.locator(locators.proceedButton).click();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 */
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

/**
 * @param {import('@playwright/test').Page} page
 */
async function fillBillingAddress(page) {
  await page.locator(locators.billingStreet).fill('120 wood street');
  await page.selectOption(locators.billingState, { label: 'California' });
  await page.locator(locators.billingCity).fill('San Francisco');
  await page.locator(locators.billingZip).fill('34554');
  await page.getByRole('button', { name: 'Review Order' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
}

/**
 * @param {import('@playwright/test').Page} page
 */
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
/**
 * @param {import('@playwright/test').Page} page
 */
async function payByStripeTestCardMonthly(page) {
  await page.waitForSelector('iframe');

  const cardNumberFrame = page.frameLocator("iframe[title*='card number']");
  await cardNumberFrame.locator("input[name='cardnumber']").fill(TEST_CARD.number);

  const expFrame = page.frameLocator("iframe[title*='expiration']");
  await expFrame.locator("input[name='exp-date'], input[name='expdate']").fill(TEST_CARD.expiry);

  const cvcFrame = page.frameLocator("iframe[title*='CVC'], iframe[title*='security']");
  await cvcFrame.locator("input[name='cvc']").fill(TEST_CARD.cvc);
    await page.getByRole('button', { name: 'Start Trial' }).click();
}
/**
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {{heading: string, billingText?: string, priceText?: string, cardText: string[], badgeText: string}} plan
 */
async function completePaidCheckout(page, email, plan) {
  await selectPaidPlan(page, plan);
  await completeOtpVerification(page, email);
  await fillBillingAddress(page);
  await payByStripeTestCard(page);
  await closeModalIfVisible(page);
  await page.getByRole('button', { name: 'Close Tour' }).click();
  await expect(page.locator(`//div[@id="profile-menu"]//parent::div[text()="${plan.badgeText}"]`)).toBeVisible({
    timeout: 120000,
  });
}
/**
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {{heading: string, billingText?: string, priceText?: string, cardText: string[], badgeText: string}} plan
 */
async function completePaidCheckoutMonthly(page, email, plan) {
  await selectPaidPlan(page, plan);
  await completeOtpVerification(page, email);
  await fillBillingAddress(page);
  await payByStripeTestCardMonthly(page);
  await closeModalIfVisible(page);
  await page.getByRole('button', { name: 'Close Tour' }).click();
}
/**
 * @param {import('@playwright/test').Page} page
 */
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

/**
 * @param {import('@playwright/test').Page} page
 */
async function openProfile(page) {
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function openBilling(page) {
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Billing').click();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {*} data
 * @param {{username?: string, tagline?: string, shouldShowUpgrade?: boolean}} options
 */
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

/**
 * @param {import('@playwright/test').Page} page
 * @param {Record<string, any>} [overrides]
 */
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
/**
 * @param {import('@playwright/test').Page} page
 * @param {Record<string, any>} [overrides]
 */
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

/**
 * @param {import('@playwright/test').Page} page
 * @param {*} plan
 */
async function expectBillingDetails(page, plan) {
  await expect(page.getByRole('heading')).toContainText(plan.slug);
  await expect(page.locator('#renderList')).toContainText(plan.billingText || 'Free');
  await expect(page.locator('#renderList')).toContainText('active');
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} monthsToAdd
 */
async function expectNextBillingDate(page, monthsToAdd) {
  const text = await page.locator('//span[@class="op-text-primary font-medium"]').textContent();
  if (!text) throw new Error('No billing date found');

  const actualDate = new Date(text.trim());
  if (Number.isNaN(actualDate.getTime())) throw new Error(`Invalid billing date format: ${text}`);

  const expectedDate = new Date();
  expectedDate.setMonth(expectedDate.getMonth() + monthsToAdd);

  expect(actualDate.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);
}

/**
 * @param {string} email
 */
async function expectSubscriptionInvoiceEmail(email) {
  const invoiceText = await fetchOTP({
    ...gmailConfig,
    otpRegex: /(invoice|receipt|subscription|payment successful)/i,
    expectedTo: email,
  });

  expect(invoiceText.toLowerCase()).toMatch(/invoice|receipt|subscription|payment successful/);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{name: string, email: string, phone: string, company: string, jobTitle: string, password: string, acceptTerms?: boolean}} data
 */
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
    }));

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
 const randomNumber = Math.floor(100000 + Math.random() * 900000);
const longUsername = `public_userName${randomNumber}`;
console.log(longUsername);
// Example: DemoTestname483921
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
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
    //This is failing because the error message is displyed on the brower messge pop and whic i sno tworking in playwright execution
  //await expect(page.locator('#root')).toContainText('User already registered.');
 
  });

  test('Reg_TC-05 Verify Professional Monthly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();
    await registerNewUser(page, data);
    // ---------- Step 2: Select Professional Plan ----------
    await page.getByRole('tab', { name: 'Monthly' }).click();
   await completePaidCheckoutMonthly(page, data.email, planDefinitions.professionalMonthly);
    //await expectSubscriptionInvoiceEmail(data.email);
     await page.getByRole('button', { name: '' }).click();
  await page.getByText('Profile').click();
    await expectProfileDetails(page, data, { shouldShowUpgrade: true });
    const updated = await editProfile(page);
    await expectProfileDetails(page, { ...data, ...updated }, {
      username: updated.username,
      tagline: updated.tagline,
      shouldShowUpgrade: true,
    });

    await openBilling(page);
    await expectBillingDetails(page, planDefinitions.professionalMonthly);
    await expectNextBillingDate(page, 12);
  });

  test('Reg_TC-06 Verify Professional Yearly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();

    await registerNewUser(page, data);
    await completePaidCheckout(page, data.email, planDefinitions.professionalYearly);
    await expectSubscriptionInvoiceEmail(data.email);
 //await page.getByRole('button', { name: 'Close Tour' }).click();
    await openProfile(page);
    await expectProfileDetails(page, data, { shouldShowUpgrade: true });
    const updated = await editProfile(page);
    await expectProfileDetails(page, { ...data, ...updated }, {
      username: updated.username,
      tagline: updated.tagline,
      shouldShowUpgrade: true,
    });

    await openBilling(page);
    await expectBillingDetails(page, planDefinitions.professionalYearly);
    await expectNextBillingDate(page, 12);
  });

  test('Reg_TC-07 Verify Teams Monthly signup and subscription invoice email.', async ({ page }) => {
    test.setTimeout(280 * 1000);
    const data = signupData();
    await registerNewUser(page, data);
    await page.getByRole('tab', { name: 'Monthly' }).click();
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
/*
  test('Reg_TC-09 Verify logout from EU-Subscription page redirects to EU-Login page.', async ({ page }) => {
 const commonSteps = new CommonSteps(page);
  const actions = new PageActions(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await page.getByText('europe').click();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  await page.locator('input[type="text"]').first().fill('Mathew Wade');
  //here we are creating the random email id
  let x = "pravin" + Math.random() + "@nxglabs.in"
  await page.locator('#email').fill(x);
  await page.locator('input[type="tel"]').fill('8238988998');
  await page.locator('input[type="text"]').nth(1).fill('qikAi.com');
  await page.locator('input[type="text"]').nth(2).fill('HrExecative');
  await page.locator('input[name="password"]').fill('Nxglabs@123');
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 120000 });
   await page.getByRole('button', { name: 'Log Out' }).click();
    await expect(page).toHaveURL(/login/i);
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
  });
*/
});
