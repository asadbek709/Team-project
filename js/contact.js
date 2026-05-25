const add = document.querySelector("#add")
const modal = document.querySelector(".modal")
const blur = document.querySelector(".blur")
const Close = document.querySelector("#close")

const submit = document.querySelector("#submit")
const cardWrapper = document.querySelector(".cardWrapper")

const fullName = document.querySelector(".fUllName")
const department = document.querySelector(".Department")
const phoneNumber = document.querySelector(".phoneNumber")
const email = document.querySelector(".email")
const imageInput = document.querySelector(".imageInput")
const address = document.querySelector(".address")

const API = "https://6a0b382921e4456256978f49.mockapi.io/Contact"


function closeAction() {

    modal.style.display = "none"
    blur.style.display = "none"

    fullName.value = ""
    department.value = ""
    phoneNumber.value = ""
    email.value = ""
    imageInput.value = ""
    address.value = ""

    submit.textContent = "Submit"
    submit.removeAttribute("edit_id")
}

Close.addEventListener("click", closeAction)


add.addEventListener("click", function () {
    modal.style.display = "block"
    blur.style.display = "block"
    submit.textContent = "Submit"
    submit.removeAttribute("edit_id")
})


function editAndDeleteAction(box, id){

    const action = box.getAttribute("name")

    if(action === "delete"){

        const isDelete = confirm("Haqiqatan ham ochirmoqchimisiz?")

        if(isDelete){

            fetch(`${API}/${id}`, {
                method: "DELETE"
            })
            .then(() => {
                getContacts()
            })
        }
    }

    else if(action === "edit"){

        fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(user => {

            modal.style.display = "block"
            blur.style.display = "block"

            fullName.value = user.full_name
            department.value = user.department
            phoneNumber.value = user.phone
            email.value = user.email
            address.value = user.address

            submit.textContent = "Update"

            submit.setAttribute("edit_id", id)
        })
    }
}


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

            <div style="display: flex; align-items: center; gap: 7px;">

                <div 
                    name="edit" 
                    onClick="editAndDeleteAction(this, ${user.id})"
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
                    onClick="editAndDeleteAction(this, ${user.id})"
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
                ${user.email.length > 25
                    ? user.email.slice(0, 22).padEnd(25, "...")
                    : user.email}
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

    const editId = submit.getAttribute("edit_id")

    const file = imageInput.files[0]

    if(editId && !file){

        fetch(`${API}/${editId}`)
        .then(res => res.json())
        .then(oldUser => {

            const updatedUser = {
                full_name: fullName.value,
                department: department.value,
                phone: phoneNumber.value,
                email: email.value,
                image: oldUser.image,
                address: address.value
            }

            fetch(`${API}/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            })
            .then(res => res.json())
            .then(() => {

                getContacts()

                closeAction()
            })
        })

        return
    }

    const reader = new FileReader()

    if(file){
        reader.readAsDataURL(file)
    }

    reader.onload = function () {

        const userData = {
            full_name: fullName.value,
            department: department.value,
            phone: phoneNumber.value,
            email: email.value,
            image: reader.result,
            address: address.value
        }

        if(editId){

            fetch(`${API}/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(res => res.json())
            .then(() => {

                getContacts()

                closeAction()
            })
        }

        else{

            fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(res => res.json())
            .then(data => {

                createCard(data)

                closeAction()
            })
        }
    }

    if(!file && !editId){

        alert("Iltimos rasm tanlang!")
    }
})