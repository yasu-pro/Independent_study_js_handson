"use strict";
const body = document.querySelector("body");
const ulElemTabs = document.getElementById("js_tabs");
const apiURL = "http://localhost:3000/data";

const getData = async() => {
  try {
    const response = await fetch(apiURL);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const error = new Error(`${response.status}:${response.statusText}`)
      error.response = response;
      throw error;
    }
  } catch (e) {
    throw new Error(e);
  }
}

const createCategoryTab = async () => {
  const listData = await getData();
  const fragment = document.createDocumentFragment();

  listData.forEach((categoryData)=> {
    const liElem = document.createElement("li");
    liElem.classList=`tab ${categoryData.category}`

    const aElem = document.createElement("a");
    liElem.appendChild(aElem);

    let categoryTitle ="";

    switch (categoryData.category) {
      case "news":
        categoryTitle = "ニュース";
        break;

      case "economy":
        categoryTitle = "経済";
        break;

      case "entertainment":
        categoryTitle = "エンタメ";
        break;

      case "sports":
        categoryTitle = "スポーツ";
        break;

      case "domestic":
        categoryTitle = "国内";
        break;

      default:
        break;
    }

    aElem.innerText = categoryTitle;
    fragment.appendChild(liElem);
  })

  ulElemTabs.appendChild(fragment);
  ulElemTabs.classList = "tabTopics"
  return ulElemTabs;
}

const createTabPanel = () => {
  const sectionElem = document.createElement("section");
  const divElemTabPanelWrap = document.createElement("div");
  divElemTabPanelWrap.classList = "tabPanelWrap"
  const divElemMainNewsContent = document.createElement("div");
  divElemMainNewsContent.classList = "mainNewsContent"

  sectionElem.appendChild(divElemTabPanelWrap);
  divElemTabPanelWrap.appendChild(divElemMainNewsContent);

  return sectionElem;
}

const createArticle = () => {
  const articleElem = document.createElement("article");
  return articleElem
}

const renderElem = async() => {
  const articleElem = createArticle();
  const divElemTabToics = await createCategoryTab();
  const sectionElem = createTabPanel();

  articleElem.appendChild(divElemTabToics);
  articleElem.appendChild(sectionElem);
  body.insertBefore(articleElem, body.firstChild);
}


renderElem();


const lazyLoad = () => {
  const div = document.createElement('div');
  div.classList='load'
  const img = document.createElement('img');
  img.src = "./img/loading-circle.gif"

  div.appendChild(img);
  document.body.appendChild(div);
}





