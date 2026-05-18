

// let fullname = document.querySelector(".fullname");
// let password = document.querySelector(".password");
// let username = document.querySelector(".username");
// let email = document.querySelector(".email");
// let inpbox = document.querySelector(".inpbox");
// let inputs = inpbox.querySelectorAll("input");

// let eyeslash = document.querySelector("#eyeslash");
// let eye = document.querySelector("#eye");
// console.log(eyeslash);

// eyeslash.addEventListener("click", function () {
//     console.log(eyeslash);
//     password.type = "text";
//     eyeslash.style.cssText = `
//     visibility: hidden;
//   ` ;
//     eye.style.cssText = `
//     visibility: visible;
//   ` ;
// })

// eye.addEventListener("click", function () {
//     console.log(eye);
//     password.type = "password";

//     eye.style.cssText = `
//     visibility: hidden;
//   ` ;
//     eyeslash.style.cssText = `
//     visibility: visible;
//   ` ;
// })



// inputs.forEach((inp) => {

//     inp.addEventListener("blur", function () {
//         if (inp.value.trim() === "") {
//             inp.style.border = "2px solid red";
//         } else {
//             inp.style.border = "2px solid green";
//         }
//     });

// });


// email.addEventListener("input", function () {

//     let value = email.value.trim();

//     let firstPart = value.split("@")[0];
//     let domain = value.split("@")[1];

//     let isNumber = firstPart.split("").some(char => !isNaN(char));
//     let isUpper = firstPart.split("").some(char => char === char.toUpperCase() && isNaN(char));

//     if (
//         domain === "gmail.com" &&
//         firstPart.length >= 8 &&
//         isNumber &&
//         !isUpper
//     ) {
//         email.style.border = "2px solid green";
//     } else {
//         email.style.border = "2px solid red";
//     }
// });


// password.addEventListener("input", function () {

//     let value = password.value.trim();

//     let isNumber = value.split("").some(
//         char => !isNaN(char) && char !== " "
//     );

//     let isUpper = value.split("").some(
//         char => char === char.toUpperCase() &&
//             char !== char.toLowerCase()
//     );

//     let isLong = value.length >= 6;

//     if (isNumber && isUpper && isLong) {
//         password.style.border = "2px solid green";
//     } else {
//         password.style.border = "2px solid red";
//     }

// });



let eyeslash = document.querySelector("#eyeslash");
let eye = document.querySelector("#eye");
let password = document.querySelector(".password");

console.log(eyeslash);

eyeslash.addEventListener("click", function () {
    console.log(eyeslash);
    password.type = "text";
    eyeslash.style.cssText = `
    visibility: hidden;
  ` ;
    eye.style.cssText = `
    visibility: visible;
  ` ;
})

eye.addEventListener("click", function () {
    console.log(eye);
    password.type = "password";

    eye.style.cssText = `
    visibility: hidden;
  ` ;
    eyeslash.style.cssText = `
    visibility: visible;
  ` ;
})



const inpbox = document.querySelector(".inpbox")
let arr = Array.from(inpbox.children)
arr.forEach((box) => {
    let inp = box.children[1];
    inp.addEventListener("input", function () {

 

        let attr = inp.getAttribute("class")
        if (attr === "fullname") {
            let value = inp.value.trim();
            let arr = value.split(" ");
            if (arr.length === 2) {
                let asadbek = arr.every(word => word.length >= 3);

                if (asadbek) {
                    inp.style.border = "2px solid #1f883d";
                } else {
                    inp.style.border = "2px solid #cf222e";
                }
            } else {
                inp.style.border = "2px solid #cf222e";
            }
        }
        else if (attr === "username") {
            if (inp.value.trim().length >= 3) {
                inp.style.border = "2px solid #1f883d";
            } else {
                inp.style.border = "2px solid #cf222e";
            }
        }
        else if (attr === "email") {

            let value = inp.value.trim();

            let firstPart = value.split("@")[0];
            let ssd = value.split("@")[1];

            let isNumber = firstPart.split("").some(char => !isNaN(char));
            let isUpper = firstPart.split("").some(char => char === char.toUpperCase() && isNaN(char));

            if (
                ssd === "gmail.com" &&
                firstPart.length >= 8 &&
                isNumber &&
                !isUpper
            ) {
                inp.style.border = "2px solid #1f883d";
            } else {
                inp.style.border = "2px solid #cf222e";
            }

        }
        else if (attr === "password") {
            
    let value = inp.value.trim();

    let isNumber = value.split("").some(
        char => !isNaN(char) && char !== " "
    );

    let isUpper = value.split("").some(
        char => char === char.toUpperCase() &&
            char !== char.toLowerCase()
    );

    let isLong = value.length >= 6;

    if (isNumber && isUpper && isLong) {
        inp.style.border = "2px solid #1f883d";
    } else {
        inp.style.border = "2px solid #cf222e";
    }
        }
        else alert("Siz notog'ri Event ishlatyapsiz. 😂");

    })

    inp.addEventListener("blur", function () {
    if (!inp.value.trim()) {
        inp.style.border = "2px solid #cf222e";
    }
});
})
