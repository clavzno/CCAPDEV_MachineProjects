// signup.js

$(document).ready(function() {
    // Function to handle form submission
    $("#signupForm").submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the values from the form fields
      var firstName = $("#firstName").val();
      var lastName = $("#lastName").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirmPassword").val();
      var emailOrUsername = $("#emailusername").val();
      var birthdate = $("#birthdate").val();
      var gender = $("#gender").val();
  
      // Perform validation here if needed
  
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
  
      // Send the signup request to the server
      $.ajax({
        url: "/signup", // Replace this with your actual signup endpoint
        type: "POST",
        data: {
          firstName: firstName,
          lastName: lastName,
          password: password,
          emailOrUsername: emailOrUsername,
          birthdate: birthdate,
          gender: gender
        },
        success: function(response) {
          // Handle successful signup response
          console.log("Signup successful!");
          // Redirect the user to the login page or another page
          window.location.href = "login.html"; // Replace "/login" with your actual login page URL
        },
        error: function(xhr, status, error) {
          // Handle signup error
          console.error("Signup failed:", error);
          // Display an error message to the user
          alert("Signup failed. Please try again.");
        }
      });
    });
  });
  