"use strict";
// DOM
const body = document.querySelector("body");
const ulElemTabs = document.getElementById("js_tabs");
const apiURL = "http://localhost:3000/data";


// 関数
const getData = async() => {
  try {
    lazyLoad();
    const response = await fetch(apiURL);
    if (response.ok) {
      const json = await response.json();
      deleteLazyLoad();
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

const toggleNewsDisplay = async(changeNewsData) => {
  const divElemMainNewsContent = document.querySelector('.mainNewsContent');
  const divElemTabPanelWrap = document.querySelector('.tabPanelWrap');

  divElemMainNewsContent.remove();

  const changeNewsElem = displayNews(changeNewsData);

  divElemTabPanelWrap.appendChild(changeNewsElem);
}

const createCategoryTab = async (listData) => {
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

const createTabPanel = async(listData) => {
  const sectionElem = document.createElement("section");
  const divElemTabPanelWrap = document.createElement("div");
  divElemTabPanelWrap.classList = "tabPanelWrap"

  const newsContentNode = await displayInitialNews(listData);

  divElemTabPanelWrap.appendChild(newsContentNode);
  sectionElem.appendChild(divElemTabPanelWrap);

  return sectionElem;
}

const renderElem = async(listData) => {
  const articleElem = createArticle();
  const divElemTabToics = await createCategoryTab(listData);
  const sectionElem = await createTabPanel(listData);

  articleElem.appendChild(divElemTabToics);
  articleElem.appendChild(sectionElem);
  body.insertBefore(articleElem, body.firstChild);
}

const displayInitialNews = async (listData) => {
  const displayCategoryAllNews = await getNewsDisplayStatus(listData);
  const newsContent = displayNews(displayCategoryAllNews);

  return newsContent;
};

const selectCategoryNewsData = async(listData, className) => {
  const clickedCategory = formatCategoryName(className);

  const changeNewsData = listData.filter(newsCategoy => {
    return newsCategoy.category === clickedCategory;
  })

  return changeNewsData;
}

const createArticle = () => {
  const articleElem = document.createElement("article");
  return articleElem
}

const deleteLazyLoad = () => {
  const loadElem = document.querySelector(".load");
  loadElem.remove();
}

const getNewsDisplayStatus = (listData) => {
  const displayCategoryAllNews = listData.filter(newsDisplay => {
    return newsDisplay.isFirstDisplay === true;
  })

  return displayCategoryAllNews;
}

const displayNews = (newsData) => {
  const ulElem = document.createElement("ul");
  ulElem.classList = "newsList";
  const fragment = document.createDocumentFragment();
  const divElemMainNewsContent = document.createElement("div");
  divElemMainNewsContent.classList = "mainNewsContent";

  newsData.forEach((newsItem) => {
    // 各カテゴリーの画像表示
    const divElemCategoryImg = document.createElement("div");
    divElemCategoryImg.classList = "categoryImg"
    const imgElem = document.createElement("img");
    const categoryImage = newsItem.img;
    imgElem.src = categoryImage

    divElemCategoryImg.appendChild(imgElem);


    // ニュース記事の要素作成
    newsItem.contents.forEach((news) => {
      const liElem = document.createElement("li");

      const aElemAritcleLink = document.createElement("a");
      const h1Elem = document.createElement("h1");

      h1Elem.innerText = news.title;

      liElem.appendChild(aElemAritcleLink);
      aElemAritcleLink.appendChild(h1Elem);

      if (news.comments !== 0) {
        const spanElemComentIcon = document.createElement("span");
        spanElemComentIcon.classList = "commentIcon";
        const aElemComentLink = document.createElement("a");

        const commentTotal = news.comments;
        aElemComentLink.innerHTML = `
          <i class="fas fa-regular fa-comment"></i>
          <span class="commentIconNum">${commentTotal}</span>`;

        spanElemComentIcon.appendChild(aElemComentLink);
        liElem.appendChild(spanElemComentIcon);
      }

      if (news.isNew) {
        const spanElemNewIcon = document.createElement("span");
        spanElemNewIcon.classList = "newIcon";
        spanElemNewIcon.innerHTML = "New";
        aElemAritcleLink.appendChild(spanElemNewIcon);
      }
      fragment.appendChild(liElem);
    });
    divElemMainNewsContent.appendChild(divElemCategoryImg);
  });

  ulElem.appendChild(fragment);
  divElemMainNewsContent.insertBefore(ulElem, divElemMainNewsContent.firstChild);

  return divElemMainNewsContent;
};

const formatCategoryName = (className) => {
  const categoryName = className.replace("tab", "").trim();
  return categoryName;
}

const lazyLoad = () => {
  const div = document.createElement('div');
  div.classList='load'
  const img = document.createElement('img');
  img.src = "./img/loading-circle.gif"

  div.appendChild(img);
  document.body.appendChild(div);
}


// イベント
document.addEventListener("DOMContentLoaded", async() => {
  const listData = await getData();
  renderElem(listData);

  ulElemTabs.addEventListener("click", async(event) => {
    // クリックされた要素がリストアイテム（<li>要素またはその子要素）であるかを確認
    const listItem = event.target.closest("li");
    if (listItem) {
      const clickListElemClassName = listItem.className;

      const changeNewsData = await selectCategoryNewsData(listData, clickListElemClassName);

      toggleNewsDisplay(changeNewsData);
    }
  });
});
