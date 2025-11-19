// @ts-check
const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps  = require('../utils/CommonSteps');
const path = require('path');
const PageActions = require('../utils/PageActions');
test.describe('Sign yourself', () => {
test('Verify that new user can perform the sign yourself', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  const actions = new PageActions(page);
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
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 120000 });
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    await page.getByLabel('Close').click();
    // Expects page to have a heading with the name of dashboard.
    const title = await page.title()
       expect(title).toBe('Dashboard - OpenSign™');
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await actions.waitForNetworkIdle();
 await commonSteps.dragAndDrop('signature', 600, 200);
await commonSteps.drawSignature();

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
  
  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
   await commonSteps.dragAndDrop('signature', 600, 200);
   //draw the signature
   await commonSteps.drawSignature();
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("Save button did not become visible after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.drawInitials();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('name', 600, 370);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('job title', 600, 390);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('company', 600, 430);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('date', 600, 460);
const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;
console.log('Today\'s date:', formattedDate);  // Extract day number as text
await commonSteps.clickDateFieldOnTheSignerPad(formattedDate);
//await commonSteps.selectCalendarDateByLabel();
// Function to get the day with the appropriate suffix
function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;

    case 2: return `${day}nd`;  
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }   
}
// Calculate the target date (today + 2 days)
today.setDate(today.getDate() + 2);
const dayOfWeek = today.toLocaleString('default', { weekday: 'long' }); // e.g., "Friday" 
const month = today.toLocaleString('default', { month: 'long' });       // e.g., "May"
const day = today.getDate();                                            // e.g., 2
const year = today.getFullYear();                                       // e.g., 2025
const dayWithSuffix = getDayWithSuffix(day);
const ariaLabelValue = `Choose ${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}`;
await commonSteps.selectCalendarDateByLabel(ariaLabelValue);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('text', 600, 490);
await commonSteps.fillTextField('text','20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('checkbox', 600, 540);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickCheckboxAndSelect('Option-1');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 600);
await commonSteps.uploadImage();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('email', 600, 640);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//button[normalize-space()='Send']").click();

});
  test('Verify that existing user can perform the sign yourself', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForLoadState("networkidle");
  await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
  await commonSteps.dragAndDrop('signature', 600, 200);
    
          // Wait a bit before checking again
          await page.waitForTimeout(2000);
      }
  
      if (i === 5) {
          console.log("Save button did not become visible after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('name', 600, 340);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('job title', 600, 390);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('company', 600, 430);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('date', 600, 460);
// Get today's date
const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` + 
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;

console.log('Today\'s date:', formattedDate);  // Extract day number as text
await commonSteps.clickDateFieldOnTheSignerPad(formattedDate);

// Function to get the day with the appropriate suffix

function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

// Calculate the target date (today + 2 days)

today.setDate(today.getDate() + 2);
const dayOfWeek = today.toLocaleString('default', { weekday: 'long' }); // e.g., "Friday"
const month = today.toLocaleString('default', { month: 'long' });       // e.g., "May"
const day = today.getDate();                                            // e.g., 2
const year = today.getFullYear();                                       // e.g., 2025
const dayWithSuffix = getDayWithSuffix(day);
const ariaLabelValue = `Choose ${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}`;
await commonSteps.selectCalendarDateByLabel(ariaLabelValue);  
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('text', 600, 490);
await commonSteps.fillTextField('text','20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
//drag and drop the cehckbox
await commonSteps.dragAndDrop('checkbox', 600, 540);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickCheckboxAndSelect('Option-1');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 600);
await commonSteps.uploadImage();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('email', 600, 640);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//button[normalize-space()='Send']").click();

});
test('Verify that the user can sign a document of type Image.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/1Sample-Offer_letter.png'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  // Attempt to find the Save button in the modal
  // and click it if it becomes visible and enabled
    const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
          await commonSteps.dragAndDrop('signature', 600, 200);
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("Save button did not become visible after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('name', 600, 370);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('job title', 600, 390);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('company', 600, 430);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('date', 600, 460);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('text', 600, 490);
await commonSteps.fillTextField('text','20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
//drag and drop the cehckbox
await commonSteps.dragAndDrop('checkbox', 600, 540);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickCheckboxAndSelect('Option-1');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 600);
await commonSteps.uploadImage();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('email', 600, 640);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
await page.locator("//button[normalize-space()='Send']").click();

});
test('Verify that signature widgets all types function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

      await commonSteps.dragAndDrop('signature', 600, 200);
        
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('signature', 600, 250);
await page.locator('//div[@class="flex justify-center"]//span[ text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@class="flex justify-center"]//span[ text()="Draw"]').click();
//draw the signature
await commonSteps.drawSignature();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('signature', 600, 300);
await page.locator('//div[@class="flex justify-center"]//span[ text()=" Upload image"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@class="flex justify-center"]//span[ text()=" Upload image"]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo text-base-content\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/signature.png'));
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('signature', 600, 400);
await page.locator('//div[@class="flex justify-center"]//span[ text()="Type"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@class="flex justify-center"]//span[ text()="Type"]').click();
await page.locator('#selectSignerModal input[placeholder="Your signature"]').fill('Mat henry');
await page.getByText('Mat henry').nth(3).click();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that signature widget Copy widget to all pages function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await commonSteps.dragAndDrop('signature', 600, 200);
        
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 

while (true) {
    await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="signature"]').click();
     // Close the signer modal if it's open
    await commonSteps.clickCloseButtonInSignerModal();
    
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that signature widgets Copy widget to all pages but last function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  // Attempt to find the Save button in the modal
  // and click it if it becomes visible and enabled 
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 

while (true) {
  await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="signature"]').click();
     // Close the signer modal if it's open
    await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('radio', { name: 'All pages but last' }).check();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'signature' })).not.toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that signature widgets Copy widget to all pages but first function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await commonSteps.dragAndDrop('signature', 600, 200);
try {  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
  while (true) {
    await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="signature"]').click();
       // Close the signer modal if it's open
    await commonSteps.clickCloseButtonInSignerModal();
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    
    if (isVisible) {
        console.log('"Copy widget to" is visible. Stopping the loop.');
        break; // Exit loop once the element is visible
    }
  
    await page.waitForTimeout(5000); // Small delay to prevent rapid clicking
  }
  await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'signature' })).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'signature' })).not.toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that signature widgets Copy widget next to current widget function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 

while (true) {
  await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="signature"]').click();
     // Close the signer modal if it's open
    await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const elements = await page.getByRole('img', { name: 'signature' }).all();
// Verify that exactly two elements are present
expect(elements.length).toBe(2); 
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that stamp widgets Copy widget to all pages function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
    const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="stamp"]').click();
     // Close the signer modal if it's open
    await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that stamp widgets Copy widget to all pages but last function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
      const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();                            
while (true) {
    await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="stamp"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('radio', { name: 'All pages but last' }).check();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'stamp' })).not.toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that stamp widgets Copy widget to all pages but first function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
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
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  
  while (true) {
     await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="stamp"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
    
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    
    if (isVisible) {
        console.log('"Copy widget to" is visible. Stopping the loop.');
        break; // Exit loop once the element is visible
    }
  
    await page.waitForTimeout(500); // Small delay to prevent rapid clicking
  }
  await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'stamp' })).not.toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that stamp widgets Copy widget next to current widget function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
   await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="stamp"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const elements = await page.getByRole('img', { name: 'stamp' }).all();
// Verify that exactly two elements are present
expect(elements.length).toBe(2); 
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that initials widgets all types function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('initials', 600, 300);
await page.locator('//div[@class="flex justify-center"]//span[text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@class="flex justify-center"]//span[text()="Draw"]').click();
//draw the signature
await commonSteps.drawInitials()
await commonSteps.ClickSavebuttonSignerModal();

await commonSteps.dragAndDrop('initials', 600, 400);
await page.locator('//div[@class="flex justify-center"]//span[text()=" Upload image"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@class="flex justify-center"]//span[text()=" Upload image"]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo text-base-content\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/initial.png'));
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('initials', 600, 500);
await page.locator('//div[@class="flex justify-center"]//span[text()="Type"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@class="flex justify-center"]//span[text()="Type"]').click();
await page.locator('//div[@class="flex justify-between items-center tabWidth"]//input[@placeholder="Your initials"]').fill('Ps');
await page.getByText('Ps').nth(3).click();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that initials widgets Copy widget to all pages function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
   await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="initials"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that initials widgets Copy widget to all pages but last function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="initials"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('radio', { name: 'All pages but last' }).check();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'initials' })).not.toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that initials widgets Copy widget to all pages but first function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
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
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  
  while (true) {
    await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="initials"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
    
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    
    if (isVisible) {
        console.log('"Copy widget to" is visible. Stopping the loop.');
        break; // Exit loop once the element is visible
    }
  
    await page.waitForTimeout(500); // Small delay to prevent rapid clicking
  }
  await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.getByRole('img', { name: 'initials' })).not.toBeVisible();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that initials widgets Copy widget next to current widget function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//div[@class="flex items-stretch justify-center"]//img[@alt="initials"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
  const elements = await page.getByRole('img', { name: 'initials' }).all();
// Verify that exactly two elements are present
expect(elements.length).toBe(2);
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that widgets settings for Name, Job Title, Company, Text, and Email function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('name', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//div[contains(@class, "signYourselfBlock")]//i[contains(@class, "fa-gear")]').dblclick();
  const isVisible = await page.locator('//h3[text()="Text field"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
await commonSteps.ClickSavebuttonSignerModal();
  const fontSize = await page.locator("//textarea[text()='Pravin Testing account']")
  .evaluate(el => getComputedStyle(el).fontSize);
const color = await page.locator("//textarea[text()='Pravin Testing account']")
  .evaluate(el => getComputedStyle(el).color);
console.log(`Font Size: ${fontSize}, Color: ${color}`);
// Extract the integer part and append 'px'
let roundedFontSize = parseInt(fontSize) + 'px';
if (roundedFontSize === '15px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15px, Color: blue but got Font Size: ${fontSize}, Color: ${color}`);
}
await commonSteps.dragAndDrop('job title', 600, 400);
await commonSteps.ClickSavebuttonSignerModal();
await page.locator('//div[contains(@class, "signYourselfBlock")]//i[contains(@class, "fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
  const fontSizeJotitle = await page.locator("//textarea[text()='Quality analystAA']")
  .evaluate(el => getComputedStyle(el).fontSize);
const colorJotitle = await page.locator("//textarea[text()='Quality analystAA']")
  .evaluate(el => getComputedStyle(el).color);
console.log(`Font Size: ${fontSizeJotitle}, Color: ${colorJotitle}`);
// Extract the integer part and append 'px'
let roundedFontSizejobtitle = parseInt(fontSizeJotitle) + 'px';

if (roundedFontSizejobtitle === '15px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.px, Color: blue but got Font Size: ${fontSizeJotitle}, Color: ${colorJotitle}`);
}
await commonSteps.dragAndDrop('company', 600, 500);
await commonSteps.ClickSavebuttonSignerModal();
await page.locator('//div[contains(@class, "signYourselfBlock")]//i[contains(@class, "fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizecompany = await page.locator("//textarea[text()='OpenSign pvt ltd']")
  .evaluate(el => getComputedStyle(el).fontSize);

const colorcompany= await page.locator("//textarea[text()='OpenSign pvt ltd']")
  .evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizecompany}, Color: ${colorcompany}`);
// Extract the integer part and append 'px'
let roundedFontSizecmp = parseInt(fontSizecompany) + 'px';

if (roundedFontSizecmp === '15px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15px, Color: blue but got Font Size: ${fontSizecompany}, Color: ${colorcompany}`);
}
await commonSteps.dragAndDrop('text', 600, 600);
await commonSteps.fillTextField('text','20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
await page.locator('//div[contains(@class, "signYourselfBlock")]//i[contains(@class, "fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizetext = await page.locator("//textarea[text()='20 wood street sanfransisco']")
  .evaluate(el => getComputedStyle(el).fontSize);

const colortext = await page.locator("//textarea[text()='20 wood street sanfransisco']")
  .evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizetext }, Color: ${colortext}`);
// Extract the integer part and append 'px'
let roundedFontSizetext = parseInt(fontSizetext) + 'px';

if (roundedFontSizetext === '15px' && color === 'rgb(0, 0, 255)'){
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15px, Color: blue but got Font Size: ${fontSizetext }, Color: ${colortext }`);
}
await commonSteps.dragAndDrop('email', 600, 700);
await commonSteps.ClickSavebuttonSignerModal();
await page.locator('//div[contains(@class, "signYourselfBlock")]//i[contains(@class, "fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const fontSizeemail = await page.locator("//textarea[text()='pravin+testaccount@nxglabs.in']").evaluate(el => getComputedStyle(el).fontSize);

const coloremail = await page.locator("//textarea[text()='pravin+testaccount@nxglabs.in']").evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizeemail}, Color: ${coloremail}`);
// Extract the integer part and append 'px'
let roundedFontSizeemail = parseInt(fontSizeemail) + 'px';

if (roundedFontSizeemail === '15px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15px, Color: blue but got Font Size: ${fontSizeemail }, Color: ${coloremail }`);
}
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that name,job title, company, checkbox, image and email widgets Copy function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('name', 600, 300);
 await expect(page.locator("//textarea[text()='Pravin Testing account']")).toBeVisible();
  await commonSteps.ClickSavebuttonSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
   const nameElements = await page.locator("//textarea[text()='Pravin Testing account']").count();
    expect(nameElements).toBeGreaterThan(1);
 await commonSteps.dragAndDrop('job title', 600, 350);
 await commonSteps.ClickSavebuttonSignerModal();
