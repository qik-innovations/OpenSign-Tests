const { expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

class PageActions {
    constructor(page) {
        this.page = page;
    }

    // Click an element
    async click(elementName, locator, timeout = 120000) {
        await allure.step(`Clicking on ${elementName}`, async () => {
            await this.page.locator(locator).click({ timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Clicked`, 'text/plain');
        });
    }

    // Type into an input field
    async typeText(elementName, locator, text, timeout = 120000) {
        await allure.step(`Typing into ${elementName}`, async () => {
            await this.page.locator(locator).fill(text, { timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Typed '${text}'`, 'text/plain');
        });
    }

    // Get text from an element
    async getText(elementName, locator, timeout = 120000) {
        return await allure.step(`Getting text from ${elementName}`, async () => {
            const text = await this.page.locator(locator).innerText({ timeout });
            allure.attachment('Extracted Text', `Element: ${elementName}\nText: '${text}'`, 'text/plain');
            return text;
        });
    }

    // Select from a dropdown
    async selectDropdown(elementName, locator, value, timeout = 120000) {
        await allure.step(`Selecting '${value}' from ${elementName}`, async () => {
            await this.page.locator(locator).selectOption(value, { timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Selected '${value}'`, 'text/plain');
        });
    }

    // Wait for element to be visible
    async waitForElement(elementName, locator, timeout = 120000) {
        await allure.step(`Waiting for ${elementName} to be visible`, async () => {
            await this.page.locator(locator).waitFor({ state: 'visible', timeout });
            allure.attachment('Element Visibility', `Element: ${elementName} is now visible`, 'text/plain');
        });
    }

    // Check if element is visible
    async isElementVisible(elementName, locator, timeout = 120000) {
        return await allure.step(`Checking visibility of ${elementName}`, async () => {
            const visible = await this.page.locator(locator).isVisible({ timeout });
            allure.attachment('Visibility Check', `Element: ${elementName}\nVisible: ${visible}`, 'text/plain');
            return visible;
        });
    }

    // Check if element is enabled
    async isElementEnabled(elementName, locator, timeout = 120000) {
        return await allure.step(`Checking if ${elementName} is enabled`, async () => {
            const enabled = await this.page.locator(locator).isEnabled({ timeout });
            allure.attachment('Enabled Check', `Element: ${elementName}\nEnabled: ${enabled}`, 'text/plain');
            return enabled;
        });
    }

    // Assert text in an element
    async verifyText(elementName, locator, expectedText, timeout = 120000) {
        await allure.step(`Verifying text in ${elementName}`, async () => {
            await expect(this.page.locator(locator)).toHaveText(expectedText, { timeout });
            allure.attachment('Text Verification', `Element: ${elementName}\nExpected: '${expectedText}'`, 'text/plain');
        });
    }

    // Click on a radio button
    async selectRadio(elementName, locator, timeout = 120000) {
        await allure.step(`Selecting radio button ${elementName}`, async () => {
            await this.page.locator(locator).check({ timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Selected`, 'text/plain');
        });
    }

    // Click checkbox
    async toggleCheckbox(elementName, locator, timeout = 120000) {
        await allure.step(`Toggling checkbox ${elementName}`, async () => {
            await this.page.locator(locator).click({ timeout });
            allure.attachment('Element Details', `Element: ${elementName}\nAction: Toggled`, 'text/plain');
        });
    }

    // Upload a file
    async uploadFile(elementName, locator, filePath, timeout = 120000) {
        await allure.step(`Uploading file to ${elementName}`, async () => {
            await this.page.locator(locator).setInputFiles(filePath, { timeout });
            allure.attachment('File Upload', `Element: ${elementName}\nFile: ${filePath}`, 'text/plain');
        });
    }

    // Take a screenshot
    async takeScreenshot(fileName) {
        await allure.step(`Taking screenshot: ${fileName}`, async () => {
            await this.page.screenshot({ path: fileName });
            allure.attachment('Screenshot', `File: ${fileName}`, 'text/plain');
        });
    }

    // Handle alerts (accept)
    async acceptAlert() {
        await allure.step(`Accepting alert`, async () => {
            this.page.on('dialog', async dialog => {
                console.log(`Alert: ${dialog.message()}`);
                await dialog.accept();
                allure.attachment('Alert', `Message: ${dialog.message()}\nAction: Accepted`, 'text/plain');
            });
        });
    }

    // Handle alerts (dismiss)
    async dismissAlert() {
        await allure.step(`Dismissing alert`, async () => {
            this.page.on('dialog', async dialog => {
                console.log(`Alert: ${dialog.message()}`);
                await dialog.dismiss();
                allure.attachment('Alert', `Message: ${dialog.message()}\nAction: Dismissed`, 'text/plain');
            });
        });
    }

    // Wait for network requests to finish
    async waitForNetworkIdle(timeout = 120000) {
        await allure.step(`Waiting for network to be idle`, async () => {
            await this.page.waitForLoadState('networkidle', { timeout });
            allure.attachment('Network Idle', `Network is now idle`, 'text/plain');
        });
    }
}

module.exports = PageActions;