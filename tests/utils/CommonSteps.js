import { allure } from "allure-playwright";
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
require('dotenv').config();
const BASEURL = process.env.BASEURL;

if (!BASEURL) {
  throw new Error('BASEURL is not defined in the .env file');
}

const locators = {
  createAccountButton: 'button[name="Create account"]',
  nameInput: 'input[type="text"]',
  emailInput: '//input[@id="email" and @type="email"]',
  phoneInput: 'input[type="tel"]',
  companyInput: 'input[type="text"]',
  jobTitleInput: 'input[type="text"]',
  passwordInput: 'input[name="password"]',
  termsCheckbox: 'input[id="termsandcondition"]',
  registerButton: '//button[contains(.,\'Register\')]',
  freePlanButton: 'li:has-text("OPENSIGN™ FREEFreeBilled") button',
  professionalPlanButton: 'li:has-text("OPENSIGN™ PROFESSIONAL$9.99/") button',
  proceedButton: "//span[@class='btn-txt' and text()='Proceed']",
  addressField: '#billing_street',
  cityField: '#billing_city',
  zipCodeField: '#billing_zip',
  sameAsBillingCheckbox: 'input[name="sameasbillingaddress"]',
  reviewOrderButton: '//button[@class="btn-txt" and text() ="Review Order"]',
};

const fillSignupForm = async (page, { name, email, phone, company, jobTitle, password }) => {
  await page.locator(locators.nameInput).first().fill(name);
  await page.locator(locators.emailInput).fill(email);
  await page.locator(locators.phoneInput).fill(phone);
  await page.locator(locators.companyInput).nth(1).fill(company);
  await page.locator(locators.jobTitleInput).nth(2).fill(jobTitle);
  await page.locator(locators.passwordInput).fill(password);
  await page.locator(locators.termsCheckbox).click();
};

test.beforeEach(async ({ browserName, browser }) => {
  const browserVersion = await browser.version();
  const osPlatform = process.platform;
  allure.label("Browser Name", browserName);
  allure.label("Browser Version", browserVersion);
  allure.label("OS", osPlatform);
  console.log(`Browser: ${browserName}, Version: ${browserVersion}, OS: ${osPlatform}`);
});

export class CommonSteps {
  constructor(page) {
    this.page = page;
  }

  async navigateToBaseUrl() {
    await this.page.goto(BASEURL, { timeout: 120000 });
  }

  async closeTourIfVisible() {
    const page = this.page;
    const tourButton = page.getByRole('button', { name: /Close Tour|Skip/i }).first();
    const tourCount = await tourButton.count();
    if (tourCount > 0) {
      try {
        await tourButton.click({ force: true, timeout: 15000 });
      } catch (error) {
        console.log('Tour close button not clickable, continuing:', error.message || error);
      }
      await page.locator('.reactour__mask').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    }
  }

  async openSettingsMenuItem(menuName) {
    const page = this.page;
    await this.closeTourIfVisible();

    const settingsButton = page.locator('button[aria-controls="submenu-Settings"], button[aria-label="Settings"], button:has-text("Settings")').first();
    await settingsButton.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    await settingsButton.click({ force: true }).catch(() => {});

    const menuItem = page.getByRole('menuitem', { name: menuName, exact: true }).first();
    await menuItem.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    await menuItem.click({ force: true }).catch(() => {});
  }

