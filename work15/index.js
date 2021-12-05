"use strict";
const wrap = document.getElementById("js-wrap");
const submit = document.getElementById("js-submitBtn");
const closedBtn = document.getElementById("js-closedBtn");
const modal_button = document.getElementById("js-modalDisplay");
const modal = document.getElementById("js-modal");
const url = "http://myjson.dit.upm.es/api/bins/ajy3";
let number = 0;

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
  const load = document.getElementById("js-loading");
  const loadImg = document.createElement("img");

  load.appendChild(loadImg);
  load.style.display = "block";
  load.style.backgroundImage = "url(./img/loading-circle.gif)";
  load.style.backgroundRepeat = "no-repeat";
  load.style.height = "100px";
}

submit.addEventListener("click", () => {
  const number_box = document.getElementById("js-numberBox");

  number = number_box.value;

  modal.style.display = "none";
  modal_button.style.display = "block";
  wrap.style.display = "block";

  loading();
  displayView();
});

modal_button.addEventListener("click", () => {
  modal.style.display = "block";
  modal_button.style.display = "none";
  wrap.style.display = "none";
});

closedBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modal_button.style.display = "block";
  wrap.style.display = "block";
});
