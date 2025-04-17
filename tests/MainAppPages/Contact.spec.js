
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
        await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
        await page.getByLabel('Name *').fill('Pravin Shej');
        await page.getByLabel('Email *').fill(Randomemail);
        await page.getByPlaceholder('optional').fill('0924820934');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('tbody')).toContainText(Randomemail);
        await expect(page.locator('tbody')).toContainText('0924820934');
        console.log(`P Shej ${Randomemail}`);
        await page.getByRole('row', { name: `Pravin Shej ${Randomemail}` }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click(); 
});

test('Verify that user cannot add a new contact with existing email address', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();

  const contactName = 'Pravin Ssss';
  const contactEmail = 'pravin+8288@nxglabs.in';
  const contactFullName = `${contactName} ${contactEmail}`;

  try {
    let contactFound = false;

    // Step 2: Check across paginated contact list for the contact
    while (!contactFound) {
      const contactRow = page.getByRole('row', { name: 'Pravin Ssss pravin+8288@' });
      if (await contactRow.isVisible().catch(() => false)) {
        const deleteButton = contactRow.getByRole('button').nth(1);
        await deleteButton.click();
        await page.getByRole('button', { name: 'Yes' }).click();
        contactFound = true;
        break;
      } else {
        const nextBtn = page.locator('//button[@class ="op-join-item op-btn op-btn-sm" and text()="Next"]'); // Adjust if your pagination control is different
        if (await nextBtn.isVisible() && !(await nextBtn.isDisabled())) {
          await nextBtn.click();
          await page.waitForLoadState('networkidle');
          if (await contactRow.isVisible().catch(() => false)) {
            const deleteButton = contactRow.getByRole('button').nth(1);
            await deleteButton.click();
            await page.getByRole('button', { name: 'Yes' }).click();
            contactFound = true;
            break;
          } 

        } else {
          break; // Reached last page
        }
      }
    }

    // Step 3: Add the contact (first time)
    await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
    await page.getByLabel('Name *').fill(contactName);
    await page.getByLabel('Email *').fill(contactEmail);
    await page.getByPlaceholder('optional').fill('0924820934');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Step 4: Try to add the same contact again (should trigger error dialog)
    await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
    await page.getByLabel('Name *').fill('ANdrews wade');
    await page.getByLabel('Email *').fill(contactEmail);
    await page.getByPlaceholder('optional').fill('0924820934');

    // Listen for the alert dialog
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toBe('Contact already exist! Please select it from \'Signers\' dropdown');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    // Close the Add Contact modal
    await page.locator('//button[contains(@class,"op-btn-circle") and text()="✕"]').click();

    // Final Cleanup - delete the contact
    let deleteSuccess = false;
    while (!deleteSuccess) {
      const row = page.getByRole('row', { name: 'Pravin Ssss pravin+8288@' });
      if (await row.isVisible().catch(() => false)) {
        await row.getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        deleteSuccess = true;
      } else {
        const nextBtn = page.locator('//button[@class ="op-join-item op-btn op-btn-sm" and text()="Next"]');
        if (await nextBtn.isVisible() && !(await nextBtn.isDisabled())) {
          await nextBtn.click();
          await page.waitForLoadState('networkidle');
        } else {
          console.log('Contact not found for final deletion.');
          break;
        }
      }
    }

  } catch (error) {
    console.error('Test encountered an error:', error);
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
  await page.locator('div:nth-child(2) > div > .fa-light').first().click();
  await page.getByRole('button', { name: 'Import' }).click();

  // Handle file chooser
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Contactbookready.xlsx'));

  // Perform Import
  await page.getByRole('button', { name: 'Import' }).click();

  // Verify and delete each contact
  const contacts = [
    { name: 'Tony Stark', email: 'tonys@nxglabs.in' },
    { name: 'Steve Head', email: 'stevehead@nxglabs.in' }
  ];

  for (const contact of contacts) {
    let contactFound = false;

    // Loop through pages until contact is found
    while (!contactFound) {
      const contactCell = page.getByRole('cell', { name: contact.name });
      if (await contactCell.isVisible().catch(() => false)) {
        // Verify contact details
        await expect(contactCell).toBeVisible();
        await expect(page.getByRole('cell', { name: contact.email })).toBeVisible();

        // Delete the contact
        const row = await page.getByRole('row', { name: new RegExp(`${contact.name}.*${contact.email}`) });
        await row.getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        contactFound = true;
      } else {
        // Check if next page button is enabled
        const nextButton = page.locator('//button[@class ="op-join-item op-btn op-btn-sm" and text()="Next"]'); // Adjust selector based on your UI
        if (await nextButton.isVisible() && !(await nextButton.isDisabled())) {
          await nextButton.click();
          await page.waitForLoadState('networkidle');
        } else {
          throw new Error(`Contact "${contact.name}" not found in the contact book.`);
        }
      }
    }
  }
});
});