  async login() {
    await this.page.locator('#email').fill(loginCredentials.email);
    await this.page.locator('#password').fill(loginCredentials.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async ProfessionPlanUserlogin() {
    await this.page.locator('#email').fill(loginCredentials.ProplanUsername);
    await this.page.locator('#password').fill(loginCredentials.ProPlanpassword);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async LoadPlaceholder(page)
  {
    await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 });
    await page.locator('//div[@data-tut="addWidgets"]//button[@aria-label="signature"]').waitFor({ state: 'visible', timeout: 90000 });
    await page.waitForLoadState("networkidle");
  }

  async NewUserlogin() {
    if (!loginCredentials.FreeplanUsername) {
      console.log('FreeplanUsername is empty. Running signup test...');
      await this.signupTestFreeUser(this.page);
    } else {
      console.log(`FreeplanUsername exists: ${loginCredentials.FreeplanUsername}`);
      await this.page.locator('#email').fill(loginCredentials.FreeplanUsername);
      await this.page.locator('#password').fill(loginCredentials.FreePlanpassword);
      await this.page.getByRole('button', { name: 'Login' }).click();
    }
  }

  async loginForCustomStorgeUser() {
    await this.page.locator('#email').fill(loginCredentials.CustomStorageUser_Username);
    await this.page.locator('#password').fill(loginCredentials.CustomStorageUser_Password);
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async verifyPageTitle(expectedTitle) {
    const title = await this.page.title();
    if (title === expectedTitle) {
      console.log(`Page title is correct: ${expectedTitle}`);
    } else {
      console.error(`Page title is incorrect. Expected: "${expectedTitle}", Got: "${title}"`);
    }
  }

  async signupTestFreeUser(page) {
    await page.getByRole('button', { name: 'Create account' }).click({ timeout: 120000 });
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible({ timeout: 120000 });

    const email = `kelvinsjohnson24+${Math.random()}@gmail.com`;
    loginCredentials.FreeplanUsername = email;
    loginCredentials.FreePlanpassword = 'Nxglabs@123';

    await fillSignupForm(page, {
      name: 'Mathew Wade',
      email,
      phone: '8238988998',
      company: 'qikAi.com',
      jobTitle: 'HrExecative',
      password: loginCredentials.FreePlanpassword,
    });

    await page.locator(locators.registerButton).click();
    await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 120000 });
    await page.locator(locators.freePlanButton).click();
    await page.getByRole('button', { name: 'Close', exact: true }).click({ force: true });
    await expect(page.locator('//div[@id="profile-menu"]//parent::button[text()="Upgrade now"]')).toBeVisible();

    const title = await page.title();
    expect(title).toBe('Dashboard - OpenSign™');
    console.log(`✅ Signup successful. User: ${loginCredentials.FreeplanUsername}`);
  }

  async fillDocumentTitleWithTimestamp(prefix) {
    const now = new Date();
    const formattedDateTime = now.toISOString().replace(/[:.]/g, '-');
    const title = `${formattedDateTime} ${prefix}`;
    console.log(`Document Title: ${title}`);
    return title;
  }

  async validateAndAcceptTerms() {
    const page = this.page;
    await allure.step('Agree to Digital Signing Agreement', async () => {
      await expect(page.getByRole('button', { name: 'I confirm & agree to continue' })).toBeVisible({ timeout: 120000 });
      await expect(page.locator('body')).toContainText('I confirm that I have read and understood the Electronic Record and Signature Disclosure and consent to use electronic records and signatur[]');
      await expect(page.locator("//div[@class='mt-2  text-base-content']//span[@class='text-[11px]']")).toContainText('Note: Agreeing to this does not mean you are signing the document immediatel[]');
      await page.getByRole('button', { name: 'I confirm & agree to continue' }).click();
    });
  }

  async DragAndDropWidget(WidgetName, x, y) {
    const { page } = this;

    const widgetLocator = page.locator(
      `//div[@data-tut="addWidgets"]//button[@aria-label="${WidgetName}"]`
    );
    await widgetLocator.waitFor({ state: 'attached', timeout: 90000 });

    await widgetLocator.scrollIntoViewIfNeeded();
    await expect(widgetLocator).toBeVisible({ timeout: 90000 });

    const maxAttempts = 5;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`Dragging '${WidgetName}'. Attempt ${attempt}/${maxAttempts}`);
        await this.dragAndDrop(WidgetName, x, y);
        await page.waitForTimeout(1000);

        const droppedWidget = WidgetName === 'date'
          ? page.locator("//div[contains(@class,'signYourselfBlock')]//*[normalize-space(.)='MM/dd/yyyy']")
          : page.locator(
              `//div[contains(@class,'signYourselfBlock')]` +
              `//*[self::div or self::span][starts-with(normalize-space(.), '${WidgetName}-')]`
            );

        if (await droppedWidget.count() > 0 && await droppedWidget.last().isVisible()) {
          console.log(`'${WidgetName}' widget successfully dropped.`);
          return;
        }

