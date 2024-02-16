document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var newPassword = document.getElementById('newPassword').value;

    // Validate the new password
    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    // Update the user's password
    var emailOrPhone = localStorage.getItem('emailOrPhone');
    var registeredUser = JSON.parse(localStorage.getItem(emailOrPhone));
    if (registeredUser === null) {
        alert('No user registered with this email or phone number');
        return;
    }
    
    registeredUser.password = newPassword;
    localStorage.setItem(emailOrPhone, JSON.stringify(registeredUser));

    alert('Your password has been reset successfully');

    // Redirect to login page
    console.log('Redirecting to login.html');
    window.location.href = 'login.html';
});

function goBack() {
    window.history.back();
}