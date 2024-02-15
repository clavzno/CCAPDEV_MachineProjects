// login functionality basically
document.getElementById('loginForm').addEventListener('submit', function(event)
{
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password  = document.getElementById('password').value;
    var rememberMe  = document.getElementById('rememberMe').checked;

    // Validate the username as an email address or phone number
    var isEmail = username.includes('@') && username.includes('.com');
    var isPhoneNumber = /^\d+$/.test(username); // <- checks if input is a number, js moment
    if (!isEmail && !isPhoneNumber) {
        alert('Please enter a valid email address or phone number');
        return;
    }

    // Check if user is registered
    var registeredUser = JSON.parse(localStorage.getItem(username));
    if (registeredUser == null)
    {
        alert('User is not registered');
        return;
    }

    // Check if password is false
    if(password !== registeredUser.password)
    {
        alert('Incorrect Password');
        return;
    }

    // Log user in
    localStorage.setItem('loggedInUser', username);

    // "remember me" option
    if (rememberMe) 
    {
        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 21); // 3 weeks from now
        localStorage.setItem('expiryDate', expiryDate.toString());
    } 
    else 
    {
        localStorage.removeItem('expiryDate');
    } alert('Login successful');
});

// Registration functionality
document.getElementById('registerForm').addEventListener('submit', function(event)
{
    event.preventDefault();

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var emailOrPhone = document.getElementById('emailOrPhone').value;
    var newPassword = document.getElementById('newPassword').value;
    var birthdate = document.getElementById('birthdate').value;
    var gender = document.getElementById('gender').value;

    // Register the user
    var user = {
        username: emailOrPhone,
        password: newPassword,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        gender: gender
    };
    localStorage.setItem(emailOrPhone, JSON.stringify(user));

    alert('Registration successful');

    // Close the modal
    $('#registerModal').modal('hide');
});

function submitRegisterForm() {
    var registerForm = document.getElementById('registerForm');
    var event = new Event('submit', {
        bubbles: true,
        cancelable: true
    });
    registerForm.dispatchEvent(event);
}