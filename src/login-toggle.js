document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-show-password]').forEach(function(span) {
        span.addEventListener('click', function() {
            const input = span.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                span.textContent = 'Hide Password';
            } else {
                input.type = 'password';
                span.textContent = 'Show Password';
            }
        });
    });
});