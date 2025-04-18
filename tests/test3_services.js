const { setupDriver, By, takeScreenshot, assert } = require('./setup');

(async function testServicesDisplay() {
    const driver = await setupDriver();
    try {
        console.log('Запуск Тест-кейса 3: Проверка отображения услуг');
        await driver.get('https://stumpymer.github.io/2/#services'); // Убедитесь что это правильный URL
        
        // Ждем загрузки раздела
        await driver.wait(until.elementLocated(By.css('#services h2')), 5000);
        
        // Проверка заголовка раздела
        const sectionTitle = await driver.findElement(By.css('#services h2'));
        assert.equal(await sectionTitle.getText(), 'Услуги', 'Неверный заголовок раздела');
        
        // Проверка карточек услуг (используем правильные селекторы из вашего HTML)
        const services = await driver.findElements(By.css('.service'));
        assert.ok(services.length >= 3, 'Не все услуги отображаются');
        
        for (const service of services) {
            // Название услуги
            const title = await service.findElement(By.css('h3')).getText();
            assert.ok(title, 'Отсутствует название услуги');
            
            // Описание услуги
            const description = await service.findElement(By.css('p:not(.price)')).getText();
            assert.ok(description, 'Отсутствует описание услуги');
            
            // Цена (используем класс .price или другой селектор из вашего HTML)
            const priceElement = await service.findElement(By.css('p:last-child'));
            const price = await priceElement.getText();
            assert.ok(price.includes('руб'), `Неверный формат цены: ${price}`);
            
            // Изображение
            const image = await service.findElement(By.css('img'));
            assert.ok(await image.isDisplayed(), 'Изображение не отображается');
        }
        
        console.log('Тест-кейс 3 пройден успешно');
        await takeScreenshot(driver, 'services_displayed');
    } catch (error) {
        console.error('Ошибка в Тест-кейсе 3:', error.message);
        await takeScreenshot(driver, 'services_error');
        throw error;
    } finally {
        await driver.quit();
    }
})();