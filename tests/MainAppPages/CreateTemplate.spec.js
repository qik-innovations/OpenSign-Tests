const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const path = require('path');
test.describe('Templates', () => {
test('Verify that a new free user cannot access the paid features on the create template and edit template page.', async ({ page }) => {
  
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  await page.locator('input[type="text"]').first().fill('Mathew Wade');
  //here we are creating the random email id
  let x = "pravin+" + Math.random() + "@nxglabs.in"
  await page.locator('#email').fill(x);
  await page.locator('input[type="tel"]').fill('8238988998');
  await page.locator('input[type="text"]').nth(1).fill('qikAi.com');
  await page.locator('input[type="text"]').nth(2).fill('Hr Execative');
  await page.locator('input[name="password"]').fill('Nxglabs@123');
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 90000 });
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    await page.getByLabel('Close').click();
    // Expects page to have a heading with the name of dashboard.
    const title = await page.title()
       expect(title).toBe('Dashboard - OpenSign™');
 await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.getByText('Advanced options').click();
  const checkbox = page.locator('//input[@type="checkbox" and @class="op-toggle transition-all checked:[--tglbg:#3368ff] checked:bg-white"]');
const isDisabled = await checkbox.isDisabled();
console.log("Checkbox disabled:", isDisabled);
const radioButton = page.locator('//input[@type="radio" and @name="IsEnableOTP" and @value="true"]');
const EnableotpisDisabled = await radioButton.isDisabled();
console.log("Radio button disabled:", EnableotpisDisabled);
const radioButtonNo = page.locator('//input[@type="radio" and @name="IsEnableOTP" and @value="false"]');
const EnableotpisDisabled_No = await radioButtonNo.isDisabled();
console.log("Radio button disabled:", EnableotpisDisabled_No);

const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.locator('span').filter({ hasText: 'Auto reminder Upgrade now' }).locator('span').click()
]);

await popup.waitForLoadState();
await popup.goto('https://staging-app.opensignlabs.com/subscription');
await expect(popup.locator('#root')).toContainText('OPENSIGN™ FREE');
await page.bringToFront();
  
  await page.locator('span').filter({ hasText: 'Enable OTP verification' }).locator('span').click();
  const page2Promise = page.waitForEvent('popup');
  const page2 = await page2Promise;
  await expect(page2.locator('#root')).toContainText('OPENSIGN™ FREE', { timeout: 90000 });
  await page.bringToFront();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: '', exact: true }).click();
  const checkboxSetting = page.locator('//input[@type="checkbox" and @class="op-toggle transition-all checked:[--tglbg:#3368ff] checked:bg-white mt-2"]');
