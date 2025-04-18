const { setupDriver, By, takeScreenshot, assert } = require('./setup');

(async function testNavigationMenu() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 2: Проверка навигационного меню');
        await driver.get('https://stumpymer.github.io/2/');
        
        const menuItems = await driver.findElements(By.css('.nav-list li a'));
        assert.ok(menuItems.length > 0, 'Меню не найдено');
        
        const expectedLinks = ['Главная', 'Услуги', 'Галерея', 'О нас', 'Контакты', 'Онлайн-запись'];
        
        for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];
            const text = await item.getText();
            if (expectedLinks.includes(text)) {
                await item.click();
                await driver.sleep(1000); // Пауза для загрузки
                console.log(`Успешный переход: ${text}`);
                await driver.navigate().back();
                await driver.sleep(500);
            }
        }
        
        console.log('Тест-кейс 2 пройден успешно');
        await takeScreenshot(driver, 'navigation_passed');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 2:', error.message);
        await takeScreenshot(driver, 'navigation_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();