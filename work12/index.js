"use strict";
const wrap = document.getElementById("js-wrap");
const ul = document.getElementById("js-list");
const submit = document.getElementById("js-submit");
const url = "http://myjson.dit.upm.es/api/bins/ajy3";

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
  console.log("hoge1");
  try {
    const arrayData = await getData();
    createElement(arrayData);
  } catch (e) {
    wrap.textContent = e.message;
  } finally {
    hideLoading();
  }
}

function hideLoading() {
  ul.style.backgroundImage = "none";
}

function createElement(imgArray) {
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
  ul.style.backgroundImage = "url(./img/loading-circle.gif)";
  ul.style.backgroundRepeat = "no-repeat";
  ul.style.height = "100px";
}

submit.addEventListener("click", () => {
  loading();
  displayView();
});
