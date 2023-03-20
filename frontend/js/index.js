const signup_page = document.getElementById("signup_page");
const signin_page = document.getElementById("signin_page");
const to_signin = document.getElementById("to_signin");
const to_signup = document.getElementById("to_signup");

// Navigiating between signup and signin
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

const register_btn = document.getElementById("register_btn");
const name_signup_input = document.getElementById("name_signup_input");
const email_signup_input = document.getElementById("email_signup_input");
const password_signup = document.getElementById("password_signup_input");
const age_signup_input = document.getElementById("age_signup_input");
const gender_signup_input = document.getElementById("gender_signup_input");
const location_signup_input = document.getElementById("location_signup_input");
const signup_error = document.getElementById("signup_error");

// Fetching signup API
register_btn.addEventListener("click", () => {
  let register_data = new FormData();
  register_data.append("name", name_signup_input.value);
  register_data.append("email", email_signup_input.value);
  register_data.append("password", password_signup.value);
  register_data.append("age", age_signup_input.value);
  register_data.append("gender", gender_signup_input.value);
  register_data.append("location", location_signup_input.value);

  axios({
    method: "post",
    url: "http://localhost:8002/api/auth/register",
    data: register_data,
  }).then((res) => {
    console.log(res.data);
    localStorage.setItem("id", res.data.user.id);
    window.location.href = "./pages/landing.html";
  });
});

const email_signin_input = document.getElementById("email_signin_input");
const password_signin_input = document.getElementById("password_signin_input");
const login_btn = document.getElementById("login_btn");
const signin_error = document.getElementById("signin_error");

login_btn.addEventListener("click", () => {
  let login_data = new FormData();
  login_data.append("email", email_signin_input.value);
  login_data.append("password", password_signin_input.value);

  axios({
    method: "post",
    url: "http://localhost:8002/api/auth/login",
    data: login_data,
  })
    .then((res) => {
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("access_token", res.data.authorisation.token);
      window.location.href = "./pages/landing.html";
    })
    .catch((error) => {
      signin_error.innerHTML = error.response.data.message;
    });
});
