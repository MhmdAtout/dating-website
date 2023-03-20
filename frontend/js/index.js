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

const register = document.getElementById("register");
const name_signup_input = document.getElementById("name_signup_input");
const email_signup_input = document.getElementById("email_signup_input");
const password_signup = document.getElementById("password_signup_input");
const age_signup_input = document.getElementById("age_signup_input");
const gender_signup_input = document.getElementById("gender_signup_input");
const location_signup_input = document.getElementById("location_signup_input");
const signup_error = document.getElementById("signup_error");

register.addEventListener("click", () => {
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
