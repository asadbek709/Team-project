const add = document.querySelector("#add");
const modal = document.querySelector(".modal");
const blur = document.querySelector(".blur");
const Close = document.querySelector("#close");

const submit = document.querySelector("#submit");
const cardWrapper = document.querySelector(".cardWrapper");

const fullName = document.querySelector(".fUllName");
const department = document.querySelector(".Department");
const phoneNumber = document.querySelector(".phoneNumber");
const email = document.querySelector(".email");
const imageInput = document.querySelector(".imageInput");
const address = document.querySelector(".address");

const api = "https://6a0b382921e4456256978f49.mockapi.io/Contact";

function closeAction() {
  modal.style.display = "none";
  blur.style.display = "none";

  fullName.value = "";
  department.value = "";
  phoneNumber.value = "";
  email.value = "";
  imageInput.value = "";
  address.value = "";

  submit.textContent = "Submit";
  submit.removeAttribute("edit_id");
}

Close.addEventListener("click", closeAction);

add.addEventListener("click", function () {
  modal.style.display = "block";
  blur.style.display = "block";
  submit.textContent = "Submit";
  submit.removeAttribute("edit_id");
});

function editAndDeleteAction(e, id) {
  e.stopPropagation();
  const action = e.target.parentElement.getAttribute("name");
  if (action === "delete") {
    const isDelete = confirm("Haqiqatan ham ochirmoqchimisiz?");
    if (isDelete) {
      fetch(`${api}/${id}`, {
        method: "DELETE",
      }).then(() => {
        getContacts();
      });
    }
  } else if (action === "edit") {
    fetch(`${api}/${id}`)
      .then((res) => res.json())
      .then((user) => {
        modal.style.display = "block";
        blur.style.display = "block";
        fullName.value = user.full_name;
        department.value = user.department;
        phoneNumber.value = user.phone;
        email.value = user.email;
        address.value = user.address;
        submit.textContent = "Update";
        submit.setAttribute("edit_id", id);
      });
  }
}

function createCard(user) {
  const card = document.createElement("div");

  card.classList.add("card");

  card.innerHTML = `
    
        <div class="avatar">

            <input class="check" type="checkbox">

            <div class="user">
                <img src="${user.image}" alt="">
                <h5>${user.full_name}</h5>
                <p>${user.department}</p>
            </div>  

            <div style="display: flex; align-items: center; gap: 7px;">

                <div
                    name="edit" 
                    onClick="editAndDeleteAction(event, ${user.id})"
                    style="
                        width: 20px;
                        height: 20px;
                        background-color: #daf9daff;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    "
                >
                    <img src="./assets/icons/edit.svg" alt="">
                </div>

                <div 
                    name="delete" 
                    onClick="editAndDeleteAction(event, ${user.id})"
                    style="
                        width: 20px;
                        height: 20px;
                        background-color: #f4d1d1ff;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    "
                >
                    <img src="./assets/icons/trash-gray.svg" alt="">
                </div>

            </div>
        </div>

        <div class="address">

            <p>
                <img src="./assets/icons/mail-forward.svg" alt="">
                ${
                  user.email.length > 25
                    ? user.email.slice(0, 22).padEnd(25, "...")
                    : user.email
                }
            </p>

            <p>
                <img src="./assets/icons/phone.svg" alt="">
                +${user.phone}
            </p>

            <p>
                <img src="./assets/icons/map-pin.svg" alt="">
                ${user.address}
            </p>

        </div>

        <hr>

        <div class="icons">

            <div class="imags">
                <img src="./assets/icons/mail-icon.svg" alt="">
                <img src="./assets/icons/phone-call.svg" alt="">
                <img src="./assets/icons/message-2.svg" alt="">
                <img src="./assets/icons/brand-skype.svg" alt="">
                <img src="./assets/icons/brand-facebook.svg" alt="">
            </div>

            <div class="reyting">
                ⭐ <p>4.2</p>
            </div>

        </div>
    `;

  // Card Clicked
  card.addEventListener("click", function () {
    if (user.id) window.location.href = `${window.location.href}?id=${user.id}`;
  });

  cardWrapper.appendChild(card);
}

