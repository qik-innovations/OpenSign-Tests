const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const PageActions = require('../utils/PageActions');
const path = require('path');
const exp = require('constants');
test.describe('Request signature', () => {
test('Verify that new user can create and send the document for request signature.', async ({ page }) => {
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
  await page.locator('input[type="text"]').nth(2).fill('HrExecative');
  await page.locator('input[name="password"]').fill('Nxglabs@123');
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible();
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    await page.getByLabel('Close').click();
    // Expects page to have a heading with the name of dashboard.
    const title = await page.title()
       expect(title).toBe('Dashboard - OpenSign™');
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('form i').nth(2).click();
  await page.getByLabel('Name *').fill('Karl Mark');
  await page.getByLabel('Email *').fill('karlmark1954@gmail.com');
  await page.getByPlaceholder('optional').fill('768768768766');
  await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
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

await page.mouse.move(600, 480)
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
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();

await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await page.getByRole('button', { name: 'Close' }).click();
await expect(page.locator('#renderList')).toContainText('In-progress documents');

});
test('Verify that user can create a document of type image and send it for a signature request.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/1Sample-Offer_letter.png'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await page.locator('input[name="Name"]').click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
await page.mouse.move(600, 480)
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
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await page.getByRole('button', { name: 'Close' }).click();
await expect(page.locator('#renderList')).toContainText('In-progress documents');

});
test('Verify that an existing user can create a document and sign it when added as a self-signer.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
  await page.locator('input[name="Name"]').click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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

await page.mouse.move(600, 500)
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
await page.mouse.move(600, 600)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(800, 300)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(800, 350)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(800, 400)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();

await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('Mails Sent✕Subsequent signers will get email(s) once you signs the document.Do you want to sign the document right now?YesNoHow was your experience with OpenSign™?😡0-3😐4-6😊7-8😍9-10Submit');
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('//div[@class="flex flex-row items-center"]//input[@type="checkbox" and @data-tut="IsAgree"]').click();
  await page.getByRole('button', { name: 'Agree & Continue' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//div[contains(text(),"signature")]').click();
  await page.mouse.down();
  await page.mouse.move(120, 122)
  await page.mouse.up();
  // Optionally save changes
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"stamp")]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"itials")]').click();
await page.mouse.move(650, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
/*await page.getByPlaceholder('name').fill('Mark Anderson');
  await page.getByPlaceholder('job title').click();
  await page.getByPlaceholder('job title').fill('Quality analyst');
  await page.getByPlaceholder('company').click();
  await page.getByPlaceholder('company').fill('Oepnsign labs pvt. ltd');*/
  await page.getByPlaceholder('text').fill('120 wood street sanfransisco');
  await page.locator('#myDropdown').selectOption('option-2');
 await page.getByRole('radio', { name: 'option-1' }).check();
  await page.getByRole('checkbox', { name: 'option-1' }).check();
  await page.locator('//div[contains(text(),"image")]').click();
  const fileChooserPromise2 = page.waitForEvent('filechooser');
  await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
  const fileChooser2 = await fileChooserPromise2;
  await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
  await page.locator("//button[normalize-space()='Save']").click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Print' })).toBeVisible();
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Certificate' })).toBeVisible();
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Download' })).toBeVisible();
  await page.getByRole('button', { name: '✕' }).click();
});
test('Verify that a user can create a document, send it for a signature request, and signer can successfully sign the document.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablenameID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='name']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 500)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablejobtitleID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='job title']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablecompanyID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='company']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariabletextinputID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='text input']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 600)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(800, 300)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(900, 300)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(800, 520)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariableemailID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='email']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();
await page1.mouse.move(600, 350)
await page1.mouse.down();
await page1.mouse.move(600, 350)
await page1.mouse.move(600, 400)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator('//div[@id="container"]//div[text()="stamp"]').click();
const fileChooserPromise1 = page1.waitForEvent('filechooser');
await page1.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator('//div[@id="container"]//div[text()="initials"]').click();
await page1.mouse.move(650, 350)
await page1.mouse.down();
await page1.mouse.move(700, 380)
await page1.mouse.up();
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablenameID}']//textarea[1]`).fill('Mark Anderson');
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablejobtitleID}']//textarea[1]`).fill('Quality analyst');
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablecompanyID}']//textarea[1]`).fill('OpenSign pvt. ltd');
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariabletextinputID}']//textarea[1]`).fill('120 wood street sanfransisco');
await page1.locator('#myDropdown').selectOption('option-2');
await page1.getByRole('radio', { name: 'option-1' }).check();
await page1.getByRole('checkbox', { name: 'option-1' }).check();
await page1.locator('//div[contains(text(),"image")]').click();
const fileChooserPromise2 = page1.waitForEvent('filechooser');
await page1.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariableemailID}']//textarea[1]`).fill('anderson@oepnsignlabs.com');
await page1.getByRole('button', { name: 'Finish' }).click();

