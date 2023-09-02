"use strict";
const wrap = document.getElementById("js_wrap");
const ul = document.getElementById("js_list");
let inputNumVal = 0;

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

function renderBtn() {
  const modal_wrap = document.getElementById("js_modal_wrap");
  const button_wrap = document.createElement("div");
  const buttonTag = document.createElement("button");

  button_wrap.id = "js_button_wrap";

  buttonTag.id = "js_button";
  buttonTag.type = "submit";
  buttonTag.textContent = "クリック";

  modal_wrap.appendChild(button_wrap);
  button_wrap.appendChild(buttonTag);
}

function renderModalBtn() {
  const modal_button = document.createElement("button");
  modal_button.id = "js_modal_button";
  modal_button.type = "submit";
  modal_button.textContent = "モーダル";

  wrap.after(modal_button);
}

function renderModalContent() {
  const modal = document.createElement("div");
  const div = document.createElement("div");

  modal.id = "js_modal";
  div.id = "js_modal_wrap";

  wrap.after(modal);
  modal.appendChild(div);
}

function renderInput() {
  const input = document.createElement("input");
  const modal_wrap = document.getElementById("js_modal_wrap");
  const button_wrap = document.getElementById("js_button_wrap");
  input.id = "input_number";
  input.type = "number";

  modal_wrap.insertBefore(input, button_wrap);
}

window.addEventListener("DOMContentLoaded", () => {
  const modal_button = document.getElementById("js_modal_button");

  modal_button.addEventListener("click", () => {
    modal_button.style.display = "none";
    renderModalContent();
    renderBtn();
    renderInput();
  });

  document.addEventListener("click", (e) => {
    const modalElement = document.getElementById("js_modal");
    const request_btn = document.getElementById("js_button");
    const input_number = document.getElementById("input_number");
    if (e.target && e.target.id === "js_button") {
      inputNumVal = input_number.value;
      init();
      modalElement.remove();
      modal_button.remove();
      request_btn.remove();
    }
  });
});

renderModalBtn();
