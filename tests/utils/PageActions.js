const { expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const path = require('path');

class PageActions {
    constructor(page) {
        this.page = page;
    }

    // ------------------ Utility Actions ------------------

    async click(elementName, locator, timeout = 120000) {
        await allure.step(`Clicking on ${elementName}`, async () => {
            await this.page.locator(locator).click({ timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Clicked`, 'text/plain');
        });
    }

    async typeText(elementName, locator, text, timeout = 120000) {
        await allure.step(`Typing into ${elementName}`, async () => {
            await this.page.locator(locator).fill(text, { timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Typed '${text}'`, 'text/plain');
        });
    }

    async getText(elementName, locator, timeout = 120000) {
        return await allure.step(`Getting text from ${elementName}`, async () => {
            const text = await this.page.locator(locator).innerText({ timeout });
            allure.attachment('Extracted Text', `Element: ${elementName}\nText: '${text}'`, 'text/plain');
            return text;
        });
    }

    async selectDropdown(elementName, locator, value, timeout = 120000) {
        await allure.step(`Selecting '${value}' from ${elementName}`, async () => {
            await this.page.locator(locator).selectOption(value, { timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Selected '${value}'`, 'text/plain');
        });
    }

    async waitForElement(elementName, locator, timeout = 120000) {
        await allure.step(`Waiting for ${elementName} to be visible`, async () => {
            await this.page.locator(locator).waitFor({ state: 'visible', timeout });
            allure.attachment('Element Visibility', `Element: ${elementName} is now visible`, 'text/plain');
        });
    }

    async isElementVisible(elementName, locator, timeout = 120000) {
        return await allure.step(`Checking visibility of ${elementName}`, async () => {
            const visible = await this.page.locator(locator).isVisible({ timeout });
            allure.attachment('Visibility Check', `Element: ${elementName}\nVisible: ${visible}`, 'text/plain');
            return visible;
        });
    }

    async isElementEnabled(elementName, locator, timeout = 120000) {
        return await allure.step(`Checking if ${elementName} is enabled`, async () => {
            const enabled = await this.page.locator(locator).isEnabled({ timeout });
            allure.attachment('Enabled Check', `Element: ${elementName}\nEnabled: ${enabled}`, 'text/plain');
            return enabled;
        });
    }

    async verifyText(elementName, locator, expectedText, timeout = 120000) {
        await allure.step(`Verifying text in ${elementName}`, async () => {
            await expect(this.page.locator(locator)).toHaveText(expectedText, { timeout });
            allure.attachment('Text Verification', `Element: ${elementName}\nExpected: '${expectedText}'`, 'text/plain');
        });
    }

    async selectRadio(elementName, locator, timeout = 120000) {
        await allure.step(`Selecting radio button ${elementName}`, async () => {
            await this.page.locator(locator).check({ timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Selected`, 'text/plain');
        });
    }

    async toggleCheckbox(elementName, locator, timeout = 120000) {
        await allure.step(`Toggling checkbox ${elementName}`, async () => {
            await this.page.locator(locator).click({ timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Toggled`, 'text/plain');
        });
    }

    async uploadFile(elementName, locator, filePath, timeout = 120000) {
        await allure.step(`Uploading file to ${elementName}`, async () => {
            await this.page.locator(locator).setInputFiles(filePath, { timeout });
            allure.attachment('File Upload', `Element: ${elementName}\nFile: ${filePath}`, 'text/plain');
        });
    }

    async takeScreenshot(fileName) {
        await allure.step(`Taking screenshot: ${fileName}`, async () => {
            await this.page.screenshot({ path: fileName });
            allure.attachment('Screenshot', `File: ${fileName}`, 'text/plain');
        });
    }

    async acceptAlert() {
        await allure.step(`Accepting alert`, async () => {
            this.page.on('dialog', async dialog => {
                console.log(`Alert: ${dialog.message()}`);
                await dialog.accept();
                allure.attachment('Alert', `Message: ${dialog.message()}\nAction: Accepted`, 'text/plain');
            });
        });
    }

    async dismissAlert() {
        await allure.step(`Dismissing alert`, async () => {
            this.page.on('dialog', async dialog => {
                console.log(`Alert: ${dialog.message()}`);
                await dialog.dismiss();
                allure.attachment('Alert', `Message: ${dialog.message()}\nAction: Dismissed`, 'text/plain');
            });
        });
    }

    async waitForNetworkIdle(timeout = 120000) {
        await allure.step(`Waiting for network to be idle`, async () => {
            await this.page.waitForLoadState('networkidle', { timeout });
            allure.attachment('Network Idle', `Network is now idle`, 'text/plain');
        });
    }
     async ClickSavebuttonSignerModal(timeout = 120000) {
        await allure.step(`click Save button on signer modal pop up.`, async () => {
            await this.page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`).click({ timeout });
            allure.attachment('Element Details', `Action: Clicked Save button on signer modal`, 'text/plain');
        });
    }

    // ------------------ Signature & Drawing ------------------

    async drawOnCanvas(canvasLocatorStr) {
        const canvasLocator = this.page.locator(canvasLocatorStr);
        await canvasLocator.waitFor({ state: 'visible' });
        const box = await canvasLocator.boundingBox();
        if (!box) throw new Error('Canvas bounding box not found.');
        const clickX = box.x + box.width * 0.3;
        const clickY = box.y + box.height * 0.6;
        await this.page.mouse.click(clickX, clickY);
        await this.page.mouse.down();
        await this.page.mouse.move(clickX + 5, clickY);
        await this.page.mouse.up();
    }

    async drawSignature() {
        await allure.step('Draw Signature', async () => {
            await this.drawOnCanvas("//canvas[contains(@class, 'signatureCanvas')]");
        });
    }

    async drawInitials() {
        await allure.step('Draw Initials', async () => {
            await this.drawOnCanvas("//canvas[contains(@class, 'intialSignatureCanvas')]");
        });
    }

    // ------------------ Widget & Modal Helpers ------------------

    async clickNextButtonInSignerModal() {
        await this.page.getByRole('button', { name: 'Next Field ' }).click();
    }

    async clickCloseButtonInSignerModal() {
        await this.page.getByRole('button', { name: '✕' }).click();
    }

    async clickFinishButtonInSignerModal() {
        await this.page.locator('#selectSignerModal').getByRole('button', { name: 'Finish' }).click();
    }

    async clickFinishButtonOnPlaceholder() {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }

    async dragAndDrop(label, x, y) {
        const locator = this.page.locator(`//div[@data-tut="addWidgets"]//span[normalize-space()="${label}"]`);
        await locator.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(x, y);
        await this.page.mouse.up();
    }

    async selectCalendarDateByLabel(label) {
        const targetXPath = `//div[@aria-label="${label}"]`;
        await this.page.locator(targetXPath).click({ force: true });
    }

    async clickTextWidgetAndFill(placeholder, value) {
        await this.page.locator(`//div[@class="signYourselfBlock react-draggable" and .//textarea[@placeholder='${placeholder}']]`).click();
        await this.page.locator(`//input[@placeholder='${placeholder}']`).fill(value);
        await this.clickNextButtonInSignerModal();
        await this.clickCloseButtonInSignerModal();
    }

    async clickEmailWidgetAndFill(placeholder, value) {
        await this.page.locator(`//div[contains(@class, "justify-center") and .//textarea[@placeholder="${placeholder}"]]`).click({ force: true });
        await this.page.locator(`//input[@type='email' and @placeholder='${placeholder}']`).fill(value);
    }

    async clickDateField(dateString) {
        await this.page.locator(`//div[text()="${dateString}"]`).dblclick();
        await this.page.locator(`//div[@class='flex justify-center']//div[@class='react-datepicker__input-container']//div[contains(text(), '${dateString}')]`).click({ force: true });
    }

    async getWidgetIdByLabel(label) {
        return await this.page.evaluate(labelText => {
            const xpath = labelText === 'Choose One'
                ? `//div[div[text()='${labelText}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`
                : `//div[span[text()='${labelText}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`;
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.id : null;
        }, label);
    }

    async getWidgetIdByType(type) {
        return await this.page.evaluate(typeText => {
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

    async uploadImage(locator, imagePathRelative) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.locator(locator).click();
        const fullPath = path.resolve(__dirname, imagePathRelative);
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(fullPath));
    }

    async selectDateWidgets(requestBody) {
        const widgets = requestBody.signers.flatMap(signer => signer.widgets || []);
        const defaultDateString = widgets.find(w => w.type === 'date' && w.options?.default)?.options?.default ?? null;

        let baseDate = new Date();
        if (defaultDateString) {
            const [month, day, year] = defaultDateString.split('-').map(Number);
            baseDate = new Date(year, month - 1, day);
        }

        const selectedDate = new Date(baseDate);
        selectedDate.setDate(baseDate.getDate() + 2);

        function getDayWithSuffix(day) {
            if (day >= 11 && day <= 13) return `${day}th`;
            switch (day % 10) {
                case 1: return `${day}st`;
                case 2: return `${day}nd`;
                case 3: return `${day}rd`;
                default: return `${day}th`;
            }
        }

        for (const widget of widgets) {
            if (widget.type === 'date' && widget.options?.format) {
                const format = widget.options.format;
                const dayOfWeek = selectedDate.toLocaleString('default', { weekday: 'long' });
                const month = selectedDate.toLocaleString('default', { month: 'long' });
                const day = selectedDate.getDate();
                const year = selectedDate.getFullYear();
                const dayWithSuffix = getDayWithSuffix(day);
                const ariaLabelValue = `Choose ${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}`;
                const targetXPath = `//div[@aria-label="${ariaLabelValue}"]`;
                await this.page.locator(targetXPath).click({ force: true });
            }
        }
    }
}

module.exports = PageActions;
