const api = "https://6a0b382921e4456256978f49.mockapi.io/Contact";
const wrapper = document.querySelector(".wrapper");
let all = wrapper.children[0];
let frontEnd = wrapper.children[1];
let backEnd = wrapper.children[2];
let fullStack = wrapper.children[3];
let design = wrapper.children[5];
let cyberScurity = wrapper.children[6];
let logistik = wrapper.children[7];
let smm = wrapper.children[8];

function getData() {
  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      filterAction(res);
    });
}
getData();

const filterAction = (data) => {
  all.children[2].children[0].textContent = data.length;

  let frontEndArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("front"),
  );
  frontEnd.children[2].children[0].textContent = frontEndArr.length;

  let backEndArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("back"),
  );
  backEnd.children[2].children[0].textContent = backEndArr.length;

  let fullStackArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("full"),
  );
  fullStack.children[2].children[0].textContent = fullStackArr.length;

  let smmArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("mobilograf"),
  );
  smm.children[2].children[0].textContent = smmArr.length;

  let logistikArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("logis"),
  );
  logistik.children[2].children[0].textContent = logistikArr.length;

  let cyberScurityArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("kiber"),
  );
  cyberScurity.children[2].children[0].textContent = cyberScurityArr.length;

  let designArr = data.filter((obj) =>
    obj.department.toLowerCase().includes("design"),
  );
  design.children[2].children[0].textContent = designArr.length;
};