const isDisabledSetting  = await checkboxSetting.isDisabled();
console.log("Checkbox disabledon Edit template details:", isDisabledSetting);
const radioButtonSetting = page.locator('//input[@type="radio" and @name="IsEnableOTP" and @value="true"]');
const EnableotpisDisabledSetting = await radioButtonSetting.isDisabled();
console.log("Radio button disabled on Edit template details:", EnableotpisDisabledSetting);
const radioButtonNoSetting = page.locator('//input[@type="radio" and @name="IsEnableOTP" and @value="false"]');
const EnableotpisDisabled_NoSetting = await radioButtonNoSetting.isDisabled();
console.log("Radio button disabled on Edit template details:", EnableotpisDisabled_NoSetting);
  await expect(page.locator('form')).toContainText('Auto reminder Upgrade now');
  await expect(page.getByText('YesNo').nth(1)).toBeVisible();
  await expect(page.locator('form')).toContainText('Enable OTP verification Upgrade now');
  await expect(page.getByText('YesNo').nth(2)).toBeVisible();
  await expect(page.locator('form')).toContainText('Upgrade now');
  await expect(page.getByText('YesNo').nth(4)).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();

});
test('Verify that a new user can create a template and use it to create the document for selfsign', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  await page.locator('input[type="text"]').first().fill('Mathew Wade');
  //here we are creating the random email id
  let x = "pravin+" + Math.random() + "@nxglabs.in"
  await page.locator('#email').fill(x);
  await page.locator('input[type="tel"]').fill('8238988998');
  await page.locator('input[type="text"]').nth(1).fill('qikAi.com');
  await page.locator('input[type="text"]').nth(2).fill('Hr Execative');
  await page.locator('input[name="password"]').fill('Nxglabs@123');
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 90000 });
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    await page.getByLabel('Close').click();
    // Expects page to have a heading with the name of dashboard.
    const title = await page.title()
       expect(title).toBe('Dashboard - OpenSign™');
  await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('dialog')).toContainText("Clicking 'Add role' button will allow you to add various signer roles. You can attach users to each role in subsequent steps.", { timeout: 120000 });
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Once roles are added, select a role from list to add a place-holder where he is supposed to sign. The placeholder will appear in the same colour as the role name once you drop it on the document.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Drag or click on a field to add it to the document.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Drag the placeholder for a role anywhere on the document.Remember, it will appear in the same colour as the name of the recipient for easy reference.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
 // await expect(page.getByRole('dialog')).toContainText('Clicking \'Next\' will store the current template. After saving, you’ll be prompted to create a new document from this template if you wish.');
  await page.getByLabel('Don\'t show this again').check();
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
   await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();

await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();

await page.mouse.move(600, 490)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();

await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(800, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Create document' }).click();
  await page.locator('.css-n9qnu9').first().click();
  await page.locator('#selectSignerModal').getByText('HR').click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^HR$/ }).getByRole('button').click();
  await page.getByLabel('Add yourself').check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: ' Next' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
 // await expect(page.locator('#selectSignerModal')).toContainText('You have successfully sent email to Kelvin. Subsequent signers will get email(s) once Kelvin signs the document');
    await page.getByRole('button', { name: 'Yes' }).click();
    await commonSteps.validateAndAcceptTerms();
    await page.waitForLoadState("networkidle");
    await page.getByLabel('Don\'t show this again').check();
  await page.getByLabel('Close').click();
    await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
    await page.locator('//div[contains(text(),"signature")]').click();
   await commonSteps.drawSignature();
   await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.uploadStamp();
  await commonSteps.clickNextButtonInSignerModal();
