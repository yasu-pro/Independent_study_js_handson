"use strict";
const tabs = document.getElementById("tabs");
const fragment = document.createDocumentFragment();

function getData() {
  const promiseNewsData = new Promise((resolve, reject) => {
    resolve(
      (async function () {
        const result = (
          await fetch("http://myjson.dit.upm.es/api/bins/c2fh")
        ).json();
        return result;
      })()
    );
  });
  return promiseNewsData;
}

async function getJSON() {
  const newsDataJSON = await getNewsData();
  console.log(newsDataJSON.data[0].field);
}

getJSON();
// console.log(newsDataJSON.length);
// console.log(JSON.parse(newsDataJSON));
// console.log(newsDataJSON.data["img"]);

// for (let i in newsDataJSON) {
//   if (newsDataJSON.hasOwnProperty(i)) {
//     let element = newsDataJSON[i].field;
//     console.log(element);
//   }
// }

// 取得したjsondata分だけタブを生成
//ul>li(tab)>li()記事

for (let i = 0; i < 5; i++) {
  const tab = document.createElement("li");
  fragment.appendChild(tab);
  tab.className = "tab";
}
tabs.appendChild(fragment);
