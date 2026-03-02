const phoneInput = document.querySelector('input[name="phone"]');
IMask(phoneInput, {
    mask: '+{7} (000) 000-00-00'
});

const form = document.getElementById('appointment-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function() {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
});

setTimeout(function() {
    const successAlert = document.getElementById('success-alert');
    const errorAlert = document.getElementById('error-alert');

    if (successAlert) {
        successAlert.style.transition = 'opacity 0.5s';
        successAlert.style.opacity = '0';
        setTimeout(() => successAlert.remove(), 500);
    }

    if (errorAlert) {
        errorAlert.style.transition = 'opacity 0.5s';
        errorAlert.style.opacity = '0';
        setTimeout(() => errorAlert.remove(), 500);
    }
}, 2000);