await commonSteps.drawInitials();
  await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.fillTextField('name','Mathew Steven');
      await commonSteps.clickNextButtonInSignerModal();
        await commonSteps.fillTextField('job title','Quality Analyst');
      await commonSteps.clickNextButtonInSignerModal();
        await commonSteps.fillTextField('company','Opensignlabs pvt. ltd');
      await commonSteps.clickNextButtonInSignerModal();
      await commonSteps.clickNextButtonInSignerModal();
        await commonSteps.fillTextField('text input','120 wood street sanfransisco');
      await commonSteps.clickNextButtonInSignerModal();
      await commonSteps.selectCheckbox('Option-1');
      await commonSteps.clickNextButtonInSignerModal();
     await commonSteps.uploadImage();
      await commonSteps.clickNextButtonInSignerModal();
     await commonSteps.fillEmailField('demo@gmail.com','mathewsteven@opensignlabs.com');
    await commonSteps.clickDoneButtonInSignerModal();
     await commonSteps.clickFinishButtonInSignerModal();
    await expect(page.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
    await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Print' })).toBeVisible();
    await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Certificate' })).toBeVisible();
    await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Download' })).toBeVisible();
    await page.getByRole('button', { name: '✕' }).click();
});
test('Verify that a new free user is unable to send the document through bulk send and is prompted to upgrade.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
  await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
   await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up()
try {
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
      
          console.log("signature widget dragged and dropped");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 300);
          await page.mouse.up();
          
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("signature widget did not become visible on the document after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await page.getByRole('button', { name: '+ Add role' }).click();
await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 2"]').fill('Manager');
await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
 await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up()
try {
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
      
          console.log("signature widget dragged and dropped");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 300);
          await page.mouse.up();
          
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("signature widget did not become visible on the document after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Bulk send' }).click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^HR$/ }).getByPlaceholder('Enter Email...').click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^HR$/ }).getByPlaceholder('Enter Email...').fill('pravin+677@nxglabs.in');
  await page.locator('#selectSignerModal div').filter({ hasText: /^Manager$/ }).getByPlaceholder('Enter Email...').click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^Manager$/ }).getByPlaceholder('Enter Email...').fill('pravin+689@nxglabs.in');
  await page.getByRole('button', { name: ' Send' }).click();
  await expect(page.locator('#selectSignerModal')).toContainText('Please upgrade to Professional or Team plan to use bulk send.');
  await expect(page.locator('#selectSignerModal')).toContainText('Upgrade now');
  await page.locator('#selectSignerModal').getByRole('button', { name: 'Upgrade now' }).click();
});
test('Verify that an existing Team Plan user can create a template using all advanced fields in the Create New Template form.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
 await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator("//input[@name='SendinOrder' and @value='false']").click();
  await page.getByText('Advanced options').click();
  await page.locator('input[name="TimeToCompleteDays"]').fill('2');
  await page.locator('.css-n9qnu9').click();
  await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
  await page.locator('input[name="IsEnableOTP"]').nth(1).check();
 // await page.locator('input[name="IsTourEnabled"]').nth(1).check();
  //await page.locator('div').filter({ hasText: /^Notify on signaturesYesNo$/ }).getByRole('radio').nth(1).check();
  //await page.locator('div:nth-child(5) > div > div > .mr-\\[2px\\]').first().check();
  
  await page.locator('input[name="RedirectUrl"]').fill('https://staging-app.opensignlabs.com/');
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: '', exact: true }).click();
  await expect(page.locator('input[name="Name"]')).toHaveValue('Sample-joining-letter');
  await expect(page.getByLabel('Note')).toHaveValue('Please review and sign this document');
 // await expect(page.locator('input[name="SendinOrder"]').nth(1)).toBeChecked();
 //await expect(page.locator('input[name="IsEnableOTP"]').first()).toBeChecked();
 // await expect(page.locator('input[name="IsTourEnabled"]').first()).not.toBeChecked();
  //await expect(page.locator('input[name="IsTourEnabled"]').nth(1)).toBeChecked();
 // await page.locator('div').filter({ hasText: /^Notify on signatures YesNo$/ }).getByRole('radio').nth(1).check();
  await expect(page.locator('input[name="RedirectUrl"]')).toHaveValue('https://staging-app.opensignlabs.com/');
  await expect(page.locator('input[name="TimeToCompleteDays"]')).toHaveValue('2');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
   await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
      
          console.log("signature widget dragged and dropped");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 300);
          await page.mouse.up();
          
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("signature widget did not become visible on the document after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await page.waitForLoadState("networkidle");
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: '✕' }).click();
  await expect(page.locator('tbody')).toContainText('Sample-joining-letter');
  await expect(page.locator('tbody')).toContainText('Download');
  await expect(page.locator('tbody')).toContainText('Pravin Testing account');
  await page.getByRole('button', { name: 'View' }).first().click();
  await expect(page.locator('#selectSignerModal')).toContainText('Roles');
  await expect(page.locator('#selectSignerModal')).toContainText('Email');
  await page.getByRole('button', { name: '✕' }).click();

});
test('Verify that a Team Plan user can create a template, make it public, and sign the document through the public template.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
     await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
   await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.locator('//span[normalize-space()=\'signature\']').hover();
  await page.mouse.down();
  await page.mouse.move(600, 300)
  await page.mouse.up();
  try {
    const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');
  
    for (let i = 0; i < 5; i++) { // Retry up to 5 times
        if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        
            console.log("signature widget dragged and dropped");
            break; // Exit the loop if successfully clicked
        } else {
            console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
    
            await page.locator('//span[normalize-space()="signature"]').hover();
            await page.mouse.down();
            await page.mouse.move(600, 300);
            await page.mouse.up();
            
            // Wait a bit before checking again
            await page.waitForTimeout(1000);
        }
    
        if (i === 5) {
            console.log("signature widget did not become visible on the document after multiple attempts.");
        }
    }
  } catch (error) {
    console.log("Element not found or not interactable, continuing execution.");
   
  }
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Copy public URL' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'https://staging-app.' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Sign now' }).click();
  await page1.locator('#name').click();
  await page1.locator('#name').fill('Andrews Mark');
  await page1.locator('input[name="email"]').click();
  await page1.locator('input[name="email"]').fill('pravin+andrews@nxglabs.in');
  await page1.getByRole('textbox', { name: 'optional' }).click();
  await page1.getByRole('textbox', { name: 'optional' }).fill('7657567566');
  await page1.getByRole('button', { name: 'Submit' }).click();
  const commonStepspage1 = new CommonSteps(page1);
  await commonStepspage1.validateAndAcceptTerms();
  await page1.getByText('signature').click();
   await commonStepspage1.drawSignature();
  await commonStepspage1.clickDoneButtonInSignerModal();
  await commonStepspage1.clickFinishButtonInSignerModal();
  await expect(page1.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 120000 });
  await expect(page1.locator('#selectSignerModal')).toContainText('Print');

});
test('Verify that the signature settings function correctly for the signature widget on the create template.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
 await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForTimeout(20000);
await page.getByRole('button', { name: '+ Add role' }).click();
  await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
      
          console.log("signature widget dragged and dropped");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 300);
          await page.mouse.up();
          
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("signature widget did not become visible on the document after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first().uncheck();
  await page.getByRole('textbox').fill('Signature Draw removed');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator("//div[@class='flex items-stretch justify-center']//div[text()='Signature Draw removed']").click();
  await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first()).not.toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('Signature Draw removed');
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1).uncheck();
    await page.getByRole('textbox').fill('Signature type removed');
  await page.getByRole('button', { name: 'Save' }).click();
    await page.locator("//div[@class='flex items-stretch justify-center']//div[text()='Signature type removed']").click();
