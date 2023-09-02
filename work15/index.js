"use strict";
const wrap = document.getElementById("js_wrap");
const ul = document.getElementById("js_list");
const modal = document.getElementById("js_modal");
const submit_btn = document.getElementById("js_submitBtn");
const input_num = document.getElementById("js_numBox");
const input_name = document.getElementById("js_nameBox");

let inputNumVal = 0;
let inputNameVal = 0;
// const url = "https://myjson.dit.upm.es/api/bins/ほげほげajy3";
// const url = "https://myjson.dit.upm.es/api/bins/fhzj";
const url = "https://myjson.dit.upm.es/api/bins/86vb";
// 下記は、myjson繋がらない時の固定値
// const url = {
//   data: [
//     {
//       a: "bookmark",
//       img: "img/1.png",
//       alt: "画像１",
//       text: "ブックマーク",
//     },
//     {
//       a: "message",
//       img: "img/2.png",
//       alt: "画像２",
//       text: "メッセージ",
//     },
//   ],
// };

async function getData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error(`Server request failed:${response.statusText}`);
    }
  } catch (e) {
    console.error(e);
  }
}

// 下記は、固定値をそのままpromiseの返り値とする
// async function getData() {
//   return url;
// }

async function getListData() {
  let listData;
  try {
    listData = await getData();
  } catch (e) {
    wrap.textContent = `エラー内容:${e.message}`;
  } finally {
    hideLoading();
  }
  if (listData.data.length === 0) {
    wrap.textContent = "data is empty";
    return;
  }
  return listData;
}

const init = async () => {
  loading();
  const data = await getListData();
  renderListElement(data);
  console.log(inputNumVal);
  console.log(inputNameVal);
};

function hideLoading() {
  ul.style.backgroundImage = "none";
  ul.style.height = "auto";
}

function renderListElement({ data }) {
  const fragment = document.createDocumentFragment();

  data.forEach((value) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    a.href = value.a;
    a.textContent = value.text;
    img.src = value.img;
    img.alt = value.alt;
    img.style.width = "30px";
    img.style.verticalAlign = "middle";

    fragment.appendChild(li).appendChild(a).prepend(img);
  });

  ul.appendChild(fragment);
}

function loading() {
  ul.style.backgroundImage = "url(./img/loading-circle.gif)";
  ul.style.backgroundRepeat = "no-repeat";
  ul.style.height = "100px";
}

function renderModalBtn() {
  const modal_btn_element = document.createElement("button");
  modal_btn_element.id = "js_modal_btn";
  modal_btn_element.type = "submit";
  modal_btn_element.textContent = "モーダル";

  wrap.after(modal_btn_element);
}

window.addEventListener("DOMContentLoaded", () => {
  const modal_btn = document.getElementById("js_modal_btn");
  const errMsgNum = document.querySelector(".err_msg_num");
  const errMsgName = document.querySelector(".err_msg_name");

  modal_btn.addEventListener("click", () => {
    modal.style.display = "block";
    modal_btn.remove();
  });

  submit_btn.addEventListener("click", (e) => {
    if (!input_num.value) {
      errMsgNum.classList.add("form_invalid");
      errMsgNum.textContent = "入力されていません";
      input_num.classList.add("input_invalid");
    }
    if (!input_name.value) {
      errMsgName.classList.add("form_invalid");
      errMsgName.textContent = "入力されていません";
      input_name.classList.add("input_invalid");
    } else {
      errMsgNum.textContent = "";
      errMsgNum.classList.remove("input-invalid");
      errMsgName.textContent = "";
      errMsgName.classList.remove("input-invalid");

      inputNumVal = input_num.value;
      inputNameVal = input_name.value;
      modal.remove();
      submit_btn.remove();
      init();
    }
  });
});

renderModalBtn();
