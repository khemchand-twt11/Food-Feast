const baseUrl = `https://drab-headscarf-moth.cyclic.app/`;
const form = document.getElementById("form");
const searchValue = null;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  value = form.search_input.value;
  localStorage.setItem("searchQuery", value);
  window.location.href = "../frontend/menu.html";
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

// SIGNUP FUNCTIONALLITY
let signupName = document.getElementById("signup-name");
let signupEmail = document.getElementById("signup-email");

let signupButton = document.querySelector(".signup-btn");

signupButton.addEventListener("click", (e) => {
  let obj = {
    name: signupName.value,
    email: signupEmail.value,
    pass: signupInput.value,
  };

  fetch(`${baseUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});

// CAROUSEL MENU ITEMS SEARCH
const AllMenuItems = document.querySelectorAll(".menu-card");
// console.log(AllMenuItems);

for (const menuItem of AllMenuItems) {
  menuItem.addEventListener("click", () => {
    console.log(menuItem.dataset.name);
    localStorage.setItem("menu-item", menuItem.dataset.name);

    // if (window.location.href.includes("index.html")) {
    window.location.href = "../frontend/menu.html";
    // }
  });
}
