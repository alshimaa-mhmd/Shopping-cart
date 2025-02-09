// signup.js
// Check if a user is already logged in
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  // Redirect to the home page
  window.location.href = "../index.html";
}


document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Store the user's data in localStorage
    const user = { fullName, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
      // Initialize an empty cart for the new user
      const userCartKey = `cart_${email}`;
      localStorage.setItem(userCartKey, JSON.stringify([]));

      window.location.href = "../index.html";

  });


  