$(document).ready(function() {
    // Массив для хранения зарегистрированных пользователей
    const users = [];

    // Обработка формы регистрации
    $('#register-form').on('submit', function(event) {
        event.preventDefault();
        const email = $('#reg-email').val();
        const password = $('#reg-password').val();

        // Проверка, существует ли уже пользователь с таким email
        const existingUser  = users.find(user => user.email === email);
        if (existingUser ) {
            alert('Пользователь с таким email уже зарегистрирован.');
            return;
        }

        // Добавление нового пользователя в массив
        users.push({ email, password });
        alert(`Регистрация успешна!\nEmail: ${email}`);
        $('#registerModal').modal('hide');
        $(this).trigger('reset');
    });

    // Обработка формы авторизации
    $('#auth-form').on('submit', function(event) {
        event.preventDefault();
        const email = $('#auth-email').val();
        const password = $('#auth-password').val();

        // Поиск пользователя в массиве
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert(`Авторизация успешна!\nEmail: ${email}`);
            $('#authModal').modal('hide');
            $(this).trigger('reset');
        } else {
            alert('Неверный email или пароль. Пожалуйста, проверьте введенные данные.');
        }
    });
});