        console.log(`'${WidgetName}' was not created. Retrying...`);
      } catch (error) {
        console.log(`Drag/drop attempt ${attempt} failed for '${WidgetName}':`, error);
      }
      await page.waitForTimeout(1000);
    }

    throw new Error(`Failed to drag and drop '${WidgetName}' after ${maxAttempts} attempts.`);
  }

  async dragAndDrop(label, x, y) {
    const { page } = this;

    const widget = page.locator(
      `//div[@data-tut="addWidgets"]//button[@aria-label="${label}"]`
    );

    await expect(widget).toBeVisible({ timeout: 90000 });
    await widget.scrollIntoViewIfNeeded();

    const box = await widget.boundingBox();

    if (!box) {
      throw new Error(`Widget '${label}' is not visible or has no bounding box.`);
    }

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    console.log(`Dragging '${label}' from (${startX}, ${startY}) to (${x}, ${y})`);
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 5, startY + 5, { steps: 5 });
    await page.waitForTimeout(300);
    await page.mouse.move(x, y, { steps: 20 });
    await page.waitForTimeout(300);
    await page.mouse.up();

    console.log(`Dragged and dropped widget '${label}' to (${x}, ${y}).`);
  }

  async getElementIdByWidgetName(widgetName) {
    const xpath = widgetName === 'cells'
      ? `//div[contains(@class, 'signYourselfBlock') and .//div[contains(text(), '${widgetName}')]]`
      : `//div[span[text()='${widgetName}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`;

    const id = await this.page.evaluate((xpath) => {
      const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      return element ? element.id : null;
    }, xpath);

    return id;
  }

  async dragDropSignaturewidgetInSignyourselfPage(WidgetName, x, y) {
    const { page } = this;

    await page.waitForLoadState("networkidle");

    await page.locator('//div[@data-tut="addWidgets"]//button[@aria-label="signature"]').waitFor({
      state: 'visible',
      timeout: 90000
    });

    const saveButton = page.locator(
      "//dialog[@id='selectSignerModal']//button[normalize-space()='Save']"
    );

    try {
      for (let i = 0; i < 5; i++) {
        console.log(`Drag and drop attempt ${i + 1}`);
        await this.dragAndDrop(WidgetName, x, y);
        await page.waitForTimeout(1000);

        const saveVisible = await saveButton.isVisible().catch(() => false);
        const saveEnabled = saveVisible ? await saveButton.isEnabled().catch(() => false) : false;

        if (saveVisible && saveEnabled) {
          console.log("Save button is visible and enabled.");
          await saveButton.click();
          console.log("Save button clicked successfully!");
          break;
        }

        console.log(`Save button not available after attempt ${i + 1}.`);

        if (i < 4) {
          await page.waitForTimeout(1000);
        }
      }

      if (await saveButton.isVisible().catch(() => false)) {
        console.log("Save button is still visible after 5 attempts.");
      }
    } catch (error) {
      console.log("Error while dragging widget or clicking Save:", error);
      throw error;
    }
  }

  async drawSignature() {
    const page = this.page;
    await allure.step('Sign Signature Widget', async () => {
      const canvasLocator = page.locator("//canvas[contains(@class, 'signatureCanvas')]");
      await canvasLocator.waitFor({ state: 'visible' });
      const box = await canvasLocator.boundingBox();
      if (!box) throw new Error('Canvas bounding box not found.');
      const clickX = box.x + box.width * 0.3;
      const clickY = box.y + box.height * 0.6;
      await page.mouse.click(clickX, clickY);
      await page.mouse.down();
      await page.mouse.move(clickX + 5, clickY);
      await page.mouse.up();
    });
  }

  async clickSignatureWidgetAndType() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature"]').click();
    console.log('Signature widget clicked');
    await page.locator('//input[@id="signature"]').fill('Mathew Wade');
    console.log('Signature typed in input field');
  }

  async clickSignatureWidgetAndUpload() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature"]').click();
    console.log('Signature widget clicked');
    const filePath = path.join(__dirname, '../../../tests/TestData/Images/signature.png');
    await page.locator('//input[@id="signature"]').setInputFiles(filePath);
    console.log('Signature uploaded from file');
  }

  async clickSignatureWidgetAndDraw() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature-1"]').click();
    console.log('Signature widget clicked');
    await page.locator('//div[@class="flex justify-center"]//span[ text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
    await page.locator('//div[@class="flex justify-center"]//span[ text()="Draw"]').click();
    await this.drawSignature();
  }

  async drawSignatureAgain() {
    const page = this.page;
    await allure.step('Sign Signature Widget', async () => {
      const canvasLocator = page.locator("//canvas[contains(@class, 'signatureCanvas')]");
      await canvasLocator.waitFor({ state: 'visible' });
      const box = await canvasLocator.boundingBox();
      if (!box) throw new Error('Canvas bounding box not found.');
      const clickX = box.x + box.width * 0.3;
      const clickY = box.y + box.height * 0.6;
      await page.mouse.click(clickX, clickY);
      await page.mouse.down();
      await page.mouse.move(clickX + 5, clickY);
      await page.mouse.up();
    });
  }

  async clickStampWidgetAndUpload() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="stamp-1"]').click();
    console.log('Stamp widget clicked on the placeholder.');
    await this.uploadStamp();
  }

  async uploadStamp() {
    const page = this.page;
    await allure.step('Upload Stamp Image', async () => {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('//div[@class="flex justify-center"]//i[@class="fa-light fa-cloud-upload-alt uploadImgLogo text-base-content"]').click();
      const imagePath = path.resolve(__dirname, '../TestData/Images/stamp.jpg');
      console.log('Image Path:', imagePath);
      await fileChooserPromise.then(fileChooser => fileChooser.setFiles(imagePath));
      console.log('Stamp image uploaded successfully.');
    });
  }

  async clickInitialsWidgetAndDraw() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="initials-1"]').click();
    console.log('Initials widget clicked on the placeholder.');
    await this.drawInitials();
  }

  async drawInitials() {
    const page = this.page;
    await allure.step('Draw Initials', async () => {
      await page.locator('//div[@class="flex justify-center"]//span[ text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
      await page.locator('//div[@class="flex justify-center"]//span[ text()="Draw"]').click();
      const canvasLocator = page.locator('//canvas[contains(@class, "intialSignatureCanvas")]');
      await canvasLocator.waitFor({ state: 'visible' });
      const box = await canvasLocator.boundingBox();
      if (!box) throw new Error('Initials canvas bounding box not found.');
      const clickX = box.x + box.width * 0.3;
      const clickY = box.y + box.height * 0.6;
      await page.mouse.click(clickX, clickY);
      await page.mouse.down();
      await page.mouse.move(clickX + 5, clickY);
      await page.mouse.up();
    });
  }

  async clickImageWidgetAndUpload() {
    const page = this.page;
    await page.locator('//div[contains(text(),"image-1")]').click();
    console.log('Image widget clicked on the placeholder.');
    await this.uploadImage();
  }

  async uploadImage() {
    const page = this.page;
    await allure.step('Upload Designer Image', async () => {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('//div[@class="flex justify-center"]//i[@class="fa-light fa-cloud-upload-alt uploadImgLogo text-base-content"]').click();
      const imagePath = path.resolve(__dirname, '../TestData/Images/DesignerImage.png');
      await fileChooserPromise.then(fileChooser => fileChooser.setFiles(imagePath));
      console.log('Image uploaded successfully.');
    });
  }

  async clickDropdownAndSelect(dropdownId, value) {
    const page = this.page;
    await allure.step(`Select '${value}' from dropdown '${dropdownId}'`, async () => {
      await page.locator("//div[@class='signYourselfBlock react-draggable']//div[@class='select-none-cls flex justify-between items-center' and text()='Choose One']").click();
      console.log(`Dropdown clicked on the placeholder with placeholder name Choose One.`);
      await page.locator(`//select[@id='${dropdownId}']`).selectOption(value);
      console.log(`Selected value '${value}' from dropdown with id '${dropdownId}'.`);
      await this.clickNextButtonInSignerModal();
      await this.clickCloseButtonInSignerModal();
    });
  }

  async selectFromDropdown(dropdownId, value) {
    const page = this.page;
    await allure.step(`Select '${value}' from dropdown '${dropdownId}'`, async () => {
      const nativeDropdown = page.locator(`select#${dropdownId}`);
      if (await nativeDropdown.count()) {
        await nativeDropdown.selectOption(value);
      } else {
        await page.getByText('Choose One', { exact: true }).click();
        await page.getByText(value, { exact: true }).last().click();
      }
      console.log(`Selected value '${value}' from dropdown.`);
    });
  }

  async clickCheckboxAndSelect(labelText) {
    const page = this.page;
    await allure.step(`Select checkbox with label '${labelText}'`, async () => {
      await page.locator(`//div[@class='select-none-cls pointer-events-none']//span[text()='${labelText}']`).click({ force: true });
      console.log(`Checkbox with label '${labelText}' clicked.`);
      await page.locator(`//div[@class='flex justify-center']//label[contains(., '${labelText}')]/input[@type='checkbox']`).click({ force: true });
      console.log(`Checkbox with label '${labelText}' selected.`);
    });
  }

  async selectCheckbox(labelText) {
    const page = this.page;
    await allure.step(`Select checkbox with label '${labelText}'`, async () => {
      await page.getByRole('dialog').getByRole('checkbox', { name: labelText, exact: true }).check({ force: true });
      console.log(`Checkbox with label '${labelText}' selected.`);
    });
  }

  async clickRadioButtonAndSelect(label) {
    const page = this.page;
    await page.locator(`//span[text()='female']/preceding-sibling::input[@type='radio']`).click({ force: true });
    console.log(`Radio button with label '${label}' clicked.`);
    await page.locator(`//div[@class='flex justify-center']//label[contains(., '${label}')]/input[@type='radio']`).click();
    console.log(`Radio button with label '${label}' selected.`);
    await this.clickNextButtonInSignerModal();
    await this.clickCloseButtonInSignerModal();
  }

  async selectRadioButton(label) {
    const page = this.page;
    await page.getByRole('dialog').getByRole('radio', { name: label, exact: true }).check({ force: true });
    console.log(`Radio button with label '${label}' selected.`);
  }

  async clickTextWidgetAndFill(placeholder, value) {
    const page = this.page;
    await page.locator(`//div[@class="signYourselfBlock react-draggable" and .//textarea[@placeholder='${placeholder}']]`).click();
    console.log(`'${placeholder}' widget clicked on the placeholder.`);
    await page.locator(`//input[@placeholder='${placeholder}']`).fill(value);
    console.log(`Filled '${placeholder}' widget with value '${value}'.`);
    await this.clickNextButtonInSignerModal();
    await this.clickCloseButtonInSignerModal();
  }

  async fillTextField(placeholder, value) {
    const page = this.page;
    await page.locator(`//dialog[@id='selectSignerModal']//input[@placeholder='${placeholder}']`).fill(value);
    console.log(`Filled '${placeholder}' widget with value '${value}'.`);
  }

  async clickEmailWidgetAndFill(placeholder, value) {
    const page = this.page;
    await page.locator(`//div[contains(@class, "justify-center") and .//textarea[@placeholder="${placeholder}"]]`).click({ force: true });
    console.log(`Email widget clicked on the placeholder.`);
    await page.locator(`//input[@type='email' and @placeholder='${placeholder}']`).fill(value);
    console.log(`Filled Email widget with value '${value}'.`);
  }

  async fillEmailField(placeholder, value) {
    const page = this.page;
    await page.locator(`//input[@type='email' and @placeholder='${placeholder}']`).fill(value);
    console.log(`Filled Email field with value '${value}'.`);
  }

  async clickDateField(dateString) {
    const page = this.page;
    await allure.step(`Select date field with value '${dateString}'`, async () => {
      await page.locator(`//div[text()="${dateString}"]`).dblclick();
      console.log(`Date widget on the placeholder with value '${dateString}' clicked.`);
      await page.locator(`//div[@class='flex justify-center']//div[@class='react-datepicker__input-container']//div[contains(text(), '${dateString}')]`).click({ force: true });
      console.log(`Date field with value '${dateString}' clicked on the signer modal.`);
    });
  }

  async clickDateFieldOnTheSignerPad(dateString) {
    const page = this.page;
    await allure.step(`Select date field with value '${dateString}'`, async () => {
      await page.locator(`//div[@class='flex justify-center']//div[@class='react-datepicker__input-container']//div[contains(text(), '${dateString}')]`).click({ force: true });
      console.log(`Date field with value '${dateString}' clicked on the signer modal.`);
    });
  }

  async clickDateFieldOnTheSignerPad_Without_date() {
    const page = this.page;
    await allure.step(`click on the date field on the signer pad`, async () => {
      await page.locator(`//div[@class='flex justify-center']//div[@class='react-datepicker__input-container']//div[contains(text(), 'Select date')]`).click({ force: true });
      console.log(`Date field clicked on the signer modal.`);
    });
  }

  async selectCalendarDateByLabel(label) {
    const page = this.page;
    await allure.step(`Select date from calendar by aria-label '${label}'`, async () => {
      const targetXPath = `//div[@aria-label="${label}"]`;
      await page.locator(targetXPath).click();
      console.log(`Date with aria-label '${label}' selected from the calendar.`);
    });
  }

  async fillGenericTextWidget(placeholder, value) {
    const page = this.page;
    await allure.step(`Fill generic text widget '${placeholder}'`, async () => {
      await page.locator(`//div[@class="signYourselfBlock react-draggable" and .//textarea[@placeholder="${placeholder}"]]`).click();
      await page.locator(`//span[text()="Text"]/ancestor::div[contains(@class, "p-1")]//input[@type="text" and @placeholder="${placeholder}"]`).fill(value);
    });
  }

  async clickNextButtonInSignerModal() {
    await this.page.getByRole('button', { name: 'Next Field ' }).click();
    console.log('Next button in signer modal clicked.');
  }

  async clickCloseButtonInSignerModal() {
    await this.page.locator('button[aria-label="Close"]').nth(0).click();
    console.log('Close button in signer modal clicked.');
  }

  async clickDoneButtonInSignerModal() {
    await this.page.locator('#selectSignerModal').getByRole('button', { name: 'Done' }).click();
    console.log('Done button in signer modal clicked.');
  }

  async clickFinishButtonInSignerModal() {
    await this.page.locator('#selectSignerModal').getByRole('button', { name: 'Finish' }).click();
    console.log('Finish button in signer modal clicked.');
  }

  async clickFinishButtonOnPlaceholder() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
    console.log('Finish button on placeholder clicked.');
  }

  async ClickSavebuttonSignerModal() {
    await this.page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`).click();
    console.log('Save button in signer modal clicked.');
  }

  async ClickApplybuttonSignerModal() {
    await this.page.locator(`//dialog[@id='selectSignerModal']//button[text()='Apply']`).click();
    console.log('Apply button in signer modal clicked.');
  }

  async getWidgetIdByLabel(label) {
    return await this.page.evaluate((labelText) => {
      const xpath = labelText === 'Choose One'
        ? `//div[div[text()='${labelText}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`
        : `//div[span[text()='${labelText}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`;
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element ? element.id : null;
    }, label);
  }

  async getWidgetIdByType(type) {
    return await this.page.evaluate((typeText) => {
      const element = document.evaluate(
        `//input[@type='${typeText}' and contains(@id, '${typeText}-')]/ancestor::div[contains(@class, 'signYourselfBlock')]`,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return element ? element.id : null;
    }, type);
  }

  async fillCellWidgetsInModal(value) {
    const page = this.page;
    await allure.step(`Fill cell widget with value '${value}'`, async () => {
      await page.locator("//dialog[@id='selectSignerModal']//input[@placeholder='cells']").fill(value);
    });
  }

  async ClickCopyOption() {
    const page = this.page;
    await page.locator('//i[contains(@class,"fa-copy") and contains(@class,"icon")]').click();

    const isVisible = await page
      .locator('//h3[text()="Copy widget to"]')
      .isVisible()
      .catch(() => false);

    if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      return true;
    }
  }

  async waitAndPlaceSignatureAndClickSave(fieldName, x, y) {
    const page = this.page;
    await page.waitForLoadState("networkidle");
    await page.waitForSelector('//div[@class="react-pdf__Document"]', { timeout: 90000 });
    await page.waitForLoadState("networkidle");
    await page.locator(`//span[normalize-space()="${fieldName}"]`).waitFor({ state: 'visible', timeout: 90000 });
    await page.waitForLoadState("networkidle");
    await this.dragAndDrop(fieldName, x, y);

    try {
      const saveButton = page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`);

      for (let i = 0; i < 5; i++) {
        if (await saveButton.isVisible() && await saveButton.isEnabled()) {
          await saveButton.click();
          console.log("Save button clicked successfully!");
          break;
        } else {
          console.log(`Attempt ${i + 1}: Save button not visible, retrying...`);
          await this.dragAndDrop(fieldName, x, y);
          await page.waitForTimeout(1000);
        }

        if (i === 4) {
          console.log("Save button did not become visible after multiple attempts.");
        }
      }
    } catch (error) {
      console.log("Error clicking Save button, continuing execution.", error);
    }
  }
}

module.exports = CommonSteps;
















































































































































































































































































,