await expect(page1.locator('//h1[text()="The document has been signed successfully!"]')).toContainText('The document has been signed successfully!',{ timeout: 90000 });
/*await page1.getByRole('button', { name: 'Print' }).click();
const downloadPromise = page1.waitForEvent('download');
await page1.getByRole('button', { name: 'Certificate' }).click();
const download = await downloadPromise;
await page1.getByRole('button', { name: 'Download' }).click();
  const download1Promise = page1.waitForEvent('download');
  await page1.locator('#selectSignerModal').getByRole('button', { name: 'Download' }).click();
  const download1 = await download1Promise;
  await page1.getByRole('button', { name: 'Download' }).click();
  await page1.getByText('Download pdf + Certificate').click();
  const download2Promise = page1.waitForEvent('download');
  await page1.locator('#selectSignerModal').getByRole('button', { name: 'Download' }).click();
  const download2 = await download2Promise;
  const download3Promise = page1.waitForEvent('download');*/
});
test('Verify that a user can create a document with two signers, send it for a signature request, and signer can successfully sign the document.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablenameID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='name']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 500)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablejobtitleID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='job title']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablecompanyID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='company']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariabletextinputID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='text input']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 600)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(800, 300)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(800, 500)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(800, 470)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariableemailID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='email']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});

await page.locator('canvas').nth(1).click({
  position: {
    x: 50,
    y: 52
  }
});
await page.getByRole('button', { name: '+ Add recipients' }).click();
await page.locator('//div[@class="css-b62m3t-container"]').click();
await page.locator('//div[@class="css-b62m3t-container"]//input').fill('tr');
await page.getByRole('option', { name: 'Travis Mathew<pravin+travis@' }).click();
await page.getByRole('button', { name: 'Submit' }).click();
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
//here we are copying the widget id to use while signing the document through the guest signatrue flow
const Signer1VariablenameID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='name']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 500)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariablejobtitleID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='job title']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariablecompanyID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='company']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariabletextinputID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='text input']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 600)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(800, 300)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(800, 500)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(800, 470)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariableemailID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='email']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
//await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
await page.locator('div').filter({ hasText: /^andyamaya@nxglabs\.inCopy link$/ }).getByRole('button').click();
const copiedUrl1 = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
//await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
await page.locator('div').filter({ hasText: /^pravin\+travis@nxglabs\.inCopy link$/ }).getByRole('button').click();
const copiedUrl2 = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl1);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();
await page1.mouse.move(600, 350)
await page1.mouse.down();
await page1.mouse.move(600, 350)
await page1.mouse.move(600, 400)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator('//div[@id="container"]//div[text()="stamp"]').click();
const fileChooserPromise1 = page1.waitForEvent('filechooser');
await page1.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator('//div[@id="container"]//div[text()="initials"]').click();
await page1.mouse.move(650, 350)
await page1.mouse.down();
await page1.mouse.move(700, 380)
await page1.mouse.up();
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablenameID}']//textarea[1]`).fill('Mark Anderson');
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablejobtitleID}']//textarea[1]`).fill('Quality analyst');
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablecompanyID}']//textarea[1]`).fill('OpenSign pvt. ltd');
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariabletextinputID}']//textarea[1]`).fill('120 wood street sanfransisco');
await page1.locator('#myDropdown').selectOption('option-2');
await page1.getByRole('radio', { name: 'option-1' }).check();
await page1.getByRole('checkbox', { name: 'option-1' }).check();
await page1.locator('//div[contains(text(),"image")]').click();
const fileChooserPromise2 = page1.waitForEvent('filechooser');
await page1.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page1.locator("//button[normalize-space()='Save']").click();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariableemailID}']//textarea[1]`).fill('anderson@oepnsignlabs.com');
await page1.getByRole('button', { name: 'Finish' }).click();
await page1.getByText('The document has been successfully signed by you!').click();
const page2 = await page.context().newPage();
await page2.goto(copiedUrl2);
await page2.waitForLoadState("networkidle");
await page2.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page2.getByRole('button', { name: 'Agree & Continue' }).click();
//await expect(page2.getByRole('paragraph')).toContainText('List of signers who have already signed the document .');
//await page2.locator('.sc-gsFSXq > button:nth-child(3)').click();
//await expect(page2.getByRole('paragraph')).toContainText('Click any of the placeholders appearing on the document to sign. You will then see options to draw your signature, type it, or upload an image .');
//await page2.locator('.sc-gsFSXq > button:nth-child(3)').click();
//await expect(page2.getByRole('paragraph')).toContainText('Click Decline, or Finish buttons to navigate your document. Use the ellipsis menu for additional options, including the Download button .');
//await page2.getByRole('button', { name: 'Close' }).click();
await page2.locator('canvas').nth(1).click({
  position: {
    x: 90,
    y: 56
  }
});
await page2.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page2.locator('//div[@id="container"]//div[text()="signature"]').click();
await page2.mouse.move(600, 350)
await page2.mouse.down();
await page2.mouse.move(600, 350)
await page2.mouse.move(600, 400)
await page2.mouse.up();
// Optionally save changes
await page2.locator("//button[normalize-space()='Save']").click();
await page2.locator('//div[@id="container"]//div[text()="stamp"]').click();
const fileChooserPromise3 = page2.waitForEvent('filechooser');
await page2.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser3 = await fileChooserPromise3;
await fileChooser3.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page2.locator("//button[normalize-space()='Save']").click();
await page2.locator('//div[@id="container"]//div[text()="initials"]').click();
await page2.mouse.move(650, 350)
await page2.mouse.down();
await page2.mouse.move(700, 380)
await page2.mouse.up();
await page2.locator("//button[normalize-space()='Save']").click();
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariablenameID}']//textarea[1]`).fill('Mark Anderson');
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariablejobtitleID}']//textarea[1]`).fill('Quality analyst');
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariablecompanyID}']//textarea[1]`).fill('OpenSign pvt. ltd');
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariabletextinputID}']//textarea[1]`).fill('120 wood street sanfransisco');
await page2.locator('#myDropdown').selectOption('option-2');
await page2.getByRole('radio', { name: 'option-1' }).check();
await page2.getByRole('checkbox', { name: 'option-1' }).check();
await page2.locator('//div[contains(text(),"image")]').click();
const fileChooserPromise4 = page2.waitForEvent('filechooser');
await page2.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser4 = await fileChooserPromise4;
await fileChooser4.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page2.locator("//button[normalize-space()='Save']").click();
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariableemailID}']//textarea[1]`).fill('anderson@opepnsignlabs.com');
await page2.getByRole('button', { name: 'Finish' }).click();
await expect(page2.locator('//h1[text()="The document has been signed successfully!"]')).toContainText('The document has been signed successfully!',{ timeout: 180000 });

});
test('Verify that a new free user cannot access the paid features on the request signature page.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base UR
    // L and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('.text-xs > div > .cursor-pointer').first().click();
  await page.getByLabel('Add yourself').check();
  await page.getByRole('button', { name: 'Submit' }).click();
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
  await expect(page2.locator('#root')).toContainText('OPENSIGN™ FREE');
  await page.bringToFront();
/*
  await page.locator('label').filter({ hasText: 'Notify on signaturesUpgrade' }).locator('span').click();
  const page3Promise = page.waitForEvent('popup');
  const page3 = await page3Promise;
  await expect(page3.locator('#root')).toContainText('OPENSIGN™ PROFESSIONAL');
  await page.bringToFront();
  await page.locator('label').filter({ hasText: 'Allow modificationsUpgrade now' }).locator('span').click();
  const page4Promise = page.waitForEvent('popup');
  const page4 = await page4Promise;
  await page4.goto('https://staging-app.opensignlabs.com/subscription');
  await expect(page4.locator('#root')).toContainText('OPENSIGN™ FREE');
  // Switch back to the default page
await page.bringToFront();  // Brings the default page to the foreground
console.log("Switched back to the main page");*/
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
});/*
test('Verify that the tour guide messages function correctly for an existing signer when the tour guide is set to enabled.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
const actions = new PageActions(page);
await actions.click("Request Signatures", "//a[@role='menuitem']//span[text()='Request signatures']");
  await actions.typeText('Document Name','input[name="Name"]', 'Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Travis Mathew<pravin+travis@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Travis Mathew<pravin+travis@nxglabs.' }).click();
await page.getByText('Advanced options').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).toContainText('Please complete the fields on page number 1, all highlighted in the same color for easy identification.');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('paragraph')).toContainText('List of signers who still need to sign the document .');
  await page1.getByRole('dialog').locator('div').nth(1).click();
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('paragraph')).toContainText('Click any of the placeholders appearing on the document to sign. You will then see options to draw your signature, type it, or upload an image .');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('paragraph')).toContainText('Click Decline, or Finish buttons to navigate your document. Use the ellipsis menu for additional options, including the Download button .');
  await expect(page1.locator('label')).toContainText('Don\'t show this again');
  await page1.getByRole('checkbox', { name: 'Don\'t show this again' }).check();
  await page1.getByRole('button', { name: 'Close' }).click();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();
await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByRole('button', { name: 'Finish' }).click();
});*/
test('Verify that the tour guide messages not displayed for an existing signer when the tour guide is set to disabled.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await page.getByText('Advanced options').click();
await page.locator('input[name="IsTourEnabled"]').nth(1).check();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).not.toBeVisible();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();

