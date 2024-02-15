document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var emailOrPhone = document.getElementById('emailOrPhone').value;

    // Validate the emailOrPhone as an email address or phone number
    var isEmail = emailOrPhone.includes('@') && emailOrPhone.includes('.com');
    var isPhoneNumber = /^\d+$/.test(emailOrPhone);
    if (!isEmail && !isPhoneNumber) {
        alert('Please enter a valid email address or phone number');
        return;
    }

    // Check if user is registered
    var registeredUser = JSON.parse(localStorage.getItem(emailOrPhone));
    if (registeredUser == null) {
        alert('User is not registered');
        return;
    }

    // Redirect to reset password page
    window.location.href = 'reset_password.html';
});

function goBack() {
    window.history.back();
}