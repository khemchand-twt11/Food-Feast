const baseUrl = `https://drab-headscarf-moth.cyclic.app/`;
const form = document.getElementById("form");
const searchValue = null;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  value = form.search_input.value;
  localStorage.setItem("searchQuery", value);
  window.location.href = "/menu.html";
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

signupButton.addEventListener("click", () => {
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
    .then((data) => {
      alert(data.msg);

      if (data.msg == "user registered successfully!") {
        signupModal.classList.remove("toggle-signup");
        overlay.style.display = "none";
        Swal.fire({
          title: "Done!",
          text: "User Registerd Successfully!",
          icon: "success",
          customClass: {
            title: "my-title-class",
            content: "my-content-class",
            icon: "icon-success",
            confirmButton: "my-confirm-button-class",
          },
        });
        setTimeout(() => {
          loginModal.classList.add("toggle-login");
          overlay.style.display = "block";
        }, 2000);
      }
    });
});

// LOGIN FUNCTIONALLITY
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("password-input");
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
  let obj = {
    email: loginEmail.value,
    pass: loginPassword.value,
  };
  fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.msg == "Login Successful") {
        localStorage.setItem("token", data.token);
        loginModal.classList.remove("toggle-login");
        overlay.style.display = "none";

        Swal.fire({
          title: "Done!",
          text: "Login Successfull!",
          icon: "success",
          customClass: {
            title: "my-title-class",
            content: "my-content-class",
            icon: "icon-success",
            confirmButton: "my-confirm-button-class",
          },
        });
      }
    });
});

// CAROUSEL MENU ITEMS SEARCH
const AllMenuItems = document.querySelectorAll(".menu-card");
// console.log(AllMenuItems);

for (const menuItem of AllMenuItems) {
  menuItem.addEventListener("click", () => {
    console.log(menuItem.dataset.name);
    localStorage.setItem("menu-item", menuItem.dataset.name);

    // if (window.location.href.includes("index.html")) {
    window.location.href = "menu.html";
    // }
  });
}
