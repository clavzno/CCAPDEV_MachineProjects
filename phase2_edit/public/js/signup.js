// signup.js
/*

  I have been lied to, this JS folder does not and will not affect
  any handlebar files that we have, rendering the JS files useless.

  ! DON'T REMOVE THE /js FOLDER in /Public THOUGH UNTIL WE ARE CERTAIN THEY HAVE NO USE !


*/

$(document).ready(function() {
    // Function to handle form submission
    $("#signupForm").submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the values from the form fields
      var firstName = $("#firstName").val();
      var lastName = $("#lastName").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirmPassword").val();
      var email = $("#email").val();
      var birthdate = $("#birthdate").val();
      var gender = $("#gender").val();
  
      // Perform validation here if needed
  
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      console.log({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        birthdate: birthdate,
        gender: gender
      });
  
      // Send the signup request to the server
      $.ajax({
        url: "/signup",
        type: "POST",
        data: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
          birthdate: birthdate,
          gender: gender
        }),
        contentType: 'application/json',
        processData: true,
        success: function(response) { // Successful signup response
          console.log("Signup successful!");
          window.location.href = "./views/login.hbs";// Redirect the user to the login page or another page
        },
        error: function(xhr, status, error) { // Signup error
          console.error("Signup failed:", error);
          alert("Signup failed. Please try again."); // Display an error message to the user
        }
      });
    });
  });
  