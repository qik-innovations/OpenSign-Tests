
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');

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
test.describe('Contact', () => {
test('Verify that user can add a new contact.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  const title = await page.title();
  if (title === 'Contactbook - OpenSign™') {
    console.log('Page title is correct: Contactbook - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Contactbook - OpenSign™", Got: "${title}"`);
  }
  const Randomemail = `ps+${Math.floor(10 + Math.random() * 90)}@tim.in`;
        await page.locator("//div[contains(@class, 'cursor-pointer') and contains(@class, 'flex') and .//i[contains(@class, 'fa-square-plus')]]").click();
        await page.getByLabel('Name *').fill('Pravin Shej');
        await page.getByLabel('Email *').fill(Randomemail);
        await page.locator("//dialog[@id='selectSignerModal']//form//button[normalize-space()='Optional details']").click();
        await page.locator("//dialog[@id='selectSignerModal']//input[@id='phone']").fill('924820934');
await page.locator("//dialog[@id='selectSignerModal']//input[@id='company']").fill('Nxg Labs');
        await page.locator("//dialog[@id='selectSignerModal']//input[@id='jobTitle']").fill('QA Lead');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.locator("//input[@placeholder='Search contacts…']").fill("Pravin Shej");
        await expect(page.locator('tbody')).toContainText(Randomemail);
        await expect(page.locator('tbody')).toContainText('924820934');
        console.log(`P Shej ${Randomemail}`);
        await page.getByRole('row', { name: `Pravin Shej ${Randomemail}` }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click(); 
});

test('Verify that user cannot add a new contact with an existing email address', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  const contactName = 'Pravin Ssss';
  const contactEmail = `pravin+duplicate-${Date.now()}@nxglabs.in`;

  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  await page.waitForLoadState('networkidle');

  const addContactButton = page.locator(
    "//div[contains(@class,'cursor-pointer') and .//i[contains(@class,'fa-square-plus')]]"
  );

  const contactModal = page.locator('#selectSignerModal');
  const contactRows = page.locator('tbody tr').filter({ hasText: contactEmail });

  const deleteContactIfExists = async () => {
    if (await contactModal.isVisible()) {
      await contactModal.getByRole('button', { name: 'Close' }).click();
    }

    for (let attempt = 0; attempt < 2; attempt++) {
      const rowCount = await contactRows.count();
      if (rowCount === 0) return;

      await contactRows.first().getByRole('button').nth(1).click();
      await page.getByRole('button', { name: 'Yes' }).click();
      await expect(contactRows).toHaveCount(rowCount - 1);
    }
  };

  try {
    await addContactButton.click();
    await page.getByLabel('Name *').fill(contactName);
    await page.getByLabel('Email *').fill(contactEmail);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(contactRows).toHaveCount(1);
    await expect(contactRows.first()).toContainText(contactName);

    await addContactButton.click();
    await page.getByLabel('Name *').fill('Andrews Wade');
    await page.getByLabel('Email *').fill(contactEmail);

    const duplicateDialogPromise = page.waitForEvent('dialog', { timeout: 15000 }).then(async dialog => {
      const result = { type: dialog.type(), message: dialog.message() };
      await dialog.accept();
      return result;
    });

    await page.getByRole('button', { name: 'Submit' }).click();
    const duplicateDialog = await duplicateDialogPromise;
    expect(duplicateDialog.type).toBe('alert');
    expect(duplicateDialog.message).toMatch(/already|exist|duplicate/i);
    await expect(contactRows).toHaveCount(1);
    await expect(contactRows.first()).toContainText(contactName);
  } finally {
    await deleteContactIfExists();
  }
});
test('Verify that user can import contacts from an Excel file and delete them across pages.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  // Navigate to Contactbook
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();

  // Trigger Import
  await page.locator("//div[contains(@class, 'cursor-pointer') and .//i[contains(@class, 'fa-upload')]]").click();
  await page.getByRole('button', { name: 'Import' }).click();

  // Handle file chooser
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Contactbookready.xlsx'));

  // Perform Import
  let importDialogHandled;
  page.once('dialog', dialog => {
    importDialogHandled = dialog.accept();
  });
  await page.getByRole('button', { name: 'Import' }).click();
  if (importDialogHandled) await importDialogHandled;
  await page.waitForTimeout(5000);
  // Contacts to verify and delete
  const contacts = [
    { name: 'Tony Stark', email: 'tonys@nxglabs.in' },
    { name: 'Steve Head', email: 'stevehead@nxglabs.in' }
  ];
  const table = page.locator('tbody');
  const deleteConfirmation = page.locator('#selectSignerModal');

  for (const contact of contacts) {
    let contactFound = false;
    while (!contactFound) {
      const row = page.getByRole('row').filter({ hasText: contact.email });
      if (await row.isVisible().catch(() => false)) {
        await expect(row).toContainText(contact.name);
        await expect(row).toContainText(contact.email);
        await row.getByRole('button').nth(1).click();
        await expect(deleteConfirmation).toBeVisible();
        await deleteConfirmation.getByRole('button', { name: 'Yes', exact: true }).click();
        await expect(row).toHaveCount(0);
        contactFound = true;
      } else {
        const nextButton = page.locator('//button[@class ="op-join-item op-btn op-btn-sm" and text()="Next"]');
        if (await nextButton.isVisible() && !(await nextButton.isDisabled())) {
          const currentPageRows = await table.innerText();
          await nextButton.click();
          await expect(table).not.toHaveText(currentPageRows);
        } else {
          throw new Error(`Contact "${contact.name}" not found in the contact book.`);
        }
      }
    }
  }
});

});