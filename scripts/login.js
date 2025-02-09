// login.js
// Check if a user is already logged in
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  // Redirect to the home page
  window.location.href = "../index.html";
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Retrieve the stored user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    window.location.href = "signup.html";
    return;
  }

  // Validate the entered credentials
  if (email === storedUser.email && password === storedUser.password) {
    // Store logged-in state in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
    const userCartKey = `cart_${email}`;
    const userCart = JSON.parse(localStorage.getItem(userCartKey));
    if (!userCart) {
      localStorage.setItem(userCartKey, JSON.stringify([])); // Initialize an empty cart for new users
    }
    window.location.href = "../index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
