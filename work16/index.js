"use strict";
const body = document.querySelector("body");
const ulElemTabs = document.getElementById("js_tabs");
const apiURL = "http://localhost:3000/data";

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

const deleteLazyLoad = () => {
  const loadElem = document.querySelector(".load");
  loadElem.remove();
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

const createArticle = () => {
  const articleElem = document.createElement("article");
  return articleElem
}

const getNewsDisplayStatus = (listData) => {
  const displayCategoryAllNews = listData.filter(newsDisplay => {
    return newsDisplay.isFirstDisplay === true;
  })

  return displayCategoryAllNews;
}

// ニュースデータを表示する関数
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

const renderElem = async(listData) => {
  const articleElem = createArticle();
  const divElemTabToics = await createCategoryTab(listData);
  const sectionElem = await createTabPanel(listData);

  articleElem.appendChild(divElemTabToics);
  articleElem.appendChild(sectionElem);
  body.insertBefore(articleElem, body.firstChild);
}

// ページ読み込み時に初期カテゴリーのニュースデータを表示するための関数
const displayInitialNews = async (listData) => {
  const displayCategoryAllNews = await getNewsDisplayStatus(listData);
  const newsContent = displayNews(displayCategoryAllNews);

  return newsContent;
};

// カテゴリー名を整形する関数
const formatCategoryName = (className) => {
  const categoryName = className.replace("tab", "").trim();
  return categoryName;
}

const toggleNewsData = async(listData, className) => {
  const clickedCategory = formatCategoryName(className);

  const changeNewsData = listData.filter(newsCategoy => {
    return newsCategoy.category === clickedCategory;
  })

  return changeNewsData;
}

const changeNewsDisplay = (changeNewsData) => {
  const divElemMainNewsContent = document.querySelector('.mainNewsContent');
  const divElemTabPanelWrap = document.querySelector('.tabPanelWrap');
  // ul 要素の子要素を削除（古いニュースをクリア）
  divElemMainNewsContent.remove();

  const changeNewsElem = displayNews(changeNewsData);

  divElemTabPanelWrap.appendChild(changeNewsElem);
}

document.addEventListener("DOMContentLoaded", async() => {
  const listData = await getData();
  renderElem(listData);

  // リストアイテムをクリックしたときの処理
  ulElemTabs.addEventListener("click", async(event) => {
    // クリックされた要素がリストアイテム（<li>要素またはその子要素）であるかを確認
    const listItem = event.target.closest("li");
    if (listItem) {
      // クリックされたリストアイテムのクラス名を取得
      const clickListElemClassName = listItem.className;

      const changeNewsData = await toggleNewsData(listData, clickListElemClassName);

      // 取得したニュースデータを表示するための処理を実行
      toggleNewsDisplay(changeNewsData);
    }
  });
});

// ニュースデータの表示・非表示を切り替える関数
const toggleNewsDisplay = async(className) => {
  changeNewsDisplay(className);
}

const lazyLoad = () => {
  const div = document.createElement('div');
  div.classList='load'
  const img = document.createElement('img');
  img.src = "./img/loading-circle.gif"

  div.appendChild(img);
  document.body.appendChild(div);
}





