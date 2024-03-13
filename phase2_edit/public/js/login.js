// login.js

$(document).ready(function() {
    // Function to handle form submission
    $("#loginForm").submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the values from the form fields
      var email = $("#email").val();
      var password = $("#password").val();
      var rememberMe = $("#rememberMe").is(":checked");
  
      // Perform validation here if needed
  
      // Send the login request to the server
      $.ajax({
        url: "/login", // Replace this with your actual login endpoint
        type: "POST",
        data: {
            email: email,
          password: password,
          rememberMe: rememberMe
        },
        success: function(response) {
          // Handle successful login response
          console.log("Login successful!");
          // Redirect the user to the dashboard or another page
          window.location.href = "/feed"; // Replace "/dashboard" with your actual dashboard URL
        },
        error: function(xhr, status, error) {
          // Handle login error
          console.error("Login failed:", error);
          // Display an error message to the user
          alert("Login failed. Please check your credentials and try again.");
        }
      });
    });
  });
  