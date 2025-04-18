const { exec } = require('child_process');

const tests = [
    'node tests/test1_main_page.js',
    'node tests/test2_navigation.js',
    'node tests/test3_services.js',
    'node tests/test4_auth_modal.js',
    'node tests/test5_reg_modal.js',
    'node tests/test6_registration.js',
    'node tests/test7_auth.js'
];

function runTest(index) {
    if (index >= tests.length) {
        console.log('Все тесты завершены');
        return;
    }

    console.log(`Запуск: ${tests[index]}`);
    const testProcess = exec(tests[index]);

    testProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    testProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    testProcess.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Тест завершился с ошибкой (код ${code})`);
        }
        runTest(index + 1);
    });
}

runTest(0);