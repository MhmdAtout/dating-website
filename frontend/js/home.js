const home_nav_btn = document.getElementById("home_nav_btn");
const notification_nav_btn = document.getElementById("notification_nav_btn");
const profile_nav_btn = document.getElementById("profile_nav_btn");
const logout_nav_btn = document.getElementById("logout_nav_btn");

const main_page = document.getElementById("main_page");
const notifications_page = document.getElementById("notifications_page");
const message_page = document.getElementById("message_page");
const profile_page = document.getElementById("profile_page");

home_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  main_page.classList.remove("hide");
  main_page.classList.add("flex");
  profile_page.classList.remove("flex");
  profile_page.classList.add("hide");
});
profile_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  profile_page.classList.remove("hide");
  profile_page.classList.add("flex");
  main_page.classList.remove("flex");
  main_page.classList.add("hide");
});
notification_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  message_page.classList.remove("flex");
  message_page.classList.add("hide");
  notifications_page.classList.remove("hide");
  notifications_page.classList.add("flex");
});
