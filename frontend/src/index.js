const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = form.search_input.value;
  console.log(value);
});

//SHOW PASSWORD FOR LOGIN
const passwordInput = document.getElementById("password-input");
const showPasswordCheckbox = document.getElementById("show-password-checkbox");

showPasswordCheckbox.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
//SHOW PASSWORD FOR SIGNUP
const signupInput = document.getElementById("signupInput");
const signupPassCheckbox = document.getElementById("signupPassCheckbox");

signupPassCheckbox.addEventListener("change", function () {
  if (this.checked) {
    signupInput.type = "text";
  } else {
    signupInput.type = "password";
  }
});

// LOGIN BUTTON
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const signupBtn = document.getElementById("signup-btn");

const signupModal = document.querySelector(".signup-modal");

loginBtn.addEventListener("click", () => {
  loginModal.classList.add("toggle-login");
  overlay.style.display = "block";
});
//CROSS
const cross = document.querySelector(".cross");

cross.addEventListener("click", () => {
  loginModal.classList.remove("toggle-login");
  overlay.style.display = "none";
});

signupBtn.addEventListener("click", () => {
  signupModal.classList.add("toggle-signup");
  overlay.style.display = "block";
});
const overlay = document.getElementById("overlay");
overlay.addEventListener("click", () => {
  signupModal.classList.remove("toggle-signup");
  loginModal.classList.remove("toggle-login");
  overlay.style.display = "none";
});

// animation
