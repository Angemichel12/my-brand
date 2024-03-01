document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve the username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate the username and password
    if (username.trim() === "" || password.trim() === "") {
      // If the username or password field is empty, display an alert
      const loginAlert = document.getElementById("login-alert");
      loginAlert.textContent = "Username and password are required!";
      loginAlert.style.display = "block";
    } else if (username !== "Michel@12" || password !== "admin@123") {
      // If the username or password is incorrect, display an alert
      const loginAlert = document.getElementById("login-alert");
      loginAlert.textContent = "Incorrect username or password!";
      loginAlert.style.display = "block";
    } else {
      loginAlert.textContent = "Login Successfull";
      loginAlert.style.display = "block";
      loginAlert.style.backgroundColor = "green";
    }
  });
