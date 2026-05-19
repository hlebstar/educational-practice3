const today = new Date().toISOString().split('T')[0];
    document.getElementById('desired_date').min = today;
    document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
            
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
            
    const payment_type = document.querySelector('input[name="payment_type"]:checked');
    if (!payment_type) {
    showError('Пожалуйста, выберите тип оплаты');
        return;
}
            
const formData = {
    address: document.getElementById('address').value.trim(),
    contact: document.getElementById('contact').value.trim(),
    service_type: document.getElementById('service_type').value,
    payment_type: payment_type.value,
    desired_date: document.getElementById('desired_date').value,
    desired_time: document.getElementById('desired_time').value
};
            
if (!formData.address || !formData.contact || !formData.service_type || 
    !formData.desired_date || !formData.desired_time) {
    showError('Пожалуйста, заполните все обязательные поля');
    return;
}
            
try {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
});
                
const result = await response.json();
                
    if (result.success) {
        showSuccess('Заявка успешно создана! Перенаправление...');
        setTimeout(() => {
        window.location.href = '/dashboard';
    }, 2000);
    } else {
    showError(result.error || 'Ошибка при создании заявки');
            }
    } catch (error) {
         showError('Ошибка соединения с сервером');
            }
});
        
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
    errorDiv.style.display = 'none';
    }, 5000);
}
        
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
}