

let fullname = document.querySelector(".fullname");
let password = document.querySelector(".password");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
 let inpbox = document.querySelector(".inpbox");
let inputs = inpbox.querySelectorAll("input");


inputs.forEach((inp) => {

    inp.addEventListener("blur", function () {
        if (inp.value.trim() === "") {
            inp.style.border = "2px solid red";
        } else {
            inp.style.border = "2px solid green";
        }
    });

});

   
fullname.addEventListener("input", function () {
    if (fullname.value.trim().length >= 3) {
        fullname.style.border = "2px solid green";
    } else {
        fullname.style.border = "2px solid red";
    }
});

 
username.addEventListener("input", function () {
    if (username.value.trim().length >= 3) {
        username.style.border = "2px solid green";
    } else {
        username.style.border = "2px solid red";
    }
});

 
email.addEventListener("input", function () {

    let value = email.value.trim();

    let firstPart = value.split("@")[0];
    let domain = value.split("@")[1];

    let isNumber = firstPart.split("").some(char => !isNaN(char));
    let isUpper = firstPart.split("").some(char => char === char.toUpperCase() && isNaN(char));

    if (
        domain === "gmail.com" &&
        firstPart.length >= 8 &&
        isNumber &&
        !isUpper
    ) {
        email.style.border = "2px solid green";
    } else {
        email.style.border = "2px solid red";
    }
});


password.addEventListener("input", function () {

    let value = password.value.trim();

    let isNumber = value.split("").some(char => !isNaN(char));

    let isUpper = value.split("").some(
        char => char === char.toUpperCase() && isNaN(char)
    );

    let isLong = value.length >= 6;

    if (isNumber && isUpper && isLong) {
        password.style.border = "2px solid green";
    } else {
        password.style.border = "2px solid red";
    }

});