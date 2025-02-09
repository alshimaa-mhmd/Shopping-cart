// logout.js
// Check if a user is logged in

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(loggedInUser);
if (!loggedInUser) {
  // Redirect to the login page
  window.location.href = "login.html";
  console.log(loggedInUser);
} else {
  document.querySelector('#logout').innerHTML = `
    <h1>Goodbye, ${loggedInUser.fullName.split(" ")[0]}! 👋</h1>
    <p>You have successfully logged out.</p>
    <a href="login.html">Go back to Login Page</a>
  `};

// Clear user data from localStorage
localStorage.removeItem("loggedInUser");

// Optionally, display a console message for debugging
console.log("User logged out successfully.");
