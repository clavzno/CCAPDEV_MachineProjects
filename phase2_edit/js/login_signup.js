// TEST FILE , will change soon
$(document).ready(function() 
{
    // Login form -- backend for login.html 
    $("#loginForm").submit(function(event) {
      event.preventDefault(); 
  
      // Store both data in variable to make it easier to access
      const username = $("#emailusername").val();
      const password = $("#password").val();

      if(username === "" || password === "") 
      {
        alert("Please fill in all fields!!!");
        return;
      }
  
      // Send login data (username and password) to server using AJAX
      $.ajax({
        url: "/login", // Replace with your server-side login route
        method: "POST",
        data: {
          username: username,
          password: password
        },
        success: function(response) {
          // Handle successful login response (e.g., redirect to forum feed)
          console.log("Login successful:", response);
          // Replace with your logic for successful login (redirect, etc.)
        },
        error: function(error) {
          // Handle login error (e.g., display error message)
          console.error("Login error:", error);
          // Replace with your logic for login error (display message)
        }
      });
    });
  
    // Signup form handling (similar approach)
    $("#signupForm").submit(function(event) {
      event.preventDefault();
  
      const firstName = $("#firstName").val();
      const lastName = $("#lastName").val();
      const username = $("#signupUsername").val();
      const email = $("#signupEmail").val();
      const password = $("#signupPassword").val();
      const confirmPassword = $("#confirmPassword").val();
  
        // Basic validation (check for empty fields and password match)
        if(firstName === "" || lastName === "" || 
            username === "" || email === "" || 
            password === "" || confirmPassword === ""){
            alert("Please fill in all fields!");
            return; 
        }
        if(password != confirmPassword){
            alert("Passwords do not match!");
            return; // Exit the function if passwords don't match
        }
  
      // Send signup data to server using AJAX
      $.ajax({
        url: "/signup", // Replace with your server-side signup route
        method: "POST",
        data: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        },
        success: function(response) {
          // Handle successful signup response (e.g., display success message)
          console.log("Signup successful:", response);
          alert("Signup successful! Please login.");
          $("#signupForm").trigger("reset"); // Clear the signup form
        },
        error: function(error) {
          // Handle signup error (e.g., display error message)
          console.error("Signup error:", error);
          $("#signupError").text(error.responseText || "Signup failed!"); // Display error message
        }
      });
    });
  
    // Password visibility toggle (optional)
    $(".show-password").click(function() {
      const passwordInput = $(this).siblings("input[type='password']");
      if (passwordInput.attr("type") === "password") {
        passwordInput.attr("type", "text");
        $(this).text("Hide Password");
      } else {
        passwordInput.attr("type", "password");
        $(this).text("Show Password");
      }
    });
  });