await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1)).not.toBeChecked();
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(2).uncheck();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(2).check();
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(3).uncheck();
  await page.getByRole('textbox').fill('only upload type enabled');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator("//div[@class='flex items-stretch justify-center']//div[text()='only upload type enabled']").click();
 await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first()).not.toBeChecked();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1)).not.toBeChecked();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(3)).not.toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('only upload type enabled');
}); 
test('Verify that the merge page functions correctly and the user can sign the merged document in the crerate template.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
   await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await expect(page.locator('#renderList')).toContainText('1 of 1');
  await page.locator('#container div').first().click();
  const fileChooserPromise2 = page.waitForEvent('filechooser');
  await page.getByTitle('Add pages').nth(1).click();
  const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
  await expect(page.locator('#renderList')).toContainText('1 of 4');
  await page.locator('canvas').nth(1).click({
    position: {
      x: 69,
      y: 42
    }
  });
  await page.locator('canvas').nth(2).click({
    position: {
      x: 47,
      y: 53
    }
  });
  await page.locator('canvas').nth(3).click({
    position: {
      x: 65,
      y: 49
    }
  });

  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.locator('//span[normalize-space()=\'signature\']').hover();
  await page.mouse.down();
  await page.mouse.move(600, 200)
  await page.mouse.up();
  try {
    const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');
  
    for (let i = 0; i < 5; i++) { // Retry up to 5 times
        if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        
            console.log("signature widget dragged and dropped");
            break; // Exit the loop if successfully clicked
        } else {
            console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
    
            await page.locator('//span[normalize-space()="signature"]').hover();
            await page.mouse.down();
            await page.mouse.move(600, 200);
            await page.mouse.up();
            
            // Wait a bit before checking again
            await page.waitForTimeout(1000);
        }
    
        if (i === 5) {
            console.log("signature widget did not become visible on the document after multiple attempts.");
        }
    }
  } catch (error) {
    console.log("Element not found or not interactable, continuing execution.");
   
  }
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 250)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();

