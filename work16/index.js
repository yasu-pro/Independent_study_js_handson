"use strict";
const body = document.getElementsByTagName("body");
const tabs = document.getElementById("tabs");
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
    // hideLoading();
  }
}

getListData().then((value) => {
  value.forEach((element) => {
    console.log(element);
    createListTag(element);
    // console.log(createListTag(element));
  });
});

// ulの直下に記事の分だけlistタグを作り、fieldの値を取得してタブにする
// トピックの画像を表示する
// 作ったListタグの直下にコンテンツの分だけListタグを作る
//

// async function init() {

// }

function createListTag(array) {
  console.log(array);
  const tab = document.createElement("li");
  const button = document.createElement("button");
  const field = array.field;

  tab.className = "tab";
  button.textContent = field;

  tab.appendChild(button);
  fragment.appendChild(tab);
  tabs.appendChild(fragment);
}

//   const tab = document.createElement("li");
//   fragment.appendChild(tab);
//   tab.className = "tab";
// tabs.appendChild(fragment);