function goBack() {
  window.location.href = "contact.html";
}

function getContacts() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      cardWrapper.innerHTML = "";

      let cardParam = new URLSearchParams(window.location.search);
      let cardID = cardParam.get("id");

      if (cardID) {
        let main = document.querySelector("#main");
        main.innerHTML = `
            <div class="wrapper">
              <!-- top -->
              <div class="top">
                <div class="breadcrumb" onClick={goBack()}>
                  <img src="./assets/icons/arrow-left (1).svg" alt="" />
                  <span>Contacts</span>
                  <span>/</span>
                  <span>Darlee Robertson</span>
                </div>

                <button class="top_button">
                  <img src="./assets/icons/circle-plus.svg" alt="" />
                  Add Deal
                </button>
              </div>

              <!-- left  -->
              <section class="left_card">
                <div class="card_header">
                  <div class="cover"></div>

                  <div class="user_info">
                    <img
                      class="avatar"
                      src="./assets/icons/Avatar With Dot Badges.svg"
                      alt=""
                    />

                    <h2>
                      Darlee Robertson
                      <img src="./assets/icons/discount-check-filled.svg" alt="" />
                    </h2>

                    <p>BrightWave Innovations</p>

                    <span class="job_badge">Facility Manager</span>
                  </div>
                </div>

                <!-- continued -->
                <div class="info_box">
                  <div class="title_row">
                    <h3>Basic information</h3>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/phone (1).svg" alt="" />
                      Phone
                    </span>
                    <span>(163) 2459 315</span>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/mail-check.svg" alt="" />
                      Email
                    </span>
                    <a href="">darlee@example.com</a>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/gender-male.svg" alt="" />
                      Gender
                    </span>
                    <span>Male</span>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/cake.svg" alt="" />
                      Birthday
                    </span>
                    <span>24th July 2000</span>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/map-pin-check.svg" alt="" />
                      Address
                    </span>
                    <span>
                      1861 Bayonne Ave,<br />
                      Manchester, NJ, 08759
                    </span>
                  </div>
                </div>

                <!-- other -->
                <div class="info_box">
                  <div class="title_row">
                    <h3>Other Information</h3>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/e-passport.svg" alt="" />
                      Language
                    </span>
                    <span>English</span>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/calendar-x.svg" alt="" />
                      Currency
                    </span>
                    <span>United States dollar</span>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/globe.svg" alt="" />
                      Last Modified
                    </span>
                    <span>27/09/24, 11:45 pm</span>
                  </div>

                  <div class="info_item">
                    <span class="icons">
                      <img src="./assets/icons/bookmark-plus.svg" alt="" />
                      Source
                    </span>
                    <span>Paid Campaign</span>
                  </div>
                </div>

                <!-- bottom left -->
                <div class="info_box">
                  <div class="title_row">
                    <h3>Social Links</h3>
                  </div>

                  <div class="socials">
                    <img src="./assets/icons/insta.svg" alt="" />
                    <img src="./assets/icons/x.svg" alt="" />
                    <img src="./assets/icons/watsup.svg" alt="" />
                    <img src="./assets/icons/p.svg" alt="" />
                    <img src="./assets/icons/in.svg" alt="" />
                    <img src="./assets/icons/facebook.svg" alt="" />
                  </div>
                </div>

                <!-- left buttons -->
                <div class="btns">
                  <button class="share_btn">
                    <img src="./assets/icons/share-2.svg" alt="" />
                    Share
                  </button>
                  <button class="delete_btn">
                    <img src="./assets/icons/trash.svg" alt="" />
                    Delete
                  </button>
                </div>
              </section>

              <!-- right -->
              <section class="right_card">
                <div class="tabs">
                  <button class="active">
                    <img src="./assets/icons/activity.svg" alt="" />Activities
                  </button>
                  <button>
                    <img src="./assets/icons/file-description.svg" alt="" />Notes
                  </button>
                  <button>
                    <img src="./assets/icons/phone-call.svg" alt="" />Calls
                  </button>
                  <button><img src="./assets/icons/files.svg" alt="" />Files</button>
                  <button>
                    <img src="./assets/icons/mail-check (1).svg" alt="" />Email
                  </button>
                </div>

                <div class="activity_wrapper">
                  <div class="span">
                    <span
                      ><img src="./assets/icons/calendar.svg" alt="" /> 15 Feb
                      2024</span
                    >
                  </div>

                  <div class="activity_card">
                    <div class="circle blue">
                      <img src="./assets/icons/message-circle-2.svg" alt="" />
                    </div>

                    <div class="wrap">
                      <h4>You sent 1 Message to the contact.</h4>
                      <p>10:25 pm</p>
                    </div>
                  </div>

                  <div class="activity_card">
                    <div class="circle green">
                      <img src="./assets/icons/phone (2).svg" alt="" />
                    </div>

                    <div class="wrap">
                      <h4>
                        Denwar responded to your appointment schedule question by call
                        at 09:30pm.
                      </h4>
                      <p>09:25 pm</p>
                    </div>
                  </div>

                  <div class="activity_card">
                    <div class="circle yellow">
                      <img src="./assets/icons/file-description (1).svg" alt="" />
                    </div>

                    <div class="wrap">
                      <h4>Notes added by Antony</h4>

                      <p>
                        Please accept my apologies for the inconvenience caused. It
                        would be much appreciated if it's possible to reschedule to
                        6:00 PM, or any other day that week.
                      </p>
                    </div>
                  </div>

                  <div class="span">
                    <span>
                      <img src="./assets/icons/calendar.svg" alt="" />15 Feb
                      2024</span
                    >
                  </div>

                  <div class="activity_card">
                    <div class="circle blue">
                      <img src="./assets/icons/user-circle.svg" alt="" />
                    </div>

                    <div class="wrap">
                      <h4>You sent 1 Message to the contact.</h4>
                      <p>10:25 pm</p>
                    </div>
                  </div>

                  <div class="activity_card">
                    <div class="circle green">
                      <img src="./assets/icons/phone (2).svg" alt="" />
                    </div>

                    <div class="wrap">
                      <h4>
                        Denwar responded to your appointment schedule question by call
                        at 09:30pm.
                      </h4>
                      <p>09:25 pm</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <style>
              main {
                overflow-y: auto;
                overflow-x: auto;
                background-color: #f5f6fa;
              }

              .wrapper {
                display: grid;
                grid-template-columns: 340px 1fr;
                grid-template-rows: 40px auto;

                gap: 24px;
              }

              /* top */

              .top {
                grid-column: 1 / 3;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }

              .breadcrumb {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-size: 14px;
                color: #666;
              }

              .breadcrumb:hover{
                text-decoration: underline;
              }

              .top_button {
                width: 112px;
                height: 38px;
                border: none;
                border-radius: 8px;
                background: #ff6b00;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
              }

              /* left */

              .left_card {
                background: #fff;
                border-radius: 14px;
                overflow: hidden;
                border: 1px solid #ececec;
              }

              .cover {
                height: 90px;
                background: linear-gradient(90deg, #ff8a00, #ffc76a);
              }

              .user_info {
                text-align: center;
                padding: 0 20px 20px;
                margin-top: -42px;
              }

              .avatar {
                width: 84px;
                height: 84px;

                border-radius: 50%;

                border: 4px solid white;
              }

              .user_info h2 {
                margin-top: 10px;

                font-size: 20px;
              }

              .user_info p {
                margin-top: 4px;

                font-size: 13px;
                color: #777;
              }

              .job_badge {
                display: inline-block;

                margin-top: 10px;

                padding: 6px 12px;

                border-radius: 20px;

                background: #ffe5ef;
                color: #ff4d88;

                font-size: 11px;
              }

              .info_box {
                padding: 20px;

                border-top: 1px solid #f0f0f0;
              }

              .title_row {
                margin-bottom: 18px;
              }

              .title_row h3 {
                font-size: 15px;
              }

              .info_item {
                display: flex;
                justify-content: space-between;
                gap: 20px;
                margin-bottom: 16px;
              }

              .info_item span:first-child {
                color: #888;
                font-size: 13px;
              }

              .info_item span:last-child {
                text-align: right;

                font-size: 13px;
                color: #222;
              }
              .icons {
                display: flex;
                align-items: center;
                gap: 8px;
              }

              .socials {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
              }

              .socials img {
                width: 30px;
                height: 30px;
              }

              .btns {
                padding: 20px;

                display: grid;
                grid-template-columns: 1fr 1fr;

                gap: 12px;
              }

              .btns button {
                height: 40px;

                border: none;
                border-radius: 8px;

                cursor: pointer;
              }

              .share_btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                background: #1f1f1f;
                color: #fff;
              }

              .delete_btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                background: #ff6b00;
                color: #fff;
              }

              /* right */

              .right_card {
                background: #fff;
                border-radius: 14px;
                border: 1px solid #ececec;
                padding: 20px;
              }

              .tabs {
                display: flex;
                gap: 24px;
                padding-bottom: 14px;
                border-bottom: 1px solid #eee;
              }

              .tabs button {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                border: none;
                background: none;
                cursor: pointer;
                padding-bottom: 10px;
              }

              .tabs .active {
                color: #ff6b00;
                border-bottom: 2px solid #ff6b00;
              }

              .activity_wrapper {
                margin-top: 24px;

                display: flex;
                flex-direction: column;

                gap: 16px;
              }

              .activity_card {
                border: 1px solid #eee;
                border-radius: 12px;
                padding: 16px;
                font-weight: 500;
                display: grid;
                grid-template-columns: 40px 1fr;
                align-items: center;
                justify-items: start;
                gap: 14px;
              }

              .circle {
                height: 40px;
                width: 40px;
                border-radius: 50%;
              }

              .blue {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #25b7ff;
              }

              .green {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1dc85f;
              }

              .yellow {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffc400;
              }

              .blue {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #25b7ff;
              }

              .green {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1dc85f;
              }

              .yellow {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffc400;
              }

              .span {
                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 10px;
                gap: 5px;
                width: 91px;
                height: 22px;
                border-radius: 5px;
                background-color: rgba(247, 238, 249, 1);
                color: rgba(171, 71, 188, 1);
              }
            </style>
        `;
        console.log(cardID);
      } else {
        data.forEach((user) => {
          createCard(user);
        });
      }
    });
}

getContacts();

submit.addEventListener("click", function () {
  const editId = submit.getAttribute("edit_id");

  const file = imageInput.files[0];

  if (editId && !file) {
    fetch(`${api}/${editId}`)
      .then((res) => res.json())
      .then((oldUser) => {
        const updatedUser = {
          full_name: fullName.value,
          department: department.value,
          phone: phoneNumber.value,
          email: email.value,
          image: oldUser.image,
          address: address.value,
        };

        fetch(`${api}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then(() => {
            getContacts();

            closeAction();
          });
      });

    return;
  }

  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.onload = function () {
    const userData = {
      full_name: fullName.value,
      department: department.value,
      phone: phoneNumber.value,
      email: email.value,
      image: reader.result,
      address: address.value,
    };

    if (editId) {
      fetch(`${api}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then(() => {
          getContacts();

          closeAction();
        });
    } else {
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          createCard(data);

          closeAction();
        });
    }
  };

  if (!file && !editId) {
    alert("Iltimos rasm tanlang!");
  }
});
