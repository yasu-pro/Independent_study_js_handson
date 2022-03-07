"use strict";
const body = document.querySelector("body");
const tabs = document.getElementById("js_tabs");
const fragment = document.createDocumentFragment();
const url = "http://myjson.dit.upm.es/api/bins/dnzp";

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

async function getListData() {
  try {
    const { data } = await getData();
    console.log(data);
    return data;
  } catch (e) {
    tabs.textContent = `エラー内容:${e.message}`;
  } finally {
    hideLoading();
  }
}

async function init() {
  loading();
  const data = await getListData();
  data.forEach((element) => {
    createTag(element);
  });
}
// ulの直下に記事の分だけlistタグを作り、fieldの値を取得してタブにする
// トピックの画像を表示する
// 作ったListタグの直下にコンテンツの分だけListタグを作る
//

// async function init() {

// }

function loading() {
  const loadDivElement = document.createElement("div");
  const loadImgElement = document.createElement("img");
  loadDivElement.id = "load_wrap";
  loadImgElement.src = "./img/loading-circle.gif";

  body.prepend(loadDivElement);
  loadDivElement.appendChild(loadImgElement);
}

function hideLoading() {
  const loadWrap = document.getElementById("load_wrap");
  loadWrap.remove();
}

function createTag(array) {
  const tabElement = document.createElement("li");
  const button = document.createElement("a");
  const field = array.field;

  tabElement.className = "tab";
  button.href = "#";
  button.textContent = field;

  tabElement.appendChild(button);
  fragment.appendChild(tabElement);
  tabs.appendChild(fragment);
}

init();
