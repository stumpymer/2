const { setupDriver, By, until, takeScreenshot, assert } = require('./setup');

(async function testRegModal() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 5: Проверка модального окна регистрации');
        await driver.get('https://stumpymer.github.io/2/');
        
        // Открытие модального окна
        const regButton = await driver.findElement(By.css('[data-target="#registerModal"]'));
        await regButton.click();
        
        // Ожидание загрузки формы
        await driver.wait(until.elementLocated(By.id('register-form')), 5000);
        
        // Проверка элементов формы
        const emailField = await driver.findElement(By.id('reg-email'));
        const passwordField = await driver.findElement(By.id('reg-password'));
        const submitButton = await driver.findElement(By.css('#register-form button'));
        
        assert.ok(await emailField.isDisplayed(), 'Поле email не отображается');
        assert.ok(await passwordField.isDisplayed(), 'Поле пароля не отображается');
        assert.ok(await submitButton.isDisplayed(), 'Кнопка отправки не отображается');
        
        console.log('Тест-кейс 5 пройден успешно');
        await takeScreenshot(driver, 'reg_modal_passed');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 5:', error.message);
        await takeScreenshot(driver, 'reg_modal_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();