await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByRole('button', { name: 'Finish' }).click();
});
test('Verify that the signer redireced to the url if redirect url is set.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();

  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await page.getByText('Advanced options').click();
await page.locator('input[name="RedirectUrl"]').fill('https://webhook-test.com/');
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).not.toBeVisible();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();
await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByRole('button', { name: 'Finish' }).click();

});
test('Verify that the signer can add the widget if the allowed modification set to enabled.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await page.getByText('Advanced options').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).not.toBeVisible();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();
await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByRole('button', { name: 'Finish' }).click();

});
test('Verify that the signature settings function correctly for the signature widget on the request signature page.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//div[@class="flex items-stretch justify-center"]//i[@class="fa-light fa-gear icon"]').click();
await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first().uncheck();
  await page.getByRole('textbox').fill('Signature Draw remove');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('//div[@class="flex items-stretch justify-center"]//i[@class="fa-light fa-gear icon"]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first()).not.toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('Signature Draw remove');
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1).uncheck();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('//div[@class="flex items-stretch justify-center"]//i[@class="fa-light fa-gear icon"]').click();
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
  await page.locator('//div[@class="flex items-stretch justify-center"]//i[@class="fa-light fa-gear icon"]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first()).not.toBeChecked();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1)).not.toBeChecked();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(3)).not.toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('only upload type enabled');
}); 
test('Verify that the merge page functions correctly and the user can sign the merged document in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
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

await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 150)
await page.mouse.up();