await page.mouse.move(600, 340)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();

await page.mouse.move(600, 370)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();

await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 430)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 450)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 480)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 510)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 540)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
 // await expect(page.locator('//h3[text()="Create document"]')).toContainText('Create document');
 await page.locator('//button[text()="Create document" and @class= "op-btn op-btn-sm op-btn-primary"]').click();
  await page.locator('.css-n9qnu9').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await page.getByRole('button', { name: ' Next' }).click();
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that the delete page functions correctly in create template.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
 await page.getByRole('button', { name: ' Templates' }).click();
await page.getByRole('menuitem', { name: 'Create template' }).click();
await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await expect(page.locator('#renderList')).toContainText('1 of 3');
  await page.locator('#container div').first().click();
  await page.getByTitle('Delete page').locator('i').click();
  await expect(page.getByRole('heading')).toContainText('Delete page');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to delete this page?');
  await expect(page.locator('#selectSignerModal')).toContainText('Note: Once you delete this page, you cannot undo.');
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('#renderList')).toContainText('1 of 2');

});
test('Verify that the rotate page functions correctly in create template.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
 await page.getByRole('button', { name: ' Templates' }).click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await expect(page.locator('#renderList')).toContainText('1 of 3');
   await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 35
    }
  });
  await page.getByTitle('Rotate right').locator('i').click();
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +      
    - button
    - text: 2 of 3
    - button
    - button ""
    - button "Back"
    - button "Next"
    - text: Roles
    - superscript: "?"
    - button "+ Add role"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text input   cells   checkbox   dropdown   radio button   image   email 
    `);
  await page.getByTitle('Rotate right').locator('i').click();
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +      
    - button
    - text: 2 of 3
    - button
    - button ""
    - button "Back"
    - button "Next"
    - text: Roles
    - superscript: "?"
    - button "+ Add role"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text input   cells   checkbox   dropdown   radio button   image   email 
    `);
  await page.locator('canvas').nth(2).click({
    position: {
      x: 52,
      y: 74
    }
  });
  await page.getByTitle('Rotate left').locator('i').click();
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +      
    - button
    - text: 3 of 3
    - button [disabled]
    - button ""
    - button "Back"
    - button "Next"
    - text: Roles
    - superscript: "?"
    - button "+ Add role"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text input   cells   checkbox   dropdown   radio button   image   email 
    `);
    await page.getByRole('button', { name: '+ Add role' }).click();
    await page.locator('//form[@class="flex flex-col"]//input[@placeholder="Role 1"]').fill('HR');
    await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
    await page.locator('//span[normalize-space()=\'signature\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 200)
    await page.mouse.up();
    try {
      const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');
    
      for (let i = 0; i < 5; i++) { // Retry up to 5 times
          if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          
              console.log("signature widget dragged and dropped");
              break; // Exit the loop if successfully clicked
          } else {
              console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
      
              await page.locator('//span[normalize-space()="signature"]').hover();
              await page.mouse.down();
              await page.mouse.move(600, 200);
              await page.mouse.up();
              
              // Wait a bit before checking again
              await page.waitForTimeout(1000);
          }
      
          if (i === 5) {
              console.log("signature widget did not become visible on the document after multiple attempts.");
          }
      }
    } catch (error) {
      console.log("Element not found or not interactable, continuing execution.");
     
    }
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(700, 200)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(800, 200)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 260)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(700, 260)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(800, 260)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 290)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(700, 290)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(800, 290)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 350)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(700, 350)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('//h3[text()="Create document"]')).toContainText('Create document');
  await page.getByRole('button', { name: 'Create document' }).click();
  await page.locator('.css-n9qnu9').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await page.getByRole('button', { name: ' Next' }).click();
});});