// login.js
/*

  I have been lied to, this JS folder does not and will not affect
  any handlebar files that we have, rendering the JS files useless.

  ! DON'T REMOVE THE /js FOLDER in /Public THOUGH UNTIL WE ARE CERTAIN THEY HAVE NO USE !


*/

$(document).ready(function() {
    // Function to handle form submission
    $("#loginForm").submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the values from the form fields
      var email = $("#email").val();
      var password = $("#password").val();
      var rememberMe = $("#rememberMe").is(":checked");
  
      // Send the login request to the server
      $.ajax({
        url: "/login",
        type: "POST",
        data: {
            email: email,
          password: password,
          rememberMe: rememberMe
        },
        success: function(response) {
          console.log("Login successful!"); // Handle successful login response
          window.location.href = "../views/feed.hbs"; // Replace with actual dashboard URL
        },
        error: function(xhr, status, error) {    
          console.error("Login failed:", error); // Handle login error
          alert("Login failed. Please check your credentials and try again."); // Display an error message to the user
        }
      });
    });
  });
  