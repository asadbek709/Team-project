const add = document.querySelector("#add")
const modal = document.querySelector(".modal")
const blur = document.querySelector(".blur")
const Close = document.querySelector("#close")

function closeAction() {
    modal.style.cssText = `
    display: none;
    `
    blur.style.cssText = `
    display: none;
    `
}

Close.addEventListener("click", closeAction)

add.addEventListener("click", function () {
    modal.style.cssText = `
    display: block;
    `
    blur.style.cssText = `
    display: block;
    `
    submit.textContent = "Submit"
    submit.removeAttribute("edit_id")
})


const submit = document.querySelector("#submit")
const cardWrapper = document.querySelector(".cardWrapper")
const fullName = document.querySelector(".fUllName")
const department = document.querySelector(".Department")
const phoneNumber = document.querySelector(".phoneNumber")
const email = document.querySelector(".email")
const imageInput = document.querySelector(".imageInput")
const address = document.querySelector(".address")

const API = "https://6a0b382921e4456256978f49.mockapi.io/Contact"

function createCard(user) {

    const card = document.createElement("div")

    card.classList.add("card")

    card.innerHTML = `
    
        <div class="avatar">

            <input class="check" type="checkbox">

            <div class="user">
                <img src="${user.image}" alt="">
                <h5>${user.full_name}</h5>
                <p>${user.department}</p>
            </div>  

            <img src="./assets/icons/Action.svg" alt="">
        </div>

        <div class="address">

            <p>
                <img src="./assets/icons/mail-forward.svg" alt="">
                ${user.email.length > 25 ? user.email.slice(0, 26).padEnd(29, "...") : user.email}
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
    `

    cardWrapper.appendChild(card)
}

function getContacts() {

    fetch(API)
        .then(res => res.json())
        .then(data => {
            cardWrapper.innerHTML = ""
            data.forEach(user => {
                createCard(user)
            })
        })
}

getContacts()


submit.addEventListener("click", function () {

    const file = imageInput.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {

        const newUser = {
            full_name: fullName.value,
            department: department.value,
            phone: phoneNumber.value,
            email: email.value,
            image: reader.result,
            address: address.value
        }

        fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {

                createCard(data)

                closeAction()

                fullName.value = ""
                department.value = ""
                phoneNumber.value = ""
                email.value = ""
                imageInput.value = ""
            })
    }
})