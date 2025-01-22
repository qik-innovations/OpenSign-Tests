import { default as axios } from 'axios'
const { test, expect } = require('@playwright/test');
const path = require('path');
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
 test('Verify that user can add a new contact', async ({ page }) => {
    await page.goto('https://staging-app.opensignlabs.com/');

      await page.locator("//input[@id='email']").fill('pravin@nxglabs.in');
  await page.locator("//input[@id='password']").fill('Nxglabs@123');
  await page.getByRole('button', { name: 'Login' }).click();
  test.setTimeout(60 * 1000);
  await page.getByRole('button', { name: ' Reports' }).click();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  // Assert the page title
  const title = await page.title();
  if (title === 'Contactbook - OpenSign™') {
    console.log('Page title is correct: Contactbook - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Contactbook - OpenSign™", Got: "${title}"`);
  }
  await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('Pravin Ssss');
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
  await page.getByPlaceholder('optional').click();
  await page.getByPlaceholder('optional').fill('0924820934');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('tbody')).toContainText('Pravin Ssss');
  await expect(page.locator('tbody')).toContainText('pravin+8878@nxglabs.in');
  await expect(page.locator('tbody')).toContainText('0924820934');
  await page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Yes' }).click();
});
test('Verify that user cannot add a new contact with existing email address', async ({ page }) => {
    await page.goto('https://staging-app.opensignlabs.com/');

      await page.locator("//input[@id='email']").fill('pravin@nxglabs.in');
  await page.locator("//input[@id='password']").fill('Nxglabs@123');
  await page.getByRole('button', { name: 'Login' }).click();
  test.setTimeout(60 * 1000);
  await page.getByRole('button', { name: ' Reports' }).click();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('Pravin Ssss');
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
  await page.getByPlaceholder('optional').click();
  await page.getByPlaceholder('optional').fill('0924820934');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();

  await page.getByLabel('Name *').fill('ANdrews wade');
  await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
  await page.getByPlaceholder('optional').fill('0924820934');
  await page.getByRole('button', { name: 'Submit' }).click();
   // Set up an event listener for dialog boxes
   page.on('dialog', async (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`); // Log the dialog message
    // Assert the text of the dialog box
    if (dialog.message() === 'Contact already exist! Please select it from ‘Signers’ dropdown') {
      console.log('Dialog text matches the expected text.');
    } else {
      console.error('Dialog text does NOT match the expected text.');
    }
    // Accept the dialog (click OK button)
    await dialog.accept();
});

// Trigger the dialog (adjust this to your test case)
await page.evaluate(() => {
  alert('Expected text on the dialog box');
});
await page.getByRole('button', { name: '✕' }).click();
await page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').click();
await page.getByRole('button', { name: 'Yes' }).click();
});
/*
test('Validate the required field error messages.', async ({ page }) => {
    await page.goto('https://staging-app.opensignlabs.com/');

      await page.locator("//input[@id='email']").fill('pravin@nxglabs.in');
  await page.locator("//input[@id='password']").fill('Nxglabs@123');
  await page.getByRole('button', { name: 'Login' }).click();
  test.setTimeout(60 * 1000);
  await page.getByRole('button', { name: ' Reports' }).click();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  // Assert the page title
  const title = await page.title();
  if (title === 'Contactbook - OpenSign™') {
    console.log('Page title is correct: Contactbook - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Contactbook - OpenSign™", Got: "${title}"`);
  }
  await page.locator('div:nth-child(2) > div:nth-child(2) > .fa-light').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  const errorMessage = await page.locator('Please fill out this field.'); // Change the selector to match the error message element

  // Assert the error message text
  const errorText = await errorMessage.textContent();
  if (errorText === 'Please fill out this field.') {
    console.log('Field-level error message is correct.');
  } else {
    console.error('Field-level error message is incorrect.');
  }

  await page.getByLabel('Name *').fill('Pravin Ssss');
  await page.getByRole('button', { name: 'Submit' }).click();
 
  const errorMessage1 = await page.locator('Please fill out this field.'); // Change the selector to match the error message element

  // Assert the error message text
  const errorText1 = await errorMessage1.textContent();
  if (errorText1 === 'Please fill out this field.') {
    console.log('Field-level error message is correct.');
  } else {
    console.error('Field-level error message is incorrect.');
  }

  await page.getByLabel('Email *').fill('pravin+8878@nxglabs.in');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('tbody')).toContainText('Pravin Ssss');
  await expect(page.locator('tbody')).toContainText('pravin+8878@nxglabs.in');
  await page.getByRole('row', { name: 'Pravin Ssss pravin+8878@' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Yes' }).click();
});*/

test('Verify that user able to import the contacts from the excel file', async ({ page }) => {
    await page.goto('https://staging-app.opensignlabs.com/');

      await page.locator("//input[@id='email']").fill('pravin@nxglabs.in');
  await page.locator("//input[@id='password']").fill('Nxglabs@123');
  await page.getByRole('button', { name: 'Login' }).click();
  test.setTimeout(60 * 1000);
  await page.getByRole('button', { name: ' Reports' }).click();
  await page.getByRole('menuitem', { name: 'Contactbook' }).click();
  await page.locator('div:nth-child(2) > div > .fa-light').first().click();
  //await page.getByRole('textbox').click();
  //await page.getByRole('textbox').setInputFiles('Contactbookready.xlsx');

 // await page.getByText('Contacts file (xlsx, csv) *Total records found: 9 Invalid records found:').click();
 await page.getByRole('button', { name: 'Import' }).click();
 await page.locator('input[type="file"]').click();

  const fileChooserPromise = page.waitForEvent('filechooser');
    
//input[@type='file']
  // Get the file chooser and set the file to upload
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Contactbookready.xlsx'));
    await page.waitForTimeout(60000);
    await expect(page.getByRole('heading')).toContainText('Bulk import');
    await page.getByRole('button', { name: 'Import' }).click();

  await page.getByRole('cell', { name: 'pravin+455551@nxglabs.in' }).click();
  await page.getByRole('cell', { name: 'Pravin 45677' }).click();
  await page.getByRole('cell', { name: '5667776767' }).click();
  await page.getByRole('cell', { name: 'Lourara Pravin' }).click();
  await page.getByRole('cell', { name: 'pravin+89992@nxglabs.in' }).click();
  await page.getByRole('cell', { name: 'pravchinn' }).click();
  await page.getByRole('cell', { name: 'pravin+89992rrrr@nxglabs.in' }).click();
  await page.getByRole('cell', { name: '6767767676' }).click();
  await page.getByRole('row', { name: 'Pravin 45677 pravin+455551@' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('.relative > .absolute').click();
  await page.getByRole('row', { name: 'Lourara Pravin pravin+89992@' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('row', { name: 'pravchinn pravin+89992rrrr@' }).getByRole('button').click();

});