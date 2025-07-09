
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
        await page.getByPlaceholder('optional').fill('0924820934');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.locator("//input[@placeholder='Search contacts…']").fill("Pravin Shej");
        await expect(page.locator('tbody')).toContainText(Randomemail);
        await expect(page.locator('tbody')).toContainText('0924820934');
        console.log(`P Shej ${Randomemail}`);
        await page.getByRole('row', { name: `Pravin Shej ${Randomemail}` }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click(); 
});

test('Verify that user cannot add a new contact with existing email address', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  const contactName = 'Pravin Ssss';
  const contactEmail = 'pravin+8288@nxglabs.in';
  const contactFullName = `${contactName} ${contactEmail}`;
 /// getByRole('row', { name: 'Pravin Ssss pravin+hr@gmail.com' }).getByRole('button').nth(1)
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  await page.waitForTimeout(5000); // Wait for contacts page to load

  const deleteContactIfExists = async () => {
    let contactFound = false;
    let maxPages = 5; // Set a reasonable limit to avoid infinite loop

    for (let i = 0; i < maxPages; i++) {
      const row = page.getByRole('row', { name: `${contactName} ${contactEmail.split('@')[0]}`});
      console.log(`${contactName} ${contactEmail.split('@')[0]}`);
      if (await row.isVisible().catch(() => false)) {
        await row.getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.waitForTimeout(4000); // Wait for deletion to complete
        contactFound = true;
        break;
      }

      const nextBtn = page.locator('//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]');
      if (await nextBtn.isVisible() && !(await nextBtn.isDisabled())) {
        await nextBtn.click();
        await page.waitForLoadState('networkidle');
      } else {
        break;
      }
    }

    return contactFound;
  };

  try {
    // Delete existing contact if it exists
    await deleteContactIfExists();

    // Add the contact first time
    await page.locator("//div[contains(@class, 'cursor-pointer') and contains(@class, 'flex') and .//i[contains(@class, 'fa-square-plus')]]").click();
    await page.getByLabel('Name *').fill(contactName);
    await page.getByLabel('Email *').fill(contactEmail);
    await page.getByPlaceholder('optional').fill('0924820934');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(1000); // Wait for creation

    // Attempt to add the same email again
    await page.locator("//div[contains(@class, 'cursor-pointer') and contains(@class, 'flex') and .//i[contains(@class, 'fa-square-plus')]]").click();
    await page.getByLabel('Name *').fill('Andrews Wade');
    await page.getByLabel('Email *').fill(contactEmail);
    await page.getByPlaceholder('optional').fill('0924820934');

    // Set up dialog handler BEFORE triggering the action
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe("Contact already exist! Please select it from 'Signers' dropdown");
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    // Close Add Contact modal
    await page.locator('//button[contains(@class,"op-btn-circle") and text()="✕"]').click();
 // Wait for modal to close
    // Cleanup
    await deleteContactIfExists();

  } catch (error) {
    console.error('Test encountered an error:', error);
    throw error; // Re-throw for test failure
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
  await page.getByRole('button', { name: 'Import' }).click();
await page.waitForTimeout(5000);
  // Contacts to verify and delete
  const contacts = [
    { name: 'Tony Stark', email: 'tonys@nxglabs.in' },
    { name: 'Steve Head', email: 'stevehead@nxglabs.in' }
  ];

  for (const contact of contacts) {
    let contactFound = false;
    // Loop through pages until contact is found
    while (!contactFound) {
      const contactCell = page.getByRole('cell', { name: contact.name });
await page.waitForTimeout(2000);
      if (await contactCell.isVisible().catch(() => false)) {
        // Step: Verify contact name is visible
        await expect(contactCell).toBeVisible({ timeout: 5000 });
        // Step: Verify contact email is visible
        await expect(
          page.getByRole('cell', { name: contact.email })).toBeVisible({ timeout: 5000 });

        // Step: Delete the contact
        const row = await page.getByRole('row', { name: new RegExp(`${contact.name}.*${contact.email}`)
        });
        await row.getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        contactFound = true;
      } else {
        // Try to go to the next page
        const nextButton = page.locator('//button[@class ="op-join-item op-btn op-btn-sm" and text()="Next"]');
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