await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 200)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 250)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();

await page.mouse.move(600, 300)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();

await page.mouse.move(600, 320)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 340)
await page.mouse.up();

await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 380)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 430)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 450)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that the delete page functions correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
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
test('Verify that the rotate page functions correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await expect(page.locator('#renderList')).toContainText('1 of 3');
  await page.locator('canvas').nth(1).click({
    position: {
      x: 80,
      y: 133
    }
  });
  await expect(page.locator('#renderList')).toContainText('2 of 3');
  await page.getByTitle('Rotate right').locator('i').click();
  await page.getByTitle('Rotate right').locator('i').click();
 /* await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +     
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Next"
    - text: Recipients A Andy amaya andyamaya@nxglabs.in 
    - separator
    - button "+ Add recipients"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   text input   checkbox   dropdown   radio button   image   email 
    `);*/
  await page.getByTitle('Rotate right').locator('i').click();
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +     
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Next"
    - text: Recipients A Andy amaya andyamaya@nxglabs.in 
    - separator
    - button "+ Add recipients"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   text input   checkbox   dropdown   radio button   image   email 
    `);
  await page.locator('#renderList div').filter({ hasText: 'PagesAdd pages2 of' }).first().click();
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +     
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Next"
    - text: Recipients A Andy amaya andyamaya@nxglabs.in 
    - separator
    - button "+ Add recipients"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   text input   checkbox   dropdown   radio button   image   email 
    `); 
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

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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


while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widgets Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();

  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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


