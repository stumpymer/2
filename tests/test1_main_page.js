const { setupDriver, takeScreenshot, By, assert } = require('./setup');

(async function testMainPageLoad() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 1: Проверка загрузки главной страницы');
        await driver.get('https://stumpymer.github.io/2/'); // Или ваш URL
        
        // Проверка заголовка страницы
        const title = await driver.getTitle();
        assert.ok(title.includes('Черномор'), `Неверный заголовок страницы: ${title}`);
        
        // Проверка видимости логотипа (используем правильный селектор)
        const logo = await driver.findElement(By.css('.logo')); // Или By.id(), если у логотипа есть id
        assert.ok(await logo.isDisplayed(), 'Логотип не отображается');
        
        console.log('Тест-кейс 1 пройден успешно');
        await takeScreenshot(driver, 'main_page_loaded');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 1:', error.message);
        await takeScreenshot(driver, 'main_page_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();