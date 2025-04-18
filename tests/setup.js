const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

// Настройка драйвера
async function setupDriver() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
    return driver;
}

// Утилиты для тестов
async function takeScreenshot(driver, name) {
    const image = await driver.takeScreenshot();
    require('fs').writeFileSync(`screenshot-${name}.png`, image, 'base64');
}

module.exports = { setupDriver, takeScreenshot, By, until, assert };