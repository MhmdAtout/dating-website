const home_nav_btn = document.getElementById("home_nav_btn");
const notification_nav_btn = document.getElementById("notification_nav_btn");
const profile_nav_btn = document.getElementById("profile_nav_btn");
const logout_nav_btn = document.getElementById("logout_nav_btn");

const main_page = document.getElementById("main_page");
const notifications_page = document.getElementById("notifications_page");
const message_page = document.getElementById("message_page");
const profile_page = document.getElementById("profile_page");

const chat_list = document.getElementById("chat_list");
const notification_section = document.getElementById("notification_section");

const display_profile = document.getElementById("display_profile");

const user_id = localStorage.getItem("id");
const baseURL = "http://localhost:8003/api";

home_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  main_page.classList.remove("hide");
  main_page.classList.add("flex");
  profile_page.classList.remove("flex");
  profile_page.classList.add("hide");
  notification_nav_btn.classList.remove("hide");
});
profile_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  profile_page.classList.remove("hide");
  profile_page.classList.add("flex");
  main_page.classList.remove("flex");
  main_page.classList.add("hide");
  notification_nav_btn.classList.add("hide");
});
notification_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  message_page.classList.remove("flex");
  message_page.classList.add("hide");
  notifications_page.classList.remove("hide");
  notifications_page.classList.add("flex");
});
logout_nav_btn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "../index.html";
});

axios({
  method: "get",
  url: `${baseURL}/user/${user_id}`,
}).then((res) => {
  let me = res.data.user;
  display_profile.innerHTML = `
        <div class="profile-img">
            <img class="profile-img" src="" alt="" />
          </div>
          <div class="username">
            <h1>${me.name}</h1>
          </div>
          <div class="user-info flex column jc-center ai-center">
            <p>${me.age} yo</p>
            <p id="user_location" class="">${me.location}</p>
            <p id="user_bio" class="">${me.bio}</p>
            <input id="edit_location_input" class="location hide" type="text" placeholder="location" />
            <input id="edit_bio_input" class="bio hide" type="text" placeholder="bio" />
            <p class="">${me.email}</p>
          </div>
          <button id="edit_user">Edit</button>
  `;
  const edit_user = document.getElementById("edit_user");
  const edit_bio_input = document.getElementById("edit_bio_input");
  const edit_location_input = document.getElementById("edit_location_input");
  const user_location = document.getElementById("user_location");
  const user_bio = document.getElementById("user_bio");
  edit_user.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(edit_user.innerText);
    if (edit_user.innerText == "Edit") {
      user_location.classList.add("hide");
      user_bio.classList.add("hide");
      edit_location_input.classList.remove("hide");
      edit_bio_input.classList.remove("hide");
      edit_user.innerText = "Save";
    } else {
      user_location.classList.remove("hide");
      user_bio.classList.remove("hide");
      edit_location_input.classList.add("hide");
      edit_bio_input.classList.add("hide");
      edit_user.innerText = "Edit";

      let updata_data = new FormData();
      let new_location_value;
      let new_bio_value;

      if (edit_location_input.value === "") {
        new_location_value = user_location.innerText;
      } else {
        new_location_value = edit_location_input.value;
      }
      if (edit_bio_input.value === "") {
        new_bio_value = user_bio.innerText;
      } else {
        new_bio_value = edit_bio_input.value;
      }
      console.log(new_location_value);
      console.log(new_bio_value);
      updata_data.append("id", user_id);
      updata_data.append("location", new_location_value);
      updata_data.append("bio", new_bio_value);

      axios({
        method: "post",
        url: `${baseURL}/user/update`,
        data: updata_data,
      });
    }
  });
});

const my_following_list = document.getElementById("my_following_list");
const my_followers_list = document.getElementById("my_followers_list");
const my_blocks_list = document.getElementById("my_blocks_list");

axios({
  method: "post",
  url: `${baseURL}/actions/following`,
  data: {
    follower_id: user_id,
  },
}).then((res) => {
  let follow_data = res.data.response;
  console.log(follow_data);
  follow_data.forEach((data) => {
    if (data.follower_id == user_id) {
      my_following_list.innerHTML += `
                <div class="other-card">
                  <p>${data.followed.name}</p>
                </div>
        `;
    } else {
      my_followers_list.innerHTML += `
                    <div class="other-card">
                      <p>${data.follower.name}</p>
                    </div>
        `;
    }
  });
});

axios({
  method: "post",
  url: `${baseURL}/actions/blocks`,
  data: {
    blocker_id: user_id,
  },
}).then((res) => {
  let block_data = res.data.response;
  block_data.forEach((data) => {
    my_blocks_list.innerHTML += `
            <div class="other-card">
                <p>${data.blocked.name}</p>
              </div>
    `;
  });
});

axios({
  method: "get",
  url: `${baseURL}/user/notification/${user_id}`,
}).then((res) => {
  let follow_notf = res.data.follows;
  let block_notf = res.data.blocks;
  follow_notf.forEach((follow) => {
    notification_section.innerHTML += `
        <div class="notifocation-card">   
            <p>
                <span class="txt-blue bold">${follow.follower.name}</span> started
                following you.
              </p>
        </div>
    `;
  });
  block_notf.forEach((block) => {
    notification_section.innerHTML += `
        <div class="notifocation-card">   
            <p>
                <span class="txt-blue bold">${block.blocker.name}</span> blocked you.
              </p>
        </div>
    `;
  });
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
                <div class="user-bio">
                  <p>${user.bio}</p>
                </div>
              </div>
              <div class="card-actions flex column jc-se ai-center">
                <div class="message flex">
                  <button class="message_user_btn" value="${user.id}">Message</button>
                </div>
                <div class="flex ai-center jc-center">
                  <div class="follow">
                    <button class="follow_user_btn" value="${user.id}">Follow</button>
                  </div>
                  <div class="block">
                    <button class="block_user_btn" value="${user.id}">Block</button>
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
      chat_list.innerHTML = "";
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
        const receiverName = users.find((user) => user.id == button.value);
        const receiver_name = document.getElementById("receiver_name");
        receiver_name.innerText = receiverName.name;
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
        const send_message_btn = document.getElementById("send_message_btn");
        send_message_btn.addEventListener("click", (e) => {
          e.preventDefault();
          const message_data = new FormData();
          const typed_message = document.getElementById("typed_message");
          const receiver_id = receiverName.id;
          message_data.append("sender_id", user_id);
          message_data.append("recepient_id", receiver_id);
          message_data.append("content", typed_message.value);
          axios({
            method: "post",
            url: `${baseURL}/actions/sendMesaage`,
            data: message_data,
          }).then((res) => {
            console.log(res.data);
          });
        });
      });
    });
  });

  // fetching follow API
  const follow_user_btn = document.querySelectorAll(".follow_user_btn");
  follow_user_btn.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let follow_data = new FormData();
      follow_data.append("follower_id", user_id);
      follow_data.append("followed_id", button.value);

      axios({
        method: "post",
        url: `${baseURL}/actions/follow`,
        data: follow_data,
      }).then((res) => {
        console.log(res.data);
      });
    });
  });

  // fetching block API
  const block_user_btn = document.querySelectorAll(".block_user_btn");
  block_user_btn.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let block_data = new FormData();
      block_data.append("blocker_id", user_id);
      block_data.append("blocked_id", button.value);

      axios({
        method: "post",
        url: `${baseURL}/actions/block`,
        data: block_data,
      }).then((res) => {
        console.log(res.data);
      });
    });
  });
});
