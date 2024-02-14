// login functionality and shit i dont like js

document.getElementById('loginForm').addEventListener('submit', function(event)
{
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password  = document.getElementById('password').value;
    var rememberMe  = document.getElementById('rememberMe').checked;

    // Check if user is registered
    var registeredUser = localStorage.getItem(username);
    if (registeredUser == null)
    {
        alert('User is not registered');
        return;
    }

    // Check if password is false
    var registeredPassword = localStorage.getItem(username + '_password');
    if(password !== registeredPassword)
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
    localStorage.setItem(emailOrPhone, emailOrPhone);
    localStorage.setItem(emailOrPhone + '_password', newPassword);

    alert('Registration successful');

    // Close the modal
    $('#registerModal').modal('hide');
});