while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('xpath=//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widgets Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('canvas').nth(2).click({
  position: {
    x: 49,
    y: 71
  }
});
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('xpath=//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widgets Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
//await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="signature"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that stamp widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that stamp widgets Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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

await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that stamp widgets Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('//span[normalize-space()="stamp"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 360);
          await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that stamp widgets Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
 
}  await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(800, 370);
await page.mouse.up();

while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium" and text()="stamp"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});/*
test('Verify that initials widgets all types function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Draw"]').click();
//draw the signature
await page.mouse.move(700, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();

await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()=" Upload image"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()=" Upload image"]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/initial.png'));
await page.locator("//button[normalize-space()='Save']").click();

await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').click();
await page.locator('//div[@class="flex justify-between items-center"]//input[@placeholder="Your initials"]').fill('Ma');
await page.getByText('Ma').nth(3).click();
await page.getByRole('button', { name: 'Save' }).click();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});*/
test('Verify that initials widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that initials widgets Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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

await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that initials widgets Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('//span[normalize-space()="initials"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 360);
          await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that initials widgets Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
 
}  await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(800, 370);
await page.mouse.up();

while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();
  
await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="font-medium text-center" and text()="initials"]')).toBeVisible();

await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});/*
test('Verify that text widgets settings for Name, Job Title, Company, Text, and Email function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
  const isVisible = await page.locator('//h3[text()="Widget info"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
  const fontSize = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='name']")
  .evaluate(el => getComputedStyle(el).fontSize);
const color = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='name']")
  .evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSize}, Color: ${color}`);

if (fontSize === '15.6924px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSize}, Color: ${color}`);
}
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizeJotitle = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='job title']")
  .evaluate(el => getComputedStyle(el).fontSize);

const colorJotitle = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='job title']")
  .evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizeJotitle}, Color: ${colorJotitle}`);

if (fontSizeJotitle === '15.6924px' && colorJotitle === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSizeJotitle}, Color: ${colorJotitle}`);
}

await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizecompany = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='company']")
  .evaluate(el => getComputedStyle(el).fontSize);

const colorcompany= await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='company']")
  .evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizecompany}, Color: ${colorcompany}`);

if (fontSizecompany === '15.6924px' && colorcompany === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSizecompany}, Color: ${colorcompany}`);
}

await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizetext = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//textarea[text()='20 wood street sanfransisco']")
  .evaluate(el => getComputedStyle(el).fontSize);

const colortext = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//textarea[text()='20 wood street sanfransisco']")
  .evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizetext }, Color: ${colortext}`);

if (fontSizetext === '15.6924px' && colortext  === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSizetext }, Color: ${colortext }`);
}

await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 630)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizeemail = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='email']").evaluate(el => getComputedStyle(el).fontSize);

const coloremail = await page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='email']").evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizeemail}, Color: ${coloremail}`);

if (fontSizeemail=== '15.6924px' && coloremail  === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSizeemail }, Color: ${coloremail }`);
}
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();

});*/
test('Verify that name,job title, company, checkbox, image and email widgets Copy function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
 await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='name']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  await expect(page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='name']")).toBeVisible();
  await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 350)
