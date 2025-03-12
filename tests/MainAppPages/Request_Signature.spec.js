const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const path = require('path');
const exp = require('constants');
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
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.locator('input[name="Name"]').press('Tab');
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
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/1Sample-Offer_letter.png'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
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
await expect(page.locator('#selectSignerModal')).toContainText('You have successfully sent email to Pravin Testing account. Subsequent signers will get email(s) once Pravin Testing account signs the document');
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
await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
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

await expect(page1.getByRole('paragraph')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
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
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
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
await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
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
await page1.getByText('Congratulations! 🎉 This').click();
const page2 = await page.context().newPage();
await page2.goto(copiedUrl2);
await page2.waitForLoadState("networkidle");
await page2.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page2.getByRole('button', { name: 'Agree & Continue' }).click();
await expect(page2.getByRole('paragraph')).toContainText('List of signers who have already signed the document .');
await page2.locator('.sc-gsFSXq > button:nth-child(3)').click();
//await expect(page2.getByRole('paragraph')).toContainText('Click any of the placeholders appearing on the document to sign. You will then see options to draw your signature, type it, or upload an image .');
//await page2.locator('.sc-gsFSXq > button:nth-child(3)').click();
//await expect(page2.getByRole('paragraph')).toContainText('Click Decline, or Finish buttons to navigate your document. Use the ellipsis menu for additional options, including the Download button .');
await page2.getByRole('button', { name: 'Close' }).click();
await page2.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page2.locator('//div[@id="container"]//div[text()="signature"]').click();
await page2.mouse.down();
await page2.mouse.move(150, 128)
await page2.mouse.move(160, 138)
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
await expect(page2.getByRole('paragraph')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 180000 });

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
});
test('Verify that the tour guide messages not displayed for an existing signer when the tour guide is set to disabled.', async ({ page }) => {
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

});*/
test('Verify that the signer can add the widget if the allowed modification set to enabled.', async ({ page }) => {
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
test('Verify that signature widgets Copy widget to all pages but last function correctly in Sign Yourself.', async ({ page }) => {
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
await page.getByText('All pages but first').click();
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

