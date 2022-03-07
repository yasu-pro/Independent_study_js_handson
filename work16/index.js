"use strict";
const body = document.querySelector("body");
const tabs = document.getElementById("js_tabs");
const fragment = document.createDocumentFragment();
const url = "http://myjson.dit.upm.es/api/bins/c3j7";

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
  renderTheCreatedTag(data);
  tabClickEvent(data);
}
// ulの直下に記事の分だけlistタグを作り、fieldの値を取得してタブにする
// トピックの画像を表示する
// 作ったListタグの直下にコンテンツの分だけListタグを作る
//

function tabClickEvent(data) {
  let pastIndex;
  const tabNodeList = document.querySelectorAll(".tab");

  tabNodeList.forEach((tabElement, index) => {
    tabElement.addEventListener("click", (target) => {
      renderContent(data, index, pastIndex);
      pastIndex = index;
    });
  });
}

function renderContent(data, index, pastIndex) {
  const clikcedContentDivElement = document.createElement("div");
  const pastClickedContentDivElement = document.querySelector(
    `${"div.content_wrap" + pastIndex}`
  );
  clikcedContentDivElement.classList.toggle("content_wrap" + index);

  if (pastClickedContentDivElement) {
    pastClickedContentDivElement.remove();
  }

  const { contents } = data[index];
  console.log(contents);
  tabDetailsNews(contents);

  body.insertBefore(clikcedContentDivElement, tabs.nextSibling);
}

function tabDetailsNews() {
  const tabDetailsNewsUlElement = document.createElement("ul");
}

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

function renderTheCreatedTag(data) {
  data.forEach((element) => {
    const tabElement = document.createElement("li");
    const button = document.createElement("a");
    const field = element.field;

    tabElement.className = "tab";
    button.href = "#";
    button.textContent = field;

    tabElement.appendChild(button);
    fragment.appendChild(tabElement);
  });

  tabs.appendChild(fragment);
}

init();