await page.mouse.up();
await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='job title']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
    // Verify that there are now two matching elements
    await expect(page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='job title']")).toBeVisible();
  await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
 await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='company']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
    // Verify that there are now two matching elements
    await expect(page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='job title']")).toBeVisible();
    await page.locator('//span[normalize-space()=\'checkbox\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 450)
    await page.mouse.up();
    await page.locator("//button[normalize-space()='Save']").click(); 
      await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
        // Verify that there are now two matching elements
        const checkboxElements = await page.locator('//div[@class="signYourselfBlock react-draggable"]//div[1]//label[text()="option-1"]/preceding-sibling::input[@type="checkbox"]').count();
        expect(checkboxElements).toBeGreaterThan(1);
        await page.locator('//span[normalize-space()=\'radio button\']').hover();
    await page.mouse.down();
    await page.mouse.move(680, 450)
    await page.mouse.up();
    await page.locator("//button[normalize-space()='Save']").click(); 
      await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
        // Verify that there are now two matching elements
        const RadiobuttonElements = await page.locator('//div[@class="signYourselfBlock react-draggable"]//div[1]//label[text()="option-1"]/preceding-sibling::input[@type="radio"]').count();
        expect(RadiobuttonElements).toBeGreaterThan(1);
        await page.locator('//span[normalize-space()=\'dropdown\']').hover();
        await page.mouse.down();
        await page.mouse.move(750, 550)
        await page.mouse.up();
        await page.locator("//button[normalize-space()='Save']").click(); 
          await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
            // Verify that there are now two matching elements
            const dropdownElements = await page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls flex justify-between items-center" and text()="dropdown"]').count();
            expect(dropdownElements).toBeGreaterThan(1);
    await page.locator('//span[normalize-space()=\'image\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 500)
    await page.mouse.up();
    await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//div[text()='image']")).toBeVisible();
      await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
      //verify the copied element to be visible
        await expect(page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//div[text()='image']")).toBeVisible();
  await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='email']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
   // Verify that there are now two matching elements
   await expect(page.locator("//div[@class='signYourselfBlock react-draggable react-draggable-dragged']//span[text()='email']")).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
    await page.getByRole('button', { name: 'Send' }).click();

});
test('Verify that checkbox widget settings options function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 450)
    await page.mouse.up();
    await page.locator("//button[normalize-space()='Save']").click(); 
while (true) {
  await page.locator('//i[@class="fa-light fa-gear icon"]').click();
  
  const isVisible = await page.locator('//h3[text()="Checkbox"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
 await expect(page.locator('form')).toContainText('Name *');
  await expect(page.getByRole('textbox').first()).toHaveValue('checkbox');
  await expect(page.locator('form')).toContainText('Options');
  await expect(page.getByRole('textbox').nth(1)).toHaveValue('option-1');
  await expect(page.getByRole('textbox').nth(2)).toHaveValue('option-2');
  await page.locator('#selectSignerModal i').nth(2).click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('option-3');
  await page.locator("(//select[contains(@class, 'op-select')])[1]").selectOption('18');
  await page.locator("(//select[contains(@class, 'op-select')])[2]").selectOption('blue');
//await page.locator('//dialog[@id="selectSignerModal"]//div[@class="flex items-center mt-3 mb-3"]').selectOption('18');
//await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
 await page.getByRole('button', { name: 'Save' }).click();
 
 const fontSize = await page.locator('(//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"])[1]').evaluate(el => window.getComputedStyle(el).fontSize);
 const color = await page.locator('(//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"])[1]').evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSize}, Color: ${color}`);

if (fontSize === '16px' && color === 'rgb(33, 37, 41)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 16px, Color: blue but got Font Size: ${fontSize}, Color: ${color}`);
}
//const checkboxes = await page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"]').allTextContents();
//console.log(checkboxes);
// Filter out empty values
//const filteredCheckboxes = checkboxes.filter(text => text.trim() !== "");
//console.log(filteredCheckboxes);
// Compare the sorted arrays
//expect(filteredCheckboxes.sort()).toEqual(["option-1", "option-2", "option-3"].sort());
});
test('Verify that text widgets Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();

  await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator("//span[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator("//span[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that text widget Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');

while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('radio', { name: 'All pages but last' }).check();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
 await expect(page.locator("//span[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator("//span[text()='20 wood street sanfransisco']")).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that text widget Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
  while (true) {
    await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
    
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    
    if (isVisible) {
        console.log('"Copy widget to" is visible. Stopping the loop.');
        break; // Exit loop once the element is visible
    }
  
    await page.waitForTimeout(500); // Small delay to prevent rapid clicking
  }
  await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
 await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
await expect(page.locator("//span[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator("//span[text()='20 wood street sanfransisco']")).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that text widget Copy widget next to current widget function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator("//span[text()='20 wood street sanfransisco']")).toBeVisible();
await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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

await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('//span[normalize-space()="text input"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 360);
          await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//span[text()="text input"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
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
  await page.locator('//span[normalize-space()="text input"]').hover();
await page.mouse.down();
await page.mouse.move(800, 370);
await page.mouse.up();

while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
//verify the firts dropped text input widget
await expect (page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
//verify the copied text input widget
await expect (page.locator('//div[@class="signYourselfBlock react-draggable"]//div[@class="select-none-cls"]//span[text()="text input"]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that the document is not uploaded if its format is not supported in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  //select and try to upload the file format type json
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Unsupported_fileFormats/Presentation1.pptx'));
page.on('dialog', async (dialog) => {
  console.log(`Dialog message: ${dialog.message()}`);
  if (dialog.message() === 'We are currently experiencing some issues with processing DOCX files. Please upload the PDF file or contact us on support@opensignlabs.com') {
    console.log('Dialog text matches the expected text.');
  } else {
    console.error('Dialog text does NOT match the expected text.');
  }
  await dialog.accept();
});
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Unsupported_fileFormats/PlanSheet.xlsx'));
page.on('dialog', async (dialog) => {
  console.log(`Dialog message: ${dialog.message()}`);
  if (dialog.message() === 'We are currently experiencing some issues with processing DOCX files. Please upload the PDF file or contact us on support@opensignlabs.com') {
    console.log('Dialog text matches the expected text.');
  } else {
    console.error('Dialog text does NOT match the expected text.');
  }
  await dialog.accept();
});
});
});

