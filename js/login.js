const inpBox = document.querySelectorAll(".inpBox");
const arr = Array.from(inpBox);


arr.forEach((box) => {
    let inp = box.children[1]

    inp.addEventListener("blur", function () {
        if (inp.value) {
            checked(inp)
        } else {
            inp.style.cssText = `
                border: 1px solid #cf222e;
             `
        }
    })

    inp.addEventListener("input", function () {
        checked(inp)
    })

})

function checked(inp) {
    let type = inp.getAttribute("name");

    if (type === "text") {
        let val = inp.value.trim()
        let len = val.split(" ").length === 1
        let isLower = inp.value.split("").filter((s) => s !== s.toUpperCase() || s !== s.toLowerCase()).every((s) => s === s.toLowerCase())
        if (isLower && len && val.length >= 3) {
            inp.style.cssText = `
                    border: 1px solid #1f883d;
                `
        } else {
            inp.style.cssText = `
                    border: 1px solid #cf222e;
                `
        }

    } else if (type === "password") {
        let arr = inp.value.split("")
        let isRepeat = arr.some((s, i, arr) => s === arr[i + 1])
        let isUpper = arr.filter((s) => s !== s.toUpperCase() || s !== s.toLowerCase()).some((s) => s === s.toUpperCase())
        let isLower = arr.filter((s) => s !== s.toUpperCase() || s !== s.toLowerCase()).some((s) => s === s.toLowerCase())
        let isNumber = arr.some((s) => !isNaN(s))
        let isSymbol = arr.some((s) => isNaN(s) && s === s.toUpperCase() && s === s.toLowerCase())
        if (!isRepeat && inp.value.length >= 8 && isUpper && isLower && isNumber && isSymbol) {
            inp.style.cssText = `
                    border: 1px solid #1f883d;
                `
        } else {
            inp.style.cssText = `
                    border: 1px solid #cf222e;
                `
        }
    } else {
        alert("Siz not'g'ri Event ishlatyapsiz. 😂")
    }
}


const eye = document.querySelector(".eye")
const eye_slash = document.querySelector(".eye-slash")
const password_inp = document.querySelector(".password_inp")

eye_slash.addEventListener("click", function () {
    eye.style.cssText = `
  visibility: visable;
  `
    eye_slash.style.cssText = `
  visibility: hidden;
  `

    password_inp.type = "text"
})

eye.addEventListener("click", function () {
    eye.style.cssText = `
  visibility: hidden;
  `
    eye_slash.style.cssText = `
  visibility: visable;
  `
    password_inp.type = "password"
})