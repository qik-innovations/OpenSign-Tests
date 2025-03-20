// @ts-check
const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const path = require('path');
test.describe('Sign yourself', () => {
test('Verify that new user can perform the sign yourself', async ({ page }) => {
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
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
//draw the signature
await page.mouse.move(670, 300)
await page.mouse.down();
await page.mouse.move(670, 350)
await page.mouse.up();

try {
  const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");
  
  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(600, 300);
          await page.mouse.up();
          //draw the signature
          await page.mouse.move(670, 300)
await page.mouse.down();
await page.mouse.move(670, 350)
await page.mouse.up();
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

await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();

await page.mouse.move(700, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
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
await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));

await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//i[@class='fa-light fa-plus']").first().click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 200)
await page.mouse.up();

try {
  const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(600, 200);
          await page.mouse.up();
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

await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(600, 250)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();

await page.mouse.move(600, 370)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();

await page.mouse.move(600, 390)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();
await page.mouse.move(600, 430)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();
await page.mouse.move(600, 460)
await page.mouse.up();
await page.waitForTimeout(2000);
const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` + 
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;

console.log('Today\'s date:', formattedDate);  // Extract day number as text
await page.locator(`//div[text()="${formattedDate}"]`).dblclick();
 // Calculate the target date (today + 2 days)
 today.setDate(today.getDate() + 2); // Add 2 days
 const targetDay = today.getDate();
 console.log("targeted day"+ targetDay);
 const targetMonth = today.toLocaleString('default', { month: 'long' }); // e.g., "March"
 const targetYear = today.getFullYear();
 // Select the correct month and year
 while (true) {
  const displayedMonthYear = await page.locator('//div[@class="react-datepicker__month-container"]').textContent() || '';

  if (displayedMonthYear.includes(targetMonth) && displayedMonthYear.includes(targetYear.toString())) {
      break; // Exit loop if month and year match
  }
  await page.locator('//button[contains(@aria-label, "Next Month")]').click(); // Click next until matched
}

 // Select the target day
 await page.locator(`//div[@class="react-datepicker__month"]//div[text()='${targetDay}']`).click();

 // Verify the selected date in the input field
 //const selectedDate = await page.locator('//div[@class="react-datepicker__month"]').inputValue();
 //expect(selectedDate).toContain(today.toLocaleDateString('en-US')); // Format as needed

await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 490)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();

await page.mouse.move(600, 540)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//i[@class='fa-light fa-plus']").first().click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
  const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(600, 300);
          await page.mouse.up();
          
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

await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();

await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();

await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();

await page.mouse.move(600, 520)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();

await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
//drag and drop the cehckbox
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();

await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
await page.locator("//i[@class='fa-light fa-plus']").first().click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Draw"]').click();
//draw the signature
await page.mouse.move(670, 420)
await page.mouse.down();
await page.mouse.move(670, 450)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();

await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 500)
await page.mouse.up();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()=" Upload image"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()=" Upload image"]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/signature.png'));
await page.locator("//button[normalize-space()='Save']").click();

await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').click();
await page.locator('//div[@class="flex justify-between items-center"]//input[@placeholder="Your signature"]').fill('Mat henry');
await page.getByText('Mat henry').nth(3).click();
await page.getByRole('button', { name: 'Save' }).click();
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
    await page.locator('//i[@class="fa-light fa-copy icon"]').click();
    
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
const elements = await page.getByRole('img', { name: 'signature' }).all();
// Verify that exactly two elements are present
expect(elements.length).toBe(2); 
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
  await expect(page.getByRole('img', { name: 'stamp' })).toBeVisible();
  
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
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
const elements = await page.getByRole('img', { name: 'stamp' }).all();
// Verify that exactly two elements are present
expect(elements.length).toBe(2); 
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 470)
await page.mouse.up();
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
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').click();
await page.locator('//div[@class="flex justify-between items-center"]//input[@placeholder="Your initials"]').fill('Ma');
await page.getByText('Ma').nth(3).click();
await page.getByRole('button', { name: 'Save' }).click();
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
while (true) {
  await page.locator('//i[@class="fa-light fa-copy icon"]').click();
  
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
  await expect(page.getByRole('img', { name: 'initials' })).toBeVisible();
  
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();
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
  const elements = await page.getByRole('img', { name: 'initials' }).all();
// Verify that exactly two elements are present
expect(elements.length).toBe(2);
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
while (true) {
  await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Text field"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
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
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
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

await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
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

await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 630)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 200)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 200);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
 await expect(page.locator("//textarea[text()='Pravin Testing account']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
   const nameElements = await page.locator("//textarea[text()='Pravin Testing account']").count();
    expect(nameElements).toBeGreaterThan(1);
 
  await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 350)
await page.mouse.up();
await expect(page.locator("//textarea[text()='Quality analystAA']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
    // Verify that there are now two matching elements
    const JobTitleElements = await page.locator("//textarea[text()='Quality analystAA']").count();
    expect(JobTitleElements).toBeGreaterThan(1);
  await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
 await expect(page.locator("//textarea[text()='OpenSign pvt ltd']")).toBeVisible();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
    // Verify that there are now two matching elements
    const companyElements = await page.locator("//textarea[text()='OpenSign pvt ltd']").count();
    expect(companyElements).toBeGreaterThan(1);

    await page.locator('//span[normalize-space()=\'checkbox\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 450)
    await page.mouse.up();
    await page.locator("//button[normalize-space()='Save']").click(); 
      await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
        // Verify that there are now two matching elements
        const checkboxElements = await page.locator('//div[@class="signYourselfBlock react-draggable react-draggable-dragged"]//div[1]//input[@type="checkbox"]').count();
        expect(checkboxElements).toBeGreaterThan(1);
    await page.locator('//span[normalize-space()=\'image\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 500)
    await page.mouse.up();
    const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
    const fileChooser2 = await fileChooserPromise2;
    await fileChooser2.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
    await page.locator("//button[normalize-space()='Save']").click(); 
     await expect(page.locator('//img[@alt="image"]')).toBeVisible();
      await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
        // Verify that there are now two matching elements
        const imageElements = await page.locator('//img[@alt="image"]').count();
        expect(imageElements).toBeGreaterThan(1);
  await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
  await page.locator('//i[@class="fa-light fa-copy icon"]').dblclick();
   // Verify that there are now two matching elements
    const emailElements = await page.locator("//textarea[text()='pravin+testaccount@nxglabs.in']").count();
    expect(emailElements).toBeGreaterThan(1);
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator("//button[normalize-space()='Finish']").click();
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
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator("//button[normalize-space()='Finish']").click();
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

await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 300);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise3 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser3 = await fileChooserPromise3;
await fileChooser3.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();

await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();

await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();

await page.mouse.move(600, 520)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();

await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
//drag and drop the cehckbox
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();

await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise4 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser4 = await fileChooserPromise4;
await fileChooser4.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
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
    - text: +     
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Finish"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   checkbox   image   email 
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
    - button "Finish"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   checkbox   image   email 
    `);
  await page.getByTitle('Rotate left').locator('i').click();
  await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
    - text: Pages
    - button "+ Add pages"
    - text: +     
    - button
    - text: 2 of 3
    - button
    - button "Back"
    - button "Finish"
    - text: Fields  signature   stamp   initials   name   job title   company   date   text   checkbox   image   email 
    `);
    await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 200)
await page.mouse.up();

try {
const rowLocator = page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']");

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        await rowLocator.click();
        console.log("Save button clicked!");
        break; // Exit the loop if successfully clicked
    } else {
        console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);

        await page.locator('//span[normalize-space()="signature"]').hover();
        await page.mouse.down();
        await page.mouse.move(600, 200);
        await page.mouse.up();
        
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
await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(700, 200)
await page.mouse.up();
const fileChooserPromise3 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser3 = await fileChooserPromise3;
await fileChooser3.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(800, 200)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();

await page.mouse.move(600, 250)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();

await page.mouse.move(700, 250)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();

await page.mouse.move(800, 250)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();

await page.locator('//span[@class="md:inline-block text-center text-[15px] ml-[5px] font-semibold pr-1 md:pr-0" and text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(700, 300)
await page.mouse.up();
await page.locator('//textarea[@placeholder="text"]').fill('20 wood street sanfransisco');
//drag and drop the cehckbox
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();
await page.mouse.move(800, 260)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();

await page.mouse.move(700, 260)
await page.mouse.up();
const fileChooserPromise4 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser4 = await fileChooserPromise4;
await fileChooser4.setFiles(path.join(__dirname, '../TestData/Images/DesignerImage.png'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.mouse.move(600, 260)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });

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