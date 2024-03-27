// login.js
/*


  ! DON'T REMOVE THE /js FOLDER in /Public THOUGH UNTIL WE ARE CERTAIN THEY HAVE NO USE !
                          I might cook.. 


*/

$(document).ready(function() {
    // Function to handle form submission
    $("#loginForm").submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the values from the form fields
      var username = $("#username").val();
      var password = $("#password").val();
      var rememberMe = $("#rememberMe").is(":checked");
  
      // Send the login request to the server
      $.ajax({
        url: "/login",
        type: "POST",
        data: {
            username: username,
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