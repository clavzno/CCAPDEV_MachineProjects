// login functionality and shit i dont like js

document.getElementById('loginForm').addEventListener('submit', function(event)
{
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password  = document.getElementById('password').value;
    var rememberMe  = document.getElementById('rememberMe').value;

    // Check if user is registered
    var registeredUser = localStorage.getItem('username');
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