"use strict";
const body = document.querySelector("body");
const tabs = document.getElementById("js_tabs");
const fragment = document.createDocumentFragment();
const url = "https://myjson.dit.upm.es/api/bins/c3j7";

const jsonData = {
  data: [
    {
      field: "ニュース",
      img: "./img/news_img.jpg",
      contents: [
        {
          title: "阪神淡路26年 変わらぬ想い",
          new: "new",
          comment: 0,
        },
        {
          title: "バス落下免れ震災語る運転手",
          new: "none",
          comment: 212,
        },
        {
          title: "Gサミット2年ぶり対面開催へ",
          new: "none",
          comment: 433,
        },
        {
          title: "有料住宅普及進まぬEU",
          new: "new",
          comment: 513,
        },
      ],
    },
    {
      field: "経済",
      img: "./img/economy_img.jpg",
      contents: [
        {
          title: "経済記事タイトル1",
          new: "new",
          comments: 431,
        },
        {
          title: "経済記事タイトル2",
          new: "new",
          comments: 3821,
        },
        {
          title: "経済記事タイトル3",
          new: "none",
          comments: 431,
        },
        {
          title: "経済記事タイトル4",
          new: "none",
          comments: 200,
        },
      ],
    },
    {
      field: "エンタメ",
      img: "./img/entertainment_img.jpg",
      contents: [
        {
          title: "エンタメ記事タイトル1",
          new: "new",
          comments: 431,
        },
        {
          title: "エンタメ記事タイトル2",
          new: "new",
          comments: 3821,
        },
        {
          title: "エンタメ記事タイトル3",
          new: "none",
          comments: 431,
        },
        {
          title: "エンタメ記事タイトル4",
          new: "none",
          comments: 200,
        },
      ],
    },
    {
      field: "スポーツ",
      img: "./img/sports_img.jpg",
      contents: [
        {
          title: "スポーツ記事タイトル1",
          new: "new",
          comments: 431,
        },
        {
          title: "スポーツ記事タイトル2",
          new: "new",
          comments: 3821,
        },
        {
          title: "スポーツ記事タイトル3",
          new: "none",
          comments: 431,
        },
        {
          title: "スポーツ記事タイトル4",
          new: "none",
          comments: 200,
        },
      ],
    },
    {
      field: "国内",
      img: "./img/domestic_img.jpg",
      contents: [
        {
          title: "国内記事タイトル1",
          new: "new",
          comments: 431,
        },
        {
          title: "国内記事タイトル2",
          new: "new",
          comments: 3821,
        },
        {
          title: "国内記事タイトル3",
          new: "none",
          comments: 431,
        },
        {
          title: "国内記事タイトル4",
          new: "none",
          comments: 200,
        },
      ],
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

async function getData() {
  const response = await jsonData;
  return jsonData;
}

async function getListData() {
  try {
    const { data } = await getData();
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
  let contentWrap;
  const { contents } = data[index];
  const createDiv = document.createElement("div");
  const pastClickedContentDivElement = document.querySelector(
    `${"div.content_wrap" + pastIndex}`
  );
  createDiv.classList.add(`${"content_wrap" + index}`);

  if (pastClickedContentDivElement) {
    pastClickedContentDivElement.remove();
  }

  body.insertBefore(createDiv, tabs.nextSibling);
  contentWrap = document.querySelector(`${".content_wrap" + index}`);

  tabDetailsNews(contents);
  contentWrap.appendChild(tabDetailsNews(contents));
}

function tabDetailsNews(contents) {
  const tabDetailsNewsUlElement = document.createElement("ul");
  const fragment = document.createDocumentFragment();
  contents.forEach((element) => {
    const tabDetailsNewsLiElement = document.createElement("li");

    tabDetailsNewsLiElement.textContent = `${element.title}`;
    fragment.appendChild(tabDetailsNewsLiElement);
  });
  tabDetailsNewsUlElement.appendChild(fragment);
  return tabDetailsNewsUlElement;
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
