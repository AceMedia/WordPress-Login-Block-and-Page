// ace-login-toggle.js
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector('#ace-show-password');
    const passwordInput = document.querySelector('#ace-login-password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('change', function() {
            if (togglePassword.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }
});