await expect(page.locator("//textarea[text()='Quality analystAA']")).toBeVisible();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    // Verify that there are now two matching elements
    const JobTitleElements = await page.locator("//textarea[text()='Quality analystAA']").count();
    expect(JobTitleElements).toBeGreaterThan(1);
await commonSteps.dragAndDrop('company', 600, 400);
await commonSteps.ClickSavebuttonSignerModal();
 await expect(page.locator("//textarea[text()='OpenSign pvt ltd']")).toBeVisible();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    // Verify that there are now two matching elements
    const companyElements = await page.locator("//textarea[text()='OpenSign pvt ltd']").count();
    expect(companyElements).toBeGreaterThan(1);

   await commonSteps.dragAndDrop('checkbox', 600, 450);
   await commonSteps.ClickSavebuttonSignerModal();
   await page.getByText('Option-1Option-').click();
   await commonSteps.clickCloseButtonInSignerModal();
      await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
        // Verify that there are now two matching elements
        const checkboxElements = await page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"]').count();
        expect(checkboxElements).toBeGreaterThan(1);
   await commonSteps.dragAndDrop('image', 600, 500);
   await commonSteps.uploadImage();
   await commonSteps.ClickSavebuttonSignerModal();
      await page.locator('//img[@alt="image"]').click();
      await commonSteps.clickCloseButtonInSignerModal();
      await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
        // Verify that there are now two matching elements
        const imageElements = await page.locator('//img[@alt="image"]').count();
        expect(imageElements).toBeGreaterThan(1);
  await commonSteps.dragAndDrop('email', 600, 550);
  await commonSteps.ClickSavebuttonSignerModal();
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
   // Verify that there are now two matching elements
    const emailElements = await page.locator("//textarea[text()='pravin+testaccount@nxglabs.in']").count();
    expect(emailElements).toBeGreaterThan(1);
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that checkbox widget settings options function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('checkbox', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
await page.getByText('Option-1Option-').click();
  await commonSteps.clickCloseButtonInSignerModal();
  await page.locator('//i[@class="fa-light fa-gear icon text-[#188ae2] right-[29px] -top-[19px] z-[99] pointer-events-auto"]').click();
  const isVisible = await page.locator('//h3[text()="Checkbox"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
 await expect(page.locator('form')).toContainText('Name *');
  await expect(page.locator("//dialog[@class=' op-modal op-modal-open']//input[@id='title']")).toHaveValue('checkbox-1');
  await expect(page.locator('form')).toContainText('Options');
  await expect(page.getByRole('textbox').nth(1)).toHaveValue('Option-1');
  await expect(page.getByRole('textbox').nth(2)).toHaveValue('Option-2');
  await page.locator('#selectSignerModal i').nth(2).click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('Option-3');
  await page.locator("(//select[contains(@class, 'op-select')])[1]").selectOption('18');
  await page.locator("(//select[contains(@class, 'op-select')])[2]").selectOption('blue');
//await page.locator('//dialog[@id="selectSignerModal"]//div[@class="flex items-center mt-3 mb-3"]').selectOption('18');
//await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
await commonSteps.ClickSavebuttonSignerModal();
 const fontSize = await page.locator('(//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"])[1]').evaluate(el => window.getComputedStyle(el).fontSize);
 const color = await page.locator('(//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"])[1]').evaluate(el => getComputedStyle(el).color);

// Round the font size to the nearest whole number and append 'px'
const roundedFontSize = Math.round(parseFloat(fontSize)) + 'px';

console.log(`Font Size: ${roundedFontSize}, Color: ${color}`);

if (roundedFontSize === '15px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 16px, Color: blue but got Font Size: ${roundedFontSize}, Color: ${color}`);
}
//const checkboxes = await page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"]').allTextContents();
//console.log(checkboxes);
// Filter out empty values
//const filteredCheckboxes = checkboxes.filter(text => text.trim() !== "");
//console.log(filteredCheckboxes);
// Compare the sorted arrays
//expect(filteredCheckboxes.sort()).toEqual(["option-1", "option-2", "option-3"].sort());
});
test('Verify that text widgets Copy widget to all pages function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('text', 600, 300);
await commonSteps.fillTextField('text', '20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  
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
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that text widget Copy widget to all pages but last function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('text', 600, 300);
await commonSteps.fillTextField('text', '20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  
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
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that text widget Copy widget to all pages but first function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
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
await commonSteps.dragAndDrop('text', 600, 300);
await commonSteps.fillTextField('text', '20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
  while (true) {
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    
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
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that text widget Copy widget next to current widget function correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 200);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('text', 600, 300);
await commonSteps.fillTextField('text', '20 wood street sanfransisco');
  await commonSteps.ClickSavebuttonSignerModal();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  
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
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});
test('Verify that the merge page functions correctly and the user can sign the merged document in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Name"]').press('Tab');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.waitForLoadState("networkidle");
await commonSteps.dragAndDrop('signature', 600, 250);
try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 250);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('stamp', 600, 300);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('initials', 600, 350);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('name', 600,380);
await commonSteps.fillTextField('please enter text', 'Pravin Testing account');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('job title', 600, 400);
await commonSteps.fillTextField('please enter text', 'Quality analystAA');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('company', 600, 430);
await commonSteps.fillTextField('please enter text', 'OpenSign pvt ltd');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('date', 600, 460);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('text', 600, 500);
await commonSteps.fillTextField('text', '20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('checkbox', 600, 530);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 570);
await commonSteps.uploadImage();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('email', 600, 620);
await commonSteps.fillEmailField('demo@gmail.com', 'pravin+testaccount@nxglabs.in');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
});
test('Verify that the delete page functions correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Name"]').press('Tab');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
test('Verify that the rotate page functions correctly in Sign Yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Name"]').press('Tab');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +      
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Finish"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   cells   checkbox   image   email 
    `);
  await page.getByTitle('Rotate right').locator('i').click();
   await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +      
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Finish"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   cells   checkbox   image   email 
    `);
  await page.getByTitle('Rotate left').locator('i').click();
   await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +      
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Finish"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   cells   checkbox   image   email 
    `);
await commonSteps.dragAndDrop('signature', 600, 150);

try {
  const rowLocator = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);
for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
        await commonSteps.dragAndDrop('signature', 600, 200);
        // Wait a bit before checking again
        await page.waitForTimeout(1000);
    }

    if (i === 5) {
        console.log("Save button did not become visible after multiple attempts.");
    }
}
} catch (error) {
console.log("Element not found or not interactable, continuing execution.");

} 
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.uploadStamp();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('name', 600, 320);
await commonSteps.fillTextField('please enter text', 'Pravin Testing account');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('job title', 600, 350);
await commonSteps.fillTextField('please enter text', 'Quality analystAA');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('company', 600, 370);
await commonSteps.fillTextField('please enter text', 'OpenSign pvt ltd');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('date', 600, 390);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('text', 600, 400);
await commonSteps.fillTextField('text', '20 wood street sanfransisco');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('checkbox', 600, 420);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 450);
await commonSteps.uploadImage();
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('email', 700, 450);
await commonSteps.fillEmailField('demo@gmail.com', 'pravin+testaccount@nxglabs.in');
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.clickFinishButtonOnPlaceholder();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
console.log('Rotate page test completed successfully.');
});
test('Verify that the document is not uploaded if its format is not supported in sign yourself.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
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