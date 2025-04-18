const { setupDriver, By, until, takeScreenshot, assert } = require('./setup');

(async function testAuth() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 7: Проверка успешной авторизации');
        
        // Сначала регистрируем тестового пользователя
        await driver.get('https://stumpymer.github.io/2/');
        const regButton = await driver.findElement(By.css('[data-target="#registerModal"]'));
        await regButton.click();
        await driver.wait(until.elementLocated(By.id('register-form')), 5000);
        
        const testEmail = `testuser_${Date.now()}@example.com`;
        const testPassword = 'Test1234!';
        
        await driver.findElement(By.id('reg-email')).sendKeys(testEmail);
        await driver.findElement(By.id('reg-password')).sendKeys(testPassword);
        await driver.findElement(By.css('#register-form button')).click();
        await driver.wait(until.alertIsPresent(), 5000);
        await (await driver.switchTo().alert()).accept();
        
        // Теперь тестируем авторизацию
        const authButton = await driver.findElement(By.css('[data-target="#authModal"]'));
        await authButton.click();
        await driver.wait(until.elementLocated(By.id('auth-form')), 5000);
        
        await driver.findElement(By.id('auth-email')).sendKeys(testEmail);
        await driver.findElement(By.id('auth-password')).sendKeys(testPassword);
        await driver.findElement(By.css('#auth-form button')).click();
        
        // Проверка успешной авторизации
        await driver.wait(until.alertIsPresent(), 5000);
        const authAlert = await driver.switchTo().alert();
        const authAlertText = await authAlert.getText();
        
        assert.ok(authAlertText.includes('Авторизация успешна'), 'Нет сообщения об успешной авторизации');
        await authAlert.accept();
        
        console.log('Тест-кейс 7 пройден успешно');
        await takeScreenshot(driver, 'auth_passed');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 7:', error.message);
        await takeScreenshot(driver, 'auth_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();