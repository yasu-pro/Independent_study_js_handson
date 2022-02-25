"use strict";
const body = document.getElementsByTagName("body");
const tabs = document.getElementById("tabs");
const fragment = document.createDocumentFragment();

async function getData() {
  try {
    const response = (
      await fetch("http://myjson.dit.upm.es/api/bins/dnzp")
    ).json();
    return response;
  } catch (error) {
    tabs.display = "none";
    body.textContent = error;
  }
}

async function getJSON() {
  const { data } = await getData();
  return data;
}

getJSON().then((value) => {
  console.log(value);
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
