"use strict";
const load = document.getElementById("js-loading");
const wrap = document.getElementById("js-wrap");
const submit = document.getElementById("js-submitBtn");
const closedBtn = document.getElementById("js-closedBtn");
const modalBtn = document.getElementById("js-modalDisplay");
const modal = document.getElementById("js-modal");
const url = "http://myjson.dit.upm.es/api/bins/ajy3";
let number = 0;
let name = "";

function getData() {
  const result = new Promise((resolve, reject) => {
    resolve(
      (async function () {
        const response = (await fetch(url)).json();
        return response;
      })()
    );
  });
  return result;
}

async function displayView() {
  try {
    console.log(number);
    const arrayData = await getData();
    createElement(arrayData);
  } catch (e) {
    wrap.textContent = e.message;
  } finally {
    hideLoading();
  }
}

function hideLoading() {
  load.style.display = "none";
}

function createElement(imgArray) {
  const ul = document.getElementById("js-list");
  const fragment = document.createDocumentFragment();

  Object.keys(imgArray).forEach((key) => {
    imgArray[key].forEach((keyIndex) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");

      a.href = keyIndex.a;
      a.textContent = keyIndex.text;
      img.src = keyIndex.img;
      img.alt = keyIndex.alt;
      fragment.appendChild(li).appendChild(a).prepend(img);
    });
  });
  ul.appendChild(fragment);
}

function loading() {
  const loadImg = document.createElement("img");

  load.appendChild(loadImg);
  load.style.display = "block";
  load.style.backgroundImage = "url(./img/loading-circle.gif)";
  load.style.backgroundRepeat = "no-repeat";
  load.style.height = "100px";
}

submit.addEventListener("click", () => {
  const numberBox = document.getElementById("js-numberBox");
  const nameBox = document.getElementById("js-nameBox");

  number = numberBox.value;
  name = nameBox.value;

  name = modal.style.display = "none";
  modalBtn.style.display = "block";
  wrap.style.display = "block";

  loading();
  displayView();
});

modalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  modalBtn.style.display = "none";
  wrap.style.display = "none";
});

closedBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalBtn.style.display = "block";
  wrap.style.display = "block";
});
