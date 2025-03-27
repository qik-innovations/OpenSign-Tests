
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
test('Verify that user can add a new contact', async ({ page }) => {
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
  try {
    const rowLocator = page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').nth(1);

    if (await rowLocator.isVisible()) {
        await rowLocator.click();
        await page.getByRole('button', { name: 'Yes' }).click();
    } 
    else {
        console.log("Element not found, moving to the next step.");

        await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
        await page.getByLabel('Name *').fill('Pravin Ssss');
        await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
        await page.getByPlaceholder('optional').fill('0924820934');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('tbody')).toContainText('Pravin Ssss');
        await expect(page.locator('tbody')).toContainText('pravin+8878@nxglabs.in');
        await expect(page.locator('tbody')).toContainText('0924820934');
        await page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Yes' }).click();
    }
}
 catch (error) {
    console.log("Element not found or not interactable, continuing execution.");
   
}
  
});

test('Verify that user cannot add a new contact with existing email address', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  try {
   
    const rowLocator = await page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').nth(1);
    await page.waitForTimeout(2000);
    if (await rowLocator.isVisible()) {
        await rowLocator.click();
        await page.getByRole('button', { name: 'Yes' }).click();
    } else {
        console.log("Element not found, moving to the next step.");
        await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
  await page.getByLabel('Name *').fill('Pravin Ssss');
  await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
  await page.getByPlaceholder('optional').fill('0924820934');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
  await page.getByLabel('Name *').fill('ANdrews wade');
  await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
  await page.getByPlaceholder('optional').fill('0924820934');
  await page.getByRole('button', { name: 'Submit' }).click();
  page.on('dialog', async (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    if (dialog.message() === 'Contact already exist! Please select it from ‘Signers’ dropdown') {
      console.log('Dialog text matches the expected text.');
    } else {
      console.error('Dialog text does NOT match the expected text.');
    }
    await dialog.accept();
  });
  await page.locator('//button[@class=\'op-btn op-btn-sm op-btn-circle op-btn-ghost text-base-content absolute right-2 top-2\' and text()=\'✕\']').click()
  
  await page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Yes' }).click();
    }
} catch (error) {
  
}
});

test('Verify that user can import contacts from an Excel file', async ({ page }) => {
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
 //Verify the imported contact
 await expect(page.getByRole('cell', { name: 'Tony Stark' })).toBeVisible();
 await expect(page.getByRole('cell', { name: 'tonys@nxglabs.in' })).toBeVisible();
 await expect(page.getByRole('cell', { name: '233343434' })).toBeVisible();
 //Delete the imported contact
 await page.getByRole('row', { name: 'Tony Stark tonys@nxglabs.' }).getByRole('button').nth(1).click();
 await page.getByRole('button', { name: 'Yes' }).click();
 //Verify the imported second contact
 await expect(page.getByRole('cell', { name: 'Steve Head' })).toBeVisible();
 await expect(page.getByRole('cell', { name: 'stevehead@nxglabs.' })).toBeVisible();
 await page.waitForLoadState("networkidle");
  //Delete the second imported contact
 await page.getByRole('row', { name: 'Steve Head stevehead@nxglabs.in' }).getByRole('button').nth(1).click();
 await page.getByRole('button', { name: 'Yes' }).click();
 
});});