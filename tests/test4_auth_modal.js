const { setupDriver, By, until, takeScreenshot, assert } = require('./setup');

(async function testAuthModal() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 4: Проверка модального окна авторизации');
        await driver.get('https://stumpymer.github.io/2/'); // Убедитесь что это правильный URL
        
        // Открытие модального окна
        const authButton = await driver.findElement(By.css('[data-target="#authModal"]'));
        await authButton.click();
        
        // Ожидание загрузки формы
        await driver.wait(until.elementLocated(By.id('auth-form')), 5000);
        
        // Проверка элементов формы
        const emailField = await driver.findElement(By.id('auth-email'));
        const passwordField = await driver.findElement(By.id('auth-password'));
        const submitButton = await driver.findElement(By.css('#auth-form button'));
        
        assert.ok(await emailField.isDisplayed(), 'Поле email не отображается');
        assert.ok(await passwordField.isDisplayed(), 'Поле пароля не отображается');
        assert.ok(await submitButton.isDisplayed(), 'Кнопка отправки не отображается');
        
        // Проверка валидации (адаптировано под вашу форму)
        await submitButton.click();
        
        try {
            // Вариант 1: Проверка появления сообщения об ошибке (если оно есть)
            const emailError = await driver.wait(until.elementLocated(
                By.css('#auth-email + .error-message, .invalid-feedback, [role="alert"]')), 
                2000
            );
            assert.ok(await emailError.isDisplayed(), 'Сообщение об ошибке не отображается');
        } catch (e) {
            // Вариант 2: Проверка атрибута invalid (если используется HTML5 валидация)
            const isInvalid = await emailField.getAttribute('aria-invalid');
            assert.equal(isInvalid, 'true', 'Поле email не помечено как невалидное');
        }
        
        console.log('Тест-кейс 4 пройден успешно');
        await takeScreenshot(driver, 'auth_modal_passed');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 4:', error.message);
        await takeScreenshot(driver, 'auth_modal_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();