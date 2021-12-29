"use strict";
const wrap = document.getElementById("js-wrap");
const ul = document.getElementById("js-list");
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

async function getJSON() {
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

function createElement({data}) {
  const fragment = document.createDocumentFragment();

  {data}.forEach((value) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");

      a.href = value.a;
      a.textContent = value.text;
      img.src = value.img;
      img.alt = value.alt;
      fragment.appendChild(li).appendChild(a).prepend(img);
  });

  ul.appendChild(fragment);
}

function loading() {
  ul.style.backgroundImage = "url(./img/loading-circle.gif)";
  ul.style.backgroundRepeat = "no-repeat";
  ul.style.height = "100px";
}

loading();
getJSON();
