"use strict";
const wrap = document.getElementById("js-wrap");
const ul = document.getElementById("js-list");
// const button_wrap = document.getElementById("js-button-wrap");

// const url = "https://myjson.dit.upm.es/api/bins/ほげほげajy3";
// const url = "https://myjson.dit.upm.es/api/bins/bu5z";
// const url = "https://myjson.dit.upm.es/api/bins/2hj3";
// 下記は、myjson繋がらない時の固定値
const url = {
  data: [
    {
      a: "bookmark",
      img: "img/1.png",
      alt: "画像１",
      text: "ブックマーク",
    },
    {
      a: "message",
      img: "img/2.png",
      alt: "画像２",
      text: "メッセージ",
    },
  ],
};

// async function getData() {
//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       const json = await response.json();
//       return json;
//     } else {
//       throw new Error(`Server request failed:${response.statusText}`);
//     }
//   } catch (e) {
//     console.error(e);
//   }
// }

// 下記は、固定値をそのままpromiseの返り値とする
async function getData() {
  return url;
}

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

function renderButton() {
  const modal_wrap = document.getElementById("js-modal-wrap");
  const button_wrap = document.createElement("div");
  const buttonTag = document.createElement("button");

  button_wrap.id = "js-button-wrap";

  buttonTag.id = "js-button";
  buttonTag.type = "submit";
  buttonTag.textContent = "クリック";

  modal_wrap.appendChild(button_wrap);
  button_wrap.appendChild(buttonTag);
}

function renderModalButton() {
  const modal_button = document.createElement("button");
  modal_button.id = "js-modal-button";
  modal_button.type = "submit";
  modal_button.textContent = "モーダル";

  wrap.after(modal_button);
}

function renderModalContent() {
  const modal = document.createElement("div");
  const div = document.createElement("div");

  modal.id = "js-modal";
  div.id = "js-modal-wrap";

  wrap.after(modal);
  modal.appendChild(div);
}

function renderInput() {
  const input = document.createElement("input");
  input.classList.add("input_number");
  input.type = "number";

  return input;
}

window.addEventListener("DOMContentLoaded", () => {
  const modal_button = document.getElementById("js-modal-button");

  modal_button.addEventListener("click", () => {
    modal_button.style.display = "none";
    renderModalContent();
    renderButton();
  });

  document.addEventListener("click", (e) => {
    const modalElement = document.getElementById("js-modal");
    const requestButton = document.getElementById("js-button");
    if (e.target && e.target.id === "js-button") {
      modalElement.remove();
      modal_button.remove();
      init();
      requestButton.remove();
    }
  });
});

renderModalButton();
