// const  = document.getElementById("");
const signup_page = document.getElementById("signup_page");
const signin_page = document.getElementById("signin_page");
const to_signin = document.getElementById("to_signin");
const to_signup = document.getElementById("to_signup");

to_signin.addEventListener("click", () => {
  signin_page.classList.remove("hide");
  signin_page.classList.add("flex");
  signup_page.classList.remove("flex");
  signup_page.classList.add("hide");
});

to_signup.addEventListener("click", () => {
  signup_page.classList.remove("hide");
  signup_page.classList.add("flex");
  signin_page.classList.remove("flex");
  signin_page.classList.add("hide");
});
