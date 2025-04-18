const { setupDriver, By, until, takeScreenshot, assert } = require('./setup');

(async function testRegistration() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 6: Проверка успешной регистрации');
        await driver.get('https://stumpymer.github.io/2/');
        
        // Открытие формы регистрации
        const regButton = await driver.findElement(By.css('[data-target="#registerModal"]'));
        await regButton.click();
        await driver.wait(until.elementLocated(By.id('register-form')), 5000);
        
        // Генерация уникального email
        const timestamp = Date.now();
        const testEmail = `testuser_${timestamp}@example.com`;
        const testPassword = 'Test1234!';
        
        // Заполнение формы
        await driver.findElement(By.id('reg-email')).sendKeys(testEmail);
        await driver.findElement(By.id('reg-password')).sendKeys(testPassword);
        await driver.findElement(By.css('#register-form button')).click();
        
        // Проверка успешной регистрации
        await driver.wait(until.alertIsPresent(), 5000);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        
        assert.ok(alertText.includes('Регистрация успешна'), 'Нет сообщения об успешной регистрации');
        await alert.accept();
        
        console.log('Тест-кейс 6 пройден успешно');
        await takeScreenshot(driver, 'registration_passed');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 6:', error.message);
        await takeScreenshot(driver, 'registration_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();