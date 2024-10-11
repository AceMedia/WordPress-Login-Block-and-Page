document.addEventListener('DOMContentLoaded', function() {
    const toggleText = document.getElementById('togglePassword');
    let password = document.getElementById('login-password');

    if (toggleText && password) { // Check if elements exist
        /* Event fired when the element is clicked */
        toggleText.addEventListener('click', function() {
            if (password.type === "password") {
                password.type = "text";
                toggleText.textContent = "Hide Password";
            } else {
                password.type = "password";
                toggleText.textContent = "Show Password";
            }
        });
    }
});
