document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        login: document.getElementById('login').value,
        password: document.getElementById('password').value,
        full_name: document.getElementById('full_name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('success').textContent = 'Регистрация успешна! Перенаправление...';
            document.getElementById('success').style.display = 'block';
            document.getElementById('error').style.display = 'none';
            setTimeout(() => window.location.href = '/login', 1500);
        } else {
            document.getElementById('error').textContent = result.error;
            document.getElementById('error').style.display = 'block';
            document.getElementById('success').style.display = 'none';
        }
    } catch (error) {
        document.getElementById('error').textContent = 'Ошибка соединения с сервером';
        document.getElementById('error').style.display = 'block';
    }
});