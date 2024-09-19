 document.addEventListener('DOMContentLoaded', () => {

 const loginButton = document.getElementById("loginButton");
      const createOne = document.getElementById("createOne");
      const createAccount = document.getElementById("createAccount");
      loginButton.addEventListener("click", (event) => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let usernameError =  document.getElementById("usernameError");
        let passwordError = document.getElementById("passwordError");
        if (username === "") {
          usernameError.innerHTML ="Invalid username";
          setTimeout(() => {
            usernameError.innerHTML ="";
          }, 2000);
          event.preventDefault();
        } else if (password === "") {
          passwordError.innerHTML ="Invalid password";
          setTimeout(() => {
            passwordError.innerHTML ="";
          }, 2000);
          event.preventDefault();
        } else {
          //go where needed
        }
      });

      createOne.addEventListener("click", (event) => {
        // Hide the login form
        document.getElementById("loginForm").style.display = "none";
        // Show the create account form
        document.getElementById("createAccountForm").style.display = "block";
      });

      createAccount.addEventListener("click", (event) => {
        let newUsername = document.getElementById("newUsername").value;
        let newPassword = document.getElementById("newPassword").value;
        let newUsernameError = document.getElementById("newUsernameError");
        let newPasswordError = document.getElementById("newPasswordError");
        if (newUsername === "") {
            newUsernameError.innerHTML ="Invalid username";
            setTimeout(() => {
                newUsernameError.innerHTML ="";
          }, 2000);
          event.preventDefault();
        } else if (newPassword === "") {
            newPasswordError.innerHTML ="Invalid password";
            setTimeout(() => {
                newPasswordError.innerHTML ="";
          }, 2000);
          event.preventDefault();
        } else {
          // Add the following line to set the form type
          document
            .getElementById("createAccountForm")
            .querySelector('input[name="formType"]').value = "createAccount";

          // Submit the form
          document.getElementById("createAccountForm").submit();
        }
      });
    });