const home_nav_btn = document.getElementById("home_nav_btn");
const notification_nav_btn = document.getElementById("notification_nav_btn");
const profile_nav_btn = document.getElementById("profile_nav_btn");
const logout_nav_btn = document.getElementById("logout_nav_btn");

const main_page = document.getElementById("main_page");
const notifications_page = document.getElementById("notifications_page");
const message_page = document.getElementById("message_page");
const profile_page = document.getElementById("profile_page");

const chat_list = document.getElementById("chat_list");

const user_id = localStorage.getItem("id");
const baseURL = "http://localhost:8002/api";

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

const users_list = document.getElementById("users_list");
axios({
  method: "get",
  url: `${baseURL}/user/allUsers/${user_id}`,
}).then((res) => {
  let users = res.data.users;
  users.forEach((user) => {
    users_list.innerHTML += `
    <div class="user-card">
              <div class="user-main-info flex column jc-center ai-center">
                <div class="user-image">
                  <img class="user-image" src="" alt="" />
                </div>
                <div class="user-name flex jc-center ai-center">
                  <h3>${user.name}</h3>
                </div>
              </div>
              <div class="user-other-info flex column jc-center ai-center">
                <div class="user-age">
                  <p>${user.age}</p>
                </div>
                <div class="user-location">
                  <p>${user.location}</p>
                </div>
              </div>
              <div class="card-actions flex column jc-se ai-center">
                <div class="message flex">
                  <button class="message_user_btn" value="${user.id}">Message</button>
                </div>
                <div class="flex ai-center jc-center">
                  <div class="follow">
                    <button value="${user.id}">Follow</button>
                  </div>
                  <div class="block">
                    <button value="${user.id}">Block</button>
                  </div>
                </div>
              </div>
    </div>
    `;
  });
  const message_user_btn = document.querySelectorAll(".message_user_btn");
  message_user_btn.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      notifications_page.classList.remove("flex");
      notifications_page.classList.add("hide");
      message_page.classList.remove("hide");
      message_page.classList.add("flex");

      let message_data = new FormData();
      message_data.append("sender_id", button.value);
      message_data.append("recepient_id", user_id);

      axios({
        method: "post",
        url: `${baseURL}/actions/getMesaage`,
        data: message_data,
      }).then((res) => {
        let messages = res.data.response;
        const receiverName = users.find((user) => user.id == button.value).name;
        const receiver_name = document.getElementById("receiver_name");
        receiver_name.innerText = receiverName;
        messages.forEach((message) => {
          console.log(message);
          if (message.sender_id == user_id) {
            chat_list.innerHTML += `
            <div class="sent-message">
              <p>${message.content}</p>
            </div>
            `;
          } else {
            chat_list.innerHTML += `
            <div class="received-message">
              <p>${message.content}</p>
            </div>`;
          }
        });
      });
    });
  });
});
